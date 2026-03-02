import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserPlus } from "lucide-react";

interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  company_name: string;
  business_type: string | null;
  business_type_other: string | null;
  team_size: string | null;
  revenue: string | null;
  excel_count: string | null;
  platforms: string[] | null;
  platforms_other: string | null;
  time_lost: string | null;
  frustrations: string | null;
  impact_scale: number | null;
  weekly_quotes: string | null;
  daily_interactions: string | null;
  motivation: string | null;
  budget: string | null;
  source: string | null;
  created_at: string;
}

const Leads = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchLeads();
    };
    checkAuth();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("leadmagnet-audit-strategic")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const DetailRow = ({ label, value }: { label: string; value: string | number | null | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex flex-col gap-1 py-2 border-b border-purple-500/10 last:border-0">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-sm text-white">{String(value)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0f1a] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0f1a] flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <UserPlus className="h-6 w-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              {leads.length}
            </Badge>
          </div>

          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Audit Strategic - Formulare completate</CardTitle>
            </CardHeader>
            <CardContent>
              {leads.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Nu există lead-uri încă.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-500/20">
                        <TableHead className="text-gray-400">Nume</TableHead>
                        <TableHead className="text-gray-400">Firmă</TableHead>
                        <TableHead className="text-gray-400">Telefon</TableHead>
                        <TableHead className="text-gray-400">Email</TableHead>
                        <TableHead className="text-gray-400">Tip Afacere</TableHead>
                        <TableHead className="text-gray-400">Echipă</TableHead>
                        <TableHead className="text-gray-400">Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow
                          key={lead.id}
                          className="border-purple-500/10 cursor-pointer hover:bg-purple-500/5"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <TableCell className="text-white font-medium">{lead.full_name}</TableCell>
                          <TableCell className="text-gray-300">{lead.company_name}</TableCell>
                          <TableCell className="text-gray-300">{lead.phone}</TableCell>
                          <TableCell className="text-gray-300">{lead.email}</TableCell>
                          <TableCell className="text-gray-300">{lead.business_type || "-"}</TableCell>
                          <TableCell className="text-gray-300">{lead.team_size || "-"}</TableCell>
                          <TableCell className="text-gray-400 text-xs">{formatDate(lead.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Lead Details Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
          <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-lg max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">{selectedLead?.full_name}</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-1">
                <DetailRow label="Firmă" value={selectedLead.company_name} />
                <DetailRow label="Telefon" value={selectedLead.phone} />
                <DetailRow label="Email" value={selectedLead.email} />
                <DetailRow label="Tip afacere" value={selectedLead.business_type} />
                <DetailRow label="Tip afacere (altele)" value={selectedLead.business_type_other} />
                <DetailRow label="Echipă" value={selectedLead.team_size} />
                <DetailRow label="Cifră de afaceri" value={selectedLead.revenue} />
                <DetailRow label="Fișiere Excel" value={selectedLead.excel_count} />
                <DetailRow label="Platforme" value={selectedLead.platforms?.join(", ")} />
                <DetailRow label="Platforme (altele)" value={selectedLead.platforms_other} />
                <DetailRow label="Timp pierdut" value={selectedLead.time_lost} />
                <DetailRow label="Frustrări" value={selectedLead.frustrations} />
                <DetailRow label="Scară impact" value={selectedLead.impact_scale} />
                <DetailRow label="Oferte/săptămână" value={selectedLead.weekly_quotes} />
                <DetailRow label="Interacțiuni/zi" value={selectedLead.daily_interactions} />
                <DetailRow label="Motivație" value={selectedLead.motivation} />
                <DetailRow label="Buget" value={selectedLead.budget} />
                <DetailRow label="Sursă" value={selectedLead.source} />
                <DetailRow label="Data" value={formatDate(selectedLead.created_at)} />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Leads;
