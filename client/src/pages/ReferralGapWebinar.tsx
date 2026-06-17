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
import jonathanImage from "@assets/Screenshot_2026-03-17_at_8.40.04_AM_(1)_1773935361805.png";
import heroImage from "@assets/ReferPro (6).png";
import referProScreenshot from "@assets/ReferPro (6).png";

const config = {
  webinarTitle: "The 83% Referral Gap",
  webinarSubtitle: "Why Most Contractors Leave Referral Revenue on the Table",
  webinarSupportingLine: "A live conversation with a ServiceTitan contractor about what changed in his referral process, what actually worked, and how Refer Pro supports the workflow behind it.",
  webinarFeaturing: "Featuring Bill Brown (ServiceTitan Hacks), Jonathan Brewster (Aqua Clear), and Murphy Nadauld (Refer Pro)",
  webinarDate: "March 31, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  registrationUrl: "https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5YWVjM2M1YzMxZjU5NTA2ZGZlYjYyYyIsInByb2plY3RJZCI6IjY5YWVjM2M1NTU5MDU0MTlkYjA2YWEzZSJ9",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Bill Brown is the founder of ServiceTitan Hacks and helps contractors improve operations through systems, automation, and practical technology.",
  contractorGuestName: "Jonathan Brewster",
  contractorGuestTitle: "Owner, Aqua Clear",
  contractorGuestBio: "Jonathan Brewster is the owner of Aqua Clear and will share what changed in his referral process, how his team uses Refer Pro, and what has worked in the real world.",
  guestName: "Murphy Nadauld",
  guestTitle: "Founder, Refer Pro",
  guestBio: "Murphy Nadauld is the founder of Refer Pro, a platform designed to help service businesses automate referral outreach, improve tracking, and create a more consistent referral process.",
};

const talkPoints = [
  "Why good reviews and good referrals are not the same thing",
  "Where referral opportunities usually get lost after the job",
  "What Jonathan changed in his process to generate more referrals",
  "What a simple, repeatable referral workflow can look like",
  "How contractors can better track whether referrals are actually producing revenue",
];

const takeaways = [
  { title: "A clearer view of the referral gap", description: "" },
  { title: "Where referrals break down", description: "" },
  { title: "A contractor's real workflow", description: "" },
  { title: "Ideas you can test immediately", description: "" },
];

const agenda = [
  { topic: "Why referrals do not happen automatically, even when customers are happy" },
  { topic: "What Jonathan changed in his process" },
  { topic: "The difference between reviews and real referral systems" },
  { topic: "Where referral opportunities get lost after the job" },
  { topic: "Live Q&A with Bill, Jonathan, and Murphy" },
];

