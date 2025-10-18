import FAQAccordion from "../FAQAccordion";

export default function FAQAccordionExample() {
  const faqs = [
    {
      question: "What's included in the All-Access Pass?",
      answer: "You get unlimited access to all courses, downloadable resources, calculators, and monthly live Q&A calls with industry experts.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No questions asked.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your purchase in full.",
    },
  ];

  return (
    <div className="max-w-2xl">
      <FAQAccordion items={faqs} />
    </div>
  );
}
