import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, ExternalLink } from "lucide-react";
import { SiApplepodcasts, SiSpotify } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import type { PodcastEpisode } from "@shared/schema";

export default function Podcast() {
  const { data: episodes = [], isLoading } = useQuery<PodcastEpisode[]>({
    queryKey: ['/api/podcast/episodes'],
  });

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Home Service Business Hacks Podcast"
        description="Listen to interviews with contractors and founders about AI, automation, leadership and scaling home service businesses."
        keywords="ServiceTitan podcast, HVAC podcast, contractor podcast, business growth"
        canonicalUrl="https://servicetitanhacks.com/podcast"
        ogImage="https://servicetitanhacks.com/og-podcast.png"
      />
      <Header />
      <main className="flex-1">
        <Hero
        title="ServiceTitan Hacks Podcast"
        subtitle="Where innovation meets the home service industry. Join host Bill Brown for candid conversations with forward-thinking contractors and software founders who are revolutionizing the trades with AI, automation, and smart solutions."
        primaryCta={{
          label: "Be a Guest on the Show",
          href: "https://go.st-hacks.cc/be-a-guest",
          external: true,
        }}
        dark={true}
      />

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Listen on Your Favorite Platform</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <a
                href="https://podcasts.apple.com/us/podcast/home-service-hacks/id1815551474"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                data-testid="link-apple-podcasts"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <SiApplepodcasts className="h-5 w-5" />
                  Apple Podcasts
                </Button>
              </a>
              <a
                href="https://open.spotify.com/show/1EUnvMTaJnKnUO65Teq6gW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                data-testid="link-spotify"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <SiSpotify className="h-5 w-5" />
                  Spotify
                </Button>
              </a>
              <a
                href="https://servicetitanhacks.podbean.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                data-testid="link-podbean"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Headphones className="h-5 w-5" />
                  Podbean
                </Button>
              </a>
            </div>
          </div>

          <div className="mb-12">
            <Card className="bg-muted">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-heading mb-4">About the Host</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bill Brown is a former Inc. 5000 HVAC company owner with 25 years of industry experience and a background in computer programming. Drawing from his unique perspective as both a successful contractor and tech enthusiast, Bill uncovers how AI, automation, and smart solutions are helping service professionals save time, reduce costs, and deliver exceptional customer experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold font-heading mb-8 text-center">Recent Episodes</h2>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading episodes...</p>
            </div>
          ) : episodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No episodes available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {episodes.map((episode, index) => (
                <Card key={episode.id} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-primary/10 p-4 rounded-lg">
                        <Headphones className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">{formatDate(episode.pubDate)}</p>
                        <h3 className="text-xl font-semibold font-heading mb-3">{episode.title}</h3>
                        <p className="text-muted-foreground mb-4">{episode.description}</p>
                        <a
                          href={episode.link || episode.audioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`link-episode-${index}`}
                        >
                          <Button variant="outline" className="gap-2">
                            Listen Now <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-heading mb-4">Join the Community</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Subscribe now to join thousands of service professionals in the ServiceTitan Hacks community who are working smarter, not harder. From ServiceTitan optimization to emerging tech integrations, we unpack the innovations that give modern contractors their competitive edge.
                </p>
                <a
                  href="https://go.st-hacks.cc/servicetitanhacks"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-facebook-group"
                >
                  <Button size="lg">Join the Facebook Group</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
