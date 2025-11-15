import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Users, GitBranch, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import swimlaneChartImage from "@assets/Tech Turnover Swimlane Chart_1762542649074.png";

export default function SwimlaneChartsLanding() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();

  const benefits = [
    {
      icon: Users,
      title: "Clear Role Definition",
      description: "Show exactly who's responsible for each step in your process—no more confusion or dropped balls.",
    },
    {
      icon: GitBranch,
      title: "Visualize Complex Workflows",
      description: "Map out how work flows between departments and identify bottlenecks before they become problems.",
    },
    {
      icon: Zap,
      title: "Streamline Handoffs",
      description: "Make transitions between team members seamless with clearly documented handoff points.",
    },
    {
      icon: TrendingUp,
      title: "Scale Your Operations",
      description: "Build repeatable processes that work whether you have 5 employees or 50.",
    },
  ];

  const leadMutation = useMutation({
    mutationFn: async (data: { firstName: string; email: string; resourceName: string }) => {
      const response = await apiRequest("POST", "/api/resource-leads", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Check Your Email! 📧",
        description: `We've sent the Swimlane Chart Template to ${email}. Check your inbox (and spam folder) in the next few minutes.`,
      });
      setFirstName("");
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!firstName || !email) {
      toast({
        title: "Missing information",
        description: "Please provide your first name and email.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    leadMutation.mutate({ 
      firstName, 
      email, 
      resourceName: "Streamline Your Business with Swimlane Charts" 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Swimlane Chart Templates for Contractors"
        description="Visualize your processes with contractor-specific swimlane charts that clarify roles, steps and workflow ownership."
        keywords="swimlane chart template, process mapping, workflow visualization, business process, team collaboration, ServiceTitan processes"
        canonicalUrl="https://servicetitanhacks.com/swimlane-charts-landing"
        ogImage="https://servicetitanhacks.com/og-swimlane-charts.png"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">Free Template</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                  Streamline Your Business with Swimlane Charts
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop letting technician turnover disrupt your operations. This free swimlane chart template helps you map out the exact process from hiring to onboarding—so every team member knows their role and nothing slips through the cracks.
                </p>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">What You'll Get:</h2>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <benefit.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-medium">{benefit.title}</strong>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={swimlaneChartImage}
                      alt="Tech Turnover Swimlane Chart - Process mapping template for hiring and onboarding technicians"
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">Get Your Free Template</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter your details below and we'll email you the swimlane chart template instantly.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Your first name"
                          data-testid="input-swimlane-firstname"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          data-testid="input-swimlane-email"
                        />
                      </div>
                      <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ position: "absolute", left: "-9999px" }}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <p className="text-xs text-muted-foreground">
                        We'll send you the template and occasional updates. Unsubscribe anytime.
                      </p>
                      <Button 
                        type="submit" 
                        disabled={leadMutation.isPending} 
                        className="w-full" 
                        size="lg"
                        data-testid="button-submit-swimlane"
                      >
                        {leadMutation.isPending ? "Sending..." : "Send Me the Template 📧"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-4xl px-6 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Build Processes That Scale
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Great companies don't run on guesswork. They run on clear, documented processes that every team member understands. This swimlane chart template gives you the framework to map your workflows, eliminate confusion, and create the kind of operational excellence that sets top contractors apart.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://go.st-hacks.cc/servicetitanhacks"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  Join Our Community
                </Button>
              </a>
              <a href="/resources">
                <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  Explore More Resources
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
