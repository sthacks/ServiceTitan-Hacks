import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import titleBg from "@assets/title-background.png";
import phoneCallRecapImage from "@assets/Copy of Phone Call Recap Infographic (1)_1760903764548.png";
import pricebookOptimizerImage from "@assets/generated_images/Pricebook_optimization_before_after_transformation_28e42589.png";
import titanDashboardsImage from "@assets/Untitled_design_(2)_1765462149620.png";

export default function Tools() {
  const tools = [
    {
      name: "Titan Dashboards",
      description: "Simple, beautiful capacity dashboards that sync directly with ServiceTitan. Know if you're winning or losing at a glance.",
      benefits: [
        "3-day capacity view",
        "Red-to-green dial indicators",
        "Syncs with ServiceTitan",
        "Built-in weather display",
      ],
      tag: "New",
      link: "https://titandashboards.com",
      image: titanDashboardsImage,
    },
    {
      name: "Pricebook Optimizer",
      description: "Transform technical jargon into homeowner-friendly descriptions that win more jobs.",
      benefits: [
        "AI rewrites in plain English",
        "Batch process entire pricebook",
        "Export directly to ServiceTitan",
        "Increase close rates with clarity",
      ],
      tag: "Popular",
      link: "/pricebook-optimizer",
      image: pricebookOptimizerImage,
    },
    {
      name: "PhoneCallRecap.ai",
      description: "Automatically summarize customer calls and log key details to ServiceTitan.",
      benefits: [
        "Real-time call transcription",
        "Action item extraction",
        "Auto-populate ST fields",
        "Searchable call history",
      ],
      tag: "New",
      link: "https://phonecallrecap.ai/",
      image: phoneCallRecapImage,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contractor Apps and Software for ServiceTitan"
        description="Free and premium HVAC contractor tools including dashboards, calculators, automations and AI workflows."
        keywords="ServiceTitan tools, pricebook optimizer, AI tools, HVAC software, automation"
        canonicalUrl="https://servicetitanhacks.com/apps"
        ogImage="https://servicetitanhacks.com/og-tools.png"
      />
      <Header />
      <main className="flex-1">
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #09090b 0%, #1a1b20 100%)' }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                Apps & Products
              </h1>
              <p className="text-xl text-gray-300">
                Purpose-built solutions that integrate seamlessly with ServiceTitan. Boost efficiency, close more jobs, and deliver better service.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              {tools.map((tool) => (
                <ToolCard key={tool.name} {...tool} />
              ))}
            </div>

            <div className="bg-muted rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Need something custom?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We build tailored automations and integrations for contractors with specific workflows. Let's discuss your needs.
              </p>
              <a href="/contact">
                <Button size="lg" data-testid="button-ask-custom-build">
                  Ask About a Custom Build
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
