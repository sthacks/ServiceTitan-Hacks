import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, BarChart3, TrendingUp, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import metricsGuideImage from "@assets/generated_images/ServiceTitan_metrics_guide_cover_0b043d1e.png";

export default function ServiceTitanMetricsLanding() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { toast } = useToast();

  const benefits = [
    {
      icon: BarChart3,
      title: "112 Essential Metrics Tracked",
      description: "Complete spreadsheet covering every critical KPI for your home service business, from sales to operations to finance.",
    },
    {
      icon: Target,
      title: "Know What to Measure",
      description: "Stop guessing which metrics matter. This guide shows you exactly what to track for sustainable business growth.",
    },
    {
      icon: TrendingUp,
      title: "Benchmark Your Performance",
      description: "Compare your numbers against industry standards and identify opportunities for improvement in every department.",
    },
    {
      icon: CheckCircle2,
      title: "ServiceTitan-Ready",
      description: "Metrics organized to match ServiceTitan reporting, making it easy to pull the data you need from your system.",
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
        description: `We've sent the ServiceTitan Metrics Guide to ${email}. Check your inbox (and spam folder) in the next few minutes.`,
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
      resourceName: "ServiceTitan Metrics Guide" 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Key ServiceTitan Metrics Every Contractor Needs"
        description="Discover the most important KPIs and dashboards for HVAC and home service companies inside ServiceTitan."
        keywords="ServiceTitan metrics, KPI tracking, business metrics, contractor KPIs, performance tracking, ServiceTitan reporting"
        canonicalUrl="https://servicetitanhacks.com/servicetitan-metrics-landing"
        ogImage="https://servicetitanhacks.com/og-servicetitan-metrics.png"
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
                  ServiceTitan Metrics Guide: 112 Essential KPIs
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop flying blind in your business. This comprehensive Excel guide gives you 112 critical metrics to track across sales, operations, marketing, finance, and customer service—all organized to work seamlessly with ServiceTitan reporting.
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
                      src={metricsGuideImage}
                      alt="ServiceTitan Metrics Guide - 112 Essential KPIs for home service contractors"
                      className="w-full h-auto rounded-lg"
                      loading="eager"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold mb-2">Get Your Free Guide</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter your details below and we'll email you the metrics guide instantly.
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
                          data-testid="input-metrics-firstname"
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
                          data-testid="input-metrics-email"
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
                        We'll send you the guide and occasional updates. Unsubscribe anytime.
                      </p>
                      <Button 
                        type="submit" 
                        disabled={leadMutation.isPending} 
                        className="w-full" 
                        size="lg"
                        data-testid="button-submit-metrics"
                      >
                        {leadMutation.isPending ? "Sending..." : "Send Me the Guide 📧"}
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
              Measure What Matters. Grow Your Business.
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join 9,500+ ServiceTitan contractors who use data-driven decision making to optimize operations, increase profitability, and scale sustainably. This metrics guide is your roadmap to understanding what's working and what needs attention in your business.
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
