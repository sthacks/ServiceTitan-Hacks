import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronUp, CheckCircle2, Play, Users, TrendingUp, Shield, Smartphone, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import heroImage from "@assets/smartac_(10)_1769010027066.png";
import guestHeadshot from "@assets/739A6B30-76D4-4771-871E-9D491F92DEC7_1770736596836.jpeg";

const config = {
  webinarTitle: "Stop Rebuying Your Own Customers",
  webinarFullTitle: "Stop Rebuying Your Own Customers",
  webinarSubtitle: "A candid operator-to-operator conversation about how one HVAC contractor grew from 500 to 2,000 memberships in 18 months by changing how and when memberships are sold.",
  webinarSupportingLine: "Most HVAC shops are spending $400-500 just to get a phone call. This conversation covers the specific changes that turned first-time callers into long-term members.",
  hostName: "Bill Brown",
  hostTitle: "Former HVAC owner",
  hostSubtitle: "Founder, ServiceTitan Hacks",
  hostBio: "Scaled and exited a multi-million dollar HVAC business. Built and shared a customer lifetime value tracker used by ServiceTitan contractors.",
  guestName: "David Hargrove Jr",
  guestTitle: "Owner, Kali Refrigeration",
  guestSubtitle: "Houston, TX area",
  guestBio: "Second-generation HVAC operator who grew memberships from 500 to 2,000 in 18 months by restructuring plans, spiffing CSRs, and adding SmartAC technology.",
  smartACName: "Andy",
  smartACTitle: "SmartAC",
  smartACBio: "Joined the conversation to share how SmartAC helps contractors improve retention through remote monitoring, branded apps, and consulting on membership plan design.",
};

const learningCards = [
  {
    title: "500 to 2,000 Members in 18 Months",
    description: "David walks through the specific operational changes at Kali Refrigeration that drove this growth, from CSR scripts to tiered plan design.",
    icon: TrendingUp,
  },
  {
    title: "CSR Scripts and Spiffs That Close Before the Tech Arrives",
    description: "How front-office staff sell the majority of memberships before a technician even steps foot in the home, including the spiff structure that motivates them.",
    icon: Users,
  },
  {
    title: "Customer Lifetime Value Math That Changes How You See Marketing",
    description: "Bill shares a ServiceTitan-based calculator showing why a $625 customer acquisition cost makes sense when you track revenue over 2-3 years instead of 30 days.",
    icon: DollarSign,
  },
  {
    title: "Tiered Plans with PolyCredits Instead of Flat Discounts",
    description: "How credits that accumulate in a customer's app drive additional spending. Customers spend thousands more to use a $250 credit, just like a gift card.",
    icon: Shield,
  },
  {
    title: "Remote Monitoring to Eliminate Wasted Truck Rolls",
    description: "Why David stopped sending senior techs on new-system tune-ups and started monitoring remotely, saving labor costs while improving the customer experience.",
    icon: Smartphone,
  },
  {
    title: "Lifetime Repair Warranty as the Top-Tier Retention Lock",
    description: "The top-tier plan offers a lifetime warranty on repairs. As long as the customer stays on plan, any repair they pay for once is covered forever.",
    icon: Shield,
  },
];

const agenda = [
  { topic: "How David went from 500 to 2,000 memberships in 18 months at Kali Refrigeration" },
  { topic: "CSR scripting, spiffs, and why memberships are sold before the tech arrives" },
  { topic: "Customer lifetime value math: why $625 acquisition costs pay off over 2-3 years" },
  { topic: "Tiered membership plans with PolyCredits that replace flat discounts" },
  { topic: "Remote monitoring with SmartAC sensors to reduce truck rolls on new systems" },
  { topic: "The branded app that keeps your company on the customer's phone" },
  { topic: "Lifetime repair warranty as the ultimate top-tier retention tool" },
  { topic: "Implementation timeline: up and running in about a week" },
  { topic: "Live Q&A covering CSR scripts, plan tiering, spiff amounts, and sensor details" },
];

const agendaSubtext = "No demos. No scripts. No fluff. Just two operators sharing what actually moved the numbers.";

const faqs = [
  {
    question: "Is this really free?",
    answer: "Yes. This is an educational fireside discussion, not a sales pitch. Watch the full replay at no cost.",
  },
  {
    question: "Is this a product demo?",
    answer: "No. SmartAC comes up naturally in the conversation because David uses it, but the focus is on the operational changes he made to grow memberships, not on product features.",
  },
  {
    question: "Do I need to be a ServiceTitan customer?",
    answer: "No. The membership strategies, CSR scripting, tiered plans, and retention concepts apply to any shop running memberships, regardless of your software.",
  },
  {
    question: "How long is the replay?",
    answer: "About 57 minutes, including a live Q&A section at the end where contractors asked about spiff amounts, CSR scripts, plan tiering, and sensor details.",
  },
  {
    question: "Will I need to enter my information to watch?",
    answer: "Yes. We ask for your first name and email to access the replay so we can send you any follow-up resources.",
  },
];

