
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Search, 
  Shield, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Flag,
  MoreVertical 
} from "lucide-react";

export default function Comments() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-[#1A1F2C] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5 text-purple-400" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Comments Management</h1>
          </div>
          <Button variant="outline" className="gap-2 border-purple-500/20">
            <Shield className="h-4 w-4" />
            Update AI Moderation Rules
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Total Comments</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Pending Review</CardTitle>
                <CardDescription>Needs moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-500">23</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Flagged</CardTitle>
                <CardDescription>Potential violations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-500">5</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">AI Approved</CardTitle>
                <CardDescription>Auto-moderated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-500">891</p>
              </CardContent>
            </Card>
          </div>

          {/* Comments Table */}
          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CardTitle>Recent Comments</CardTitle>
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search comments..." 
                    className="pl-10 bg-[#1A1F2C] border-purple-500/20"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-gray-400">john@example.com</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">Great article on AI automation! I've been using similar tools in my workflow.</p>
                    </TableCell>
                    <TableCell>
                      <Link to="/blog/post-1" className="text-purple-400 hover:underline">
                        Getting Started with AI
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Approved</span>
                      </div>
                    </TableCell>
                    <TableCell>2h ago</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Flag className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-xs text-gray-400">jane@example.com</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">This content seems promotional. Please review our guidelines.</p>
                    </TableCell>
                    <TableCell>
                      <Link to="/blog/post-2" className="text-purple-400 hover:underline">
                        AI Tools Comparison
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Pending</span>
                      </div>
                    </TableCell>
                    <TableCell>5h ago</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Flag className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
