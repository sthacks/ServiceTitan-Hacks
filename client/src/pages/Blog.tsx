import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";

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
    id: "1",
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
    id: "2",
    title: "Should I Switch to ServiceTitan? The Real Cost and Timeline",
    excerpt: "Considering ServiceTitan for your home service business? Learn when it makes sense to switch, what it really costs ($10K-$30K in setup), and why full implementation takes six months.",
    author: "Bill Brown",
    date: "January 18, 2025",
    readTime: "5 min read",
    category: "ServiceTitan Tips",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "should-i-switch-to-servicetitan"
  },
  {
    id: "3",
    title: "5 AI Tools Every ServiceTitan Contractor Should Use in 2025",
    excerpt: "Discover the top AI-powered tools that are transforming how home service contractors work, from automated scheduling to smart pricing optimization.",
    author: "Bill Brown",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    slug: "5-ai-tools-servicetitan-contractors-2025"
  },
  {
    id: "4",
    title: "How to Double Your Booking Rate with Better Forms",
    excerpt: "Learn the exact strategies top contractors use to convert more website visitors into booked jobs with optimized online forms.",
    author: "Bill Brown",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "Growth Strategy",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    slug: "double-booking-rate-better-forms"
  },
  {
    id: "5",
    title: "ServiceTitan Dashboard Hacks: 10 Metrics You Should Track Daily",
    excerpt: "Stop drowning in data. Here are the 10 essential metrics that actually move the needle in your HVAC, plumbing, or electrical business.",
    author: "Bill Brown",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "ServiceTitan Tips",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    slug: "servicetitan-dashboard-metrics"
  },
  {
    id: "6",
    title: "The Ultimate Guide to Automating Follow-Up Calls",
    excerpt: "Automate your follow-up process without losing the personal touch. Save hours every week while improving customer satisfaction.",
    author: "Bill Brown",
    date: "December 28, 2024",
    readTime: "8 min read",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=400&fit=crop",
    slug: "automate-follow-up-calls"
  },
  {
    id: "7",
    title: "Why Your Pricebook Descriptions Are Costing You Money",
    excerpt: "Technical jargon kills conversions. Learn how to write pricebook descriptions that homeowners actually understand and buy from.",
    author: "Bill Brown",
    date: "December 20, 2024",
    readTime: "5 min read",
    category: "Sales Strategy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    slug: "pricebook-descriptions-costing-money"
  },
  {
    id: "8",
    title: "Equipment Buying 101: How to Get the Pricing Big Companies Get",
    excerpt: "Small contractors can access the same pricing as large national chains. Here's exactly how to do it without complicated processes.",
    author: "Bill Brown",
    date: "December 15, 2024",
    readTime: "6 min read",
    category: "Business Operations",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop",
    slug: "equipment-buying-guide"
  }
];

export default function Blog() {
  useEffect(() => {
    document.title = "Blog | ServiceTitan Hacks – AI, Automation & Growth Tips for Contractors";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Expert insights on AI, automation, and growth strategies for ServiceTitan contractors. Learn how to work smarter, automate faster, and win more jobs.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Expert insights on AI, automation, and growth strategies for ServiceTitan contractors. Learn how to work smarter, automate faster, and win more jobs.";
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "ServiceTitan Hacks";
    };
  }, []);

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen flex flex-col bg-background">
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

        {/* Category Filter */}
        <section className="py-8 border-b bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="default" size="sm" data-testid="filter-all">
                All Posts
              </Button>
              {categories.map(category => (
                <Button key={category} variant="outline" size="sm" data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {category}
                </Button>
              ))}
            </div>
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
                    <Button variant="outline" className="w-full gap-2" data-testid={`button-read-${post.id}`}>
                      Read Article <ArrowRight className="h-4 w-4" />
                    </Button>
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
