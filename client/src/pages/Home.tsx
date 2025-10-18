import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PillarCard from "@/components/PillarCard";
import TestimonialCard from "@/components/TestimonialCard";
import EmailCapture from "@/components/EmailCapture";
import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import aiIcon from "@assets/generated_images/AI_Integrations_pillar_icon_e73a9edc.png";
import customIcon from "@assets/generated_images/ServiceTitan_Customizations_icon_0ec02fbb.png";
import autoIcon from "@assets/generated_images/Done-For-You_Automations_icon_07a6c92b.png";
import testimonial1 from "@assets/generated_images/Testimonial_contractor_photo_1_f4717a9d.png";
import testimonial2 from "@assets/generated_images/Testimonial_contractor_photo_2_b71aa2dc.png";
import testimonial3 from "@assets/generated_images/Testimonial_contractor_photo_3_e849387f.png";
import podcastThumb from "@assets/generated_images/Podcast_episode_thumbnail_f52b3465.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          title="AI and automations for ServiceTitan contractors"
          subtitle="Grow smarter, automate faster, win more jobs."
          primaryCta={{
            label: "Join the Facebook Group",
            href: "https://www.facebook.com/groups/servicetitanhacks",
            external: true,
          }}
          secondaryCta={{
            label: "All-Access Pass",
            href: "/all-access",
          }}
        />

        {/* Trust Strip */}
        <section className="bg-muted py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-12">
              {["Partner A", "Partner B", "Partner C", "Partner D"].map((partner) => (
                <div key={partner} className="text-2xl font-bold text-muted-foreground grayscale hover:grayscale-0 hover:text-primary transition-all">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">
              Three ways we help you win
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PillarCard
                title="AI Integrations"
                description="Connect powerful AI tools directly to ServiceTitan for instant ROI."
                icon={aiIcon}
                link="/tools"
              />
              <PillarCard
                title="ServiceTitan Customizations"
                description="Optimize workflows, custom fields, and reporting to fit your business."
                icon={customIcon}
                link="/tools"
              />
              <PillarCard
                title="Done-For-You Automations"
                description="We build, test, and deploy custom automations tailored to your operation."
                icon={autoIcon}
                link="/contact"
              />
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="bg-muted py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12">Latest from the community</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Latest Podcast</h3>
                <PodcastCard
                  title="Scaling HVAC Operations with AI"
                  guest="Sarah Mitchell, CEO of CoolTech HVAC"
                  date="Jan 15, 2025"
                  duration="42 min"
                  takeaways={[
                    "How AI reduced dispatch time by 40%",
                    "Automated follow-ups that convert",
                    "ROI metrics you should track",
                  ]}
                  thumbnail={podcastThumb}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Featured Video</h3>
                <div className="aspect-video bg-card rounded-lg flex items-center justify-center border border-border">
                  <p className="text-muted-foreground">[YouTube embed placeholder]</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  "ServiceTitan Setup Checklist",
                  "ROI Calculator Spreadsheet",
                  "Pricebook Templates",
                ].map((resource) => (
                  <div key={resource} className="bg-background rounded-lg p-6 border border-border">
                    <h4 className="font-semibold mb-2">{resource}</h4>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6">
            <EmailCapture />
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">
              Trusted by contractors like you
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Cut our follow-up time in half with automated call summaries. Game changer."
                name="Mike Reynolds"
                company="Reynolds HVAC"
                photo={testimonial1}
              />
              <TestimonialCard
                quote="The pricebook optimizer made our estimates sound professional and clear. Conversions up 22%."
                name="Jennifer Cruz"
                company="Cruz Plumbing Co."
                photo={testimonial2}
              />
              <TestimonialCard
                quote="Best investment we made this year. ROI in the first month."
                name="David Park"
                company="Park Electric Services"
                photo={testimonial3}
              />
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to see what's possible?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Book a demo with one of our partner sponsors and discover tools built for your business.
            </p>
            <a href="/partners#book">
              <Button size="lg" variant="secondary" data-testid="button-cta-sponsor-demo">
                Book a Sponsor Demo
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
