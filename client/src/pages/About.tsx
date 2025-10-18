import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import founderPhoto from "@assets/generated_images/Founder_bio_headshot_photo_9225ae53.png";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-12 text-center">
                About ServiceTitan Hacks
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <img
                    src={founderPhoto}
                    alt="Founder"
                    className="rounded-lg w-full aspect-square object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold font-heading mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    ServiceTitan Hacks exists to help home service contractors leverage AI and automation to grow smarter, work more efficiently, and win more jobs.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    We started in the trenches—running HVAC operations, wrestling with ServiceTitan configurations, and searching for tools that actually deliver ROI. What we found was a gap: powerful technology exists, but contractors lack the time and expertise to implement it.
                  </p>
                  <p className="text-muted-foreground">
                    That's where we come in. We test, vet, and recommend only the tools and strategies that work. No sales pitches, no theoretical BS—just real solutions from people who've been in your shoes.
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-12 mb-16">
                <h2 className="text-3xl font-bold font-heading mb-8 text-center">Community Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">5,200+</div>
                    <p className="text-muted-foreground">Community Members</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">120+</div>
                    <p className="text-muted-foreground">Video Tutorials</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">$2.4M+</div>
                    <p className="text-muted-foreground">Estimated Revenue Impact</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold font-heading mb-6">Join the community</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect with thousands of contractors sharing wins, challenges, and proven strategies. It's free, active, and judgment-free.
                </p>
                <a href="https://www.facebook.com/groups/servicetitanhacks" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" data-testid="button-join-facebook-group">
                    Join the Facebook Group
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