const faqs = [
  {
    question: "Who is the contractor speaking?",
    answer: "Jonathan Brewster of Aqua Clear will join the conversation to share what changed in his referral process, how his team uses Refer Pro, and what has worked in the real world.",
  },
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

function RiversideWebinarForm({ instanceId }: { instanceId: string }) {
  const containerId = `riverside-webinar-form-${instanceId}`;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.riverside.fm/rs-webinar-form/loader.js";
    script.async = true;
    script.setAttribute("data-api-base", "https://riverside.com");
    script.setAttribute("data-event-id", "69aec3c5c31f59506dfeb62c");
    script.setAttribute("data-target", `#${containerId}`);
    script.setAttribute("crossorigin", "anonymous");
    document.body.appendChild(script);

    const handleSuccess = (e: Event) => {
      const customEvent = e as CustomEvent;
      const webinarLink = customEvent.detail && customEvent.detail.webinarLink;
      const formContainer = document.getElementById(containerId);
      if (formContainer && webinarLink) {
        formContainer.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <p style="margin-bottom: 16px;">You are registered to a webinar</p>
            <a href="${webinarLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Join webinar</a>
          </div>
        `;
      }
    };

    const handleFailure = (e: Event) => {
      const customEvent = e as CustomEvent;
      const errorMessage = customEvent.detail && customEvent.detail.message;
      console.error("Registration failed:", errorMessage || "Unknown error");
    };

    document.addEventListener("riverside:registrationSuccess", handleSuccess);
    document.addEventListener("riverside:registrationFailure", handleFailure);

    const container = document.getElementById(containerId);
    const observer = new MutationObserver(() => {
      const titleEl = container?.querySelector(".rver__title");
      if (titleEl && titleEl.textContent?.includes("Why Good Reviews Are Not Enough")) {
        titleEl.textContent = "Save Your Spot for The 83% Referral Gap";
      }
    });
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      document.removeEventListener("riverside:registrationSuccess", handleSuccess);
      document.removeEventListener("riverside:registrationFailure", handleFailure);
      observer.disconnect();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [containerId]);

  return (
    <div
      id={containerId}
      className="text-white/60 text-sm"
      data-testid={`riverside-form-${instanceId}`}
    >
      Loading...
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
        description="A live conversation with a ServiceTitan contractor about why referrals often fall through the cracks and what contractors can do about it. Free, March 31, 2026."
        keywords="contractor referrals, referral program, ServiceTitan referrals, HVAC referrals, ReferPro, contractor marketing"
        canonicalUrl="https://servicetitanhacks.com/webinar/referral-gap"
        ogImage="https://servicetitanhacks.com/og-referral-gap-webinar.png"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": `${config.webinarTitle}: ${config.webinarSubtitle}`,
          "description": config.webinarSupportingLine,
          "startDate": "2026-03-31T18:00:00Z",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": { "@type": "VirtualLocation", "url": "https://servicetitanhacks.com/webinar/referral-gap" },
          "url": "https://servicetitanhacks.com/webinar/referral-gap",
          "organizer": { "@type": "Organization", "name": "ServiceTitan Hacks", "url": "https://servicetitanhacks.com" },
          "performer": [
            { "@type": "Person", "name": "Bill Brown" },
            { "@type": "Person", "name": "Jonathan Brewster" },
            { "@type": "Person", "name": "Murphy Nadauld" }
          ],
          "image": "https://servicetitanhacks.com/og-referral-gap-webinar.png"
        }}
      />

      {/* Announcement Bar */}
      <div className="bg-[#ED254E] text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Free Live Fireside Chat</span>
          <span className="hidden sm:inline">|</span>
          <span>{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
          <a href="#riverside-webinar-form-hero">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-[#ED254E] hover:bg-white/90"
              data-testid="button-announcement-cta"
            >
              Register Now
            </Button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 relative">
            <img
              src={heroImage}
              alt="The 83% Referral Gap - Live Fireside Chat"
              className="w-full h-auto rounded-lg"
              data-testid="img-hero"
            />
            <span className="absolute top-4 left-4 bg-black/60 text-white/80 text-xs font-medium px-3 py-1 rounded-md tracking-wide">
              Real Contractor Case Discussion
            </span>
          </div>

          <div className="text-center mb-12">
            <p className="text-[#ED254E] text-sm font-semibold uppercase tracking-widest mb-3">
              Free Live Fireside Chat
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-3" style={{ fontFamily: "Oxygen, sans-serif" }}>
              {config.webinarTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-4">
              {config.webinarSubtitle}
            </p>
            <p className="text-white/65 max-w-2xl mx-auto mb-3 leading-relaxed">
              {config.webinarSupportingLine}
            </p>
            <p className="text-white/45 text-sm mb-1">
              {config.webinarDate} &nbsp;|&nbsp; {config.webinarTime} {config.timezone}
            </p>
            <p className="text-white/45 text-sm mb-4">
              Free live event + replay for all registrants
            </p>
            <CountdownTimer targetDate={eventDate} />
            <div className="mt-6 max-w-md mx-auto">
              <RiversideWebinarForm instanceId="hero" />
            </div>
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
              alt="Refer Pro"
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
            <p>Most contractors know referrals matter.</p>
            <p>
              What many companies do not have is a consistent system for turning satisfied customers into actual new business.
            </p>
            <p>
              In this fireside conversation, Bill Brown from ServiceTitan Hacks will sit down with contractor guest Jonathan Brewster to discuss what actually changed in his referral process, what worked in the field, and where referral opportunities usually get lost after the job.
            </p>
            <p>
              Murphy Nadauld, founder of Refer Pro, will also join the discussion to explain how technology can support a more repeatable referral process.
            </p>
            <p>
              This is not a sales webinar. It is a practical conversation about what contractors are actually doing today.
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
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
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
          <ul className="space-y-4">
            {agenda.map((item, i) => (
              <li key={i} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0">
                <span className="text-[#ED254E] font-bold text-lg leading-none mt-0.5">{i + 1}.</span>
                <span className="text-white/80 text-lg">{item.topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Meet Your Hosts */}
      <section id="speakers" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet the Conversation Guests</h2>
          <p className="text-center text-white/55 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bill Brown will lead a practical conversation with contractor guest Jonathan Brewster about what changed in his referral process, what actually worked, and where Refer Pro fits into that workflow.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Bill Brown */}
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

            {/* Jonathan Brewster */}
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={jonathanImage}
                alt={config.contractorGuestName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                data-testid="img-contractor-guest"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.contractorGuestName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.contractorGuestTitle}</p>
              <p className="text-white/60 text-sm leading-relaxed">{config.contractorGuestBio}</p>
            </Card>

            {/* Murphy Nadauld */}
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

      {/* How Refer Pro Fits Into the Discussion */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-3 text-white/80">
            How Refer Pro Fits Into the Discussion
          </h2>
          <p className="text-center text-white/45 mb-2 max-w-xl mx-auto text-sm leading-relaxed">
            During the conversation, we will briefly show how Refer Pro supports contractors who want a more consistent referral process.
          </p>
          <p className="text-center text-white/35 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            This will not be a product demo. We will simply show how some companies are using automation to help capture referrals after the job.
          </p>
          <div className="flex justify-center">
            <img
              src={referProScreenshot}
              alt="Refer Pro platform overview"
              className="rounded-lg w-full max-w-sm opacity-70"
              data-testid="img-product-screenshot"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Register below to attend live or get the replay afterward.
          </p>
          <div className="max-w-md mx-auto">
            <RiversideWebinarForm instanceId="cta" />
          </div>
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
