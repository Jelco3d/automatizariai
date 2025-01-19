import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, LineChart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseStudyResult {
  timeReduction: string;
  costSaving: string;
  roi: string;
  timeline: string;
}

interface BeforeAfter {
  before: string;
  after: string;
}

interface CaseStudyProps {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult;
  beforeAfter: BeforeAfter;
}

export const CaseStudyCard = ({
  client,
  industry,
  challenge,
  solution,
  results,
  beforeAfter,
}: CaseStudyProps) => {
  console.log("Rendering CaseStudyCard for:", client);
  const navigate = useNavigate();
  
  return (
    <Card 
      className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all cursor-pointer"
      onClick={() => navigate('/portfolio')}
    >
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-purple-400 mb-4">{client}</h3>
        <p className="text-gray-300 mb-4">{industry}</p>
        
        <div className="space-y-6">
          {/* Challenge & Solution */}
          <div>
            <h4 className="text-lg font-semibold mb-2 text-white">Challenge:</h4>
            <p className="text-gray-300">{challenge}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-white">Solution:</h4>
            <p className="text-gray-300">{solution}</p>
          </div>

          {/* Before/After */}
          <div className="grid grid-cols-2 gap-4 bg-purple-500/5 p-4 rounded-lg text-white">
            <div>
              <h5 className="font-semibold text-purple-400 mb-2">Before</h5>
              <p className="text-gray-300">{beforeAfter.before}</p>
            </div>
            <div>
              <h5 className="font-semibold text-purple-400 mb-2">After</h5>
              <p className="text-gray-300">{beforeAfter.after}</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Time Saved</p>
                <p className="font-semibold text-white">{results.timeReduction}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Cost Savings</p>
                <p className="font-semibold text-white">{results.costSaving}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LineChart className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">ROI</p>
                <p className="font-semibold text-white">{results.roi}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Timeline</p>
                <p className="font-semibold text-white">{results.timeline}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};