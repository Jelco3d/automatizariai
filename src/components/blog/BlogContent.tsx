import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatRoDate } from "@/lib/blog";

type Card = { slug: string; title: string; excerpt: string | null; author_name: string | null; published_at: string; reading_time: number };

export function BlogContent() {
  const [posts, setPosts] = useState<Card[] | null>(null);
  useEffect(() => {
    supabase.from("blog_posts").select("slug,title,excerpt,author_name,published_at,reading_time")
      .eq("status", "published").lte("published_at", new Date().toISOString()).order("published_at", { ascending: false })
      .then(({ data }) => setPosts((data as Card[]) ?? []));
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 space-y-16 max-w-5xl">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400">Blog AI Automatizări</h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Ghiduri, studii de caz și articole practice despre automatizare AI, AEO/GEO și creștere
          pentru IMM-urile din România. Scrise de Erdelean Jelco, fondator AI Automatizări.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts === null && [0, 1].map((i) => <div key={i} className="h-56 rounded-xl bg-white/[0.03] border border-white/[0.08] animate-pulse" />)}
        {posts?.length === 0 && <p className="text-gray-400">Încă nu există articole publicate.</p>}
        {posts?.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`}
            className="group block rounded-xl bg-white/[0.03] border border-white/[0.08] p-6 transition hover:bg-white/[0.05] hover:border-amber-400/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400">
            <article className="space-y-4">
              <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition">{post.title}</h2>
              {post.excerpt && <p className="text-gray-400 text-sm line-clamp-4">{post.excerpt}</p>}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                {post.author_name && <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /><span>{post.author_name}</span></div>}
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><span>{formatRoDate(post.published_at)}</span></div>
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{post.reading_time} min</span></div>
                <span className="ml-auto inline-flex items-center gap-1 text-amber-300 group-hover:gap-2 transition-all">Citește <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <section className="rounded-xl bg-amber-500/10 border border-amber-400/20 p-8 md:p-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Vrei un audit gratuit pentru afacerea ta?</h2>
          <p className="text-gray-300">Primești în 48h un raport cu procesele din firma ta care pot fi automatizate, prioritizate după ROI. Zero risc, zero angajament.</p>
          <a href="https://calendly.com/erdeleanjelco8/30min" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition">Cere auditul gratuit</a>
        </div>
      </section>
    </div>
  );
}
