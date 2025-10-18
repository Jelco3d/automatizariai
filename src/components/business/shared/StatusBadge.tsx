import { Badge } from "@/components/ui/badge";
interface StatusBadgeProps {
  status: string;
  type: 'invoice' | 'quote' | 'contract';
}
const statusConfig = {
  invoice: {
    draft: {
      label: 'Ciornă',
      variant: 'secondary' as const
    },
    sent: {
      label: 'Trimisă',
      variant: 'default' as const
    },
    paid: {
      label: 'Plătită',
      variant: 'default' as const
    },
    overdue: {
      label: 'Întârziată',
      variant: 'destructive' as const
    },
    cancelled: {
      label: 'Anulată',
      variant: 'outline' as const
    }
  },
  quote: {
    draft: {
      label: 'Ciornă',
      variant: 'secondary' as const
    },
    sent: {
      label: 'Trimisă',
      variant: 'default' as const
    },
    accepted: {
      label: 'Acceptată',
      variant: 'default' as const
    },
    rejected: {
      label: 'Respinsă',
      variant: 'destructive' as const
    },
    expired: {
      label: 'Expirată',
      variant: 'outline' as const
    }
  },
  contract: {
    draft: {
      label: 'Ciornă',
      variant: 'secondary' as const
    },
    pending: {
      label: 'În așteptare',
      variant: 'default' as const
    },
    active: {
      label: 'Activ',
      variant: 'default' as const
    },
    expired: {
      label: 'Expirat',
      variant: 'outline' as const
    },
    terminated: {
      label: 'Reziliat',
      variant: 'destructive' as const
    }
  }
};
export function StatusBadge({
  status,
  type
}: StatusBadgeProps) {
  const config = statusConfig[type][status as keyof typeof statusConfig[typeof type]];
  if (!config) return <Badge variant="outline" className="bg-[#0cff43]/[0.31]">{status}</Badge>;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}