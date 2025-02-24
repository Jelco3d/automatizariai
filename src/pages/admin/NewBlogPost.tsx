
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Save, Eye, Settings, Sparkles, Calendar, Globe, Lock, HelpCircle, Image } from "lucide-react";

export default function NewBlogPost() {
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
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-purple-400">Home</Link>
              <Link to="/blog" className="text-gray-400 hover:text-purple-400">Blog</Link>
              <Link to="/admin" className="text-gray-400 hover:text-purple-400">Dashboard</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-purple-500/20">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Title Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Title</label>
                <span className="text-xs text-gray-400">45/70 characters</span>
              </div>
              <div className="relative">
                <Input
                  placeholder="Enter your blog post title..."
                  className="bg-[#0F1117] border-purple-500/20 pr-10"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  title="Generate AI suggestions"
                >
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </Button>
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Content</label>
                <span className="text-xs text-gray-400">Auto-saved 2 mins ago</span>
              </div>
              <Card className="bg-[#1A1F2C]/50 border-purple-500/20">
                <div className="border-b border-purple-500/20 p-2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Generate Introduction
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Improve SEO
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Fix Grammar
                  </Button>
                </div>
                <Textarea
                  placeholder="Start writing or click the AI suggestions button..."
                  className="min-h-[400px] bg-transparent border-none focus:ring-0"
                />
              </Card>
            </div>
          </div>
        </main>

        {/* Right Settings Panel */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="fixed right-4 top-20 md:hidden"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px] bg-[#1A1F2C] border-l border-purple-500/20 p-6">
            <div className="h-full space-y-6">
              {/* SEO Score */}
              <Card className="bg-[#0F1117] border-purple-500/20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">SEO Health Score</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">85/100</span>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </Card>

              {/* Featured Image */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Featured Image
                </h3>
                <Card className="bg-[#0F1117] border-purple-500/20 border-dashed aspect-video flex items-center justify-center">
                  <Button variant="ghost" className="text-sm">
                    Upload Image or Generate with AI
                  </Button>
                </Card>
              </div>

              {/* Publish Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">Publishing Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Schedule</span>
                    </div>
                    <Input
                      type="datetime-local"
                      className="w-40 bg-[#0F1117] border-purple-500/20"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">Visibility</span>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 border-purple-500/20">
                      <Lock className="h-4 w-4" />
                      Private
                    </Button>
                  </div>
                </div>
              </div>

              {/* Categories & Tags */}
              <div className="space-y-4">
                <h3 className="font-medium">Categories & Tags</h3>
                <div className="space-y-2">
                  <Input
                    placeholder="Select category..."
                    className="bg-[#0F1117] border-purple-500/20"
                  />
                  <Input
                    placeholder="Add tags..."
                    className="bg-[#0F1117] border-purple-500/20"
                  />
                  <Button variant="ghost" className="w-full gap-2 text-purple-400">
                    <Sparkles className="h-4 w-4" />
                    Auto-tag with AI
                  </Button>
                </div>
              </div>

              {/* Preview Actions */}
              <div className="pt-6 border-t border-purple-500/20">
                <Button className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  Preview Post
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
