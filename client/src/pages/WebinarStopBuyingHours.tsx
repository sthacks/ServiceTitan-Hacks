import { useState, useEffect } from "react";
import { Calendar, Clock, Video, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SW = {
  cream: "#FAF7EC",
  ink: "#1C2B1C",
  yellow: "#F7EC6A",
  white: "#FFFFFF",
  pink: "#EC1B52",
};

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

// Target: July 15, 2026 1:00 PM EDT = 17:00 UTC
const WEBINAR_DATE = new Date("2026-07-15T17:00:00Z");

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isLive: false,
  };
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

const COVERS = [
  {
    title: "Why most bonus plans fail",
    body: "Quarterly bonuses get treated like gifts. Your team says thanks, has no idea what behavior earned it, and changes nothing.",
  },
  {
    title: "The real math of hourly pay",
    body: "What a 30% labor rate is costing you, and how shops running performance pay get to 18%.",
  },
  {
    title: "What a $5M shop saw after switching",
    body: "Average tickets from $800-900 to $1,500-2,000, techs tracking their own numbers daily, and no more raise conversations.",
  },
  {
    title: "How to sell the switch to your techs",
    body: "The shadow payroll method: run the new plan against real jobs first so every tech sees what they would have earned before anything changes.",
  },
  {
    title: "Why A-players seek this out",
    body: "How an incentive plan becomes a recruiting weapon. One shop hired its best plumber specifically because of it.",
  },
  {
    title: "The bottom-line ROI",
    body: "Incremental ticket revenue comes with flat marketing spend, so most of it lands as profit. The math at $2M, $5M, and $20M shops.",
  },
];

const STATS = [
  { stat: "$800 to $1,500+", label: "Average ticket after the switch at a $5M shop" },
  { stat: "18%", label: "Labor rate target vs the 30% hourly creep" },
  { stat: "0", label: "Raise requests since switching, per the owner" },
];

const SPEAKERS = [
  {
    name: "Bill Brown",
    role: "Founder, ServiceTitan Hacks",
    bio: "Grew Paramount Heating & Air to an Inc. 5000 company, switched his own team to performance pay, and sold the business. Runs the 10,000+ member ServiceTitan Hacks community.",
  },
  {
    name: "Contractor Guest",
    role: "Recently switched to performance pay",
    bio: "Sharing the real rollout: what they feared, what they messaged to the team, and what the numbers did.",
    /* guest name and headshot coming */
  },
  {
    name: "Ryan Shank",
    role: "Founder, ShareWillow",
    bio: "Built the incentive plan platform used by contractors across the trades. Official ServiceTitan partner. Answering technical and plan-design questions live.",
  },
];

