import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, Users, ExternalLink } from "lucide-react";
import { useEffect } from "react";

export default function ReferProSponsorSummary() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b]">
      <SEO 
        title="Sponsor Summary: ReferPro | ServiceTitan Hacks"
        description="Private recap and sponsorship options for ReferPro"
        noindex={true}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* ReferPro Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://images.ctfassets.net/mb2ty0185mk8/5Rvyd9zgjEYeY5G7iMN94e/8cb1f8c5759b0ebb89efbcd313c97427/rp-full-color-horizontal-dark__10_.png"
              alt="ReferPro Logo"
              className="h-16 md:h-20 w-auto"
              data-testid="img-referpro-logo"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
            Sponsor Summary: ReferPro
          </h1>
          <p className="text-xl text-gray-400 mb-8">Private recap and sponsorship options</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://go.st-hacks.cc/partnership-review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#ED254E] hover:bg-[#C1121F] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              data-testid="button-book-call-hero"
            >
              <Calendar className="w-5 h-5" />
              Book the follow-up call
            </a>
            <a 
              href="#"
              className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              data-testid="button-download-deck"
            >
              <ExternalLink className="w-5 h-5" />
              Download sponsorship deck
            </a>
          </div>
        </div>

        {/* Call Details */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              <Calendar className="w-6 h-6 text-[#ED254E]" />
              Call Details
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-2">
            <p><span className="text-gray-400">Date:</span> December 15, 2025</p>
            <p><span className="text-gray-400">Participants:</span> Bill Brown + ReferPro team</p>
            <p><span className="text-gray-400">Meeting:</span> ReferPro Meeting</p>
          </CardContent>
        </Card>

        {/* Call Summary */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Call Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>ReferPro is positioned around structured referral programs for home service companies</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Product emphasis is on incentives, tracking, and making referrals repeatable (not accidental)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Key theme: contractors often believe referrals are strong, but performance is limited without a formal program and consistent promotion</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Discussion included the importance of team awareness and internal promotion so referrals actually happen</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Sponsor Goals */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Sponsor Goals Discussed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Increase adoption and visibility of ReferPro inside the ServiceTitan contractor ecosystem</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Generate qualified leads and demos from decision-makers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Educate contractors on why referrals underperform without a program and how incentives and process increase volume</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Build trust through content (podcast, posts, calculators, and practical examples)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Content Angles */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Recommended Content Angles
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"Your referral program is not real if your team cannot explain it in 10 seconds"</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"Most contractors think referrals are strong. Here is what a real referral process looks like"</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"Incentives are only half the battle. Tracking and follow-up is the other half"</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"How many referrals are you getting by accident vs on purpose?"</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"CSR scripts and technician prompts that actually drive referrals"</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"Gift card vs cash vs account credit. What gets results?"</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>"The simplest way to make referrals a weekly KPI"</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Audience Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              <Users className="w-6 h-6 text-[#ED254E]" />
              Audience and Reach
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <p className="mb-4">Verified ServiceTitan contractors across the core home service trades.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>9,900 Facebook group members</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>93 percent verified contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>1,915 email subscribers with 45 percent open rate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>22,000 monthly website visitors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>63,000 YouTube views</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>278 podcast downloads</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>HVAC, plumbing, electrical, garage doors, roofing</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Sponsorship Tiers Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Sponsorship Options
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-6">
            {/* Diamond Partner */}
            <div className="border-l-4 border-[#ED254E] pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Diamond Partner</h3>
              <p className="text-2xl font-bold text-[#ED254E] mb-3">$13,900 per month</p>
              <ul className="space-y-1 text-gray-300 mb-4">
                <li>Weekly cross-channel coverage (Facebook, Email, YouTube, Podcast, Website)</li>
                <li>Retargeting ads on Meta and YouTube</li>
                <li>Category exclusivity</li>
                <li>Monthly strategy calls</li>
              </ul>
              <a 
                href="https://buy.stripe.com/7sY00i9aEbFGbcX3POgbm0M"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#ED254E] hover:bg-[#C1121F] text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                data-testid="button-signup-diamond"
              >
                Get Started
              </a>
            </div>

            {/* Elite Partner */}
            <div className="border-l-4 border-[#C1121F] pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Elite Partner</h3>
              <p className="text-2xl font-bold text-[#C1121F] mb-3">$9,600 per month</p>
              <ul className="space-y-1 text-gray-300 mb-4">
                <li>Weekly Facebook and email features</li>
                <li>Category exclusivity</li>
                <li>Monthly strategy calls</li>
                <li>Conservative lead expectations (8-10 qualified leads per month)</li>
              </ul>
              <a 
                href="https://buy.stripe.com/6oU28q1Ic39a94P720gbm0N"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#C1121F] hover:bg-[#a00f1a] text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                data-testid="button-signup-elite"
              >
                Get Started
              </a>
            </div>

            {/* Featured Partner */}
            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Featured Partner</h3>
              <p className="text-2xl font-bold text-gray-300 mb-3">$5,700 per month</p>
              <ul className="space-y-1 text-gray-300 mb-4">
                <li>Two Facebook posts per month</li>
                <li>Monthly email feature</li>
                <li>Quarterly reporting</li>
                <li>Website placement</li>
              </ul>
              <a 
                href="https://buy.stripe.com/5kQ7sK0E8aBCgxh864gbm0O"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-gray-400 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                data-testid="button-signup-featured"
              >
                Get Started
              </a>
            </div>

            {/* Community Partner */}
            <div className="border-l-4 border-gray-600 pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Community Partner</h3>
              <p className="text-2xl font-bold text-gray-400 mb-3">$3,500 per month</p>
              <ul className="space-y-1 text-gray-300 mb-4">
                <li>One Facebook post per month</li>
                <li>Quarterly email feature</li>
                <li>Website placement</li>
              </ul>
              <a 
                href="https://buy.stripe.com/14A00i86A5hi3Kv720gbm0R"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                data-testid="button-signup-community"
              >
                Get Started
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 space-y-2 text-gray-300">
              <p>Six month minimum term.</p>
              <p>Ten percent discount for annual agreements.</p>
              <p>Five percent additional discount for paying the term in full.</p>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Starting Point */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Suggested Starting Point
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <p>Based on our discussion, I recommend starting at the <span className="text-[#C1121F] font-semibold">Elite</span> or <span className="text-gray-300 font-semibold">Featured</span> tier depending on budget.</p>
            <p className="text-gray-400">We can start smaller and scale after proof of engagement. No guaranteed lead numbers, but consistent visibility builds trust and pipeline over time.</p>
          </CardContent>
        </Card>

        {/* Next Steps Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Confirm tier and start date</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Confirm category exclusivity scope (referrals / referral marketing)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Schedule podcast recording</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Define lead capture asset (calculator, playbook, or checklist)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Set up tracking links and a dedicated landing page</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Confirm monthly reporting format and success metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>
                  <a 
                    href="https://go.st-hacks.cc/partnership-review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ED254E] hover:text-[#C1121F] underline"
                    data-testid="link-calendly-next-steps"
                  >
                    Book the next strategy call
                  </a>
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Footer */}
        <div className="text-center mb-8">
          <a 
            href="https://go.st-hacks.cc/partnership-review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#ED254E] hover:bg-[#C1121F] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            data-testid="button-book-call-footer"
          >
            <Calendar className="w-5 h-5" />
            Book the follow-up call
          </a>
        </div>

        {/* Calendly inline widget */}
        <div 
          className="calendly-inline-widget mb-8" 
          data-url="https://go.st-hacks.cc/partnership-review?primary_color=ed164d" 
          style={{ minWidth: '320px', height: '700px' }}
        ></div>
      </div>
    </div>
  );
}
