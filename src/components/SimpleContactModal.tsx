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

interface SimpleContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimpleContactModal({ isOpen, onClose }: SimpleContactModalProps) {
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
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4nqeReuDp6SLo6bbxStCMjeJrLiysfqoev9HPG17Yk91c3Urta9U23LkdC7cGtUbf/exec';
      
      console.log('📤 Trimit datele:', data);
      
      // Send data to Google Sheets (no-cors means we can't verify success)
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          timestamp: new Date().toISOString()
        }),
      }).then(() => {
        console.log('✅ Cerere trimisă către Google Sheets');
      }).catch((err) => {
        console.error('❌ Eroare trimitere Google Sheets:', err);
      });
      
      toast.success("🎉 Gata! Raportul tău vine spre tine!", {
        description: "Am primit datele tale și pregătim raportul personalizat. Verifică emailul în câteva minute!",
        duration: 7000,
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
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#1A1F2C] via-[#1A1F2C] to-[#2C1F3C] border-amber-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-pink-500 bg-clip-text text-transparent">
            Obține Auditul Tău Complet 📊
          </DialogTitle>
          <DialogDescription className="text-base text-gray-300">
            Completează datele tale și te vom contacta pentru a-ți oferi auditul personalizat și recomandările AI pentru afacerea ta.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-gray-200">
                    <User className="h-4 w-4" />
                    Nume Complet
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ion Popescu" 
                      {...field}
                      disabled={isSubmitting}
                      className="bg-[#2C1F3C]/60 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-500/60"
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
                  <FormLabel className="flex items-center gap-2 text-gray-200">
                    <Mail className="h-4 w-4" />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="ion@example.com" 
                      {...field}
                      disabled={isSubmitting}
                      className="bg-[#2C1F3C]/60 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-500/60"
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
                  <FormLabel className="flex items-center gap-2 text-gray-200">
                    <Phone className="h-4 w-4" />
                    Număr de Telefon
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+40 722 123 456" 
                      {...field}
                      disabled={isSubmitting}
                      className="bg-[#2C1F3C]/60 border-amber-500/30 text-white placeholder:text-gray-400 focus:border-amber-500/60"
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
                className="flex-1 border-amber-500/30 text-gray-200 hover:bg-amber-500/10"
              >
                Anulează
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-amber-500 via-amber-600 to-pink-500 hover:from-amber-600 hover:via-amber-700 hover:to-pink-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  "Trimite Cererea"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
