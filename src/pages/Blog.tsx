
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { BlogContent } from "@/components/blog/BlogContent";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <BlogContent />
      <Footer />
    </div>
  );
}
