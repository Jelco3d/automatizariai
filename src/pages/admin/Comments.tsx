import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Ban, Trash2, Undo2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { formatRoDate } from "@/lib/blog";

type Status = "pending" | "approved" | "spam";
type Row = { id: string; author_name: string; author_email: string; content: string; status: Status; created_at: string; blog_posts: { title: string; slug: string } | null };
const tabs: { k: Status; l: string }[] = [{ k: "pending", l: "În așteptare" }, { k: "approved", l: "Aprobate" }, { k: "spam", l: "Spam" }];

export default function Comments() {
  const [rows, setRows] = useState<Row[]>([]);
  const [tab, setTab] = useState<Status>("pending");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blog_comments").select("id,author_name,author_email,content,status,created_at,blog_posts(title,slug)").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as unknown as Row[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: Status) => {
    const { error } = await supabase.from("blog_comments").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(status === "approved" ? "Comentariu aprobat — apare acum pe site" : status === "spam" ? "Marcat ca spam" : "Mutat în așteptare");
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const remove = async (id: string) => {
    if (!confirm("Ștergi definitiv comentariul?")) return;
    const { error } = await supabase.from("blog_comments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const count = (s: Status) => rows.filter((r) => r.status === s).length;
  const shown = rows.filter((r) => r.status === tab);

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <AdminPageHeader title="Comentarii" />
      <main className="p-4 md:p-6 overflow-x-hidden">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Button key={t.k} variant="ghost" onClick={() => setTab(t.k)} className={tab === t.k ? "bg-amber-500 text-black hover:bg-amber-400" : "border border-amber-500/20 text-white"}>
                {t.l} ({count(t.k)})
              </Button>
            ))}
          </div>
          {loading ? <p className="text-gray-400">Se încarcă…</p> : shown.length === 0 ? (
            <Card className="bg-[#1A1F2C] text-white border-amber-500/20 p-8 text-center text-gray-400">Niciun comentariu aici.</Card>
          ) : shown.map((c) => (
            <Card key={c.id} className="bg-[#1A1F2C] text-white border-amber-500/20 p-4 space-y-3">
              <div className="flex flex-wrap justify-between gap-2 text-sm">
                <p><span className="font-semibold text-white">{c.author_name}</span> <span className="text-gray-400">· {c.author_email}</span></p>
                <p className="text-gray-500">{formatRoDate(c.created_at)}</p>
              </div>
              {c.blog_posts && <a href={`/blog/${c.blog_posts.slug}`} target="_blank" rel="noreferrer" className="text-xs text-amber-400 hover:underline">la: {c.blog_posts.title}</a>}
              <p className="text-gray-200 whitespace-pre-line break-words">{c.content}</p>
              <div className="flex flex-wrap gap-2">
                {c.status !== "approved" && <Button size="sm" onClick={() => setStatus(c.id, "approved")} className="gap-1 bg-green-600 hover:bg-green-500 text-white"><Check className="h-4 w-4" />Aprobă</Button>}
                {c.status !== "pending" && <Button size="sm" variant="ghost" onClick={() => setStatus(c.id, "pending")} className="gap-1 border border-amber-500/20 text-white"><Undo2 className="h-4 w-4" />În așteptare</Button>}
                {c.status !== "spam" && <Button size="sm" variant="ghost" onClick={() => setStatus(c.id, "spam")} className="gap-1 border border-amber-500/20 text-white"><Ban className="h-4 w-4" />Spam</Button>}
                <Button size="sm" variant="ghost" onClick={() => remove(c.id)} className="gap-1 text-red-400"><Trash2 className="h-4 w-4" />Șterge</Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
