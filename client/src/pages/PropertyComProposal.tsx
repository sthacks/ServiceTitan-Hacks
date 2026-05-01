import SEO from "@/components/SEO";
import { useEffect } from "react";
import { Check, X, MousePointer, Users, Target } from "lucide-react";

export default function PropertyComProposal() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToOptions = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: 'Inter, sans-serif' }}>
      <SEO 
        title="Sponsorship Proposal - Property.com | ServiceTitan Hacks"
        description="Private sponsorship proposal for Kevin Cook and Property.com"
        noindex={true}
      />
      
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#6c6c6c]/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            ServiceTitan <span className="text-[#ec164d]">HACKS</span>
          </div>
          <div className="text-sm text-[#7c7c7c]">
            Prepared for: <span className="text-white">Kevin Cook & Property.com</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block bg-[#c20f3d] text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
            PRIVATE PROPOSAL
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Bridging the Trust Gap for Property.com
          </h1>
          <p className="text-lg md:text-xl text-[#7c7c7c] mb-10 max-w-3xl mx-auto leading-relaxed">
            Kevin, based on our conversation about the pivot to SaaS and the need to validate the ServiceTitan integration, here is the roadmap to get Max Traffic and Max Qualifier into the hands of the high-revenue contractors who can prove the use case.
          </p>
          <button 
            onClick={scrollToOptions}
            className="bg-[#ec164d] hover:bg-[#c20f3d] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200"
            data-testid="button-view-options"
          >
            View Sponsorship Options
          </button>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 md:py-24 border-t border-[#6c6c6c]/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Adoption Challenge
              </h2>
              <p className="text-[#7c7c7c] text-lg mb-8 leading-relaxed">
                Contractors don't trust ads. They don't respond to cold outreach. They trust their peers—the contractors they see succeeding in their own Facebook groups and communities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6c6c6c]/30 flex items-center justify-center">
                    <X className="w-4 h-4 text-[#6c6c6c]" />
                  </div>
                  <span className="text-[#7c7c7c]">Cold Email</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6c6c6c]/30 flex items-center justify-center">
                    <X className="w-4 h-4 text-[#6c6c6c]" />
                  </div>
                  <span className="text-[#7c7c7c]">Trade Shows</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#ec164d]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#ec164d]" />
                  </div>
                  <span className="text-white font-medium">Peer Validation</span>
                </div>
              </div>
            </div>

            {/* Right Column - Data Card */}
            <div className="bg-[#1a1a1a] border border-[#6c6c6c]/50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">The ST Hacks Ecosystem</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-[#ec164d] mb-1">9,800+</div>
                  <div className="text-sm text-[#7c7c7c]">Verified Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ec164d] mb-1">45%</div>
                  <div className="text-sm text-[#7c7c7c]">Email Open Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ec164d] mb-1">7,600+</div>
                  <div className="text-sm text-[#7c7c7c]">HVAC & Plumbing</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#ec164d] mb-1">100%</div>
                  <div className="text-sm text-[#7c7c7c]">ServiceTitan Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ghost Lead Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: 'radial-gradient(ellipse at center, #ec164d 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solving the "Ghost Lead" Problem
            </h2>
            <p className="text-lg text-[#7c7c7c]">
              We know Property.com needs data to prove the model. We use a 3-point verification system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#1a1a1a] border border-[#6c6c6c]/50 rounded-xl p-6 hover:border-[#ec164d] transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-[#ec164d]/10 flex items-center justify-center mb-4">
                <MousePointer className="w-6 h-6 text-[#ec164d]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Direct Engagement</h3>
              <p className="text-[#7c7c7c] text-sm">
                Tracked clicks & form fills from every placement across Facebook, email, and website.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1a1a1a] border border-[#6c6c6c]/50 rounded-xl p-6 hover:border-[#ec164d] transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-[#ec164d]/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#ec164d]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">The Matchback</h3>
              <p className="text-[#7c7c7c] text-sm">
                Cross-referencing your new users against our member list to prove influence and attribution.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1a1a1a] border border-[#6c6c6c]/50 rounded-xl p-6 hover:border-[#ec164d] transition-colors duration-200">
              <div className="w-12 h-12 rounded-lg bg-[#ec164d]/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#ec164d]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pixel Retargeting</h3>
              <p className="text-[#7c7c7c] text-sm">
                Building custom audiences for long-term conversion tracking. <span className="text-[#ec164d]">Diamond Exclusive.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 border-t border-[#6c6c6c]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sponsorship Options
            </h2>
            <p className="text-[#7c7c7c] text-lg">
              Choose the level of visibility and lead generation that fits your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Featured Tier */}
            <div className="bg-[#1a1a1a] border border-[#6c6c6c]/50 rounded-xl p-8 hover:border-[#ec164d] transition-colors duration-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Featured</h3>
                <div className="text-3xl font-bold text-white mb-1">$5,700<span className="text-lg text-[#7c7c7c] font-normal">/mo</span></div>
                <p className="text-[#7c7c7c] text-sm">Steady brand presence</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>2 Facebook Posts/month</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Bi-monthly Email Feature</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Website Placement</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Quarterly Reporting</span>
                </li>
              </ul>
              <a 
                href="https://buy.stripe.com/5kQ7sK0E8aBCgxh864gbm0O"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-[#6c6c6c] text-white font-semibold py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 block text-center"
                data-testid="button-featured-tier"
              >
                Get Started
              </a>
            </div>

            {/* Elite Tier - Recommended */}
            <div className="bg-[#1a1a1a] border-2 border-[#ec164d] rounded-xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ec164d] text-white text-xs font-bold px-4 py-1 rounded-full">
                RECOMMENDED
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Elite</h3>
                <div className="text-3xl font-bold text-white mb-1">$9,600<span className="text-lg text-[#7c7c7c] font-normal">/mo</span></div>
                <p className="text-[#7c7c7c] text-sm">Maximum qualified leads</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Weekly Exposure</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>3 Facebook Posts/month</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Category Exclusivity</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Matchback Reporting</span>
                </li>
                <li className="flex items-start gap-2 text-white font-medium">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Goal: 8-10 Qualified Leads/mo</span>
                </li>
              </ul>
              <a 
                href="https://buy.stripe.com/6oU28q1Ic39a94P720gbm0N"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#ec164d] hover:bg-[#c20f3d] text-white font-semibold py-3 rounded-lg transition-colors duration-200 block text-center"
                data-testid="button-elite-tier"
              >
                Lock in Elite
              </a>
            </div>

            {/* Diamond Tier */}
            <div className="bg-[#1a1a1a] border border-[#6c6c6c]/50 rounded-xl p-8 hover:border-[#ec164d] transition-colors duration-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Diamond</h3>
                <div className="text-3xl font-bold text-white mb-1">$13,900<span className="text-lg text-[#7c7c7c] font-normal">/mo</span></div>
                <p className="text-[#7c7c7c] text-sm">Market dominance</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Full Omnichannel Coverage</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Managed Pixel Retargeting</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Weekly Posts</span>
                </li>
                <li className="flex items-start gap-2 text-[#7c7c7c]">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Category Exclusivity</span>
                </li>
                <li className="flex items-start gap-2 text-white font-medium">
                  <Check className="w-5 h-5 text-[#ec164d] flex-shrink-0 mt-0.5" />
                  <span>Goal: 15+ Qualified Leads/mo</span>
                </li>
              </ul>
              <a 
                href="https://buy.stripe.com/7sY00i9aEbFGbcX3POgbm0M"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-[#6c6c6c] text-white font-semibold py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 block text-center"
                data-testid="button-diamond-tier"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Next Steps Section */}
      <section className="py-16 md:py-24 border-t border-[#6c6c6c]/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Validate the ServiceTitan Integration?
          </h2>
          <p className="text-lg text-[#7c7c7c] mb-10 max-w-2xl mx-auto">
            Let's build a pilot that proves the use case and gets Max Traffic in front of the right contractors.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://go.st-hacks.cc/partner-kickoff"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ec164d] hover:bg-[#c20f3d] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-block"
              data-testid="link-book-strategy"
            >
              Book Strategy Kickoff
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#6c6c6c]/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#6c6c6c] text-sm">
            © {new Date().getFullYear()} ServiceTitan Hacks. This proposal is confidential and prepared exclusively for Property.com.
          </p>
        </div>
      </footer>
    </div>
  );
}
