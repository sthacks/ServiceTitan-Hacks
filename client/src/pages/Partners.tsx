import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import liveswitchLogo from "@assets/logos.zip - liveswitch_1762019262110.png";
import polycamLogo from "@assets/logos.zip - polycam_1762019262110.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";
import serviceCrucibleLogo from "@assets/logos.zip - 5_1762019262110.png";

export default function Partners() {
  const [, setLocation] = useLocation();
  
  const partners = [
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
      description: "Service Crucible helps HVAC, plumbing, and electrical companies grow, boost profits, and build systems that run without daily chaos.",
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
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-4 text-center">Tools that save time, cut mistakes, and help you grow</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center">
              These partner tools were picked because they solve real problems for ServiceTitan contractors. Each one helps your team work faster, book more jobs, and reduce busy work in the office and the field.
            </p>
            
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">What these tools help you do:</h3>
              <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                <li>• Automate repeat tasks</li>
                <li>• Keep your pricebook clean</li>
                <li>• Track calls and book more appointments</li>
                <li>• Sell filters, services, and systems online</li>
                <li>• Grow your memberships</li>
                <li>• Speed up invoice and document entry</li>
                <li>• Capture job sites in 3D</li>
                <li>• Build useful dashboards and reports</li>
              </ul>
            </div>

            <p className="text-muted-foreground mt-6 text-center">
              Every tool on this page is used by real contractors and supports day-to-day work. Pick the tools that fit your business and help your team work smarter.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">Our Partners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6 text-center flex flex-col">
                    <div 
                      className="block mb-6 cursor-pointer" 
                      onClick={() => setLocation(`/partners/${partner.slug}`)}
                    >
                      <div className="h-32 flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className={`object-contain ${partner.name === 'SmartAC' || partner.name === 'Contractor Commerce' || partner.name === 'Volca.AI' ? 'max-h-28' : 'max-h-20'} w-auto`}
                          loading="lazy"
                          data-testid={`img-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold font-heading mb-3">{partner.name}</h3>
                    <p className="text-muted-foreground mb-4 min-h-[4rem]">{partner.description}</p>
                    <Link href={`/partners/${partner.slug}`}>
                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                        data-testid={`link-partner-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        Learn More <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold font-heading mb-4">Interested in Partnering with Us?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Reach 9,500+ verified ServiceTitan contractors who trust our platform. Learn about our sponsorship opportunities and how we can help grow your business.
                </p>
                <Link href="/sponsors">
                  <Button size="lg" data-testid="link-become-sponsor">
                    Learn About Sponsorship
                  </Button>
                </Link>
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
