export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMin: number;
  heroImage?: string;
  tags: string[];
};

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "cost-automatizare-ai-romania-2026",
    title:
      "Cât costă automatizarea cu AI în România 2026? Ghid complet cu prețuri reale și ROI",
    description:
      "Ghid complet pentru bugetul unei automatizări AI în România 2026: prețuri reale, scenarii concrete, formula ROI și erori de evitat.",
    author: "Erdelean Jelco",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    readingTimeMin: 14,
    heroImage: "/og-image.png",
    tags: [
      "Cost automatizare AI",
      "ROI",
      "n8n",
      "Ghid 2026",
      "IMM România",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
