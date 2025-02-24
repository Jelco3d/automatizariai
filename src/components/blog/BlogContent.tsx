
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface BlogPost {
  date: string;
  title: string;
  image?: string;
  excerpt: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    date: "FEB 10, 2024",
    title: "Frans Bergström: Elevating Digital Products with Purposeful Illustration",
    image: "/lovable-uploads/3855f6f0-009c-4fdb-9b4c-00014c36b561.png",
    excerpt: "We interviewed Frans Bergström, a product designer who continues to resonate within the creative community. His unique approach—fuzing storytelling with design—and passion for illustration and motion design have established him as a sought-after designer.",
    slug: "frans-bergstrom-interview"
  },
  {
    date: "FEB 5, 2024",
    title: "Work In Progress, Part 7 💪",
    excerpt: "We just released Milestones, a feature that enables designers to receive payouts incrementally as each phase of their project is completed (and even before work has begun if they negotiate an upfront payment with their client). This has been one of the most requested new features by both clients and designers.",
    slug: "work-in-progress-7"
  },
  {
    date: "DEC 17, 2024",
    title: "Work In Progress, Part 6 💪",
    excerpt: "Last week, we released Services, allowing designers to sell freelance services that can be purchased instantly on Dribbble. Designers outline the work offered and set the price, completion time, number of revisions, and any other specifications they want to include.",
    slug: "work-in-progress-6"
  }
];

const categories = [
  "All Categories",
  "Interviews",
  "Podcast",
  "Inspiration",
  "Process",
  "Meetups",
  "Updates",
  "Hang Time",
  "Community"
];

export function BlogContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 space-y-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Courtside:
              <br />
              The AI Blog
            </h1>
          </div>

          {/* Blog Posts */}
          <div className="space-y-16">
            {blogPosts.map((post, index) => (
              <article key={index} className="group space-y-4">
                <Link to={`/blog/${post.slug}`}>
                  <div className="space-y-4">
                    <div className="text-gray-500 text-sm">{post.date}</div>
                    <h2 className="text-2xl font-bold group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full rounded-lg"
                      />
                    )}
                    <p className="text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-64 space-y-8">
          <Card className="p-6 bg-gray-50 border-none">
            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </nav>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
