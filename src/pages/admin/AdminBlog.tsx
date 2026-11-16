import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { LayoutDashboard, List, FilePlus, Tag, MessageSquare, ChartBar, Settings, LogOut, Edit, Trash, Eye, Database, FileText, CheckSquare, Search, User } from "lucide-react";
export default function AdminBlog() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState<{ id: string; title: string; slug: string; status: string; author_name: string | null; published_at: string | null; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    const { data, error } = await supabase.from("blog_posts").select("id,title,slug,status,author_name,published_at,created_at").order("created_at", { ascending: false });
    if (error) toast.error("Nu am putut încărca articolele");
    setPosts(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  const filtered = useMemo(() => posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())), [posts, searchTerm]);
  const count = (s?: string) => (s ? posts.filter(p => p.status === s).length : posts.length);
  const handleDelete = async (id: string) => {
    if (!confirm("Ștergi definitiv acest articol?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error("Ștergerea a eșuat");
    setPosts(p => p.filter(x => x.id !== id));
  };
  const handleSignOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };
  const handleNewPost = () => {
    navigate("/admin/blog/new");
  };
  return <div className="min-h-screen bg-[#0F1117] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1A1F2C] border-r border-amber-500/20 p-4 hidden md:block">
        <Link to="/admin/blog" className="flex items-center mb-8">
          <img src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" alt="Logo" className="h-16 w-auto rounded-xl" />
        </Link>

        <nav className="space-y-2">
          <Link to="/admin/blog" className="flex items-center gap-2 text-amber-400 bg-amber-500/10 p-2 rounded-lg">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/blog" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 p-2 rounded-lg hover:bg-amber-500/10">
            <List className="h-5 w-5" />
            Blog Posts
          </Link>
          <Button onClick={handleNewPost} className="w-full justify-start gap-2 bg-amber-500 text-black hover:bg-amber-400">
            <FilePlus className="h-5 w-5" />
            New Post
          </Button>
          <Link to="/admin/categories" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 p-2 rounded-lg hover:bg-amber-500/10">
            <Tag className="h-5 w-5" />
            Categories
          </Link>
          <Link to="/admin/blog/comments" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 p-2 rounded-lg hover:bg-amber-500/10">
            <MessageSquare className="h-5 w-5" />
            Comments
          </Link>
          <Link to="/admin/blog/analytics" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 p-2 rounded-lg hover:bg-amber-500/10">
            <ChartBar className="h-5 w-5" />
            Analytics
          </Link>
          <Link to="/admin/blog/settings" className="flex items-center gap-2 text-gray-400 hover:text-amber-400 p-2 rounded-lg hover:bg-amber-500/10">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1A1F2C] border-b border-amber-500/20 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Blog Management</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Ieșire">
                <LogOut className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <Card className="bg-[#1A1F2C]/50 border-amber-500/20 p-4">
            <div className="flex items-center gap-4">
              <Database className="h-8 w-8 text-amber-400" />
              <div>
                <p className="text-sm text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold text-white">{count()}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1F2C]/50 border-amber-500/20 p-4">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-amber-400" />
              <div>
                <p className="text-sm text-gray-400">Drafts</p>
                <p className="text-2xl font-bold text-white">{count("draft")}</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1F2C]/50 border-amber-500/20 p-4">
            <div className="flex items-center gap-4">
              <CheckSquare className="h-8 w-8 text-amber-400" />
              <div>
                <p className="text-sm text-gray-400">Published</p>
                <p className="text-2xl font-bold text-white">{count("published")}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Search and Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search posts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-[#1A1F2C]/50 border-amber-500/20" />
            </div>
          </div>

          {/* Posts Table */}
          <Card className="bg-[#1A1F2C]/50 border-amber-500/20">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-amber-400">Title</TableHead>
                  <TableHead className="text-amber-400">Author</TableHead>
                  <TableHead className="text-amber-400">Status</TableHead>
                  <TableHead className="text-amber-400">Date</TableHead>
                  <TableHead className="text-amber-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? <TableRow><TableCell colSpan={5} className="text-gray-400">Se încarcă...</TableCell></TableRow>
                : filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-gray-400">Niciun articol încă.</TableCell></TableRow>
                : filtered.map(p => <TableRow key={p.id}>
                    <TableCell className="font-medium text-white">{p.title}</TableCell>
                    <TableCell className="text-gray-300">{p.author_name ?? "—"}</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400">{p.status}</span></TableCell>
                    <TableCell className="text-gray-300">{(p.published_at ?? p.created_at).slice(0, 10)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" aria-label="Editează" onClick={() => navigate(`/admin/blog/edit/${p.id}`)}><Edit className="h-4 w-4 text-gray-400" /></Button>
                        <Button variant="ghost" size="icon" aria-label="Vezi" onClick={() => window.open(`/blog/${p.slug}`, "_blank")}><Eye className="h-4 w-4 text-gray-400" /></Button>
                        <Button variant="ghost" size="icon" aria-label="Șterge" onClick={() => handleDelete(p.id)}><Trash className="h-4 w-4 text-gray-400" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-[#1A1F2C] border-t border-amber-500/20 p-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>{posts.length} articole</p>
            <div className="flex gap-4">
              <span>Version 1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>;
}