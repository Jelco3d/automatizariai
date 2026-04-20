import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";

export function BlogContent() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-16 max-w-5xl">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          Blog AI Automatizări
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Ghiduri, studii de caz și articole practice despre automatizare AI, AEO/GEO și creștere
          pentru IMM-urile din România. Scrise de Erdelean Jelco, fondator AI Automatizări.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-xl bg-white/[0.03] border border-white/[0.08] p-6 transition hover:bg-white/[0.05] hover:border-purple-400/30"
          >
            <article className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-t border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("ro-RO", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTimeMin} min</span>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-purple-300 group-hover:gap-2 transition-all">
                  Citește <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <section className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 p-8 md:p-12">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Vrei un audit gratuit pentru afacerea ta?
          </h2>
          <p className="text-gray-300">
            Primești în 48h un raport cu procesele din firma ta care pot fi automatizate, prioritizate
            după ROI. Zero risc, zero angajament.
          </p>
          <Link
            to="/audit-gratuit"
            className="inline-block mt-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
          >
            Cere auditul gratuit →
          </Link>
        </div>
      </section>
    </div>
  );
}
