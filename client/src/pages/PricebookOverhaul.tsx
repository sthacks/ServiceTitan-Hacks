import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  ArrowRight,
  FileSpreadsheet,
  Mail,
  Wand2,
  Download,
  Upload,
} from "lucide-react";

const CHECKOUT_URL = "mailto:bill@st-hacks.com?subject=Pricebook%20Overhaul%20%E2%80%94%20Reserve%20My%20Spot";

const steps = [
  {
    icon: FileSpreadsheet,
    number: "1",
    title: "Export Your Pricebook",
    body: "Export your current pricebook from ServiceTitan as an Excel file. Takes about 30 seconds. We'll send you a one-page guide if you need it.",
  },
  {
    icon: Mail,
    number: "2",
    title: "Upload It to Us",
    body: "Email your pricebook file to bill@st-hacks.com. We handle the rest.",
  },
  {
    icon: Wand2,
    number: "3",
    title: "We Rewrite Every Description",
    body: "Our AI reads every single item and rewrites the description in clear, confident, homeowner-friendly language. No jargon. No SKU codes. Just words your customers actually understand. We keep your pricing, codes, categories, and hours exactly as they are.",
  },
  {
    icon: Download,
    number: "4",
    title: "You Get It Back in 72 Hours",
    body: "We email you the updated Excel file. Open it, review the new descriptions, make any edits you want.",
  },
  {
    icon: Upload,
    number: "5",
    title: "Re-Import to ServiceTitan",
    body: "Upload the updated file back into ServiceTitan. Your entire pricebook now reads like a homeowner wrote it.",
  },
];

const whatYouGet = [
  "Every description rewritten. 50 items or 5,000 items. Flat price. No surprises.",
  "Homeowner-friendly language. No more \"Capacitor 40/5 370V.\" Real explanations customers actually understand.",
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
    a: "Any size. We've done 200-item pricebooks and we'll happily do 10,000-item pricebooks. Flat $395.",
  },
  {
    q: "Will you change my pricing?",
    a: "No. We only touch descriptions. Prices, codes, categories, hours, warranty info — untouched.",
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
    a: "After you pay, you'll get instructions to email bill@st-hacks.com with your exported file. Takes 30 seconds.",
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
    <div className="min-h-screen flex flex-col">
      <SEO
        title="ServiceTitan Pricebook Overhaul | AI-Rewritten Descriptions for Homeowners"
        description="We'll AI-rewrite every item in your ServiceTitan pricebook so every word sounds like a homeowner wrote it, not a tech. Flat $395. 72-hour delivery."
        keywords="ServiceTitan pricebook, pricebook descriptions, homeowner-friendly pricebook, ServiceTitan AI, contractor pricebook rewrite"
        canonicalUrl="https://servicetitanhacks.com/pricebook-overhaul"
      />
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-black text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
              Your entire ServiceTitan pricebook, rewritten for homeowners. In 72 hours.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stop losing sales to descriptions like "Capacitor 40/5 370V Replacement." We'll AI-rewrite every item in your pricebook so every word sounds like a homeowner wrote it, not a tech.
            </p>
            <a href={CHECKOUT_URL} data-testid="button-cta-hero">
              <Button size="lg" className="text-base px-8 gap-2">
                Reserve My Overhaul — $395 <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <p className="mt-3 text-sm text-zinc-500">
              Founder pricing. First 10 customers only. 7 spots left.
            </p>
          </div>
        </section>

        {/* ── Trust Bar ────────────────────────────────────────── */}
        <section className="py-5 bg-zinc-950 border-y border-zinc-800">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-sm text-zinc-400">
              Built by <span className="text-white font-semibold">Bill Brown</span> — Founder of Paramount Heating &amp; Air ($3.5M / Inc. 5000, sold). Founder of ServiceTitan Hacks (9,500+ contractors).
            </p>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section className="py-20 bg-black text-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-14 text-center">
              How It Works
            </h2>
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-heading mb-1 text-white">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-zinc-300 font-semibold text-lg">Done.</p>
          </div>
        </section>

        {/* ── What You Get ─────────────────────────────────────── */}
        <section className="py-20 bg-zinc-950 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center">
              What You Get
            </h2>
            <div className="space-y-5 max-w-3xl mx-auto">
              {whatYouGet.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why It Matters ───────────────────────────────────── */}
        <section className="py-20 bg-black text-white">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              Why Pricebook Descriptions Matter More Than You Think
            </h2>
            <div className="max-w-3xl mx-auto space-y-5 text-zinc-300 leading-relaxed">
              <p>
                Your techs read pricebook descriptions to homeowners on every single sales call. If your descriptions sound like SKUs and part numbers, your techs sound like they're reading from a parts catalog.
              </p>
              <p>
                Homeowners don't want to feel like they're being sold parts. They want to feel like they're investing in solutions.
              </p>
              <p className="text-white font-medium">
                When your pricebook reads like a homeowner wrote it, everything changes:
              </p>
              <ul className="space-y-3 pl-2">
                {whyItMatters.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Most contractors know their pricebook needs work. They avoid it because rewriting 500+ items by hand takes weeks.
              </p>
              <p className="text-white font-semibold text-lg">That's what we fix.</p>
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Founder Pricing
            </h2>
            <div className="text-7xl font-bold mb-2">$395</div>
            <p className="text-primary-foreground/80 mb-8 text-sm">
              Flat price. Any size pricebook. First 10 customers only.
            </p>
            <div className="flex flex-col items-center gap-3 mb-8">
              {pricingBullets.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary-foreground/80" />
                  <span className="text-primary-foreground/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-primary-foreground/70 text-sm mb-8">
              After the first 10 customers, Pricebook Overhaul goes to $799.
            </p>
            <a href={CHECKOUT_URL} data-testid="button-cta-pricing">
              <Button
                size="lg"
                className="text-base px-8 gap-2 bg-black text-white hover:bg-zinc-900"
              >
                Reserve My Spot — $395 <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-20 bg-zinc-950 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center">
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
                  <AccordionContent className="text-zinc-400 pb-5 text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="py-24 bg-black text-white">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Overhaul Your Pricebook?
            </h2>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              7 founder spots left. After that, price goes to $799.
            </p>
            <a href={CHECKOUT_URL} data-testid="button-cta-final">
              <Button size="lg" className="text-base px-8 gap-2 mb-5">
                Reserve My Spot — $395 <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <p className="text-sm text-zinc-600">
              Questions? Email{" "}
              <a
                href="mailto:bill@st-hacks.com"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                bill@st-hacks.com
              </a>
            </p>
          </div>
        </section>

        {/* ── Free Tool Footer Element ──────────────────────────── */}
        <section className="py-10 bg-zinc-950 border-t border-zinc-800">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-zinc-500 text-sm mb-2">Not ready to commit?</p>
            <p className="text-zinc-400 text-sm mb-4">
              Try our free single-item version first. See how we'd rewrite one of your descriptions — no sign up, no credit card.
            </p>
            <Link href="/pricebook-optimizer">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-free-tool">
                Try the free version <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
