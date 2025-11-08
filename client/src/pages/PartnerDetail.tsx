import { useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ArrowLeft, CheckCircle2, BarChart3, Zap, Users, ClipboardCheck, Cog, DollarSign, Heart } from "lucide-react";
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
      description: "Wink Toolbox connects your tech stack, automates your reporting and back-office workflows, and gives home-service companies the clarity they need to scale.",
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
      description: "We help HVAC, plumbing, and electrical companies grow stronger, run smoother, and make more profit.",
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

  // Render detailed Wink Toolbox page
  if (partner.slug === "wink-toolbox") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software, reporting automation, business intelligence`}
          canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
        />
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-6xl px-6">
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
                    className="object-contain max-h-32 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  Transform your numbers into actionable insights — without adding another system.
                </h1>

                <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto" data-testid="text-partner-description">
                  {partner.description}
                </p>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-demo-cta"
                >
                  <Button size="lg" className="gap-2">
                    Book a Demo <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* What Wink Toolbox Does */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-what-it-does">
                What Wink Toolbox Does
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-card border-0" data-testid="card-feature-data">
                  <CardContent className="pt-6">
                    <BarChart3 className="h-12 w-12 text-primary mb-4" />
                    <p className="text-foreground">
                      Wink Toolbox lets you pull in data from your field-service, inventory and accounting systems into a single dashboard so you finally have one place to trust.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-automation">
                  <CardContent className="pt-6">
                    <Zap className="h-12 w-12 text-primary mb-4" />
                    <p className="text-foreground">
                      It also gives you automation tools to stop the manual busyness—trigger follow-up tasks, send alerts, run recurring reports automatically.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-feature-integration">
                  <CardContent className="pt-6">
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <p className="text-foreground">
                      Wink is built for trade and field-service operations (HVAC, plumbing, electrical etc.), integrates with dozens of popular platforms (including ServiceTitan), and works with your existing systems rather than replacing them.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why It Matters */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-why-matters">
                Why It Matters for Your Business
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3" data-testid="benefit-time">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Stop wasting time merging spreadsheets and chasing data.</p>
                </div>
                <div className="flex gap-3" data-testid="benefit-visibility">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Get real-time visibility into jobs, inventory, margins and cash flow.</p>
                </div>
                <div className="flex gap-3" data-testid="benefit-automation">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Automate repetitive kindred tasks so your team focuses on growth, not grunt work.</p>
                </div>
                <div className="flex gap-3" data-testid="benefit-truth">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-foreground">Build one consistent "source of truth" so everyone is looking at the same numbers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Spotlight */}
          <section className="py-16 bg-black text-white">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-features">
                Features Spotlight
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3" data-testid="feature-dashboards">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Unlimited dashboards & reports that blend multiple data sources.</p>
                </div>
                <div className="flex gap-3" data-testid="feature-formulas">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Excel-style formulas, pivot tables, conditional formatting so you can customise the analysis yourself.</p>
                </div>
                <div className="flex gap-3" data-testid="feature-automation-rules">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Automation rules: send notifications via email, Slack or SMS; trigger follow-on tasks based on your business rules.</p>
                </div>
                <div className="flex gap-3" data-testid="feature-integrations">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Prebuilt integrations with 25+ software tools (ServiceTitan, QuickBooks, simPRO, HubSpot etc.).</p>
                </div>
                <div className="flex gap-3" data-testid="feature-pricing">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p>Pricing tiers that scale from startup to enterprise so you pick the level you need.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Who It's For */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-6 text-center" data-testid="heading-who-for">
                Who It's For
              </h2>
              <p className="text-lg text-foreground text-center max-w-3xl mx-auto mb-8" data-testid="text-target-audience">
                Ideal for home-service business owners, operations leads and consultants working with HVAC, plumbing, electrical or other trade firms. If your team uses ServiceTitan (or similar), and you're looking to turn data into action—this is the tool.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6" data-testid="heading-final-cta">
                Ready to Unlock Your Growth Metrics?
              </h2>
              <p className="text-xl mb-8 text-white/90" data-testid="text-cta-description">
                Book a personalised demo of Wink Toolbox today and see how you can eliminate your reporting bottlenecks and unlock your growth metrics.
              </p>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-final-cta"
              >
                <Button size="lg" variant="outline" className="gap-2 bg-white text-primary hover:bg-white/90 border-white">
                  Book Your Demo <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Render detailed Service Crucible page
  if (partner.slug === "service-crucible") {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO
          title={`${partner.name} | ServiceTitan Hacks Partners`}
          description={partner.description}
          keywords={`${partner.name}, ServiceTitan partner, contractor tools, HVAC software, business consulting, operations optimization`}
          canonicalUrl={`https://servicetitanhacks.com/partners/${partner.slug}`}
        />
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-6xl px-6">
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
                    className="object-contain max-h-32 w-auto"
                    data-testid="img-partner-logo"
                  />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6" data-testid="text-partner-name">
                  What We Do at Service Crucible
                </h1>

                <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto" data-testid="text-partner-description">
                  {partner.description}
                </p>

                <p className="text-lg text-foreground mb-8 max-w-3xl mx-auto">
                  Many contractors start small, wearing all the hats—running calls, handling money, and managing people. We help them build real systems so the business can grow without falling apart.
                </p>

                <p className="text-lg text-foreground mb-12 max-w-3xl mx-auto">
                  Our team has worked in the trades, so we know what it takes. We don't give you fluffy advice—we build clear steps and tools you can actually use.
                </p>

                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-learn-more-hero"
                >
                  <Button size="lg" className="gap-2">
                    Get Started <ExternalLink className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* How We Help */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center" data-testid="heading-how-we-help">
                Here's How We Help
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card border-0" data-testid="card-service-audit">
                  <CardContent className="pt-6">
                    <ClipboardCheck className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">The Crucible Audit</h3>
                    <p className="text-foreground">
                      Find out what's working and what's not in your business.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-service-execution">
                  <CardContent className="pt-6">
                    <Cog className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Execution Hub</h3>
                    <p className="text-foreground">
                      Get step-by-step systems to manage jobs, money, and people better.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-service-financial">
                  <CardContent className="pt-6">
                    <DollarSign className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Financial Tools</h3>
                    <p className="text-foreground">
                      Learn how to price for profit and track your numbers the right way.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0" data-testid="card-service-culture">
                  <CardContent className="pt-6">
                    <Heart className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Culture and Leadership</h3>
                    <p className="text-foreground">
                      Build a strong team that takes pride in their work.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Our Goal */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6" data-testid="heading-our-goal">
                Our Goal
              </h2>
              <p className="text-xl text-foreground max-w-3xl mx-auto" data-testid="text-goal-description">
                Our goal is simple—help you turn your business into one that runs smoothly, makes solid profit, and gives you freedom from the daily chaos.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-primary text-white">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <h2 className="text-3xl font-bold font-heading mb-6" data-testid="heading-final-cta">
                Ready to Grow Stronger?
              </h2>
              <p className="text-xl mb-8 text-white/90" data-testid="text-cta-description">
                Let Service Crucible help you build the systems and team you need to scale your business with confidence.
              </p>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-final-cta"
              >
                <Button size="lg" variant="outline" className="gap-2 bg-white text-primary hover:bg-white/90 border-white">
                  Get Started Today <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Default partner page layout for all other partners
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
