
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const sourceData = [
  { name: 'Organic', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Direct', value: 300 },
  { name: 'Referral', value: 200 },
];

const COLORS = ['#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'];

export const TrafficSources = () => {
  return (
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
  );
};
