import { FileText, FileSpreadsheet, FileCheck, Users, TrendingUp, DollarSign } from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";
import { useQuotes } from "@/hooks/useQuotes";
import { useContracts } from "@/hooks/useContracts";
import { useClients } from "@/hooks/useClients";
import { formatCurrency } from "@/utils/numberFormatters";
import { AIInsights } from "@/components/business/AIInsights";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";
import { StatCard } from "@/components/business/shared/StatCard";

export default function BusinessDashboard() {
  const { invoices, isLoading: invoicesLoading } = useInvoices();
  const { quotes, isLoading: quotesLoading } = useQuotes();
  const { contracts, isLoading: contractsLoading } = useContracts();
  const { clients, isLoading: clientsLoading } = useClients();

  const isLoading = invoicesLoading || quotesLoading || contractsLoading || clientsLoading;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const greeting = hour < 12 ? "Bună dimineața" : hour < 18 ? "Bună ziua" : "Bună seara";

  const currentMonthInvoices = invoices.filter(inv => {
    const d = new Date(inv.issue_date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const currentMonthQuotes = quotes.filter(q => {
    const d = new Date(q.issue_date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const activeContracts = contracts?.filter(c => {
    if (!c.end_date) return true;
    return new Date(c.end_date) >= currentDate;
  }) || [];

  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const currentMonthRevenue = paidInvoices
    .filter(inv => {
      const d = new Date(inv.issue_date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, inv) => sum + Number(inv.total), 0);

  const totalRevenue = paidInvoices.reduce((sum, inv) => sum + Number(inv.total), 0);

  return (
    <PageShell loading={isLoading}>
      <PageHeader 
        title={`${greeting} 👋`}
        subtitle={currentDate.toLocaleDateString("ro-RO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Facturi Luna Curentă" value={currentMonthInvoices.length} subtitle="Luna curentă" icon={FileText} variant="purple" />
        <StatCard label="Oferte Trimise" value={currentMonthQuotes.length} subtitle="Luna curentă" icon={FileSpreadsheet} variant="blue" />
        <StatCard label="Contracte Active" value={activeContracts.length} subtitle="Active acum" icon={FileCheck} variant="green" />
        <StatCard label="Total Clienți" value={clients.length} subtitle="Clienți înregistrați" icon={Users} variant="cyan" />
        <StatCard label="Venit Luna Curentă" value={formatCurrency(currentMonthRevenue)} subtitle="Facturi plătite" icon={DollarSign} variant="amber" />
        <StatCard label="Venit Total" value={formatCurrency(totalRevenue)} subtitle="Toate perioadele" icon={TrendingUp} variant="green" />
      </div>

      <div className="mb-8">
        <AIInsights />
      </div>

      <div className="glass-card rounded-xl border border-white/[0.06] p-5">
        <h3 className="text-base font-semibold text-white mb-4">Activitate Recentă</h3>
        <p className="text-gray-500 text-center py-8 text-sm">
          Nu există activitate recentă. Începe prin a crea prima factură, ofertă sau contract!
        </p>
      </div>
    </PageShell>
  );
}
