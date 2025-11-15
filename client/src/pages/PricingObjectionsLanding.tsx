import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Shield, TrendingUp, MessageSquare, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import pricingIcebergImage from "@assets/iceberg_1762542674937.png";

export default function PricingObjectionsLanding() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();

  const benefits = [
    {
      icon: Shield,
      title: "Defend Your Value",
      description: "Stop feeling defensive when customers question your pricing. This visual shows exactly what they're paying for—beyond just parts and labor.",
    },
    {
      icon: MessageSquare,
      title: "Communicate with Confidence",
      description: "Turn pricing conversations from confrontational to educational. Help customers see the full picture of what makes your service worth it.",
    },
    {
      icon: TrendingUp,
      title: "Close More Sales",
      description: "When customers understand the true cost of doing business, they're more likely to say yes to your pricing and appreciate your expertise.",
    },
    {
      icon: Users,
      title: "Train Your Team",
      description: "Give your CSRs and techs a powerful tool to explain pricing objections with confidence and professionalism.",
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
        description: `We've sent the Pricing Objections graphic to ${email}. Check your inbox (and spam folder) in the next few minutes.`,
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
      resourceName: "Master Your Pricing Objections" 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="HVAC Pricing Objections Script and Guide"
        description="Learn how to handle pricing objections with proven scripts for HVAC and home service sales teams to close more high-value jobs."
        keywords="pricing objections, pricing strategy, service pricing, contractor pricing, explain your pricing, pricing iceberg"
        canonicalUrl="https://servicetitanhacks.com/pricing-objections-landing"
        ogImage="https://servicetitanhacks.com/og-pricing-objections.png"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm font-medium text-primary uppercase tracking-wide">Free Visual Tool</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                  Master Your Pricing Objections
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop feeling defensive when customers say "that's expensive!" This powerful visual shows the iceberg of costs behind your pricing—what customers see (technician, time, parts) versus everything your pricing actually covers (benefits, training, insurance, tools, supplies, and more).
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
                  <div className="aspect-[4/3] bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-8">
                    <img
                      src={pricingIcebergImage}
                      alt="Pricing iceberg graphic showing visible costs versus hidden business expenses"
                      className="w-full h-auto"
                      loading="eager"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">Get Your Free Graphic</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter your details below and we'll email you the "Why It Costs What It Costs" graphic instantly.
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
                          data-testid="input-pricing-firstname"
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
                          data-testid="input-pricing-email"
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
                        We'll send you the graphic and occasional updates. Unsubscribe anytime.
                      </p>
                      <Button 
                        type="submit" 
                        disabled={leadMutation.isPending} 
                        className="w-full" 
                        size="lg"
                        data-testid="button-submit-pricing"
                      >
                        {leadMutation.isPending ? "Sending..." : "Send Me the Graphic 📧"}
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
              Transform Tension Into Trust
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Your pricing isn't just a number—it reflects your commitment to quality, safety, training, and long-term customer satisfaction. This visual helps customers understand that choosing you means choosing a company that invests in excellence at every level. Stop defending. Start educating.
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
