import { useState } from "react";
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
  Zap,
  FileText,
  BarChart3,
  Bell,
  Bot,
  Link2,
  Settings,
  TrendingUp,
  AlertCircle,
  Users,
  Database,
  GitBranch,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const outcomes = [
  "Reduce manual admin work",
  "Improve visibility across the business",
  "Automate repetitive tasks",
  "Clean up broken workflows",
  "Connect the tools you already use",
  "Build systems that scale without adding more chaos",
];

const services = [
  { icon: FileText, label: "ServiceTitan forms setup and optimization" },
  { icon: Zap, label: "ServiceTitan + Zapier setup" },
  { icon: GitBranch, label: "Custom Zap creation" },
  { icon: Settings, label: "Make.com workflow builds" },
  { icon: BarChart3, label: "Google Sheets reporting automations" },
  { icon: Bot, label: "AI-powered workflow implementation" },
  { icon: Bell, label: "Notification and follow-up automations" },
  { icon: Database, label: "Job and customer data workflows" },
  { icon: RefreshCw, label: "Ongoing support and optimization" },
];

const problems = [
  "Forms that are not set up correctly",
  "Forms that technicians are not using consistently",
  "Missing or messy field data",
  "Disconnected systems that do not talk to each other",
  "Office staff wasting time on repetitive tasks",
  "Inconsistent follow-up",
  "Delayed internal communication",
  "Messy reporting",
  "Manual data entry",
  "Workflows that depend too much on one employee",
];

const implementations = [
  { icon: FileText, label: "Set up or improve ServiceTitan forms" },
  { icon: Users, label: "Create technician-friendly forms that collect the right data" },
  { icon: Zap, label: "Trigger workflows after a form is submitted" },
  { icon: BarChart3, label: "Automatically send ServiceTitan data into Google Sheets" },
  { icon: Settings, label: "Create job summary cleanup workflows" },
  { icon: MessageSquare, label: "Route leads and notifications to the right people" },
  { icon: TrendingUp, label: "Build custom reporting workflows" },
  { icon: Link2, label: "Connect forms, email, spreadsheets, and ServiceTitan" },
  { icon: Bot, label: "Set up AI-assisted summaries and process automations" },
];

const stats = [
  { value: "25", label: "Years in Home Services" },
  { value: "5,000+", label: "Automations Built" },
  { value: "12", label: "Years Owning an HVAC & Plumbing Company" },
  { value: "2", label: "Founder: ServiceTitan Hacks & PhoneTap" },
];

const steps = [
  {
    number: "01",
    title: "Book a strategy call",
    text: "We review your current workflows, bottlenecks, tools, and goals.",
  },
  {
    number: "02",
    title: "Get a plan",
    text: "We identify the best opportunities for automation and recommend the right approach.",
  },
  {
    number: "03",
    title: "Implement the work",
    text: "If it makes sense to move forward, we can build the workflow for you.",
  },
  {
    number: "04",
    title: "Add support if needed",
    text: "For companies that want continued help, ongoing support may be available.",
  },
];

const callExpectations = [
  "Your current ServiceTitan setup",
  "Forms, workflows, and reporting gaps",
  "Bottlenecks and inefficiencies",
  "Areas that could be automated",
  "What should be handled with ServiceTitan, Zapier, Make, Sheets, AI, or not automated at all",
  "Whether it makes sense to move into implementation",
];

const interestOptions = [
  "ServiceTitan forms setup and optimization",
  "ServiceTitan + Zapier setup",
  "Make.com workflow builds",
  "Google Sheets reporting automations",
  "AI-powered workflow implementation",
  "Notification and follow-up automations",
  "Job and customer data workflows",
  "Ongoing support and optimization",
];

