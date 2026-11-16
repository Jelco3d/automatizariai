import BlogComments from "@/components/blog/BlogComments";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Share2, Link2, Check } from "lucide-react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { supabase } from "@/integrations/supabase/client";
import { absUrl, sanitizeHtml, SITE_URL, type BlogPostRow } from "@/lib/blog";

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

type Heading = { id: string; text: string };

/** Adds ids to h2s so the side outline can jump to them. */
function withHeadingIds(html: string): { html: string; headings: Heading[] } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const headings: Heading[] = [];
  doc.querySelectorAll("h2").forEach((h, i) => {
    const id = `s-${i + 1}`;
    h.id = id;
    headings.push({ id, text: h.textContent?.trim() ?? "" });
  });
  return { html: doc.body.innerHTML, headings };
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title, url }); } catch { /* cancelled */ } return; }
    await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const copy = async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const pill = "inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/15 text-sm font-semibold text-gray-200 hover:bg-white/5 hover:border-amber-400/40 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400";
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={share} className={pill}><Share2 className="w-4 h-4" />Distribuie</button>
      <button type="button" onClick={copy} aria-label="Copiază linkul" className={`${pill} px-3`}>{copied ? <Check className="w-4 h-4 text-amber-400" /> : <Link2 className="w-4 h-4" />}</button>
    </div>
  );
}

function Outline({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: "0px 0px -70% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);
  if (headings.length < 2) return null;
  return (
    <nav aria-label="Cuprins" className="group hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30">
      <ul className="space-y-2.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 rounded">
              <span className={`block h-0.5 rounded-full transition-all ${active === h.id ? "w-6 bg-amber-400" : "w-4 bg-gray-500"}`} />
              <span className={`max-w-[220px] truncate text-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition ${active === h.id ? "text-amber-300" : "text-gray-400"}`}>{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const shortDate = (d: string) => new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();

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
  const { html, headings } = useMemo(() => (post ? withHeadingIds(sanitizeHtml(post.content)) : { html: "", headings: [] }), [post]);
  const viewed = useRef(false);
  useEffect(() => {
    if (!post || viewed.current) return;
    viewed.current = true;
    let sid = sessionStorage.getItem("blog_sid");
    if (!sid) { sid = crypto.randomUUID(); sessionStorage.setItem("blog_sid", sid); }
    supabase.rpc("increment_post_view", { _slug: post.slug, _session: sid, _referrer: document.referrer || null }).then(() => {});
  }, [post]);

  if (post === null) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-[#1F2633] text-white">
      <Navigation />
      {post && <Outline headings={headings} />}
      <article className="mx-auto w-full max-w-[728px] px-5 pt-24 pb-20 md:pt-28">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-300 mb-8">
          <ArrowLeft className="w-4 h-4" /> Toate articolele
        </Link>
        {post === undefined ? (
          <div className="space-y-4 animate-pulse"><div className="h-12 bg-white/5 rounded w-3/4" /><div className="h-4 bg-white/5 rounded w-1/2" /><div className="h-96 bg-white/5 rounded" /></div>
        ) : (
          <>
            <header className="mb-8">
              <h1 className="text-[2rem] md:text-[2.6rem] font-black tracking-tight leading-[1.15] text-white">{post.title}</h1>
              {post.excerpt && <p className="mt-3 text-lg md:text-xl font-light text-gray-400 leading-snug">{post.excerpt}</p>}
              <div className="mt-6 flex items-center gap-3">
                <img src="/lovable-uploads/logo-256.webp" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-1 ring-amber-400/40" />
                <div className="leading-tight">
                  <p className="text-xs font-bold tracking-wide text-white">{(post.author_name || "AI Automatizări").toUpperCase()}</p>
                  <p className="mt-1 text-xs text-gray-400">{post.published_at && shortDate(post.published_at)} · {post.reading_time} MIN CITIRE</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-y border-white/10 py-3">
                <span className="text-sm text-gray-400">{post.views > 0 ? `${post.views} citiri` : ""}</span>
                <ShareButtons title={post.title} />
              </div>
              {post.cover_image && !post.cover_image.endsWith("/og-image.png") && (
                <img src={post.cover_image} alt="" className="mt-8 w-full rounded-lg aspect-video object-cover" />
              )}
            </header>
            <div
              className="prose prose-invert max-w-none text-[1.075rem] md:text-[1.15rem] leading-[1.75]
                prose-p:text-gray-200 prose-p:my-5 prose-li:text-gray-200 prose-li:my-1.5 prose-strong:text-white
                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-24
                prose-h2:text-[1.6rem] md:prose-h2:text-[1.9rem] prose-h2:mt-14 prose-h2:mb-5 prose-h3:text-xl prose-h3:mt-10
                prose-a:text-amber-300 prose-a:underline-offset-4
                prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-gray-100 prose-blockquote:pl-5 prose-blockquote:[quotes:none]
                prose-hr:border-white/10 prose-hr:my-12 prose-img:rounded-lg
                prose-th:text-amber-300 prose-td:text-gray-300 prose-code:text-amber-200
                [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full md:[&_table]:table
                [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <footer className="mt-14 border-t border-white/10 pt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <ShareButtons title={post.title} />
              <a href="/audit-gratuit" className="inline-flex justify-center items-center h-11 px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold transition">Cere auditul gratuit</a>
            </footer>
            <BlogComments postId={post.id} />
          </>
        )}
      </article>
      <Footer />
    </div>
  );
}
