import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmailCapture from "@/components/EmailCapture";
import { BookOpen, Wrench, Users, Gift, Key, ExternalLink, ArrowRight, Headphones, ShoppingCart } from "lucide-react";
import heroImage from "@assets/Untitled design_1760804581569.png";
import smartACLogo from "@assets/smartac_1762011451319.png";
import podcastImage from "@assets/podcast_1760814740328.png";
import buyingGroupImage from "@assets/$ (1)_1761314542186.png";
import liveswitchLogo from "@assets/liveswitch logo_1762010571776.webp";
import polycamLogo from "@assets/polycam_1762011653489.png";
import contractorCommerceLogo from "@assets/contractor commerce_1762011468358.png";

export default function Home() {
  const mainSections = [
    {
      title: "Courses",
      description: "Learn to automate, optimize, and scale your home service business with practical, hands-on courses.",
      icon: BookOpen,
      link: "/courses",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FnjPnLHZRIeoS1YalKP4j_31639205-3.jpg",
    },
    {
      title: "Equipment Buying Group",
      description: "100% free for Facebook Group members. Get access to pricing that the big guys get on HVAC equipment, water heaters, and tools.",
      icon: ShoppingCart,
      link: "/purchasing-platform",
      image: buyingGroupImage,
    },
    {
      title: "Tools & Products",
      description: "Discover AI-powered tools and automation solutions designed specifically for ServiceTitan contractors.",
      icon: Wrench,
      link: "/tools",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FwPQ226FHSzWW8kg7Kz2o_31639583-3.jpg",
    },
    {
      title: "Partners",
      description: "Trusted technology partners helping contractors automate, optimize, and grow their businesses.",
      icon: Users,
      link: "/partners",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2F2byukiuSKa7LxxzyPZna_Partners.png",
    },
    {
      title: "Free Resources",
      description: "Access free templates, calculators, and guides to help you get more out of ServiceTitan.",
      icon: Gift,
      link: "/resources",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FI8AAxp7ERumPFmkyYVug_31639896-1.jpg",
    },
    {
      title: "Podcast",
      description: "Join host Bill Brown for candid conversations with contractors and software founders revolutionizing the trades.",
      icon: Headphones,
      link: "/podcast",
      image: podcastImage,
    },
    {
      title: "All-Access Pass",
      description: "Get unlimited access to all courses, exclusive tools, premium resources, and monthly live Q&A calls.",
      icon: Key,
      link: "https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass",
      image: "https://import.cdn.thinkific.com/1072722%2Fcustom_site_themes%2Fid%2FrOZRIUxmQnuM1nxHaiSi_31639845-0.jpg",
    },
  ];

  const partners = [
    { name: "Volca.AI", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/ba8/d11/01b/volca.png", url: "https://go.st-hacks.cc/volca" },
    { name: "Free-2-Grow", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/e42/a11/fb9/Free_2_Grow.png", url: "https://go.st-hacks.cc/free-2-grow" },
    { name: "Wink Toolbox", logo: "https://files.cdn.thinkific.com/file_uploads/1072722/images/ebb/c0e/9fe/wink_logo.png", url: "https://go.st-hacks.cc/wink" },
    { name: "SmartAC", logo: smartACLogo, url: "https://go.st-hacks.cc/smart-ac" },
    { name: "Contractor Commerce", logo: contractorCommerceLogo, url: "https://go.st-hacks.cc/contractor-commerce" },
    { name: "LiveSwitch", logo: liveswitchLogo, url: "https://go.st-hacks.cc/liveswitch" },
    { name: "Polycam", logo: polycamLogo, url: "https://go.st-hacks.cc/polycam" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
                        alt={section.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <section.icon className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-semibold font-heading">{section.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      <Button className="gap-2 w-full sm:w-auto">
                        View {section.title} <ArrowRight className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold font-heading text-center mb-8">Trusted Partners</h2>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all opacity-90 hover:opacity-100"
                  data-testid={`link-partner-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`w-auto object-contain ${partner.name === 'SmartAC' || partner.name === 'Contractor Commerce' ? 'h-20 md:h-24' : 'h-16 md:h-20'}`}
                    loading="lazy"
                  />
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
              Join 9,500+ ServiceTitan Contractors
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
