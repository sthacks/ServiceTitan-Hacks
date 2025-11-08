import { useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import liveswitchLogo from "@assets/logos.zip - liveswitch_1762019262110.png";
import polycamLogo from "@assets/logos.zip - polycam_1762019262110.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";
import serviceCrucibleLogo from "@assets/logos.zip - 5_1762019262110.png";

interface Partner {
  name: string;
  slug: string;
  logo: string;
  description: string;
  url: string;
}

export default function PartnerDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const partnerSlug = params.slug;

  const partners: Partner[] = [
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

  const partner = partners.find((p) => p.slug === partnerSlug);

  if (!partner) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Partner Not Found</h1>
            <Button onClick={() => setLocation("/partners")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Partners
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${partner.name} | ServiceTitan Hacks Partners`}
        description={partner.description}
        keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software`}
        canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <Button
              variant="ghost"
              onClick={() => setLocation("/partners")}
              className="mb-8"
              data-testid="button-back-to-partners"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Partners
            </Button>

            <div className="text-center">
              <div className="mb-8 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={`object-contain ${
                    partner.name === "SmartAC" ||
                    partner.name === "Contractor Commerce" ||
                    partner.name === "Volca.AI"
                      ? "max-h-40"
                      : "max-h-32"
                  } w-auto`}
                  data-testid="img-partner-logo"
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                {partner.name}
              </h1>

              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto" data-testid="text-partner-description">
                {partner.description}
              </p>

              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-learn-more"
              >
                <Button size="lg" className="gap-2">
                  Learn More <ExternalLink className="h-5 w-5" />
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
