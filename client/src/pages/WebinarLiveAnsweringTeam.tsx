import { useState, useEffect } from "react";
import { Calendar, Clock, Video, Check, User } from "lucide-react";
import billHeadshot from "@assets/pro_headshot_1781732942673.png";
import nicoleHeadshot from "@assets/IMG_1013_1781886576304.jpeg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const STH = {
  dark: "#111111",
  red: "#ec164d",
  bg: "#ffffff",
  muted: "#f5f5f5",
  text: "#1a1a1a",
  white: "#ffffff",
};

// June 24, 2026 at 2:00 PM ET (EDT = UTC-4) = 18:00 UTC
const WEBINAR_DATE = new Date("2026-06-24T18:00:00Z");

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

const WALKAWAY = [
  "The four ways to handle your call volume, and the real cost, ramp time, and booking rate for each.",
  "Where each option fits your shop, and where it quietly costs you booked jobs.",
  "Why the booking rate most owners quote is softer than they think, and how to read it honestly.",
  "The owner's part: the expectations and setup that decide whether any option ever returns a dollar.",
];

const WHO_FOR = [
  "HVAC, plumbing, and electrical owners and operations leaders running ServiceTitan",
  "Companies at $3M or more in annual revenue, roughly 15 to 150 employees",
  "Teams that already have CSRs and are still losing calls at peak times or after hours",
];

const WHO_NOT_FOR = [
  "Shops under $3M that are not yet staffing a dedicated CSR function",
  "Anyone looking for a software demo or a sales presentation. This is a working session on the math.",
];

