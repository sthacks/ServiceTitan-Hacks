import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";

export default function Resources() {
  const resources = [
    {
      title: "ServiceTitan Setup Checklist",
      description: "Step-by-step guide to optimize your ServiceTitan configuration from day one.",
      type: "Checklist",
      gated: false,
    },
    {
      title: "ROI Calculator Spreadsheet",
      description: "Calculate the return on investment for ServiceTitan tools and integrations.",
      type: "Calculator",
      gated: true,
    },
    {
      title: "Pricebook Templates",
      description: "Pre-built pricebook structures for HVAC, plumbing, and electrical contractors.",
      type: "Template",
      gated: false,
    },
    {
      title: "Call Script Library",
      description: "Proven scripts for booking, upselling, and handling objections.",
      type: "Scripts",
      gated: true,
    },
    {
      title: "ServiceTitan Field Mapping Guide",
      description: "Complete reference for custom fields and integration mapping.",
      type: "Guide",
      gated: false,
    },
    {
      title: "Marketing Campaign Templates",
      description: "Ready-to-use email and SMS campaigns for ServiceTitan Marketing Pro.",
      type: "Template",
      gated: true,
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
                Resources
              </h1>
              <p className="text-xl text-muted-foreground">
                Free downloads, calculators, and templates to help you get more from ServiceTitan. Some resources require a quick email signup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <ResourceCard key={resource.title} {...resource} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
