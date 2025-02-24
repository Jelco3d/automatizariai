
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Share2, MousePointerClick } from "lucide-react";

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-[#1A1F2C] border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            Total Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">24.5K</p>
          <p className="text-sm text-green-400">+12% vs last week</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1A1F2C] border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-400" />
            Avg. Read Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">4:30</p>
          <p className="text-sm text-gray-400">minutes per visit</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1A1F2C] border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Share2 className="h-4 w-4 text-purple-400" />
            Engagement Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">8.2%</p>
          <p className="text-sm text-red-400">-2% vs last week</p>
        </CardContent>
      </Card>
      <Card className="bg-[#1A1F2C] border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-purple-400" />
            Bounce Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">32%</p>
          <p className="text-sm text-green-400">-5% vs last week</p>
        </CardContent>
      </Card>
    </div>
  );
};
