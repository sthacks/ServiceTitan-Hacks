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
  duration?: string;
  image?: {
    $?: {
      href?: string;
    };
  } | string;
  itunes?: {
    image?: string;
  };
  link?: string;
}

export async function syncPodcastEpisodes(): Promise<{ success: boolean; episodesAdded: number; error?: string }> {
  try {
    console.log('[Podcast Sync] Starting podcast sync from RSS feed...');
    
    const parser = new Parser({
      customFields: {
        item: [
          ['itunes:duration', 'duration'],
          ['itunes:image', 'image', { keepArray: false }]
        ]
      }
    });

    const feed = await parser.parseURL(RSS_FEED_URL);
    
    if (!feed.items || feed.items.length === 0) {
      console.log('[Podcast Sync] No episodes found in feed');
      return { success: true, episodesAdded: 0 };
    }

    // Get the podcast's default image from the channel/feed level
    const feedImage = (feed as any).image?.url || (feed as any).itunes?.image || null;
    console.log('[Podcast Sync] Feed image:', feedImage);

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

      // Extract image URL from various possible formats
      let imageUrl: string | null = null;
      if (item.image) {
        if (typeof item.image === 'string') {
          imageUrl = item.image;
        } else if (item.image.$?.href) {
          imageUrl = item.image.$.href;
        }
      }
      if (!imageUrl && item.itunes?.image) {
        imageUrl = item.itunes.image;
      }
      // Use feed-level image as fallback if episode doesn't have its own
      if (!imageUrl && feedImage) {
        imageUrl = feedImage;
      }

      // Add new episode
      await db.insert(podcastEpisodes).values({
        guid: item.guid,
        title: item.title,
        description: item.contentSnippet || item.content || '',
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        audioUrl: item.enclosure.url,
        duration: (item as any).duration || item.itunes?.duration || null,
        imageUrl: imageUrl,
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
