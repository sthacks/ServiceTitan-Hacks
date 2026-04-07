import { useState } from "react";
import { Link } from "wouter";
import founderPhoto from "@assets/slack_1775223018179.png";
import iconZapier from "@assets/zapier_1775569178686.png";
import iconMake from "@assets/make.com_1775569178686.png";
import iconServiceTitan from "@assets/servicetitan_1775569178686.png";
import iconSheets from "@assets/google_sheets_1775569178686.png";
import iconAI from "@assets/chatgpt_1775569178685.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const services = [
  {
    icon: null,
    logo: iconZapier,
    title: "Zapier Automations",
    description:
      "Multi-step automations between ServiceTitan and your other tools. Auto-trigger follow-ups, sync data, and eliminate re-entry.",
    href: "/servicetitan-automation-services/zapier",
  },
  {
    icon: null,
    logo: iconServiceTitan,
    title: "ServiceTitan Forms",
    description:
      "Tech-friendly data collection your field team actually fills out, with automated workflows triggered on submission.",
    href: null,
  },
  {
    icon: null,
    logo: iconMake,
    title: "Make.com Workflows",
    description:
      "Complex conditional logic Zapier cannot handle. Branching workflows for dispatch, billing, and follow-up.",
    href: null,
  },
  {
    icon: null,
    logo: iconSheets,
    title: "Google Sheets Reporting",
    description:
      "Live revenue dashboards and end-of-day profitability reports that pull directly from ServiceTitan. No manual entry.",
    href: null,
  },
  {
    icon: null,
    logo: iconAI,
    title: "AI-Powered Workflows",
    description:
      "AI-assisted job summaries, call notes, and auto-categorization that routes customer requests to the right person.",
    href: null,
  },
  {
    icon: RefreshCw,
    title: "Ongoing Support",
    description:
      "Troubleshoot broken automations, optimize existing workflows, and add new ones as your business grows.",
    href: null,
  },
];

const stats = [
  { value: "25", label: "Years in Home Services" },
  { value: "5,000+", label: "Automations Built" },
  { value: "12", label: "Years Owning an HVAC & Plumbing Company" },
  { value: "2x", label: "Founder: ServiceTitan Hacks & PhoneTap" },
];

const steps = [
  {
    number: "01",
    title: "Book a strategy call",
    text: "We talk through your workflow issue or automation goal.",
  },
  {
    number: "02",
    title: "Get a plan",
    text: "We identify the best solution and outline what comes next.",
  },
  {
    number: "03",
    title: "We build it",
    text: "If it makes sense to move forward, we build the workflow for you.",
  },
  {
    number: "04",
    title: "Ongoing support",
    text: "For shops that want continued help, we offer support packages.",
  },
];

const interestOptions = [
  "ServiceTitan forms setup and optimization",
  "ServiceTitan + Zapier setup",
  "Make.com workflow builds",
  "Google Sheets reporting automations",
  "AI-powered workflow implementation",
  "Notification and follow-up automations",
  "Job and customer data workflows",
  "Custom Dashboards",
  "Ongoing support and optimization",
];

const trustPoints = [
  "100% risk-free",
  "No heavy sales pitch",
  "Just ServiceTitan experts",
];

