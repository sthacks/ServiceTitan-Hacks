import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";

export default function Courses() {
  const courses = [
    {
      title: "ServiceTitan Foundations",
      level: "Beginner",
      duration: "2 hours",
      outcomes: [
        "Navigate the ST interface with confidence",
        "Set up your first job and estimate",
        "Configure basic reporting",
      ],
      included: [
        "Video tutorials",
        "Setup checklist",
        "Community forum access",
      ],
    },
    {
      title: "Advanced Automations",
      level: "Intermediate",
      duration: "3 hours",
      outcomes: [
        "Build multi-step workflows",
        "Integrate third-party tools",
        "Automate follow-up sequences",
      ],
      included: [
        "Live walkthroughs",
        "Automation templates",
        "1-on-1 support call",
      ],
    },
    {
      title: "ServiceTitan API Mastery",
      level: "Advanced",
      duration: "4 hours",
      outcomes: [
        "Build custom integrations",
        "Automate data sync",
        "Create custom reports",
      ],
      included: [
        "Code samples",
        "API documentation",
        "Developer Q&A sessions",
      ],
    },
    {
      title: "Pricing Strategy Deep Dive",
      level: "Intermediate",
      duration: "2.5 hours",
      outcomes: [
        "Optimize your pricebook structure",
        "Implement dynamic pricing",
        "Track pricing performance",
      ],
      included: [
        "Pricing templates",
        "ROI calculator",
        "Case studies",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Courses
              </h1>
              <p className="text-xl text-muted-foreground">
                Master ServiceTitan, automations, and AI integrations with step-by-step courses designed for busy contractors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {courses.map((course) => (
                <CourseCard key={course.title} {...course} />
              ))}
            </div>

            <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Get access to everything</h2>
              <p className="text-lg mb-8 opacity-90">
                All courses, resources, calculators, and monthly live Q&A calls—one simple subscription.
              </p>
              <a href="/all-access">
                <Button size="lg" variant="secondary" data-testid="button-all-access-cta">
                  View All-Access Pass
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