export default function WebinarLiveAnsweringTeam() {
  const { days, hours, minutes, seconds, isLive } = useCountdown(WEBINAR_DATE);
  const pad = (n: number) => String(n).padStart(2, "0");

  const scrollToRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="When to Outsource Call Handling: The Four Options and the Real Math for $3M+ Contractors | ServiceTitan Hacks"
        description="Free live webinar, June 24 at 2 PM ET. The four ways to handle call volume, the real cost and booking rate for each, and the setup that decides whether any option returns a dollar."
        ogImage="https://servicetitanhacks.com/og-live-answering-team-webinar.png"
        canonicalUrl="https://servicetitanhacks.com/webinars/live-answering-team"
      />
      <div className="min-h-screen flex flex-col" style={{ fontFamily: "Oxygen, Arial, sans-serif", color: STH.text }}>
        <Header />
        <main className="flex-1">

          {/* ── SECTION 1: HERO ── */}
          <section style={{ backgroundColor: STH.dark }} className="px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">

              {/* Badge */}
              <div className="inline-block px-5 py-1.5 rounded-full text-xs font-bold tracking-widest mb-8"
                   style={{ backgroundColor: STH.red, color: STH.white }}>
                {isLive ? "WE ARE LIVE" : "FREE LIVE WEBINAR"}
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3" style={{ color: STH.white }}>
                When to Outsource Call Handling
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl font-normal mb-6" style={{ color: STH.white, opacity: 0.65 }}>
                The Four Options and the Real Math for $3M+ Contractors
              </p>

              {/* Detail row */}
              <div className="flex items-center justify-center gap-6 text-sm mb-6 flex-wrap" style={{ color: STH.white, opacity: 0.65 }}>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Wednesday, June 24, 2026</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> 2:00 PM ET</span>
                <span className="flex items-center gap-1.5"><Video size={14} /> 45 minutes | Live</span>
              </div>

              {/* Subhead */}
              <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: STH.white, opacity: 0.75 }}>
                Your phones are ringing off the hook. We put real numbers on the four ways to handle that volume: hiring and training internally, a generic answering service, an AI CSR, and a trained live team in ServiceTitan. Plus the part most owners skip: the setup that decides whether any option returns a dollar.
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
                       style={{ backgroundColor: STH.red, color: STH.white }}>
                    <span className="text-3xl font-bold leading-none tabular-nums">{unit.value}</span>
                    <span className="text-xs mt-1 tracking-wide uppercase" style={{ opacity: 0.75 }}>{unit.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href="#register" onClick={scrollToRegister}
                 data-testid="button-save-seat-hero"
                 className="inline-block px-8 py-4 rounded-full font-bold text-base mb-4 transition-opacity hover:opacity-90"
                 style={{ backgroundColor: STH.white, color: STH.dark }}>
                Save My Seat
              </a>
              <p className="text-sm" style={{ color: STH.white, opacity: 0.5 }}>
                Cannot make it live? Register and we will send the replay and the decision worksheet.
              </p>
            </div>
          </section>

          {/* ── SECTION 2: REGISTRATION ── */}
          <section id="register" style={{ backgroundColor: STH.muted }} className="px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ color: STH.dark }}>
                Register free below
              </h2>
              <p className="text-center text-base mb-8" style={{ color: STH.text, opacity: 0.6 }}>
                Cannot make it live? Register and we will send the replay and the decision worksheet.
              </p>
              {/* NOTE: The event title and displayed date/time inside this embed are set in StreamYard,
                  not in this page's code. The embed currently shows "June 24, 2026 04:00 PM" which
                  is incorrect. The title and time must be updated in StreamYard to:
                  Title: "When to Outsource Call Handling: The Four Options and the Real Math for $3M+ Contractors"
                  Date/time: June 24, 2026, 2:00 PM ET */}
              <div className="rounded-2xl p-2" style={{ backgroundColor: STH.white }}>
                <div style={{ width: "100%", height: 0, position: "relative", paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://streamyard.com/watch/k9XdgUhSyfSE?embed=true"
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

          {/* ── SECTION 3: WHAT YOU WILL WALK AWAY WITH ── */}
          <section style={{ backgroundColor: STH.bg }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: STH.dark }}>
                What you will walk away with
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {WALKAWAY.map((item) => (
                  <div key={item}
                       className="flex gap-5 rounded-2xl p-6"
                       style={{ backgroundColor: STH.muted }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                         style={{ backgroundColor: STH.red }}>
                      <Check size={18} style={{ color: STH.white }} strokeWidth={2.5} />
                    </div>
                    <p className="text-sm leading-relaxed self-center" style={{ color: STH.text }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECTION 4: WHO THIS IS FOR / NOT FOR ── */}
          <section style={{ backgroundColor: STH.dark }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: STH.white }}>
                    Who this is for
                  </h2>
                  <div className="flex flex-col gap-4">
                    {WHO_FOR.map((item) => (
                      <div key={item} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                             style={{ backgroundColor: STH.red }}>
                          <Check size={15} style={{ color: STH.white }} strokeWidth={2.5} />
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: STH.white, opacity: 0.85 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: STH.white }}>
                    Who this is not for
                  </h2>
                  <div className="flex flex-col gap-4">
                    {WHO_NOT_FOR.map((item) => (
                      <div key={item} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                             style={{ backgroundColor: "#333333" }}>
                          <span style={{ color: STH.white, fontSize: 14, fontWeight: 700, lineHeight: 1 }}>x</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: STH.white, opacity: 0.65 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── SECTION 5: SPEAKERS ── */}
          <section style={{ backgroundColor: STH.bg }} className="px-6 py-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: STH.dark }}>
                Your presenters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

                {/* Bill Brown */}
                <div className="rounded-2xl p-7 text-center flex flex-col items-center"
                     style={{ backgroundColor: STH.muted }}>
                  <img src={billHeadshot} alt="Bill Brown" className="w-20 h-20 rounded-full mb-4 object-cover" />
                  <h3 className="font-bold text-base mb-1" style={{ color: STH.dark }}>Bill Brown</h3>
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: STH.red }}>Founder, ServiceTitan Hacks</p>
                  <p className="text-sm leading-relaxed" style={{ color: STH.text, opacity: 0.7 }}>
                    Grew Paramount Heating & Air to an Inc. 5000 company and sold the business. Runs the 10,000+ member ServiceTitan Hacks community for home service contractors.
                  </p>
                </div>

                {/* Nicole Rivera - bio and headshot pending */}
                <div className="rounded-2xl p-7 text-center flex flex-col items-center"
                     style={{ backgroundColor: STH.muted, border: "2px dashed #cccccc" }}>
                  <img src={nicoleHeadshot} alt="Nicole Rivera, Jill's Office" className="w-20 h-20 rounded-full mb-4 object-cover object-top" />
                  <h3 className="font-bold text-base mb-1" style={{ color: STH.dark }}>Nicole Rivera</h3>
                  <p className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: STH.red }}>Director of Sales and Marketing, Jill's Office</p>
                  <p className="text-sm leading-relaxed italic" style={{ color: "#aaaaaa" }}>
                    [Bio pending. 2 to 3 sentences from Nicole before publishing.]
                  </p>
                  <p className="text-xs mt-3 font-semibold" style={{ color: STH.red }}>Headshot and bio still needed from Nicole before publishing</p>
                </div>

              </div>

              {/* Format note */}
              <p className="text-center text-sm mt-10 max-w-xl mx-auto" style={{ color: STH.text, opacity: 0.5 }}>
                Educational and operational. No software demo. No sales presentation. Math grounded.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: FINAL CTA ── */}
          <section style={{ backgroundColor: STH.dark }} className="px-6 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: STH.white }}>
                The math on call handling should not be a gut call
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: STH.white, opacity: 0.78 }}>
                HVAC, plumbing, and electrical owners and operations leaders running ServiceTitan at $3M or more. If you are losing calls at peak times or after hours and are not sure whether the fix is more headcount or a different model, this session is the starting point.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: STH.white, opacity: 0.78 }}>
                Bring your actual call volume numbers. If you want, the Jill's Office team will run the comparison with you on a short call after the session.
              </p>
              <a href="#register" onClick={scrollToRegister}
                 data-testid="button-register-final-cta"
                 className="inline-block px-8 py-4 rounded-full font-bold text-base mb-8 transition-opacity hover:opacity-90"
                 style={{ backgroundColor: STH.red, color: STH.white }}>
                Save your seat for June 24
              </a>
              <div>
                <a href="/events"
                   data-testid="link-see-all-events"
                   className="text-sm underline transition-opacity hover:opacity-80"
                   style={{ color: STH.white, opacity: 0.5 }}>
                  See all events and webinars
                </a>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
