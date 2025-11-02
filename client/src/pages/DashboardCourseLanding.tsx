import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Sparkles, CheckCircle } from "lucide-react";

export default function DashboardCourseLanding() {
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
      <Header />
      <main className="flex-1">
        <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                  DIY ServiceTitan Dashboards
                </h1>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  A DIY course for home service pros who want visibility — without expensive software. Go at your own pace with this step-by-step tutorial.
                </p>
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">2 Chapters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">15 Lessons</span>
                  </div>
                  <div className="text-3xl font-bold text-primary">$97</div>
                </div>
                <a
                  href="https://servicetitanhacks.thinkific.com/enroll/3344256"
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
                  src="https://s3.amazonaws.com/thinkific-import/1072722/RYzu5KS6Sb2KuHWBfVvp_Dashboard%20Example%20(1).png"
                  alt="ServiceTitan dashboard example showing KPIs and metrics on TV screen"
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
                      alt={`${feature.title} - Dashboard course screenshot`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6">
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

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/TZI7fi85RWmx6RdKN13O_Headshot%20Circle.png"
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
