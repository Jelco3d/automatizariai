import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatRoDate } from "@/lib/blog";
import { BOOKING_URL } from "@/config/booking";

type Card = {
  slug: string; title: string; excerpt: string | null; subtitle: string | null; author_name: string | null;
  published_at: string; cover_image: string | null; views: number | null;
};
type Sort = "latest" | "top";

export function BlogContent() {
  const [posts, setPosts] = useState<Card[] | null>(null);
  const [sort, setSort] = useState<Sort>("latest");
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    supabase.from("blog_posts").select("slug,title,excerpt,subtitle,author_name,published_at,cover_image,views")
      .eq("status", "published").lte("published_at", new Date().toISOString()).order("published_at", { ascending: false })
      .then(({ data }) => setPosts((data as Card[]) ?? []));
  }, []);

  const list = useMemo(() => {
    if (!posts) return null;
    const term = q.trim().toLowerCase();
    const f = term ? posts.filter((p) => `${p.title} ${p.excerpt ?? ""} ${p.subtitle ?? ""}`.toLowerCase().includes(term)) : posts;
    return [...f].sort((a, b) => sort === "top"
      ? (b.views ?? 0) - (a.views ?? 0)
      : +new Date(b.published_at) - +new Date(a.published_at));
  }, [posts, sort, q]);

  const tab = (v: Sort, label: string) => (
    <button type="button" onClick={() => setSort(v)} aria-pressed={sort === v}
      className={`px-2.5 py-1 rounded text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${sort === v ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
      {label}
    </button>
  );

  return (
    <div className="dark mx-auto max-w-[640px] px-4 pt-32 md:pt-36 pb-16">
      <h1 className="sr-only">Blog AI Automatizări</h1>
      <div className="flex items-center justify-between gap-3 mb-4">
        {searchOpen ? (
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Caută articole…" aria-label="Caută articole"
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            <button type="button" aria-label="Închide căutarea" onClick={() => { setSearchOpen(false); setQ(""); }}
              className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
        ) : (
          <>
            <div className="inline-flex gap-1 rounded-lg border border-border p-1">
              {tab("latest", "Recente")}{tab("top", "Populare")}
            </div>
            <button type="button" aria-label="Caută" onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-foreground hover:bg-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              <Search className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <section>
        {list === null && [0, 1, 2].map((i) => (
          <div key={i} className="flex gap-4 py-5 border-b border-border">
            <div className="flex-1 space-y-2"><div className="h-5 w-3/4 rounded bg-foreground/10 animate-pulse" /><div className="h-4 w-1/2 rounded bg-foreground/10 animate-pulse" /></div>
            <div className="w-28 md:w-40 aspect-[3/2] rounded bg-foreground/10 animate-pulse" />
          </div>
        ))}
        {list?.length === 0 && <p className="py-10 text-muted-foreground">{q ? "Niciun articol găsit." : "Încă nu există articole publicate."}</p>}
        {list?.map((post) => {
          const cover = post.cover_image && !post.cover_image.endsWith("/og-image.png") ? post.cover_image : null;
          return (
            <Link key={post.slug} to={`/blog/${post.slug}`}
              className="group flex items-start gap-4 md:gap-6 py-5 border-b border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              <article className="flex-1 min-w-0">
                <h2 className="text-base md:text-xl font-extrabold leading-snug text-foreground group-hover:text-primary transition">{post.title}</h2>
                {(post.subtitle || post.excerpt) && (
                  <p className="mt-1 text-sm md:text-base text-foreground/80 line-clamp-2">{post.subtitle || post.excerpt}</p>
                )}
                <p className="mt-2 text-[11px] md:text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatRoDate(post.published_at)}{post.author_name && ` • ${post.author_name}`}
                </p>
              </article>
              {cover && <img src={cover} alt="" loading="lazy" className="w-24 md:w-40 aspect-[3/2] shrink-0 rounded object-cover" />}
            </Link>
          );
        })}
      </section>

      <section className="mt-14 rounded-xl border border-border p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Vrei să discutăm 30 de minute despre afacerea ta?</h2>
        <p className="mt-2 text-muted-foreground">Primești în 48h un raport cu procesele din firma ta care pot fi automatizate, prioritizate după ROI.</p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-3d-gold inline-block mt-4 px-5 py-2.5 rounded-lg font-semibold">Programează o discuție de 30 de minute</a>
      </section>
    </div>
  );
}
