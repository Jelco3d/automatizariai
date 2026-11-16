import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchBlogSettings } from "@/lib/blogSettings";
import { formatRoDate } from "@/lib/blog";

type C = { id: string | null; author_name: string | null; content: string | null; created_at: string | null };

export default function BlogComments({ postId }: { postId: string }) {
  const [enabled, setEnabled] = useState(true);
  const [items, setItems] = useState<C[]>([]);
  const [f, setF] = useState({ name: "", email: "", content: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    fetchBlogSettings().then((s) => setEnabled(s.comments_enabled));
    supabase.from("blog_comments_public").select("id,author_name,content,created_at").eq("post_id", postId).order("created_at")
      .then(({ data }) => setItems(data ?? []));
  }, [postId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim() || f.content.trim().length < 2) return;
    setState("sending");
    const { error } = await supabase.from("blog_comments").insert({
      post_id: postId, author_name: f.name.trim().slice(0, 80), author_email: f.email.trim().slice(0, 200),
      content: f.content.trim().slice(0, 3000), status: "pending",
    });
    setState(error ? "error" : "sent");
    if (!error) setF({ name: "", email: "", content: "" });
  };

  const input = "w-full rounded-md bg-white/5 border border-white/10 px-3 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400";
  return (
    <section className="mt-14 border-t border-white/10 pt-10" aria-labelledby="comments-title">
      <h2 id="comments-title" className="text-2xl font-black tracking-tight">Comentarii {items.length > 0 && <span className="text-gray-500 font-normal">({items.length})</span>}</h2>
      <ul className="mt-6 space-y-6">
        {items.length === 0 && <li className="text-gray-400">Încă nu sunt comentarii.</li>}
        {items.map((c) => (
          <li key={c.id} className="border-l-2 border-amber-400/40 pl-4">
            <p className="text-sm font-semibold text-white">{c.author_name} <span className="font-normal text-gray-500">· {c.created_at && formatRoDate(c.created_at)}</span></p>
            <p className="mt-1 text-gray-200 whitespace-pre-line break-words">{c.content}</p>
          </li>
        ))}
      </ul>
      {enabled && (
        state === "sent" ? (
          <p className="mt-8 rounded-md border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100">Mulțumim! Comentariul tău va apărea după ce este aprobat.</p>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-3">
            <h3 className="font-semibold">Lasă un comentariu</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required maxLength={80} placeholder="Nume" aria-label="Nume" className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              <input required type="email" maxLength={200} placeholder="Email (nu va fi afișat)" aria-label="Email" className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            </div>
            <textarea required minLength={2} maxLength={3000} rows={4} placeholder="Comentariul tău" aria-label="Comentariu" className={input} value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} />
            {state === "error" && <p className="text-sm text-red-400">Nu am putut trimite comentariul. Încearcă din nou.</p>}
            <button disabled={state === "sending"} className="h-11 px-6 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-amber-300">{state === "sending" ? "Se trimite…" : "Trimite comentariul"}</button>
          </form>
        )
      )}
    </section>
  );
}
