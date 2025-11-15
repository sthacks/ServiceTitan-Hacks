import Parser from 'rss-parser';
import { db } from '../server/db';
import { podcastEpisodes } from '@shared/schema';
import { eq } from 'drizzle-orm';

const RSS_FEED_URL = 'https://servicetitanhacks.podbean.com/feed.xml';

interface PodcastFeedItem {
  guid?: string;
  title?: string;
  contentSnippet?: string;
  content?: string;
  pubDate?: string;
  enclosure?: {
    url: string;
    type: string;
  };
  itunes?: {
    duration?: string;
    image?: string;
  };
  link?: string;
}

export async function syncPodcastEpisodes(): Promise<{ success: boolean; episodesAdded: number; error?: string }> {
  try {
    console.log('[Podcast Sync] Starting podcast sync from RSS feed...');
    
    const parser = new Parser({
      customFields: {
        item: ['itunes:duration', 'itunes:image']
      }
    });

    const feed = await parser.parseURL(RSS_FEED_URL);
    
    if (!feed.items || feed.items.length === 0) {
      console.log('[Podcast Sync] No episodes found in feed');
      return { success: true, episodesAdded: 0 };
    }

    let episodesAdded = 0;

    for (const item of feed.items as PodcastFeedItem[]) {
      if (!item.guid || !item.title || !item.enclosure?.url) {
        console.log('[Podcast Sync] Skipping episode with missing required fields');
        continue;
      }

      // Check if episode already exists
      const existing = await db
        .select()
        .from(podcastEpisodes)
        .where(eq(podcastEpisodes.guid, item.guid))
        .limit(1);

      if (existing.length > 0) {
        // Episode already exists, skip it
        continue;
      }

      // Add new episode
      await db.insert(podcastEpisodes).values({
        guid: item.guid,
        title: item.title,
        description: item.contentSnippet || item.content || '',
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        audioUrl: item.enclosure.url,
        duration: item.itunes?.duration || null,
        imageUrl: item.itunes?.image || null,
        link: item.link || null,
      });

      episodesAdded++;
      console.log(`[Podcast Sync] Added episode: ${item.title}`);
    }

    console.log(`[Podcast Sync] Sync complete. Added ${episodesAdded} new episodes.`);
    return { success: true, episodesAdded };

  } catch (error) {
    console.error('[Podcast Sync] Error syncing podcast episodes:', error);
    return { 
      success: false, 
      episodesAdded: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
