import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function ZapierIntegrationCourse() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Free Zapier Course",
    "description": "Free course: Connect ServiceTitan to Zapier and automate workflows. 3 lessons, 1 chapter. Perfect for beginners.",
    "provider": {
      "@type": "Organization",
      "name": "ServiceTitan Hacks"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  const features = [
    {
      title: "Course Overview",
      description: "Get a comprehensive introduction to ServiceTitan-Zapier integration and discover what you'll accomplish in this course.",
      image: "https://import.cdn.thinkific.com/1072722/OdZwdguBTtyLCkKTWeFf_connect%20to%20zapier.png",
    },
    {
      title: "Request ServiceTitan Access",
      description: "Learn the exact steps to request API access from ServiceTitan to enable Zapier integration for your account.",
      image: "https://import.cdn.thinkific.com/1072722/OdZwdguBTtyLCkKTWeFf_connect%20to%20zapier.png",
    },
    {
      title: "Step-by-Step Walkthrough",
      description: "Follow along with detailed video instructions to successfully connect ServiceTitan to Zapier and create your first automation.",
      image: "https://import.cdn.thinkific.com/1072722/OdZwdguBTtyLCkKTWeFf_connect%20to%20zapier.png",
    },
  ];

  const benefits = [
    "100% FREE course",
    "Beginner-friendly instruction",
    "Lifetime access to materials",
    "Quick setup in under an hour",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Zapier Integration Course for ServiceTitan"
        description="Automate tasks and connect ServiceTitan to your favorite apps using Zapier. Designed for HVAC and home service contractors."
        keywords="Zapier course, ServiceTitan Zapier, free automation course, workflow integration, beginner automation"
        canonicalUrl="https://servicetitanhacks.com/zapier-integration-course"
        ogImage="https://servicetitanhacks.com/og-company-app-course.png"
        schemaData={courseSchema}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Free Course</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                  Connect ServiceTitan to Zapier
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Unlock the power of automation and streamline your workflows with this free beginner-friendly course
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-4xl font-bold text-primary">FREE</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>1 Chapter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>3 Lessons</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://servicetitanhacks.thinkific.com/enroll/3361074"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-enroll-hero"
                >
                  <Button size="lg" className="gap-2">
                    Enroll Now <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              <div className="relative">
                <img
                  src="https://import.cdn.thinkific.com/1072722/OdZwdguBTtyLCkKTWeFf_connect%20to%20zapier.png"
                  alt="ServiceTitan to Zapier integration course header"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">What You'll Learn</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black border-0 overflow-hidden">
                  <div className="aspect-[4/3] bg-black flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - Zapier integration screenshot`}
                      className="w-auto h-full max-h-64 object-contain"
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
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">About the Course</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Join us in mastering the art of connecting ServiceTitan to Zapier. Say goodbye to manual tasks and hello to seamless automation. This course provides you with the skills to streamline your processes and supercharge your efficiency. Take the first step towards transforming your workflow today! Enroll now to unlock a world of possibilities.
            </p>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/sQQp1BpERIiD2JOsQZxi_Headshot%20Circle.png"
                  alt="Bill Brown - ServiceTitan Hacks founder and course instructor"
                  className="w-64 h-64 rounded-full object-cover shadow-xl"
                  loading="lazy"
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

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join now to unlock the full potential of ServiceTitan-Zapier integration and revolutionize your workflow. This free course will get you started in no time.
            </p>
            <a
              href="https://servicetitanhacks.thinkific.com/enroll/3361074"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-enroll-footer"
            >
              <Button size="lg" className="gap-2">
                Enroll Now - It's Free! <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
