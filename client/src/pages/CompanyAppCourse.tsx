import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, BookOpen, Sparkles } from "lucide-react";

export default function CompanyAppCourse() {
  const features = [
    {
      title: "Branded to Your Company",
      description: "Your logo, your name, your colors — a fully branded experience your team will recognize and trust.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/udOZwdBaRkyDsMbmZBcT_branded.png",
    },
    {
      title: "AI Assistant",
      description: "Answer team questions instantly and guide them to resources using an integrated AI chat assistant.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/yZZ4qXnaT1mzuM2RzLKX_ai.png",
    },
    {
      title: "Push Notifications",
      description: "Send alerts and updates that go straight to your team's phones — perfect for urgent messages or reminders.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/RbsZgEEoThyNfRWvphe8_push.png",
    },
    {
      title: "Add Videos",
      description: "Embed training and walkthrough videos so your team can learn or review on the go.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/DqjUcRUwQGaDYTVVCqLz_videos.png",
    },
    {
      title: "Add Images",
      description: "Include diagrams, photos, and visual guides to clarify standards and procedures fast.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/XrTCTD9RvKvRdzo7Xm1w_images.png",
    },
    {
      title: "Embed Forms",
      description: "Collect tool orders, requests, or other submissions with custom, mobile-friendly forms your team can fill out anytime.",
      image: "https://s3.amazonaws.com/thinkific-import/1072722/uHc231ySpOBCQs4IsUAy_Forms.png",
    },
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
                  Build Your Own No-Code Company App
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Create a professional app for your home service contracting business on any device with this affordable and easy-to-follow course.
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-4xl font-bold text-primary">$97.00</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>3 Chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>13 Lessons</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://servicetitanhacks.thinkific.com/enroll/3453608"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-enroll-hero"
                >
                  <Button size="lg" className="gap-2">
                    Get Started <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              <div className="relative">
                <img
                  src="https://s3.amazonaws.com/thinkific-import/1072722/qk3ErSEBRUupFg9QD2ex_DIY%20Branded%20Company%20App%20(9).png"
                  alt="DIY branded company app on mobile phone - ServiceTitan Hacks Jotform course"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.slice(0, 3).map((feature, index) => (
                <Card key={index} className="bg-black border-0 overflow-hidden">
                  <div className="aspect-[4/3] bg-black flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - Company app feature screenshot`}
                      className="w-auto h-full max-h-64 object-contain"
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

            <div className="grid md:grid-cols-3 gap-8">
              {features.slice(3, 6).map((feature, index) => (
                <Card key={index + 3} className="bg-black border-0 overflow-hidden">
                  <div className="aspect-[4/3] bg-black flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - Company app feature screenshot`}
                      className="w-auto h-full max-h-64 object-contain"
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
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">About the Course</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              This course is designed for home service contractors looking to enhance their business operations by creating a customized company app using Jotform. Say goodbye to communication gaps and hello to a streamlined experience for you and your employees. Join us to learn how to build your app hassle-free, ensuring a professional and cohesive work environment. Enroll now to transform your business with a user-friendly app solution.
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
              Join now and take the first step towards creating a professional app for your contracting business. Experience the benefits of seamless communication and enhanced productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="text-4xl font-bold text-primary">$97.00</div>
              <a
                href="https://servicetitanhacks.thinkific.com/enroll/3453608"
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
