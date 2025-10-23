import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Video, Clock } from "lucide-react";

export default function DashboardCourse() {
  const enrollmentUrl = "https://www.servicetitanhacks.com/enroll/3344256";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4" variant="secondary">
                  <BookOpen className="h-3 w-3 mr-1" />
                  DIY Course
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                  DIY ServiceTitan Dashboards
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  A DIY course for home service pros who want visibility — without expensive software. 
                  Go at your own pace with this step-by-step tutorial.
                </p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-5 w-5" />
                    <span>2 Chapters</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="h-5 w-5" />
                    <span>15 Lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>Self-paced</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="text-4xl font-bold text-primary">$97</div>
                  <div className="text-muted-foreground">One-time payment</div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="/dashboard-course/content" data-testid="link-start-course">
                    <Button size="lg" className="text-lg px-8">
                      Start Course Free
                    </Button>
                  </a>
                  <a 
                    href={enrollmentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="button-enroll-hero"
                  >
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      Enroll on Thinkific
                    </Button>
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://s3.amazonaws.com/thinkific-import/1072722/RYzu5KS6Sb2KuHWBfVvp_Dashboard%20Example%20(1).png"
                    alt="ServiceTitan Dashboard Example"
                    className="w-full h-full object-cover"
                    data-testid="img-dashboard-preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Course */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading mb-4">About the Course</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                This step-by-step course shows you how to create real, visual dashboards that your whole team can see — right on a TV in your office.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* What You'll Learn */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold font-heading mb-6">
                    ✅ What You'll Learn
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>How to send ServiceTitan data to Google Sheets using Zapier</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>How to build clean dashboards for KPIs, sales, estimates, and installs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>How to display your dashboard on a TV screen — no devs, no fancy tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Dashboards update about every 15 minutes automatically</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* What You Get */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold font-heading mb-6">
                    💥 What You Get
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Lifetime access to the full DIY course</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>One-time payment of $97 — no contracts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Templates and tools included</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-6">
            <Card>
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://s3.amazonaws.com/thinkific-import/1072722/TZI7fi85RWmx6RdKN13O_Headshot%20Circle.png"
                      alt="Bill Brown - Instructor"
                      className="w-32 h-32 rounded-full object-cover"
                      data-testid="img-instructor"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-semibold font-heading mb-2">
                      Meet your Instructor: Bill Brown
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      With over 25 years in the trades and a proven track record of building, scaling, 
                      and optimizing home service businesses, Bill brings real-world experience and actionable 
                      strategies to every lesson. Whether you're looking to streamline operations, boost revenue, 
                      or implement cutting-edge tools like AI, Bill's hands-on guidance will help you get there 
                      faster—with confidence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary/10">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">
              🎯 Ready to Transform Your Data?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step towards mastering ServiceTitan dashboards and revolutionizing your data analysis skills
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="/dashboard-course/content" data-testid="link-start-course-footer">
                  <Button size="lg" className="text-lg px-8">
                    Start Course Free
                  </Button>
                </a>
                <a 
                  href={enrollmentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid="button-enroll-footer"
                >
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Enroll on Thinkific ($97)
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
