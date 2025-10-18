import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SponsorCard from "@/components/SponsorCard";
import { Button } from "@/components/ui/button";

export default function Partners() {
  const sponsors = [
    {
      name: "TechFlow Solutions",
      description: "Advanced workflow automation platform designed for high-volume service companies.",
    },
    {
      name: "DataSync Pro",
      description: "Real-time data integration between ServiceTitan and your CRM.",
    },
    {
      name: "CallAI",
      description: "AI-powered call analysis and customer intelligence platform.",
    },
    {
      name: "OptiPrice",
      description: "Dynamic pricing engine that maximizes revenue per job.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Our Partners & Sponsors
              </h1>
              <p className="text-xl text-muted-foreground">
                We partner with a select group of vendors who deliver real value to ServiceTitan contractors. Every sponsor is vetted for quality, fit, and proven ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.name} {...sponsor} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="text-2xl font-bold font-heading mb-6">How sponsorship works</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>We only partner with tools we use and recommend ourselves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>All sponsors must offer exclusive pricing or features to our community</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>We maintain editorial independence—honest feedback always</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Sponsors support free content, courses, and community resources</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold font-heading mb-6">Quality guardrails</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Proven track record with home service contractors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>ServiceTitan-native or certified integrations preferred</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Responsive support and onboarding teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Transparent pricing and contract terms</span>
                  </li>
                </ul>
              </div>
            </div>

            <div id="book" className="bg-muted rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Interested in partnering?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                If you offer a product or service that delivers measurable value to home service contractors, we'd love to hear from you.
              </p>
              <a href="/contact">
                <Button size="lg" data-testid="button-request-partnership">
                  Request Partnership Info
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
