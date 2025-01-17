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
  },
  {
    client: "Fashion Boutique Store",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Manual inventory management and order processing causing delays",
    solution: "Implemented automated inventory sync and order fulfillment system",
    results: {
      timeReduction: "75%",
      costSaving: "$50,000 annually",
      roi: "300%",
      timeline: "6 weeks"
    },
    beforeAfter: {
      before: "4 hours daily on order processing",
      after: "Automated processing within minutes"
    }
  },
  {
    client: "Luxury Cosmetics Brand",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Inefficient customer support and product recommendation system",
    solution: "Implemented AI-powered chatbot and personalized recommendation engine",
    results: {
      timeReduction: "65%",
      costSaving: "$80,000 annually",
      roi: "400%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "Manual customer support, generic recommendations",
      after: "24/7 AI support, personalized shopping experience"
    }
  },
  {
    client: "Artisanal Food Market",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Complex shipping logistics and delivery tracking",
    solution: "Automated shipping integration with real-time tracking updates",
    results: {
      timeReduction: "70%",
      costSaving: "$40,000 annually",
      roi: "250%",
      timeline: "1 month"
    },
    beforeAfter: {
      before: "Manual shipping label creation and tracking",
      after: "Automated shipping process with real-time updates"
    }
  },
  {
    client: "Sustainable Fashion Brand",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Manual social media content management and product launches",
    solution: "Automated social media integration and product launch system",
    results: {
      timeReduction: "80%",
      costSaving: "$60,000 annually",
      roi: "350%",
      timeline: "6 weeks"
    },
    beforeAfter: {
      before: "5+ hours daily on social media management",
      after: "Automated content scheduling and product syncing"
    }
  },
  {
    client: "Handmade Jewelry Store",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Inefficient inventory tracking and product variant management",
    solution: "Implemented automated inventory and variant control system",
    results: {
      timeReduction: "85%",
      costSaving: "$45,000 annually",
      roi: "275%",
      timeline: "5 weeks"
    },
    beforeAfter: {
      before: "Manual inventory counts and variant updates",
      after: "Real-time inventory sync across all channels"
    }
  },
  {
    client: "Digital Marketing Agency",
    industry: "Marketing Services",
    category: "sales",
    challenge: "Manual campaign reporting and analytics tracking",
    solution: "Implemented automated reporting system with real-time analytics dashboard",
    results: {
      timeReduction: "75%",
      costSaving: "$120,000 annually",
      roi: "380%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "20+ hours weekly on reporting",
      after: "Automated reports in minutes"
    }
  },
  {
    client: "Real Estate Firm",
    industry: "Real Estate",
    category: "sales",
    challenge: "Inefficient lead management and follow-up process",
    solution: "Automated lead scoring and nurturing system",
    results: {
      timeReduction: "65%",
      costSaving: "$90,000 annually",
      roi: "320%",
      timeline: "6 weeks"
    },
    beforeAfter: {
      before: "Manual lead tracking and follow-ups",
      after: "Automated lead nurturing sequences"
    }
  },
  {
    client: "B2B Software Company",
    industry: "Software Sales",
    category: "sales",
    challenge: "Long sales cycle and manual proposal creation",
    solution: "Automated proposal generation and follow-up system",
    results: {
      timeReduction: "70%",
      costSaving: "$150,000 annually",
      roi: "400%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "2+ weeks sales cycle",
      after: "5-day average sales cycle"
    }
  },
  {
    client: "Insurance Agency",
    industry: "Insurance",
    category: "sales",
    challenge: "Manual policy renewal and customer outreach",
    solution: "Automated renewal notifications and customer engagement system",
    results: {
      timeReduction: "80%",
      costSaving: "$100,000 annually",
      roi: "350%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "15+ hours weekly on renewals",
      after: "Automated renewal management"
    }
  },
  {
    client: "SaaS Startup",
    industry: "Technology",
    category: "sales",
    challenge: "Inefficient customer onboarding and training",
    solution: "Automated onboarding sequence and training platform",
    results: {
      timeReduction: "85%",
      costSaving: "$200,000 annually",
      roi: "450%",
      timeline: "4 months"
    },
    beforeAfter: {
      before: "Manual onboarding process",
      after: "Streamlined automated onboarding"
    }
  }
];