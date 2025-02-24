
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { StatsCards } from "@/components/admin/StatsCards";
import { RecentPosts } from "@/components/admin/RecentPosts";
import { Footer } from "@/components/admin/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 space-y-6">
          <StatsCards />
          <RecentPosts />
        </main>
        <Footer />
      </div>
    </div>
  );
}
