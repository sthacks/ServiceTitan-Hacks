import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, CheckCircle2, PhoneCall, TrendingUp, BarChart3, Users } from "lucide-react";
import SEO from "@/components/SEO";
import serviceTitanHacksLogo from "@assets/Horizontal_White_lettering_1767654224442.png";
import hostImage from "@assets/red_shirt_round_1767651554251.png";

const config = {
  webinarTitle: "What Your Missed Calls Are Actually Costing You",
  webinarDate: "Wednesday, April 8, 2026",
  webinarTime: "2:00 PM",
  timezone: "EST",
  registrationUrl:
    "https://riverside.com/webinar/registration/eyJzbHVnIjoiYmlsbC1icm93bnMtc3R1ZGlvLVZNTmdnIiwiZXZlbnRJZCI6IjY5YWVlNzY4ZGUyMTJjMjllYWI0NDhmOSIsInByb2plY3RJZCI6IjY5YWVlNzY4MzE0NDMwNWU4MmY1OTU1YyJ9",
};

const whatYoullSee = [
  "How PhoneTap connects to ServiceTitan call recordings",
  "How AI classifies call outcomes — booked, missed opportunity, voicemail, and more",
  "How lost revenue is calculated from real call data",
  "Examples of missed booking opportunities inside real contractor calls",
  "How contractors are using this data to improve booking rates",
];

const whoThisIsFor = [
  "HVAC contractors using ServiceTitan",
  "Owners who want to increase booking rates",
  "Operations managers responsible for call center performance",
  "Companies receiving 500+ inbound calls per month",
];

const whyItMattersQuestions = [
  "How many inbound calls never get booked?",
  "How many callers hang up before reaching a CSR?",
  "How often does a CSR miss a booking opportunity?",
  "How much revenue is hiding inside those calls?",
];

const statCards = [
  {
    icon: PhoneCall,
    stat: "Most shops",
    label: "track leads and booked jobs but never analyze what happens inside the call",
  },
  {
    icon: TrendingUp,
    stat: "Hidden revenue",
    label: "sits inside inbound calls that never convert — and most owners never see it",
  },
  {
    icon: BarChart3,
    stat: "Real data",
    label: "from ServiceTitan call recordings surfaces the answers most operators never ask",
  },
];

