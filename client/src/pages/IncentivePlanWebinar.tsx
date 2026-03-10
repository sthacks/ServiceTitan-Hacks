import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, CheckCircle2, LayoutDashboard } from "lucide-react";
import SEO from "@/components/SEO";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";

const config = {
  webinarTitle: "The Incentive Plan Problem",
  webinarSubtitle: "Why Most Contractor Bonus Plans Fail",
  webinarSupportingLine:
    "A practical conversation about technician incentives, profit sharing, and how contractors can motivate teams without creating payroll chaos.",
  webinarFeaturing: "Featuring Bill Brown (ServiceTitan Hacks) and Ryan Shank (ShareWillow)",
  webinarDate: "Wednesday, April 14, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  registrationUrl:
    "https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5YjAxZjc3ODgwNjllYjk1YTJlZTA1MyIsInByb2plY3RJZCI6IjY5YjAxZjc3MWJiOWQxOTdlNjJiY2MxOCJ9",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Bill previously owned and scaled a residential HVAC company and now focuses on helping contractors improve operations using technology, automation, and better systems.",
  guestName: "Ryan Shank",
  guestTitle: "Founder, ShareWillow",
  guestBio:
    "Ryan created ShareWillow after seeing how difficult it was for companies to design and manage profit-sharing and incentive plans without complicated spreadsheets or consultants.",
};

const talkPoints = [
  "Why most technician bonus plans eventually break down",
  "The difference between commissions, bonuses, and profit sharing",
  "Why transparency matters when building incentive plans",
  "How contractors can structure incentives around company goals",
  "What happens when employees start thinking like owners",
];

const takeaways = [
  {
    title: "A clearer understanding of why many incentive plans fail",
    description: "The common patterns that cause bonus plans to create confusion or resentment instead of motivation.",
  },
  {
    title: "A framework for designing a profit-sharing model",
    description: "How to think about structuring incentives that reward team performance in a way employees understand.",
  },
  {
    title: "Examples of how contractors structure incentives for service teams",
    description: "Real-world approaches other contractors are using today.",
  },
  {
    title: "Ideas for motivating employees without complicated pay structures",
    description: "Practical changes that can increase engagement without rebuilding your entire compensation system.",
  },
];

const agenda = [
  { time: "0:00", topic: "Why incentive plans often fail in the trades" },
  { time: "0:10", topic: "The psychology of ownership and employee motivation" },
  { time: "0:20", topic: "Examples of contractor profit-sharing structures" },
  { time: "0:35", topic: "How incentive formulas are typically structured" },
  { time: "0:45", topic: "Open discussion and Q&A" },
];

const faqs = [
  {
    question: "Is this a sales webinar?",
    answer: "No. This is a conversation about how incentive plans work in real contractor businesses.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes. Everyone who registers will receive the recording.",
  },
  {
    question: "Do I need to use ShareWillow?",
    answer: "No. The goal is to share practical ideas contractors can apply regardless of the software they use.",
  },
  {
    question: "Can I ask questions live?",
    answer: "Yes. We will have time for audience questions during the discussion.",
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
        title="The Incentive Plan Problem: Why Most Contractor Bonus Plans Fail | Free Live Fireside Chat"
        description="A practical conversation about technician incentives, profit sharing, and how contractors can motivate teams without creating payroll chaos. Free live event April 14, 2026."
        keywords="contractor bonus plans, profit sharing, technician incentives, ServiceTitan, home service compensation, ShareWillow"
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

      {/* Presented By */}
      <section className="py-6 px-4 border-t border-b border-white/10">
        <div className="container mx-auto max-w-2xl">
          <p className="text-center text-sm text-white/40 mb-6">Brought to you by</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img
              src={serviceTitanHacksLogo}
              alt="ServiceTitan Hacks"
              className="h-10 object-contain"
              data-testid="img-sth-logo"
            />
            <span className="hidden sm:block text-2xl text-white/30">+</span>
            <span className="text-white/70 text-xl font-semibold tracking-wide" data-testid="text-sharewillow-logo">
              ShareWillow
            </span>
          </div>
        </div>
      </section>

      {/* About This Conversation */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About This Conversation</h2>
          <div className="text-white/75 text-lg space-y-5 leading-relaxed">
            <p>Most contractors want their technicians to think like owners.</p>
            <p>
              But building a compensation plan that actually motivates people without creating confusion or resentment is harder than it sounds.
            </p>
            <p>
              In this fireside chat, Bill Brown from ServiceTitan Hacks sits down with Ryan Shank from ShareWillow to talk about why many contractor bonus plans fail, why profit sharing can change company culture, and how to structure incentives that your team actually understands.
            </p>
            <p>This will not be a sales presentation.</p>
            <p>
              It is a practical discussion about how contractors can create incentive systems that align the team around the success of the business.
            </p>
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

      {/* What We'll Cover Live */}
      <section id="agenda" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We'll Cover Live</h2>
          <div className="space-y-4">
            {agenda.map((item, i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-white/10 last:border-0">
                <div className="w-16 flex-shrink-0">
                  <span className="text-[#ED254E] font-mono font-bold">{item.time}</span>
                </div>
                <span className="text-white/80 text-lg">{item.topic}</span>
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
              <p className="text-white/60 text-sm leading-relaxed">{config.hostBio}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 bg-white/10 flex items-center justify-center"
                data-testid="img-guest-placeholder"
              >
                <span className="text-3xl font-bold text-white/40">RS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.guestTitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{config.guestBio}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* A Quick Look at ShareWillow */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            A Quick Look at ShareWillow
          </h2>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-white/60 mb-4 text-sm leading-relaxed">
              ShareWillow is a platform that helps companies design, launch, and manage employee incentive plans and profit-sharing programs.
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              It allows businesses to create payout formulas, track milestones, and provide employees with transparent dashboards showing progress toward incentive payouts. We will share a brief look during the conversation.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-12 flex flex-col items-center justify-center gap-4" data-testid="sharewillow-product-placeholder">
            <LayoutDashboard className="w-12 h-12 text-white/20" />
            <p className="text-white/30 text-sm">ShareWillow product preview — shown live during the conversation</p>
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
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            If you're thinking about incentive plans, technician bonuses, or profit sharing in your company, this conversation should give you a clearer perspective. Reserve your seat and join us live.
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
