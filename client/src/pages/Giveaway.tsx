import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import { Check, Copy, Share2 } from "lucide-react";
import logoImage from "@assets/secondary logo_1760895642629.png";
import airpodsImage from "@assets/Untitled design - 1_1764262891991.png";
import yetiImage from "@assets/Untitled design - 2_1764262891991.png";
import soloStoveImage from "@assets/Untitled design - 3_1764262891991.png";
import macbookImage from "@assets/Untitled design - 4_1764262891991.png";

// Countdown target: December 12, 2025 at 5:00 PM EST
const TARGET_DATE = new Date('2025-12-12T17:00:00-05:00');

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate: Date) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false
  };
}

export default function Giveaway() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const timeLeft = useCountdown(TARGET_DATE);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://st-hacks.com/giveaway';
  const shareText = "I just entered the ServiceTitan Hacks Newsletter Giveaway! Join me for a chance to win AirPods, YETI cooler, Solo Stove, or a MacBook Air.";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'width=600,height=400');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/giveaway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email,
          companyName: companyName || undefined
        })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage(data.message || "You're entered. Check your email.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompanyName("");
      } else {
        setStatus("error");
        setStatusMessage(data.message || "There was an issue. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("There was an issue. Please try again.");
    }
  };

  const prizeTiers = [
    { tier: 1, unlock: 100, prize: "Apple AirPods 4", image: airpodsImage },
    { tier: 2, unlock: 250, prize: "YETI Hard Cooler", image: yetiImage },
    { tier: 3, unlock: 500, prize: "Solo Stove Infinity Flame Fire Pit", image: soloStoveImage },
    { tier: 4, unlock: 1000, prize: "Apple MacBook Air 13 inch", image: macbookImage }
  ];

  const newsletterBenefits = [
    "Real ServiceTitan automations you can copy and paste",
    "AI workflows that save hours each week",
    "Field tested HVAC, plumbing, and electrical growth strategies",
    "Tools, templates, and behind the scenes insights",
    "Early access to calculators, dashboards, and new tools"
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
      <SEO 
        title="ServiceTitan Hacks Newsletter Giveaway"
        description="Join the ServiceTitan Hacks newsletter giveaway and unlock prizes by subscribing."
      />

      {/* Hero Section */}
      <section className="py-10 px-4" style={{ background: 'linear-gradient(to bottom, #09090b, #1a1b20)' }}>
        <div className="container mx-auto max-w-4xl text-center">
          <img 
            src={logoImage} 
            alt="ServiceTitan Hacks" 
            className="h-16 md:h-20 mx-auto mb-8"
            data-testid="img-logo"
          />
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
            data-testid="text-hero-title"
          >
            Join the ServiceTitan Hacks Newsletter Giveaway
          </h1>
          <h2 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            data-testid="text-hero-subtitle"
          >
            Get weekly AI workflows, ServiceTitan automations, and contractor growth strategies. Enter the giveaway by subscribing below.
          </h2>
          
          {/* Countdown Timer */}
          {!timeLeft.expired ? (
            <div className="flex justify-center gap-3 md:gap-6" data-testid="countdown-timer">
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 md:px-6 md:py-4">
                <div className="text-2xl md:text-4xl font-bold text-white" data-testid="countdown-days">{timeLeft.days}</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 md:px-6 md:py-4">
                <div className="text-2xl md:text-4xl font-bold text-white" data-testid="countdown-hours">{timeLeft.hours}</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 md:px-6 md:py-4">
                <div className="text-2xl md:text-4xl font-bold text-white" data-testid="countdown-minutes">{timeLeft.minutes}</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Min</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 md:px-6 md:py-4">
                <div className="text-2xl md:text-4xl font-bold text-white" data-testid="countdown-seconds">{timeLeft.seconds}</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Sec</div>
              </div>
            </div>
          ) : (
            <div className="text-xl text-[#ED254E] font-semibold" data-testid="countdown-expired">
              Giveaway has ended!
            </div>
          )}
        </div>
      </section>

      {/* Value Section */}
      <section className="bg-white py-8 px-4">
        <div className="container mx-auto max-w-[800px]">
          <h2 
            className="text-2xl md:text-3xl font-bold text-black mb-6 text-center"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
            data-testid="text-value-title"
          >
            What you get in the newsletter
          </h2>
          <ul className="space-y-3">
            {newsletterBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3" data-testid={`text-benefit-${index}`}>
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span className="text-black text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prize Tiers Section */}
      <section className="bg-[#F4F4F4] py-12 px-4">
        <div className="container mx-auto max-w-[900px]">
          <h2 
            className="text-2xl md:text-3xl font-bold text-black mb-8 text-center"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
            data-testid="text-prizes-title"
          >
            Giveaway Prize Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prizeTiers.map((tier) => (
              <div 
                key={tier.tier}
                className="bg-white border border-[#DDD] rounded-2xl p-6 flex flex-col items-center text-center"
                data-testid={`card-tier-${tier.tier}`}
              >
                <span className="bg-[#ED254E] text-white font-bold px-4 py-1.5 rounded-lg text-sm mb-4">
                  Tier {tier.tier}
                </span>
                <img 
                  src={tier.image} 
                  alt={tier.prize}
                  className="w-40 h-40 object-contain mb-4"
                  data-testid={`img-tier-${tier.tier}`}
                />
                <span className="text-black font-semibold text-lg mb-2">
                  {tier.prize}
                </span>
                <span className="text-gray-600 text-sm">
                  Unlocks at {tier.unlock.toLocaleString()} new subscribers
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Signup Form Section */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-[600px]">
          <h2 
            className="text-2xl md:text-3xl font-bold text-black mb-4 text-center"
            style={{ fontFamily: 'Oxygen, sans-serif' }}
            data-testid="text-form-title"
          >
            Enter the Giveaway
          </h2>
          <p className="text-gray-700 text-center mb-8" data-testid="text-form-description">
            Subscribe with your email to enter. That is your entire entry. One winner per unlocked tier.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-giveaway">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-black font-medium mb-2">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED254E] focus:border-transparent text-black"
                  placeholder="John"
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-black font-medium mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED254E] focus:border-transparent text-black"
                  placeholder="Smith"
                  data-testid="input-last-name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-black font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED254E] focus:border-transparent text-black"
                placeholder="your@email.com"
                data-testid="input-email"
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-black font-medium mb-2">
                Company name <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED254E] focus:border-transparent text-black"
                placeholder="Your Company"
                data-testid="input-company-name"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#ED254E] hover:bg-[#C1121F] text-white font-semibold py-4 px-6 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-submit"
            >
              {status === "loading" ? "Submitting..." : "Join the newsletter and enter"}
            </button>
          </form>
          
          {statusMessage && (
            <div 
              className={`mt-4 text-center font-medium ${status === "success" ? "text-green-600" : "text-red-600"}`}
              data-testid="text-form-status"
            >
              {statusMessage}
            </div>
          )}
          
          {status === "success" && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl" data-testid="share-section">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-gray-700" />
                <span className="text-black font-semibold">Share with a friend</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Help us reach our subscriber goals and unlock more prizes!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleShareFacebook}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                  data-testid="button-share-facebook"
                >
                  Facebook
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  data-testid="button-share-twitter"
                >
                  X / Twitter
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition-colors"
                  data-testid="button-share-linkedin"
                >
                  LinkedIn
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  data-testid="button-copy-link"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-600 text-base" data-testid="text-social-proof">
            9,700 contractors follow ServiceTitan Hacks.
          </p>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="bg-[#F7F7F7] py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-600 text-sm" data-testid="text-trust">
            This newsletter is free. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
