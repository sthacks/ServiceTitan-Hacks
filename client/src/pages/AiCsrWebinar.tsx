import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronUp,
  CheckCircle2,
  Phone,
  Clock,
  TrendingUp,
  Users,
  Zap,
  MessageSquare,
  Calendar,
  AlertCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import SEO from "@/components/SEO";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";
import quinnImage from "@assets/1771211003572_1778696049154.jpeg";
import britinyImage from "@assets/1710448174241_1778696049153.jpeg";
import revinHeroImage from "@assets/revin_1778696323692.png";

const config = {
  webinarTitle: "How Contractors Are Handling More Calls Without Hiring More CSRs",
  webinarSubtitle:
    "A fireside chat on after-hours calls, overflow, lead follow-up, and how contractors are using AI inside real service businesses.",
  webinarDate: "Tuesday, May 19, 2026 · 2:00 PM EST",
  webinarDateShort: "May 19, 2026 · 2:00 PM EST",
  path: "/webinar/ai-csr",
};

const painPoints = [
  {
    icon: Phone,
    title: "Phones Ringing Off the Hook",
    description:
      "Peak season hits and your office team is overwhelmed. Calls go unanswered and revenue walks out the door.",
  },
  {
    icon: Clock,
    title: "After-Hours Opportunities Missed",
    description:
      "Homeowners don't have emergencies on a 9-to-5 schedule. Without coverage, those calls go to your competitor.",
  },
  {
    icon: AlertCircle,
    title: "Estimates Sitting Untouched",
    description:
      "Your techs write estimates on-site but consistent follow-up never happens. Jobs are left on the table every week.",
  },
  {
    icon: MessageSquare,
    title: "Inconsistent Lead Follow-Up",
    description:
      "Speed-to-lead is everything. When your team is busy, new leads wait hours — or never hear back at all.",
  },
  {
    icon: Users,
    title: "Office Staff Burning Out",
    description:
      "Adding headcount to fix a volume problem is expensive and slow. There's a smarter way to handle the load.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Without Adding Payroll",
    description:
      "Every time you grow, the reflex is to hire. But the math never quite works. There has to be a better model.",
  },
];

const topics = [
  { icon: Phone, text: "Handling after-hours calls without adding headcount" },
  { icon: Zap, text: "Reducing office overload during peak season" },
  { icon: Users, text: "Using AI alongside your existing CSR team" },
  { icon: TrendingUp, text: "Improving speed-to-lead" },
  { icon: Star, text: "Membership and recurring service workflows" },
  { icon: MessageSquare, text: "Estimate follow-up automation" },
  { icon: CheckCircle2, text: "What contractors are automating first" },
  { icon: ArrowRight, text: "Where human interaction still matters" },
];

const timelineItems = [
  { label: "After-hours call handling", desc: "What happens when your office closes but customers don't stop calling" },
  { label: "Overflow during busy season", desc: "How to handle call volume spikes without adding staff" },
  { label: "Speed-to-lead", desc: "Why response time is the number one driver of booking rate" },
  { label: "Membership follow-up", desc: "Automating recurring communication for service plan customers" },
  { label: "Unsold estimates", desc: "Building a consistent follow-up workflow your team actually runs" },
  { label: "AI + human teamwork", desc: "Where AI handles the volume and where your team adds the value" },
  { label: "Scaling without burnout", desc: "What sustainable growth looks like operationally" },
  { label: "What contractors automate first", desc: "Real examples from businesses already doing this" },
];

const speakers = [
  {
    name: "Bill Brown",
    title: "Founder, ServiceTitan Hacks",
    bio: "Former HVAC business owner who scaled a company to over $3M in revenue before exiting. Bill now helps contractors improve operations through AI, automation, and ServiceTitan workflows.",
    image: hostImage,
    initials: "BB",
  },
  {
    name: "Quinn Litherland",
    title: "Co-Founder, Revin.ai",
    bio: "Helping home service businesses improve speed-to-lead, automate workflows, and scale operations using AI-assisted communication systems.",
    image: quinnImage,
    initials: "QL",
  },
  {
    name: "Britiny Leung",
    title: "Director of Operations, Action Furnace Inc.",
    bio: "Call center and operations leader at Action Furnace, one of Canada's leading HVAC companies. Extensive experience managing high-volume customer communication, office operations, staffing, and AI-assisted systems inside a large home service business.",
    image: britinyImage,
    initials: "BL",
  },
];

