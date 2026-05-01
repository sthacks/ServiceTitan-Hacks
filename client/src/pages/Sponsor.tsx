import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Check, ArrowRight, PhoneCall } from "lucide-react";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";

const BOOK_CALL_URL = "https://scheduler.zoom.us/bill-brown-7cynuw/30-min";

function logEvent(name: string, props?: Record<string, string>) {
  try {
    (window as any).gtag?.("event", name, props);
    (window as any).posthog?.capture(name, props);
  } catch {}
}

function useIntersectionTracking(ref: React.RefObject<Element>, sectionName: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          logEvent("sponsor_section_viewed", { section: sectionName });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, sectionName]);
}

const stats = [
  { value: "10,800+", label: "Total members" },
  { value: "1,800", label: "Email subscribers (45% open rate)" },
  { value: "63,000", label: "YouTube views to date" },
  { value: "22,000", label: "Monthly website visitors" },
  { value: "93%", label: "Active contractors using ServiceTitan" },
];

const whyItems = [
  {
    heading: "Trust transfers",
    body: "Members already trust the community. Sponsorship inherits that trust. Cold ads start from zero.",
  },
  {
    heading: "Verified contractors only",
    body: "Every member is screened. No agencies, no software vendors, no tire-kickers. Just operators running ServiceTitan.",
  },
  {
    heading: "Compounding visibility",
    body: "Sponsors show up across Facebook, email, podcast, YouTube, and webinars. Every touch reinforces the last.",
  },
];

const tradeData = [
  { label: "HVAC", count: 4001, total: 4001 },
  { label: "Plumbing", count: 2579, total: 4001 },
  { label: "Electrical", count: 1090, total: 4001 },
  { label: "Garage Doors", count: 297, total: 4001 },
  { label: "Roofing", count: 176, total: 4001 },
];

const webinarSteps = [
  { step: "1", label: "1 co-hosted webinar" },
  { step: "2", label: "Repurposed as 1 podcast episode" },
  { step: "3", label: "6+ Shorts clipped for FB, YouTube, LinkedIn" },
  { step: "4", label: "Email and Facebook group promotion across the audience" },
];

const tiers = [
  {
    name: "Diamond",
    tagline: "Vendors prioritizing maximum visibility and lead volume",
    highlight: true,
    badge: "Most popular",
    deliverables: [
      "3 dedicated co-hosted webinars per year",
      "Webinars repurposed as podcast episodes and Shorts",
      "Weekly Facebook posts plus monthly pinned post",
      "Logo in Facebook group header",
      "Monthly dedicated email send",
      "Logo in email header",
      "Homepage logo and featured listing",
      "Meta and YouTube retargeting (setup and management)",
      "Monthly performance dashboard",
      "Monthly strategy call",
      "Category exclusivity",
    ],
  },
  {
    name: "Elite",
    tagline: "Vendors who want consistent presence and one annual flagship event",
    highlight: false,
    badge: null,
    deliverables: [
      "1 co-hosted webinar per year",
      "Webinar repurposed as podcast episode and Shorts",
      "3 Facebook posts per month",
      "Logo in Facebook group header",
      "Monthly dedicated email send",
      "Logo in email header",
      "Sponsor page placement and tracked CTA",
      "Monthly report",
      "Monthly strategy call",
      "Category exclusivity",
    ],
  },
  {
    name: "Featured",
    tagline: "Brand awareness with steady cross-channel exposure",
    highlight: false,
    badge: null,
    deliverables: [
      "1 cross-channel Short feature per quarter",
      "2 Facebook posts per month",
      "Email inclusion every 2 months",
      "Sponsor page listing",
      "Quarterly report",
      "Quarterly strategy call",
    ],
  },
  {
    name: "Community",
    tagline: "Entry-level brand presence in the community",
    highlight: false,
    badge: null,
    deliverables: [
      "1 Facebook post per month",
      "Email inclusion once per quarter",
      "Shared sponsor section on website",
      "Quarterly summary",
      "Quarterly strategy call",
    ],
  },
];

