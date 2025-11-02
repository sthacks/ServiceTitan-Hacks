import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function FixUglyFormsCourseDetails() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Fix Ugly Forms Course",
    "description": "Transform messy form submissions into polished job notes using ChatGPT and Zapier. 19 lessons, 6 chapters.",
    "provider": {
      "@type": "Organization",
      "name": "ServiceTitan Hacks"
    },
    "offers": {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "USD"
    }
  };
  const features = [
    {
      title: "Turn Messy Forms into Clear Job Notes",
      description: "Use AI and automation to convert submitted ServiceTitan forms into clean, easy-to-read bullet lists added right where your team looks: the job note.",
      image: "https://import.cdn.thinkific.com/1072722/vp96w1ygTK6JTLA7t5w7_9%402iMiZSD1I.png",
    },
    {
      title: "Make Job Notes Clear & Actionable",
      description: "Fix spelling, format into bullet points, and highlight action items automatically so your field team never misses what matters.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/K98pCcaTTkKZavelYoRB_automation%20and%20ai%20course%20(1).png",
    },
    {
      title: "Stop Wasting Time Hunting for Forms",
      description: "Get your formatted notes placed right inside the job — no more digging into hidden tabs. CSRs and techs save time instantly.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/MM4th1imRFOfFyXdRKb2_automation%20and%20ai%20course%20(2).png",
    },
    {
      title: "ServiceTitan Form Setup",
      description: "Learn how to prepare your ServiceTitan forms for automation, ensuring every field is captured and processed correctly.",
      image: "https://import.cdn.thinkific.com/1072722/vp96w1ygTK6JTLA7t5w7_9%402iMiZSD1I.png",
    },
    {
      title: "ChatGPT Integration",
      description: "Set up ChatGPT to automatically clean grammar, format into bullet points, and highlight important action items.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/K98pCcaTTkKZavelYoRB_automation%20and%20ai%20course%20(1).png",
    },
    {
      title: "End-to-End Automation",
      description: "Build a complete workflow that triggers on form submission and automatically creates clean, formatted job notes in ServiceTitan.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/MM4th1imRFOfFyXdRKb2_automation%20and%20ai%20course%20(2).png",
    },
  ];

  const benefits = [
    "Save time on manual form cleanup",
    "Professional, consistent job notes",
    "Lifetime access to course materials",
    "Zapier template included",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Fix Ugly Forms Course | AI-Powered Job Notes Cleanup"
        description="Transform messy form submissions into polished job notes using ChatGPT and Zapier. 19 lessons, 6 chapters. $49 course."
        keywords="AI forms course, ChatGPT automation, job notes cleanup, form automation, ServiceTitan forms"
        canonicalUrl="https://servicetitanhacks.com/fix-ugly-forms-course-landing"
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
                  Fix Ugly Forms: Auto-Clean Job Notes with AI
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Transform messy form submissions into polished job notes using ChatGPT and Zapier. Streamline your documentation process and save time.
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-4xl font-bold text-primary">$49.00</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>6 Chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>19 Lessons</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://servicetitanhacks.thinkific.com/enroll/3352937"
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
                  src="https://import.cdn.thinkific.com/1072722/vp96w1ygTK6JTLA7t5w7_9%402iMiZSD1I.png"
                  alt="Fix Ugly Forms with AI course header"
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
                      alt={`${feature.title} - Fix Ugly Forms course screenshot`}
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
                      alt={`${feature.title} - Fix Ugly Forms course screenshot`}
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
              This course teaches you how to transform raw ServiceTitan form submissions into clean, technician and office-friendly job notes using Zapier and AI. You'll learn how to set up an automation that triggers when a form is submitted, sends the data to ChatGPT to fix grammar, apply formatting, and highlight action items, then automatically adds the polished note back into the job or project in ServiceTitan. Whether you're a CSR, manager, or operations lead, this course will help you streamline documentation, improve note clarity, and eliminate the need to dig through cluttered PDFs.
            </p>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/IEEDgjSDSUOWhA0ub4ue_Headshot%20Circle.png"
                  alt="Bill Brown - ServiceTitan Hacks founder and course instructor"
                  className="w-64 h-64 rounded-full object-cover shadow-xl"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Meet Your Instructor</h2>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  Join me on this journey to revolutionize how you handle form data in ServiceTitan. Learn from my experience and expertise as we dive into the world of automation and AI to make your job notes shine. My goal is to help you save time, streamline your processes, and ensure every note is polished and technician-friendly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Transform Your ServiceTitan Workflow?
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
              Enroll now to automate your form data processing, enhance job note clarity, and improve efficiency. Stop wasting time on manual cleanup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-4xl font-bold text-primary">$49.00</div>
              <a
                href="https://servicetitanhacks.thinkific.com/enroll/3352937"
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
