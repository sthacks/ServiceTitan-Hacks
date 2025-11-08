import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import liveswitchLogo from "@assets/logos.zip - liveswitch_1762019262110.png";
import polycamLogo from "@assets/logos.zip - polycam_1762019262110.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";
import serviceCrucibleLogo from "@assets/logos.zip - 5_1762019262110.png";

export default function Partners() {
  const partners = [
    {
      name: "Volca.AI",
      slug: "volca-ai",
      logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/ba8/d11/01b/volca.png",
      description: "AI-powered solutions for home service contractors to automate workflows and enhance customer engagement.",
      url: "https://go.st-hacks.cc/volca",
    },
    {
      name: "Wink Toolbox",
      slug: "wink-toolbox",
      logo: winkLogo,
      description: "Comprehensive tools and resources designed to optimize ServiceTitan operations and drive business growth.",
      url: "https://go.st-hacks.cc/wink",
    },
    {
      name: "SmartAC",
      slug: "smartac",
      logo: smartACLogo,
      description: "Smart automation and customer communication tools that help contractors deliver exceptional service experiences.",
      url: "https://go.st-hacks.cc/smart-ac",
    },
    {
      name: "Contractor Commerce",
      slug: "contractor-commerce",
      logo: contractorCommerceLogo,
      description: "E-commerce and online sales solutions tailored specifically for home service contractors and ServiceTitan users.",
      url: "https://go.st-hacks.cc/contractor-commerce",
    },
    {
      name: "LiveSwitch",
      slug: "liveswitch",
      logo: liveswitchLogo,
      description: "Professional virtual phone solutions designed to streamline communication and enhance customer service for home service businesses.",
      url: "https://go.st-hacks.cc/liveswitch",
    },
    {
      name: "Polycam",
      slug: "polycam",
      logo: polycamLogo,
      description: "Advanced 3D scanning and modeling solutions for home service contractors to capture accurate property measurements and documentation.",
      url: "https://go.st-hacks.cc/polycam",
    },
    {
      name: "Service Crucible",
      slug: "service-crucible",
      logo: serviceCrucibleLogo,
      description: "Essential tools and resources for home service contractors to optimize operations and drive business growth.",
      url: "https://go.st-hacks.cc/Service-crucible",
    },
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="ServiceTitan Partners | Trusted Tools & Integrations"
        description="Discover trusted ServiceTitan partners and integrations. Vetted tools to enhance your operations, from AI automation to business analytics."
        keywords="ServiceTitan partners, integrations, HVAC tools, contractor software"
        canonicalUrl="https://servicetitanhacks.com/partners"
      />
      <Header />
      <main className="flex-1">
        <Hero
        title="ServiceTitan Hacks Partners"
        subtitle="Trusted tools and technology partners helping contractors automate, optimize, and grow their home service businesses."
        dark={true}
      />

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Our Partners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6 text-center flex flex-col">
                    <Link href={`/partners/${partner.slug}`}>
                      <a className="block mb-6">
                        <div className="h-32 flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className={`object-contain ${partner.name === 'SmartAC' || partner.name === 'Contractor Commerce' || partner.name === 'Volca.AI' ? 'max-h-28' : 'max-h-20'} w-auto`}
                            loading="lazy"
                            data-testid={`img-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                          />
                        </div>
                      </a>
                    </Link>
                    <h3 className="text-xl font-semibold font-heading mb-3">{partner.name}</h3>
                    <p className="text-muted-foreground mb-4 min-h-[4rem]">{partner.description}</p>
                    <Link href={`/partners/${partner.slug}`}>
                      <a data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button variant="outline" className="w-full gap-2">
                          Learn More <ChevronRight className="h-4 w-4" />
                        </Button>
                      </a>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-heading mb-4">Interested in Becoming a Partner?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Contractors trust people, not ads. ServiceTitan Hacks gives your brand direct access to verified business owners and decision-makers who already trust our platform.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">9,500+</div>
                    <div className="text-sm text-muted-foreground">Verified ServiceTitan Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">4</div>
                    <div className="text-sm text-muted-foreground">Active Marketing Channels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">High</div>
                    <div className="text-sm text-muted-foreground">Engagement & Measurable ROI</div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-4">Sponsorship Tiers Available:</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-semibold mb-1">💎 Diamond Partner</div>
                      <div className="text-muted-foreground text-xs">Full omnichannel exposure</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🥇 Elite Partner</div>
                      <div className="text-muted-foreground text-xs">Weekly multi-channel visibility</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🥈 Featured Partner</div>
                      <div className="text-muted-foreground text-xs">Regular cross-channel features</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">🥉 Community Partner</div>
                      <div className="text-muted-foreground text-xs">Entry-level presence</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://calendly.com/st-hacks/partners"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-schedule-call"
                  >
                    <Button size="lg">Schedule a Call</Button>
                  </a>
                </div>
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
