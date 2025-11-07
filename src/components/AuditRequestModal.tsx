import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const auditSchema = z.object({
  fullName: z.string().trim().min(1, "Numele complet este obligatoriu").max(100, "Numele este prea lung"),
  email: z.string().trim().email("Email invalid").max(255, "Email-ul este prea lung"),
  phone: z.string().trim().min(1, "Numărul de telefon este obligatoriu").max(20, "Numărul este prea lung"),
});

type AuditFormValues = z.infer<typeof auditSchema>;

interface AuditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationData?: any;
}

export function AuditRequestModal({ isOpen, onClose, conversationData }: AuditRequestModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        userId: conversationData?.sessionId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        messages: conversationData?.messages || [],
        userAnswers: conversationData?.userAnswers || []
      };

      const response = await fetch('https://n8n.srv1055552.hstgr.cloud/webhook/efb0c72e-16c3-4b8c-bddf-6089d48d9781', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to send audit request');
      }
      
      setStep(2);
    } catch (error) {
      console.error("Error submitting audit request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Obține un audit gratuit</DialogTitle>
              <DialogDescription>
                Completează datele tale pentru a primi auditul companiei tale
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 relative">
                {isSubmitting && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground animate-pulse">Se trimite auditul...</p>
                    </div>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nume complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Ion Popescu" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresă de email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ion.popescu@exemplu.ro" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Număr de telefon</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+40 712 345 678" {...field} disabled={isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                    Anulează
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Obține Audit!
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <DialogTitle className="text-center text-2xl">Auditul companiei tale este pe drum!</DialogTitle>
              <DialogDescription className="text-center pt-4 text-base">
                În câteva minute vei primi pe email auditul detaliat al companiei tale. 
                Verifică inbox-ul și folderul de spam.
              </DialogDescription>
            </DialogHeader>

            <div className="pt-6">
              <Button onClick={handleClose} className="w-full">
                Închide
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
