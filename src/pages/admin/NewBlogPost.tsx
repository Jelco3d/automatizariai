
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPost() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5 text-purple-400" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Create New Post</h1>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            Publish
          </Button>
        </div>

        {/* Main Form */}
        <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Title</label>
              <Input
                placeholder="Enter post title"
                className="bg-[#0F1117] border-purple-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Content</label>
              <Textarea
                placeholder="Write your post content here..."
                className="min-h-[400px] bg-[#0F1117] border-purple-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Category</label>
                <Input
                  placeholder="Select category"
                  className="bg-[#0F1117] border-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">Tags</label>
                <Input
                  placeholder="Add tags"
                  className="bg-[#0F1117] border-purple-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Featured Image</label>
              <Input
                type="file"
                accept="image/*"
                className="bg-[#0F1117] border-purple-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Meta Description</label>
              <Textarea
                placeholder="Enter meta description for SEO"
                className="bg-[#0F1117] border-purple-500/20"
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
