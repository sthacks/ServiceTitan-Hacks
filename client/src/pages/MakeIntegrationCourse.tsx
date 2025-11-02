import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function MakeIntegrationCourse() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Make.com Integration Course",
    "description": "Master ServiceTitan integration with Make.com. Build cost-effective automations and workflows. 10 lessons, 4 chapters.",
    "provider": {
      "@type": "Organization",
      "name": "ServiceTitan Hacks"
    },
    "offers": {
      "@type": "Offer",
      "price": "69",
      "priceCurrency": "USD"
    }
  };
  const features = [
    {
      title: "Connect Make.com & ServiceTitan",
      description: "Step-by-step guidance to seamlessly link your ServiceTitan account with Make.com for powerful automation.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png",
    },
    {
      title: "Build Automated Workflows",
      description: "Create time-saving automations that run on autopilot, reducing manual tasks and increasing efficiency.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png",
    },
    {
      title: "Sync Job Data to Sheets",
      description: "Automatically send job information from ServiceTitan to Google Sheets for reporting and analysis.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png",
    },
    {
      title: "Real-Time Job Alerts",
      description: "Get instant notifications when jobs are booked, keeping your team informed and responsive.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png",
    },
    {
      title: "CRM Integration",
      description: "Automatically add new customers from ServiceTitan to your CRM system for streamlined management.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png",
    },
    {
      title: "Direct API Calls",
      description: "Learn how to make custom API calls to ServiceTitan using Make.com for advanced integrations.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png",
    },
  ];

  const benefits = [
    "Save money vs expensive Zapier alternatives",
    "Lifetime access to course materials",
    "One-time payment of $69",
    "Step-by-step video walkthroughs",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Make.com Integration Course | Connect ServiceTitan with 1000+ Apps"
        description="Master ServiceTitan integration with Make.com. Build cost-effective automations and workflows. 10 lessons, 4 chapters. $69 course."
        keywords="Make.com course, ServiceTitan integration, automation training, workflow automation, API integration"
        canonicalUrl="https://servicetitanhacks.com/make-integration-course"
        schemaData={courseSchema}
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Course</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                  ServiceTitan Integration with Make.com
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Learn to seamlessly connect ServiceTitan to Make.com and save costs on automation vs Zapier
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-4xl font-bold text-primary">$69.00</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>4 Chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>10 Lessons</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://servicetitanhacks.thinkific.com/enroll/3363726"
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
                  src="https://s3.amazonaws.com/thinkific-import/1072722/vm8T0tciShew4mOynTf1_course%20header%20images.png"
                  alt="ServiceTitan to Make.com integration course header"
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
              {features.slice(0, 3).map((feature, index) => (
                <Card key={index} className="bg-black border-0 overflow-hidden">
                  <div className="aspect-[4/3] bg-black flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - Make.com integration screenshot`}
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

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.slice(3, 6).map((feature, index) => (
                <Card key={index + 3} className="bg-black border-0 overflow-hidden">
                  <div className="aspect-[4/3] bg-black flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - Make.com integration screenshot`}
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
              Join our course to unlock the full potential of ServiceTitan integration with Make.com. Whether you're a seasoned pro or just starting out, this course will equip you with the knowledge and skills to automate your processes efficiently. Say goodbye to expensive zaps and hello to cost-effective automation. Enroll now and revolutionize your workflow!
            </p>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/6LRfBZzdRLXnTCK8cD6L_Headshot%20Circle.png"
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
              Enroll today and start saving costs with efficient automation. Connect ServiceTitan to Make.com and revolutionize how your business operates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-4xl font-bold text-primary">$69.00</div>
              <a
                href="https://servicetitanhacks.thinkific.com/enroll/3363726"
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
