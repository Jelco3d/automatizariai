
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export const AIInsights = () => {
  return (
    <Card className="bg-[#1A1F2C] border-purple-500/20">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
        <CardDescription>Automated content recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Top Performing Topics</h4>
          <p className="text-sm text-gray-400">
            Posts about "AI Tools" receive 2.5x more engagement
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Optimal Posting Time</h4>
          <p className="text-sm text-gray-400">
            Tuesday mornings show highest reader engagement
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Content Length</h4>
          <p className="text-sm text-gray-400">
            Articles between 1,500-2,000 words perform best
          </p>
        </div>
        <Button className="w-full gap-2">
          <Users className="h-4 w-4" />
          View Detailed Audience Analysis
        </Button>
      </CardContent>
    </Card>
  );
};
