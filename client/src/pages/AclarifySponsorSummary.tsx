import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useEffect } from "react";

export default function AclarifySponsorSummary() {
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
        title="Sponsor Summary: Aclarify"
        description="Private sponsorship information for Aclarify"
        noindex={true}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          Sponsor Summary: Aclarify
        </h1>
        <p className="text-gray-400 text-center mb-12">Prepared by ServiceTitan Hacks</p>

        {/* Executive Summary Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            <p>Aclarify is launching WorkBelt, a customizable online scheduling and analytics platform for ServiceTitan users. The team has deep technical and operational experience, including five years of ST API development. They currently have one customer live, with full v1 of the product completed in late 2024.</p>
            
            <p>Aclarify's primary challenge is generating qualified leads and demos. Outbound channels have produced extremely low engagement, the ServiceTitan marketplace has produced no leads, and LinkedIn campaigns have been ineffective for reaching 5M to 50M contractors. They are seeking a reliable, high-intent channel to get in front of verified ServiceTitan users.</p>
            
            <p>The founders resonated strongly with analytics-driven messaging, problem-awareness content, and targeted opt-in campaigns. They acknowledged that contractors do not understand the scheduling-conversion problem, and need education before demo readiness. They also recognized that the ST Hacks audience aligns perfectly with their ICP and buying behavior.</p>
          </CardContent>
        </Card>

        {/* Sponsor Goals Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Sponsor Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Acquire 30 new customers in the next 12 months</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Reach a 250K annual run rate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Generate 3 to 5 demos per week</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Establish a reliable inbound lead engine</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Create messaging that builds problem awareness</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Validate product-market fit with mid-size ST contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Expand awareness within the ServiceTitan ecosystem</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Who You Reach Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Who You Reach
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>9,700 members, 93 percent are contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>7,600 HVAC and plumbing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>1,000 electrical</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Strong base in garage doors, roofing, and specialty trades</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>1,800 plus email subscribers, 45 percent open rate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>63,000 plus YouTube views</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>22,000 monthly website visitors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Audience is owners, operations leaders, and decision makers</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Why This Works Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Why This Works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Built by a contractor, trusted by contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Higher intent than ads or conferences</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Trackable performance and real engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Monthly performance reporting</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Qualified Lead Definition Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              What Counts as a Qualified Lead
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>Decision maker, currently using ServiceTitan, expressed interest through comment, email response, DM introduction, or opt in. Contact information must include name and email or a calendar link.</p>
          </CardContent>
        </Card>

        {/* Examples of Results Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Examples of Results
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Wink Toolbox: 54 opt ins from one automation playbook post</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>SmartAC: Consistent inbound demos in first 3 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Volca.ai: Reported ST Hacks as their number one lead source</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Free 2 Grow: High intent conversations from ST users exploring call center automation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Sponsorship Tiers Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Sponsorship Tiers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-6">
            {/* Elite */}
            <div className="border-l-4 border-[#C1121F] pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Elite</h3>
              <p className="text-2xl font-bold text-[#C1121F] mb-2">$9,600 per month</p>
              <ul className="space-y-1 text-gray-300">
                <li>Weekly exposure across all core channels</li>
                <li>8 to 10 qualified leads typical per month</li>
                <li>Category exclusive</li>
                <li>6 month minimum commitment</li>
              </ul>
            </div>

            {/* Featured */}
            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Featured</h3>
              <p className="text-2xl font-bold text-gray-300 mb-2">$5,700 per month</p>
              <ul className="space-y-1 text-gray-300">
                <li>Two Facebook posts per month</li>
                <li>Cross channel exposure in Email and YouTube</li>
                <li>Quarterly performance report</li>
                <li>6 month minimum commitment</li>
              </ul>
            </div>

            {/* Community */}
            <div className="border-l-4 border-gray-600 pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Community</h3>
              <p className="text-2xl font-bold text-gray-400 mb-2">$3,500 per month</p>
              <ul className="space-y-1 text-gray-300">
                <li>One Facebook post per month</li>
                <li>Quarterly email feature</li>
                <li>Shared sponsor section on website</li>
                <li>6 month minimum commitment</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Discount Options Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Discount Options
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>5 percent discount if paid in full for 6 months</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>10 percent discount if paid in full for 1 year</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Discounts can be stacked</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            <p>Schedule your sponsorship review and strategy call:</p>
            <a 
              href="https://go.st-hacks.cc/partnership-review" 
              className="text-[#ED254E] hover:text-[#C1121F] underline"
              data-testid="link-calendly"
            >
              https://go.st-hacks.cc/partnership-review
            </a>
          </CardContent>
        </Card>

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
