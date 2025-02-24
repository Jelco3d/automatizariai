
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowLeft, Plus, Search, Sparkles, Edit, Trash2, Grid, List } from "lucide-react";

export default function Categories() {
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
            <h1 className="text-xl font-semibold">Categories</h1>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
            <Plus className="h-4 w-4" />
            New Category
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search categories..." 
                className="pl-10 bg-[#1A1F2C] border-purple-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="border-purple-500/20">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-purple-500/20">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Total Categories</CardTitle>
                <CardDescription>Across all blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">24</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Most Used</CardTitle>
                <CardDescription>Popular category</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">AI Tools</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Uncategorized</CardTitle>
                <CardDescription>Posts without category</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3</p>
              </CardContent>
            </Card>
          </div>

          {/* Categories Table */}
          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Categories</CardTitle>
                <Button variant="outline" className="gap-2 border-purple-500/20">
                  <Sparkles className="h-4 w-4" />
                  AI Suggestions
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AI Tools</TableCell>
                    <TableCell>Reviews and comparisons of AI tools</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Machine Learning</TableCell>
                    <TableCell>ML concepts and tutorials</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>5 days ago</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
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
