import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import keyIcon from "@assets/generated_images/All-Access_Pass_key_icon_359df7ba.png";
import { Check } from "lucide-react";
import titleBg from "@assets/Title (33)_1760814859255.png";

export default function AllAccess() {
  const benefits = [
    "Access every current and future ST Hacks course in one membership",
    "Continuous updates and new releases at no extra cost",
    "Ready-to-use automation templates that eliminate manual data entry",
    "Exclusive dashboards and reporting tools for real-time insights",
  ];

  const faqs = [
    {
      question: "What's included in the All-Access Pass?",
      answer: "You get access to every current and future ST Hacks course, ready-to-use automation templates, exclusive dashboards and reporting tools, monthly live Q&A calls with industry experts, and priority support. All updates and new releases are included at no extra cost.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No questions asked, no long-term commitments.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied for any reason, we'll refund your purchase in full.",
    },
    {
      question: "How often is new content added?",
      answer: "We add new courses, resources, and tools every month based on community feedback and industry trends.",
    },
    {
      question: "Is this suitable for small teams?",
      answer: "Absolutely. Whether you're a solo operator or managing a 50-person team, the All-Access Pass scales with your needs.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${titleBg})` }}
          />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="mb-8 flex justify-center">
                <img src={keyIcon} alt="All-Access Pass" className="w-32 h-32 object-contain" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                All-Access Pass
              </h1>
              <p className="text-xl text-gray-300">
                Stop piecing together scattered resources. Get every course, automation template, and tool we've built—plus all future updates—so you can save time, cut errors, and grow your business faster.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
              <div>
                <h2 className="text-3xl font-bold font-heading mb-8">What you get</h2>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold font-heading mb-2">$89</div>
                    <p className="text-muted-foreground">per month, billed monthly</p>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Cancel anytime</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>30-day money-back guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Instant access upon signup</span>
                    </li>
                  </ul>
                  <a 
                    href="https://www.servicetitanhacks.com/enroll/3344701"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full" size="lg" data-testid="button-purchase-pass">
                      Get Started Now
                    </Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-24 mt-24">
              <h2 className="text-3xl font-bold font-heading mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
                <FAQAccordion items={faqs} />
              </div>
            </div>

            <div className="bg-muted rounded-lg p-12 text-center">
              <h2 className="text-2xl font-bold font-heading mb-4">Risk-free guarantee</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Try the All-Access Pass for 30 days. If it doesn't deliver value, we'll refund every penny. No hard feelings, no questions asked.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
