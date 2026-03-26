import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import shareWillowLogo from "@assets/sharewillow_logo_1774534288734.png";
import ryanShankImage from "@assets/channels4_profile_1774537058812.jpg";
import jarodSmithImage from "@assets/jarod-smith-DA-thda3_1774537143521.jpeg";
import heroPromoImage from "@assets/sharewillow1_1774540493240.png";

const config = {
  webinarTitle: "Why Most Technician Incentive Plans Fall Apart",
  webinarSubtitle: "And what a 10-truck drain cleaning company did instead",
  webinarSupportingLine:
    "One contractor switched to a 20% performance pay model, cut payroll admin from a full day to under an hour a week, and watched a 19-year-old tech hit a $186,000 annualized run rate in under six months. This is a conversation about how they built that system and what most contractors get wrong before they even start.",
  webinarFeaturing: "Featuring Bill Brown (ServiceTitan Hacks), Jarod Smith (Clogbusters), and Ryan Shank (ShareWillow)",
  webinarDate: "Wednesday, April 14, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  registrationUrl:
    "https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5YjAxZjc3ODgwNjllYjk1YTJlZTA1MyIsInByb2plY3RJZCI6IjY5YjAxZjc3MWJiOWQxOTdlNjJiY2MxOCJ9",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Bill previously owned and scaled a residential HVAC company and now works with home service contractors across the country on operations, systems, and team performance. He hosts this conversation and keeps it grounded in what actually works in the field.",
  contractorName: "Jarod Smith",
  contractorTitle: "Owner, Clogbusters | Des Moines, Iowa",
  contractorBio: "Jarod runs a 10-truck drain cleaning operation and has built one of the more unusual cultures in the trades. Every number gets posted. Every tech knows where they stand. His pay model is 20% performance-based, and he believes most contractors are underpaying their best people without realizing it.",
  guestName: "Ryan Shank",
  guestTitle: "Founder, ShareWillow",
  guestBio:
    "Ryan built ShareWillow after watching how difficult it was for service companies to manage performance pay without spreadsheets or outside consultants. He will provide context on how contractors typically structure these plans and where the common breakdowns happen.",
};

const talkPoints = [
  "Why most technician bonus plans eventually stop working",
  "The difference between commissions, bonuses, and profit sharing",
  "How Clogbusters structured performance pay across 10 trucks",
  "What happens to team culture when you post the numbers publicly",
  "How to build an incentive plan your techs can actually track themselves",
  "What changes when employees have skin in the game",
];

const takeaways = [
  {
    title: "A clear picture of why your current plan may not be doing what you think it is",
    description: "The common patterns that cause incentive plans to create confusion or resentment instead of motivation.",
  },
  {
    title: "A real-world model to look at",
    description: "How Clogbusters built a 20% performance pay structure that runs with almost no manual admin.",
  },
  {
    title: "A framework for tying pay to the numbers that matter",
    description: "Revenue, reviews, memberships, and other KPIs your team can actually control.",
  },
  {
    title: "Practical ideas you can act on without rebuilding your whole comp structure",
    description: "Small changes that increase engagement and accountability before you touch anything else.",
  },
];

const faqs = [
  {
    question: "Is this a sales webinar?",
    answer: "No. The conversation is focused on incentive plan design and contractor experience. ShareWillow is the sponsor and will be mentioned, but this is not a product demo or pitch.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes. Everyone who registers gets access to the replay.",
  },
  {
    question: "Do I need to use ShareWillow to get value from this?",
    answer: "No. The discussion covers pay philosophy, plan structure, and team culture. Those topics apply regardless of what tools you use.",
  },
  {
    question: "Can I ask questions live?",
    answer: "Yes. We will open Q&A at the end of the session.",
  },
  {
    question: "Who is this for?",
    answer: "Owners, GMs, and operators in HVAC, plumbing, electrical, and other home service trades who are thinking about technician pay, retention, or team performance.",
  },
];

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
      expired: false,
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
        { label: "Hours", value: timeLeft.hours.toString().padStart(2, "0") },
        { label: "Min", value: timeLeft.minutes.toString().padStart(2, "0") },
        { label: "Sec", value: timeLeft.seconds.toString().padStart(2, "0") },
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

