
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { BlogContent } from "@/components/blog/BlogContent";

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      <BlogContent />
      <Footer />
    </div>
  );
}
