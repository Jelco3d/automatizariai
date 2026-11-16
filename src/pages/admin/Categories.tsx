import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { slugify } from "@/lib/blog";

type Cat = { id: string; name: string; slug: string; description: string | null; created_at: string; count: number };
const empty = { id: "", name: "", slug: "", description: "" };

export default function Categories() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [uncat, setUncat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<typeof empty | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const [{ data: c, error }, { data: p }] = await Promise.all([
      supabase.from("blog_categories").select("*").order("name"),
      supabase.from("blog_posts").select("category_id"),
    ]);
    if (error) toast.error(error.message);
    const counts: Record<string, number> = {};
    let u = 0;
    (p ?? []).forEach((r) => (r.category_id ? (counts[r.category_id] = (counts[r.category_id] ?? 0) + 1) : u++));
    setCats((c ?? []).map((x) => ({ ...x, count: counts[x.id] ?? 0 })));
    setUncat(u);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form) return;
    const name = form.name.trim();
    const slug = slugify(form.slug || name);
    if (!name || !slug) return toast.error("Numele este obligatoriu");
    setSaving(true);
    const payload = { name, slug, description: form.description.trim() || null };
    const { error } = form.id
      ? await supabase.from("blog_categories").update(payload).eq("id", form.id)
      : await supabase.from("blog_categories").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.code === "23505" ? "Există deja o categorie cu acest slug" : error.message);
    toast.success("Categoria a fost salvată");
    setForm(null);
    load();
  };

  const remove = async (c: Cat) => {
    if (!confirm(`Ștergi categoria „${c.name}"? Articolele (${c.count}) rămân fără categorie.`)) return;
    const { error } = await supabase.from("blog_categories").delete().eq("id", c.id);
    if (error) return toast.error(error.message);
    toast.success("Categorie ștearsă");
    load();
  };

  const most = [...cats].sort((a, b) => b.count - a.count)[0];
  const shown = cats.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <AdminPageHeader title="Categorii" actions={<Button className="gap-2 bg-amber-500 hover:bg-amber-400 text-black" onClick={() => setForm({ ...empty })}><Plus className="h-4 w-4" />Categorie nouă</Button>} />
      <main className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[["Total categorii", cats.length], ["Cea mai folosită", most && most.count ? `${most.name} (${most.count})` : "—"], ["Articole fără categorie", uncat]].map(([l, v]) => (
              <Card key={l as string} className="bg-[#1A1F2C] border-amber-500/20 p-4">
                <p className="text-sm text-gray-400">{l}</p>
                <p className="text-2xl font-bold text-white mt-1">{loading ? "…" : v}</p>
              </Card>
            ))}
          </div>

          {form && (
            <Card className="bg-[#1A1F2C] border-amber-500/30 p-4 space-y-3">
              <h2 className="font-semibold">{form.id ? "Editează categoria" : "Categorie nouă"}</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Nume" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.id ? form.slug : slugify(e.target.value) })} className="bg-[#0F1117] border-amber-500/20" />
                <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-[#0F1117] border-amber-500/20" />
              </div>
              <Textarea placeholder="Descriere (opțional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-[#0F1117] border-amber-500/20" />
              <div className="flex gap-2">
                <Button onClick={save} disabled={saving} className="gap-2 bg-amber-500 hover:bg-amber-400 text-black"><Save className="h-4 w-4" />{saving ? "Se salvează…" : "Salvează"}</Button>
                <Button variant="ghost" onClick={() => setForm(null)} className="gap-2"><X className="h-4 w-4" />Anulează</Button>
              </div>
            </Card>
          )}

          <Card className="bg-[#1A1F2C] border-amber-500/20 p-4 space-y-4">
            <Input placeholder="Caută categorii…" value={search} onChange={(e) => setSearch(e.target.value)} className="md:w-96 bg-[#0F1117] border-amber-500/20" />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead>Nume</TableHead><TableHead>Descriere</TableHead><TableHead>Articole</TableHead><TableHead className="text-right">Acțiuni</TableHead></TableRow></TableHeader>
                <TableBody>
                  {!loading && shown.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">Nicio categorie încă. Adaugă prima categorie.</TableCell></TableRow>}
                  {shown.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}<div className="text-xs text-gray-500">/{c.slug}</div></TableCell>
                      <TableCell className="text-gray-300">{c.description || "—"}</TableCell>
                      <TableCell>{c.count}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <Button variant="ghost" size="icon" aria-label="Editează" onClick={() => setForm({ id: c.id, name: c.name, slug: c.slug, description: c.description ?? "" })}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" aria-label="Șterge" onClick={() => remove(c)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
