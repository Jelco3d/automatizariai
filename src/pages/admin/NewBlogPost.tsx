import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, CalendarClock, ChevronDown, Eye, ImagePlus, Loader2, PenLine, Settings2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { slugify, uploadBlogImage, sanitizeHtml, SITE_URL } from "@/lib/blog";
import { fetchBlogSettings } from "@/lib/blogSettings";
import { useApplyBlogAdminTheme } from "@/components/admin/blog/theme";
import { FieldLabel, SlideOverPanel, StatusBadge, timeAgo } from "@/components/admin/blog/ui";
import { useCategories, useInvalidateBlog } from "@/hooks/useBlogAdmin";
import { cn } from "@/lib/utils";

type Status = "draft" | "scheduled" | "published" | "archived";
type Form = {
  title: string; subtitle: string; slug: string; excerpt: string; content: string; cover_image: string; og_image: string;
  category_id: string; seo_title: string; seo_description: string; author_name: string; status: Status;
  scheduled_at: string; published_at: string; allow_comments: boolean; tags: string[];
};
const EMPTY: Form = {
  title: "", subtitle: "", slug: "", excerpt: "", content: "", cover_image: "", og_image: "", category_id: "", seo_title: "",
  seo_description: "", author_name: "", status: "draft", scheduled_at: "", published_at: "", allow_comments: true, tags: [],
};
const toLocalInput = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "");
const words = (html: string) => (html.replace(/<[^>]+>/g, " ").trim().match(/\S+/g) ?? []).length;

function AutoTextarea({ className, ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { const el = ref.current; if (el) { el.style.height = "auto"; el.style.height = `${el.scrollHeight}px`; } }, [p.value]);
  return <textarea ref={ref} rows={1} {...p} className={cn("w-full resize-none overflow-hidden bg-transparent focus:outline-none", className)} />;
}

