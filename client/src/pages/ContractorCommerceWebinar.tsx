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
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import heroImage from "@assets/contractor_commerce_(5)_1770387076667.png";

const config = {
  webinarTitle: "The Price Conversation That Happens Before They Call You",
  webinarFullTitle: "The Price Conversation That Happens Before They Call You",
  webinarSubtitle: "Most homeowners decide how they feel about price before they ever call a contractor. Not because they want the cheapest option, but because they want certainty, context, and reassurance before inviting someone into their home.",
  webinarDate: "February 18th, 2026",
  webinarTime: "2:00 PM",
  timezone: "ET",
  hostName: "Bill Brown",
  hostTitle: "Founder, ServiceTitan Hacks",
  hostBio: "Helps contractors fix operational bottlenecks. Trained 1,000+ businesses on ServiceTitan optimization and growth strategies.",
  guestName: "Contractor Commerce",
  guestTitle: "Contractor Commerce",
  guestBio: "Helping HVAC contractors give homeowners the pricing clarity they need, without losing control of the conversation.",
  heroNote: "This is not a webinar about posting your price book online. It is not about racing to the bottom. It is not about replacing sales conversations.",
};

const learningCards = [
  { 
    title: "Why Homeowners Research Price First", 
    description: "Understand why customers look for pricing before calling, even when every job is different, and what that means for your business." 
  },
  { 
    title: "Silent Disqualification", 
    description: "How the absence of pricing creates invisible lead loss that contractors never see, and how to stop it." 
  },
  { 
    title: "Transparency vs. Commoditization", 
    description: "The critical difference between price transparency and price commoditization, and why most attempts at online pricing get it wrong." 
  },
  { 
    title: "Controlled Pricing in Practice", 
    description: "What controlled pricing looks like in the real world, including what it should and should not be used for." 
  },
  { 
    title: "Avoiding the Wrong Behavior", 
    description: "Why posting prices without a system attracts the wrong customers and undermines your sales process." 
  },
  { 
    title: "Staying in Consideration", 
    description: "How to stay in the homeowner's consideration set without losing control of the conversation, your margins, or your reputation." 
  },
];

const agenda = [
  { time: "2:00 PM", topic: "Why homeowners research price before calling, even when every job is different." },
  { time: "2:10 PM", topic: "How the absence of pricing creates silent disqualification contractors never see." },
  { time: "2:20 PM", topic: "Why posting prices without a system attracts the wrong behavior." },
  { time: "2:30 PM", topic: "The difference between price transparency and price commoditization." },
  { time: "2:40 PM", topic: "What controlled pricing looks like in the real world, and what it should not be used for." },
  { time: "2:50 PM", topic: "Q&A - Bring your opinions. This conversation is for you." },
];

const faqs = [
  {
    question: "Is this a sales pitch for online pricing software?",
    answer: "No. This is a candid fireside chat between contractors about homeowner psychology, trust, and how pricing conversations really work. We talk openly about what works, what doesn't, and what to avoid.",
  },
  {
    question: "I have strong opinions about online pricing. Is this for me?",
    answer: "Especially if you do. This conversation is designed for contractors who think critically about how they present pricing. Bring your perspective.",
  },
  {
    question: "Is this really free?",
    answer: "Yes. It is a strategic conversation for the industry, not a gated product demo.",
  },
  {
    question: "Will there be a replay?",
    answer: "Yes, all registrants receive the recording.",
  },
  {
    question: "What if I can't make it live?",
    answer: "Register anyway to get the replay.",
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

export default function ContractorCommerceWebinar() {
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
    <div className="min-h-screen bg-black text-white">
      <SEO
        title={`${config.webinarTitle} | Free Live Training`}
        description="A candid fireside chat about homeowner psychology, trust, and how contractors can stay in consideration without losing control of the conversation, their margins, or their reputation."
        keywords="contractor pricing, online pricing, HVAC pricing, homeowner psychology, price transparency, contractor commerce, ServiceTitan"
        canonicalUrl="https://servicetitanhacks.com/webinar/upfront-pricing"
        ogImage={`${window.location.origin}${heroImage}`}
      />

      {/* Announcement Bar */}
      <div className="bg-[#ED254E] text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Free Live Webinar</span>
          <span className="hidden sm:inline">|</span>
          <span>{config.webinarDate} at {config.webinarTime} {config.timezone}</span>
          <a
            href="https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5ODVlZmZjYzdlYzJiNGQ0YjNiN2NiNCIsInByb2plY3RJZCI6IjY5ODVlZmZjYmMyOTg3MGJiYzU5NDFjNiJ9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-[#ED254E] hover:bg-white/90"
              data-testid="button-announcement-cta"
            >
              Reserve My Spot
            </Button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="The Price Conversation That Happens Before They Call You - Live Fireside Chat - Wed Feb 18 02:00 PM ET"
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
              <a
                href="https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5ODVlZmZjYzdlYzJiNGQ0YjNiN2NiNCIsInByb2plY3RJZCI6IjY5ODVlZmZjYmMyOTg3MGJiYzU5NDFjNiJ9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-[#ED254E] hover:bg-[#ED254E]/90"
                  data-testid="button-hero-register"
                >
                  Reserve My Spot (Replay Included)
                </Button>
              </a>
            </div>
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
              src={contractorCommerceLogo} 
              alt="Contractor Commerce" 
              className="h-12 object-contain"
              data-testid="img-cc-logo"
            />
          </div>
        </div>
      </section>

      {/* What You'll Walk Away With */}
      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We'll Talk About</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="w-20 flex-shrink-0">
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Your Hosts</h2>
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
                  src={contractorCommerceLogo} 
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
            Have Strong Opinions About Online Pricing?
          </h2>
          <p className="text-white/80 mb-8">
            Good. This fireside chat is for you. Join the conversation about homeowner psychology, trust, and staying in consideration without losing control.
          </p>
          <a
            href="https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5ODVlZmZjYzdlYzJiNGQ0YjNiN2NiNCIsInByb2plY3RJZCI6IjY5ODVlZmZjYmMyOTg3MGJiYzU5NDFjNiJ9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#ED254E] hover:bg-white/90"
              data-testid="button-bottom-cta"
            >
              Register for the Webinar
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
