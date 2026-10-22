import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { LayoutDashboard, List, FilePlus, Tag, MessageSquare, ChartBar, Settings, LogOut, Edit, Trash, Eye, Database, FileText, CheckSquare, Search, User } from "lucide-react";
export default function AdminBlog() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleNewPost = () => {
    navigate("/admin/blog/new");
  };
  return <div className="min-h-screen bg-[#0F1117] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1A1F2C] border-r border-purple-500/20 p-4 hidden md:block">
        <Link to="/admin" className="flex items-center mb-8">
          <img src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" alt="Logo" className="h-16 w-auto rounded-xl" />
        </Link>

        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/blog" className="flex items-center gap-2 text-purple-400 bg-purple-500/10 p-2 rounded-lg">
            <List className="h-5 w-5" />
            Blog Posts
          </Link>
          <Button onClick={handleNewPost} className="w-full justify-start gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
            <FilePlus className="h-5 w-5" />
            New Post
          </Button>
          <Link to="/admin/categories" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <Tag className="h-5 w-5" />
            Categories
          </Link>
          <Link to="/admin/comments" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <MessageSquare className="h-5 w-5" />
            Comments
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <ChartBar className="h-5 w-5" />
            Analytics
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1A1F2C] border-b border-purple-500/20 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Blog Management</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
            <div className="flex items-center gap-4">
              <Database className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Total Posts</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Drafts</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
            <div className="flex items-center gap-4">
              <CheckSquare className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Published</p>
                <p className="text-2xl font-bold">16</p>
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
              <Input type="search" placeholder="Search posts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-[#1A1F2C]/50 border-purple-500/20" />
            </div>
            <Button variant="outline" className="border-purple-500/20 bg-[#c605e9]">
              Filter
            </Button>
          </div>

          {/* Posts Table */}
          <Card className="bg-[#1A1F2C]/50 border-purple-500/20">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-purple-400">Title</TableHead>
                  <TableHead className="text-purple-400">Author</TableHead>
                  <TableHead className="text-purple-400">Status</TableHead>
                  <TableHead className="text-purple-400">Date</TableHead>
                  <TableHead className="text-purple-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map(i => <TableRow key={i}>
                    <TableCell className="font-medium bg-black/0">
                      How AI is Changing Business
                    </TableCell>
                    <TableCell>Alex Ionescu</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                        Published
                      </span>
                    </TableCell>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-[#1A1F2C] border-t border-purple-500/20 p-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>Last synced: 2 minutes ago</p>
            <div className="flex gap-4">
              <Link to="/admin/help" className="hover:text-purple-400">
                Help
              </Link>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>;
}