import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmailCapture from "@/components/EmailCapture";
import { BookOpen, Gift, Key, ExternalLink, ArrowRight, Headphones, ShoppingCart, FileText, Settings, FileSpreadsheet, Handshake } from "lucide-react";
import heroImage from "@assets/Untitled design_1760804581569.png";
import podcastImage from "@assets/podcast_1760814740328.png";
import buyingGroupImage from "@assets/$ (1)_1761314542186.png";
import servicesImage from "@assets/1072722_custom_site_themes_id_wPQ226FHSzWW8kg7Kz2o_31639583-3__1775564469964.jpg";
import blogImage from "@assets/32563772-1_1762708907799.jpg";
import pricebookAfterImg from "@assets/before_(5)_1777407931071.png";
import partnersImage from "@assets/ChatGPT_Image_Jun_8,_2026,_11_38_58_AM_1780933151888.png";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ServiceTitan Hacks",
    "url": "https://servicetitanhacks.com",
    "logo": "https://servicetitanhacks.com/logo.png",
    "description": "AI, automation, dashboards and practical tools for ServiceTitan contractors who want higher revenue, better processes and faster growth.",
    "sameAs": [
      "https://www.facebook.com/groups/servicetitanhacks",
      "https://www.youtube.com/@ServiceTitanHacks"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://servicetitanhacks.com/contact"
    }
  };
  const mainSections = [
    {
      title: "All-Access Pass",
      description: "Get unlimited access to all ServiceTitan automation courses, exclusive AI tools, premium resources, and monthly live Q&A calls.",
      icon: Key,
      link: "/all-access",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FrOZRIUxmQnuM1nxHaiSi_31639845-0.jpg",
      alt: "ServiceTitan Hacks All-Access Pass - unlimited contractor courses and AI tools",
      cta: "Get All-Access Pass",
    },
    {
      title: "Pricebook Overhaul",
      description: "Send us your ServiceTitan pricebook. In 72 hours, every description is rewritten in homeowner-friendly language. Founder pricing $395 for the first 10 customers.",
      icon: FileSpreadsheet,
      link: "/pricebook-overhaul",
      image: pricebookAfterImg,
      alt: "ServiceTitan Pricebook Overhaul - AI-rewritten homeowner-friendly descriptions",
      cta: "Claim a Founder Spot",
    },
    {
      title: "Partners",
      description: "Vetted tools and services built for ServiceTitan contractors. Our partners help you book more jobs, automate your shop, and grow faster.",
      icon: Handshake,
      link: "/partners",
      image: partnersImage,
      alt: "ServiceTitan Hacks partners - vetted tools and services for contractors",
      cta: "Browse Partners",
    },
    {
      title: "Courses",
      description: "Learn to automate, optimize, and scale your home service business with practical, hands-on courses on ServiceTitan automation and HVAC AI.",
      icon: BookOpen,
      link: "/courses",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FnjPnLHZRIeoS1YalKP4j_31639205-3.jpg",
      alt: "ServiceTitan Hacks automation courses for contractors - AI tools training",
      cta: "Browse Courses",
    },
    {
      title: "Free Resources",
      description: "Free templates, calculators, and guides built specifically for ServiceTitan contractors.",
      icon: Gift,
      link: "/resources",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FI8AAxp7ERumPFmkyYVug_31639896-1.jpg",
      alt: "Free ServiceTitan resources - contractor templates and automation guides",
      cta: "Get Free Resources",
    },
    {
      title: "HVAC Equipment Purchasing Platform",
      description: "100% free for Facebook Group members. Get the same pricing the big shops get on HVAC equipment, water heaters, and plumbing tools.",
      icon: ShoppingCart,
      link: "/purchasing-platform",
      image: buyingGroupImage,
      alt: "HVAC Equipment Purchasing Platform for contractors - ServiceTitan Hacks sponsorship",
      cta: "Access Platform",
    },
    {
      title: "Podcast",
      description: "Join host Bill Brown for candid conversations with contractors and software founders revolutionizing the trades with AI and automation.",
      icon: Headphones,
      link: "/podcast",
      image: podcastImage,
      alt: "ServiceTitan Hacks podcast - contractor conversations on AI tools and automation",
      cta: "Listen Now",
    },
    {
      title: "Blog",
      description: "Expert insights on ServiceTitan automation, AI tools for contractors, and practical tips to streamline your HVAC or plumbing business.",
      icon: FileText,
      link: "/blog",
      image: blogImage,
      alt: "ServiceTitan Hacks blog - contractor insights on AI and automation",
      cta: "Read the Blog",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="ServiceTitan Hacks for HVAC and Home Service Growth"
        description="AI, automation, dashboards and practical tools for ServiceTitan contractors who want higher revenue, better processes and faster growth."
        keywords="AI tools for contractors, ServiceTitan automation, HVAC AI, plumbing automation, home service automation"
        canonicalUrl="https://servicetitanhacks.com/"
        ogImage="https://servicetitanhacks.com/og-home.png"
        schemaData={organizationSchema}
      />
      <Header />
      <main className="flex-1">
        <Hero
          title="AI and automations for ServiceTitan contractors"
          subtitle="Grow smarter, automate faster, win more jobs."
          primaryCta={{
            label: "Join the Facebook Group",
            href: "https://go.st-hacks.cc/servicetitanhacks",
            external: true,
          }}
          secondaryCta={{
            label: "All-Access Pass",
            href: "/all-access",
          }}
          backgroundImage={heroImage}
        />

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
              AI Tools & ServiceTitan Automation for Contractors
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {mainSections.map((section, index) => (
                <a 
                  key={index}
                  href={section.link}
                  className="block"
                  data-testid={`link-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Card className="hover-elevate overflow-hidden h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={section.image}
                        alt={section.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <section.icon className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-semibold font-heading">{section.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      <Button className="gap-2 w-full sm:w-auto">
                        {section.cta} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-3xl px-6">
            <EmailCapture />
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Join 10,000+ ServiceTitan Contractors
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with fellow contractors, access exclusive resources, and stay ahead with the latest AI and automation strategies for home service businesses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://go.st-hacks.cc/servicetitanhacks"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-facebook-group-cta"
              >
                <Button size="lg" className="gap-2">
                  Join the Facebook Group <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <a href="/podcast" data-testid="link-podcast-cta">
                <Button size="lg" variant="outline">Listen to the Podcast</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