export default function IncentivePlanWebinar() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const eventDate = new Date("2026-04-14T14:00:00-04:00");

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Why Most Technician Incentive Plans Fall Apart | Free Live Fireside Chat"
        description="A 10-truck contractor cut payroll admin by 90% and built a 20% performance pay model. Bill Brown, Jarod Smith (Clogbusters), and Ryan Shank (ShareWillow) break down what works. Free April 14, 2026."
        keywords="contractor bonus plans, performance pay, technician incentives, ServiceTitan, profit sharing, ShareWillow, Clogbusters"
        canonicalUrl="https://servicetitanhacks.com/webinar/incentive-plan-problem"
      />

      {/* Announcement Bar */}
      <div className="bg-[#ED254E] text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Free Live Fireside Chat</span>
          <span className="hidden sm:inline">|</span>
          <span>{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
          <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-[#ED254E] hover:bg-white/90"
              data-testid="button-announcement-cta"
            >
              Save My Seat
            </Button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <img
            src={heroPromoImage}
            alt="Why Most Technician Incentive Plans Fall Apart — Live Fireside Chat"
            className="w-full max-w-2xl mx-auto rounded-xl mb-8 shadow-lg"
            data-testid="img-hero-promo"
          />
          <p className="text-[#ED254E] text-sm font-semibold uppercase tracking-widest mb-4">
            Live Fireside Chat
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "Oxygen, sans-serif" }}>
            {config.webinarTitle}
          </h1>
          <p className="text-2xl md:text-3xl text-white/70 font-medium mb-6">
            {config.webinarSubtitle}
          </p>
          <p className="text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed text-lg">
            {config.webinarSupportingLine}
          </p>
          <p className="text-white/40 text-sm mb-2">
            {config.webinarFeaturing}
          </p>
          <p className="text-white/40 text-sm mb-2">
            {config.webinarDate} &nbsp;|&nbsp; {config.webinarTime} {config.timezone}
          </p>
          <p className="text-white/40 text-sm mb-6">
            Free live event + replay for all registrants
          </p>
          <CountdownTimer targetDate={eventDate} />
          <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#ED254E] hover:bg-[#ED254E]/90 px-10"
              data-testid="button-hero-register"
            >
              Save My Seat
            </Button>
          </a>
        </div>
      </section>

      {/* Proof Points Bar */}
      <section className="py-10 px-4 bg-white/5 border-t border-b border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "20%", label: "Performance-based pay model" },
              { stat: "90%", label: "Less time on payroll admin" },
              { stat: "$186K", label: "Annualized run rate, 19-year-old tech" },
              { stat: "<1 hr", label: "Payroll processing per week" },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <div className="text-3xl font-bold text-[#ED254E] mb-1">{stat}</div>
                <div className="text-white/55 text-sm leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About This Conversation */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About This Conversation</h2>
          <div className="text-white/75 text-lg space-y-5 leading-relaxed">
            <p>Most owners want their techs to think like owners.</p>
            <p>
              The problem is that most incentive plans create confusion instead of motivation. Techs do not understand how their pay is calculated. Owners spend hours every week running the numbers by hand. And when a plan is too complicated to explain, it stops driving behavior.
            </p>
            <p>
              In this fireside chat, Bill Brown sits down with Jarod Smith from Clogbusters and Ryan Shank from ShareWillow to talk through what actually works, why most bonus structures break down, and how to build a pay model your team understands and competes inside of.
            </p>
            <p>This is not a sales presentation.</p>
            <p>
              It is a practical conversation between contractors and people who work with contractors every day.
            </p>
          </div>
        </div>
      </section>

      {/* Presented By */}
      <section className="py-6 px-4 border-t border-b border-white/10">
        <div className="container mx-auto max-w-2xl">
          <p className="text-center text-sm text-white/40 mb-6">Brought to you by</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img
              src={serviceTitanHacksLogo}
              alt="ServiceTitan Hacks"
              className="h-7 object-contain"
              data-testid="img-sth-logo"
            />
            <span className="hidden sm:block text-2xl text-white/30">+</span>
            <img
              src={shareWillowLogo}
              alt="ShareWillow"
              className="h-7 object-contain"
              data-testid="img-sharewillow-logo"
            />
          </div>
        </div>
      </section>

      {/* What We'll Talk Through */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What We'll Talk Through</h2>
          <ul className="space-y-4">
            {talkPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-4 text-white/80 text-lg">
                <CheckCircle2 className="h-5 w-5 text-[#ED254E] mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What You Should Leave With */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Should Leave With</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {takeaways.map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-base font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who's Joining the Conversation */}
      <section id="speakers" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Who's Joining the Conversation</h2>
          <p className="text-center text-white/50 text-sm mb-12">Contractor guest leads. Sponsor provides context. Bill keeps it practical.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contractor Guest - Featured */}
            <Card className="bg-white/5 border-white/20 text-center p-8 md:col-span-1 ring-1 ring-[#ED254E]/30">
              <img
                src={jarodSmithImage}
                alt={config.contractorName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-contractor-guest"
              />
              <p className="text-[#ED254E] text-xs font-semibold uppercase tracking-widest mb-2">Contractor Guest</p>
              <h3 className="text-xl font-bold text-white mb-1">{config.contractorName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.contractorTitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{config.contractorBio}</p>
            </Card>
            {/* Host */}
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={hostImage}
                alt={config.hostName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-host"
              />
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Host</p>
              <h3 className="text-xl font-bold text-white mb-1">{config.hostName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.hostTitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{config.hostBio}</p>
            </Card>
            {/* Sponsor Guest */}
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={ryanShankImage}
                alt={config.guestName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-guest"
              />
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Sponsor</p>
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.guestTitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{config.guestBio}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About ShareWillow */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <img
            src={shareWillowLogo}
            alt="ShareWillow"
            className="h-7 object-contain mx-auto mb-6"
          />
          <p className="text-white/60 text-base leading-relaxed max-w-xl mx-auto">
            ShareWillow helps service companies design, launch, and manage employee incentive plans and profit-sharing programs without complicated spreadsheets or outside consultants. It automates commission calculations, tracks spiffs and milestones, and gives techs a real-time view of their own earnings. ShareWillow has worked with more than 300 service businesses.
          </p>
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
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            If you are thinking about technician pay, retention, or team culture, this conversation is worth an hour of your time. Free to attend. Replay included.
          </p>
          <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#ED254E] hover:bg-[#ED254E]/90 text-white px-10"
              data-testid="button-bottom-cta"
            >
              Save My Seat
            </Button>
          </a>
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
