import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { slugify, uploadBlogImage, sanitizeHtml } from "@/lib/blog";

type Category = { id: string; name: string };
type Status = "draft" | "scheduled" | "published" | "archived";

const field = "bg-[#0F1117] border-amber-500/20 text-white placeholder:text-gray-500";
const Label = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
  <div className="flex items-center justify-between mb-1.5">
    <span className="text-sm font-medium text-gray-200">{children}</span>
    {hint && <span className="text-xs text-gray-400">{hint}</span>}
  </div>
);

const toLocalInput = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");

export default function NewBlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [slugTouched, setSlugTouched] = useState(!!id);
  const [f, setF] = useState({
    title: "", slug: "", excerpt: "", content: "", cover_image: "", category_id: "",
    seo_title: "", seo_description: "", author_name: "Erdelean Jelco", status: "draft" as Status,
    scheduled_at: "", published_at: null as string | null,
  });
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    supabase.from("blog_categories").select("id,name").order("name").then(({ data }) => setCategories(data ?? []));
    if (!id) return;
    supabase.from("blog_posts").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error || !data) { toast.error("Articolul nu a fost găsit"); navigate("/admin/blog"); return; }
      setF({
        title: data.title, slug: data.slug, excerpt: data.excerpt ?? "", content: data.content,
        cover_image: data.cover_image ?? "", category_id: data.category_id ?? "", seo_title: data.seo_title ?? "",
        seo_description: data.seo_description ?? "", author_name: data.author_name ?? "", status: data.status as Status,
        scheduled_at: toLocalInput(data.scheduled_at), published_at: data.published_at,
      });
      setLoading(false);
    });
  }, [id, navigate]);

  const onTitle = (v: string) => { set("title", v); if (!slugTouched) set("slug", slugify(v)); };

  const onCover = async (file?: File) => {
    if (!file) return;
    try { set("cover_image", await uploadBlogImage(file)); } catch { toast.error("Nu am putut încărca imaginea"); }
  };

  const save = async (status: Status) => {
    if (!f.title.trim()) return toast.error("Adaugă un titlu");
    const slug = slugify(f.slug || f.title);
    if (!slug) return toast.error("Adresa articolului nu e validă");
    if (status === "scheduled" && !f.scheduled_at) return toast.error("Alege data și ora programării");
    if (status === "scheduled" && new Date(f.scheduled_at) <= new Date()) return toast.error("Data programării trebuie să fie în viitor");
    setSaving(true);
    const { data: clash } = await supabase.from("blog_posts").select("id").eq("slug", slug).neq("id", id ?? "00000000-0000-0000-0000-000000000000").maybeSingle();
    if (clash) { setSaving(false); return toast.error("Există deja un articol cu această adresă"); }
    const { data: { user } } = await supabase.auth.getUser();
    const payload = {
      title: f.title.trim(), slug, excerpt: f.excerpt || null, content: sanitizeHtml(f.content),
      cover_image: f.cover_image || null, og_image: f.cover_image || null, category_id: f.category_id || null,
      seo_title: f.seo_title || null, seo_description: f.seo_description || null, author_name: f.author_name || null,
      status,
      scheduled_at: status === "scheduled" ? new Date(f.scheduled_at).toISOString() : null,
      // keep the original date when re-saving a published post; clear it for drafts
      published_at: status === "published" ? f.published_at : status === "scheduled" ? null : status === "archived" ? f.published_at : null,
    };
    const res = id
      ? await supabase.from("blog_posts").update(payload).eq("id", id).select("id").single()
      : await supabase.from("blog_posts").insert({ ...payload, author_id: user?.id }).select("id").single();
    setSaving(false);
    if (res.error) return toast.error("Salvarea a eșuat");
    toast.success(status === "published" ? "Articol publicat" : status === "scheduled" ? "Articol programat" : "Salvat");
    if (!id) navigate(`/admin/blog/edit/${res.data.id}`, { replace: true });
    else set("status", status);
  };

  if (loading) return <div className="min-h-screen bg-[#0F1117] flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-amber-400" /></div>;

  const statusLabel: Record<Status, string> = { draft: "Ciornă", scheduled: "Programat", published: "Publicat", archived: "Arhivat" };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <header className="border-b border-amber-500/20 bg-[#1A1F2C] px-4 py-3 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/admin/blog" aria-label="Înapoi"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5 text-amber-400" /></Button></Link>
            <span className="text-sm text-gray-400">{id ? `Editezi · ${statusLabel[f.status]}` : "Articol nou"}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {f.status === "published" && <a href={`/blog/${f.slug}`} target="_blank" rel="noreferrer" className="text-sm text-amber-300 hover:underline px-2">Vezi pe site</a>}
            <Button variant="outline" disabled={saving} onClick={() => save("draft")} className="border-amber-500/30 bg-transparent text-white hover:bg-white/10">Salvează ciornă</Button>
            <Button disabled={saving} onClick={() => save("published")} className="bg-amber-500 text-black hover:bg-amber-400">
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-1" />}{f.status === "published" ? "Actualizează" : "Publică"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid gap-6 lg:grid-cols-[1fr_320px]">
        <main className="space-y-5 min-w-0">
          <div>
            <Label hint={`${f.title.length}/70`}>Titlu</Label>
            <Input value={f.title} onChange={(e) => onTitle(e.target.value)} placeholder="Titlul articolului" className={`${field} text-lg`} />
          </div>
          <div>
            <Label>Adresă</Label>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span className="shrink-0">/blog/</span>
              <Input value={f.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} onBlur={() => set("slug", slugify(f.slug))} className={field} />
            </div>
          </div>
          <div>
            <Label hint={`${f.excerpt.length}/300`}>Rezumat</Label>
            <Textarea value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} placeholder="Apare în lista de articole" className={field} />
          </div>
          <div>
            <Label>Conținut</Label>
            <RichTextEditor value={f.content} onChange={(v) => set("content", v)} />
          </div>
        </main>

        <aside className="space-y-5">
          <section className="rounded-lg border border-amber-500/20 bg-[#1A1F2C]/50 p-4 space-y-3">
            <h2 className="font-semibold text-amber-300">Publicare</h2>
            <Label>Programează pentru</Label>
            <Input type="datetime-local" value={f.scheduled_at} onChange={(e) => set("scheduled_at", e.target.value)} className={`${field} [color-scheme:dark]`} />
            <Button variant="outline" disabled={saving} onClick={() => save("scheduled")} className="w-full border-amber-500/30 bg-transparent text-white hover:bg-white/10">Programează</Button>
            {id && f.status !== "archived" && <Button variant="ghost" disabled={saving} onClick={() => save("archived")} className="w-full text-gray-400 hover:text-white">Arhivează</Button>}
          </section>

          <section className="rounded-lg border border-amber-500/20 bg-[#1A1F2C]/50 p-4 space-y-3">
            <h2 className="font-semibold text-amber-300">Imagine principală</h2>
            {f.cover_image ? (
              <div className="relative">
                <img src={f.cover_image} alt="" className="w-full aspect-video object-cover rounded-md" />
                <button type="button" aria-label="Scoate imaginea" onClick={() => set("cover_image", "")} className="absolute top-2 right-2 bg-black/70 rounded-full p-1"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 aspect-video rounded-md border border-dashed border-amber-500/30 text-gray-400 cursor-pointer hover:bg-white/5">
                <ImagePlus className="h-6 w-6" /><span className="text-sm">Încarcă imagine</span>
                <input type="file" accept="image/*" hidden onChange={(e) => onCover(e.target.files?.[0])} />
              </label>
            )}
          </section>

          <section className="rounded-lg border border-amber-500/20 bg-[#1A1F2C]/50 p-4 space-y-3">
            <h2 className="font-semibold text-amber-300">Detalii</h2>
            <div><Label>Autor</Label><Input value={f.author_name} onChange={(e) => set("author_name", e.target.value)} className={field} /></div>
            <div>
              <Label>Categorie</Label>
              <select value={f.category_id} onChange={(e) => set("category_id", e.target.value)} className={`w-full h-10 rounded-md border px-3 text-sm ${field}`}>
                <option value="">Fără categorie</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </section>

          <section className="rounded-lg border border-amber-500/20 bg-[#1A1F2C]/50 p-4 space-y-3">
            <h2 className="font-semibold text-amber-300">Google (SEO)</h2>
            <div><Label hint={`${f.seo_title.length}/60`}>Titlu SEO</Label><Input value={f.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder={f.title} className={field} /></div>
            <div><Label hint={`${f.seo_description.length}/160`}>Descriere SEO</Label><Textarea value={f.seo_description} onChange={(e) => set("seo_description", e.target.value)} rows={3} placeholder={f.excerpt} className={field} /></div>
          </section>
        </aside>
      </div>
    </div>
  );
}
