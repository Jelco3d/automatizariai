import { Card } from "@/components/ui/card";
import { List, Clock, MessageSquare, ChartBar } from "lucide-react";
export function StatsCards() {
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
        <div className="flex items-center gap-4">
          <List className="h-8 w-8 text-purple-400" />
          <div>
            <p className="text-sm text-slate-50 font-bold">Total Posts</p>
            <p className="text-2xl font-bold text-zinc-50">24</p>
          </div>
        </div>
      </Card>
      <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
        <div className="flex items-center gap-4">
          <Clock className="h-8 w-8 text-purple-400" />
          <div>
            <p className="text-slate-50 text-sm">Scheduled</p>
            <p className="text-2xl font-bold text-gray-50">3</p>
          </div>
        </div>
      </Card>
      <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
        <div className="flex items-center gap-4">
          <MessageSquare className="h-8 w-8 text-purple-400" />
          <div>
            <p className="text-sm text-gray-50">Comments</p>
            <p className="text-2xl font-bold text-slate-50">156</p>
          </div>
        </div>
      </Card>
      <Card className="bg-[#1A1F2C]/50 border-purple-500/20 p-4">
        <div className="flex items-center gap-4">
          <ChartBar className="h-8 w-8 text-purple-400" />
          <div>
            <p className="text-sm text-slate-50">Total Views</p>
            <p className="text-2xl font-bold text-slate-50">12.5K</p>
          </div>
        </div>
      </Card>
    </div>;
}