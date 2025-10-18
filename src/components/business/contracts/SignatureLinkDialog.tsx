import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Contract } from "@/hooks/useContracts";
import { formatDate } from "@/utils/dateFormatters";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface SignatureLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: Contract | null;
}

export function SignatureLinkDialog({ open, onOpenChange, contract }: SignatureLinkDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!contract) return null;

  const signatureUrl = contract.signature_token
    ? `${window.location.origin}/contract-signature/${contract.signature_token}`
    : '';

  const isExpired = contract.signature_link_expires_at 
    ? new Date(contract.signature_link_expires_at) < new Date()
    : false;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(signatureUrl);
    setCopied(true);
    toast({
      title: "Copiat!",
      description: "Link-ul a fost copiat în clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const providerSigned = !!contract.provider_signed_at;
  const clientSigned = !!contract.client_signed_at;
  const fullySigned = !!contract.fully_signed_at;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Link pentru Semnare - Contract {contract.contract_number}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Signature Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Link pentru semnare:</label>
            <div className="flex gap-2">
              <Input
                value={signatureUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!signatureUrl}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Link copiat!
              </p>
            )}
          </div>

          {/* Expiration */}
          {contract.signature_link_expires_at && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>
                {isExpired ? (
                  <span className="text-destructive">Expirat la: {formatDate(contract.signature_link_expires_at)}</span>
                ) : (
                  <span>Valid până la: {formatDate(contract.signature_link_expires_at)}</span>
                )}
              </span>
            </div>
          )}

          {/* Signature Status */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Status Semnare:</h3>
            
            <div className="space-y-2">
              {/* Provider Status */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Furnizor (Unison Loge Fx SRL)</p>
                  {providerSigned && contract.provider_signed_at && (
                    <p className="text-xs text-muted-foreground">
                      Semnat: {formatDate(contract.provider_signed_at)}
                    </p>
                  )}
                </div>
                {providerSigned ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              {/* Client Status */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Client ({contract.clients?.name || 'N/A'})</p>
                  {clientSigned && contract.client_signed_at && (
                    <p className="text-xs text-muted-foreground">
                      Semnat: {formatDate(contract.client_signed_at)}
                    </p>
                  )}
                </div>
                {clientSigned ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Fully Signed Message */}
            {fullySigned && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Contract semnat complet la {formatDate(contract.fully_signed_at!)}
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          {!fullySigned && (
            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
              <p className="font-medium">Instrucțiuni:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Copiați link-ul de mai sus</li>
                <li>Trimiteți link-ul clientului prin email sau alt canal</li>
                <li>Ambele părți pot accesa link-ul pentru a semna</li>
                <li>După ce ambele părți semnează, contractul devine complet semnat</li>
              </ol>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
