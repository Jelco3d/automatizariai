
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  List, 
  FilePlus, 
  Tag, 
  MessageSquare, 
  ChartBar, 
  Settings
} from "lucide-react";

export function Sidebar() {
  return (
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
  );
}
