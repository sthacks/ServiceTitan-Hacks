import { useState } from "react";
import { Link } from "wouter";
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
  ArrowLeft,
  Zap,
  Mail,
  MessageSquare,
  FileSpreadsheet,
  Bell,
  UserCheck,
  BarChart3,
  Star,
  Users,
  DollarSign,
  RefreshCw,
  FileText,
} from "lucide-react";

const zapierGroups = [
  {
    label: "Job Lifecycle",
    examples: [
      {
        icon: Mail,
        title: "Job Completion Email",
        bullets: [
          "Auto-send a thank-you email when a job is marked complete in ServiceTitan.",
          "Trigger follow-up messaging sequences without anyone having to remember.",
        ],
      },
      {
        icon: FileSpreadsheet,
        title: "Job Data to Google Sheets",
        bullets: [
          "When a job is booked or completed, automatically add a row to a Google Sheet.",
          "Capture job details, revenue, technician, and customer info without manual entry.",
        ],
      },
      {
        icon: RefreshCw,
        title: "Unsold Estimate Follow-Up",
        bullets: [
          "When an estimate remains unsold after a set number of days, trigger a follow-up email or internal task.",
          "Recover revenue that would otherwise be forgotten.",
        ],
      },
    ],
  },
  {
    label: "Customer Communication",
    examples: [
      {
        icon: MessageSquare,
        title: "Technician ETA Text",
        bullets: [
          "When a tech is dispatched, auto-send the customer an SMS with an estimated arrival time.",
          "Reduce inbound calls and improve the customer experience with real-time updates.",
        ],
      },
      {
        icon: Star,
        title: "Review Request Follow-Up",
        bullets: [
          "Send a review request via SMS or email 2 days after a job is closed.",
          "Route the request to the right review platform based on job type or location.",
        ],
      },
      {
        icon: Users,
        title: "New Customer Welcome Sequence",
        bullets: [
          "When a new customer is created in ServiceTitan, send a welcome email and add them to your email list.",
          "Start the relationship right with automated, consistent communication.",
        ],
      },
      {
        icon: Zap,
        title: "Membership Renewal Reminder",
        bullets: [
          "When a membership is approaching expiration, trigger a reminder sequence to the customer.",
          "Reduce churn and keep recurring revenue on track without manual follow-up.",
        ],
      },
    ],
  },
  {
    label: "Lead & Sales",
    examples: [
      {
        icon: UserCheck,
        title: "Lead to ServiceTitan Customer",
        bullets: [
          "When a new lead submits a web form, automatically create a customer and job in ServiceTitan.",
          "Eliminate manual data entry and get leads into ServiceTitan instantly.",
        ],
      },
      {
        icon: DollarSign,
        title: "High-Value Job Alert",
        bullets: [
          "When a job is booked over a certain revenue threshold, alert the owner via text or email.",
          "Stay on top of large opportunities and make sure nothing falls through the cracks.",
        ],
      },
    ],
  },
  {
    label: "Alerts & Reporting",
    examples: [
      {
        icon: Bell,
        title: "Job Status Change Alert",
        bullets: [
          "Notify the office team via Slack or email when a job status changes to a specific value.",
          "Keep dispatch, billing, and management informed without anyone checking the system.",
        ],
      },
      {
        icon: FileText,
        title: "Form Submission to Sheet",
        bullets: [
          "When a ServiceTitan form is submitted in the field, push the data to a Google Sheet in real time.",
          "Capture technician notes, equipment data, and job details automatically.",
        ],
      },
      {
        icon: BarChart3,
        title: "Daily Revenue Summary",
        bullets: [
          "Every morning, pull the previous day's job data from ServiceTitan and send a summary report.",
          "Get revenue, jobs completed, and open estimates in your inbox before 8am.",
        ],
      },
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Book a strategy call",
    text: "We talk through your current ServiceTitan setup and what you want to automate.",
  },
  {
    number: "02",
    title: "Map your workflows",
    text: "We identify which tools you use and design the right Zapier triggers and actions.",
  },
  {
    number: "03",
    title: "Build and test",
    text: "We build the Zaps, connect your accounts, and test each workflow before handoff.",
  },
  {
    number: "04",
    title: "Ongoing support",
    text: "For shops that want continued help, we offer ongoing support packages.",
  },
];

const interestOptions = [
  "ServiceTitan + Zapier setup",
  "Job completion workflows",
  "Review request automation",
  "Lead routing to ServiceTitan",
  "Google Sheets reporting automations",
  "Notification and follow-up automations",
  "Custom Dashboards",
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
        <Label className="mb-3 block">
          What are you interested in? <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
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
        <Label htmlFor="message">
          How can we help? <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your current Zapier setup, goals, or any specific workflows you want to automate."
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
        {mutation.isPending ? "Submitting..." : "Book a Strategy Call"}
        {!mutation.isPending && <ArrowRight className="w-4 h-4" />}
      </Button>
    </form>
  );
}

