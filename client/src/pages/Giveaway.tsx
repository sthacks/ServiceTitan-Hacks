import { useState } from "react";
import SEO from "@/components/SEO";
import { Check } from "lucide-react";
import logoImage from "@assets/secondary logo_1760895642629.png";
import airpodsImage from "@assets/Untitled design - 1_1764262891991.png";
import yetiImage from "@assets/Untitled design - 2_1764262891991.png";
import soloStoveImage from "@assets/Untitled design - 3_1764262891991.png";
import macbookImage from "@assets/Untitled design - 4_1764262891991.png";

export default function Giveaway() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            Get weekly AI workflows, ServiceTitan automations, and contractor growth strategies. Enter the giveaway by subscribing below.
          </h2>
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
