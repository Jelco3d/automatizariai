export interface CaseStudyResult {
  timeReduction: string;
  costSaving: string;
  roi: string;
  timeline: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  category: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult;
  beforeAfter: BeforeAfter;
}

export interface Category {
  id: string;
  label: string;
}