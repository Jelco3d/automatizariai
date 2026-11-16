import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, ImagePlus, Lock, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import BlogAdminLayout from "@/components/admin/blog/BlogAdminLayout";
import { ConfirmDialog, ErrorState, FieldLabel, PageHeader, Panel } from "@/components/admin/blog/ui";
import { BLOG_SETTING_DEFAULTS, PRIVATE_SETTING_KEYS, type BlogSettingsValues } from "@/lib/blogSettings";
import { uploadBlogImage } from "@/lib/blog";
import { useInvalidateBlog, useMe } from "@/hooks/useBlogAdmin";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "general", l: "General" }, { id: "seo", l: "SEO implicit" }, { id: "comments", l: "Comentarii" },
  { id: "authors", l: "Autori" }, { id: "integrations", l: "Integrări" }, { id: "danger", l: "Zonă periculoasă" },
];
const KEY = ["blog-admin", "settings"];

function ImageField({ label, value, onChange, hint, disabled }: { label: string; value: string; onChange: (v: string) => void; hint?: string; disabled?: boolean }) {
  const up = async (f?: File) => {
    if (!f) return;
    const t = toast.loading("Se încarcă…");
    try { onChange(await uploadBlogImage(f)); toast.success("Imagine încărcată", { id: t }); } catch { toast.error("Nu am putut încărca imaginea", { id: t }); }
  };
  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface">{value ? <img src={value} alt="" className="h-full w-full object-contain" /> : <ImagePlus className="h-5 w-5 text-muted-foreground" />}</div>
        <label className={cn("cursor-pointer rounded-md border border-input px-3 py-1.5 text-sm hover:bg-accent focus-within:ring-2 focus-within:ring-ring", disabled && "pointer-events-none opacity-50")}>{value ? "Schimbă" : "Încarcă"}<input type="file" accept="image/*" className="sr-only" disabled={disabled} onChange={(e) => up(e.target.files?.[0])} /></label>
        {value && !disabled && <Button variant="ghost" size="icon" onClick={() => onChange("")} aria-label={`Scoate ${label}`}><X className="h-4 w-4" /></Button>}
      </div>
    </div>
  );
}

