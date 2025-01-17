import { CaseStudy, Category } from "@/types/portfolio";

export const categories: Category[] = [
  { id: "productivity", label: "Productivity" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "sales", label: "Sales" },
  { id: "more", label: "And More" },
];

export const caseStudies: CaseStudy[] = [
  {
    client: "Personal AI Assistant",
    industry: "Personal Productivity",
    category: "productivity",
    challenge: "Managing daily tasks, scheduling, and personal organization manually",
    solution: "Implemented a comprehensive AI assistant for task management, calendar organization, and personal workflow automation",
    results: {
      timeReduction: "80%",
      costSaving: "$150,000 annually",
      roi: "450%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "6+ hours daily on personal management",
      after: "Automated task handling, smart scheduling"
    }
  },
    {
      client: "AI Email Assistant",
      industry: "Business Process Automation",
      category: "productivity",
      challenge: "Managing high volume of emails, scheduling, and client communication manually",
      solution: "Implemented an AI-powered email assistant for automated response handling, appointment scheduling, and client communication management",
      results: {
        timeReduction: "95%",
        costSaving: "$200,000 annually",
        roi: "500%",
        timeline: "1 month"
      },
      beforeAfter: {
        before: "4+ hours daily on email management",
        after: "Automated responses, instant scheduling"
      }
    },
    {
      client: "AI Meeting Assistant",
      industry: "Corporate Productivity",
      category: "productivity",
      challenge: "Time wasted in unproductive meetings and manual note-taking",
      solution: "Developed an AI meeting assistant for automated transcription, action item extraction, and follow-up management",
      results: {
        timeReduction: "70%",
        costSaving: "$180,000 annually",
        roi: "400%",
        timeline: "3 months"
      },
      beforeAfter: {
        before: "3+ hours daily on meeting management",
        after: "Automated transcripts and action items"
      }
    },
    {
      client: "Document Processing AI",
      industry: "Legal Services",
      category: "productivity",
      challenge: "Manual document review and data extraction taking excessive time",
      solution: "Implemented AI-powered document analysis and data extraction system",
      results: {
        timeReduction: "85%",
        costSaving: "$300,000 annually",
        roi: "550%",
        timeline: "4 months"
      },
      beforeAfter: {
        before: "8+ hours per document batch",
        after: "15 minutes per batch with AI"
      }
    },
    {
      client: "AI Research Assistant",
      industry: "Academic Research",
      category: "productivity",
      challenge: "Time-consuming literature review and research synthesis process",
      solution: "Developed an AI-powered research assistant for automated paper analysis, summary generation, and citation management",
      results: {
        timeReduction: "75%",
        costSaving: "$100,000 annually",
        roi: "350%",
        timeline: "2 months"
      },
      beforeAfter: {
        before: "40+ hours per research paper review",
        after: "10 hours with AI assistance"
      }
    },
    {
      client: "AI Writing Assistant",
      industry: "Content Creation",
      category: "productivity",
      challenge: "Slow content creation and editing process",
      solution: "Implemented an AI writing assistant for content generation, editing, and style consistency",
      results: {
        timeReduction: "65%",
        costSaving: "$90,000 annually",
        roi: "300%",
        timeline: "1.5 months"
      },
      beforeAfter: {
        before: "20+ hours per content piece",
        after: "7 hours with AI assistance"
      }
    },
    {
      client: "Project Management AI",
      industry: "Software Development",
      category: "productivity",
      challenge: "Inefficient project tracking and resource allocation",
      solution: "Created an AI-powered project management system for automated task assignment and progress tracking",
      results: {
        timeReduction: "55%",
        costSaving: "$200,000 annually",
        roi: "400%",
        timeline: "3 months"
      },
      beforeAfter: {
        before: "30+ hours weekly on project management",
        after: "13 hours with AI automation"
      }
    },
  {
    client: "TechCorp Solutions",
    industry: "Manufacturing",
    category: "ecommerce",
    challenge: "Manual data processing taking 40+ hours weekly",
    solution: "Implemented AI-powered document processing",
    results: {
      timeReduction: "85%",
      costSaving: "$120,000 annually",
      roi: "380%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual data entry, high error rates",
      after: "Automated processing, 99.9% accuracy"
    }
  },
  {
    client: "SmartCart",
    industry: "E-commerce Platform",
    category: "ecommerce",
    challenge: "Inefficient inventory management and product recommendations",
    solution: "AI-powered inventory forecasting and personalized recommendation engine",
    results: {
      timeReduction: "75%",
      costSaving: "$300,000 annually",
      roi: "420%",
      timeline: "4 months"
    },
    beforeAfter: {
      before: "Manual inventory tracking, generic recommendations",
      after: "Automated restocking, 40% higher conversion rate"
    }
  },
  {
    client: "FashionFlow",
    industry: "Online Retail",
    category: "ecommerce",
    challenge: "Customer support overwhelm and return processing delays",
    solution: "Implemented AI chatbot and automated return management system",
    results: {
      timeReduction: "80%",
      costSaving: "$250,000 annually",
      roi: "390%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "48hr support response time, manual returns",
      after: "Instant responses, automated returns processing"
    }
  },
  {
    client: "GlobalMart",
    industry: "Multi-channel Retail",
    category: "ecommerce",
    challenge: "Complex multi-channel order management and fulfillment",
    solution: "Automated order processing and smart fulfillment system",
    results: {
      timeReduction: "70%",
      costSaving: "$400,000 annually",
      roi: "450%",
      timeline: "5 months"
    },
    beforeAfter: {
      before: "Manual order routing, shipping delays",
      after: "Automated fulfillment, same-day shipping"
    }
  },
    {
      client: "Global Logistics Inc",
      industry: "Transportation",
      category: "sales",
      challenge: "Inefficient route planning and scheduling",
      solution: "AI route optimization system",
      results: {
        timeReduction: "60%",
        costSaving: "$250,000 annually",
        roi: "450%",
        timeline: "4 months"
      },
      beforeAfter: {
        before: "Manual route planning, fuel wastage",
        after: "Optimized routes, 40% fuel savings"
      }
    },
    {
      client: "FinTech Innovations",
      industry: "Financial Services",
      category: "more",
      challenge: "Customer support backlog of 72+ hours",
      solution: "AI chatbot and ticket automation",
      results: {
        timeReduction: "90%",
        costSaving: "$180,000 annually",
        roi: "320%",
        timeline: "2 months"
      },
      beforeAfter: {
        before: "72-hour response time",
        after: "Instant responses, 95% satisfaction"
      }
    }
];
