import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, Users, Building2, Clock, CheckCircle2, Calendar, PlayCircle } from "lucide-react";
import SEO from "@/components/SEO";

// ============================================
// CONFIGURATION - Edit these values
// ============================================
const config = {
  webinarTitle: "The Invisible Labor Market",
  webinarDate: "January 15, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  zoomRegistrationUrl: "https://zoom.us/webinar/register/YOUR_WEBINAR_ID",
  zoomEmbedUrl: "", // Leave empty to use local form, or paste Zoom embed URL
  hostName: "Bill",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Bill helps home service contractors leverage technology to grow their businesses. He's trained over 1,000 contractors on ServiceTitan optimization and growth strategies.",
  guestName: "TradeRunner Team",
  guestTitle: "Hiring & Recruiting Experts",
  guestBio: "The TradeRunner team specializes in helping contractors find and hire A-player technicians using proven sourcing methods that go beyond traditional job boards.",
};

// ============================================
// CONTENT - Edit these sections
// ============================================
const stats = [
  { label: "Attendees trained", value: "1,200+" },
  { label: "Contractors helped", value: "300+" },
  { label: "Avg time to first candidates", value: "7 days" },
  { label: "Repeatable process", value: "Yes" },
];

const learningCards = [
  { title: "Where the invisible talent is", description: "Discover untapped channels where A-players spend time but recruiters don't look." },
  { title: "How to start conversations that get replies", description: "Learn the opening messages that get 3x the response rate of cold outreach." },
  { title: "The 3-message follow-up sequence", description: "A proven sequence that keeps candidates engaged without being pushy." },
  { title: "Filtering for A-player signals", description: "Identify the traits that separate top performers from time-wasters." },
  { title: "Turning leads into booked interviews", description: "Convert interested candidates into scheduled interviews efficiently." },
  { title: "Tracking and improving your pipeline", description: "Simple metrics to measure and optimize your sourcing efforts." },
];

const agenda = [
  { time: "00:00", topic: "Welcome and the real hiring problem" },
  { time: "05:00", topic: "The invisible market explained" },
  { time: "15:00", topic: "The TradeRunner sourcing loop" },
  { time: "30:00", topic: "Scripts and examples" },
  { time: "45:00", topic: "Implementation plan" },
  { time: "55:00", topic: "Q&A" },
];

const testimonials = [
  {
    quote: "I found 3 qualified candidates in my first week using these methods. None of them were on Indeed.",
    name: "Alex R.",
    company: "Comfort Pro HVAC",
    role: "Owner",
  },
  {
    quote: "The scripts alone saved me hours of trial and error. My response rate went from 5% to over 30%.",
    name: "Maria S.",
    company: "Elite Plumbing",
    role: "Operations Manager",
  },
  {
    quote: "Finally, a hiring approach that doesn't rely on luck. I've hired 2 techs using this system.",
    name: "James T.",
    company: "Premier Electric",
    role: "Owner",
  },
];

const faqs = [
  {
    question: "Is this really free?",
    answer: "Yes, this live training is completely free. We want to help as many contractors as possible solve their hiring challenges.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes, registered attendees will receive a replay link. However, live attendees get priority access to bonus materials and can ask questions directly.",
  },
  {
    question: "Who is this for?",
    answer: "This training is designed for home service contractors (HVAC, plumbing, electrical, etc.) who are struggling to find qualified technicians through traditional job boards.",
  },
  {
    question: "What will I get after registering?",
    answer: "You'll receive a confirmation email with the webinar link, calendar invite, and a pre-training checklist to help you prepare.",
  },
  {
    question: "Can I ask questions live?",
    answer: "Absolutely! We reserve the last 15 minutes for live Q&A. You can also submit questions in advance when you register.",
  },
];

