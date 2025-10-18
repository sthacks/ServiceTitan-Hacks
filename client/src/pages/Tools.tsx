import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";

export default function Tools() {
  const tools = [
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
    },
    {
      name: "SmartVoice Lite",
      description: "AI-powered call summaries sent directly to ServiceTitan after every call.",
      benefits: [
        "No manual note-taking",
        "Capture customer concerns",
        "Track upsell opportunities",
        "Integrate with existing workflow",
      ],
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
                Tools & Products
              </h1>
              <p className="text-xl text-muted-foreground">
                Purpose-built solutions that integrate seamlessly with ServiceTitan. Boost efficiency, close more jobs, and deliver better service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {tools.map((tool) => (
                <ToolCard key={tool.name} {...tool} />
              ))}
            </div>

            <div className="mb-24">
              <h2 className="text-3xl font-bold font-heading mb-8">Compare our tools</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="p-4 text-left">Feature</th>
                      <th className="p-4 text-center">Pricebook Optimizer</th>
                      <th className="p-4 text-center">PhoneCallRecap.ai</th>
                      <th className="p-4 text-center">SmartVoice Lite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "ServiceTitan Integration", values: ["✓", "✓", "✓"] },
                      { feature: "AI-Powered", values: ["✓", "✓", "✓"] },
                      { feature: "Real-time Processing", values: ["—", "✓", "✓"] },
                      { feature: "Batch Operations", values: ["✓", "—", "—"] },
                      { feature: "Call Recording", values: ["—", "✓", "—"] },
                      { feature: "Export Capability", values: ["✓", "✓", "—"] },
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted"}>
                        <td className="p-4 font-medium">{row.feature}</td>
                        {row.values.map((value, i) => (
                          <td key={i} className="p-4 text-center">
                            <span className={value === "✓" ? "text-primary font-bold" : "text-muted-foreground"}>
                              {value}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