const whyNowPoints = [
  "Labor costs are rising and experienced CSRs are harder to find and retain",
  "Customer expectations for immediate response have never been higher",
  "Contractors who adopt AI now are building operational advantages that compound over time",
  "The technology has matured — this is no longer experimental, it's working inside real shops",
  "Your competitors are already testing this. The question is whether you lead or follow",
];

export default function AiCsrWebinar() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <SEO
        title="How Contractors Are Handling More Calls Without Hiring More CSRs | ServiceTitan Hacks"
        description="A fireside chat on after-hours calls, overflow, lead follow-up, and how contractors are using AI inside real service businesses. Free live webinar — Tuesday, May 19, 2026 at 2:00 PM EST."
        keywords="ServiceTitan AI, CSR automation, after-hours calls, home service AI, contractor operations, speed-to-lead"
        canonicalUrl={`https://servicetitanhacks.com${config.path}`}
        ogImage="https://servicetitanhacks.com/og-ai-csr-webinar.png"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": config.webinarTitle,
          "description": config.webinarSubtitle,
          "startDate": "2026-05-19T18:00:00Z",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": { "@type": "VirtualLocation", "url": "https://servicetitanhacks.com/webinar/ai-csr" },
          "url": "https://servicetitanhacks.com/webinar/ai-csr",
          "organizer": { "@type": "Organization", "name": "ServiceTitan Hacks", "url": "https://servicetitanhacks.com" },
          "performer": [
            { "@type": "Person", "name": "Bill Brown" },
            { "@type": "Person", "name": "Quinn Litherland" },
            { "@type": "Person", "name": "Britiny Leung" }
          ],
          "image": "https://servicetitanhacks.com/og-ai-csr-webinar.png"
        }}
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0b]/95 border-b border-white/10 py-3 px-4 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <img src={serviceTitanHacksLogo} alt="ServiceTitan Hacks" className="h-7 object-contain" />
            <span className="text-white/40 text-sm hidden sm:inline">|</span>
            <span className="text-white/60 text-sm hidden sm:inline">Free Live Webinar</span>
          </div>
          <Button
            size="sm"
            onClick={scrollToRegister}
            className="bg-[#ec164d] text-white"
            data-testid="button-sticky-reserve"
          >
            Reserve My Spot
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#ec164d]/15 border border-[#ec164d]/30 rounded-md px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#ec164d] animate-pulse" />
                <span className="text-[#ec164d] text-sm font-medium">Free Live Webinar &nbsp;·&nbsp; {config.webinarDateShort}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "Oxygen, sans-serif" }}>
                {config.webinarTitle}
              </h1>

              <p className="text-lg text-white/65 mb-8 leading-relaxed">
                {config.webinarSubtitle}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {["After-Hours Calls", "Overflow Handling", "Lead Follow-Up", "Membership Workflows", "Speed-To-Lead"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 border border-white/15 text-white/70 text-xs px-3 py-1.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  onClick={scrollToRegister}
                  className="bg-[#ec164d] text-white px-10"
                  data-testid="button-hero-reserve"
                >
                  Reserve My Spot
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-white/40 text-sm">
                <span>Hosted by ServiceTitan Hacks</span>
                <span className="hidden sm:inline">·</span>
                <span>Free to attend</span>
                <span className="hidden sm:inline">·</span>
                <span>Replay sent to all registrants</span>
              </div>
            </div>

            {/* Right — promo image */}
            <div className="w-full">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <img
                  src={revinHeroImage}
                  alt="How Contractors Are Handling More Calls Without Hiring More CSRs — Live Fireside Chat, May 19 2026"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-10 px-4 bg-white/[0.04] border-y border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-2xl font-bold text-white">10,800+</p>
              <p className="text-white/50 text-sm mt-1">ServiceTitan Professionals</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/15" />
            <div>
              <p className="text-white/80 font-medium">Trusted by Contractors Across</p>
              <p className="text-white/50 text-sm mt-1">HVAC, Plumbing &amp; Electrical</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/15" />
            <div>
              <p className="text-white/80 font-medium">Real Operational Conversations</p>
              <p className="text-white/50 text-sm mt-1">Not Sales Pitches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Webinar Matters */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Oxygen, sans-serif" }}>
              Most Contractors Do Not Have a Lead Problem
            </h2>
            <p className="text-2xl md:text-3xl text-[#ec164d] font-semibold">
              They have a response-time problem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {painPoints.map((item, i) => (
              <Card key={i} className="bg-white/[0.04] border-white/10">
                <CardContent className="pt-6 pb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#ec164d]/15 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-[#ec164d]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Discussion Topics */}
      <section className="py-20 md:py-24 px-4 bg-white/[0.04]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Oxygen, sans-serif" }}>
              What We'll Be Discussing
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white/[0.05] border border-white/10 rounded-lg p-4"
              >
                <div className="w-8 h-8 rounded-md bg-[#ec164d]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="h-4 w-4 text-[#ec164d]" />
                </div>
                <span className="text-white/80 text-sm leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning Quote */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="border border-[#ec164d]/30 rounded-2xl p-10 md:p-16 bg-[#ec164d]/[0.05] relative">
            <div className="text-[#ec164d] text-6xl font-serif leading-none mb-6 opacity-50">"</div>
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8 text-white">
              This webinar is not about replacing your office staff. It's about helping your existing team handle more volume, more consistently, without burnout.
            </p>
            <p className="text-white/55 text-lg">
              The best operational results happen when AI and your team work together.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Speakers */}
      <section className="py-20 md:py-24 px-4 bg-white/[0.04]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Oxygen, sans-serif" }}>
              Meet the Speakers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {speakers.map((speaker, i) => (
              <Card key={i} className="bg-white/[0.05] border-white/10">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="mb-5 flex justify-center">
                    {speaker.image ? (
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#ec164d]/40"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#ec164d]/20 border-2 border-[#ec164d]/40 flex items-center justify-center">
                        <span className="text-[#ec164d] font-bold text-lg">{speaker.initials}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{speaker.name}</h3>
                  <p className="text-[#ec164d] text-xs font-medium mb-4 leading-snug">{speaker.title}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{speaker.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fireside Chat Timeline */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "Oxygen, sans-serif" }}>
              Fireside Chat Topics
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {timelineItems.map((item, i) => (
                <div key={i} className="flex gap-6 pl-12 relative">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-[#ec164d]/20 border border-[#ec164d]/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ec164d] text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why This Topic Matters Right Now */}
      <section className="py-20 md:py-24 px-4 bg-white/[0.04]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "Oxygen, sans-serif" }}>
                Why This Topic Matters Right Now
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                The operational landscape for home service contractors has shifted. Labor is more expensive, customer expectations are higher, and the technology to address both has finally matured.
              </p>
              <p className="text-white/60 leading-relaxed">
                Contractors who figure out how to scale their office operations without scaling headcount will have a significant cost and speed advantage over the next three to five years.
              </p>
            </div>
            <div className="space-y-4">
              {whyNowPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/[0.05] border border-white/10 rounded-lg p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#ec164d] mt-0.5 flex-shrink-0" />
                  <p className="text-white/75 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="register" className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#ec164d]/15 border border-[#ec164d]/30 rounded-md px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ec164d] animate-pulse" />
            <span className="text-[#ec164d] text-sm font-medium">Free Registration</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Oxygen, sans-serif" }}>
            Reserve Your Spot
          </h2>
          <p className="text-white/60 mb-10 text-lg leading-relaxed">
            Free live webinar for HVAC, plumbing, and electrical contractors using ServiceTitan.
          </p>

          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 mb-4">
            <div style={{ width: "100%", height: "0px", position: "relative", paddingBottom: "56.25%" }}>
              <iframe
                src="https://streamyard.com/watch/7cdTGEpxbkCV?embed=true"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen"
                style={{ width: "100%", height: "100%", position: "absolute", left: 0, top: 0, overflow: "hidden" }}
                title="Webinar Registration Form"
                data-testid="iframe-registration-cta"
              />
            </div>
          </div>

          <p className="text-white/35 text-sm">
            We'll also send the replay after the event.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <img src={serviceTitanHacksLogo} alt="ServiceTitan Hacks" className="h-8 object-contain" />
            <div className="flex items-center gap-6">
              <a href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</a>
              <a href="/events" className="hover:text-white/70 transition-colors">All Events</a>
            </div>
          </div>
          <p className="text-center text-white/20 text-xs mt-6">
            © {new Date().getFullYear()} ServiceTitan Hacks. All rights reserved.
          </p>
        </div>
      </footer>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#ec164d] text-white p-3 rounded-full shadow-lg transition-all z-50"
          data-testid="button-back-to-top"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
