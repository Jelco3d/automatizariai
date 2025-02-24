
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Calendar } from "lucide-react";
import { StatsOverview } from "@/components/analytics/StatsOverview";
import { TrafficChart } from "@/components/analytics/TrafficChart";
import { TrafficSources } from "@/components/analytics/TrafficSources";
import { AIInsights } from "@/components/analytics/AIInsights";

export default function BlogAnalytics() {
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
            <h1 className="text-xl font-semibold">Blog Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 border-purple-500/20">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" className="gap-2 border-purple-500/20">
              <Calendar className="h-4 w-4" />
              Last 7 Days
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <StatsOverview />
          <TrafficChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrafficSources />
            <AIInsights />
          </div>
        </div>
      </main>
    </div>
  );
}
