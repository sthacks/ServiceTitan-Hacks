import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, ArrowRight } from "lucide-react";
import beforeImg from "@assets/before_1777040624999.png";
import afterImg from "@assets/after_1777040624998.png";
import beforeImgNew from "@assets/before_1777041107238.png";
import afterImgNew from "@assets/after_1777041107237.png";

const CHECKOUT_URL =
  import.meta.env.VITE_STRIPE_PRICEBOOK_CHECKOUT_URL ||
  "https://buy.stripe.com/cNi4gy86A39aep9gCAgbm0J";

const steps = [
  {
    number: "1",
    title: "Export Your Pricebook",
    body: "Export your current pricebook from ServiceTitan as an Excel file. Takes about 30 seconds. I'll send you a one-page guide if you need it.",
  },
  {
    number: "2",
    title: "Upload It to Us",
    body: "Upload your pricebook file directly on our site after payment, or email it to bill@st-hacks.com. Your choice.",
  },
  {
    number: "3",
    title: "We Rewrite Every Description",
    body: "Our AI reads every single item and rewrites the description in clear, confident, homeowner-friendly language. No jargon. No SKU codes. Just words your customers actually understand. We keep your pricing, codes, categories, and hours exactly as they are.",
  },
  {
    number: "4",
    title: "You Get It Back in 72 Hours",
    body: "We email you the updated Excel file. Open it, review the new descriptions, make any edits you want.",
  },
  {
    number: "5",
    title: "Re-Import to ServiceTitan",
    body: "Upload the updated file back into ServiceTitan. Your entire pricebook now reads like a homeowner wrote it.",
  },
];

const whatYouGet = [
  "Every description rewritten. 50 items or 5,000 items. Flat price. No surprises.",
  'Homeowner-friendly language. No more "Capacitor 40/5 370V." Real explanations customers actually understand.',
  "Professional tone preserved. Doesn't dumb things down. Shows your expertise through clarity, not jargon.",
  "Your pricing untouched. We don't change your prices, codes, categories, or hours. Only the descriptions.",
  "Ready-to-import Excel file. Same format ServiceTitan expects. Drop it back in, you're done.",
  "72-hour turnaround. Sometimes faster. Never longer.",
];

const whyItMatters = [
  "Your techs sound more confident",
  "Your close rate goes up",
  "Your customers feel informed, not pressured",
  "Your estimates look more professional",
];

const pricingBullets = [
  "No per-item fees",
  "No subscription",
  "No hidden costs",
  "72-hour delivery guaranteed",
  "Full money-back guarantee if you're not happy",
];

const faqs = [
  {
    q: "How big can my pricebook be?",
    a: "Any size. We've done 200-item pricebooks and we'll happily do 10,000-item pricebooks. Flat $395 regardless.",
  },
  {
    q: "Will you change my pricing?",
    a: "No. We only touch descriptions. Prices, codes, categories, hours, warranty info — all untouched.",
  },
  {
    q: "What if I don't like the rewrites?",
    a: "You'll get the Excel file back before anything goes into ServiceTitan. Edit anything you want. Full money-back guarantee if it's not what you expected.",
  },
  {
    q: "Is this one-time or ongoing?",
    a: "One-time. You pay $395, you get your pricebook overhauled, you own the result. Re-import it and you're done.",
  },
  {
    q: "What about photos for each item?",
    a: "Coming soon as an add-on. For now, this is descriptions only at $395.",
  },
  {
    q: "How do I send you my pricebook?",
    a: "After you pay, you'll be redirected to an upload page on our site where you can drop your Excel file directly. Prefer email? Send it to bill@st-hacks.com instead — same result.",
  },
  {
    q: "How long does it take?",
    a: "72 hours from when we receive your file. Usually faster.",
  },
  {
    q: "What if my pricebook has custom categories or fields?",
    a: "We preserve everything. ServiceTitan's schema is strict — we only rewrite descriptions, nothing else changes.",
  },
];

