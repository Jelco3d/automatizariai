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
    slug: "automatizari-ai",
    title: "Automatizări AI pentru IMM-uri: ghid practic pentru patroni",
    description:
      "Automatizările AI sunt fluxuri de lucru în care aplicațiile firmei preiau singure sarcinile repetitive (emailuri, oferte, facturi, răspunsuri la clienți), iar inteligența artificială se ocupă de partea cu text: citește, sortează și pregătește răspunsuri. Pentru un IMM din România, primul pas nu este alegerea unei aplicații, ci o listă scrisă cu sarcinile pe care echipa le face de mână în fiecare săptămână. Din lista aceea alegi un singur proces, îl automatizezi, îl verifici și abia apoi treci la următorul.",
    author: "AI Automatizări",
    publishedAt: "2026-11-15",
    updatedAt: "2026-11-15",
    readingTimeMin: 10,
    heroImage: "/og-image.png",
    tags: ["Automatizări AI", "IMM-uri"],
  },
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
