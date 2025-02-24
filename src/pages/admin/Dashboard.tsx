
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { 
  LayoutDashboard, 
  List, 
  FilePlus, 
  Tag, 
  MessageSquare, 
  ChartBar, 
  Settings, 
  LogOut, 
  User, 
  Search,
  Edit,
  Trash,
  Eye,
  Clock,
  ArrowUp,
  ArrowDown,
  Filter
} from "lucide-react";

const recentPosts = [
  {
    id: 1,
    title: "Getting Started with AI Automation",
    status: "published",
    date: "2024-03-15",
    views: 1250,
    trend: "up"
  },
  {
    id: 2,
    title: "Top 10 AI Tools for Content Creation",
    status: "draft",
    date: "2024-03-14",
    views: 0,
    trend: "neutral"
  },
  {
    id: 3,
    title: "The Future of Machine Learning",
    status: "scheduled",
    date: "2024-03-16",
    views: 0,
    trend: "neutral"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1A1F2C] border-r border-purple-500/20 p-4 hidden md:block">
        <Link to="/admin" className="flex items-center mb-8">
          <img src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" alt="Logo" className="h-12 w-auto rounded-xl" />
        </Link>

        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center gap-2 text-purple-400 bg-purple-500/10 p-2 rounded-lg">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/admin/blog" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <List className="h-5 w-5" />
            Blog Posts
          </Link>
          <Link to="/admin/blog/new" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <FilePlus className="h-5 w-5" />
            New Post
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <Tag className="h-5 w-5" />
            Categories
          </Link>
          <Link to="/admin/blog/comments" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <MessageSquare className="h-5 w-5" />
            Comments
          </Link>
          <Link to="/admin/blog/analytics" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <ChartBar className="h-5 w-5" />
            Analytics
          </Link>
          <Link to="/admin/blog/settings" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </aside>

      <div className="flex-1">
        {/* Header */}
        <header className="bg-[#1A1F2C] border-b border-purple-500/20 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Blog Dashboard</h1>
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

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
              <div className="flex items-center gap-4">
                <List className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Posts</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </Card>
            <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Scheduled</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </Card>
            <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Comments</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </Card>
            <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
              <div className="flex items-center gap-4">
                <ChartBar className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold">12.5K</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card className="bg-[#1A1F2C]/50 border-purple-500/20">
            <div className="p-4 border-b border-purple-500/20 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Posts</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search" 
                    placeholder="Search posts..." 
                    className="pl-10 bg-[#1A1F2C]/50 border-purple-500/20" 
                  />
                </div>
                <Button variant="outline" className="gap-2 border-purple-500/20">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-purple-400">Title</TableHead>
                  <TableHead className="text-purple-400">Status</TableHead>
                  <TableHead className="text-purple-400">Date</TableHead>
                  <TableHead className="text-purple-400">Views</TableHead>
                  <TableHead className="text-purple-400">Trend</TableHead>
                  <TableHead className="text-purple-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPosts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        post.status === 'draft' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell>
                      {post.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-green-400" />
                      ) : post.trend === 'down' ? (
                        <ArrowDown className="h-4 w-4 text-red-400" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
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
                  </TableRow>
                ))}
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
    </div>
  );
}
