import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, CheckCircle2, PlayCircle, Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import winkToolboxLogo from "@assets/logos.zip - 6_1762019262110.png";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";

const config = {
  webinarTitle: "Payroll and AP Are Not DIY Automations",
  webinarSubtitle: "Why payroll commissions and AP OCR fail in real contractor businesses, and how to remove risk without owning the complexity.",
  webinarDate: "Wednesday, February 18, 2026",
  webinarTime: "2:00 PM",
  timezone: "ET",
  streamYardEmbedUrl: "https://streamyard.com/watch/YOUR_EMBED_ID?embed=true",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Former contractor, operator, and automation advisor helping service businesses reduce operational risk.",
  guestName: "Wink Toolbox Team",
  guestTitle: "Specialists in Payroll & AP Automation",
  guestBio: "Specialists in payroll commission automation and AP OCR with human-in-the-loop safeguards.",
};

const stats = [
  { label: "ServiceTitan Contractors", value: "9,700+" },
  { label: "Real Operator Experience", value: "No DIY" },
];

const learningCards = [
  { 
    title: "Why Payroll Automation Fails", 
    description: "Understand where commission logic, pay structures, and adjustments break most systems and why spreadsheets still dominate payroll." 
  },
  { 
    title: "Why AP OCR Is Harder Than It Looks", 
    description: "Learn why vendor invoices, job costing, and purchase orders defeat AI-only scanning tools." 
  },
  { 
    title: "How Risk Actually Gets Removed", 
    description: "See what safeguards matter when money, trust, and retention are on the line." 
  },
  { 
    title: "How to Evaluate Solutions Correctly", 
    description: "Know what questions to ask vendors before buying or switching systems." 
  },
  { 
    title: "Clarity, Not Complexity", 
    description: "Walk away knowing what should be handled by a specialist vs internal staff." 
  },
];

const agenda = [
  { time: "0:00", topic: "Why payroll and AP are trust systems, not efficiency systems" },
  { time: "5:00", topic: "Why OCR fails without human oversight" },
  { time: "15:00", topic: "Platform tools vs specialist systems" },
  { time: "30:00", topic: "Payroll and commission risk management" },
  { time: "45:00", topic: "Live Q&A" },
  { time: "55:00", topic: "Next steps and resources" },
];

const faqs = [
  {
    question: "Is this a sales webinar?",
    answer: "No. This is an education-first session focused on decision clarity.",
  },
  {
    question: "Is this a DIY automation class?",
    answer: "No. This webinar explains why payroll and AP should not be built internally.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes. All registrants receive access.",
  },
  {
    question: "Can I ask questions live?",
    answer: "Yes. Live Q&A is included.",
  },
];

function RegistrationForm({ className = "" }: { className?: string }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className={className}>
      <div className="w-full relative" style={{ minHeight: "600px", height: "auto" }}>
        {!iframeLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-white/5 rounded-lg"
            data-testid="loading-registration"
          >
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-white/60 text-sm">Loading registration...</p>
            </div>
          </div>
        )}
        <iframe
          src={config.streamYardEmbedUrl}
          width="100%"
          frameBorder={0}
          allow="autoplay; fullscreen"
          className="w-full min-h-[600px] md:min-h-[500px] rounded-lg"
          title="Webinar Registration"
          data-testid="iframe-streamyard-registration"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return null;
  }

  return (
    <div className="flex gap-3 justify-center my-6" data-testid="countdown-timer">
      <div className="text-center">
        <div className="bg-white/10 rounded-lg px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
        </div>
        <span className="text-xs text-white/60 mt-1 block">Days</span>
      </div>
      <div className="text-center">
        <div className="bg-white/10 rounded-lg px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs text-white/60 mt-1 block">Hours</span>
      </div>
      <div className="text-center">
        <div className="bg-white/10 rounded-lg px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs text-white/60 mt-1 block">Min</span>
      </div>
      <div className="text-center">
        <div className="bg-white/10 rounded-lg px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs text-white/60 mt-1 block">Sec</span>
      </div>
    </div>
  );
}