function RegistrationForm({ className = "" }: { className?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const params = new URLSearchParams({
      first_name: firstName,
      last_name: lastName,
      email: email,
      opt_in: optIn ? "1" : "0",
    });

    window.location.href = `${config.zoomRegistrationUrl}?${params.toString()}`;
  };

  if (config.zoomEmbedUrl) {
    return (
      <div className={className}>
        <iframe
          src={config.zoomEmbedUrl}
          width="100%"
          height="400"
          frameBorder="0"
          allow="microphone; camera"
          className="rounded-lg"
          title="Webinar Registration"
        />
      </div>
    );
  }

  return (
    <Card className={`${className} border-2 border-primary/30 dark:border-primary/40`}>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary/90 dark:text-primary/80 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <Calendar className="h-4 w-4" />
            {config.webinarDate} at {config.webinarTime} {config.timezone}
          </div>
          <h3 className="text-xl font-bold">Register Free</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                data-testid="input-webinar-first-name"
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Smith"
                data-testid="input-webinar-last-name"
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              data-testid="input-webinar-email"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="optIn"
              checked={optIn}
              onCheckedChange={(checked) => setOptIn(checked as boolean)}
              data-testid="checkbox-webinar-optin"
            />
            <Label htmlFor="optIn" className="text-sm text-muted-foreground cursor-pointer">
              Send me the templates and reminders
            </Label>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg" data-testid="button-webinar-register">
            Save My Seat
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Free registration. No credit card required.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function WebinarLandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <SEO
        title={`${config.webinarTitle} | Free Live Training`}
        description="Learn the TradeRunner method for finding A-player technicians who are not on Indeed. Free live webinar with scripts, templates, and workflows included."
        keywords="hiring technicians, HVAC hiring, contractor recruiting, find technicians, trade hiring"
        canonicalUrl="https://servicetitanhacks.com/webinar/invisible-labor-market"
      />

      {/* Announcement Bar */}
      <div className="bg-primary text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Free Live Training</span>
          <span className="hidden sm:inline">|</span>
          <span>{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-primary/30">Limited Seats</span>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-primary hover:bg-primary/5"
            onClick={() => scrollToSection("register")}
            data-testid="button-announcement-cta"
          >
            Save My Seat
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {config.webinarTitle}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                The TradeRunner method for finding A-players who are not on Indeed.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Find candidates your competitors never see",
                  "Build a repeatable sourcing system in 30 minutes a day",
                  "Improve applicant quality without raising ad spend",
                  "Scripts, templates, and workflows included",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => scrollToSection("register")}
                  data-testid="button-hero-register"
                >
                  Register Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("learn")}
                  data-testid="button-hero-learn"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  See What You'll Learn
                </Button>
              </div>
            </div>
            <div id="register">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-6">
            Stats are examples. Replace with your real numbers.
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You'll Learn</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Walk away with actionable strategies you can implement immediately.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCards.map((card, i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-lg">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Agenda</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            What we'll cover in 60 minutes
          </p>
          <div className="space-y-4">
            {agenda.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="text-primary font-mono font-medium">{item.time}</span>
                </div>
                <div className="flex-1 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-gray-800 dark:text-gray-200">{item.topic}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-8">
            Agenda is approximate.
          </p>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Your Hosts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <p className="text-sm text-primary font-medium mb-1">Host</p>
                <h3 className="text-xl font-bold mb-1">{config.hostName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{config.hostTitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{config.hostBio}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <p className="text-sm text-primary font-medium mb-1">Guest</p>
                <h3 className="text-xl font-bold mb-1">{config.guestName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{config.guestTitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{config.guestBio}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Contractors Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to meet A-players you can't find on job boards?
          </h2>
          <p className="text-primary/30 mb-8">
            Join hundreds of contractors who've transformed their hiring process.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-primary/5"
            onClick={() => scrollToSection("register")}
            data-testid="button-final-cta"
          >
            Register Free
          </Button>
          <p className="text-sm text-primary/30 mt-4">Takes 10 seconds.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ServiceTitan Hacks
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</a>
              <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</a>
              <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
          aria-label="Back to top"
          data-testid="button-back-to-top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
