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
import { ChevronUp, CheckCircle2, PlayCircle, Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import tradeRunnerLogo from "@assets/TradeRunner_Logo_w_Website_1767654255967.png";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import guestImage from "@assets/Webinar_Pics_(1)_1767651566557.png";
import webinarHeroImage from "@assets/switchy_images_(9)_1767654151254.png";

// ============================================
// CONFIGURATION - Edit these values
// ============================================
const config = {
  webinarTitle: "How to Find and Recruit A-Player Technicians Not On Job Boards",
  webinarSubtitle: "Live training showing actionable methods any service business can implement this week.",
  webinarDate: "Thursday, January 15, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  zoomRegistrationUrl: "https://zoom.us/webinar/register/YOUR_WEBINAR_ID",
  streamYardEmbedUrl: "https://streamyard.com/watch/u8dm8waDK5V5?embed=true", // StreamYard registration embed
  traderunnerDemoUrl: "https://gotraderunner.com",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Bill helps home service businesses fix their hiring bottlenecks with proven systems. He's trained 1,000+ contractors on ServiceTitan optimization and growth strategies.",
  guestName: "Andre Nordon",
  guestTitle: "Co-Founder, TradeRunner",
  guestBio: "Andre built tools to access 20,000+ techs outside job boards. TradeRunner's AI-powered platform gives HVAC and plumbing companies instant access to verified technicians who aren't on Indeed.",
};

// ============================================
// CONTENT - Edit these sections
// ============================================
const stats = [
  { label: "Verified Techs in Database", value: "20,000+" },
  { label: "Candidate Reply Rate", value: "78%" },
];

const learningCards = [
  { title: "Why Job Boards Fail for Experienced Techs", description: "Walk away understanding the 3 reasons Indeed doesn't work for A-players—and stop wasting money on posts that get ignored." },
  { title: "Where A-Players Actually Are", description: "Learn exactly where top technicians spend their time online so you can reach them directly." },
  { title: "How to Hunt Talent in Minutes", description: "Master the outbound method that lets you contact qualified candidates today—not months from now." },
  { title: "Scripts That Get 70%+ Reply Rates", description: "Get the exact high-reply text templates you can copy, paste, and send immediately." },
  { title: "Live Demo: Real-Time Search in Your Market", description: "Watch us find hundreds of experienced, currently-employed techs in a real market live on the call." },
  { title: "Building an Ongoing Hiring Pipeline", description: "Leave with a repeatable 30-minute daily system to keep your trucks filled year-round." },
];

const agenda = [
  { time: "0:00", topic: "Why hiring good techs feels impossible (and what to do about it)" },
  { time: "5:00", topic: "Why Indeed fails for experienced techs—the data" },
  { time: "12:00", topic: "The 'Invisible Market': Where A-players actually are" },
  { time: "20:00", topic: "LIVE DEMO: Real-time candidate search in a real market" },
  { time: "30:00", topic: "Exclusive offer for ServiceTitan Hacks community" },
  { time: "35:00", topic: "Live Q&A: Your hiring questions answered" },
];

const faqs = [
  {
    question: "Is this really free?",
    answer: "Yes, 100% free. No credit card required. Just register and show up.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes! All registered attendees receive the recording and templates via email. But live attendees get to ask questions and access the exclusive offer.",
  },
  {
    question: "Can I ask questions live?",
    answer: "Absolutely! We reserve the last 10 minutes for live Q&A. Come with your toughest hiring questions.",
  },
  {
    question: "What if I can't make it live?",
    answer: "Register anyway. We'll send you the replay, templates, and scripts within 24 hours.",
  },
];

function RegistrationForm({ className = "" }: { className?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    // Send registration to backend webhook
    try {
      await fetch("/api/webinar-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, companyName, phone, optIn }),
      });
    } catch (error) {
      console.error("Registration webhook error:", error);
    }

    // Redirect to Zoom registration
    const params = new URLSearchParams({
      first_name: firstName,
      last_name: lastName,
      email: email,
      opt_in: optIn ? "1" : "0",
    });

    window.location.href = `${config.zoomRegistrationUrl}?${params.toString()}`;
  };

  // Use StreamYard embed for registration
  return (
    <div className={className}>
      <div style={{ width: "100%", height: 0, position: "relative", paddingBottom: "56.25%" }}>
        <iframe
          src={config.streamYardEmbedUrl}
          width="100%"
          height="100%"
          frameBorder={0}
          allow="autoplay; fullscreen"
          style={{ width: "100%", height: "100%", position: "absolute", left: 0, top: 0, overflow: "hidden" }}
          title="Webinar Registration"
          data-testid="iframe-streamyard-registration"
        />
      </div>
    </div>
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
    <div className="min-h-screen bg-[#000000] text-white">
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

      {/* Hero Image */}
      <section className="pt-8 md:pt-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <img 
            src={webinarHeroImage} 
            alt="The Invisible Labor Market - Live Fireside Chat" 
            className="w-full rounded-lg shadow-2xl"
            data-testid="img-webinar-hero"
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {config.webinarTitle}
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              {config.webinarSubtitle}
            </p>
            <ul className="space-y-4 mb-8 max-w-2xl mx-auto text-left">
              {[
                "Where Top Techs Really Are and How to Reach Them",
                "Live Demonstration: Candidate Search in Your Market",
                "High-Reply Scripts You Can Use Today",
                "A Repeatable 30-Minute Daily Hiring System",
                "Exclusive Offer for the ServiceTitan Hacks Community",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => scrollToSection("register")}
                data-testid="button-hero-register"
              >
                Reserve My Spot
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
            <p className="text-sm text-white/50 mt-4">Free live training. Recording and templates emailed.</p>
          </div>
          <div id="register" className="max-w-4xl mx-auto">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Presented By */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <p className="text-center text-sm text-white/50 mb-6">Presented by</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img 
              src={serviceTitanHacksLogo} 
              alt="ServiceTitan Hacks" 
              className="h-12 object-contain"
              data-testid="img-sth-logo"
            />
            <span className="hidden sm:block text-2xl text-white/50">+</span>
            <img 
              src={tradeRunnerLogo} 
              alt="TradeRunner" 
              className="h-12 object-contain"
              data-testid="img-traderunner-logo"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 border-y border-white/10">
        <div className="container mx-auto max-w-md px-4">
          <div className="grid grid-cols-2 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You'll Walk Away With</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Actionable strategies you can implement this week—not theories, real systems.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCards.map((card, i) => (
              <Card key={i} className="hover-elevate bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-lg">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What We'll Cover</h2>
          <p className="text-center text-white/60 mb-12">
            45 minutes packed with strategies, a live demo, and your questions answered
          </p>
          <div className="space-y-4">
            {agenda.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="text-primary font-mono font-medium">{item.time}</span>
                </div>
                <div className="flex-1 pb-4 border-b border-white/10 last:border-0">
                  <span className="text-white/80">{item.topic}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-white/40 mt-8">
            Agenda is approximate.
          </p>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Your Hosts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="pt-6 text-center">
                <img 
                  src={hostImage} 
                  alt={config.hostName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  data-testid="img-host"
                />
                <p className="text-sm text-primary font-medium mb-1">Host</p>
                <h3 className="text-xl font-bold mb-1 text-white">{config.hostName}</h3>
                <p className="text-sm text-white/60 mb-4">{config.hostTitle}</p>
                <p className="text-sm text-white/60">{config.hostBio}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="pt-6 text-center">
                <img 
                  src={guestImage} 
                  alt={config.guestName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  data-testid="img-guest"
                />
                <p className="text-sm text-primary font-medium mb-1">Guest</p>
                <h3 className="text-xl font-bold mb-1 text-white">{config.guestName}</h3>
                <p className="text-sm text-white/60 mb-4">{config.guestTitle}</p>
                <p className="text-sm text-white/60">{config.guestBio}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:text-white/80">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-white/60">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 text-white bg-[#ee255b]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Fill Your Hiring Pipeline Without Job Boards?
          </h2>
          <p className="text-white/90 mb-8">
            Takes only 10 seconds to register. Free live training with templates included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-black hover:bg-white/90"
              onClick={() => scrollToSection("register")}
              data-testid="button-final-cta"
            >
              Reserve My Spot
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open(config.traderunnerDemoUrl, "_blank")}
              data-testid="button-traderunner-demo"
            >
              Learn More About TradeRunner
            </Button>
          </div>
          <p className="text-sm text-white/70 mt-4">Recording and hiring scripts sent after the event.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              ServiceTitan Hacks
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-white/50 hover:text-white">Privacy</a>
              <a href="/terms" className="text-white/50 hover:text-white">Terms</a>
              <a href="/contact" className="text-white/50 hover:text-white">Contact</a>
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
