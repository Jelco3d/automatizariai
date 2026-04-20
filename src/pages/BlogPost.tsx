import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { getPostBySlug } from "@/data/blog-posts";
import { CostAutomatizareAIRomania2026 } from "@/data/blog-posts/cost-automatizare-ai-romania-2026";

const POST_COMPONENTS: Record<string, () => JSX.Element> = {
  "cost-automatizare-ai-romania-2026": CostAutomatizareAIRomania2026,
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const PostContent = slug ? POST_COMPONENTS[slug] : undefined;

  useEffect(() => {
    if (!post) return;

    const prevTitle = document.title;
    document.title = post.title;

    const descMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descMeta?.content;
    if (descMeta) descMeta.content = post.description;

    const canonicalUrl = `https://aiautomatizari.ro/blog/${post.slug}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    const prevCanonical = canonicalLink.href;
    canonicalLink.href = canonicalUrl;

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      author: {
        "@type": "Person",
        name: post.author,
        url: "https://aiautomatizari.ro/about",
      },
      publisher: {
        "@type": "Organization",
        name: "AI Automatizări",
        url: "https://aiautomatizari.ro",
        logo: {
          "@type": "ImageObject",
          url: "https://aiautomatizari.ro/lovable-uploads/new-logo.png",
        },
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      image: `https://aiautomatizari.ro${post.heroImage ?? "/og-image.png"}`,
      inLanguage: "ro-RO",
      keywords: post.tags.join(", "),
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Cât durează implementarea unei automatizări AI simple?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pentru un flow simplu (chatbot cu 3-5 intenții, sau o automatizare email), implementarea durează 3-7 zile lucrătoare. Un pachet Standard (3-5 flows integrate) durează 2-4 săptămâni.",
          },
        },
        {
          "@type": "Question",
          name: "Am nevoie de dev intern pentru a gestiona o automatizare AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nu, dacă alegi un stack managed (n8n Cloud sau Make) și cineva în echipă e confortabil cu no-code. Da, dacă alegi self-hosted sau vrei integrări custom cu sisteme legacy.",
          },
        },
        {
          "@type": "Question",
          name: "Cât costă un chatbot WhatsApp AI pentru o afacere mică?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pentru o afacere mică (50-200 conversații/zi), bugetul tipic este 1.500-3.000 EUR setup plus 150-250 EUR/lună (inclusiv WhatsApp Business API).",
          },
        },
        {
          "@type": "Question",
          name: "Este compatibil cu GDPR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Da, dacă e implementat corect: DPA cu fiecare furnizor, infrastructură în UE, anonimizare/pseudonimizare datelor sensibile înainte de trimitere la LLM, logs accesibile pentru exercitarea drepturilor GDPR.",
          },
        },
        {
          "@type": "Question",
          name: "Cât costă doar auditul?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La AI Automatizări, auditul este gratuit — rezultate în 48h, fără angajament. Primești o listă concretă de procese automatizabile, prioritizate după ROI.",
          },
        },
        {
          "@type": "Question",
          name: "Diferența între RPA clasic și automatizare AI — care e mai ieftin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Automatizarea AI e tipic 3-5 ori mai ieftină pentru IMM-uri față de RPA clasic enterprise, pentru cazuri de uz echivalente. AI automation câștigă la procese cu text liber și decizii contextuale.",
          },
        },
      ],
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: "https://aiautomatizari.ro/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://aiautomatizari.ro/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
      ],
    };

    const scripts: HTMLScriptElement[] = [];
    for (const data of [articleSchema, faqSchema, breadcrumbSchema]) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.blogPostSeo = "true";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      scripts.push(s);
    }

    return () => {
      document.title = prevTitle;
      if (descMeta && prevDesc !== undefined) descMeta.content = prevDesc;
      if (canonicalLink && prevCanonical) canonicalLink.href = prevCanonical;
      scripts.forEach((s) => s.remove());
    };
  }, [post]);

  if (!slug || !post || !PostContent) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      <article className="container mx-auto px-4 py-24 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Înapoi la blog
        </Link>

        <header className="space-y-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Publicat{" "}
                {new Date(post.publishedAt).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTimeMin} min citire</span>
            </div>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-purple-300 space-y-8">
          <PostContent />
        </div>
      </article>
      <Footer />
    </div>
  );
}