export default function PricebookOverhaul() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <SEO
        title="ServiceTitan Pricebook Overhaul | AI-Rewritten Descriptions for Homeowners"
        description="We'll AI-rewrite every item in your ServiceTitan pricebook so every word sounds like a homeowner wrote it, not a tech. Flat $395. 72-hour delivery."
        keywords="ServiceTitan pricebook, pricebook descriptions, homeowner-friendly pricebook, ServiceTitan AI, contractor pricebook rewrite"
        canonicalUrl="https://servicetitanhacks.com/pricebook-overhaul"
      />
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-10 md:py-24 bg-[#0a0a0a]">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight text-white">
              Your entire ServiceTitan pricebook, rewritten for homeowners. In 72 hours.
            </h1>
            <p className="text-lg md:text-xl text-[#a3a3a3] mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Stop losing sales to descriptions like "Capacitor 40/5 370V Replacement." We'll AI-rewrite every item in your pricebook so every word sounds like a homeowner wrote it, not a tech.
            </p>

            {/* Before / After images — shown on desktop, hidden on mobile (appear in callout sections below) */}
            <div className="hidden md:flex flex-row gap-6 justify-center mb-6">
              <div className="flex-1 flex justify-end">
                <img
                  src={beforeImg}
                  alt="Before: technical pricebook description"
                  className="w-full max-w-[560px] rounded-xl object-contain"
                />
              </div>
              <div className="flex-1 flex justify-start">
                <img
                  src={afterImg}
                  alt="After: homeowner-friendly pricebook description"
                  className="w-full max-w-[560px] rounded-xl object-contain"
                />
              </div>
            </div>
            <p className="hidden md:block text-sm text-[#737373] mb-4 italic">
              Real ServiceTitan pricebook item. Same price. Same service. Transformed description.
            </p>

            <a
              href={CHECKOUT_URL}
              target="_self"
              data-testid="button-cta-hero"
            >
              <Button
                size="lg"
                className="text-base px-10 py-4 gap-2 shadow-[0_4px_24px_rgba(236,22,77,0.45)]"
              >
                Reserve My Overhaul — $395 <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <p className="mt-4 text-sm text-[#737373]">
              Founder pricing. First 10 customers only.
            </p>
          </div>
        </section>

        {/* ── Trust Bar ────────────────────────────────────────── */}
        <section className="py-5 bg-[#1a1a1a] border-y border-zinc-800">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-sm text-[#a3a3a3]">
              Built by <span className="text-white font-semibold">Bill Brown</span> — Founder of Paramount Heating &amp; Air ($3.5M / Inc. 5000, sold). Founder of ServiceTitan Hacks (9,500+ contractors).
            </p>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#0a0a0a]">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-14 text-center text-white">
              How It Works
            </h2>
            <div className="space-y-9">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ec164d] flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-heading mb-1.5 text-white">
                      {step.title}
                    </h3>
                    <p className="text-[#a3a3a3] leading-relaxed text-sm">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-center text-white font-semibold text-xl">Done.</p>
          </div>
        </section>

        {/* ── What You Get ─────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#1a1a1a]">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center text-white">
              What You Get
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {whatYouGet.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <p className="text-[#a3a3a3] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Before Image Callout ──────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#0a0a0a]">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <img
              src={beforeImg}
              alt="Before: technical pricebook description"
              className="w-full max-w-[700px] mx-auto rounded-xl object-contain mb-5"
            />
            <p className="text-sm text-[#a3a3a3] italic">
              This is what your technician reads aloud at the kitchen table.
            </p>
          </div>
        </section>

        {/* ── Why It Matters ───────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#1a1a1a]">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center text-white">
              Why Pricebook Descriptions Matter More Than You Think
            </h2>
            <div className="max-w-[700px] mx-auto space-y-5 text-[#a3a3a3] leading-relaxed">
              <p>
                Your techs read pricebook descriptions to homeowners on every single sales call. If your descriptions sound like SKUs and part numbers, your techs sound like they're reading from a parts catalog.
              </p>
              <p>
                Homeowners don't want to feel like they're being sold parts. They want to feel like they're investing in solutions.
              </p>
              <p className="text-white font-medium">
                When your pricebook reads like a homeowner wrote it, everything changes:
              </p>
              <ul className="space-y-3 pl-1">
                {whyItMatters.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ec164d] flex-shrink-0" />
                    <span className="text-[#a3a3a3]">{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Most contractors know their pricebook needs work. They avoid it because rewriting 500+ items by hand takes weeks.
              </p>
              <p className="text-white font-bold text-xl">That's what we fix.</p>
            </div>
          </div>
        </section>

        {/* ── See the Difference ────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#0a0a0a]">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center text-white">
              See the Difference
            </h2>
            <p className="text-center text-[#a3a3a3] mb-12 max-w-2xl mx-auto">
              This is what your pricebook looks like to a homeowner before and after an overhaul.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-3">
                <img
                  src={beforeImgNew}
                  alt="Before: vague, jargon-filled pricebook description"
                  className="w-full rounded-md"
                  data-testid="img-before"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={afterImgNew}
                  alt="After: clear, homeowner-friendly pricebook description"
                  className="w-full rounded-md"
                  data-testid="img-after"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Founder Pricing ──────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#ec164d]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
              Founder Pricing
            </h2>
            <div className="text-[6rem] font-bold text-white leading-none mb-2">$395</div>
            <p className="text-white/80 mb-10 text-sm">
              Flat price. Any size pricebook. First 10 customers only.
            </p>
            <div className="flex flex-col items-center gap-4 mb-10">
              {pricingBullets.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-white/80" />
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white/70 text-sm mb-10">
              After the first 10 customers, Pricebook Overhaul goes to $799.
            </p>
            <a href={CHECKOUT_URL} target="_self" data-testid="button-cta-pricing">
              <Button
                size="lg"
                className="text-base px-10 gap-2 bg-white text-[#ec164d] border-white"
              >
                Reserve My Spot — $395 <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* ── After Image Callout ───────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#0a0a0a]">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <img
              src={afterImg}
              alt="After: homeowner-friendly pricebook description"
              className="w-full max-w-[700px] mx-auto rounded-xl object-contain mb-5"
            />
            <p className="text-sm text-[#a3a3a3] italic">
              This is what your pricebook could look like in 72 hours.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#1a1a1a]">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-white hover:no-underline py-5 text-base font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#a3a3a3] pb-5 text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-[#0a0a0a]">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
              Ready to Overhaul Your Pricebook?
            </h2>
            <p className="text-[#a3a3a3] mb-12 leading-relaxed">
              Limited founder spots available. After that, price goes to $799.
            </p>
            <a href={CHECKOUT_URL} target="_self" data-testid="button-cta-final">
              <Button
                size="lg"
                className="text-base px-10 gap-2 mb-6 shadow-[0_4px_28px_rgba(236,22,77,0.45)]"
                style={{
                  background: "linear-gradient(135deg, #ec164d 0%, #c20f3d 100%)",
                  border: "none",
                  color: "white",
                }}
              >
                Reserve My Spot — $395 <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <p className="text-sm text-[#737373]">
              Questions? Email{" "}
              <a
                href="mailto:bill@st-hacks.com"
                className="text-[#a3a3a3] hover:text-white transition-colors"
              >
                bill@st-hacks.com
              </a>
            </p>
          </div>
        </section>

        {/* ── Not ready to commit ───────────────────────────────── */}
        <section className="py-14 bg-[#1a1a1a] border-t border-zinc-800">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-white font-semibold text-sm mb-2">Not ready to commit?</p>
            <p className="text-[#a3a3a3] text-sm mb-6">
              Try our free single-item version first. See how we'd rewrite one of your descriptions — no sign up, no credit card.
            </p>
            <Link href="/pricebook-optimizer">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-free-tool">
                Try the Free Preview <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
            <p className="mt-4 text-xs text-[#737373] italic">
              This is a preview of what the full Overhaul produces — for every item in your pricebook.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
