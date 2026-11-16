import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ExternalLink, Inbox, Reply, ShieldAlert, Trash2, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import BlogAdminLayout from "@/components/admin/blog/BlogAdminLayout";
import { ConfirmDialog, EmptyState, ErrorState, ListSkeleton, PageHeader, Panel, timeAgo } from "@/components/admin/blog/ui";
import { useInvalidateBlog, useMe, usePosts } from "@/hooks/useBlogAdmin";
import { cn } from "@/lib/utils";

type Status = "pending" | "approved" | "spam" | "trash";
type Row = { id: string; post_id: string; parent_id: string | null; author_name: string; author_email: string; content: string; status: Status; created_at: string; is_staff_reply: boolean };
const TABS: { v: Status; l: string }[] = [{ v: "pending", l: "În așteptare" }, { v: "approved", l: "Aprobate" }, { v: "spam", l: "Spam" }, { v: "trash", l: "Coș" }];
const KEY = ["blog-admin", "comments"];

export default function Comments() {
  const qc = useQueryClient();
  const invalidate = useInvalidateBlog();
  const { data: me } = useMe();
  const { data: posts = [] } = usePosts();
  const q = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_comments").select("id,post_id,parent_id,author_name,author_email,content,status,created_at,is_staff_reply").order("created_at", { ascending: false }).limit(1000);
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });
  const [tab, setTab] = useState<Status>("pending");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [focus, setFocus] = useState(0);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [confirm, setConfirm] = useState<string[] | null>(null);

  const all = q.data ?? [];
  const counts = useMemo(() => Object.fromEntries(TABS.map((t) => [t.v, all.filter((c) => c.status === t.v).length])), [all]);
  const items = all.filter((c) => c.status === tab);
  const post = (id: string) => posts.find((p) => p.id === id);
  const parentOf = (id: string | null) => (id ? all.find((c) => c.id === id) : undefined);

  const setStatus = async (ids: string[], status: Status) => {
    qc.setQueryData<Row[]>(KEY, (old) => (old ?? []).map((c) => (ids.includes(c.id) ? { ...c, status } : c)));
    setSelected(new Set());
    const { error } = await supabase.from("blog_comments").update({ status }).in("id", ids);
    const label = { approved: "Aprobat", spam: "Marcat ca spam", trash: "Mutat în coș", pending: "Mutat în așteptare" }[status];
    if (error) toast.error("Acțiunea a eșuat"); else toast.success(ids.length > 1 ? `${ids.length} comentarii: ${label.toLowerCase()}` : label);
    invalidate();
  };
  const destroy = async (ids: string[]) => {
    qc.setQueryData<Row[]>(KEY, (old) => (old ?? []).filter((c) => !ids.includes(c.id)));
    setSelected(new Set()); setConfirm(null);
    const { error } = await supabase.from("blog_comments").delete().in("id", ids);
    if (error) toast.error("Ștergerea a eșuat"); else toast.success("Șters definitiv");
    invalidate();
  };
  const sendReply = async (c: Row) => {
    if (reply.trim().length < 2 || !me) return;
    const { error } = await supabase.from("blog_comments").insert({
      post_id: c.post_id, parent_id: c.id, author_name: me.name || "Autor", author_email: me.email, content: reply.trim().slice(0, 3000), status: "approved", is_staff_reply: true,
    });
    if (error) return toast.error("Răspunsul nu s-a trimis");
    if (c.status === "pending") await supabase.from("blog_comments").update({ status: "approved" }).eq("id", c.id);
    toast.success("Răspuns publicat pe site"); setReply(""); setReplyTo(null); invalidate();
  };
  const remove = (ids: string[]) => (tab === "trash" ? setConfirm(ids) : setStatus(ids, "trash"));

  // keyboard: j/k navigate, a approve, s spam, r reply, # / Delete trash
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input,textarea,[contenteditable=true],[role=dialog]") || e.metaKey || e.ctrlKey) return;
      const c = items[focus];
      if (e.key === "j") { setFocus((i) => Math.min(items.length - 1, i + 1)); e.preventDefault(); }
      else if (e.key === "k") { setFocus((i) => Math.max(0, i - 1)); e.preventDefault(); }
      else if (!c) return;
      else if (e.key === "a" && c.status !== "approved") setStatus([c.id], "approved");
      else if (e.key === "s" && c.status !== "spam") setStatus([c.id], "spam");
      else if (e.key === "r") { e.preventDefault(); setReplyTo(c.id); }
      else if (e.key === "#" || e.key === "Delete") remove([c.id]);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });
  useEffect(() => { document.getElementById(`c-${items[focus]?.id}`)?.scrollIntoView({ block: "nearest" }); }, [focus]); // eslint-disable-line react-hooks/exhaustive-deps

  const allSel = items.length > 0 && items.every((c) => selected.has(c.id));

  return (
    <BlogAdminLayout>
      <PageHeader title="Comentarii" description="Moderează ce apare sub articolele tale. Taste rapide: j/k navighează, a aprobă, s spam, r răspunde." />
      <Tabs value={tab} onValueChange={(v) => { setTab(v as Status); setSelected(new Set()); setFocus(0); setReplyTo(null); }} className="mb-4">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {TABS.map((t) => (
            <TabsTrigger key={t.v} value={t.v} className="rounded-full border border-transparent px-3 py-1.5 text-sm data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-sm">
              {t.l}<span className={cn("ml-1.5 text-xs tabular-nums", t.v === "pending" && counts.pending ? "font-semibold text-primary" : "text-muted-foreground")}>{counts[t.v]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {selected.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-3 py-2" role="toolbar" aria-label="Acțiuni în masă">
          <span className="text-sm font-medium">{selected.size} selectate</span>
          {tab !== "approved" && <Button size="sm" onClick={() => setStatus([...selected], "approved")}>Aprobă</Button>}
          {tab !== "spam" && <Button size="sm" variant="outline" onClick={() => setStatus([...selected], "spam")}>Spam</Button>}
          {tab === "trash" || tab === "spam" ? <Button size="sm" variant="outline" onClick={() => setStatus([...selected], "pending")}>Restaurează</Button> : null}
          <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove([...selected])}>{tab === "trash" ? "Șterge definitiv" : "Mută în coș"}</Button>
        </div>
      )}

      <Panel>
        {q.isError ? <ErrorState onRetry={() => q.refetch()} /> : q.isLoading ? <ListSkeleton /> : items.length === 0 ? (
          <EmptyState icon={Inbox} title={tab === "pending" ? "Totul e la zi 🎉" : "Nimic aici"} description={tab === "pending" ? "Nu ai comentarii de moderat." : undefined} />
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
              <Checkbox checked={allSel} onCheckedChange={() => setSelected(allSel ? new Set() : new Set(items.map((c) => c.id)))} aria-label="Selectează tot" />
              <span>{items.length} comentarii</span>
            </div>
            <ul className="divide-y divide-border">
              {items.map((c, i) => {
                const p = post(c.post_id), parent = parentOf(c.parent_id);
                return (
                  <li key={c.id} id={`c-${c.id}`} onClick={() => setFocus(i)} className={cn("flex gap-3 px-4 py-4 transition-colors", i === focus && "bg-accent/60", selected.has(c.id) && "bg-primary/5")}>
                    <Checkbox checked={selected.has(c.id)} onCheckedChange={() => setSelected((s) => { const n = new Set(s); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; })} aria-label={`Selectează comentariul lui ${c.author_name}`} className="mt-1" />
                    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold", c.is_staff_reply ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")} aria-hidden>{c.author_name.slice(0, 1).toUpperCase()}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
                        <span className="font-medium text-foreground">{c.author_name}</span>
                        {c.is_staff_reply && <span className="rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold text-primary">Autor</span>}
                        <span className="truncate text-xs text-muted-foreground">{c.author_email}</span>
                        <span className="text-xs text-muted-foreground">· {timeAgo(c.created_at)}</span>
                      </div>
                      {parent && <p className="mt-1 truncate border-l-2 border-border pl-2 text-xs text-muted-foreground">Răspuns la {parent.author_name}: „{parent.content}”</p>}
                      <p className="mt-1.5 whitespace-pre-line break-words text-sm text-foreground">{c.content}</p>
                      {p && <Link to={p.status === "published" ? `/blog/${p.slug}` : `/admin/blog/edit/${p.id}`} target={p.status === "published" ? "_blank" : undefined} className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">la <span className="font-serif font-medium">{p.title}</span><ExternalLink className="h-3 w-3" /></Link>}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {c.status !== "approved" && c.status !== "trash" && <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => setStatus([c.id], "approved")}><Check className="h-3.5 w-3.5" />Aprobă</Button>}
                        {c.status !== "trash" && !c.is_staff_reply && <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => { setReplyTo(replyTo === c.id ? null : c.id); setReply(""); }}><Reply className="h-3.5 w-3.5" />Răspunde</Button>}
                        {c.status !== "spam" && c.status !== "trash" && <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => setStatus([c.id], "spam")}><ShieldAlert className="h-3.5 w-3.5" />Spam</Button>}
                        {(c.status === "trash" || c.status === "spam") && <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => setStatus([c.id], "pending")}><Undo2 className="h-3.5 w-3.5" />Restaurează</Button>}
                        <Button size="sm" variant="ghost" className="h-8 gap-1 text-destructive hover:text-destructive" onClick={() => remove([c.id])}><Trash2 className="h-3.5 w-3.5" />{c.status === "trash" ? "Șterge definitiv" : "Șterge"}</Button>
                      </div>
                      {replyTo === c.id && (
                        <div className="mt-3 space-y-2">
                          <Textarea autoFocus rows={3} value={reply} onChange={(e) => setReply(e.target.value)} placeholder={`Răspunde-i lui ${c.author_name}…`} aria-label="Răspuns" />
                          <div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => setReplyTo(null)}>Anulează</Button><Button size="sm" onClick={() => sendReply(c)} disabled={reply.trim().length < 2}>Publică răspunsul</Button></div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </Panel>
      <ConfirmDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)} title="Ștergi definitiv?" description="Comentariile șterse din coș nu mai pot fi recuperate." confirmLabel="Șterge definitiv" onConfirm={() => confirm && destroy(confirm)} />
    </BlogAdminLayout>
  );
}
