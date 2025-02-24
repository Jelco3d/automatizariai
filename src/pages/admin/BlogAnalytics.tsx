
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { 
  ArrowLeft, 
  Download,
  Calendar,
  TrendingUp,
  Clock,
  Share2,
  MousePointerClick,
  Users,
  Filter,
  RefreshCcw
} from "lucide-react";

// Sample data - replace with real data in production
const viewsData = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 3000 },
  { name: 'Wed', views: 5000 },
  { name: 'Thu', views: 2780 },
  { name: 'Fri', views: 1890 },
  { name: 'Sat', views: 2390 },
  { name: 'Sun', views: 3490 },
];

const sourceData = [
  { name: 'Organic', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Direct', value: 300 },
  { name: 'Referral', value: 200 },
];

const COLORS = ['#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'];

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
          {/* Stats Overview */}
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

          {/* Traffic Chart */}
          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Traffic Overview</CardTitle>
                <Button variant="ghost" size="icon">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#8b5cf6" 
                      fillOpacity={1} 
                      fill="url(#colorViews)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card className="bg-[#1A1F2C] border-purple-500/20">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Distribution of visitor origins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4">
                  {sourceData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
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
          </div>
        </div>
      </main>
    </div>
  );
}
