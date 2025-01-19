import { CaseStudy, Category } from "@/types/portfolio";

export const categories: Category[] = [
  { id: "productivity", label: "Productivitate" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "sales", label: "Vânzări" },
  { id: "more", label: "Și Altele" },
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
    client: "Luxury Watch Store",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Manual product customization and order processing",
    solution: "Implemented automated product configurator and order workflow",
    results: {
      timeReduction: "85%",
      costSaving: "$120,000 annually",
      roi: "400%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual customization process, 2-day order processing",
      after: "Instant customization, same-day processing"
    }
  },
  {
    client: "Organic Food Market",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Complex subscription management and delivery scheduling",
    solution: "Automated subscription system with smart delivery optimization",
    results: {
      timeReduction: "70%",
      costSaving: "$90,000 annually",
      roi: "350%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "Manual subscription tracking",
      after: "Automated subscription management"
    }
  },
  {
    client: "Designer Furniture Store",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Inefficient made-to-order process and stock management",
    solution: "Implemented automated production tracking and inventory forecasting",
    results: {
      timeReduction: "75%",
      costSaving: "$150,000 annually",
      roi: "425%",
      timeline: "4 months"
    },
    beforeAfter: {
      before: "Manual production tracking",
      after: "Real-time production monitoring"
    }
  },
  {
    client: "Wellness Products Brand",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Complex multi-channel inventory management",
    solution: "Implemented cross-platform inventory synchronization",
    results: {
      timeReduction: "80%",
      costSaving: "$100,000 annually",
      roi: "375%",
      timeline: "2.5 months"
    },
    beforeAfter: {
      before: "Manual inventory updates across channels",
      after: "Automated multi-channel sync"
    }
  },
  {
    client: "Vintage Collectibles Shop",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Manual authentication and pricing process",
    solution: "Automated authentication workflow and dynamic pricing system",
    results: {
      timeReduction: "65%",
      costSaving: "$80,000 annually",
      roi: "300%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "Manual authentication process",
      after: "Streamlined authentication workflow"
    }
  },
  {
    client: "Handmade Crafts Marketplace",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Complex artist payments and commission tracking",
    solution: "Automated payment distribution and commission calculation",
    results: {
      timeReduction: "90%",
      costSaving: "$130,000 annually",
      roi: "450%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual payment processing",
      after: "Instant automated payments"
    }
  },
  {
    client: "Premium Pet Supplies",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Inefficient personalized product recommendations",
    solution: "AI-powered recommendation engine with pet profiles",
    results: {
      timeReduction: "75%",
      costSaving: "$95,000 annually",
      roi: "380%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "Generic product suggestions",
      after: "Personalized pet-specific recommendations"
    }
  },
  {
    client: "Athletic Wear Brand",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Complex size recommendation system",
    solution: "Implemented AI size prediction algorithm",
    results: {
      timeReduction: "70%",
      costSaving: "$110,000 annually",
      roi: "400%",
      timeline: "2.5 months"
    },
    beforeAfter: {
      before: "High return rate due to sizing issues",
      after: "50% reduction in size-related returns"
    }
  },
  {
    client: "Gourmet Coffee Roaster",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Manual subscription customization and roasting schedule",
    solution: "Automated subscription preferences and production planning",
    results: {
      timeReduction: "85%",
      costSaving: "$75,000 annually",
      roi: "350%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "Manual roasting schedule management",
      after: "Automated production optimization"
    }
  },
  {
    client: "Custom Printing Service",
    industry: "Shopify Ecommerce",
    category: "ecommerce",
    challenge: "Complex design approval and production workflow",
    solution: "Automated design verification and production pipeline",
    results: {
      timeReduction: "80%",
      costSaving: "$140,000 annually",
      roi: "425%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual design review process",
      after: "Automated design verification"
    }
  },
  {
    client: "Enterprise Solutions Provider",
    industry: "B2B Sales",
    category: "sales",
    challenge: "Complex enterprise sales cycle management",
    solution: "Implemented AI-driven sales pipeline automation",
    results: {
      timeReduction: "60%",
      costSaving: "$300,000 annually",
      roi: "500%",
      timeline: "4 months"
    },
    beforeAfter: {
      before: "6-month average sales cycle",
      after: "2.5-month average sales cycle"
    }
  },
  {
    client: "Financial Services Firm",
    industry: "Financial Sales",
    category: "sales",
    challenge: "Manual client portfolio management",
    solution: "Automated portfolio tracking and opportunity detection",
    results: {
      timeReduction: "75%",
      costSaving: "$250,000 annually",
      roi: "450%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual portfolio review",
      after: "Real-time portfolio optimization"
    }
  },
  {
    client: "Manufacturing Equipment",
    industry: "Industrial Sales",
    category: "sales",
    challenge: "Complex quote generation process",
    solution: "Automated quote generation and approval workflow",
    results: {
      timeReduction: "85%",
      costSaving: "$200,000 annually",
      roi: "400%",
      timeline: "2.5 months"
    },
    beforeAfter: {
      before: "48-hour quote turnaround",
      after: "Instant quote generation"
    }
  },
  {
    client: "Healthcare Solutions",
    industry: "Medical Sales",
    category: "sales",
    challenge: "Compliance-heavy sales documentation",
    solution: "Automated compliance verification and documentation",
    results: {
      timeReduction: "70%",
      costSaving: "$180,000 annually",
      roi: "380%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual compliance checks",
      after: "Automated compliance verification"
    }
  },
  {
    client: "Cloud Services Provider",
    industry: "Tech Sales",
    category: "sales",
    challenge: "Complex service bundling and pricing",
    solution: "AI-powered service configuration and pricing engine",
    results: {
      timeReduction: "80%",
      costSaving: "$350,000 annually",
      roi: "520%",
      timeline: "4 months"
    },
    beforeAfter: {
      before: "Manual service configuration",
      after: "Instant bundle optimization"
    }
  },
  {
    client: "Lead Generation Pro",
    industry: "B2B Sales",
    category: "sales",
    challenge: "Manual lead identification and qualification process",
    solution: "AI-powered lead scoring and qualification system",
    results: {
      timeReduction: "88%",
      costSaving: "$280,000 annually",
      roi: "490%",
      timeline: "2 months"
    },
    beforeAfter: {
      before: "Manual lead qualification",
      after: "Automated lead scoring and prioritization"
    }
  },
  {
    client: "Email Campaign Master",
    industry: "Digital Marketing",
    category: "sales",
    challenge: "Inefficient email campaign management and personalization",
    solution: "AI-driven email marketing automation platform",
    results: {
      timeReduction: "92%",
      costSaving: "$320,000 annually",
      roi: "510%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual email campaign creation",
      after: "Automated personalized campaigns"
    }
  },
  {
    client: "Social Sales Connect",
    industry: "Social Selling",
    category: "sales",
    challenge: "Disconnected social media lead generation efforts",
    solution: "Integrated social media prospecting and engagement platform",
    results: {
      timeReduction: "85%",
      costSaving: "$240,000 annually",
      roi: "460%",
      timeline: "2.5 months"
    },
    beforeAfter: {
      before: "Manual social media prospecting",
      after: "Automated social lead generation"
    }
  },
  {
    client: "Sales Intelligence Hub",
    industry: "Sales Analytics",
    category: "sales",
    challenge: "Limited visibility into sales opportunities and trends",
    solution: "AI-powered sales intelligence and forecasting platform",
    results: {
      timeReduction: "78%",
      costSaving: "$290,000 annually",
      roi: "480%",
      timeline: "3.5 months"
    },
    beforeAfter: {
      before: "Manual sales analysis",
      after: "Real-time sales intelligence"
    }
  },
  {
    client: "Pipeline Optimizer",
    industry: "Sales Operations",
    category: "sales",
    challenge: "Inefficient sales pipeline management",
    solution: "Automated pipeline optimization and deal tracking system",
    results: {
      timeReduction: "82%",
      costSaving: "$310,000 annually",
      roi: "495%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual pipeline updates",
      after: "Automated pipeline management"
    }
  },
  {
    client: "Account Based Marketing Pro",
    industry: "B2B Marketing",
    category: "sales",
    challenge: "Fragmented ABM campaign execution",
    solution: "Integrated ABM automation platform",
    results: {
      timeReduction: "87%",
      costSaving: "$270,000 annually",
      roi: "470%",
      timeline: "2.5 months"
    },
    beforeAfter: {
      before: "Manual ABM campaign management",
      after: "Automated multi-channel ABM"
    }
  },
  {
    client: "Sales Engagement Suite",
    industry: "Sales Technology",
    category: "sales",
    challenge: "Inconsistent sales engagement processes",
    solution: "Automated multi-channel sales engagement platform",
    results: {
      timeReduction: "90%",
      costSaving: "$330,000 annually",
      roi: "530%",
      timeline: "3 months"
    },
    beforeAfter: {
      before: "Manual engagement tracking",
      after: "Automated engagement orchestration"
    }
  }
];