export default function ZapierAutomations() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Zapier Automations for ServiceTitan | ServiceTitan Hacks"
        description="Done-for-you Zapier automations for ServiceTitan contractors. We build multi-step workflows that connect ServiceTitan to your email, CRM, Sheets, and more."
        keywords="ServiceTitan Zapier, Zapier ServiceTitan integration, ServiceTitan automation, Zapier workflows for contractors, home service automation"
        canonicalUrl="https://servicetitanhacks.com/servicetitan-automation-services/zapier"
      />
      <Header />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-black text-white py-20 md:py-28" data-testid="section-hero">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Link href="/servicetitan-automation-services">
              <span
                className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer mb-6"
                data-testid="link-breadcrumb-parent"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Automations
              </span>
            </Link>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              Zapier + ServiceTitan
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              Connect ServiceTitan to Everything with Custom Zapier Automations
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-3 max-w-2xl mx-auto">
              We build Zapier workflows that automate the repetitive tasks between ServiceTitan and your other tools.
            </p>
            <p className="text-base text-white/50 mb-10">
              Stop re-entering data. Stop chasing follow-ups. Let Zapier handle it.
            </p>
            <ScrollCTAButton />
          </div>
        </section>

        {/* ── Automations catalog ── */}
        <section className="py-16 md:py-24 bg-background" data-testid="section-zapier-examples">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                Zapier automations we build for ServiceTitan shops
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Real workflows we have implemented for home service companies. Each one eliminates a manual step your team currently has to remember.
              </p>
            </div>
            <div className="space-y-12" data-testid="grid-zapier-examples">
              {zapierGroups.map((group, gi) => (
                <div key={gi} data-testid={`group-zapier-${gi}`}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                    {group.label}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.examples.map((example, i) => {
                      const Icon = example.icon;
                      const globalIndex =
                        zapierGroups.slice(0, gi).reduce((acc, g) => acc + g.examples.length, 0) + i;
                      return (
                        <Card key={i} data-testid={`card-zapier-example-${globalIndex}`}>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-primary" />
                              </div>
                              <h4 className="font-semibold">{example.title}</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {example.bullets.map((bullet, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-how-it-works">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12">How it works</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-testid="grid-steps">
              {steps.map((step, i) => (
                <div key={i} className="relative" data-testid={`step-item-${i}`}>
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-8 left-full h-px bg-border z-0"
                      style={{ width: "calc(100% - 2.5rem)", left: "calc(100% - 1rem)" }}
                    />
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

        {/* ── CTA + Form ── */}
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
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Let's talk about your Zapier setup
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form and we will be in touch to schedule a time.
                </p>
              </div>

              {/* Right — form */}
              <Card data-testid="card-inquiry-form">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-1">Book a Strategy Call</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Tell us what you are working with and we will take it from there.
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
