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
import { CheckCircle2, Loader2 } from "lucide-react";

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
      // TODO: Send data to backend/webhook
      console.log("Audit request data:", { ...data, conversationData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nume complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Ion Popescu" {...field} />
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
                        <Input type="email" placeholder="ion.popescu@exemplu.ro" {...field} />
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
                        <Input type="tel" placeholder="+40 712 345 678" {...field} />
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      "Trimite cererea"
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
