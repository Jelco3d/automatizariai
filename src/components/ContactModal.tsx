import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Numele trebuie să aibă minim 2 caractere" })
    .max(100, { message: "Numele trebuie să aibă maxim 100 caractere" }),
  email: z.string()
    .trim()
    .email({ message: "Email invalid" })
    .max(255, { message: "Email-ul trebuie să aibă maxim 255 caractere" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Numărul de telefon trebuie să aibă minim 10 cifre" })
    .max(15, { message: "Numărul de telefon trebuie să aibă maxim 15 cifre" })
    .regex(/^[0-9+\s()-]+$/, { message: "Număr de telefon invalid" })
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export function ContactModal({ isOpen, onClose, sessionId }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-audit-report', {
        body: {
          sessionId,
          name: data.name,
          email: data.email,
          phone: data.phone,
        }
      });

      if (error) {
        console.error('Error sending report:', error);
        toast.error("A apărut o eroare la trimiterea raportului. Te rugăm să încerci din nou.");
        return;
      }

      toast.success("Raportul a fost trimis cu succes! Verifică emailul tău.", {
        description: "Ai primit un raport complet personalizat cu recomandările AI pentru afacerea ta.",
        duration: 5000,
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error("A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-background via-background to-primary/5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Primește Raportul Tău Complet 📊
          </DialogTitle>
          <DialogDescription className="text-base">
            Completează datele tale și îți vom trimite imediat un raport personalizat cu analiza completă și recomandările AI pentru afacerea ta.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nume Complet
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ion Popescu" 
                      {...field}
                      disabled={isSubmitting}
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
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
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="ion@example.com" 
                      {...field}
                      disabled={isSubmitting}
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
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
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Număr de Telefon
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+40 722 123 456" 
                      {...field}
                      disabled={isSubmitting}
                      className="transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Anulează
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  "Trimite Raportul"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
