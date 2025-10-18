import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";

export default function Partners() {
  const partners = [
    {
      name: "Volca.AI",
      description: "AI-powered solutions for home service contractors to automate workflows and enhance customer engagement.",
      url: "https://go.st-hacks.cc/volca",
    },
    {
      name: "Wink Toolbox",
      description: "Comprehensive tools and resources designed to optimize ServiceTitan operations and drive business growth.",
      url: "https://go.st-hacks.cc/wink",
    },
    {
      name: "Free-2-Grow",
      description: "AI voice solutions for home service businesses to answer every call, boost booking rates, and capture revenue 24/7.",
      url: "https://go.st-hacks.cc/free-2-grow",
    },
    {
      name: "SmartAC",
      description: "Smart automation and customer communication tools that help contractors deliver exceptional service experiences.",
      url: "https://go.st-hacks.cc/smart-ac",
    },
    {
      name: "Contractor Commerce",
      description: "E-commerce and online sales solutions tailored specifically for home service contractors and ServiceTitan users.",
      url: "https://go.st-hacks.cc/contractor-commerce",
    },
  ];

  const benefits = [
    "Exclusive discounts and special offers for community members",
    "Early access to new features and product updates",
    "Direct support from partner teams who understand ServiceTitan",
    "Integration guides and implementation assistance",
    "Community-vetted tools that contractors actually use",
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="ServiceTitan Hacks Partners"
        subtitle="Trusted tools and technology partners helping contractors automate, optimize, and grow their home service businesses."
        dark={false}
      />

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4 text-center">Why Partner with ServiceTitan Hacks?</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">
              Our partners are carefully selected based on real-world results from contractors in the ServiceTitan Hacks community. Each partner offers proven solutions that integrate seamlessly with ServiceTitan and deliver measurable ROI.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Our Partners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold font-heading mb-3">{partner.name}</h3>
                    <p className="text-muted-foreground mb-4 min-h-[4rem]">{partner.description}</p>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Button variant="outline" className="w-full gap-2">
                        Learn More <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-heading mb-4">Interested in Becoming a Partner?</h3>
                <p className="text-muted-foreground mb-6">
                  Join our network of technology partners serving thousands of ServiceTitan contractors. We're looking for innovative solutions that deliver real value to the home service industry.
                </p>
                <a
                  href="https://www.servicetitanhacks.com/pages/sponsorships"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-become-partner"
                >
                  <Button size="lg">Learn About Sponsorships</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
