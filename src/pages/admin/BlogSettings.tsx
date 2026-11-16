import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Save } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { BLOG_SETTING_DEFAULTS, type BlogSettingsValues } from "@/lib/blogSettings";

export default function BlogSettings() {
  const [v, setV] = useState<BlogSettingsValues>(BLOG_SETTING_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("blog_settings").select("key,value").then(({ data, error }) => {
      if (error) toast.error(error.message);
      const next = { ...BLOG_SETTING_DEFAULTS } as Record<string, unknown>;
      (data ?? []).forEach((r) => { if (r.key in next) next[r.key] = r.value; });
      setV(next as BlogSettingsValues);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const rows = Object.entries(v).map(([key, value]) => ({ key, value, is_public: true, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from("blog_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) toast.error(error.code === "42501" ? "Doar administratorii pot salva setările" : error.message);
    else toast.success("Setările au fost salvate");
  };

  const field = "bg-[#0F1117] border-amber-500/20 text-white";
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <AdminPageHeader title="Setări blog" actions={<Button onClick={save} disabled={saving || loading} className="gap-2 bg-amber-500 hover:bg-amber-400 text-black"><Save className="h-4 w-4" />{saving ? "Se salvează…" : "Salvează"}</Button>} />
      <main className="p-4 md:p-6 overflow-x-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-[#1A1F2C] text-white border-amber-500/20 p-5 space-y-4">
            <h2 className="font-semibold text-amber-400">General</h2>
            <label className="block space-y-1"><span className="text-sm text-gray-300">Titlul blogului</span>
              <Input className={field} value={v.blog_title} onChange={(e) => setV({ ...v, blog_title: e.target.value })} /></label>
            <label className="block space-y-1"><span className="text-sm text-gray-300">Descrierea blogului</span>
              <Textarea className={field} value={v.blog_description} onChange={(e) => setV({ ...v, blog_description: e.target.value })} /></label>
            <label className="block space-y-1"><span className="text-sm text-gray-300">Autor implicit</span>
              <Input className={field} value={v.default_author} onChange={(e) => setV({ ...v, default_author: e.target.value })} /></label>
          </Card>
          <Card className="bg-[#1A1F2C] text-white border-amber-500/20 p-5 space-y-4">
            <h2 className="font-semibold text-amber-400">Comentarii</h2>
            <div className="flex items-center justify-between gap-4">
              <div><p className="font-medium text-white">Permite comentarii</p><p className="text-sm text-gray-400">Cititorii pot lăsa comentarii. Apar pe site doar după aprobare.</p></div>
              <Switch checked={v.comments_enabled} onCheckedChange={(c) => setV({ ...v, comments_enabled: c })} />
            </div>
          </Card>
          <p className="text-xs text-gray-500">{loading ? "Se încarcă…" : "Valorile sunt citite din baza de date."}</p>
        </div>
      </main>
    </div>
  );
}
