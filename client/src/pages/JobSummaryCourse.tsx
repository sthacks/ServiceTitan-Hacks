import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function JobSummaryCourse() {
  const features = [
    {
      title: "Understand the Cost of Confusing Job Summaries",
      description: "Learn why clear communication matters and how messy job summaries hurt your team's efficiency and customer experience.",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
    },
    {
      title: "AI-Powered Automation",
      description: "Discover why AI is the perfect solution for cleaning up job summaries and how it can transform your ServiceTitan workflow.",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
    },
    {
      title: "Complete Setup Guide",
      description: "Get step-by-step instructions for connecting ServiceTitan, Zapier, and ChatGPT to build your automated job summary cleaner.",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
    },
    {
      title: "Full Automation Walkthrough",
      description: "Follow along as we build the complete automation from start to finish, including all triggers, delays, and AI formatting steps.",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
    },
    {
      title: "Master AI Prompts",
      description: "Learn how to write effective prompts that tell ChatGPT exactly how to format your job summaries, highlight action items, and fix errors.",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
    },
    {
      title: "Testing & Optimization",
      description: "Ensure your automation works perfectly with comprehensive testing strategies and tips for ongoing optimization and expansion.",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
    },
  ];

  const benefits = [
    "Professional, consistent job notes",
    "Automatic grammar and spelling fixes",
    "Bullet-point formatting",
    "Highlighted action items for techs",
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
                  Automate Job Summaries with AI in ServiceTitan
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Transform job scheduling with AI! Automate job summaries into professional bullet-point lists, enhance communication, and save time.
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-4xl font-bold text-primary">$39.00</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>1 Chapter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>7 Lessons</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://servicetitanhacks.thinkific.com/enroll/3352826"
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
                  src="https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png"
                  alt="Automate Job Summaries with AI course header"
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
                      alt={`${feature.title} - Job Summary course screenshot`}
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
                      alt={`${feature.title} - Job Summary course screenshot`}
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
              In this course, you'll learn how to build the Job Summary Cleaner — a powerful automation that connects ServiceTitan and Zapier with AI to instantly clean up your job summaries. After a job is scheduled, the Zap waits 10 minutes for your CSR to finish their notes, then automatically formats the summary into a clean, bullet-point layout. It highlights possible action items for the technician, corrects spelling and grammar, and formats key info like pricing — all without manual review. This course is perfect for contractors who want more professional, consistent, and actionable job notes without adding extra work for their team.
            </p>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/kOSqlU3STnWcCT0AxW2B_Headshot%20Circle.png"
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
              Ready to Transform Your Job Summaries?
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
              Enroll today to revolutionize your communication, save time, and elevate professionalism in your company. Start creating clear, actionable job notes automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-4xl font-bold text-primary">$39.00</div>
              <a
                href="https://servicetitanhacks.thinkific.com/enroll/3352826"
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
