import { useEffect } from "react";
import { trackViewContent, trackCTAClick, buildCheckoutUrl } from "@/lib/pixel";
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
  Quote,
  Video,
  LayoutDashboard,
} from "lucide-react";
import billDashboardImage from "@assets/DIY_ServiceTitan_Dashboard_Course_1776783149232.png";
import billHeadshotImage from "@assets/Facebook_Cover_Photo_(3762_x_1365_px).png_1776861539792.png";
import flowImage from "@assets/1_1776781775627.png";
import kpiDashboardImage from "@assets/2_1776781793671.png";
import tvDisplayImage from "@assets/3_1776781805294.png";

const ENROLL_URL = "https://servicetitanhacks.thinkific.com/enroll/3344256";

const heroValuePoints = [
  "Send ServiceTitan data into Google Sheets automatically",
  "Build clean KPI dashboards your team can actually use",
  "Display them on a TV in your office with automatic refreshes",
];

const proofItems = [
  { icon: BookOpen, label: "2 Chapters" },
  { icon: LayoutList, label: "15 Lessons" },
  { icon: Video, label: "Step-by-step video walkthroughs" },
  { icon: LayoutDashboard, label: "Dashboard template included" },
];

const whatYouGetItems = [
  "Lifetime access — no subscriptions",
  "One-time payment of $97",
  "Dashboard template included",
  "Step-by-step videos and walkthroughs",
  "Dashboards refresh automatically about every 15 minutes",
  "Works with HVAC, plumbing, electrical, and other trades",
];

const testimonials = [
  {
    body: "This class is super helpful! The step-by-step directions make it super easy to accomplish your dashboard dreams!",
    attribution: "Chris P.",
  },
  {
    body: "Service Titan Dashboard is an absolute game-changer! I rarely write reviews, but I felt compelled to share my experience with this one. As someone with limited technical expertise, I was skeptical about my ability to build a dashboard that met my specific needs. However, this step-by-step, easily understandable course proved to be a lifesaver. Not only did I successfully build the dashboard, but it exceeded my expectations.",
    attribution: "Phil R.",
  },
];

const forYouPoints = [
  "You use ServiceTitan",
  "You want better visibility into KPIs",
  "You want to build and own your own dashboard system",
  "You are comfortable following a step-by-step setup process",
];

const notForYouPoints = [
  "You want a done-for-you dashboard service",
  "You do not want to touch setup at all",
  "You are looking for custom business intelligence consulting",
];

const faqs = [
  {
    question: "Do I need to know Zapier?",
    answer:
      "No. You do not need any prior Zapier experience. The course walks you through building the Zap step by step. If you can follow instructions, you can set this up.",
  },
  {
    question: "Do I need to be advanced with Google Sheets?",
    answer:
      "No. Basic comfort with Google Sheets is enough — knowing how to open a spreadsheet and navigate cells is all you need to start. The course handles everything else in a practical, approachable way.",
  },
  {
    question: "Can I display these dashboards on a TV in my office?",
    answer:
      "Yes. That is the whole point. The course shows you exactly how to get a live, auto-updating dashboard onto any TV in your office using a simple browser-based setup.",
  },
  {
    question: "How long does setup usually take?",
    answer:
      "Most people complete the core setup in a few hours. The full course is 15 lessons and you can work through it at your own pace. It is designed to be practical and efficient.",
  },
  {
    question: "Is this only for owners?",
    answer:
      "No. Office managers, operations leads, and anyone responsible for reporting can get real value from this. If you want better data visibility for your team, this course is for you.",
  },
  {
    question: "Do I get lifetime access?",
    answer:
      "Yes. One payment of $97 gives you lifetime access to all 15 lessons, the dashboard template, and any future updates.",
  },
];

const learnFeatures = [
  {
    step: "1",
    title: "Connect ServiceTitan to Google Sheets",
    description:
      "Automatically send report data from ServiceTitan into Google Sheets with Zapier. No manual exports.",
    image: flowImage,
    alt: "ServiceTitan to Zapier to Google Sheets workflow graphic",
  },
  {
    step: "2",
    title: "Build Clean KPI Dashboards",
    description:
      "Create dashboards for technician performance, sales, estimates, and installs using Google Sheets and Looker Studio.",
    image: kpiDashboardImage,
    alt: "Example KPI dashboard for ServiceTitan home service companies",
  },
  {
    step: "3",
    title: "Display on Any Office TV",
    description:
      "Put your dashboard on a TV in your office so your whole team can see the numbers all day.",
    image: tvDisplayImage,
    alt: "Dashboard display on an office TV for home service teams",
  },
];

