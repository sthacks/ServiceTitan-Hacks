import GatedReplay from "@/components/GatedReplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, TrendingDown, Users, DollarSign, ShieldCheck, ShoppingCart, BarChart3 } from "lucide-react";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import guestImage from "@assets/IMG_0501_1769885893056.jpeg";

const learningCards = [
  {
    title: "PE Pays 15-22% Less for Equipment",
    description: "Norris breaks down how private equity groups negotiate national pricing that independent contractors never see, and why the gap keeps growing with every quarterly price increase.",
    icon: TrendingDown,
  },
  {
    title: "Your Equipment COGS Is Probably 35-40%",
    description: "After reviewing over 200 financials, Norris shares the typical contractor equipment cost as a percentage of revenue versus PE companies running at 21-25%.",
    icon: BarChart3,
  },
  {
    title: "Consolidated Buying Power Through a National Platform",
    description: "How Service Crucible's purchasing platform gives independent contractors access to group-negotiated pricing on Goodman, Daikin, mini splits, and more.",
    icon: ShoppingCart,
  },
  {
    title: "Upfront Savings Beat Quarterly Rebate Checks",
    description: "Why Norris advises clients to stop waiting for rebate checks and instead capture savings on every purchase, improving cashflow immediately.",
    icon: DollarSign,
  },
  {
    title: "From 5% to 11% Rebate With One Email",
    description: "A real client story: a seven-year relationship with a manufacturer produced a 5% rebate. One email introduction from Norris doubled it overnight.",
    icon: Users,
  },
  {
    title: "Buying Power vs. Buying Intelligence",
    description: "At 2-6 million in revenue, you don't have a procurement department. Norris explains how the platform gives you PE-level buying intelligence without the overhead.",
    icon: ShieldCheck,
  },
];

const agenda = [
  "Why Bill's $15K average tickets still got squeezed by quarterly equipment price increases",
  "How private equity pays 15-22% less for the same equipment independent contractors buy",
  "Real example: a contractor paying $1,000+ more per 3-ton Daikin unit on $1.7M in annual equipment",
  "Norris's process for negotiating with TSMs and distributors on behalf of contractors",
  "How one client went from a 5% to 11% rebate with a single email introduction",
  "The difference between buying power and buying intelligence, and why most contractors have neither",
  "Live platform walkthrough: filtering, ordering, pickup locations, and real-time stock visibility",
  "Why upfront savings and a holding account beat waiting for quarterly rebate checks",
  "Live Q&A on distributor relationships, secondary brands as leverage, and pricing comparisons",
];

const faqs = [
  {
    question: "Is this a product demo?",
    answer: "Partially. Norris walks through the purchasing platform interface, but the conversation is really about procurement strategy, how PE negotiates pricing, and what independent contractors can do differently. The platform is one piece of a larger discussion.",
  },
  {
    question: "Do I have to switch manufacturers?",
    answer: "No. The platform currently offers Goodman, Daikin, and mini splits. You can use it alongside your existing brand. Norris actually recommends keeping 10-15% of your spend with a secondary brand as leverage in negotiations with your primary manufacturer.",
  },
  {
    question: "Will my TM or distributor be upset?",
    answer: "They might not love it. The pricing is negotiated at the manufacturer level above the TM. If your local distributor pushes back, you can pick up from any distributor in the Goodman network within a 50-mile radius. The branch still gets credit for the transaction.",
  },
  {
    question: "Can I see the pricing before committing?",
    answer: "Yes. Sign up for free through the ServiceTitan Hacks link, see your pricing, and decide. No obligation to purchase. The only requirement is signing a MAP (Minimum Advertised Pricing) agreement, which means you can't share the prices publicly.",
  },
  {
    question: "How long is the replay?",
    answer: "About 40 minutes, including a live Q&A where contractors asked about distributor relationships, pricing comparisons, secondary brand strategies, and apartment complex purchasing.",
  },
];

export default function EquipmentPricingReplay() {
  return (
    <GatedReplay
      title="How Contractors Buy Equipment Like Private Equity"
      seoTitle="How Contractors Buy Equipment Like Private Equity | Replay"
      seoDescription="Watch the replay: Norris Ayvazian reveals how PE pays 15-22% less for equipment and how independent HVAC contractors can access the same national pricing."
      seoKeywords="HVAC equipment pricing, contractor purchasing, private equity, group buying, Service Crucible, equipment COGS"
      canonicalUrl="https://servicetitanhacks.com/webinar/equipment-pricing-replay"
      youtubeEmbedUrl="https://www.youtube.com/embed/RlffDnKEO8s"
      webinarSlug="/webinar/equipment-pricing-replay"
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
            <span className="text-xl font-bold text-white" data-testid="text-replay-crucible-logo">Service Crucible</span>
          </div>
        </section>

        <section className="py-8 px-2 bg-white/5 rounded-lg" data-testid="section-by-the-numbers">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">By the Numbers</h2>
          <p className="text-center text-white/60 mb-10">Key metrics discussed during the conversation</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">15-22%</div>
              <p className="text-white/60 text-sm">Less than what PE pays for equipment vs. independent contractors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">35-40%</div>
              <p className="text-white/60 text-sm">Average contractor equipment cost as % of revenue</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">21-25%</div>
              <p className="text-white/60 text-sm">PE equipment cost as % of top-line revenue</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#ED254E] mb-2">90 days</div>
              <p className="text-white/60 text-sm">To double-digit net profitability increase</p>
            </div>
          </div>
        </section>

        <section data-testid="section-learning-cards">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">What You'll Learn</h2>
          <p className="text-center text-white/60 mb-10 max-w-2xl mx-auto">
            Straight talk from two operators about how equipment pricing actually works and what you can do about it.
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
          <p className="text-center text-white/50 mt-8 italic">Real pricing data, real stories, real savings. No hype.</p>
        </section>

        <section data-testid="section-speakers">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Who You'll Hear From</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={hostImage}
                alt="Bill Brown"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">Bill Brown</h3>
              <p className="text-[#ED254E] text-sm">Former HVAC owner</p>
              <p className="text-[#ED254E] text-sm mb-4">Founder, ServiceTitan Hacks</p>
              <p className="text-white/60 text-sm">Scaled and exited a multi-million dollar HVAC business. Shares his firsthand experience with quarterly price increases and equipment COGS pressure.</p>
            </Card>
            <Card className="bg-white/5 border-white/10 text-center p-8">
              <img
                src={guestImage}
                alt="Norris Ayvazian"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-1">Norris Ayvazian</h3>
              <p className="text-[#ED254E] text-sm">Founder, Service Crucible</p>
              <p className="text-[#ED254E] text-sm mb-4">20 years in the industry</p>
              <p className="text-white/60 text-sm">Started as a maintenance tech. Worked with multiple PE groups doing $500M+ in annual revenue. Now helps independent contractors access national purchasing economics through Service Crucible.</p>
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
            <span>Operator-to-operator. No hype, no fluff.</span>
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </footer>
      </div>
    </GatedReplay>
  );
}
