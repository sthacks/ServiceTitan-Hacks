import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import serviceTitanDashboardImage from "@assets/32492017-1_1762523143157.jpg";
import titanDashboardsImage from "@assets/Untitled_design_(2)_1765462149620.png";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "6",
    title: "Stop Treating Your Dashboard Like a Spreadsheet (My Philosophy on Metrics)",
    excerpt: "Business analytics dashboards have gone off the rails. They look like 24-hour news channels with tickers and pop-ups everywhere. If you have to study it, it's not a dashboard—it's a report. Here's my philosophy on how dashboards should actually work.",
    author: "Bill Brown",
    date: "December 11, 2025",
    readTime: "6 min read",
    category: "Operational Strategy",
    image: titanDashboardsImage,
    slug: "stop-treating-dashboard-like-spreadsheet"
  },
  {
    id: "5",
    title: "Selling HVAC Systems to Millennials: Why Online Pricing Is No Longer Optional",
    excerpt: "Millennials are now the largest adult generation in the U.S. Learn why transparent online pricing isn't just nice to have—it's becoming mandatory if you want to capture the next decade of HVAC replacement business.",
    author: "Bill Brown",
    date: "November 14, 2025",
    readTime: "11 min read",
    category: "Marketing",
    image: "/blog-millennials-pricing.png",
    slug: "selling-hvac-systems-to-millennials-online-pricing"
  },
  {
    id: "4",
    title: "How to Sell SaaS to Residential HVAC, Plumbing, Electrical, and Other Home-Service Contractors",
    excerpt: "Selling software to home-service companies is fundamentally different from typical B2B sales. Learn the hard-won lessons from a decade of operating an Inc. 5000 HVAC company and implementing dozens of software solutions.",
    author: "Bill Brown",
    date: "November 14, 2025",
    readTime: "12 min read",
    category: "Business Operations",
    image: "/blog-saas-contractors.png",
    slug: "how-to-sell-saas-to-home-service-contractors"
  },
  {
    id: "1",
    title: "Stop Selling Other People's Equipment—Build Your Brand Instead",
    excerpt: "Most HVAC contractors sell equipment under big-name logos that don't care about them. Learn why all systems are basically the same and how to take back control of your brand, profits, and reputation.",
    author: "Bill Brown",
    date: "January 22, 2025",
    readTime: "8 min read",
    category: "Business Operations",
    image: "/blog-build-your-brand.jpg",
    slug: "stop-selling-other-peoples-equipment-build-your-brand"
  },
  {
    id: "2",
    title: "Stop Putting Out Fires: How DMAIC Permanently Fixes Broken Processes",
    excerpt: "Most business coaches sell you their systems. But what happens when it doesn't fit your team? Learn the proven framework that helped GE and Motorola—and how to use it in your home service business.",
    author: "Bill Brown",
    date: "January 20, 2025",
    readTime: "4 min read",
    category: "Process Improvement",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    slug: "dmaic-process-improvement-framework"
  },
  {
    id: "3",
    title: "Should I Switch to ServiceTitan? The Real Cost and Timeline",
    excerpt: "Considering ServiceTitan for your home service business? Learn when it makes sense to switch, what it really costs ($10K-$30K in setup), and why full implementation takes six months.",
    author: "Bill Brown",
    date: "May 7, 2025",
    readTime: "5 min read",
    category: "ServiceTitan Tips",
    image: serviceTitanDashboardImage,
    slug: "should-i-switch-to-servicetitan"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="ServiceTitan Hacks Blog"
        description="Articles on AI, automation, ServiceTitan workflows, processes, pricebook strategy and contractor growth."
        keywords="ServiceTitan blog, HVAC marketing, automation strategies, contractor tips"
        canonicalUrl="https://servicetitanhacks.com/blog"
        ogImage="https://servicetitanhacks.com/og-blog.png"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-[#1F1F1F] text-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              ServiceTitan Hacks Blog
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              AI, automation, and growth strategies for home service contractors who want to work smarter, not harder.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover-elevate overflow-hidden h-full flex flex-col" data-testid={`card-blog-${post.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold font-heading line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="w-full gap-2" data-testid={`button-read-${post.id}`}>
                        Read Article <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Never Miss a Post
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest AI tools, automation tips, and growth strategies delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="input-newsletter-email"
              />
              <Button size="lg" className="w-full sm:w-auto whitespace-nowrap" data-testid="button-newsletter-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
