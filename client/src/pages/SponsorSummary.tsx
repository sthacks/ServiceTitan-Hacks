import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SponsorSummary() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <SEO 
        title="ServiceTitan Hacks Sponsorship Summary"
        description="Private sponsorship information for ServiceTitan Hacks partners"
        noindex={true}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Oxygen, sans-serif' }}>
          ServiceTitan Hacks Sponsorship Summary
        </h1>

        {/* Audience Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <p className="mb-4">Verified ServiceTitan contractors across the core home service trades.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>9,700 Facebook group members</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>93 percent verified contractors</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>1,800 email subscribers with 45 percent open rate</span>
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

        {/* What Sponsors Receive Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              What Sponsors Receive
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <p className="mb-4">Consistent multi channel visibility across:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Facebook posts written for high engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Newsletter features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>YouTube content</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Podcast segments</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Website placement with tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Monthly or quarterly reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Strategy calls</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Category exclusivity for Elite and Diamond tiers</span>
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
            {/* Diamond Partner */}
            <div className="border-l-4 border-[#ED254E] pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Diamond Partner</h3>
              <p className="text-2xl font-bold text-[#ED254E] mb-2">$13,900 per month</p>
              <p>Weekly cross channel coverage, retargeting ads on Meta and YouTube, category exclusivity</p>
            </div>

            {/* Elite Partner */}
            <div className="border-l-4 border-[#C1121F] pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Elite Partner</h3>
              <p className="text-2xl font-bold text-[#C1121F] mb-2">$9,600 per month</p>
              <p>Weekly Facebook and email features, category exclusivity, 8 to 10 qualified leads per month</p>
            </div>

            {/* Featured Partner */}
            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Featured Partner</h3>
              <p className="text-2xl font-bold text-gray-300 mb-2">$5,700 per month</p>
              <p>Two Facebook posts per month, monthly email, quarterly reporting</p>
            </div>

            {/* Community Partner */}
            <div className="border-l-4 border-gray-600 pl-4">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oxygen, sans-serif' }}>Community Partner</h3>
              <p className="text-2xl font-bold text-gray-400 mb-2">$3,500 per month</p>
              <p>One Facebook post per month, quarterly email, website placement</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700 space-y-2 text-gray-300">
              <p>Six month minimum term.</p>
              <p>Ten percent discount for annual agreements.</p>
              <p>Five percent additional discount for paying the term in full.</p>
            </div>
          </CardContent>
        </Card>

        {/* Measurement and Reporting Section */}
        <Card className="mb-8 bg-[#1a1b20] border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Measurement and Reporting
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <p className="mb-4">All sponsorship placements use tracked links. Monthly or quarterly reporting includes:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Post engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Email clicks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>YouTube and podcast visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Website traffic</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Lead intent signals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Attribution notes</span>
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
          <CardContent className="text-white space-y-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Confirm tier</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Complete sponsor agreement</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Schedule kickoff call</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#ED254E] flex-shrink-0 mt-0.5" />
                <span>Launch within 14 days</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