export default function WebinarStopBuyingHours() {
  const { days, hours, minutes, seconds, isLive } = useCountdown(WEBINAR_DATE);
  const pad = (n: number) => String(n).padStart(2, "0");

  const scrollToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <title>Stop Buying Hours: Free Performance Pay Webinar | ServiceTitan Hacks</title>
      <meta name="description" content="Free live webinar July 15 at 1 PM ET. How contractors switch to performance pay, sell it to their techs, and what happened when a $5M shop did it." />
      <meta property="og:title" content="Stop Buying Hours: Free Performance Pay Webinar | ServiceTitan Hacks" />
      <meta property="og:description" content="Free live webinar July 15 at 1 PM ET. How contractors switch to performance pay, sell it to their techs, and what happened when a $5M shop did it." />
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "Oxygen, Arial, sans-serif", color: SW.ink }}>
        <Header />
        <main className="flex-1">

          {/* ── SECTION 1: HERO ── */}
          <section style={{ backgroundColor: SW.cream }} className="px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">

              {/* Co-brand lockup */}
              <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                <span style={{ fontFamily: "Oxygen, Arial, sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em", color: SW.ink }}>
                  ServiceTitan <span style={{ color: SW.pink }}>HACKS</span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 300, opacity: 0.4 }}>x</span>
                <span style={{ ...serif, fontWeight: 700, fontSize: 22, color: SW.ink }}>ShareWillow</span>
              </div>

              {/* Badge */}
              <div className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest mb-8"
                   style={{ backgroundColor: isLive ? SW.pink : SW.yellow, color: isLive ? SW.white : SW.ink }}>
                {isLive ? "WE ARE LIVE" : "FREE LIVE WEBINAR"}
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={serif}>
                How to Stop Buying Hours, Start Paying for{" "}
                <em>Results</em>, and Sell the Switch to Your Techs
              </h1>

              {/* Detail row */}
              <div className="flex items-center justify-center gap-6 text-sm mb-6 flex-wrap" style={{ color: SW.ink, opacity: 0.65 }}>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Wednesday, July 15</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> 1 PM Eastern</span>
                <span className="flex items-center gap-1.5"><Video size={14} /> About 60 minutes + live Q&A</span>
              </div>

              {/* Subhead */}
              <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ opacity: 0.75 }}>
                If you pay your technicians by the hour, what exactly are you buying? Not outcomes. Not higher tickets or five-star reviews. Time. One hour, real numbers from real shops on ServiceTitan, no pitch-fest.
              </p>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
                {[
                  { value: pad(days), label: "Days" },
                  { value: pad(hours), label: "Hours" },
                  { value: pad(minutes), label: "Min" },
                  { value: pad(seconds), label: "Sec" },
                ].map((unit) => (
                  <div key={unit.label}
                       className="flex flex-col items-center rounded-xl px-5 py-3 min-w-[72px]"
                       style={{ backgroundColor: SW.ink, color: SW.cream }}>
                    <span className="text-3xl font-bold leading-none tabular-nums">{unit.value}</span>
                    <span className="text-xs mt-1 tracking-wide uppercase" style={{ opacity: 0.55 }}>{unit.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href="#register" onClick={scrollToRegister}
                 data-testid="button-save-seat-hero"
                 className="inline-block px-8 py-4 rounded-full font-bold text-base mb-4 transition-opacity hover:opacity-90"
                 style={{ backgroundColor: SW.pink, color: SW.white }}>
                Save My Seat
              </a>
              <p className="text-sm" style={{ opacity: 0.5 }}>
                Can't make it live? Register anyway. Every registrant gets the full replay.
              </p>
            </div>
          </section>

          {/* ── SECTION 2: REGISTRATION ── */}
          <section id="register" style={{ backgroundColor: SW.ink }} className="px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ ...serif, color: SW.cream }}>
                Register free below
              </h2>
              <p className="text-center text-base mb-8" style={{ color: SW.cream, opacity: 0.6 }}>
                Live attendees get an exclusive offer we are only making on this webinar.
              </p>
              <div className="rounded-2xl p-2" style={{ backgroundColor: SW.cream }}>
                <div style={{ width: "100%", height: 0, position: "relative", paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://streamyard.com/watch/KGMcjWmWNapZ?embed=true"
                    width="100%"
                    height="100%"
                    frameBorder={0}
                    allow="autoplay; fullscreen"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      left: 0,
                      top: 0,
                      overflow: "hidden",
                      borderRadius: 12,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION 3: WHAT WE WILL COVER ── */}
          <section style={{ backgroundColor: SW.cream }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={serif}>
                What we will cover
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {COVERS.map((item) => (
                  <div key={item.title}
                       className="flex gap-5 rounded-2xl p-6"
                       style={{ backgroundColor: SW.white }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                         style={{ backgroundColor: SW.yellow }}>
                      <Check size={18} style={{ color: SW.ink }} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1" style={{ color: SW.ink }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm max-w-2xl mx-auto" style={{ opacity: 0.55 }}>
                Plus open Q&A. Bring the objections: "My guys will quit." "It is just commission with extra steps." "My market is different." We have heard them all, and we will answer them straight.
              </p>
            </div>
          </section>

          {/* ── SECTION 4: PROOF BAND ── */}
          <section style={{ backgroundColor: SW.yellow }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-xs font-bold tracking-widest mb-10" style={{ color: SW.ink, opacity: 0.5 }}>
                FROM OUR LAST PERFORMANCE PAY WEBINAR
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                {STATS.map((s) => (
                  <div key={s.stat} className="rounded-2xl p-7" style={{ backgroundColor: SW.cream }}>
                    <p className="text-4xl font-bold mb-2" style={{ ...serif, color: SW.ink }}>{s.stat}</p>
                    <p className="text-sm" style={{ color: SW.ink, opacity: 0.65 }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <blockquote className="max-w-2xl mx-auto">
                <p className="text-lg md:text-xl leading-relaxed mb-4"
                   style={{ ...serif, fontStyle: "italic", color: SW.ink }}>
                  "I've been beating my head against the table for a long time trying to figure out what to do. My plumbers are watching their numbers day in and day out more than I ever could."
                </p>
                <footer className="text-sm font-semibold" style={{ color: SW.ink, opacity: 0.65 }}>
                  Ron Williams - Benjamin Franklin Plumbing & One Hour - Ocean City, MD
                </footer>
              </blockquote>
            </div>
          </section>

          {/* ── SECTION 5: SPEAKERS ── */}
          <section style={{ backgroundColor: SW.white }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ ...serif, color: SW.ink }}>
                Your speakers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SPEAKERS.map((s) => (
                  <div key={s.name}
                       className="rounded-2xl p-7 text-center flex flex-col items-center"
                       style={{ backgroundColor: SW.cream }}>
                    {/* Headshot placeholder - ready for image upload */}
                    <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center"
                         style={{ backgroundColor: "#E8E2D0", border: "2px dashed #B5AD97" }}>
                      <span style={{ fontSize: 9, color: "#B5AD97", fontFamily: "monospace", letterSpacing: 0 }}>headshot</span>
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color: SW.ink }}>{s.name}</h3>
                    <p className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: SW.pink }}>{s.role}</p>
                    <p className="text-sm leading-relaxed" style={{ color: SW.ink, opacity: 0.7 }}>{s.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 6: FINAL CTA ── */}
          <section style={{ backgroundColor: SW.cream }} className="px-6 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ ...serif, color: SW.ink }}>
                Built for owners who pay hourly and know something is off
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ opacity: 0.78 }}>
                HVAC, plumbing, and electrical owners and managers on ServiceTitan who pay hourly or run a bonus plan that is not changing behavior. Whether you have 3 techs or 230, the math works the same way.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ opacity: 0.78 }}>
                You have a million problems in your shop. Pay is the one that touches all of them: efficiency, retention, recruiting, reviews, and profit.
              </p>
              <a href="#register" onClick={scrollToRegister}
                 data-testid="button-register-final-cta"
                 className="inline-block px-8 py-4 rounded-full font-bold text-base mb-6 transition-opacity hover:opacity-90"
                 style={{ backgroundColor: SW.ink, color: SW.cream }}>
                Register Free for July 15
              </a>
              <p className="text-xs" style={{ opacity: 0.42 }}>
                Presented by ServiceTitan Hacks with our exclusive performance pay partner, ShareWillow. Transparency: ShareWillow is a paid sponsor of ServiceTitan Hacks.
              </p>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
