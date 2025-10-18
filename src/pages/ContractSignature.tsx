import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Loader2, AlertCircle, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateContractPDF } from "@/utils/generateContractPDF";

type SignatureType = 'provider' | 'client';

export default function ContractSignature() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signatureType, setSignatureType] = useState<SignatureType>('client');
  const [typedName, setTypedName] = useState('');
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'type'>('draw');

  useEffect(() => {
    loadContract();
  }, [token]);

  const loadContract = async () => {
    if (!token) {
      setError('Token invalid');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          clients!inner (
            id,
            name,
            email,
            cui,
            address,
            phone
          )
        `)
        .eq('signature_token', token)
        .single();

      if (error) throw error;

      if (!data) {
        setError('Contract negăsit');
        setLoading(false);
        return;
      }

      // Check if expired
      if (data.signature_link_expires_at && new Date(data.signature_link_expires_at) < new Date()) {
        setError('Link-ul pentru semnare a expirat');
        setLoading(false);
        return;
      }

      setContract(data);
    } catch (err) {
      console.error('Error loading contract:', err);
      setError('Eroare la încărcarea contractului');
    } finally {
      setLoading(false);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmitSignature = async () => {
    if (!contract || !token) return;

    let signatureData = '';
    let signatureName = '';

    if (signatureMethod === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Check if canvas is empty
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const isEmpty = !imageData.data.some(channel => channel !== 0);

      if (isEmpty) {
        toast({
          title: "Eroare",
          description: "Vă rugăm să desenați semnătura",
          variant: "destructive",
        });
        return;
      }

      signatureData = canvas.toDataURL('image/png');
    } else {
      if (!typedName.trim()) {
        toast({
          title: "Eroare",
          description: "Vă rugăm să introduceți numele",
          variant: "destructive",
        });
        return;
      }
      signatureName = typedName.trim();
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-contract-signature', {
        body: {
          token: token,
          signatureType: signatureType,
          signatureData: signatureData || undefined,
          signatureName: signatureName || undefined,
        }
      });

      if (error) throw error;

      toast({
        title: "Succes!",
        description: data.message || "Semnătura a fost salvată cu succes",
      });

      // Reload contract to show updated status
      await loadContract();
      
      // Clear form
      clearCanvas();
      setTypedName('');

    } catch (err: any) {
      console.error('Error submitting signature:', err);
      toast({
        title: "Eroare",
        description: err.message || "Nu s-a putut salva semnătura. Vă rugăm încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Eroare</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => navigate('/')}>Înapoi la pagina principală</Button>
          </div>
        </Card>
      </div>
    );
  }

  const providerSigned = !!contract.provider_signed_at;
  const clientSigned = !!contract.client_signed_at;
  const fullySigned = !!contract.fully_signed_at;

  const handleDownloadPDF = async () => {
    if (!contract) return;
    
    try {
      await generateContractPDF(
        contract.contract_number,
        contract.contract_type || 'PRESTĂRI SERVICII',
        contract.clients?.name || 'N/A',
        contract.generated_contract || '',
        contract.provider_signature_data || undefined,
        contract.provider_signature_name || undefined,
        contract.client_signature_data || undefined,
        contract.client_signature_name || undefined,
        contract.provider_name || undefined
      );
      
      toast({
        title: "PDF descărcat!",
        description: "Contractul a fost descărcat cu succes.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera PDF-ul. Vă rugăm încercați din nou.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold">Semnare Contract</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPDF}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Descarcă PDF
            </Button>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Număr Contract:</span>
              <span className="font-medium">{contract.contract_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Furnizor:</span>
              <span className="font-medium">{contract.provider_name || 'Unison Loge Fx SRL'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Client:</span>
              <span className="font-medium">{contract.clients?.name || 'N/A'}</span>
            </div>
          </div>
        </Card>

        {/* Signature Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Status Semnare</h2>
          <div className="grid gap-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Furnizor (Unison Loge Fx SRL)</p>
                {providerSigned ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <div className="h-6 w-6 border-2 border-muted-foreground rounded-full" />
                )}
              </div>
              {providerSigned && (
                <>
                  <p className="text-xs text-muted-foreground mb-3">
                    Semnat: {new Date(contract.provider_signed_at).toLocaleString('ro-RO')}
                  </p>
                  <div className="p-3 border rounded-lg bg-muted/30">
                    {contract.provider_signature_data ? (
                      <img 
                        src={contract.provider_signature_data} 
                        alt="Semnătura furnizorului"
                        className="h-12 w-auto object-contain"
                      />
                    ) : contract.provider_signature_name ? (
                      <p className="text-2xl font-serif italic">
                        {contract.provider_signature_name}
                      </p>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Client ({contract.clients?.name || 'N/A'})</p>
                {clientSigned ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <div className="h-6 w-6 border-2 border-muted-foreground rounded-full" />
                )}
              </div>
              {clientSigned && (
                <>
                  <p className="text-xs text-muted-foreground mb-3">
                    Semnat: {new Date(contract.client_signed_at).toLocaleString('ro-RO')}
                  </p>
                  <div className="p-3 border rounded-lg bg-muted/30">
                    {contract.client_signature_data ? (
                      <img 
                        src={contract.client_signature_data} 
                        alt="Semnătura clientului"
                        className="h-12 w-auto object-contain"
                      />
                    ) : contract.client_signature_name ? (
                      <p className="text-2xl font-serif italic">
                        {contract.client_signature_name}
                      </p>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>

          {fullySigned && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Contract semnat complet!
              </p>
            </div>
          )}
        </Card>

        {/* Contract Content */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Conținut Contract</h2>
          <div className="prose max-w-none bg-muted/50 p-6 rounded-lg max-h-[400px] overflow-y-auto whitespace-pre-wrap">
            {contract.generated_contract}
          </div>
        </Card>

        {/* Signature Form */}
        {!fullySigned && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Semnează Contractul</h2>
            
            {/* Select Party */}
            <div className="mb-6">
              <Label className="mb-2 block">Eu semnez ca:</Label>
              <div className="flex gap-4">
                <Button
                  variant={signatureType === 'provider' ? 'default' : 'outline'}
                  onClick={() => setSignatureType('provider')}
                  disabled={providerSigned}
                  className="flex-1"
                >
                  Furnizor
                  {providerSigned && <CheckCircle2 className="ml-2 h-4 w-4" />}
                </Button>
                <Button
                  variant={signatureType === 'client' ? 'default' : 'outline'}
                  onClick={() => setSignatureType('client')}
                  disabled={clientSigned}
                  className="flex-1"
                >
                  Client
                  {clientSigned && <CheckCircle2 className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Signature Methods */}
            <Tabs value={signatureMethod} onValueChange={(v) => setSignatureMethod(v as 'draw' | 'type')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="draw">Desenează Semnătura</TabsTrigger>
                <TabsTrigger value="type">Scrie Numele</TabsTrigger>
              </TabsList>

              <TabsContent value="draw" className="space-y-4">
                <div className="border rounded-lg bg-white">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    className="w-full cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <Button variant="outline" onClick={clearCanvas} className="w-full">
                  Șterge Semnătura
                </Button>
              </TabsContent>

              <TabsContent value="type" className="space-y-4">
                <div>
                  <Label htmlFor="typedName">Numele dvs. complet</Label>
                  <Input
                    id="typedName"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Introduceți numele complet"
                    className="mt-2"
                  />
                  {typedName && (
                    <div className="mt-4 p-4 border rounded-lg bg-white">
                      <p className="text-3xl font-signature text-center">{typedName}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleSubmitSignature}
              disabled={submitting || (signatureType === 'provider' && providerSigned) || (signatureType === 'client' && clientSigned)}
              className="w-full mt-6"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se salvează...
                </>
              ) : (
                'Semnează Contractul'
              )}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
