import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Target, Megaphone } from "lucide-react";

export default function Sponsors() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Become a Sponsor | ServiceTitan Hacks"
        description="Partner with ServiceTitan Hacks to reach 9,500+ verified ServiceTitan users. Access engaged contractors and decision-makers through our trusted platform."
        keywords="ServiceTitan sponsorship, contractor marketing, HVAC advertising, plumbing marketing, home service sponsorship"
        canonicalUrl="https://servicetitanhacks.com/sponsors"
      />
      <Header />
      <main className="flex-1">
        <Hero
          title="Become a ServiceTitan Hacks Sponsor"
          subtitle="Contractors trust people, not ads. Get direct access to verified business owners and decision-makers who already trust our platform."
          dark={true}
        />

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">9,500+</div>
                  <div className="text-sm text-muted-foreground">Verified ServiceTitan Users</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Megaphone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Active Marketing Channels</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">High</div>
                  <div className="text-sm text-muted-foreground">Engagement Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">Verified</div>
                  <div className="text-sm text-muted-foreground">Measurable ROI</div>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold font-heading mb-6 text-center">Why Sponsor ServiceTitan Hacks?</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Direct Access to Decision-Makers</h3>
                    <p className="text-muted-foreground">
                      Our community consists of verified ServiceTitan users who are actively looking for tools and solutions to grow their businesses. These aren't casual observers—they're business owners and managers with purchasing power.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Multi-Channel Exposure</h3>
                    <p className="text-muted-foreground">
                      Reach your target audience through our Facebook Group (9,500+ members), YouTube channel, podcast, email list, and this website. Your message appears where contractors are already engaged and learning.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Trusted Endorsement</h3>
                    <p className="text-muted-foreground">
                      Contractors trust recommendations from ServiceTitan Hacks. When we feature your product or service, it carries the weight of our established credibility in the home service automation space.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
                    <p className="text-muted-foreground">
                      Track your sponsorship performance with detailed analytics. See exactly how many contractors view, engage with, and click through to your offerings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center">Sponsorship Tiers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">💎</div>
                    <h3 className="text-xl font-bold mb-2">Diamond Partner</h3>
                    <p className="text-muted-foreground text-sm mb-4">Full omnichannel exposure across all platforms</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Featured on website homepage</li>
                      <li>• Weekly Facebook posts</li>
                      <li>• Monthly podcast mentions</li>
                      <li>• YouTube video integrations</li>
                      <li>• Email newsletter features</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">🥇</div>
                    <h3 className="text-xl font-bold mb-2">Elite Partner</h3>
                    <p className="text-muted-foreground text-sm mb-4">Weekly multi-channel visibility</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Partners page feature</li>
                      <li>• Bi-weekly Facebook posts</li>
                      <li>• Quarterly podcast mentions</li>
                      <li>• YouTube descriptions</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">🥈</div>
                    <h3 className="text-xl font-bold mb-2">Featured Partner</h3>
                    <p className="text-muted-foreground text-sm mb-4">Regular cross-channel features</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Partners page listing</li>
                      <li>• Monthly Facebook features</li>
                      <li>• Email newsletter mentions</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">🥉</div>
                    <h3 className="text-xl font-bold mb-2">Community Partner</h3>
                    <p className="text-muted-foreground text-sm mb-4">Entry-level presence</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Partners page listing</li>
                      <li>• Footer logo placement</li>
                      <li>• Periodic Facebook mentions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold font-heading mb-4">Ready to Get Started?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Schedule a call to discuss which sponsorship tier is right for your business and how we can help you reach more contractors.
                    </p>
                    <a
                      href="https://go.st-hacks.cc/partnership-discovery"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-schedule-call"
                    >
                      <Button size="lg">Schedule a Call</Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
