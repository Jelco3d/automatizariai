import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Copy, Edit, Eye, FileText, LayoutGrid, List, MessageSquare, MoreHorizontal, PenSquare, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import BlogAdminLayout from "@/components/admin/blog/BlogAdminLayout";
import { ConfirmDialog, EmptyState, ErrorState, ListSkeleton, PageHeader, Panel, StatusBadge, fmtDate } from "@/components/admin/blog/ui";
import { AdminPost, blogKeys, useCategories, useCommentCounts, useInvalidateBlog, usePosts } from "@/hooks/useBlogAdmin";
import { cn } from "@/lib/utils";

const TABS = [
  { v: "all", l: "Toate" }, { v: "published", l: "Publicate" }, { v: "draft", l: "Ciorne" }, { v: "scheduled", l: "Programate" },
];
const PAGE = 15;

export default function BlogPosts() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") ?? "all";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const posts = usePosts();
  const { data: categories = [] } = useCategories();
  const { data: commentCounts = {} } = useCommentCounts();
  const invalidate = useInvalidateBlog();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("date");
  const [view, setView] = useState<"list" | "grid">(() => (localStorage.getItem("blog-admin-view") as "list" | "grid") || "list");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirm, setConfirm] = useState<{ ids: string[] } | null>(null);

  const all = posts.data ?? [];
  const counts = useMemo(() => ({
    all: all.length, published: all.filter((p) => p.status === "published").length,
    draft: all.filter((p) => p.status === "draft").length, scheduled: all.filter((p) => p.status === "scheduled").length,
  }), [all]);

  const filtered = useMemo(() => {
    let r = all.filter((p) => (tab === "all" ? true : p.status === tab));
    if (cat !== "all") r = r.filter((p) => (cat === "none" ? !p.category_id : p.category_id === cat));
    if (q.trim()) { const s = q.toLowerCase(); r = r.filter((p) => p.title.toLowerCase().includes(s) || (p.excerpt ?? "").toLowerCase().includes(s)); }
    return [...r].sort((a, b) => sort === "views" ? b.views - a.views : new Date(b.published_at ?? b.updated_at).getTime() - new Date(a.published_at ?? a.updated_at).getTime());
  }, [all, tab, cat, q, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const shown = filtered.slice((page - 1) * PAGE, page * PAGE);
  const catOf = (id: string | null) => categories.find((c) => c.id === id);

  const setTab = (v: string) => { setParams(v === "all" ? {} : { tab: v }); setPage(1); setSelected(new Set()); };
  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const allOnPage = shown.length > 0 && shown.every((p) => selected.has(p.id));

  // optimistic helpers
  const patchLocal = (ids: string[], patch: Partial<AdminPost> | null) => {
    qc.setQueryData<AdminPost[]>(blogKeys.posts, (old) => (old ?? []).flatMap((p) => !ids.includes(p.id) ? [p] : patch === null ? [] : [{ ...p, ...patch }]));
  };
  const bulkUpdate = async (ids: string[], patch: Record<string, unknown>, msg: string) => {
    patchLocal(ids, patch as Partial<AdminPost>);
    const { error } = await supabase.from("blog_posts").update(patch).in("id", ids);
    if (error) toast.error("Acțiunea a eșuat"); else toast.success(msg);
    setSelected(new Set()); invalidate();
  };
  const publish = (ids: string[]) => bulkUpdate(ids, { status: "published", scheduled_at: null }, ids.length > 1 ? `${ids.length} articole publicate` : "Articol publicat");
  const toDraft = (ids: string[]) => bulkUpdate(ids, { status: "draft", published_at: null, scheduled_at: null }, "Mutat în ciorne");
  const setCategory = (ids: string[], id: string | null) => bulkUpdate(ids, { category_id: id }, "Categorie schimbată");
  const remove = async (ids: string[]) => {
    patchLocal(ids, null);
    const { error } = await supabase.from("blog_posts").delete().in("id", ids);
    if (error) toast.error("Ștergerea a eșuat"); else toast.success(ids.length > 1 ? `${ids.length} articole șterse` : "Articol șters");
    setSelected(new Set()); setConfirm(null); invalidate();
  };
  const duplicate = async (p: AdminPost) => {
    const { data: full, error } = await supabase.from("blog_posts").select("*").eq("id", p.id).single();
    if (error || !full) return toast.error("Nu am putut duplica");
    const { id: _i, created_at: _c, updated_at: _u, views: _v, published_at: _p, ...rest } = full;
    const { data, error: e2 } = await supabase.from("blog_posts").insert({ ...rest, title: `${full.title} (copie)`, slug: `${full.slug}-copie-${Date.now().toString(36)}`, status: "draft", scheduled_at: null }).select("id").single();
    if (e2) return toast.error("Nu am putut duplica");
    toast.success("Copie creată ca ciornă"); invalidate(); navigate(`/admin/blog/edit/${data.id}`);
  };

  const Actions = ({ p }: { p: AdminPost }) => (
    <div className="flex items-center gap-0.5 opacity-100 transition-opacity duration-150 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="Editează"><Link to={`/admin/blog/edit/${p.id}`}><Edit className="h-4 w-4" /></Link></Button>
      <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="Previzualizare"><Link to={`/admin/blog/edit/${p.id}?preview=1`}><Eye className="h-4 w-4" /></Link></Button>
      <Button variant="ghost" size="icon" className="hidden h-8 w-8 sm:inline-flex" aria-label="Duplică" onClick={() => duplicate(p)}><Copy className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" className="hidden h-8 w-8 sm:inline-flex" aria-label="Șterge" onClick={() => setConfirm({ ids: [p.id] })}><Trash2 className="h-4 w-4" /></Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Mai multe acțiuni"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {p.status === "published" && <DropdownMenuItem onClick={() => window.open(`/blog/${p.slug}`, "_blank")}>Vezi pe site</DropdownMenuItem>}
          {p.status !== "published" && <DropdownMenuItem onClick={() => publish([p.id])}>Publică acum</DropdownMenuItem>}
          {p.status !== "draft" && <DropdownMenuItem onClick={() => toDraft([p.id])}>Mută în ciorne</DropdownMenuItem>}
          <DropdownMenuItem onClick={() => duplicate(p)}>Duplică</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/blog/${p.slug}`); toast.success("Link copiat"); }}>Copiază linkul</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setConfirm({ ids: [p.id] })}>Șterge</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const Meta = ({ p }: { p: AdminPost }) => {
    const c = catOf(p.category_id);
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <StatusBadge status={p.status} />
        {c && <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: c.color }} aria-hidden />{c.name}</span>}
        <span>{p.status === "scheduled" ? `Programat ${fmtDate(p.scheduled_at)}` : p.status === "published" ? fmtDate(p.published_at) : `Editat ${fmtDate(p.updated_at)}`}</span>
        <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{p.views}</span>
        <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" />{commentCounts[p.id] ?? 0}</span>
      </div>
    );
  };

  const Thumb = ({ p, className }: { p: AdminPost; className?: string }) => p.cover_image
    ? <img src={p.cover_image} alt="" loading="lazy" className={cn("object-cover", className)} />
    : <div className={cn("flex items-center justify-center bg-muted", className)}><FileText className="h-5 w-5 text-muted-foreground" /></div>;

  return (
    <BlogAdminLayout>
      <PageHeader title="Articole" description="Toate articolele tale, într-un singur loc." actions={<Button asChild className="gap-2"><Link to="/admin/blog/new"><PenSquare className="h-4 w-4" />Postare nouă</Link></Button>} />

      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {TABS.map((t) => (
            <TabsTrigger key={t.v} value={t.v} className="rounded-full border border-transparent px-3 py-1.5 text-sm data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm">
              {t.l} <span className="ml-1.5 text-xs tabular-nums text-muted-foreground">{counts[t.v as keyof typeof counts]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Caută după titlu…" className="pl-9" aria-label="Caută articole" />
        </div>
        <div className="flex gap-2">
          <Select value={cat} onValueChange={(v) => { setCat(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44" aria-label="Filtrează după categorie"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate categoriile</SelectItem>
              <SelectItem value="none">Fără categorie</SelectItem>
              {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-40" aria-label="Sortează"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="date">După dată</SelectItem><SelectItem value="views">După vizualizări</SelectItem></SelectContent>
          </Select>
          <div className="hidden rounded-lg border border-border p-0.5 sm:flex" role="group" aria-label="Mod afișare">
            {(["list", "grid"] as const).map((m) => (
              <Button key={m} variant="ghost" size="icon" aria-pressed={view === m} aria-label={m === "list" ? "Listă" : "Grilă"} onClick={() => { setView(m); localStorage.setItem("blog-admin-view", m); }} className={cn("h-8 w-8", view === m && "bg-accent text-foreground")}>
                {m === "list" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {posts.isError ? <Panel><ErrorState onRetry={() => posts.refetch()} /></Panel>
        : posts.isLoading ? <Panel><ListSkeleton /></Panel>
        : filtered.length === 0 ? (
          <Panel><EmptyState icon={FileText} title={all.length === 0 ? "Încă nu ai scris nimic" : "Niciun articol găsit"} description={all.length === 0 ? "Prima ta postare e la un click distanță." : "Încearcă alt filtru sau altă căutare."}
            action={all.length === 0 ? <Button asChild><Link to="/admin/blog/new">Scrie prima postare</Link></Button> : <Button variant="outline" onClick={() => { setQ(""); setCat("all"); setTab("all"); }}>Resetează filtrele</Button>} /></Panel>
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
                <div className="relative">
                  <Thumb p={p} className="aspect-[16/9] w-full" />
                  <Checkbox checked={selected.has(p.id)} onCheckedChange={() => toggle(p.id)} aria-label={`Selectează ${p.title}`} className="absolute left-3 top-3 bg-background" />
                </div>
                <div className="space-y-2 p-4">
                  <Link to={`/admin/blog/edit/${p.id}`} className="line-clamp-2 font-serif text-lg font-semibold leading-snug text-foreground hover:text-primary">{p.title}</Link>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{p.subtitle || p.excerpt || "—"}</p>
                  <Meta p={p} />
                  <div className="flex justify-end pt-1"><Actions p={p} /></div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Panel>
            <div className="flex items-center gap-3 border-b border-border px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Checkbox checked={allOnPage} onCheckedChange={() => setSelected((s) => { const n = new Set(s); shown.forEach((p) => allOnPage ? n.delete(p.id) : n.add(p.id)); return n; })} aria-label="Selectează tot" />
              <span>{filtered.length} articole</span>
            </div>
            <ul className="divide-y divide-border">
              {shown.map((p) => (
                <li key={p.id} className={cn("group flex items-start gap-3 px-4 py-4 transition-colors duration-150 hover:bg-accent/50 sm:items-center", selected.has(p.id) && "bg-primary/5")}>
                  <Checkbox checked={selected.has(p.id)} onCheckedChange={() => toggle(p.id)} aria-label={`Selectează ${p.title}`} className="mt-1 sm:mt-0" />
                  <Thumb p={p} className="hidden h-14 w-20 shrink-0 rounded-md sm:block" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Link to={`/admin/blog/edit/${p.id}`} className="block truncate font-serif text-base font-semibold text-foreground hover:text-primary">{p.title}</Link>
                    <p className="truncate text-sm text-muted-foreground">{p.subtitle || p.excerpt || "—"}</p>
                    <Meta p={p} />
                  </div>
                  <Actions p={p} />
                </li>
              ))}
            </ul>
          </Panel>
        )}

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Pagina {page} din {pages}</span>
          <div className="flex gap-2"><Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Înapoi</Button><Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage(page + 1)}>Înainte</Button></div>
        </div>
      )}

      {selected.size > 0 && (
        <div className="sticky bottom-4 z-20 mx-auto mt-6 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-xl border border-border bg-popover px-3 py-2 shadow-sm" role="toolbar" aria-label="Acțiuni în masă">
          <span className="px-1 text-sm font-medium">{selected.size} selectate</span>
          <Button size="sm" onClick={() => publish([...selected])}>Publică</Button>
          <Button size="sm" variant="outline" onClick={() => toDraft([...selected])}>Mută în ciorne</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button size="sm" variant="outline">Schimbă categoria</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategory([...selected], null)}>Fără categorie</DropdownMenuItem>
              {categories.map((c) => <DropdownMenuItem key={c.id} onClick={() => setCategory([...selected], c.id)}>{c.name}</DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="text-destructive" onClick={() => setConfirm({ ids: [...selected] })}><Trash2 className="mr-1 h-4 w-4" />Șterge</Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelected(new Set())} aria-label="Deselectează"><X className="h-4 w-4" /></Button>
        </div>
      )}

      <ConfirmDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}
        title={confirm && confirm.ids.length > 1 ? `Ștergi ${confirm.ids.length} articole?` : "Ștergi articolul?"}
        description="Articolul, comentariile și statisticile lui se șterg definitiv. Nu poți anula."
        onConfirm={() => confirm && remove(confirm.ids)} />
    </BlogAdminLayout>
  );
}
