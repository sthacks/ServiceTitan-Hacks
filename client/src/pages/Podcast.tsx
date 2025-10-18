import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, ExternalLink } from "lucide-react";
import { SiApplepodcasts, SiSpotify } from "react-icons/si";

export default function Podcast() {
  const episodes = [
    {
      title: "From Truck to Boardroom: How Technicians Build Real HVAC Businesses with Kelley McKay from HVAC Millionaire University",
      description: "Struggling to grow your HVAC business beyond the truck? HVAC industry veteran and coach Kelley McKay shares the exact mindset shifts, processes, and strategies that helped him scale from technician to building a sustainable, scalable, and sellable company.",
      date: "September 30, 2025",
      url: "https://servicetitanhacks.podbean.com/e/from-truck-to-boardroom-how-technicians-build-real-hvac-businesses/",
    },
    {
      title: "Fix Your P&L or Fail: Surgical Finances for Home Services with Norris Ayvazian from Service Crucible",
      description: "Trades coaching myths exposed: Learn why cookie-cutter playbooks don't work and how to fix your P&L, operations, and buy-in issues for real growth. Contractors will walk away knowing exactly what to prioritize to scale from $1M to $10M and beyond.",
      date: "September 23, 2025",
      url: "https://servicetitanhacks.podbean.com/e/fix-your-pl-or-fail-surgical-finances-for-home-services/",
    },
    {
      title: "Automation First, AI Second: Practical Systems for the Trades with Tersh Blissett & Josh Crouch",
      description: "Bill Brown interviews Tersh Blissett and Josh Crouch about the real difference between automation and AI, and how HVAC, plumbing, and electrical businesses are using processes, automations, and AI to save time and scale.",
      date: "September 16, 2025",
      url: "https://servicetitanhacks.podbean.com/e/automation-first-ai-second-practical-systems-for-the-trades/",
    },
    {
      title: "AI Voice vs. Human CSRs: The Future of Home Service Calls with Nate Keller from Free-2-Grow",
      description: "AI call handling is transforming home service businesses. Nate Keller from Free-2-Grow.com joins to explain how their AI-powered voice platform helps HVAC, plumbing, and electrical companies answer every call 24/7 and boost booking rates up to 80%.",
      date: "September 9, 2025",
      url: "https://servicetitanhacks.podbean.com/e/ai-voice-vs-human-csrs-the-future-of-home-service-calls/",
    },
    {
      title: "Omni SEO: How AI Answer Engines Are Reshaping Contractor Marketing with Corry Cullather from WebFX",
      description: "Homeowners are no longer just searching on Google — they're turning to AI engines like ChatGPT and Perplexity. Is your contracting business ready for Local SEO, Core SEO, and Omni SEO?",
      date: "September 2, 2025",
      url: "https://servicetitanhacks.podbean.com/e/omni-seo-how-ai-answer-engines-are-reshaping-contractor-marketing/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
          <div className="grid gap-8">
            {episodes.map((episode, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary/10 p-4 rounded-lg">
                      <Headphones className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">{episode.date}</p>
                      <h3 className="text-xl font-semibold font-heading mb-3">{episode.title}</h3>
                      <p className="text-muted-foreground mb-4">{episode.description}</p>
                      <a
                        href={episode.url}
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
