import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type View = { post_id: string; viewed_at: string; referrer: string | null };
type Post = { id: string; title: string; slug: string; views: number };
const RANGES = [7, 30, 90];

export default function BlogAnalytics() {
  const [days, setDays] = useState(30);
  const [views, setViews] = useState<View[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const since = new Date(Date.now() - days * 864e5).toISOString();
    Promise.all([
      supabase.from("blog_post_views").select("post_id,viewed_at,referrer").gte("viewed_at", since).limit(10000),
      supabase.from("blog_posts").select("id,title,slug,views").order("views", { ascending: false }),
    ]).then(([v, p]) => {
      if (v.error) toast.error(v.error.message);
      setViews(v.data ?? []);
      setPosts(p.data ?? []);
      setLoading(false);
    });
  }, [days]);

  const series = useMemo(() => {
    const map: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) map[new Date(Date.now() - i * 864e5).toISOString().slice(0, 10)] = 0;
    views.forEach((v) => { const d = v.viewed_at.slice(0, 10); if (d in map) map[d]++; });
    return Object.entries(map).map(([d, n]) => ({ d: d.slice(5).split("-").reverse().join("."), n }));
  }, [views, days]);

  const perPost = useMemo(() => {
    const c: Record<string, number> = {};
    views.forEach((v) => (c[v.post_id] = (c[v.post_id] ?? 0) + 1));
    return posts.map((p) => ({ ...p, period: c[p.id] ?? 0 })).sort((a, b) => b.period - a.period || b.views - a.views);
  }, [views, posts]);

  const referrers = useMemo(() => {
    const c: Record<string, number> = {};
    views.forEach((v) => { let h = "Direct"; try { if (v.referrer) h = new URL(v.referrer).hostname.replace(/^www\./, ""); } catch { /* ignore */ } c[h] = (c[h] ?? 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [views]);

  const total = posts.reduce((s, p) => s + p.views, 0);
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <AdminPageHeader title="Statistici blog" actions={RANGES.map((r) => (
        <Button key={r} size="sm" variant="ghost" onClick={() => setDays(r)} className={days === r ? "bg-amber-500 text-black hover:bg-amber-400" : "border border-amber-500/20"}>{r} zile</Button>
      ))} />
      <main className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[["Citiri în ultimele " + days + " zile", views.length], ["Citiri totale (de la început)", total], ["Articole citite în perioadă", perPost.filter((p) => p.period > 0).length]].map(([l, v]) => (
              <Card key={l as string} className="bg-[#1A1F2C] border-amber-500/20 p-4"><p className="text-sm text-gray-400">{l}</p><p className="text-2xl font-bold text-white mt-1">{loading ? "…" : v}</p></Card>
            ))}
          </div>
          <Card className="bg-[#1A1F2C] border-amber-500/20 p-4">
            <h2 className="font-semibold mb-4">Citiri pe zi</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series}>
                  <CartesianGrid stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="d" stroke="#64748B" fontSize={11} minTickGap={20} />
                  <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} width={30} />
                  <Tooltip contentStyle={{ background: "#1A1F2C", border: "1px solid #f59e0b55" }} formatter={(n) => [n, "citiri"]} />
                  <Area type="monotone" dataKey="n" stroke="#F59E0B" fill="#F59E0B33" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-[#1A1F2C] border-amber-500/20 p-4 md:col-span-2">
              <h2 className="font-semibold mb-3">Articole</h2>
              <ul className="divide-y divide-white/5">
                {perPost.length === 0 && <li className="text-gray-400 py-3">Niciun articol.</li>}
                {perPost.map((p) => (
                  <li key={p.id} className="flex justify-between gap-3 py-2 text-sm">
                    <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="hover:text-amber-300 truncate">{p.title}</a>
                    <span className="whitespace-nowrap text-gray-300"><b className="text-white">{p.period}</b> / {p.views} total</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="bg-[#1A1F2C] border-amber-500/20 p-4">
              <h2 className="font-semibold mb-3">De unde vin cititorii</h2>
              <ul className="space-y-2 text-sm">
                {referrers.length === 0 && <li className="text-gray-400">Nicio citire în perioadă.</li>}
                {referrers.map(([h, n]) => <li key={h} className="flex justify-between"><span className="truncate">{h}</span><b>{n}</b></li>)}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