export default function SmartACWebinar() {
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

  const goToReplay = () => {
    window.location.href = "/webinar/membership-retention-replay";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Stop Rebuying Your Own Customers | Replay Available"
        description="Watch the replay: David Hargrove grew from 500 to 2,000 memberships in 18 months. Learn the CSR scripts, tiered plans, and retention strategies he used."
        keywords="membership retention, ServiceTitan, SmartAC, contractor marketing, HVAC membership, customer lifetime value"
        canonicalUrl="https://servicetitanhacks.com/webinar/membership-retention"
        ogImage={`${window.location.origin}${heroImage}`}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": config.webinarFullTitle,
          "description": config.webinarSubtitle,
          "startDate": "2026-02-11T19:00:00Z",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": { "@type": "VirtualLocation", "url": "https://servicetitanhacks.com/webinar/membership-retention" },
          "url": "https://servicetitanhacks.com/webinar/membership-retention",
          "organizer": { "@type": "Organization", "name": "ServiceTitan Hacks", "url": "https://servicetitanhacks.com" },
          "performer": [
            { "@type": "Person", "name": config.hostName },
            { "@type": "Person", "name": config.guestName }
          ]
        }}
      />

      <div className="bg-[#ED254E] text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-medium">Replay Available</span>
          <span className="hidden sm:inline">|</span>
          <span>57-minute fireside chat</span>
          <span className="hidden sm:inline">|</span>
          <span>Free to watch</span>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-[#ED254E]"
            onClick={goToReplay}
            data-testid="button-announcement-cta"
          >
            <Play className="h-4 w-4 mr-1" />
            Watch the Replay
          </Button>
        </div>
      </div>

      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <img
              src={heroImage}
              alt="Stop Rebuying Your Own Customers - The Membership Retention System ServiceTitan Shops Actually Use"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
              data-testid="img-hero"
            />
          </div>

          <div className="text-center mb-12">
            <div className="inline-block bg-[#ED254E]/20 text-[#ED254E] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Replay Now Available
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Oxygen, sans-serif" }}>
              {config.webinarTitle}
            </h1>
            <p className="text-xl text-white/70 mb-4 max-w-3xl mx-auto">
              {config.webinarSubtitle}
            </p>
            <p className="text-lg text-white/60 mb-6 max-w-3xl mx-auto">
              {config.webinarSupportingLine}
            </p>

            <div className="max-w-2xl mx-auto mb-8 text-left bg-white/5 rounded-lg p-6">
              <p className="text-white/80 mb-3">This was not a sales webinar.</p>
              <p className="text-white/80 mb-3">This was a candid conversation between HVAC operators who made real changes inside their businesses and watched membership adds and retention materially improve.</p>
              <p className="text-white/80">Tools were discussed, but the focus was on timing, process, CSR behavior, plan design, and the lifetime value math that changes how you think about customer acquisition.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Button
                size="lg"
                className="bg-[#ED254E]"
                onClick={goToReplay}
                data-testid="button-hero-register"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch the Replay
              </Button>
            </div>
          </div>
        </div>
      </section>

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

      <section id="learn" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You'll Learn From This Conversation</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Real takeaways from a 57-minute fireside chat between operators who made these changes in their own businesses.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCards.map((card, i) => (
              <Card key={i} className="hover-elevate bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-[#ED254E]/20 rounded-lg flex items-center justify-center mb-4">
                    <card.icon className="h-6 w-6 text-[#ED254E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">By the Numbers</h2>
          <p className="text-center text-white/60 mb-12">Key metrics discussed during the conversation</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ED254E] mb-2">500 to 2K</div>
              <p className="text-white/60 text-sm">Membership growth in 18 months</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ED254E] mb-2">$450-500</div>
              <p className="text-white/60 text-sm">Cost per lead through Google</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ED254E] mb-2">2x</div>
              <p className="text-white/60 text-sm">Sell-through rate on SmartAC plans vs. legacy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ED254E] mb-2">~1 week</div>
              <p className="text-white/60 text-sm">Implementation to up and running</p>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Was Covered</h2>
          <div className="space-y-4">
            {agenda.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-[#ED254E]" />
                </div>
                <div className="flex-1 pb-4 border-b border-white/10 last:border-0">
                  <span className="text-white/80">{item.topic}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 mt-8 italic">{agendaSubtext}</p>
        </div>
      </section>

      <section id="speakers" className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who You'll Hear From</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={hostImage}
                alt={config.hostName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.hostName}</h3>
              <p className="text-[#ED254E] text-sm">{config.hostTitle}</p>
              <p className="text-[#ED254E] text-sm mb-4">{config.hostSubtitle}</p>
              <p className="text-white/60 text-sm">{config.hostBio}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={guestHeadshot}
                alt={config.guestName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">{config.guestName}</h3>
              <p className="text-[#ED254E] text-sm">{config.guestTitle}</p>
              <p className="text-[#ED254E] text-sm mb-4">{config.guestSubtitle}</p>
              <p className="text-white/60 text-sm">{config.guestBio}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#ED254E]/20 flex items-center justify-center">
                <img
                  src={smartACLogo}
                  alt="SmartAC"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{config.smartACName}</h3>
              <p className="text-[#ED254E] text-sm mb-4">{config.smartACTitle}</p>
              <p className="text-white/60 text-sm">{config.smartACBio}</p>
            </Card>
          </div>
        </div>
      </section>

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

      <section className="py-16 md:py-24 px-4 bg-[#ED254E]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to stop rebuying the same customers?
          </h2>
          <p className="text-white/80 mb-8">
            Watch the full conversation and learn exactly how David grew from 500 to 2,000 memberships in 18 months.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-[#ED254E]"
            onClick={goToReplay}
            data-testid="button-bottom-cta"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch the Replay
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-sm">
            <img
              src={serviceTitanHacksLogo}
              alt="ServiceTitan Hacks"
              className="h-8 object-contain"
            />
            <span>Operator-to-operator. No sales pitch.</span>
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#ED254E] text-white p-3 rounded-full shadow-lg transition-all z-50"
          data-testid="button-back-to-top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
