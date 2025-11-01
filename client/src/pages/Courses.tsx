import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, ExternalLink } from "lucide-react";

export default function Courses() {
  const courses = [
    {
      title: "Create Your Own Company App with Jotform",
      description: "Build a professional company app for your home service business using Jotform. Enhance employee experience and streamline operations on any device—all at minimal cost.",
      price: "$97",
      level: "Intermediate",
      image: "https://import.cdn.thinkific.com/1072722/XLiLdFatSAOA2Bky38ef_DIY%20Branded%20Company%20App%20(760%20x%20420%20px).png",
      url: "https://servicetitanhacks.thinkific.com/products/courses/company-app-jotform",
      rating: null,
    },
    {
      title: "DIY ServiceTitan TV Dashboard",
      description: "Build an automated TV dashboard that updates multiple times per day using live job data from ServiceTitan — with zero manual effort once it's set up.",
      price: "$97",
      level: "Intermediate",
      image: "https://import.cdn.thinkific.com/1072722/oG04g0LZQsiIf0jePvPc_Dashboard%20Example%20(1).png",
      url: "https://go.st-hacks.cc/dashboard-course",
      rating: "5.0",
      reviews: 1,
    },
    {
      title: "Integrate ServiceTitan with Make.com",
      description: "Unlock cost-effective automation by connecting ServiceTitan to Make.com. Streamline your workflows and save money while enhancing efficiency.",
      price: "$69",
      level: "Intermediate",
      image: "https://import.cdn.thinkific.com/1072722/elvItVdyT3yGOrkpX7AH_connect%20to%20make.com.png",
      url: "https://go.st-hacks.cc/servicetitan-make",
      rating: null,
    },
    {
      title: "Connect ServiceTitan to Zapier",
      description: "Master the integration of ServiceTitan and Zapier to streamline operations and automate workflows. Enhance your productivity and efficiency with powerful, automated connections.",
      price: "Free",
      level: "Beginner",
      image: "https://import.cdn.thinkific.com/1072722/OdZwdguBTtyLCkKTWeFf_connect%20to%20zapier.png",
      url: "https://servicetitanhacks.thinkific.com/products/courses/servicetitan-to-zapier",
      rating: null,
    },
    {
      title: "Fix Ugly Forms: Auto-Clean Job Notes with AI",
      description: "Transform messy form submissions into polished job notes using ChatGPT and Zapier. Streamline your documentation process and save time with this practical course.",
      price: "$49",
      level: "Advanced",
      image: "https://import.cdn.thinkific.com/1072722/vp96w1ygTK6JTLA7t5w7_9%402iMiZSD1I.png",
      url: "https://servicetitanhacks.thinkific.com/products/courses/ai-automated-servicetitan-forms",
      rating: null,
    },
    {
      title: "Automate Job Summaries with AI in ServiceTitan",
      description: "Transform job scheduling with AI! Automate job summaries into professional bullet-point lists, enhance communication, and save time for HVAC, plumbing, and electrical companies.",
      price: "$39",
      level: "Advanced",
      image: "https://import.cdn.thinkific.com/1072722/hAIZq6A8RcuOOzWNdgsc_job%20summary%20cleaner.png",
      url: "https://servicetitanhacks.thinkific.com/products/courses/servicetitan-ai-job-summary",
      rating: null,
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
        title="ServiceTitan Hacks Courses"
        subtitle="Learn to automate, optimize, and scale your home service business with practical, hands-on courses. From beginner-friendly integrations to advanced AI automation."
        primaryCta={{
          label: "View All-Access Pass",
          href: "https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass",
        }}
        dark={true}
      />

      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-heading mb-4">Available Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step courses designed for ServiceTitan contractors. Learn at your own pace and implement what you learn immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {courses.map((course, index) => (
              <Card key={index} className="hover-elevate flex flex-col">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getLevelColor(course.level)} data-testid={`badge-level-${course.level.toLowerCase()}`}>
                      {course.level}
                    </Badge>
                    {course.rating && (
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-muted-foreground">({course.reviews})</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold font-heading mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-4 mt-auto">
                    <div className="text-2xl font-bold text-primary">
                      {course.price}
                    </div>
                    <a
                      href={course.url}
                      target={course.url.startsWith('http') ? "_blank" : undefined}
                      rel={course.url.startsWith('http') ? "noopener noreferrer" : undefined}
                      data-testid={`link-course-${index}`}
                    >
                      <Button className="gap-2">
                        {course.url.startsWith('http') ? (
                          <>Enroll Now <ExternalLink className="h-4 w-4" /></>
                        ) : (
                          'View Course'
                        )}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold font-heading">Get Unlimited Access</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Save with the All-Access Pass! Get unlimited access to all courses, exclusive tools, and premium community resources for one low monthly price.
                </p>
                <a href="https://servicetitanhacks.thinkific.com/bundles/servicetitan-hacks-all-access-pass" target="_blank" rel="noopener noreferrer" data-testid="link-all-access-cta">
                  <Button size="lg">Explore All-Access Pass</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