export default function DashboardCourseLanding() {
  useEffect(() => {
    trackViewContent({
      content_name: "DIY ServiceTitan Dashboards",
      content_category: "Course",
      content_ids: ["dashboard-course-3344256"],
      value: 97,
      currency: "USD",
    });
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "DIY ServiceTitan Dashboards",
        description:
          "A step-by-step DIY course for home service companies. Learn how to send ServiceTitan data into Google Sheets, build KPI dashboards, and display them live on a TV in your office.",
        url: "https://servicetitanhacks.com/dashboard-course",
        provider: {
          "@type": "Organization",
          name: "ServiceTitan Hacks",
          url: "https://servicetitanhacks.com",
        },
        instructor: {
          "@type": "Person",
          name: "Bill Brown",
        },
        offers: {
          "@type": "Offer",
          price: "97",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://servicetitanhacks.thinkific.com/enroll/3344256",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://servicetitanhacks.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Courses",
            item: "https://servicetitanhacks.com/courses",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "DIY ServiceTitan Dashboards",
            item: "https://servicetitanhacks.com/dashboard-course",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="DIY ServiceTitan Dashboards Course | Build KPI Dashboards for ServiceTitan"
        description="Learn how to send ServiceTitan data into Google Sheets, build KPI dashboards, and display them on a TV in your office with this DIY step-by-step course."
        keywords="ServiceTitan dashboards, KPI dashboard, ServiceTitan Google Sheets, contractor dashboard, home service dashboard, office TV dashboard, ServiceTitan course"
        canonicalUrl="https://servicetitanhacks.com/dashboard-course"
        ogImage="https://servicetitanhacks.com/og-dashboard-course.png"
        schemaData={courseSchema}
      />
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-[3fr_5fr] gap-10 md:gap-16 items-center">

              {/* Left: copy */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-5 leading-tight">
                  Build Your Own ServiceTitan Dashboard System
                </h1>
                <p className="text-lg text-muted-foreground mb-7 leading-relaxed">
                  A step-by-step DIY course for home service companies. Learn how to send ServiceTitan data into Google Sheets, build clean KPI dashboards, and display them live on a TV in your office.
                </p>
                <ul className="space-y-3 mb-8">
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
                    onClick={(e) => {
                      e.preventDefault();
                      trackCTAClick("hero");
                      window.open(buildCheckoutUrl(ENROLL_URL), "_blank", "noopener,noreferrer");
                    }}
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
                className="w-full h-auto rounded-xl object-cover shadow-lg"
                loading="eager"
                data-testid="img-hero-bill-dashboard"
              />

            </div>
          </div>
        </section>

        {/* ── Proof bar ────────────────────────────────────────── */}
        <section className="py-6 bg-zinc-950 border-y border-zinc-800">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
              {proofItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <item.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What You'll Learn ────────────────────────────────── */}
        <section className="py-20 bg-black text-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-center">
              What You'll Learn
            </h2>
            <p className="text-center text-zinc-400 mb-14 max-w-xl mx-auto">
              Three steps. One complete dashboard system your whole team can see every day.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {learnFeatures.map((feature, i) => (
                <Card key={i} className="bg-zinc-950 border-zinc-800 overflow-hidden flex flex-col">
                  <div className="aspect-[2/1] bg-zinc-900 overflow-hidden flex-shrink-0">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {feature.step}
                      </span>
                      <h3 className="text-base font-semibold font-heading text-white leading-snug">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What You Get */}
            <div className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold font-heading mb-6 text-center text-white">What You Get</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {whatYouGetItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section className="py-20 bg-zinc-950 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-center">
              What contractors are saying
            </h2>
            <p className="text-center text-zinc-500 mb-12 text-sm">
              Real feedback from contractors who bought and used the course.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800 p-8" data-testid={`card-testimonial-${i}`}>
                  <CardContent className="p-0 flex flex-col gap-5">
                    <Quote className="h-8 w-8 text-primary flex-shrink-0" />
                    <p className="text-zinc-200 text-base leading-relaxed flex-1">{t.body}</p>
                    <p className="text-zinc-500 text-sm font-medium">— {t.attribution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who It's For ─────────────────────────────────────── */}
        <section className="py-20 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
              Is this course right for you?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-zinc-950 border-zinc-800 p-8">
                <CardContent className="p-0">
                  <h3 className="text-base font-bold mb-6 text-primary uppercase tracking-wide">
                    This course is for you if&hellip;
                  </h3>
                  <ul className="space-y-4">
                    {forYouPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-zinc-950 border-zinc-800 p-8">
                <CardContent className="p-0">
                  <h3 className="text-base font-bold mb-6 text-zinc-500 uppercase tracking-wide">
                    This course is not for you if&hellip;
                  </h3>
                  <ul className="space-y-4">
                    {notForYouPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
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
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">About the Course</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed mb-4">
              This course shows you how to create real, visual dashboards your team can see every day — right on a TV in your office.
            </p>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              You will learn how to send ServiceTitan data into Google Sheets using Zapier, build clean KPI dashboards for sales, estimates, installs, and technician performance, and display them on a TV screen — no developers, no expensive software. Your dashboards update automatically about every 15 minutes.
            </p>
          </div>
        </section>

        {/* ── Instructor ───────────────────────────────────────── */}
        <section className="py-20 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src={billHeadshotImage}
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
                <p className="text-base text-zinc-300 leading-relaxed mb-4">
                  With over 25 years in the trades and a proven track record of building, scaling, and optimizing home service businesses, Bill brings real-world experience to every lesson.
                </p>
                <p className="text-base text-zinc-300 leading-relaxed">
                  Whether you want better visibility, cleaner reporting, or a dashboard your team can actually use — this course shows you how to build it yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-20 bg-zinc-950 text-white">
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
                  <AccordionTrigger className="text-left text-white hover:no-underline py-5 text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 pb-5 text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section className="py-24 bg-black text-white">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Build your own ServiceTitan dashboard system
            </h2>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              One payment. Lifetime access. Start seeing your numbers on the wall this week.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-5">
              <div className="text-5xl font-bold text-primary">$97</div>
              <a
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-enroll-footer"
                onClick={(e) => {
                  e.preventDefault();
                  trackCTAClick("footer");
                  window.open(buildCheckoutUrl(ENROLL_URL), "_blank", "noopener,noreferrer");
                }}
              >
                <Button size="lg" className="gap-2 text-base px-8">
                  Get Instant Access <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-zinc-600">
              Lifetime access. DIY setup. Built for home service companies.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
