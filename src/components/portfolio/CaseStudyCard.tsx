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
      className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-yellow-400/30 transition-all cursor-pointer hover:shadow-lg hover:shadow-yellow-500/[0.05]"
      onClick={() => navigate('/portfolio')}
    >
      <CardContent className="p-4 md:p-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">{client}</h3>
        <p className="text-white/60 mb-4">{industry}</p>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-white">Provocare:</h4>
            <p className="text-white/60">{challenge}</p>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-white">Soluție:</h4>
            <p className="text-white/60">{solution}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-yellow-400/5 p-4 rounded-lg text-white">
            <div>
              <h5 className="font-semibold text-yellow-400 mb-2">Înainte</h5>
              <p className="text-white/60">{beforeAfter.before}</p>
            </div>
            <div>
              <h5 className="font-semibold text-yellow-400 mb-2">După</h5>
              <p className="text-white/60">{beforeAfter.after}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Clock, label: "Timp Economisit", value: results.timeReduction },
              { icon: DollarSign, label: "Economii", value: results.costSaving },
              { icon: LineChart, label: "ROI", value: results.roi },
              { icon: Zap, label: "Durată", value: results.timeline },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon className="text-yellow-400" />
                <div>
                  <p className="text-sm text-white/40">{label}</p>
                  <p className="font-semibold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
