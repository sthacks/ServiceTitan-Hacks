import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PricebookOptimizer() {
  const howItWorksItems = [
    {
      title: "Removes jargon",
      description: "while preserving a professional tone that communicates precision and expertise.",
    },
    {
      title: "Highlights real homeowner benefits",
      description: "such as improved comfort, performance, and peace of mind.",
    },
    {
      title: "Creates relatable examples",
      description: "that show the importance of doing the job right the first time.",
    },
    {
      title: "Focuses on craftsmanship and care",
      description: "instead of \"quick\" or \"easy\" fixes.",
    },
    {
      title: "Emphasizes differentiators",
      description: "like superior materials, technology, and long-term reliability.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Clear, Confident Communication for Homeowners
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                This AI-powered writing assistant helps contractors transform technical product and service descriptions into language homeowners instantly understand and trust. Instead of jargon or over-simplified phrases, it delivers copy that reflects true craftsmanship, quality, and care.
              </p>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">What It Does</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  It rewrites complex technical details into confident, value-driven explanations that show expertise without overwhelming the homeowner. Each description focuses on comfort, safety, reliability, and efficiency—helping homeowners appreciate the skill behind the work.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">How It Works</h2>
                <ul className="space-y-4">
                  {howItWorksItems.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-semibold">{item.title}</span>{" "}
                        <span className="text-muted-foreground">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-heading mb-6">Why It Matters</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When technicians speak with confidence and clarity, homeowners feel informed—not sold. This builds trust, reinforces professionalism, and helps every contractor stand out as an expert who delivers lasting quality and comfort.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