export default function PhoneTapWebinar() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="What Your Missed Calls Are Actually Costing You | PhoneTap Live Webinar"
        description="Most contractors track booked jobs. Very few know how much revenue they lose from inbound calls that never turn into appointments. See PhoneTap in action — live March 18, 2026."
        keywords="PhoneTap, ServiceTitan call analysis, missed calls, HVAC booking rate, contractor AI, call center optimization"
        canonicalUrl="https://servicetitanhacks.com/webinar/phonetap"
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": config.webinarTitle,
          "description": "Most contractors track booked jobs. Very few know how much revenue they lose from inbound calls that never turn into appointments. See PhoneTap in action with a live demo.",
          "startDate": "2026-04-08T18:00:00Z",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": { "@type": "VirtualLocation", "url": "https://servicetitanhacks.com/webinar/phonetap" },
          "url": "https://servicetitanhacks.com/webinar/phonetap",
          "organizer": { "@type": "Organization", "name": "ServiceTitan Hacks", "url": "https://servicetitanhacks.com" },
          "performer": [{ "@type": "Person", "name": "Bill Brown" }],
          "image": "https://servicetitanhacks.com/og-phonetap-csrs.png"
        }}
      />

      {/* Sticky Header CTA */}
      <div className="sticky top-0 z-50 bg-black/95 border-b border-white/10 py-3 px-4 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <img src={serviceTitanHacksLogo} alt="ServiceTitan Hacks" className="h-7 object-contain" />
            <span className="text-white/50 text-sm hidden sm:inline">|</span>
            <span className="text-white/70 text-sm hidden sm:inline">
              Live Webinar &nbsp;·&nbsp; {config.webinarDate} &nbsp;·&nbsp; {config.webinarTime} {config.timezone}
            </span>
          </div>
          <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="bg-[#ED254E] hover:bg-[#ED254E]/90 text-white"
              data-testid="button-sticky-register"
            >
              Register for the Live Webinar
            </Button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#ED254E]/15 border border-[#ED254E]/30 rounded-md px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#ED254E] animate-pulse" />
            <span className="text-[#ED254E] text-sm font-medium">Live Demonstration · {config.webinarDate}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "Oxygen, sans-serif" }}>
            {config.webinarTitle}
          </h1>

          <p className="text-xl text-white/65 max-w-2xl mx-auto mb-6 leading-relaxed">
            Most contractors track booked jobs. Very few know how much revenue they are losing from inbound calls that never turn into appointments.
          </p>
          <p className="text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            In this live session, Bill Brown will walk through how PhoneTap analyzes real inbound calls from ServiceTitan and identifies missed revenue opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-[#ED254E] hover:bg-[#ED254E]/90 px-10"
                data-testid="button-hero-register"
              >
                Register for the Live Webinar
              </Button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/40 text-sm">
            <span>{config.webinarDate}</span>
            <span className="hidden sm:inline">·</span>
            <span>{config.webinarTime} {config.timezone}</span>
            <span className="hidden sm:inline">·</span>
            <span>Live on Riverside</span>
            <span className="hidden sm:inline">·</span>
            <span>Free</span>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why This Matters</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {statCards.map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <item.icon className="h-7 w-7 text-[#ED254E] mb-4" />
                  <p className="text-white font-semibold mb-1">{item.stat}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-white/75 text-lg mb-6 leading-relaxed">
              Most shops track leads and booked jobs. But very few actually analyze what happens inside their inbound calls.
            </p>
            <p className="text-white/65 mb-6">Questions most owners cannot answer:</p>
            <ul className="space-y-3 mb-8">
              {whyItMattersQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-3 text-white/75">
                  <span className="text-[#ED254E] font-bold mt-0.5">?</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/65 leading-relaxed">
              PhoneTap analyzes inbound call recordings and surfaces the answers. This webinar will show how it works using real contractor data.
            </p>
          </div>
        </div>
      </section>

      {/* What You Will See */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What You Will See</h2>
          <p className="text-center text-white/55 mb-10">
            During this session you will see:
          </p>
          <ul className="space-y-4">
            {whatYoullSee.map((point, i) => (
              <li key={i} className="flex items-start gap-4 text-white/80 text-lg">
                <CheckCircle2 className="h-5 w-5 text-[#ED254E] mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-white/50 text-sm text-center">
            This is a live walkthrough of the system, not a sales presentation.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who This Is For</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            {whoThisIsFor.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4">
                <Users className="h-5 w-5 text-[#ED254E] mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-white/50 text-sm max-w-xl mx-auto">
            If you rely on inbound calls for revenue, this will likely surface insights you have never seen before.
          </p>
        </div>
      </section>

      {/* About the Host */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About the Host</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-2xl mx-auto">
            <img
              src={hostImage}
              alt="Bill Brown"
              className="w-28 h-28 rounded-full object-cover flex-shrink-0"
              data-testid="img-host"
            />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Bill Brown</h3>
              <p className="text-[#ED254E] text-sm mb-4">Founder, ServiceTitan Hacks</p>
              <p className="text-white/65 leading-relaxed mb-4">
                Bill Brown is a former HVAC company owner who scaled his business to over $3M in revenue and landed on the Inc. 5000 list. Today he runs ServiceTitan Hacks, a community focused on helping contractors improve operations using automation, integrations, and AI tools.
              </p>
              <p className="text-white/65 leading-relaxed">
                He built PhoneTap to answer a simple question contractors struggle with:{" "}
                <span className="text-white font-medium">What actually happens inside our inbound calls?</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Register */}
      <section className="py-16 md:py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reserve Your Spot</h2>
          <p className="text-white/65 mb-8 leading-relaxed">
            Reserve your spot for the live session and see how much revenue may be hiding inside your inbound calls.
          </p>
          <a href={config.registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#ED254E] hover:bg-[#ED254E]/90 text-white px-10 mb-8"
              data-testid="button-register"
            >
              Register for the Webinar
            </Button>
          </a>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/40 text-sm">
            <span>{config.webinarDate}</span>
            <span className="hidden sm:inline">·</span>
            <span>{config.webinarTime} {config.timezone}</span>
            <span className="hidden sm:inline">·</span>
            <span>Free Live Webinar</span>
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
