import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { supabase } from "@/integrations/supabase/client";
import { absUrl, formatRoDate, sanitizeHtml, SITE_URL, type BlogPostRow } from "@/lib/blog";

function useHeadTags(post: BlogPostRow | null) {
  useEffect(() => {
    if (!post) return;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const title = post.seo_title || post.title;
    const desc = post.seo_description || post.excerpt || "";
    const image = absUrl(post.og_image || post.cover_image);
    const prevTitle = document.title;
    document.title = title;
    const restore: Array<() => void> = [];
    const meta = (attr: string, key: string, content: string) => {
      let t = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      const created = !t;
      if (!t) { t = document.createElement("meta"); t.setAttribute(attr, key); document.head.appendChild(t); }
      const prev = t.getAttribute("content");
      t.setAttribute("content", content);
      restore.push(() => (created ? t!.remove() : prev !== null && t!.setAttribute("content", prev)));
    };
    meta("name", "description", desc);
    meta("property", "og:title", title);
    meta("property", "og:description", desc);
    meta("property", "og:url", url);
    meta("property", "og:type", "article");
    meta("property", "og:image", image);
    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonCreated = !canon;
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    const prevCanon = canon.getAttribute("href");
    canon.href = url;
    const schemas: unknown[] = [
      {
        "@context": "https://schema.org", "@type": "Article", headline: post.title, description: desc,
        author: { "@type": "Person", name: post.author_name || "Erdelean Jelco", url: `${SITE_URL}/about` },
        publisher: { "@type": "Organization", name: "AI Automatizări", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/lovable-uploads/logo-256.png` } },
        datePublished: post.published_at, dateModified: post.updated_at, mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image, inLanguage: "ro-RO",
      },
      {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Acasă", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      ...(Array.isArray(post.json_ld) ? post.json_ld : []),
    ];
    const scripts = schemas.map((d) => {
      const s = document.createElement("script");
      s.type = "application/ld+json"; s.text = JSON.stringify(d);
      document.head.appendChild(s); return s;
    });
    return () => {
      document.title = prevTitle;
      restore.forEach((r) => r());
      if (canonCreated) canon!.remove(); else if (prevCanon) canon!.href = prevCanon;
      scripts.forEach((s) => s.remove());
    };
  }, [post]);
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostRow | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    setPost(undefined);
    supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => setPost((data as BlogPostRow) ?? null));
  }, [slug]);

  useHeadTags(post ?? null);
  const html = useMemo(() => (post ? sanitizeHtml(post.content) : ""), [post]);

  if (post === null) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      <article className="container mx-auto px-4 py-24 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8">
          <ArrowLeft className="w-4 h-4" /> Înapoi la blog
        </Link>
        {post === undefined ? (
          <div className="space-y-4 animate-pulse"><div className="h-12 bg-white/5 rounded w-3/4" /><div className="h-4 bg-white/5 rounded w-1/3" /><div className="h-96 bg-white/5 rounded" /></div>
        ) : (
          <>
            <header className="space-y-6 mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-amber-400 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                {post.author_name && <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{post.author_name}</span></div>}
                {post.published_at && <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>Publicat {formatRoDate(post.published_at)}</span></div>}
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.reading_time} min citire</span></div>
              </div>
              {post.cover_image && !post.cover_image.endsWith("/og-image.png") && (
                <img src={post.cover_image} alt="" className="w-full rounded-xl aspect-video object-cover" />
              )}
            </header>
            <div
              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-amber-300 prose-th:text-amber-300 prose-td:text-gray-300 [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full md:[&_table]:table prose-img:rounded-lg [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </>
        )}
      </article>
      <Footer />
    </div>
  );
}
