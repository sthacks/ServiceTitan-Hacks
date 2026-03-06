import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, CheckCircle2, Users, TrendingUp, Target, Repeat } from "lucide-react";
import SEO from "@/components/SEO";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import referProLogo from "@assets/rp-full-color-horizontal-light_1772813582705.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import murphyImage from "@assets/A160356D-F7F8-4337-B209-46F269E2B49A_1_105_c_1772813613622.jpeg";
import heroImage from "@assets/ReferPro_(2)_1772815536588.png";
import productScreenshot from "@assets/Screenshot_2026-03-05_at_2.36.01_PM_1772813613620.png";
import rewardsScreenshot from "@assets/Screenshot_2026-03-05_at_3.31.49_PM_1772813613621.png";

const config = {
  webinarTitle: "The 83% Referral Gap",
  webinarFullTitle: "The 83% Referral Gap: Why Good Reviews Are Not Enough",
  webinarSubtitle: "83% of customers say they're willing to refer their contractor. Yet most companies receive very few actual referrals. Learn why—and how to fix it.",
  webinarDate: "March 31st, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  streamYardEmbedUrl: "https://streamyard.com/watch/9vBwFi4HEtek?embed=true",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Helped 1,000+ contractors optimize operations and fix bottlenecks using AI and automation.",
  guestName: "Murphy Nadauld",
  guestTitle: "Founder & CEO, ReferPro",
  guestBio: "Murphy Nadauld is the Founder and CEO of ReferPro, the referral software that automates referral programs for service businesses—turning customer loyalty into leads and revenue.",
};

const learningPoints = [
  {
    icon: Users,
    title: "Reviews vs. Referrals",
    description: "Why reviews and referrals are not the same thing—and which one actually drives new business."
  },
  {
    icon: Target,
    title: "Where Referrals Are Lost",
    description: "Where referral opportunities are being lost in your customer lifecycle right now."
  },
  {
    icon: TrendingUp,
    title: "Referral ROI Tracking",
    description: "Why most contractors can't track referral ROI—and how top performers do it differently."
  },
  {
    icon: Repeat,
    title: "Systemized Referral Capture",
    description: "How top ServiceTitan contractors systemize referral capture to make it repeatable."
  },
];

const agenda = [
  { time: "0:00", topic: "The 83% gap: Why satisfied customers don't refer automatically" },
  { time: "0:15", topic: "The difference between reviews and referrals (and why it matters)" },
  { time: "0:30", topic: "Where referral opportunities disappear in the job lifecycle" },
  { time: "0:45", topic: "Live walkthrough: How ReferPro automates referral capture" },
  { time: "1:00", topic: "Live Q&A with Bill Brown & Murphy Nadauld" },
];

