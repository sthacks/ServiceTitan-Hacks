import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ExternalLink,
  BookOpen,
  LayoutList,
  CheckCircle,
  XCircle,
  ImageIcon,
  Quote,
} from "lucide-react";
import billDashboardImage from "@assets/DIY_ServiceTitan_Dashboard_Course_1776783149232.png";
import flowImage from "@assets/1_1776781775627.png";
import kpiDashboardImage from "@assets/2_1776781793671.png";
import tvDisplayImage from "@assets/3_1776781805294.png";

const ENROLL_URL = "https://servicetitanhacks.thinkific.com/enroll/3344256";

const heroValuePoints = [
  "Send ServiceTitan data into Google Sheets automatically",
  "Build clean KPI dashboards your whole team can read",
  "Display them on a TV in your office — updated every 15 minutes",
];

const whatYouGetItems = [
  "Lifetime access — no subscriptions",
  "One-time payment of $97",
  "Looker Studio dashboard template included",
  "Dashboards refresh automatically every ~15 minutes",
  "Step-by-step videos and interactive walkthroughs",
  "Works with HVAC, plumbing, electrical, and other trades",
];

const dashboardCards = [
  {
    title: "Technician performance dashboard",
    description: "See revenue, jobs, and averages per tech at a glance.",
  },
  {
    title: "CSR and call center dashboard",
    description: "Track call volume, booking rate, and CSR activity in real time.",
  },
  {
    title: "Office TV scoreboard",
    description: "Keep the whole team aligned with live numbers on the wall.",
  },
];

const testimonials = [
  {
    headline: "[Review headline]",
    body: "[Review text goes here — replace this with a real quote from a contractor who completed the course.]",
    attribution: "[Name, Company]",
  },
  {
    headline: "[Review headline]",
    body: "[Review text goes here — replace this with a real quote from a contractor who completed the course.]",
    attribution: "[Name, Company]",
  },
  {
    headline: "[Review headline]",
    body: "[Review text goes here — replace this with a real quote from a contractor who completed the course.]",
    attribution: "[Name, Company]",
  },
];

const forYouPoints = [
  "You use ServiceTitan",
  "You want better visibility into KPIs without another monthly platform",
  "You want to build and own your own dashboard system",
  "You are comfortable doing a bit of setup with step-by-step guidance",
];

const notForYouPoints = [
  "You want a done-for-you dashboard service",
  "You do not want to touch any setup at all",
  "You are looking for custom business intelligence consulting",
];

const faqs = [
  {
    question: "Do I need to know Zapier?",
    answer:
      "No prior Zapier experience required. The course walks you through building the Zap step by step. If you can follow instructions, you can set this up.",
  },
  {
    question: "Do I need to be advanced with Google Sheets?",
    answer:
      "No. You need basic familiarity — knowing how to open a sheet and navigate cells is enough. The course handles everything else.",
  },
  {
    question: "Can I display these dashboards on a TV in my office?",
    answer:
      "Yes. That is the whole point. The course shows you exactly how to get a live, auto-updating dashboard on any TV in your office.",
  },
  {
    question: "How long does setup usually take?",
    answer:
      "Most people complete the core setup in a few hours. The full course is about 15 lessons and you can work through it at your own pace.",
  },
  {
    question: "Is this only for owners?",
    answer:
      "No. Office managers, operations leads, and anyone responsible for reporting can get value from this. If you want better data visibility, this course is for you.",
  },
  {
    question: "Do I get lifetime access?",
    answer:
      "Yes. One payment of $97 gives you lifetime access to all 15 lessons, the dashboard template, and any future updates.",
  },
];

const learnFeatures = [
  {
    title: "Connect ServiceTitan to Google Sheets",
    description:
      "Use Zapier to automatically send report data from ServiceTitan into a Google Sheet — no manual exports.",
    image: flowImage,
  },
  {
    title: "Build Clean KPI Dashboards",
    description:
      "Create professional dashboards for technician performance, sales, estimates, and installs using Looker Studio.",
    image: kpiDashboardImage,
  },
  {
    title: "Display on Any Office TV",
    description:
      "Get your dashboard live on a TV in your office — no developers, no expensive software, no IT team needed.",
    image: tvDisplayImage,
  },
];