export default function NewBlogPost() {
  useApplyBlogAdminTheme();
  const { id: routeId } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const invalidate = useInvalidateBlog();
  const { data: categories = [] } = useCategories();
  const [id, setId] = useState<string | undefined>(routeId);
  const [loading, setLoading] = useState(!!routeId);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState<Form>(EMPTY);
  const [saved, setSaved] = useState<string>(JSON.stringify(EMPTY));
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!routeId);
  const [panel, setPanel] = useState(false);
  const [preview, setPreview] = useState(params.get("preview") === "1");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [, tick] = useState(0);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const dirty = JSON.stringify(f) !== saved;
  const fRef = useRef(f); fRef.current = f;
  const failedSnap = useRef<string | null>(null);

  useEffect(() => { const t = setInterval(() => tick((x) => x + 1), 5000); return () => clearInterval(t); }, []);

  useEffect(() => {
    if (!routeId) {
      setId(undefined); setSlugTouched(false);
      fetchBlogSettings().then((s) => { const next = { ...EMPTY, author_name: s.default_author || "" }; setF(next); setSaved(JSON.stringify(next)); });
      return;
    }
    if (routeId === id && !loading) return; // just created here, keep local state
    (async () => {
      const [{ data, error }, { data: tagRows }] = await Promise.all([
        supabase.from("blog_posts").select("*").eq("id", routeId).maybeSingle(),
        supabase.from("blog_post_tags").select("blog_tags(name)").eq("post_id", routeId),
      ]);
      if (error || !data) { toast.error("Articolul nu a fost găsit"); navigate("/admin/blog/posts"); return; }
      const next: Form = {
        title: data.title, subtitle: data.subtitle ?? "", slug: data.slug, excerpt: data.excerpt ?? "", content: data.content,
        cover_image: data.cover_image ?? "", og_image: data.og_image && data.og_image !== data.cover_image ? data.og_image : "",
        category_id: data.category_id ?? "", seo_title: data.seo_title ?? "", seo_description: data.seo_description ?? "",
        author_name: data.author_name ?? "", status: data.status as Status, scheduled_at: toLocalInput(data.scheduled_at),
        published_at: toLocalInput(data.published_at), allow_comments: data.allow_comments,
        tags: ((tagRows ?? []) as { blog_tags: { name: string } | null }[]).map((r) => r.blog_tags?.name).filter(Boolean) as string[],
      };
      setF(next); setSaved(JSON.stringify(next)); setSavedAt(new Date(data.updated_at)); setId(routeId); setLoading(false);
    })();
  }, [routeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onTitle = (v: string) => setF((p) => ({ ...p, title: v, slug: slugTouched ? p.slug : slugify(v) }));
  const upload = async (file: File | undefined, key: "cover_image" | "og_image") => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Alege o imagine");
    const t = toast.loading("Se încarcă imaginea…");
    try { set(key, await uploadBlogImage(file)); toast.success("Imagine încărcată", { id: t }); } catch { toast.error("Nu am putut încărca imaginea", { id: t }); }
  };

  const saveTags = async (postId: string, names: string[]) => {
    const clean = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
    await supabase.from("blog_post_tags").delete().eq("post_id", postId);
    if (!clean.length) return;
    const slugs = clean.map(slugify);
    const { data: existing } = await supabase.from("blog_tags").select("id,slug").in("slug", slugs);
    const have = new Map((existing ?? []).map((t) => [t.slug, t.id]));
    const missing = clean.filter((n) => !have.has(slugify(n))).map((name) => ({ name, slug: slugify(name) }));
    if (missing.length) {
      const { data: created } = await supabase.from("blog_tags").insert(missing).select("id,slug");
      (created ?? []).forEach((t) => have.set(t.slug, t.id));
    }
    const rows = slugs.map((s) => have.get(s)).filter(Boolean).map((tag_id) => ({ post_id: postId, tag_id: tag_id as string }));
    if (rows.length) await supabase.from("blog_post_tags").insert(rows);
  };

  const save = useCallback(async (status: Status, opts: { silent?: boolean } = {}) => {
    const cur = fRef.current;
    if (!cur.title.trim()) { if (!opts.silent) toast.error("Adaugă un titlu"); return false; }
    const slug = slugify(cur.slug || cur.title);
    if (!slug) { toast.error("Adresa articolului nu e validă"); return false; }
    if (status === "scheduled") {
      if (!cur.scheduled_at) { toast.error("Alege data și ora programării"); return false; }
      if (new Date(cur.scheduled_at) <= new Date()) { toast.error("Data programării trebuie să fie în viitor"); return false; }
    }
    setSaving(true);
    const { data: clash } = await supabase.from("blog_posts").select("id").eq("slug", slug).neq("id", id ?? "00000000-0000-0000-0000-000000000000").maybeSingle();
    if (clash) { setSaving(false); failedSnap.current = JSON.stringify(cur); toast.error("Există deja un articol cu această adresă — schimb-o în Setări postare"); return false; }
    const { data: { user } } = await supabase.auth.getUser();
    const payload = {
      title: cur.title.trim(), subtitle: cur.subtitle.trim() || null, slug, excerpt: cur.excerpt || cur.subtitle || null, content: sanitizeHtml(cur.content),
      cover_image: cur.cover_image || null, og_image: cur.og_image || cur.cover_image || null, category_id: cur.category_id || null,
      seo_title: cur.seo_title || null, seo_description: cur.seo_description || null, author_name: cur.author_name || null,
      allow_comments: cur.allow_comments, status,
      scheduled_at: status === "scheduled" ? new Date(cur.scheduled_at).toISOString() : null,
      published_at: status === "published" || status === "archived" ? (cur.published_at ? new Date(cur.published_at).toISOString() : null) : null,
    };
    const res = id
      ? await supabase.from("blog_posts").update(payload).eq("id", id).select("id,published_at").single()
      : await supabase.from("blog_posts").insert({ ...payload, author_id: user?.id }).select("id,published_at").single();
    if (res.error) { setSaving(false); failedSnap.current = JSON.stringify(cur); toast.error("Salvarea a eșuat"); return false; }
    await saveTags(res.data.id, cur.tags);
    setSaving(false);
    const next = { ...cur, slug, status, published_at: toLocalInput(res.data.published_at) };
    setF((p) => ({ ...p, slug, status, published_at: next.published_at }));
    setSaved(JSON.stringify(next)); setSavedAt(new Date());
    if (!opts.silent) toast.success(status === "published" ? "Articol publicat" : status === "scheduled" ? "Articol programat" : status === "archived" ? "Articol arhivat" : "Ciornă salvată");
    invalidate();
    if (!id) { setId(res.data.id); navigate(`/admin/blog/edit/${res.data.id}`, { replace: true }); }
    return true;
  }, [id, invalidate, navigate]);

  // autosave drafts
  useEffect(() => {
    if (!dirty || loading || saving || f.status !== "draft" || !f.title.trim() || failedSnap.current === JSON.stringify(f)) return;
    const t = setTimeout(() => save("draft", { silent: true }), 2500);
    return () => clearTimeout(t);
  }, [f, dirty, loading, saving, save]);

  // unsaved warning
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  // shortcuts
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key.toLowerCase() === "s" && !e.shiftKey) { e.preventDefault(); save(fRef.current.status === "scheduled" ? "scheduled" : fRef.current.status); }
      if (e.key.toLowerCase() === "p" && e.shiftKey) { e.preventDefault(); save("published"); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [save]);

  const goBack = () => { if (dirty && !window.confirm("Ai modificări nesalvate. Pleci oricum?")) return; navigate("/admin/blog/posts"); };
  const wc = useMemo(() => words(f.content), [f.content]);
  const status = saving ? "Se salvează…" : dirty ? (f.status === "draft" ? "Modificări nesalvate" : "Modificări nepublicate") : savedAt ? `Salvat ${timeAgo(savedAt.toISOString())}` : "Nesalvat";
  const addTag = () => { const t = tagInput.trim().replace(/,$/, ""); if (t && !f.tags.includes(t)) set("tags", [...f.tags, t]); setTagInput(""); };
  const seoTitle = f.seo_title || f.title || "Titlul articolului";
  const seoDesc = f.seo_description || f.excerpt || f.subtitle || "Descrierea care apare în Google.";

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-6">
          <Button variant="ghost" size="icon" onClick={goBack} aria-label="Înapoi la articole"><ArrowLeft className="h-5 w-5" /></Button>
          <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <Link to="/admin/blog/posts" className="hover:text-foreground">Articole</Link><span>/</span><span className="text-foreground">{id ? "Editare" : "Postare nouă"}</span>
          </nav>
          <div className="ml-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
            {id && <StatusBadge status={f.status} />}
            <span className="truncate" aria-live="polite">{status}</span>
            <span className="hidden sm:inline">· {wc} cuvinte · {Math.max(1, Math.ceil(wc / 200))} min</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="sm" onClick={() => setPreview(!preview)} className="gap-1.5" aria-pressed={preview}>
              {preview ? <PenLine className="h-4 w-4" /> : <Eye className="h-4 w-4" />}<span className="hidden sm:inline">{preview ? "Editează" : "Previzualizare"}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setPanel(true)} aria-label="Setări postare"><Settings2 className="h-4 w-4" /></Button>
            {f.status === "draft" && <Button variant="outline" size="sm" className="hidden sm:inline-flex" disabled={saving} onClick={() => save("draft")}>Salvează</Button>}
            <div className="flex">
              <Button size="sm" className="rounded-r-none" disabled={saving} onClick={() => save("published")}>
                {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}{f.status === "published" ? "Actualizează" : "Publică"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button size="sm" className="rounded-l-none border-l border-primary-foreground/20 px-2" aria-label="Alte opțiuni de publicare"><ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setScheduleOpen(true)}><CalendarClock className="mr-2 h-4 w-4" />Programează…</DropdownMenuItem>
                  {f.status !== "draft" && <DropdownMenuItem onClick={() => save("draft")}>Mută în ciorne</DropdownMenuItem>}
                  {f.status === "published" && <DropdownMenuItem onClick={() => window.open(`/blog/${f.slug}`, "_blank")}>Vezi pe site</DropdownMenuItem>}
                  {id && f.status !== "archived" && <><DropdownMenuSeparator /><DropdownMenuItem onClick={() => save("archived")}>Arhivează</DropdownMenuItem></>}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[720px] px-5 pb-32 pt-8 sm:pt-12">
        {loading ? (
          <div className="space-y-4"><Skeleton className="aspect-[2/1] w-full rounded-xl" /><Skeleton className="h-12 w-3/4" /><Skeleton className="h-6 w-1/2" /><Skeleton className="h-64 w-full" /></div>
        ) : preview ? (
          <article>
            {f.cover_image && <img src={f.cover_image} alt="" className="mb-8 aspect-[2/1] w-full rounded-xl object-cover" />}
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight">{f.title || "Fără titlu"}</h1>
            {f.subtitle && <p className="mt-3 font-serif text-xl text-muted-foreground">{f.subtitle}</p>}
            <p className="mt-4 text-sm text-muted-foreground">{f.author_name} · {Math.max(1, Math.ceil(wc / 200))} min citire</p>
            <div className="prose prose-neutral mt-8 max-w-none font-serif text-[1.125rem] leading-[1.8] dark:prose-invert prose-a:text-primary prose-blockquote:border-l-primary prose-img:rounded-lg [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full" dangerouslySetInnerHTML={{ __html: sanitizeHtml(f.content) }} />
          </article>
        ) : (
          <>
            {f.cover_image ? (
              <div className="group relative mb-8">
                <img src={f.cover_image} alt="Imagine principală" className="aspect-[2/1] w-full rounded-xl object-cover" />
                <div className="absolute right-3 top-3 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                  <label className="cursor-pointer rounded-md bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm focus-within:ring-2 focus-within:ring-ring">Înlocuiește<input type="file" accept="image/*" className="sr-only" onChange={(e) => upload(e.target.files?.[0], "cover_image")} /></label>
                  <button type="button" onClick={() => set("cover_image", "")} className="rounded-md bg-background/90 px-2 py-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Scoate imaginea"><X className="h-4 w-4" /></button>
                </div>
              </div>
            ) : (
              <label onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files?.[0], "cover_image"); }}
                className="mb-8 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border px-4 py-5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-within:ring-2 focus-within:ring-ring">
                <ImagePlus className="h-4 w-4" />Adaugă imagine principală <span className="text-xs">(trage aici sau click)</span>
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => upload(e.target.files?.[0], "cover_image")} />
              </label>
            )}
            <AutoTextarea value={f.title} onChange={(e) => onTitle(e.target.value.replace(/\n/g, ""))} placeholder="Titlu" aria-label="Titlu"
              className="font-serif text-[2.25rem] font-bold leading-tight tracking-tight placeholder:text-muted-foreground/50 sm:text-[2.6rem]" />
            <AutoTextarea value={f.subtitle} onChange={(e) => set("subtitle", e.target.value.replace(/\n/g, ""))} placeholder="Adaugă un subtitlu…" aria-label="Subtitlu"
              className="mt-2 font-serif text-xl text-muted-foreground placeholder:text-muted-foreground/50" />
            <div className="my-6 h-px bg-border" />
            <RichTextEditor value={f.content} onChange={(v) => set("content", v)} />
          </>
        )}
      </main>

      <SlideOverPanel open={panel} onOpenChange={setPanel} title="Setări postare" description="Adresă, categorie, SEO și publicare.">
        <div className="space-y-6">
          <div>
            <FieldLabel htmlFor="slug">Adresă (slug)</FieldLabel>
            <div className="flex items-center gap-1 text-sm text-muted-foreground"><span className="shrink-0">/blog/</span>
              <Input id="slug" value={f.slug} onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }} onBlur={() => set("slug", slugify(f.slug))} />
            </div>
          </div>
          <div>
            <FieldLabel>Categorie</FieldLabel>
            <Select value={f.category_id || "none"} onValueChange={(v) => set("category_id", v === "none" ? "" : v)}>
              <SelectTrigger aria-label="Categorie"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="none">Fără categorie</SelectItem>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <FieldLabel htmlFor="tags" hint="Enter sau virgulă">Tag-uri</FieldLabel>
            <div className="flex flex-wrap gap-1.5 rounded-md border border-input p-2 focus-within:ring-2 focus-within:ring-ring">
              {f.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs">{t}
                  <button type="button" onClick={() => set("tags", f.tags.filter((x) => x !== t))} aria-label={`Scoate ${t}`}><X className="h-3 w-3" /></button></span>
              ))}
              <input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onBlur={addTag}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } else if (e.key === "Backspace" && !tagInput && f.tags.length) set("tags", f.tags.slice(0, -1)); }}
                className="min-w-[6rem] flex-1 bg-transparent text-sm outline-none" placeholder="automatizări, AI…" />
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="excerpt" hint={`${f.excerpt.length}/300`}>Rezumat</FieldLabel>
            <Textarea id="excerpt" rows={3} value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Apare în lista de articole" />
          </div>
          <div className="space-y-3 rounded-xl border border-border p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">SEO</p>
            <div>
              <FieldLabel htmlFor="seo_t" hint={<span className={cn(f.seo_title.length > 60 && "text-status-spam")}>{f.seo_title.length}/60</span>}>Meta titlu</FieldLabel>
              <Input id="seo_t" value={f.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder={f.title} />
            </div>
            <div>
              <FieldLabel htmlFor="seo_d" hint={<span className={cn(f.seo_description.length > 160 && "text-status-spam")}>{f.seo_description.length}/160</span>}>Meta descriere</FieldLabel>
              <Textarea id="seo_d" rows={3} value={f.seo_description} onChange={(e) => set("seo_description", e.target.value)} placeholder={f.excerpt} />
            </div>
            <div className="rounded-lg bg-surface p-3" aria-label="Previzualizare Google">
              <p className="truncate text-xs text-muted-foreground">{SITE_URL.replace(/^https?:\/\//, "")} › blog › {f.slug || "adresa"}</p>
              <p className="truncate text-[17px] leading-snug text-status-scheduled">{seoTitle.slice(0, 65)}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{seoDesc.slice(0, 165)}</p>
            </div>
          </div>
          <div>
            <FieldLabel hint="pentru rețele sociale">Imagine OG</FieldLabel>
            {f.og_image ? (
              <div className="relative"><img src={f.og_image} alt="" className="aspect-[1.91/1] w-full rounded-lg object-cover" />
                <button type="button" onClick={() => set("og_image", "")} className="absolute right-2 top-2 rounded-md bg-background/90 p-1" aria-label="Scoate imaginea OG"><X className="h-4 w-4" /></button></div>
            ) : (
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground hover:text-foreground focus-within:ring-2 focus-within:ring-ring">
                <ImagePlus className="h-4 w-4" />{f.cover_image ? "Folosește altă imagine decât cea principală" : "Încarcă imagine"}
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => upload(e.target.files?.[0], "og_image")} />
              </label>
            )}
          </div>
          <div><FieldLabel htmlFor="author">Autor</FieldLabel><Input id="author" value={f.author_name} onChange={(e) => set("author_name", e.target.value)} /></div>
          {(f.status === "published" || f.status === "archived") && (
            <div><FieldLabel htmlFor="pub">Data publicării</FieldLabel><Input id="pub" type="datetime-local" value={f.published_at} onChange={(e) => set("published_at", e.target.value)} /></div>
          )}
          <div className="flex items-center justify-between rounded-xl border border-border p-4">
            <div><p className="text-sm font-medium">Comentarii</p><p className="text-xs text-muted-foreground">Permite comentarii la acest articol</p></div>
            <Switch checked={f.allow_comments} onCheckedChange={(v) => set("allow_comments", v)} aria-label="Permite comentarii" />
          </div>
          <p className="text-xs text-muted-foreground">Scurtături: ⌘S salvează · ⌘⇧P publică</p>
        </div>
      </SlideOverPanel>

      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Programează publicarea</DialogTitle><DialogDescription>Articolul apare automat pe blog la data aleasă.</DialogDescription></DialogHeader>
          <Input type="datetime-local" value={f.scheduled_at} onChange={(e) => set("scheduled_at", e.target.value)} aria-label="Data și ora" />
          <DialogFooter><Button variant="ghost" onClick={() => setScheduleOpen(false)}>Anulează</Button><Button onClick={async () => { if (await save("scheduled")) setScheduleOpen(false); }}>Programează</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
