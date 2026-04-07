import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmailCapture from "@/components/EmailCapture";
import { BookOpen, Wrench, Users, Gift, Key, ExternalLink, ArrowRight, Headphones, ShoppingCart, FileText, Settings } from "lucide-react";
import heroImage from "@assets/Untitled design_1760804581569.png";
import smartACLogo from "@assets/logos.zip - smartac_1762019262110.png";
import podcastImage from "@assets/podcast_1760814740328.png";
import buyingGroupImage from "@assets/$ (1)_1761314542186.png";
import servicesImage from "@assets/ChatGPT_Image_Apr_7,_2026,_08_08_54_AM_1775564122878.png";
import blogImage from "@assets/32563772-1_1762708907799.jpg";
import liveswitchLogo from "@assets/logos.zip - liveswitch_1762019262110.png";
import polycamLogo from "@assets/logos.zip - polycam_1762019262110.png";
import contractorCommerceLogo from "@assets/logos.zip - contractor commerce_1762019262110.png";
import winkLogo from "@assets/logos.zip - 6_1762019262110.png";
import serviceCrucibleLogo from "@assets/logos.zip - 5_1762019262110.png";

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
      title: "Services",
      description: "Done-for-you ServiceTitan automation implementation. We build the forms, workflows, and reporting systems your shop needs to run more efficiently.",
      icon: Settings,
      link: "/servicetitan-automation-services",
      image: servicesImage,
      alt: "ServiceTitan automation services - done-for-you workflow and forms implementation",
    },
    {
      title: "Courses",
      description: "Learn to automate, optimize, and scale your home service business with practical, hands-on courses on ServiceTitan automation and HVAC AI.",
      icon: BookOpen,
      link: "/courses",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FnjPnLHZRIeoS1YalKP4j_31639205-3.jpg",
      alt: "ServiceTitan Hacks automation courses for contractors - AI tools training",
    },
    {
      title: "Apps & Products",
      description: "Discover AI tools for contractors and automation solutions designed specifically for ServiceTitan users in HVAC and plumbing businesses.",
      icon: Wrench,
      link: "/apps",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FwPQ226FHSzWW8kg7Kz2o_31639583-3.jpg",
      alt: "AI tools for contractors - ServiceTitan automation products and software",
    },
    {
      title: "HVAC Equipment Purchasing Platform",
      description: "100% free for Facebook Group members. Get access to pricing that the big guys get on HVAC equipment, water heaters, and tools with plumbing automation.",
      icon: ShoppingCart,
      link: "/purchasing-platform",
      image: buyingGroupImage,
      alt: "HVAC Equipment Purchasing Platform for contractors - ServiceTitan Hacks partnership",
    },
    {
      title: "Partners",
      description: "Trusted technology partners helping contractors automate, optimize, and grow their businesses with AI tools and HVAC automation.",
      icon: Users,
      link: "/partners",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2F2byukiuSKa7LxxzyPZna_Partners.png",
      alt: "ServiceTitan Hacks technology partners - HVAC AI and plumbing automation solutions",
    },
    {
      title: "Free Resources",
      description: "Access free templates, calculators, and guides to help you get more out of ServiceTitan with automation tools for contractors.",
      icon: Gift,
      link: "/resources",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FI8AAxp7ERumPFmkyYVug_31639896-1.jpg",
      alt: "Free ServiceTitan resources - contractor templates and automation guides",
    },
    {
      title: "Podcast",
      description: "Join host Bill Brown for candid conversations with contractors and software founders revolutionizing the trades with AI and automation.",
      icon: Headphones,
      link: "/podcast",
      image: podcastImage,
      alt: "ServiceTitan Hacks podcast - contractor conversations on AI tools and automation",
    },
    {
      title: "Blog",
      description: "Expert insights on ServiceTitan automation, AI tools for contractors, and practical tips to streamline your HVAC or plumbing business.",
      icon: FileText,
      link: "/blog",
      image: blogImage,
      alt: "ServiceTitan Hacks blog - contractor insights on AI and automation",
    },
    {
      title: "All-Access Pass",
      description: "Get unlimited access to all ServiceTitan automation courses, exclusive AI tools, premium resources, and monthly live Q&A calls.",
      icon: Key,
      link: "https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FrOZRIUxmQnuM1nxHaiSi_31639845-0.jpg",
      alt: "ServiceTitan Hacks All-Access Pass - unlimited contractor courses and AI tools",
    },
  ];

  const partners = [
    { name: "Wink Toolbox", logo: winkLogo, slug: "wink-toolbox" },
    { name: "SmartAC", logo: smartACLogo, slug: "smartac" },
    { name: "Contractor Commerce", logo: contractorCommerceLogo, slug: "contractor-commerce" },
    { name: "LiveSwitch", logo: liveswitchLogo, slug: "liveswitch" },
    { name: "Polycam", logo: polycamLogo, slug: "polycam" },
    { name: "Service Crucible", logo: serviceCrucibleLogo, slug: "service-crucible" },
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
            href: "https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass",
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
                        Explore {section.title} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold font-heading text-center mb-8">Trusted Partners in HVAC AI & Plumbing Automation</h2>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <Link
                  key={index}
                  href={`/partners/${partner.slug}`}
                >
                  <span
                    className="transition-all opacity-90 hover:opacity-100 cursor-pointer block"
                    data-testid={`link-partner-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} - ServiceTitan contractor automation partner logo`}
                      className={`w-auto object-contain ${partner.name === 'SmartAC' || partner.name === 'Contractor Commerce' ? 'h-20 md:h-24' : 'h-16 md:h-20'}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </Link>
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
