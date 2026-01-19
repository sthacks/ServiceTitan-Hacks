import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Zap, Workflow, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import automationPlaybookImage from "@assets/generated_images/Automation_playbook_cover_design_a88e140b.png";

export default function AutomationPlaybookLanding() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();

  const benefits = [
    {
      icon: Zap,
      title: "When to Use Zapier vs Wink",
      description: "Learn the strengths of each platform and which tool fits your specific automation needs best.",
    },
    {
      icon: Workflow,
      title: "Build Hybrid Workflows",
      description: "Discover how to combine both tools for maximum efficiency and create powerful automation stacks.",
    },
    {
      icon: CheckCircle2,
      title: "Setup Tips & Best Practices",
      description: "Get expert guidance on configuration, testing, and maintaining your automations for long-term success.",
    },
    {
      icon: BookOpen,
      title: "Real-World Examples",
      description: "See practical automation stacks built specifically for ServiceTitan contractors like you.",
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
        description: `We've sent the Automation Playbook to ${email}. Check your inbox (and spam folder) in the next few minutes.`,
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
      resourceName: "Automation Playbook: Zapier + Wink" 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Automation Playbook for HVAC and ServiceTitan"
        description="A practical automation playbook for HVAC and home service contractors using ServiceTitan, AI and workflow automation."
        keywords="Zapier ServiceTitan, Wink automation, ServiceTitan automation, workflow automation, contractor tools"
        canonicalUrl="https://servicetitanhacks.com/automation-playbook-landing"
        ogImage="https://servicetitanhacks.com/og-automation-playbook.png"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">Free Digital Download</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                  Automation Playbook: Zapier + Wink
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop wondering which automation tool to use. This free playbook shows you exactly when to use Zapier, when to use Wink, and how to combine both for maximum efficiency in your ServiceTitan operations.
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
                  <div className="aspect-video bg-black flex items-center justify-center p-8">
                    <img
                      src={automationPlaybookImage}
                      alt="Automation Playbook: Zapier + Wink - Free guide for ServiceTitan contractors"
                      className="w-full h-auto rounded-lg"
                      loading="eager"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">Get Your Free Playbook</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter your details below and we'll email you the playbook instantly.
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
                          data-testid="input-playbook-firstname"
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
                          data-testid="input-playbook-email"
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
                        We'll send you the playbook and occasional updates. Unsubscribe anytime.
                      </p>
                      <Button 
                        type="submit" 
                        disabled={leadMutation.isPending} 
                        className="w-full" 
                        size="lg"
                        data-testid="button-submit-playbook"
                      >
                        {leadMutation.isPending ? "Sending..." : "Send Me the Playbook 📧"}
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
              Stop Guessing. Start Automating Smarter.
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join 10,000+ ServiceTitan contractors who are using automation to save time, reduce errors, and grow their businesses. This playbook is your first step toward mastering the tools that make it all possible.
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
