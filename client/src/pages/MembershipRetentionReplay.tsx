import GatedReplay from "@/components/GatedReplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Users, TrendingUp, Shield, Smartphone, DollarSign, Clock } from "lucide-react";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import guestHeadshot from "@assets/739A6B30-76D4-4771-871E-9D491F92DEC7_1770736596836.jpeg";

const learningCards = [
  {
    title: "500 to 2,000 Members in 18 Months",
    description: "David walks through the specific operational changes at Kali Refrigeration that drove this growth, from CSR scripts to tiered plan design.",
    icon: TrendingUp,
  },
  {
    title: "CSR Scripts and Spiffs That Close Before the Tech Arrives",
    description: "How front-office staff sell the majority of memberships before a technician even steps foot in the home, including the $20-25 per-sale spiff structure.",
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
    icon: Clock,
  },
];

const agenda = [
  "How David went from 500 to 2,000 memberships in 18 months at Kali Refrigeration",
  "CSR scripting, spiffs, and why memberships are sold before the tech arrives",
  "Customer lifetime value math: why $625 acquisition costs pay off over 2-3 years",
  "Tiered membership plans with PolyCredits that replace flat discounts",
  "Remote monitoring with SmartAC sensors to reduce truck rolls on new systems",
  "The branded app that keeps your company on the customer's phone",
  "Lifetime repair warranty as the ultimate top-tier retention tool",
  "Implementation timeline: up and running in about a week",
  "Live Q&A covering CSR scripts, plan tiering, spiff amounts, and sensor details",
];

const faqs = [
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
    question: "Who is David Hargrove?",
    answer: "David is a second-generation HVAC operator who owns Kali Refrigeration near Houston, TX. He grew his memberships from 500 to 2,000 in 18 months by restructuring his plans, adding SmartAC technology, and changing how and when his team sells memberships.",
  },
  {
    question: "What are PolyCredits?",
    answer: "PolyCredits are what David calls the credits that accumulate in a customer's SmartAC app. Instead of flat discounts, customers earn credits with their membership that they can use toward any service over $500. They work like a gift card, motivating customers to spend more to use their balance.",
  },
];

export default function MembershipRetentionReplay() {
  return (
    <GatedReplay
      title="Stop Rebuying Your Own Customers"
      seoTitle="Stop Rebuying Your Own Customers | Replay"
      seoDescription="Watch the replay: David Hargrove grew from 500 to 2,000 memberships in 18 months. Learn the CSR scripts, tiered plans, and SmartAC retention strategies."
      seoKeywords="membership retention, HVAC membership, ServiceTitan, customer retention, SmartAC, customer lifetime value"
      canonicalUrl="https://servicetitanhacks.com/webinar/membership-retention-replay"
      youtubeEmbedUrl="https://www.youtube.com/embed/pqDJ-t6lOgw"
      webinarSlug="/webinar/membership-retention-replay"
    >
      <div className="mt-16 space-y-20">
        <section>
          <p className="text-center text-sm text-white/50 mb-6">Presented By</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <img
              src={serviceTitanHacksLogo}
              alt="ServiceTitan Hacks"
              className="h-10 object-contain"
              data-testid="img-replay-sth-logo"
            />
            <span className="hidden sm:block text-2xl text-white/50">+</span>
            <img
              src={smartACLogo}
              alt="SmartAC"
              className="h-10 object-contain"
              data-testid="img-replay-smartac-logo"
            />
          </div>
        </section>

        <section className="py-8 px-2 bg-white/5 rounded-lg" data-testid="section-by-the-numbers">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">By the Numbers</h2>
          <p className="text-center text-white/60 mb-10">Key metrics discussed during the conversation</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">500 to 2K</div>
              <p className="text-white/60 text-sm">Membership growth in 18 months</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">$450-500</div>
              <p className="text-white/60 text-sm">Cost per lead through Google</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">2x</div>
              <p className="text-white/60 text-sm">Sell-through rate on SmartAC plans vs. legacy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">~1 week</div>
              <p className="text-white/60 text-sm">Implementation to up and running</p>
            </div>
          </div>
        </section>

        <section data-testid="section-learning-cards">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">What You'll Learn</h2>
          <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
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
        </section>

        <section data-testid="section-agenda">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Was Covered</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {agenda.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-[#ED254E]" />
                </div>
                <div className="flex-1 pb-4 border-b border-white/10 last:border-0">
                  <span className="text-white/80">{item}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 mt-8 italic">No demos. No scripts. No fluff. Just two operators sharing what actually moved the numbers.</p>
        </section>

        <section data-testid="section-speakers">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Who You'll Hear From</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={hostImage}
                alt="Bill Brown"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">Bill Brown</h3>
              <p className="text-[#ED254E] text-sm">Former HVAC owner</p>
              <p className="text-[#ED254E] text-sm mb-4">Founder, ServiceTitan Hacks</p>
              <p className="text-white/60 text-sm">Scaled and exited a multi-million dollar HVAC business. Built and shared a customer lifetime value tracker used by ServiceTitan contractors.</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={guestHeadshot}
                alt="David Hargrove Jr"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">David Hargrove Jr</h3>
              <p className="text-[#ED254E] text-sm">Owner, Kali Refrigeration</p>
              <p className="text-[#ED254E] text-sm mb-4">Houston, TX area</p>
              <p className="text-white/60 text-sm">Second-generation HVAC operator who grew memberships from 500 to 2,000 in 18 months by restructuring plans, spiffing CSRs, and adding SmartAC technology.</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#ED254E]/20 flex items-center justify-center">
                <img
                  src={smartACLogo}
                  alt="SmartAC"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Andy</h3>
              <p className="text-[#ED254E] text-sm mb-4">SmartAC</p>
              <p className="text-white/60 text-sm">Joined the conversation to share how SmartAC helps contractors improve retention through remote monitoring, branded apps, and consulting on membership plan design.</p>
            </Card>
          </div>
        </section>

        <section data-testid="section-faqs">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4 max-w-2xl mx-auto">
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
        </section>

        <footer className="py-8 border-t border-white/10">
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
        </footer>
      </div>
    </GatedReplay>
  );
}
