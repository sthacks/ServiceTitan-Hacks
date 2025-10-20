import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MonitorPlay, Zap, BarChart3, Mail, FileSpreadsheet, Lock, ShoppingCart } from "lucide-react";
import titleBg from "@assets/title-background.png";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function DashboardCourse() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check if user just completed purchase
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('purchased') === 'true') {
      toast({
        title: "Purchase Successful!",
        description: "Welcome to the Dashboard Course. Let's get started!",
      });
      // Clear the query parameter
      window.history.replaceState({}, '', '/dashboard-course');
    }
  }, [toast]);

  // Check course access if authenticated
  const { data: accessData, isLoading: accessLoading } = useQuery<{ hasAccess: boolean }>({
    queryKey: ['/api/course-access/dashboard-course'],
    enabled: isAuthenticated,
  });

  const hasAccess = accessData?.hasAccess || false;
  const isLoading = authLoading || accessLoading;
  const prerequisites = [
    "A ServiceTitan account with access to Reports",
    "A Gmail account (preferably connected to Zapier)",
    "A Zapier account",
    "Google Drive (Google Sheets access)",
    "Looker Studio (formerly Google Data Studio)",
    "Basic familiarity with the tools above (don't worry — I'll walk you through everything!)",
  ];

  const courseSteps = [
    { icon: FileSpreadsheet, title: "Create and Schedule the ServiceTitan Report" },
    { icon: Mail, title: "Create a Gmail Filter & Label" },
    { icon: Zap, title: "Build a Zap in Zapier to Detect New Reports" },
    { icon: FileSpreadsheet, title: "Feed the Report into Google Sheets Automatically" },
    { icon: MonitorPlay, title: "Build Your TV Dashboard in Looker Studio" },
    { icon: BarChart3, title: "Style and Customize Key Metrics" },
  ];

  const outcomes = [
    "A fully automated dashboard on your office TV",
    "Instant visibility into job data, revenue, leads, and more",
    "A repeatable system you can use for other reports",
    "Less time digging for data, more time acting on it",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${titleBg})` }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4" data-testid="badge-course">DIY Course</Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                👋 Welcome to the TV Dashboard Automation Course
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Build an automated TV dashboard that updates multiple times per day using live job data from ServiceTitan — with zero manual effort once it's set up.
              </p>
            </div>
          </div>
        </section>

        {/* Prerequisites Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <Card>
              <CardHeader>
                <h2 className="text-3xl font-bold font-heading">🔧 What You'll Need Before You Start</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prerequisites.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3" data-testid={`prerequisite-${idx}`}>
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What You'll Build Section */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading mb-4">📦 What You'll Build</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                You're going to build an automated TV dashboard that updates multiple times per day using live job data from ServiceTitan — with <strong>zero manual effort</strong> once it's set up.
              </p>
            </div>
          </div>
        </section>

        {/* Course Overview Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">🚀 Course Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={idx} data-testid={`course-step-${idx}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-muted-foreground mb-1">Step {idx + 1}</div>
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* What You'll Walk Away With */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">✅ What You'll Walk Away With</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3" data-testid={`outcome-${idx}`}>
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before You Begin */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <Card className="border-primary/20">
              <CardHeader>
                <h2 className="text-2xl font-bold font-heading">📊 Before You Begin: A Quick Note About Dashboarding with ServiceTitan</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  There are many ways to connect to ServiceTitan data and build dashboards — some involve APIs, middleware, or advanced reporting tools.
                </p>
                <p>
                  What you're about to learn is the <strong>lowest-code, most DIY-friendly method available</strong>.
                </p>
                <p>
                  It uses tools you likely already have — Gmail, Google Sheets, Zapier, and Looker Studio.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-semibold">
                    💡 Don't get discouraged if it feels like a lot at first. Once you get this initial setup dialed in, adding new reports and dashboards becomes fast and easy.
                  </p>
                </div>
                <p className="text-lg font-semibold">You've got this — and I'll walk you through every step.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Access Gate - Show if not purchased */}
        {!isLoading && !hasAccess && (
          <section className="py-16 bg-primary/5">
            <div className="mx-auto max-w-3xl px-6">
              <Card className="border-primary">
                <CardContent className="py-12 text-center space-y-6">
                  <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold font-heading">Ready to Get Started?</h3>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Get instant access to the complete step-by-step course with video walkthroughs, templates, and lifetime updates.
                  </p>
                  <div className="pt-4">
                    <div className="text-4xl font-bold text-primary mb-2">$97</div>
                    <div className="text-sm text-muted-foreground mb-6">One-time payment • Lifetime access</div>
                    {!isAuthenticated ? (
                      <div className="space-y-3">
                        <Button 
                          size="lg" 
                          onClick={() => window.location.href = '/api/login'}
                          className="gap-2"
                          data-testid="button-login-purchase"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          Log In to Purchase
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          New here? Click above to create an account and purchase
                        </p>
                      </div>
                    ) : (
                      <Button 
                        size="lg" 
                        onClick={() => setLocation('/dashboard-course/checkout')}
                        className="gap-2"
                        data-testid="button-purchase-course"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Purchase Course - $97
                      </Button>
                    )}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      ✓ Instant access • ✓ Lifetime updates • ✓ Email support
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Course Content - Only show if purchased */}
        {(isLoading || hasAccess) && (
          <div>
            {/* Step 1: Create & Schedule Report */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-4 text-center">🗓️ Create & Schedule your ServiceTitan Report</h2>
            <p className="text-center text-muted-foreground mb-8">
              <strong>This walkthrough guide allows you to see each individual click💥</strong>
            </p>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://app.tango.us/app/embed/5de81e74-ffd1-4685-a4c5-39339d609df2" 
                className="w-full h-[640px] border-0"
                sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
                title="1) Create and Schedule the ServiceTitan Report"
                data-testid="iframe-create-report"
              />
            </div>
          </div>
        </section>

        {/* Step 2: Import to Google Sheets */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">🗳️ Import the ServiceTitan Report to Google Sheets</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://app.tango.us/app/embed/ee01e776-ca12-4b98-ab34-401b82b78246" 
                className="w-full h-[640px] border-0"
                sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
                title="2) Import the ServiceTitan Report to Google Sheets"
                data-testid="iframe-import-sheets"
              />
            </div>
          </div>
        </section>

        {/* Step 3: Gmail Filter */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">📧 Creating a Filter/Label in Gmail</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://app.tango.us/app/embed/b57aa3bf-df61-4ea7-bd4b-747dc417ac83" 
                className="w-full h-[640px] border-0"
                sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
                title="3) Creating a Filter/Label in Gmail"
                data-testid="iframe-gmail-filter"
              />
            </div>
          </div>
        </section>

        {/* Step 4: Creating the Zap */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">⚡️ Creating the Zap</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://app.tango.us/app/embed/b707444d-939f-40e2-b8a8-f24f21741bfa" 
                className="w-full h-[640px] border-0"
                sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
                title="4) Creating the Zap"
                data-testid="iframe-create-zap"
              />
            </div>
          </div>
        </section>

        {/* Two Sheets Explanation */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <Card>
              <CardHeader>
                <h2 className="text-3xl font-bold font-heading">🧠 Why Do We Use Two Google Sheets?</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To keep this system reliable and flexible, we use a <strong>two-sheet setup</strong>:</p>
                <ol className="list-decimal list-inside space-y-3 ml-4">
                  <li>
                    <strong>Sheet 1:</strong> This is the file that gets <em>automatically replaced every 15 minutes</em> by Zapier. It's the raw data dump from ServiceTitan.
                  </li>
                  <li>
                    <strong>Sheet 2:</strong> This is our <em>"TV Dashboard Feed"</em> — the one we connect to Looker Studio. It references the first sheet but doesn't get overwritten.
                  </li>
                </ol>
                <div className="bg-primary/10 p-6 rounded-lg space-y-3">
                  <p className="font-semibold">Why it matters:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We only need <em>one stable connection</em> to Looker Studio (which makes it fast and less error-prone)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>We can build custom formulas, filters, or formatting in our feed sheet — and those changes won't get erased</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>This setup makes it super easy to scale: you can reference <em>multiple raw data files</em> if needed</span>
                    </li>
                  </ul>
                </div>
                <p className="italic">It might sound a little technical now — but once you see it in action, it'll click.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Loom Video on 2 Sheets */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">🎥 Loom Video on the 2 Google Sheets</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm" style={{ position: 'relative', paddingBottom: '59.87%', height: 0 }}>
              <iframe 
                src="https://www.loom.com/embed/b31b7d6ab50c4b2f882b8d00de499ab6?sid=66a7fdd9-3de4-4e5b-8aee-956dea2c21e0" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                data-testid="iframe-loom-two-sheets"
              />
            </div>
          </div>
        </section>

        {/* Creating TV Dashboard Feed */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">📺 Creating the TV Dashboard Feed - the 2nd Google Sheet</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://app.tango.us/app/embed/3674234a-5b5b-4161-8329-7363e5fd1f08" 
                className="w-full h-[640px] border-0"
                sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
                title="5) Creating the TV Dashboard Feed"
                data-testid="iframe-tv-dashboard-feed"
              />
            </div>
          </div>
        </section>

        {/* Dashboard Template */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold font-heading mb-4">📊 Dashboard Template</h2>
              <a 
                href="https://lookerstudio.google.com/reporting/69e01907-bc29-420f-9d0b-12accfd503a6/page/3s4FF/copy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-lg"
                data-testid="link-dashboard-template"
              >
                👉 Get Your Dashboard Template Here
              </a>
            </div>
            <a 
              href="https://lookerstudio.google.com/reporting/69e01907-bc29-420f-9d0b-12accfd503a6/page/3s4FF/copy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img 
                src="https://files.cdn.thinkific.com/file_uploads/1072722/images/09d/c1f/d8d/Untitled_design_%2832%29.png" 
                alt="Dashboard Template Preview" 
                className="w-full rounded-lg shadow-lg hover-elevate"
                data-testid="img-dashboard-template"
              />
            </a>
          </div>
        </section>

        {/* Creating First Metric */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">📁 Creating the Report and the first metric</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://app.tango.us/app/embed/14e40fc6-1fea-4a5b-9e48-7ba26c711da5" 
                className="w-full h-[640px] border-0"
                sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
                title="6) Creating the Report and the first metric"
                data-testid="iframe-first-metric"
              />
            </div>
          </div>
        </section>

        {/* Customizing Dashboards */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold font-heading mb-8 text-center">🎨 Customizing Google Data Studio Dashboards</h2>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm" style={{ position: 'relative', paddingBottom: '62.94%', height: 0 }}>
              <iframe 
                src="https://www.loom.com/embed/44d14b4c99db4332900b1e8e1c7a4a8b?sid=c8373163-e273-4300-b91a-6abc7ec5fa24" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                data-testid="iframe-loom-customizing"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">💬 Questions or need help?</h2>
            <p className="text-xl mb-6">Feel free to contact me directly!</p>
            <a href="/contact" data-testid="link-contact-course">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20">
                Bill@st-hacks.com
              </Button>
            </a>
          </div>
        </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
