import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertCircle, Info, Lightbulb, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Insight {
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'neutral';
}

interface BusinessInsight {
  id: string;
  summary: string;
  insights: Insight[];
  recommendations: string[];
  metrics: any;
  created_at: string;
  period_start: string;
  period_end: string;
}

export const AIInsights = () => {
  const [insights, setInsights] = useState<BusinessInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchLatestInsights();
  }, []);

  const generateNewInsights = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-business-insights');
      
      if (error) {
        console.error('Error generating insights:', error);
        toast({
          title: "Eroare",
          description: "Nu s-au putut genera insights-urile. Te rugăm să încerci din nou.",
          variant: "destructive",
        });
        return;
      }

      // Wait a bit for the data to be written to the database
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Refresh the insights
      await fetchLatestInsights();
      
      toast({
        title: "Succes!",
        description: "Insights-urile au fost generate cu succes.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la generarea insights-urilor.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const fetchLatestInsights = async () => {
    try {
      const { data, error } = await supabase
        .from('business_insights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching insights:', error);
      } else if (data) {
        // Transform the data to match our interface
        const transformedData: BusinessInsight = {
          id: data.id,
          summary: data.summary,
          insights: Array.isArray(data.insights) ? (data.insights as unknown as Insight[]) : [],
          recommendations: data.recommendations,
          metrics: data.metrics,
          created_at: data.created_at,
          period_start: data.period_start,
          period_end: data.period_end
        };
        setInsights(transformedData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  const getInsightBadgeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  if (loading) {
    return (
      <Card className="bg-[#1A1F2C] border-purple-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Business Insights
            </CardTitle>
            <CardDescription>Analiză automată generată de AI</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewInsights}
            disabled={generating}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Se generează...' : 'Actualizează'}
          </Button>
        </div>
      </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </CardContent>
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card className="bg-[#1A1F2C] border-purple-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Business Insights
            </CardTitle>
            <CardDescription>Analiză automată generată de AI</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewInsights}
            disabled={generating}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Se generează...' : 'Generează'}
          </Button>
        </div>
      </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">
            Nu există insights disponibile încă. Sistemul va genera automat rapoarte periodic.
          </p>
        </CardContent>
      </Card>
    );
  }

  const periodStart = new Date(insights.period_start).toLocaleDateString('ro-RO');
  const periodEnd = new Date(insights.period_end).toLocaleDateString('ro-RO');

  return (
    <Card className="bg-[#1A1F2C] border-purple-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Business Insights
            </CardTitle>
            <CardDescription>
              Analiză automată pentru perioada {periodStart} - {periodEnd}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewInsights}
            disabled={generating}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${generating ? 'animate-spin' : ''}`} />
            {generating ? 'Se generează...' : 'Actualizează'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-white text-sm leading-relaxed">{insights.summary}</p>
        </div>

        {/* Key Metrics */}
        {insights.metrics && typeof insights.metrics === 'object' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(insights.metrics).map(([key, value]) => (
              <div key={key} className="bg-[#0F1117] p-3 rounded-lg border border-purple-500/10">
                <p className="text-xs text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-lg font-bold text-white mt-1">
                  {typeof value === 'number' && key.toLowerCase().includes('revenue')
                    ? `${Number(value).toFixed(2)} RON`
                    : String(value)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Insights */}
        {insights.insights && insights.insights.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Info className="h-4 w-4" />
              Observații cheie
            </h4>
            {insights.insights.map((insight, index) => (
              <div
                key={index}
                className="p-3 bg-[#0F1117] border border-purple-500/10 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-medium text-white">{insight.title}</h5>
                      <Badge className={getInsightBadgeColor(insight.type)} variant="outline">
                        {insight.type === 'positive' ? 'Pozitiv' : 
                         insight.type === 'warning' ? 'Atenție' : 'Info'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {insights.recommendations && insights.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              Recomandări
            </h4>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-300 p-2 bg-[#0F1117] rounded border border-purple-500/10"
                >
                  <span className="text-purple-400 mt-1">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Last updated */}
        <p className="text-xs text-gray-500 text-center pt-4 border-t border-purple-500/10">
          Ultimul raport generat: {new Date(insights.created_at).toLocaleString('ro-RO')}
        </p>
      </CardContent>
    </Card>
  );
};