function ScrollCTAButton() {
  return (
    <button
      onClick={() => document.getElementById("strategy-call-form")?.scrollIntoView({ behavior: "smooth" })}
      data-testid="button-cta-scroll"
    >
      <Button size="lg" className="gap-2">
        Book a Strategy Call
        <ArrowRight className="w-4 h-4" />
      </Button>
    </button>
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

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={mutation.isPending}
        data-testid="button-inquiry-submit"
      >
        {mutation.isPending ? "Submitting..." : "Request a Strategy Call"}
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
        description="Done-for-you ServiceTitan forms, workflows, integrations, and automations for home service companies. Book a strategy call."
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
              ServiceTitan Automation Services
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-4 max-w-3xl mx-auto">
              We help contractors improve operations with ServiceTitan, including forms, plus Zapier, Make, Google Sheets, and AI so your team saves time, reduces manual work, and runs more efficiently.
            </p>
            <p className="text-sm text-white/40 mb-8">
              Forms, workflows, integrations, and implementation for home service companies
            </p>
            <ScrollCTAButton />
            <p className="mt-4 text-xs text-white/35">
              Built for real home service companies using ServiceTitan
            </p>
          </div>
        </section>

        {/* ── Section 1: Built for ServiceTitan shops ── */}
        <section className="py-16 md:py-24 bg-background" data-testid="section-built-for">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                  Built for ServiceTitan shops that want better systems
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If your team is still doing too much manual work, chasing down information, updating spreadsheets by hand, or relying on people to remember every step, you do not have a people problem. You have a workflow problem.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We help home service companies build better systems around ServiceTitan using forms, Zapier, Make, Google Sheets, and AI.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Outcomes you can expect
                </p>
                <ul className="space-y-3" data-testid="list-outcomes">
                  {outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: What we do ── */}
        <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-services">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">What we do</h2>
              <p className="text-primary font-medium mb-4">Practical automation and workflow implementation</p>
              <p className="text-muted-foreground leading-relaxed">
                We help home service companies design and implement better systems around ServiceTitan. That can include improving forms, automating workflows, connecting platforms, cleaning up reporting, and building processes that reduce manual work.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="grid-services">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Card key={i} data-testid={`card-service-${i}`}>
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-medium leading-snug pt-1">{service.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Common problems ── */}
        <section className="py-16 md:py-24 bg-background border-t border-border" data-testid="section-problems">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Common problems we solve</h2>
              <p className="text-muted-foreground">
                Most contractors know they have inefficiencies, but they are not always sure where the breakdown is happening.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="grid-problems">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-md border border-border bg-card"
                  data-testid={`problem-item-${i}`}
                >
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-snug">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Examples ── */}
        <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-implementations">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Examples of what we can help implement
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="grid-implementations">
              {implementations.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-md border border-border bg-background"
                    data-testid={`implementation-item-${i}`}
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium leading-snug pt-1">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 5: Why work with me ── */}
        <section className="py-16 md:py-24 bg-black text-white" data-testid="section-credibility">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10">
              Why work with me
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14" data-testid="grid-stats">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-md p-6"
                  data-testid={`stat-item-${i}`}
                >
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-white/60 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="max-w-3xl">
              <p className="text-white/75 leading-relaxed mb-4">
                I have spent 25 years in home services and 12 years owning and operating an HVAC and plumbing company.
              </p>
              <p className="text-white/75 leading-relaxed mb-4">
                Over the years, I have built more than 5,000 automations and worked extensively with ServiceTitan, workflows, reporting, forms, integrations, and process improvement.
              </p>
              <p className="text-white/75 leading-relaxed mb-4">
                I am also the founder of ServiceTitan Hacks and PhoneTap, where I help contractors use technology, automation, and AI in ways that are practical and useful in the real world.
              </p>
              <p className="text-white/75 leading-relaxed">
                This is not theory. It is built from real experience in the trades, real operational challenges, and real implementation work.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 6: How it works ── */}
        <section className="py-16 md:py-24 bg-background border-t border-border" data-testid="section-how-it-works">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12">How it works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-testid="grid-steps">
              {steps.map((step, i) => (
                <div key={i} className="relative" data-testid={`step-item-${i}`}>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" style={{ width: "calc(100% - 2.5rem)", left: "calc(100% - 1rem)" }} />
                  )}
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-primary">{step.number}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollCTAButton />
          </div>
        </section>

        {/* ── Section 7: What to expect ── */}
        <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-strategy-call">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              What to expect on the strategy call
            </h2>
            <p className="text-muted-foreground mb-8">On the strategy call, we will look at:</p>
            <ul className="space-y-3 mb-10" data-testid="list-call-expectations">
              {callExpectations.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-8 font-medium">
              This call is designed to give you clarity, not a sales pitch.
            </p>
            <ScrollCTAButton />
          </div>
        </section>

        {/* ── Final CTA + Form ── */}
        <section
          id="strategy-call-form"
          className="py-20 md:py-28 bg-background border-t border-border"
          data-testid="section-final-cta"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — copy */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Get Started
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                  Ready to improve your workflows?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If your team is wasting time, dealing with avoidable friction, or missing opportunities because your systems are not connected properly, fill out the form to request a strategy call.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We will look at where you are now, where the bottlenecks are, and what it would take to fix them.
                </p>
              </div>

              {/* Right — form */}
              <Card data-testid="card-inquiry-form">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-1">Request a Strategy Call</h3>
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
