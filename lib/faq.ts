export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "How much does a website cost?",
    answer:
      "It depends on scope — a focused marketing site typically starts around $3,000–$8,000, while a full web application with custom features runs higher. We give you a fixed quote after a short discovery call, so there's never a surprise invoice.",
  },
  {
    question: "How long does development take?",
    answer:
      "A marketing website usually takes 2–4 weeks. A full product build — with custom backend, integrations, and testing — typically runs 6–12 weeks depending on complexity. We share a realistic timeline before any work begins, not after.",
  },
  {
    question: "Do you provide maintenance?",
    answer:
      "Yes. Every project includes a support window after launch, and we offer ongoing maintenance plans for updates, monitoring, security patches, and new features — so your product keeps running smoothly long after we ship it.",
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer:
      "Absolutely. We regularly join existing teams as embedded engineers or take over legacy codebases for modernization. We'll start with a technical audit so we understand what we're working with before making changes.",
  },
];
