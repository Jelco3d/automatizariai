
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Search, Filter, ArrowUp, ArrowDown, Edit, Eye, Trash } from "lucide-react";

interface Post {
  id: number;
  title: string;
  status: "published" | "draft" | "scheduled";
  date: string;
  views: number;
  trend: "up" | "down" | "neutral";
}

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

export function RecentPosts() {
  return (
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
  );
}