export default function BlogSettings() {
  const qc = useQueryClient();
  const invalidate = useInvalidateBlog();
  const { data: me } = useMe();
  const isAdmin = !!me?.isAdmin;
  const q = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_settings").select("key,value");
      if (error) throw error;
      const next = { ...BLOG_SETTING_DEFAULTS } as Record<string, unknown>;
      (data ?? []).forEach((r) => { if (r.key in next) next[r.key] = r.value; });
      return next as BlogSettingsValues;
    },
  });
  const [v, setV] = useState<BlogSettingsValues>(BLOG_SETTING_DEFAULTS);
  const [active, setActive] = useState("general");
  const [saving, setSaving] = useState(false);
  const [spamText, setSpamText] = useState("");
  const [danger, setDanger] = useState<null | "spam" | "trash">(null);
  useEffect(() => { if (q.data) { setV(q.data); setSpamText(q.data.spam_words.join(", ")); } }, [q.data]);
  const set = <K extends keyof BlogSettingsValues>(k: K, val: BlogSettingsValues[K]) => setV((p) => ({ ...p, [k]: val }));
  const current = useMemo(() => ({ ...v, spam_words: spamText.split(/[,\n]/).map((w) => w.trim()).filter(Boolean) }), [v, spamText]);
  const dirty = !!q.data && JSON.stringify(current) !== JSON.stringify(q.data);

  const { data: roles = [] } = useQuery({
    queryKey: ["blog-admin", "my-roles"],
    queryFn: async () => { const { data } = await supabase.from("user_roles").select("role"); return (data ?? []).map((r) => r.role as string); },
  });

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const rows = Object.entries(current).map(([key, value]) => ({ key, value, is_public: !PRIVATE_SETTING_KEYS.includes(key as keyof BlogSettingsValues), updated_at: now }));
    const { error } = await supabase.from("blog_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error("Doar un administrator poate salva setările");
    qc.setQueryData(KEY, current); toast.success("Setări salvate");
  };
  const purge = async (status: "spam" | "trash") => {
    setDanger(null);
    const { error, count } = await supabase.from("blog_comments").delete({ count: "exact" }).eq("status", status);
    if (error) return toast.error("Acțiunea a eșuat");
    toast.success(`${count ?? 0} comentarii șterse definitiv`); invalidate();
  };

  const go = (id: string) => { setActive(id); document.getElementById(`s-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const card = (id: string, title: string, desc: string, children: React.ReactNode, tone?: "danger") => (
    <Panel className={cn("scroll-mt-20 p-6", tone === "danger" && "border-destructive/40")}>
      <div id={`s-${id}`} className="mb-5">
        <h2 className={cn("text-base font-semibold", tone === "danger" ? "text-destructive" : "text-foreground")}>{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </Panel>
  );

  return (
    <BlogAdminLayout>
      <PageHeader title="Setări" description="Cum arată și cum funcționează blogul tău." />
      {!isAdmin && me && <div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground"><Lock className="h-4 w-4" />Poți vedea setările, dar doar un administrator le poate modifica.</div>}
      {q.isError ? <Panel><ErrorState onRetry={() => q.refetch()} /></Panel> : (
        <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
          <nav className="flex gap-1 overflow-x-auto lg:sticky lg:top-20 lg:flex-col lg:self-start" aria-label="Secțiuni setări">
            {SECTIONS.map((s) => (
              <button key={s.id} type="button" onClick={() => go(s.id)} className={cn("whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", active === s.id ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground", s.id === "danger" && active !== s.id && "text-destructive/80")}>{s.l}</button>
            ))}
          </nav>
          {q.isLoading ? <div className="space-y-4"><Skeleton className="h-64 rounded-xl" /><Skeleton className="h-48 rounded-xl" /></div> : (
            <fieldset disabled={!isAdmin} className="min-w-0 space-y-6 pb-24">
              {card("general", "General", "Numele și identitatea blogului.", <>
                <div><FieldLabel htmlFor="bt">Numele blogului</FieldLabel><Input id="bt" value={v.blog_title} onChange={(e) => set("blog_title", e.target.value)} /></div>
                <div><FieldLabel htmlFor="bd" hint="apare pe pagina /blog">Descriere</FieldLabel><Textarea id="bd" rows={3} value={v.blog_description} onChange={(e) => set("blog_description", e.target.value)} /></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <ImageField label="Logo" value={v.logo_url} onChange={(x) => set("logo_url", x)} disabled={!isAdmin} />
                  <ImageField label="Favicon" hint="pătrat, min. 64px" value={v.favicon_url} onChange={(x) => set("favicon_url", x)} disabled={!isAdmin} />
                </div>
              </>)}
              {card("seo", "SEO implicit", "Folosite când un articol nu are propriile câmpuri SEO.", <>
                <div><FieldLabel htmlFor="st" hint={`${v.default_seo_title.length}/60`}>Meta titlu implicit</FieldLabel><Input id="st" value={v.default_seo_title} onChange={(e) => set("default_seo_title", e.target.value)} /></div>
                <div><FieldLabel htmlFor="sd" hint={`${v.default_seo_description.length}/160`}>Meta descriere implicită</FieldLabel><Textarea id="sd" rows={3} value={v.default_seo_description} onChange={(e) => set("default_seo_description", e.target.value)} /></div>
                <ImageField label="Imagine OG implicită" hint="1200×630" value={v.default_og_image} onChange={(x) => set("default_og_image", x)} disabled={!isAdmin} />
              </>)}
              {card("comments", "Comentarii", "Moderare și protecție anti-spam.", <>
                <div className="flex items-center justify-between gap-4">
                  <div><p className="text-sm font-medium">Comentarii pe blog</p><p className="text-xs text-muted-foreground">Oprește formularul de comentarii pe toate articolele.</p></div>
                  <Switch checked={v.comments_enabled} onCheckedChange={(x) => set("comments_enabled", x)} aria-label="Comentarii activate" />
                </div>
                <div className="flex items-center justify-between gap-4 opacity-80">
                  <div><p className="text-sm font-medium">Moderare înainte de publicare</p><p className="text-xs text-muted-foreground">Comentariile apar pe site doar după ce le aprobi. Mereu activă.</p></div>
                  <Switch checked disabled aria-label="Moderare activă" />
                </div>
                <div><FieldLabel htmlFor="sw" hint="separate prin virgulă">Cuvinte anti-spam</FieldLabel><Textarea id="sw" rows={3} value={spamText} onChange={(e) => setSpamText(e.target.value)} placeholder="casino, crypto, viagra" /><p className="mt-1.5 text-xs text-muted-foreground">Comentariile care conțin aceste cuvinte merg direct la Spam. Lista nu e vizibilă vizitatorilor.</p></div>
              </>)}
              {card("authors", "Autori", "Cine scrie pe blog.", <>
                <div><FieldLabel htmlFor="da" hint="pentru articolele noi">Autor implicit</FieldLabel><Input id="da" value={v.default_author} onChange={(e) => set("default_author", e.target.value)} /></div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{(me?.name || "?").slice(0, 1).toUpperCase()}</span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{me?.name} <span className="text-muted-foreground">(tu)</span></p><p className="truncate text-xs text-muted-foreground">{me?.email}</p></div>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{roles.includes("admin") ? "Administrator" : roles.includes("editor") ? "Editor" : "—"}</span>
                </div>
                <p className="text-xs text-muted-foreground">Administratorii și editorii pot scrie și publica. Doar administratorii schimbă setările.</p>
              </>)}
              {card("integrations", "Integrări", "Servicii conectate la blog.", <>
                {[{ n: "Google Search Console", d: "Site-ul și harta de pagini sunt trimise către Google.", s: "Conectat" }, { n: "Meta Pixel", d: "Măsoară vizitele din reclamele Facebook / Instagram.", s: "Activ pe site" }, { n: "Newsletter", d: "Trimite articolele noi abonaților prin email.", s: "În curând" }].map((i) => (
                  <div key={i.n} className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
                    <div><p className="text-sm font-medium">{i.n}</p><p className="text-xs text-muted-foreground">{i.d}</p></div>
                    <span className={cn("whitespace-nowrap rounded-full px-2 py-0.5 text-xs", i.s === "În curând" ? "bg-muted text-muted-foreground" : "bg-status-published/10 text-status-published")}>{i.s}</span>
                  </div>
                ))}
              </>)}
              {card("danger", "Zonă periculoasă", "Acțiuni care nu pot fi anulate.", <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium">Șterge toate comentariile spam</p><p className="text-xs text-muted-foreground">Le elimină definitiv din bază.</p></div><Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => setDanger("spam")}>Șterge spam</Button></div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium">Golește coșul de comentarii</p><p className="text-xs text-muted-foreground">Comentariile din Coș dispar definitiv.</p></div><Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => setDanger("trash")}>Golește coșul</Button></div>
              </>, "danger")}
            </fieldset>
          )}
        </div>
      )}

      {dirty && isAdmin && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 lg:pl-72">
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><AlertTriangle className="h-4 w-4 text-status-draft" />Ai modificări nesalvate</p>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => { if (q.data) { setV(q.data); setSpamText(q.data.spam_words.join(", ")); } }}>Renunță</Button><Button onClick={save} disabled={saving}>{saving ? "Se salvează…" : "Salvează modificările"}</Button></div>
          </div>
        </div>
      )}
      <ConfirmDialog open={!!danger} onOpenChange={(o) => !o && setDanger(null)} title={danger === "spam" ? "Ștergi toate comentariile spam?" : "Golești coșul?"} description="Acțiunea este definitivă." confirmLabel="Șterge definitiv" onConfirm={() => danger && purge(danger)} />
    </BlogAdminLayout>
  );
}
