import { useEffect } from "react";
import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

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
    title: "Stop Selling Other People's Equipment—Build Your Brand Instead",
    excerpt: "Most HVAC contractors sell equipment under big-name logos that don't care about them. Learn why all systems are basically the same and how to take back control of your brand, profits, and reputation.",
    author: "Bill Brown",
    date: "January 22, 2025",
    readTime: "8 min read",
    category: "Business Operations",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=400&fit=crop",
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
    date: "January 18, 2025",
    readTime: "5 min read",
    category: "ServiceTitan Tips",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    slug: "should-i-switch-to-servicetitan"
  },
  {
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ServiceTitan Hacks Blog`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }
    }

    return () => {
      document.title = "ServiceTitan Hacks";
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20 px-6">
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Oxygen, sans-serif' }}>
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Image */}
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden bg-[#1F1F1F]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Back to Blog Link */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2" data-testid="button-back-to-blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading" style={{ fontFamily: 'Oxygen, sans-serif' }}>
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-muted-foreground mb-12 pb-8 border-b">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Excerpt/Preview */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-muted/50 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold mb-4 font-heading">
              Full Article Coming Soon
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're working on bringing you the complete article with in-depth insights, actionable strategies, and real-world examples. Check back soon!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  Browse More Articles
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg">
                  Get Notified
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