export default function DashboardCourseLanding() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "DIY ServiceTitan Dashboards",
    description:
      "Build an automated TV dashboard with live ServiceTitan data. 15 lessons, 2 chapters. Perfect for HVAC, plumbing, electrical shops.",
    provider: {
      "@type": "Organization",
      name: "ServiceTitan Hacks",
    },
    offers: {
      "@type": "Offer",
      price: "97",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="DIY ServiceTitan Dashboards Course"
        description="Build your own live, TV-ready dashboards for ServiceTitan. Track KPIs, sales, installs and more in real time for your home service company."
        keywords="TV dashboard course, ServiceTitan dashboard, automated reporting, KPI dashboard, home service"
        canonicalUrl="https://servicetitanhacks.com/dashboard-course-landing"
        ogImage="https://servicetitanhacks.com/og-dashboard-course.png"
        schemaData={courseSchema}
      />
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-[3fr_5fr] gap-10 md:gap-14 items-start">

              {/* Left: copy */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
                  Build Your Own ServiceTitan Dashboard System
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  A step-by-step DIY course for home service companies. Connect ServiceTitan to Google Sheets with Zapier, build KPI dashboards in Looker Studio, and display live numbers on a TV in your office — for $97.
                </p>
                <ul className="space-y-2 mb-8">
                  {heroValuePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-base">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">$97</span>
                  <a
                    href={ENROLL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-enroll-hero"
                  >
                    <Button size="lg" className="gap-2">
                      Get Instant Access <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lifetime access. DIY setup. Built for home service companies.
                </p>
              </div>

              {/* Right: hero image */}
              <img
                src={billDashboardImage}
                alt="Bill Brown pointing at a ServiceTitan Technician Performance dashboard on a TV"
                className="w-full h-auto rounded-lg object-cover"
                loading="eager"
                data-testid="img-hero-bill-dashboard"
              />

            </div>

            {/* Course meta strip */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>2 Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <LayoutList className="h-4 w-4 text-primary" />
                <span>15 Lessons</span>
              </div>
              <span>Step-by-step video walkthroughs</span>
              <span>Dashboard template included</span>
            </div>
          </div>
        </section>

        {/* ── See what you can build ───────────────────────────── */}
        <section className="py-16 bg-zinc-950 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-center">
              See what you can build
            </h2>
            <p className="text-center text-zinc-400 mb-12 max-w-xl mx-auto">
              These are the kinds of dashboards you will walk away with — live, on a TV, updating automatically.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {dashboardCards.map((card, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800 overflow-hidden">
                  <div
                    className="aspect-[16/9] bg-zinc-800 flex flex-col items-center justify-center gap-3 border-b border-zinc-700"
                    data-testid={`placeholder-dashboard-${i}`}
                  >
                    <ImageIcon className="h-8 w-8 text-zinc-600" />
                    <p className="text-xs text-zinc-600 px-4 text-center">
                      [Replace with real dashboard screenshot]
                    </p>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-white mb-1">{card.title}</h3>
                    <p className="text-sm text-zinc-400">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── What You'll Learn ────────────────────────────────── */}
        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {learnFeatures.map((feature, i) => (
                <Card key={i} className="bg-zinc-950 border-zinc-800 overflow-hidden">
                  <div className="aspect-[2/1] bg-zinc-900 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={`${feature.title} — dashboard course screenshot`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold font-heading mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What You Get */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold font-heading mb-6 text-center">What You Get</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {whatYouGetItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section className="py-16 bg-zinc-950 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-center">
              What contractors are saying
            </h2>
            <p className="text-center text-zinc-500 mb-12 text-sm">
              [Replace placeholder cards with real reviews from course students]
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800 p-6" data-testid={`card-testimonial-${i}`}>
                  <CardContent className="p-0 flex flex-col gap-4">
                    <Quote className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="font-semibold text-white text-sm">{t.headline}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed flex-1">{t.body}</p>
                    <p className="text-zinc-600 text-xs">{t.attribution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who It's For ─────────────────────────────────────── */}
        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              Is this course right for you?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-zinc-950 border-zinc-800 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold mb-5 text-white">This course is for you if&hellip;</h3>
                  <ul className="space-y-3">
                    {forYouPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold mb-5 text-white">This course is not for you if&hellip;</h3>
                  <ul className="space-y-3">
                    {notForYouPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                        <XCircle className="h-4 w-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ── About the Course ─────────────────────────────────── */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">About the Course</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed mb-4">
              This step-by-step course shows you how to create real, visual dashboards that your whole team can see — right on a TV in your office.
            </p>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              You will learn how to send ServiceTitan data to Google Sheets using Zapier, build clean dashboards for KPIs, sales, estimates, and installs, and display your dashboard on a TV screen — no developers, no fancy tools, no ongoing fees. Your dashboards update automatically about every 15 minutes.
            </p>
          </div>
        </section>

        {/* ── Instructor ───────────────────────────────────────── */}
        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/TZI7fi85RWmx6RdKN13O_Headshot%20Circle.png"
                  alt="Bill Brown — ServiceTitan Hacks founder and course instructor"
                  className="w-52 h-52 rounded-full object-cover shadow-xl"
                  loading="lazy"
                  data-testid="img-instructor"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-5">
                  Meet Your Instructor
                </h2>
                <p className="text-base text-zinc-300 leading-relaxed">
                  With over 25 years in the trades and a proven track record of building, scaling, and optimizing home service businesses, Bill brings real-world experience and actionable strategies to every lesson. Whether you're looking to streamline operations, boost revenue, or implement cutting-edge tools like AI, Bill's hands-on guidance will help you get there faster — with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-16 bg-zinc-950 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-white hover:no-underline py-4 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 pb-4 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="py-20 bg-black text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Build your own ServiceTitan dashboard system
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
              One payment. Lifetime access. Start seeing your numbers on the wall this week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-4xl font-bold text-primary">$97</div>
              <a
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-enroll-footer"
              >
                <Button size="lg" className="gap-2">
                  Get Instant Access <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-zinc-600 mt-4">
              Lifetime access. DIY setup. Built for home service companies.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
