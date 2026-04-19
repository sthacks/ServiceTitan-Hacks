import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, LayoutList, CheckCircle } from "lucide-react";
import heroImage from "@assets/ServiceTitan Dashboard Course_1763229089687.png";

export default function DashboardCourseLanding() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "DIY ServiceTitan Dashboards",
    "description": "Build an automated TV dashboard with live ServiceTitan data. 15 lessons, 2 chapters. Perfect for HVAC, plumbing, electrical shops.",
    "provider": {
      "@type": "Organization",
      "name": "ServiceTitan Hacks"
    },
    "offers": {
      "@type": "Offer",
      "price": "97",
      "priceCurrency": "USD"
    }
  };

  const features = [
    {
      title: "Send Data to Google Sheets",
      description: "Learn how to connect ServiceTitan to Google Sheets using Zapier for automated data syncing.",
      image: "https://import.cdn.thinkific.com/1072722/fKfCYCRZQfyF09gZPTqr_Zapier%20Config.png",
    },
    {
      title: "Build Clean Dashboards",
      description: "Create professional dashboards for KPIs, sales, estimates, and installs that your team can actually use.",
      image: "https://import.cdn.thinkific.com/1072722/oG04g0LZQsiIf0jePvPc_Dashboard%20Example%20(1).png",
    },
    {
      title: "Display on TV Screen",
      description: "Show your dashboard on any TV in your office — no developers or fancy tools required.",
      image: "https://import.cdn.thinkific.com/1072722/RYzu5KS6Sb2KuHWBfVvp_Dashboard%20Example%20(1).png",
    },
  ];

  const benefits = [
    "Lifetime access to the full DIY course",
    "One-time payment of $97 — no contracts",
    "Templates and tools included",
    "Dashboards update automatically every 15 minutes",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="DIY ServiceTitan Dashboards Course"
        description="Build your own live, TV-ready dashboards for ServiceTitan. Track KPIs, sales, installs and more in real time for your HVAC team."
        keywords="TV dashboard course, ServiceTitan dashboard, automated reporting, data visualization, KPI dashboard"
        canonicalUrl="https://servicetitanhacks.com/dashboard-course-landing"
        ogImage="https://servicetitanhacks.com/og-dashboard-course.png"
        schemaData={courseSchema}
      />
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="py-16 md:py-20 bg-background">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5">
                  DIY ServiceTitan Dashboards
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A DIY course for home service pros who want visibility — without expensive software. Go at your own pace with this step-by-step tutorial.
                </p>
              </div>
              <Card className="bg-foreground text-background border-0">
                <CardContent className="p-6">
                  <p className="text-sm text-background/50 uppercase tracking-widest mb-1">Course</p>
                  <h2 className="text-lg font-bold mb-4">DIY ServiceTitan Dashboards</h2>
                  <p className="text-3xl font-bold mb-5">$97.00</p>
                  <a
                    href="https://servicetitanhacks.thinkific.com/enroll/3344256"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-enroll-hero"
                    className="block"
                  >
                    <Button size="lg" className="w-full bg-primary hover:bg-primary text-white gap-2">
                      Enroll Now <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  <div className="flex items-center justify-center gap-6 mt-5 text-sm text-background/60">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span>2 Chapters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <LayoutList className="h-4 w-4" />
                      <span>15 Lessons</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <img
              src={heroImage}
              alt="ServiceTitan TV dashboard showing Technician Performance metrics in a conference room"
              className="w-full h-auto rounded-lg"
              loading="eager"
              data-testid="img-hero-dashboard"
            />
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black border-0 overflow-hidden">
                  <div className="aspect-[4/3] bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - Dashboard course screenshot`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold font-heading mb-3 text-white">{feature.title}</h3>
                    <p className="text-zinc-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold font-heading mb-6 text-center">What You Get</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About the Course */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">About the Course</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed mb-6">
              This step-by-step course shows you how to create real, visual dashboards that your whole team can see — right on a TV in your office.
            </p>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              You'll learn how to send ServiceTitan data to Google Sheets using Zapier, build clean dashboards for KPIs, sales, estimates, and installs, and display your dashboard on a TV screen — no devs, no fancy tools. Your dashboards will update automatically about every 15 minutes.
            </p>
          </div>
        </section>

        {/* Meet Your Instructor */}
        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/TZI7fi85RWmx6RdKN13O_Headshot%20Circle.png"
                  alt="Bill Brown - ServiceTitan Hacks founder and course instructor"
                  className="w-56 h-56 rounded-full object-cover shadow-xl"
                  loading="lazy"
                  data-testid="img-instructor"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Meet Your Instructor</h2>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  With over 25 years in the trades and a proven track record of building, scaling, and optimizing home service businesses, Bill brings real-world experience and actionable strategies to every lesson. Whether you're looking to streamline operations, boost revenue, or implement cutting-edge tools like AI, Bill's hands-on guidance will help you get there faster—with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
              Take the first step towards mastering ServiceTitan dashboards and revolutionizing your data analysis skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-4xl font-bold text-primary">$97.00</div>
              <a
                href="https://servicetitanhacks.thinkific.com/enroll/3344256"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-enroll-footer"
              >
                <Button size="lg" className="gap-2">
                  Enroll Now <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
