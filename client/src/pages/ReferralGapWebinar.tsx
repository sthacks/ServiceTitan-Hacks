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
import referProLogo from "@assets/rp-full-color-horizontal-light_1772813582705.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import murphyImage from "@assets/A160356D-F7F8-4337-B209-46F269E2B49A_1_105_c_1772813613622.jpeg";
import heroImage from "@assets/ReferPro_(2)_1772815536588.png";
import productScreenshot from "@assets/Screenshot_2026-03-05_at_2.36.01_PM_1772813613620.png";
import rewardsScreenshot from "@assets/Screenshot_2026-03-05_at_3.31.49_PM_1772813613621.png";

const config = {
  webinarTitle: "The 83% Referral Gap",
  webinarSubtitle: "A practical conversation on why happy customers do not automatically turn into referrals, and what contractors can do about it.",
  webinarDate: "March 31, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  registrationUrl: "https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5YWVjM2M1YzMxZjU5NTA2ZGZlYjYyYyIsInByb2plY3RJZCI6IjY5YWVjM2M1NTU5MDU0MTlkYjA2YWEzZSJ9",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Bill Brown is the founder of ServiceTitan Hacks and helps contractors improve operations through systems, automation, and practical technology.",
  guestName: "Murphy Nadauld",
  guestTitle: "Founder, Refer Pro",
  guestBio: "Murphy Nadauld is the founder of Refer Pro, a platform built to help service businesses automate referral outreach, improve tracking, and create a more consistent referral process.",
};

const talkPoints = [
  "Why good reviews and good referrals are not the same thing",
  "Where referral opportunities usually get lost after the job",
  "Why most companies do not get as many referrals as they think they should",
  "What a simple, repeatable referral process can look like",
  "How contractors can better track whether referrals are actually producing revenue",
];

const takeaways = [
  { title: "A clearer view of the gap", description: "Understand the real difference between reviews and referrals and why that gap exists." },
  { title: "Where referrals get lost", description: "A better understanding of exactly where in the customer journey referral opportunities disappear." },
  { title: "A framework for referral ROI", description: "A simple way to think about whether your referral efforts are actually producing revenue." },
  { title: "Ideas you can act on", description: "Practical starting points for building a more repeatable referral process at your company." },
];

const agenda = [
  { time: "0:00", topic: "Why referrals do not happen automatically, even when customers are happy" },
  { time: "0:15", topic: "The difference between a review and a referral" },
  { time: "0:30", topic: "Where contractors lose referral opportunities in the customer journey" },
  { time: "0:45", topic: "What a better referral system can look like after the job" },
  { time: "1:00", topic: "Live Q&A with Bill Brown and Murphy Nadauld" },
];

const faqs = [
  {
    question: "Is this webinar free?",
    answer: "Yes. Registration is free.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes. Everyone who registers will receive the replay.",
  },
  {
    question: "Is this just a sales presentation?",
    answer: "No. This is designed to be a practical conversation about how referrals really work in home service businesses, with examples and takeaways contractors can use.",
  },
  {
    question: "Do I need to use Refer Pro to get value from this?",
    answer: "No. The session is meant to help contractors think more clearly about referral systems in general.",
  },
  {
    question: "Can I ask questions live?",
    answer: "Yes. We will leave time for Q&A.",
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

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="The 83% Referral Gap | Free Live Fireside Chat"
        description="A practical conversation on why happy customers do not automatically turn into referrals, and what contractors can do about it. Free live event March 31, 2026."
        keywords="contractor referrals, referral program, ServiceTitan referrals, HVAC referrals, ReferPro, contractor marketing"
        canonicalUrl="https://servicetitanhacks.com/webinar/referral-gap"
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
              Save My Spot
            </Button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <img
              src={heroImage}
              alt="The 83% Referral Gap - Live Fireside Chat with ReferPro"
              className="w-full h-auto rounded-lg"
              data-testid="img-hero"
            />
          </div>

          <div className="text-center mb-12">
            <p className="text-[#ED254E] text-sm font-semibold uppercase tracking-widest mb-3">
              Free Live Fireside Chat
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              {config.webinarTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-4">
              {config.webinarSubtitle}
            </p>
            <p className="text-white/50 text-sm mb-2">
              {config.webinarDate} &nbsp;|&nbsp; {config.webinarTime} {config.timezone}
            </p>
            <p className="text-white/50 text-sm mb-6">
              Free live webinar + replay for registrants
            </p>
            <CountdownTimer targetDate={eventDate} />
            <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[#ED254E] hover:bg-[#ED254E]/90 px-10"
                data-testid="button-hero-register"
              >
                Save My Spot
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Presented By */}
      <section className="py-6 px-4">
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
            <img
              src={referProLogo}
              alt="ReferPro"
              className="h-10 object-contain"
              data-testid="img-referpro-logo"
            />
          </div>
        </div>
      </section>

      {/* About This Conversation */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About This Conversation</h2>
          <div className="text-white/75 text-lg space-y-5 leading-relaxed">
            <p>
              Most contractors know referrals matter. What many do not have is a system for turning satisfied customers into actual new business.
            </p>
            <p>
              In this live conversation, Bill Brown from ServiceTitan Hacks and Murphy Nadauld, founder of Refer Pro, will break down why referrals often get missed, where the gaps happen after the job is complete, and what a more repeatable referral process can look like.
            </p>
            <p>
              This is not meant to be a high-pressure sales webinar. It is a practical discussion for contractors who want more word-of-mouth business without relying on chance.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet Your Hosts</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Bill Brown and Murphy Nadauld will break down the referral problem in a practical, straightforward conversation focused on what contractors can actually do to improve results.
          </p>
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
              <img
                src={murphyImage}
                alt={config.guestName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-guest"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.guestTitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{config.guestBio}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* A Quick Look at How Refer Pro Approaches It */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">A Quick Look at How Refer Pro Approaches It</h2>
          <p className="text-center text-white/55 mb-10 max-w-2xl mx-auto text-sm leading-relaxed">
            If you are curious how Murphy and the Refer Pro team think about referral automation in practice, we will share a quick look during the conversation as well.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={productScreenshot}
                alt="ReferPro referral interface on mobile"
                className="rounded-lg w-full max-w-sm mx-auto opacity-90"
                data-testid="img-product-screenshot"
              />
            </div>
            <div>
              <img
                src={rewardsScreenshot}
                alt="ReferPro rewards redemption portal"
                className="rounded-lg w-full opacity-90"
                data-testid="img-rewards-screenshot"
              />
            </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Conversation
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Learn why referrals often fall through the cracks, and leave with a clearer picture of what a better referral process can look like.
          </p>
          <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#ED254E] hover:bg-[#ED254E]/90 text-white px-10"
              data-testid="button-bottom-cta"
            >
              Save My Spot
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
