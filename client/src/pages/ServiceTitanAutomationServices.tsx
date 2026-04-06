import { useState, type ReactNode } from "react";
import founderPhoto from "@assets/slack_1775223018179.png";
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
  Settings,
  AlertCircle,
  Database,
  RefreshCw,
} from "lucide-react";


const outcomes: ReactNode[] = [
  "Reduce manual re-entry and wasted admin time.",
  <><strong>Real-time reporting</strong> you can actually trust.</>,
  "Workflows that run without someone having to remember every step.",
  "Connected tools that pass data between systems automatically.",
  "A foundation that scales with your business.",
];

const systems = [
  {
    icon: FileText,
    title: "ServiceTitan Forms",
    examples: [
      "Create tech-friendly data collection that techs actually use.",
      "Trigger automatic workflows on submission.",
    ],
  },
  {
    icon: Zap,
    title: "Zapier Automations",
    examples: [
      "Build multi-step automations between ServiceTitan and other tools.",
      "Auto-trigger follow-up sequences after job completion.",
    ],
  },
  {
    icon: Settings,
    title: "Make.com Workflows",
    examples: [
      "Handle complex conditional logic that Zapier can't.",
      "Build branching workflows for dispatch, billing, and follow-up.",
    ],
  },
  {
    icon: BarChart3,
    title: "Google Sheets Reporting",
    examples: [
      "Auto-populate live revenue and job dashboards.",
      "Pull ServiceTitan data for end-of-day profitability reports.",
    ],
  },
  {
    icon: Bot,
    title: "AI-Powered Workflows",
    examples: [
      "Set up AI-assisted job summaries and call notes.",
      "Auto-categorize customer requests and route them appropriately.",
    ],
  },
  {
    icon: Bell,
    title: "Notifications & Follow-Up",
    examples: [
      "Send automated technician ETAs to customers.",
      "Route inbound leads to the right CSR instantly.",
    ],
  },
  {
    icon: Database,
    title: "Job & Customer Data",
    examples: [
      "Keep job records clean and consistently filled out.",
      "Sync customer data across platforms without manual entry.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Ongoing Support",
    examples: [
      "Troubleshoot and fix broken automations as your setup evolves.",
      "Optimize existing workflows as your business grows.",
    ],
  },
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
    text: "We talk through your current need, workflow issue, or automation goal.",
  },
  {
    number: "02",
    title: "Get a plan",
    text: "We identify the best solution path and outline what comes next.",
  },
  {
    number: "03",
    title: "Implement the work",
    text: "If it makes sense to move forward, we can build the workflow for you.",
  },
  {
    number: "04",
    title: "Add support if needed",
    text: "For shops that want continued help, we offer ongoing support packages.",
  },
];

const callExpectations = [
  "A conversation about the workflow, forms, reporting, or automation issue you want help with",
  "Guidance on the best way to solve it",
  "Recommendations on what tools or approach make the most sense",
  "A clearer idea of project scope and next steps",
  "A clear recommendation on whether and how to move forward",
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

function ScrollCTAButtonCentered({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        size="lg"
        className="gap-2"
        onClick={() => document.getElementById("strategy-call-form")?.scrollIntoView({ behavior: "smooth" })}
        data-testid="button-cta-scroll-centered"
      >
        Book a $250 Strategy Call
        <ArrowRight className="w-4 h-4" />
      </Button>
      <p className={`text-xs ${dark ? "text-white/50" : "text-muted-foreground"}`}>
        $250 credited toward your project if you move forward.
      </p>
    </div>
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
        {mutation.isPending ? "Submitting..." : "Book a $250 Strategy Call"}
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
              Reclaim 20+ Hours of Admin Time Every Week with Custom ServiceTitan Automations.
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-3xl mx-auto">
              Stop fighting your software. We build the systems that reduce manual work, connect your tools, and help your team run more efficiently.
            </p>
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-white/60">
                A focused strategy session to understand your needs and map out the right solution.
              </p>
              <ScrollCTAButtonCentered dark />
            </div>
            <p className="mt-6 text-xs text-white/35">
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
                  Built for ServiceTitan shops tired of manual workarounds
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If your team is still re-entering data, chasing down missing information, updating spreadsheets by hand, or relying on people to remember every step, the problem is not your people. It is your <strong className="text-foreground">workflow</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We help home service companies build better systems around ServiceTitan using forms, Zapier, Make, Google Sheets, and AI.
                </p>
                <ul className="space-y-3">
                  {[
                    "Your team is re-entering data between ServiceTitan, spreadsheets, and other tools",
                    "Technicians are missing form fields and office staff are chasing down information",
                    "You do not trust your reporting because too much of the process is manual",
                    "You know parts of your workflow should be automated, but they are not",
                    "Important tasks still depend too much on someone remembering to do them",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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

        {/* ── Section 2: The Systems We Build ── */}
        <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-systems">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">What we can build for your business</h2>
              <p className="text-muted-foreground leading-relaxed">
                Each engagement is scoped around the tools and workflows that make the most sense for your business.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="grid-systems">
              {systems.map((system, i) => {
                const Icon = system.icon;
                return (
                  <Card key={i} data-testid={`card-system-${i}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="font-semibold">{system.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {system.examples.map((ex, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 5: Why work with us ── */}
        <section className="py-16 md:py-24 bg-black text-white" data-testid="section-credibility">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10">
              Why work with us
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14" data-testid="grid-stats">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`rounded-md p-6 ${stat.label === "Automations Built" ? "border border-primary/60 bg-primary/5" : "border border-white/10"}`}
                  data-testid={`stat-item-${i}`}
                >
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-white/60 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">A note from the founder</p>
                <blockquote className="border-l-2 border-primary pl-6">
                  <p className="text-white/80 text-lg leading-relaxed italic mb-4">
                    "I spent 12 years owning an HVAC and plumbing company. I didn't build these{" "}
                    <strong className="text-white not-italic">5,000+ automations</strong> because I love tech—I built them because I needed my life back. I'm a contractor who figured out how to make ServiceTitan work for the shop, not the other way around."
                  </p>
                  <cite className="text-white/50 text-sm not-italic">— Bill Brown, Founder of ServiceTitan Hacks &amp; PhoneTap</cite>
                </blockquote>
              </div>
              <div className="flex-shrink-0 w-48 md:w-56">
                <img
                  src={founderPhoto}
                  alt="Bill Brown, Founder"
                  className="w-full rounded-md object-cover"
                />
              </div>
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
              What you get in the strategy call
            </h2>
            <p className="text-muted-foreground mb-8">
              This is a focused working session to understand your situation and map the best path forward.
            </p>
            <ul className="space-y-3 mb-10" data-testid="list-call-expectations">
              {callExpectations.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-8 font-medium">
              If you move forward with implementation, the full $250 is credited toward your project.
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
                  Let's talk about your shop
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form and we will be in touch to schedule a time.
                </p>
              </div>

              {/* Right — form */}
              <Card data-testid="card-inquiry-form">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-1">Book a $250 Strategy Call</h3>
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