export default function WinkPayrollWebinar() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const eventDate = new Date("2026-02-18T14:00:00-05:00");

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
        description="Learn why payroll and AP automation fails in real contractor businesses and how to remove risk without owning the complexity. Free live webinar."
        keywords="payroll automation, AP automation, HVAC payroll, contractor accounting, OCR invoices"
        canonicalUrl="https://servicetitanhacks.com/webinar/payroll-ap-automation"
      />

      {/* Announcement Bar */}
      <div className="bg-primary text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Live Fireside Chat</span>
          <span className="hidden sm:inline">|</span>
          <span>{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-white/70">Free Training</span>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-primary hover:bg-primary/5"
            onClick={() => scrollToSection("register")}
            data-testid="button-announcement-cta"
          >
            Reserve My Spot
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <p className="text-primary font-semibold uppercase tracking-wider mb-4">Live Fireside Chat</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {config.webinarTitle}
            </h1>
            <p className="text-xl text-white/70 mb-6 max-w-3xl mx-auto">
              {config.webinarSubtitle}
            </p>
            <div className="flex items-center justify-center gap-2 text-white/60 mb-6">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
            </div>
            <CountdownTimer targetDate={eventDate} />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-6">Automating Payroll and AP Without Breaking Trust</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Live training explaining why payroll and accounts payable are the two most dangerous workflows to automate incorrectly, and how contractors should evaluate solutions that protect accuracy, retention, and trust.
            </p>
            <ul className="space-y-4 mb-8 max-w-2xl mx-auto text-left">
              {[
                "Why payroll errors quietly destroy employee confidence",
                "Why AI-only OCR breaks down on real vendor invoices",
                "The difference between automation that shifts work vs removes risk",
                "What human-in-the-loop actually means in practice",
                "How to evaluate payroll and AP solutions without DIY risk",
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
            <p className="text-sm text-white/50 mt-4">Free live training. Replay available to all registrants.</p>
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
              src={winkToolboxLogo} 
              alt="Wink Toolbox" 
              className="h-12 object-contain"
              data-testid="img-wink-logo"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 border-y border-white/10">
        <div className="container mx-auto max-w-2xl px-4">
          <p className="text-center text-white/80 font-medium mb-6">Trusted by the ServiceTitan community</p>
          <div className="grid grid-cols-2 gap-8 text-center mb-6">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/60 text-sm">
            Real operator experience. No sales fluff, no DIY tutorials. This session is designed for decision-makers, not builders.
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You Will Walk Away With</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Decision clarity on payroll and AP automation—not another DIY tutorial.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What We Will Cover</h2>
          <p className="text-center text-white/60 mb-12">
            45 to 60 minutes total
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
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Your Hosts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img 
                src={hostImage} 
                alt={config.hostName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.hostName}</h3>
              <p className="text-primary text-sm mb-4">{config.hostTitle}</p>
              <p className="text-white/60 text-sm">{config.hostBio}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-primary/20 flex items-center justify-center">
                <img 
                  src={winkToolboxLogo} 
                  alt={config.guestName}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-primary text-sm mb-4">{config.guestTitle}</p>
              <p className="text-white/60 text-sm">{config.guestBio}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`}
                className="bg-white/5 border border-white/10 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-white hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 px-4 bg-primary">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Remove Payroll and AP Risk Without Guessing?
          </h2>
          <p className="text-white/80 mb-8">
            Live fireside chat. No fluff. Real contractor context.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => scrollToSection("register")}
            data-testid="button-bottom-cta"
          >
            Reserve My Spot
          </Button>
          <p className="text-sm text-white/60 mt-4">Free live training. Replay included.</p>
        </div>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
          data-testid="button-back-to-top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
