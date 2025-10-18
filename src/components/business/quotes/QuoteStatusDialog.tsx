import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Quote } from '@/hooks/useQuotes';
import { CheckCircle2, XCircle, Send, FileText, Clock } from 'lucide-react';

interface QuoteStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote;
  onStatusChange: (id: string, status: Quote['status']) => void;
}

export function QuoteStatusDialog({ open, onOpenChange, quote, onStatusChange }: QuoteStatusDialogProps) {
  const handleStatusChange = (status: Quote['status']) => {
    onStatusChange(quote.id, status);
    onOpenChange(false);
  };

  const statusActions = [
    {
      status: 'draft' as const,
      label: 'Schiță',
      icon: FileText,
      color: 'gray',
      description: 'Marchează ca schiță',
    },
    {
      status: 'sent' as const,
      label: 'Trimisă',
      icon: Send,
      color: 'blue',
      description: 'Marchează ca trimisă',
    },
    {
      status: 'accepted' as const,
      label: 'Acceptată',
      icon: CheckCircle2,
      color: 'green',
      description: 'Marchează ca acceptată',
    },
    {
      status: 'rejected' as const,
      label: 'Respinsă',
      icon: XCircle,
      color: 'red',
      description: 'Marchează ca respinsă',
    },
    {
      status: 'expired' as const,
      label: 'Expirată',
      icon: Clock,
      color: 'orange',
      description: 'Marchează ca expirată',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Schimbă Statusul Ofertei</DialogTitle>
          <p className="text-gray-400 text-sm mt-2">
            Oferta: {quote.quote_number}
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {statusActions.map((action) => {
            const Icon = action.icon;
            const isCurrentStatus = quote.status === action.status;
            
            return (
              <Button
                key={action.status}
                onClick={() => handleStatusChange(action.status)}
                disabled={isCurrentStatus}
                className={`w-full justify-start gap-3 h-auto py-4 ${
                  isCurrentStatus
                    ? 'bg-gray-700 cursor-not-allowed'
                    : action.color === 'blue'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : action.color === 'green'
                    ? 'bg-green-600 hover:bg-green-700'
                    : action.color === 'red'
                    ? 'bg-red-600 hover:bg-red-700'
                    : action.color === 'orange'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                variant={isCurrentStatus ? 'secondary' : 'default'}
              >
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs opacity-80">{action.description}</div>
                </div>
                {isCurrentStatus && (
                  <span className="ml-auto text-xs">(Status curent)</span>
                )}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
