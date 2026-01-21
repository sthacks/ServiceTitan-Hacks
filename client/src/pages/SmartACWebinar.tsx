import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, CheckCircle2, Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import heroImage from "@assets/smartac_(7)_1769006268306.png";

const config = {
  webinarTitle: "Stop Rebuying Your Own Customers",
  webinarFullTitle: "Stop Rebuying Your Own Customers: The Membership Retention System ServiceTitan Shops Actually Use",
  webinarSubtitle: "Stop paying for the same leads twice. Discover the specialist retention layer that keeps members renewing, booking, and referring - without rebuilding your ServiceTitan setup.",
  webinarDate: "February 11, 2026",
  webinarTime: "2:00 PM",
  timezone: "ET",
  streamYardEmbedUrl: "https://streamyard.com/watch/eUpY6bwVZus2?embed=true",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Expert in fixing operational bottlenecks for 1,000+ contractors.",
  guestName: "SmartAC Specialist",
  guestTitle: "SmartAC",
  guestBio: "Expert in membership retention technology for home service contractors.",
  heroNote: "This is NOT a DIY tutorial. Replay included for all registrants.",
};

const learningCards = [
  { 
    title: "The 4-Step Retention Timeline", 
    description: "From activation to win-back." 
  },
  { 
    title: "The Churn Killer", 
    description: "How to identify and stop cancellations before they happen." 
  },
  { 
    title: "CSR Talk Tracks", 
    description: "Proven scripts for member engagement." 
  },
  { 
    title: "Operational Blueprint", 
    description: "How to overlay SmartAC with your current ServiceTitan workflow." 
  },
];

const agenda = [
  { time: "00:00", topic: "Why Members Actually Leave (It's not what you think)" },
  { time: "00:15", topic: "The 'Invisible Leak' in ServiceTitan Workflows" },
  { time: "00:30", topic: "The SmartAC Retention OS Walkthrough" },
  { time: "00:45", topic: "Contractor Panel: Real Results from the Field" },
  { time: "00:55", topic: "Live Q&A" },
];

const faqs = [
  {
    question: "Is this really free?",
    answer: "Yes, it is an educational session for the contractor community.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes, all registrants receive the recording via email.",
  },
  {
    question: "Can I ask questions?",
    answer: "Yes, we will have a live Q&A session at the end.",
  },
  {
    question: "What if I don't use ServiceTitan?",
    answer: "This session is specifically designed for shops running ServiceTitan.",
  },
];

function RegistrationForm({ className = "" }: { className?: string }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className={className}>
      <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
        {!iframeLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-white/5 rounded-lg"
            data-testid="loading-registration"
          >
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-[#ED254E] border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-white/60 text-sm">Loading registration...</p>
            </div>
          </div>
        )}
        <iframe
          src={config.streamYardEmbedUrl}
          width="100%"
          height="100%"
          frameBorder={0}
          allow="autoplay; fullscreen"
          style={{ position: "absolute", left: 0, top: 0, overflow: "hidden" }}
          className="w-full h-full rounded-lg"
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

export default function SmartACWebinar() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const eventDate = new Date("2026-02-11T14:00:00-05:00");

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
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={`${config.webinarTitle} | Free Live Training`}
        description="Stop paying for the same leads twice. Discover the specialist retention layer that keeps members renewing, booking, and referring. Free live webinar for contractors."
        keywords="membership retention, ServiceTitan, SmartAC, contractor marketing, HVAC membership"
        canonicalUrl="https://servicetitanhacks.com/webinar/membership-retention"
      />

      {/* Announcement Bar */}
      <div className="bg-[#ED254E] text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Free Live Webinar</span>
          <span className="hidden sm:inline">|</span>
          <span>{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-[#ED254E] hover:bg-white/90"
            onClick={() => scrollToSection("register")}
            data-testid="button-announcement-cta"
          >
            Reserve My Spot
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="Stop Rebuying Your Own Customers - The Membership Retention System ServiceTitan Shops Actually Use - Wednesday, Feb 11th, 2026 | 2:00 PM EST"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
              data-testid="img-hero"
            />
          </div>
          
          <div className="text-center mb-12">
            <p className="text-xl text-white/70 mb-6 max-w-3xl mx-auto">
              {config.webinarSubtitle}
            </p>
            <p className="text-sm text-white/50 italic mb-6">{config.heroNote}</p>
            <CountdownTimer targetDate={eventDate} />
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button
                size="lg"
                className="bg-[#ED254E] hover:bg-[#ED254E]/90"
                onClick={() => scrollToSection("register")}
                data-testid="button-hero-register"
              >
                Reserve My Spot
              </Button>
            </div>
          </div>
          
          <div id="register" className="max-w-4xl mx-auto">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Presented By */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <p className="text-center text-sm text-white/50 mb-6">Presented By</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img 
              src={serviceTitanHacksLogo} 
              alt="ServiceTitan Hacks" 
              className="h-12 object-contain"
              data-testid="img-sth-logo"
            />
            <span className="hidden sm:block text-2xl text-white/50">+</span>
            <img 
              src={smartACLogo} 
              alt="SmartAC" 
              className="h-12 object-contain"
              data-testid="img-smartac-logo"
            />
          </div>
        </div>
      </section>

      {/* What You'll Walk Away With */}
      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You'll Walk Away With</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningCards.map((card, i) => (
              <Card key={i} className="hover-elevate bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-[#ED254E]/20 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-[#ED254E]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We'll Cover (Agenda) */}
      <section id="agenda" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We'll Cover</h2>
          <div className="space-y-4">
            {agenda.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-16 flex-shrink-0">
                  <span className="text-[#ED254E] font-mono font-bold">{item.time}</span>
                </div>
                <div className="flex-1 pb-4 border-b border-white/10 last:border-0">
                  <span className="text-white/80">{item.topic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Hosts */}
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
              <p className="text-[#ED254E] text-sm mb-4">{config.hostTitle}</p>
              <p className="text-white/60 text-sm">{config.hostBio}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#ED254E]/20 flex items-center justify-center">
                <img 
                  src={smartACLogo} 
                  alt={config.guestName}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.guestTitle}</p>
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

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-[#ED254E]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stop Rebuying Your Own Customers?
          </h2>
          <p className="text-white/80 mb-8">
            Join us live and discover the retention system that keeps members engaged.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-[#ED254E] hover:bg-white/90"
            onClick={() => scrollToSection("register")}
            data-testid="button-bottom-cta"
          >
            Register for the Webinar
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-sm">
            <img 
              src={serviceTitanHacksLogo} 
              alt="ServiceTitan Hacks" 
              className="h-8 object-contain"
            />
            <span>This is not a sales webinar.</span>
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#ED254E] text-white p-3 rounded-full shadow-lg hover:bg-[#ED254E]/90 transition-all z-50"
          data-testid="button-back-to-top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
