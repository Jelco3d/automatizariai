import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, Settings, Globe, MessageSquare, Link as LinkIcon, Palette, Bot, Shield, HelpCircle, RotateCcw } from "lucide-react";
export default function BlogSettings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };
  return <div className="min-h-screen bg-[#0F1117] text-white">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-[#1A1F2C] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5 text-purple-400" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Blog Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 border-purple-500/20">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button className="gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Settings Navigation */}
          <div className="col-span-12 md:col-span-3">
            <nav className="space-y-2">
              <Link to="#general">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <Settings className="h-4 w-4" />
                  General Settings
                </Button>
              </Link>
              <Link to="#seo">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <Globe className="h-4 w-4" />
                  SEO & Metadata
                </Button>
              </Link>
              <Link to="#comments">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <MessageSquare className="h-4 w-4" />
                  Comments
                </Button>
              </Link>
              <Link to="#integrations">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <LinkIcon className="h-4 w-4" />
                  Integrations
                </Button>
              </Link>
              <Link to="#appearance">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <Palette className="h-4 w-4" />
                  Appearance
                </Button>
              </Link>
              <Link to="#ai">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <Bot className="h-4 w-4" />
                  AI Tools
                </Button>
              </Link>
              <Link to="#security">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-purple-500/10">
                  <Shield className="h-4 w-4" />
                  Security
                </Button>
              </Link>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {/* General Settings */}
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-neutral-50">
                  <Settings className="h-5 w-5" />
                  General Settings
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium rounded bg-slate-50">Blog Title</label>
                    <Input placeholder="Enter blog title..." className="bg-[#1A1F2C] border-purple-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium bg-white/0">Blog Description</label>
                    <Textarea placeholder="Enter blog description..." className="bg-[#1A1F2C] border-purple-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Author</label>
                    <Input placeholder="Select default author..." className="bg-[#1A1F2C] border-purple-500/20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO & Metadata */}
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  SEO & Metadata
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Title Template</label>
                    <Input placeholder="%post_title% | %site_name%" className="bg-[#1A1F2C] border-purple-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meta Description Template</label>
                    <Textarea placeholder="Enter meta description template..." className="bg-[#1A1F2C] border-purple-500/20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="fixed bottom-6 right-6 h-12 w-12 rounded-full border-purple-500/20">
                  <HelpCircle className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1A1F2C] border-purple-500/20">
                <SheetHeader>
                  <SheetTitle className="text-white">Settings Help</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <h3 className="font-medium">General Settings</h3>
                  <p className="text-sm text-gray-400">
                    Configure basic blog information like title, description, and default author.
                  </p>
                  <h3 className="font-medium">SEO & Metadata</h3>
                  <p className="text-sm text-gray-400">
                    Optimize your blog's search engine visibility with meta titles and descriptions.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
    </div>;
}