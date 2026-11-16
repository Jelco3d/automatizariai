import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, FolderOpen, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import BlogAdminLayout from "@/components/admin/blog/BlogAdminLayout";
import { ConfirmDialog, EmptyState, ErrorState, FieldLabel, ListSkeleton, PageHeader, Panel, SectionTitle } from "@/components/admin/blog/ui";
import { AdminCategory, blogKeys, useCategories, useInvalidateBlog, usePosts } from "@/hooks/useBlogAdmin";
import { slugify } from "@/lib/blog";
import { cn } from "@/lib/utils";

const COLORS = ["#D97706", "#DC2626", "#16A34A", "#2563EB", "#7C3AED", "#DB2777", "#0891B2", "#525252"];
const blank = { name: "", slug: "", description: "", color: COLORS[0] };

export default function Categories() {
  const qc = useQueryClient();
  const cats = useCategories();
  const { data: posts = [] } = usePosts();
  const invalidate = useInvalidateBlog();
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState(blank);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<AdminCategory | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const list = cats.data ?? [];
  const countOf = (id: string) => posts.filter((p) => p.category_id === id).length;
  const uncategorized = posts.filter((p) => !p.category_id).length;

  useEffect(() => {
    if (editing) { setForm({ name: editing.name, slug: editing.slug, description: editing.description ?? "", color: editing.color }); setSlugTouched(true); }
    else { setForm(blank); setSlugTouched(false); }
  }, [editing]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim(), slug = slugify(form.slug || form.name);
    if (!name || !slug) return toast.error("Adaugă un nume");
    if (list.some((c) => c.slug === slug && c.id !== editing?.id)) return toast.error("Există deja o categorie cu această adresă");
    setSaving(true);
    const payload = { name, slug, description: form.description.trim() || null, color: form.color };
    const { error } = editing
      ? await supabase.from("blog_categories").update(payload).eq("id", editing.id)
      : await supabase.from("blog_categories").insert({ ...payload, sort_order: list.length });
    setSaving(false);
    if (error) return toast.error("Salvarea a eșuat");
    toast.success(editing ? "Categorie actualizată" : "Categorie adăugată");
    setEditing(null); setForm(blank); invalidate();
  };

  const remove = async (c: AdminCategory) => {
    qc.setQueryData<AdminCategory[]>(blogKeys.categories, (old) => (old ?? []).filter((x) => x.id !== c.id));
    setConfirm(null);
    await supabase.from("blog_posts").update({ category_id: null }).eq("category_id", c.id);
    const { error } = await supabase.from("blog_categories").delete().eq("id", c.id);
    if (error) toast.error("Ștergerea a eșuat"); else toast.success("Categorie ștearsă");
    if (editing?.id === c.id) setEditing(null);
    invalidate();
  };

  const reorder = async (next: AdminCategory[]) => {
    const withOrder = next.map((c, i) => ({ ...c, sort_order: i }));
    qc.setQueryData(blogKeys.categories, withOrder);
    const results = await Promise.all(withOrder.map((c) => supabase.from("blog_categories").update({ sort_order: c.sort_order }).eq("id", c.id)));
    if (results.some((r) => r.error)) { toast.error("Ordinea nu s-a salvat"); invalidate(); } else toast.success("Ordine salvată");
  };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length || from === to) return;
    const next = [...list]; const [it] = next.splice(from, 1); next.splice(to, 0, it); reorder(next);
  };

  return (
    <BlogAdminLayout>
      <PageHeader title="Categorii" description="Organizează articolele pe teme. Trage ca să schimbi ordinea." actions={editing && <Button variant="outline" onClick={() => setEditing(null)} className="gap-2"><Plus className="h-4 w-4" />Categorie nouă</Button>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          <SectionTitle>{list.length} categorii{uncategorized > 0 && ` · ${uncategorized} articole fără categorie`}</SectionTitle>
          <Panel>
            {cats.isError ? <ErrorState onRetry={() => cats.refetch()} /> : cats.isLoading ? <ListSkeleton rows={3} /> : list.length === 0 ? (
              <EmptyState icon={FolderOpen} title="Nicio categorie încă" description="Creează prima categorie din formularul alăturat." />
            ) : (
              <ul className="divide-y divide-border">
                {list.map((c, i) => (
                  <li key={c.id} draggable onDragStart={() => setDragId(c.id)} onDragEnd={() => setDragId(null)}
                    onDragOver={(e) => e.preventDefault()} onDrop={() => { const from = list.findIndex((x) => x.id === dragId); if (from >= 0) move(from, i); }}
                    className={cn("group flex items-center gap-3 px-4 py-3 transition-colors", dragId === c.id && "opacity-50", editing?.id === c.id && "bg-primary/5")}>
                    <GripVertical className="hidden h-4 w-4 cursor-grab text-muted-foreground sm:block" aria-hidden />
                    <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                      <p className="truncate text-xs text-muted-foreground">/{c.slug}{c.description && ` · ${c.description}`}</p>
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">{countOf(c.id)} art.</span>
                    <div className="flex">
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Mută sus" disabled={i === 0} onClick={() => move(i, i - 1)}><ArrowUp className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Mută jos" disabled={i === list.length - 1} onClick={() => move(i, i + 1)}><ArrowDown className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Editează ${c.name}`} onClick={() => setEditing(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" aria-label={`Șterge ${c.name}`} onClick={() => setConfirm(c)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </section>
        <section>
          <SectionTitle>{editing ? "Editează categoria" : "Categorie nouă"}</SectionTitle>
          <Panel className="p-5">
            <form onSubmit={save} className="space-y-4">
              <div><FieldLabel htmlFor="cname">Nume</FieldLabel><Input id="cname" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: slugTouched ? f.slug : slugify(e.target.value) }))} placeholder="ex. Studii de caz" /></div>
              <div><FieldLabel htmlFor="cslug" hint="generat automat">Adresă</FieldLabel><Input id="cslug" value={form.slug} onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: e.target.value })); }} onBlur={() => setForm((f) => ({ ...f, slug: slugify(f.slug) }))} /></div>
              <div><FieldLabel htmlFor="cdesc">Descriere</FieldLabel><Textarea id="cdesc" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></div>
              <div>
                <FieldLabel>Culoare</FieldLabel>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Culoare">
                  {COLORS.map((c) => (
                    <button key={c} type="button" role="radio" aria-checked={form.color === c} aria-label={c} onClick={() => setForm((f) => ({ ...f, color: c }))}
                      className={cn("h-7 w-7 rounded-full ring-offset-2 ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", form.color === c && "ring-2 ring-foreground")} style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button type="submit" disabled={saving} className="flex-1">{editing ? "Salvează" : "Adaugă categoria"}</Button>
                {editing && <Button type="button" variant="ghost" onClick={() => setEditing(null)}>Anulează</Button>}
              </div>
            </form>
          </Panel>
        </section>
      </div>
      <ConfirmDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)} title={`Ștergi „${confirm?.name}”?`}
        description={confirm && countOf(confirm.id) > 0 ? `${countOf(confirm.id)} articole vor rămâne fără categorie. Articolele nu se șterg.` : "Nicio postare nu folosește această categorie."}
        onConfirm={() => confirm && remove(confirm)} />
    </BlogAdminLayout>
  );
}