function ScrollCTAButton() {
  return (
    <Button
      size="lg"
      className="gap-2"
      onClick={() => document.getElementById("strategy-call-form")?.scrollIntoView({ behavior: "smooth" })}
      data-testid="button-cta-scroll"
    >
      Book a Strategy Call
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}

function StrategyCallForm() {
  const { toast } = useToast();
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (payload: typeof formData & { interests: string[]; message: string }) => {
      await apiRequest("POST", "/api/automation-services-inquiry", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleInterest = (option: string) => {
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const { firstName, lastName, company, phone, email } = formData;

    if (!firstName || !lastName || !company || !phone || !email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
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

    mutation.mutate({ ...formData, interests, message });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4" data-testid="form-success-state">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Request received</h3>
        <p className="text-muted-foreground max-w-sm">
          We will be in touch shortly to schedule your strategy call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-strategy-call">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            data-testid="input-inquiry-firstname"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            data-testid="input-inquiry-lastname"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="company">Company *</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          data-testid="input-inquiry-company"
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          data-testid="input-inquiry-phone"
        />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          data-testid="input-inquiry-email"
        />
      </div>

      <div>
        <Label className="mb-3 block">What are you interested in? <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <div className="space-y-2.5" data-testid="checklist-interests">
          {interestOptions.map((option) => (
            <div key={option} className="flex items-start gap-3">
              <Checkbox
                id={`interest-${option}`}
                checked={interests.includes(option)}
                onCheckedChange={() => toggleInterest(option)}
                data-testid={`checkbox-interest-${option.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}
              />
              <Label htmlFor={`interest-${option}`} className="text-sm font-normal leading-snug cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="message">How can we help you? <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your current setup, goals, or any specific challenges you're running into."
          data-testid="textarea-inquiry-message"
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
        This is a paid strategy session. If we move forward with implementation, the fee is credited toward your project.
      </p>
      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={mutation.isPending}
        data-testid="button-inquiry-submit"
      >
        {mutation.isPending ? "Submitting..." : "Book a Strategy Call"}
        {!mutation.isPending && <ArrowRight className="w-4 h-4" />}
      </Button>
    </form>
  );
}

export default function ServiceTitanAutomationServices() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="ServiceTitan Automation Services | ServiceTitan Hacks"
        description="Done-for-you ServiceTitan automations, forms, workflows, and integrations for home service companies. Book a strategy call."
        keywords="ServiceTitan automation, ServiceTitan forms, Zapier ServiceTitan, Make.com ServiceTitan, home service automation, ServiceTitan integrations"
        canonicalUrl="https://servicetitanhacks.com/servicetitan-automation-services"
      />
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-black text-white py-20 md:py-28" data-testid="section-hero">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Done-for-You Implementation
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              Custom ServiceTitan Automations for Your Shop
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              We build the workflows, forms, reporting, and integrations that eliminate manual work and keep your team running efficiently.
            </p>
            <ScrollCTAButton />
          </div>
        </section>

        {/* ── What we build ── */}
        <section className="py-16 md:py-24 bg-background" data-testid="section-services">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What we build</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Each engagement is scoped to the tools and workflows that make the most sense for your business.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="grid-services">
              {services.map((service, i) => {
                const Icon = service.icon;
                const logo = "logo" in service ? (service as any).logo : null;
                const inner = (
                  <Card
                    key={i}
                    className={service.href ? "hover-elevate transition-shadow cursor-pointer" : ""}
                    data-testid={`card-service-${i}`}
                  >
                    <CardContent className="p-6 flex flex-col gap-4 h-full">
                      {logo ? (
                        <img
                          src={logo}
                          alt={service.title}
                          className="w-11 h-11 rounded-md object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="flex-shrink-0 w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center">
                          {Icon && <Icon className="w-5 h-5 text-primary" />}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                      {service.href && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary" data-testid={`link-service-${i}`}>
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </CardContent>
                  </Card>
                );

                return service.href ? (
                  <Link key={i} href={service.href}>
                    {inner}
                  </Link>
                ) : (
                  inner
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 bg-black" data-testid="section-stats">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center" data-testid="grid-stats">
              {stats.map((stat, i) => (
                <div key={i} data-testid={`stat-item-${i}`}>
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-white/60 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Founder ── */}
        <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-founder">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">A note from the founder</p>
                <blockquote className="text-lg leading-relaxed text-foreground mb-6">
                  "I spent 12 years owning an HVAC and plumbing company. I didn't build these{" "}
                  <strong>5,000+ automations</strong> because I love tech. I built them because I needed my life back. I'm a contractor who figured out how to make ServiceTitan work for the shop, not the other way around."
                </blockquote>
                <p className="font-semibold text-sm">Bill Brown</p>
                <p className="text-sm text-muted-foreground">Founder, ServiceTitan Hacks &amp; PhoneTap</p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src={founderPhoto}
                  alt="Bill Brown, Founder"
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-16 md:py-24 bg-background border-t border-border" data-testid="section-how-it-works">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">How it works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-testid="grid-steps">
              {steps.map((step, i) => (
                <div key={i} className="text-center" data-testid={`step-item-${i}`}>
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-xl font-bold text-primary">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA + Form ── */}
        <section
          id="strategy-call-form"
          className="py-20 md:py-28 bg-card border-t border-border"
          data-testid="section-final-cta"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — copy */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Get Started
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Ready to fix your workflows?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  A focused strategy session to understand your needs and map out the right solutions.
                </p>
                <ul className="space-y-3">
                  {trustPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — form */}
              <Card data-testid="card-inquiry-form">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-1">Book a Strategy Call</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill out the form and we will be in touch to schedule a time.
                  </p>
                  <StrategyCallForm />
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