const faqs = [
  {
    question: "Is this webinar free?",
    answer: "Yes, completely free. We want to help contractors build better referral systems.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes, all registrants receive the recording via email after the event.",
  },
  {
    question: "Do I need to use ReferPro to benefit from this webinar?",
    answer: "No. This session covers the underlying principles of referral systems that apply whether you use software or not. The operational insights are valuable regardless of your current tools.",
  },
  {
    question: "Can I ask questions during the webinar?",
    answer: "Yes, we have a dedicated live Q&A session at the end where Murphy and Bill will answer your questions.",
  },
  {
    question: "Does this work with ServiceTitan?",
    answer: "Yes. ReferPro integrates with ServiceTitan, and this webinar will cover how top ServiceTitan contractors are using referral automation specifically.",
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
              <div className="animate-spin w-8 h-8 border-2 border-[#ED254E] border-t-transparent rounded-full mx-auto mb-3" />
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

  if (timeLeft.expired) return null;

  return (
    <div className="flex gap-3 justify-center my-6" data-testid="countdown-timer">
      {[
        { label: "Days", value: timeLeft.days.toString() },
        { label: "Hours", value: timeLeft.hours.toString().padStart(2, '0') },
        { label: "Min", value: timeLeft.minutes.toString().padStart(2, '0') },
        { label: "Sec", value: timeLeft.seconds.toString().padStart(2, '0') },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-white/10 rounded-lg px-4 py-3 min-w-[70px]">
            <span className="text-3xl font-bold text-white">{value}</span>
          </div>
          <span className="text-xs text-white/60 mt-1 block">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReferralGapWebinar() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const eventDate = new Date("2026-03-31T14:00:00-04:00");

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="The 83% Referral Gap: Why Good Reviews Are Not Enough | Free Live Webinar"
        description="83% of customers say they're willing to refer their contractor. Yet most receive very few referrals. Join Bill Brown & Murphy Nadauld to learn why—and how to fix it."
        keywords="contractor referrals, referral program, ServiceTitan referrals, HVAC referrals, ReferPro, contractor marketing"
        canonicalUrl="https://servicetitanhacks.com/webinar/referral-gap"
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
          <div className="mb-8">
            <img
              src={heroImage}
              alt="The 83% Referral Gap - Live Webinar with ReferPro"
              className="w-full h-auto rounded-lg"
              data-testid="img-hero"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              {config.webinarFullTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              {config.webinarSubtitle}
            </p>
            <CountdownTimer targetDate={eventDate} />
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
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
          <p className="text-center text-sm text-white/50 mb-6">Brought to you by</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img
              src={serviceTitanHacksLogo}
              alt="ServiceTitan Hacks"
              className="h-12 object-contain"
              data-testid="img-sth-logo"
            />
            <span className="hidden sm:block text-2xl text-white/50">+</span>
            <img
              src={referProLogo}
              alt="ReferPro"
              className="h-12 object-contain"
              data-testid="img-referpro-logo"
            />
          </div>
        </div>
      </section>

      {/* About This Webinar */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About This Webinar</h2>
          <div className="prose prose-invert max-w-none text-white/80 text-lg space-y-4">
            <p>
              83% of customers say they are willing to refer their contractor. Yet most companies receive very few actual referrals.
            </p>
            <p>
              In this webinar we will break down why referrals rarely happen automatically, even after great service, and how contractors can create a system that consistently turns satisfied customers into new business.
            </p>
            <p className="font-semibold text-white">You will learn:</p>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Why reviews and referrals are not the same thing",
                "Where referral opportunities are being lost in the customer lifecycle",
                "Why most contractors cannot track referral ROI",
                "How top ServiceTitan contractors systemize referral capture",
                "How automation can turn completed jobs into repeatable referral growth",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#ED254E] mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/60 italic">
              This session will focus on practical operational changes contractors can implement immediately.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Walk Away With */}
      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You'll Walk Away With</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPoints.map((card, i) => (
              <Card key={i} className="hover-elevate bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-[#ED254E]/20 rounded-lg flex items-center justify-center mb-4">
                    <card.icon className="h-6 w-6 text-[#ED254E]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* See ReferPro in Action */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">See How It Works</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            ReferPro makes it simple for customers to refer friends and family—and rewards them automatically when the referral converts.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={productScreenshot}
                alt="ReferPro referral interface on mobile"
                className="rounded-lg w-full max-w-sm mx-auto"
                data-testid="img-product-screenshot"
              />
            </div>
            <div>
              <img
                src={rewardsScreenshot}
                alt="ReferPro rewards redemption portal"
                className="rounded-lg w-full"
                data-testid="img-rewards-screenshot"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-16 md:py-24 px-4">
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
      <section id="speakers" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Your Hosts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={hostImage}
                alt={config.hostName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-host"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.hostName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.hostTitle}</p>
              <p className="text-white/60 text-sm">{config.hostBio}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={murphyImage}
                alt={config.guestName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-guest"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.guestTitle}</p>
              <p className="text-white/60 text-sm">{config.guestBio}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4">
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
            Ready to Close the Referral Gap?
          </h2>
          <p className="text-white/80 mb-8">
            Join us live and leave with a clear plan to turn satisfied customers into a consistent source of new business.
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
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

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