const testimonials = [
  {
    sponsor: "ShareWillow",
    headline: "2 sales in 72 hours",
    body: "ShareWillow ran a co-hosted webinar with ServiceTitan Hacks on April 21, 2026 about contractor incentive plans. Within 72 hours, ShareWillow had closed 2 new ServiceTitan customers from the webinar audience.",
    quote: "Btw, 2 sales already from webinar. It's been super great.",
    quoteAuthor: "Ryan Shank, Founder, ShareWillow",
    isPlaceholder: false,
  },
  {
    sponsor: "",
    headline: "[Outcome metric]",
    body: "[Context about campaign and results]",
    quote: "",
    quoteAuthor: "",
    isPlaceholder: true,
  },
  {
    sponsor: "",
    headline: "[Outcome metric]",
    body: "[Context about campaign and results]",
    quote: "",
    quoteAuthor: "",
    isPlaceholder: true,
  },
];

export default function Sponsor() {
  const heroRef = useRef<HTMLElement>(null);
  const audienceRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const membershipRef = useRef<HTMLElement>(null);
  const webinarRef = useRef<HTMLElement>(null);
  const tiersRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);
  const sponsorWallRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    logEvent("sponsor_page_viewed");
  }, []);

  useIntersectionTracking(audienceRef, "audience_snapshot");
  useIntersectionTracking(whyRef, "why_this_works");
  useIntersectionTracking(membershipRef, "membership_breakdown");
  useIntersectionTracking(webinarRef, "webinar_engine");
  useIntersectionTracking(tiersRef, "tier_comparison");
  useIntersectionTracking(proofRef, "proof");
  useIntersectionTracking(sponsorWallRef, "sponsor_wall");
  useIntersectionTracking(ctaRef, "final_cta");

  const handleCtaClick = (location: string) => {
    logEvent("sponsor_cta_clicked", { location });
  };

  const handleTierClick = (tier: string) => {
    logEvent("sponsor_tier_card_clicked", { tier });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A", color: "#fff" }}>
      <SEO
        title="Sponsorship — ServiceTitan Hacks"
        description="Direct sponsorship access to 10,800+ ServiceTitan contractors. Webinars, podcast, email, and retargeting across the largest verified ServiceTitan community."
        canonicalUrl="https://servicetitanhacks.com/sponsor"
        ogImage="https://servicetitanhacks.com/og-home.png"
      />

      <Header />

      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="flex items-center justify-center min-h-screen px-6 md:px-12 text-center"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: "#DC143C" }}
          >
            Sponsorship
          </p>
          <h1
            className="font-medium leading-tight mb-6"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff" }}
          >
            Direct access to 10,800+ ServiceTitan contractors
          </h1>
          <p
            className="mb-10 max-w-xl mx-auto"
            style={{ fontSize: "18px", fontWeight: 400, color: "#fff", lineHeight: 1.6 }}
          >
            The largest community of active ServiceTitan users. Verified contractors. Real decision-makers. Trackable results.
          </p>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-hero-cta"
            onClick={() => handleCtaClick("hero")}
            className="inline-block font-semibold text-white px-8 py-4 text-sm transition-opacity hover:opacity-90"
            style={{ background: "#DC143C" }}
          >
            Book a strategy call
          </a>
          <p className="mt-4 text-sm" style={{ color: "#888" }}>
            20-minute call. No pitch.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: AUDIENCE SNAPSHOT ────────────────────────── */}
      <section
        ref={audienceRef}
        className="px-6 md:px-12 py-24 md:py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "#DC143C" }}
          >
            Verified data
          </p>
          <h2
            className="font-medium mb-12"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            The audience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                data-testid={`card-stat-${i}`}
                className="p-6"
                style={{ background: "#1A1A1A", borderRadius: 0 }}
              >
                <div
                  className="font-medium mb-2"
                  style={{ fontSize: "40px", color: "#fff" }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "14px", color: "#888" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY THIS WORKS ───────────────────────────── */}
      <section
        ref={whyRef}
        className="px-6 md:px-12 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-medium mb-12"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            Why community sponsorship beats cold ads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {whyItems.map((item, i) => (
              <div key={i} data-testid={`card-why-${i}`}>
                <h3
                  className="font-medium mb-4"
                  style={{ fontSize: "18px", color: "#DC143C" }}
                >
                  {item.heading}
                </h3>
                <p style={{ fontSize: "16px", color: "#fff", lineHeight: 1.6 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: MEMBERSHIP BREAKDOWN ─────────────────────── */}
      <section
        ref={membershipRef}
        className="px-6 md:px-12 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-medium mb-3"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            Who's in the community
          </h2>
          <p className="mb-12" style={{ color: "#888", fontSize: "16px" }}>
            Distribution by trade
          </p>
          <div className="space-y-5 max-w-2xl">
            {tradeData.map((trade, i) => {
              const pct = Math.round((trade.count / trade.total) * 100);
              return (
                <div key={i} data-testid={`bar-trade-${i}`}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "#fff", fontSize: "15px" }}>{trade.label}</span>
                    <span style={{ color: "#888", fontSize: "15px" }}>
                      {trade.count.toLocaleString()}
                    </span>
                  </div>
                  <div
                    className="w-full h-2"
                    style={{ background: "#2a2a2a", borderRadius: 0 }}
                  >
                    <div
                      className="h-2"
                      style={{
                        width: `${pct}%`,
                        background: "#DC143C",
                        borderRadius: 0,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-12" style={{ color: "#888", fontSize: "15px", lineHeight: 1.7, maxWidth: "600px" }}>
            Average company size in the group: $7M to $10M annual revenue. Decision-makers ages 35 to 54: business owners, ops managers, service leaders.
          </p>
        </div>
      </section>

      {/* ── SECTION 5: WEBINAR ENGINE ────────────────────────────── */}
      <section
        ref={webinarRef}
        className="px-6 md:px-12 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-medium mb-3"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            How one webinar becomes 30 days of content
          </h2>
          <p className="mb-14" style={{ color: "#888", fontSize: "16px" }}>
            Sponsorship isn't a logo placement. It's a content engine.
          </p>
          {/* Flow diagram */}
          <div className="flex flex-col md:flex-row items-stretch gap-0">
            {webinarSteps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-stretch flex-1">
                <div
                  className="flex-1 p-6"
                  style={{
                    background: "#1A1A1A",
                    borderLeft: "4px solid #DC143C",
                    borderRadius: 0,
                  }}
                  data-testid={`card-webinar-step-${i}`}
                >
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: "#DC143C" }}
                  >
                    Step {step.step}
                  </div>
                  <div style={{ color: "#fff", fontSize: "15px", lineHeight: 1.5 }}>
                    {step.label}
                  </div>
                </div>
                {i < webinarSteps.length - 1 && (
                  <div className="flex items-center justify-center px-3 py-3 md:py-0">
                    <ArrowRight
                      className="rotate-90 md:rotate-0"
                      style={{ color: "#DC143C" }}
                      size={20}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-12" style={{ color: "#888", fontSize: "15px", lineHeight: 1.7, maxWidth: "700px" }}>
            Most communities sell you a single ad placement. We build a full content campaign around your message and distribute it across every channel we own. The webinar is the anchor. Everything else multiplies its reach.
          </p>
        </div>
      </section>

      {/* ── SECTION 6: TIER COMPARISON ──────────────────────────── */}
      <section
        ref={tiersRef}
        className="px-6 md:px-12 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-medium mb-3"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            Sponsorship tiers
          </h2>
          <p className="mb-14" style={{ color: "#888", fontSize: "16px" }}>
            Four levels of partnership. Pricing discussed on the strategy call.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                data-testid={`card-tier-${tier.name.toLowerCase()}`}
                className="relative flex flex-col cursor-default"
                style={{
                  background: "#1A1A1A",
                  border: tier.highlight ? "2px solid #DC143C" : "2px solid transparent",
                  borderRadius: 0,
                }}
                onClick={() => handleTierClick(tier.name)}
              >
                {tier.badge && (
                  <div
                    className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1"
                    style={{ background: "#DC143C", fontSize: "10px", letterSpacing: "0.05em" }}
                  >
                    {tier.badge.toUpperCase()}
                  </div>
                )}
                <div className="p-6 pb-4">
                  <h3
                    className="font-medium mb-4"
                    style={{ fontSize: "24px", color: "#fff" }}
                  >
                    {tier.name}
                  </h3>
                  <div
                    className="mb-4"
                    style={{ height: "2px", background: "#DC143C", width: "40px" }}
                  />
                  <p className="mb-6" style={{ color: "#888", fontSize: "13px", lineHeight: 1.5 }}>
                    {tier.tagline}
                  </p>
                </div>
                <div className="px-6 pb-6 flex-1">
                  <ul className="space-y-3">
                    {tier.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "#DC143C" }}
                        />
                        <span style={{ color: "#ccc", fontSize: "13px", lineHeight: 1.5 }}>
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10" style={{ color: "#666", fontSize: "14px" }}>
            Pricing, slot availability, and category exclusivity are reviewed on the strategy call.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: PROOF ────────────────────────────────────── */}
      <section
        ref={proofRef}
        className="px-6 md:px-12 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-medium mb-3"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            What happens when sponsors show up
          </h2>
          <p className="mb-14" style={{ color: "#888", fontSize: "16px" }}>
            Real results from real campaigns.
          </p>
          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-testid={`card-testimonial-${i}`}
                className="p-8"
                style={{
                  background: "#1A1A1A",
                  borderLeft: "4px solid #DC143C",
                  borderRadius: 0,
                  opacity: t.isPlaceholder ? 0.4 : 1,
                }}
              >
                {t.isPlaceholder ? (
                  <div style={{ color: "#555", fontSize: "14px" }}>
                    Sponsor case study — coming soon
                  </div>
                ) : (
                  <>
                    <div
                      className="text-xs font-bold tracking-widest uppercase mb-4"
                      style={{ color: "#DC143C" }}
                    >
                      {t.sponsor}
                    </div>
                    <h3
                      className="font-medium mb-4"
                      style={{ fontSize: "28px", color: "#fff" }}
                    >
                      {t.headline}
                    </h3>
                    <p className="mb-6" style={{ color: "#aaa", fontSize: "16px", lineHeight: 1.7 }}>
                      {t.body}
                    </p>
                    {t.quote && (
                      <blockquote
                        className="italic"
                        style={{ color: "#888", fontSize: "15px", borderLeft: "none" }}
                      >
                        "{t.quote}" — {t.quoteAuthor}
                      </blockquote>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: SPONSOR WALL ──────────────────────────────── */}
      <section
        ref={sponsorWallRef}
        className="px-6 md:px-12 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-medium mb-3"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            Current sponsors
          </h2>
          <p className="mb-14" style={{ color: "#888", fontSize: "16px" }}>
            A select group of category leaders. Limited slots per category.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* PhoneTap — text logo */}
            <div
              className="flex items-center justify-center p-8"
              style={{ background: "#1A1A1A", borderRadius: 0, minHeight: "100px" }}
              data-testid="logo-phonetap"
            >
              <div className="flex items-center gap-2">
                <PhoneCall size={18} style={{ color: "#fff" }} />
                <span
                  className="font-semibold"
                  style={{ color: "#fff", fontSize: "15px", letterSpacing: "-0.01em" }}
                >
                  PhoneTap
                </span>
              </div>
            </div>
            {/* Wink Toolbox */}
            <div
              className="flex items-center justify-center p-8"
              style={{ background: "#1A1A1A", borderRadius: 0, minHeight: "100px" }}
              data-testid="logo-wink"
            >
              <img
                src={winkLogo}
                alt="Wink Toolbox"
                style={{ width: "120px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
            {/* smartAC */}
            <div
              className="flex items-center justify-center p-8"
              style={{ background: "#1A1A1A", borderRadius: 0, minHeight: "100px" }}
              data-testid="logo-smartac"
            >
              <img
                src={smartACLogo}
                alt="smartAC"
                style={{ width: "120px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
            {/* Contractor Commerce */}
            <div
              className="flex items-center justify-center p-8"
              style={{ background: "#1A1A1A", borderRadius: 0, minHeight: "100px" }}
              data-testid="logo-contractor-commerce"
            >
              <img
                src={contractorCommerceLogo}
                alt="Contractor Commerce"
                style={{ width: "120px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>
          <p className="mt-10" style={{ color: "#666", fontSize: "14px", maxWidth: "580px", lineHeight: 1.7 }}>
            Spots are capped per category to protect visibility. Many categories are open. A few are not. The strategy call will tell you which is which for your space.
          </p>
        </div>
      </section>

      {/* ── SECTION 9: FINAL CTA ─────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="px-6 md:px-12 flex items-center justify-center text-center"
        style={{ background: "#0A0A0A", minHeight: "200px" }}
      >
        <div className="max-w-xl mx-auto py-16">
          <h2
            className="font-medium mb-4"
            style={{ fontSize: "32px", color: "#fff" }}
          >
            See if there's a fit
          </h2>
          <p className="mb-8" style={{ color: "#888", fontSize: "16px", lineHeight: 1.6 }}>
            20-minute call. We review your goals, the audience match, and which tier makes sense. If it's not a fit, we say so.
          </p>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-final-cta"
            onClick={() => handleCtaClick("final")}
            className="inline-block font-semibold text-white px-8 py-4 text-sm transition-opacity hover:opacity-90"
            style={{ background: "#DC143C" }}
          >
            Book a strategy call
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
