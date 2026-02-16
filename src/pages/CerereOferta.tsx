import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigation } from '@/components/website/Navigation';
import { Footer } from '@/components/website/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const ofertaSchema = z.object({
  name: z.string().trim().min(1, "Numele este obligatoriu").max(100, "Numele trebuie să aibă maximum 100 de caractere"),
  email: z.string().trim().email("Adresa de email nu este validă").max(255, "Email-ul trebuie să aibă maximum 255 de caractere"),
  phone: z.string().trim().min(1, "Numărul de telefon este obligatoriu").max(20, "Numărul de telefon trebuie să aibă maximum 20 de caractere"),
  automationType: z.string().min(1, "Te rugăm să selectezi tipul de automatizare"),
  details: z.string().max(1000, "Detaliile trebuie să aibă maximum 1000 de caractere").optional(),
});

type OfertaFormValues = z.infer<typeof ofertaSchema>;

const automationTypes = [
  { value: "whatsapp", label: "Automatizare WhatsApp" },
  { value: "chatbot", label: "Chatbot AI pentru Website" },
  { value: "email-marketing", label: "Automatizare Email Marketing" },
  { value: "crm", label: "CRM și Gestiune Clienți" },
  { value: "showroom-qr", label: "Automatizare Showroom Auto (QR)" },
  { value: "clinica-medicala", label: "Automatizare Clinică Medicală" },
  { value: "altele", label: "Altele (personalizat)" },
];

const CerereOferta = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<OfertaFormValues>({
    resolver: zodResolver(ofertaSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      automationType: '',
      details: '',
    },
  });

  const onSubmit = async (data: OfertaFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        'https://n8n.srv1055552.hstgr.cloud/webhook/297031c0-fb10-49bf-9634-02f73c3b059a',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            automationType: data.automationType,
            details: data.details || '',
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Eroare la trimiterea cererii');
      }

      setIsSubmitted(true);
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }
      toast({
        title: "Cerere trimisă cu succes!",
        description: "Te vom contacta în cel mai scurt timp posibil.",
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o problemă la trimiterea cererii. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-[500px] h-64 md:h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <Navigation />

      <main className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Cerere{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ofertă Personalizată
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-xl mx-auto px-2">
              Completează formularul de mai jos și îți vom trimite o ofertă adaptată nevoilor tale de automatizare.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                  Cererea ta a fost trimisă!
                </h2>
                <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base px-2">
                  Mulțumim pentru interesul acordat. Echipa noastră va analiza cererea ta și te va contacta în cel mai scurt timp posibil.
                </p>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full"
                >
                  Trimite o nouă cerere
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm md:text-base">Nume complet *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ion Popescu"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-11 md:h-12 text-sm md:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm md:text-base">Adresă email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="ion.popescu@email.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-11 md:h-12 text-sm md:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm md:text-base">Număr de telefon *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+40 7XX XXX XXX"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-11 md:h-12 text-sm md:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="automationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm md:text-base">Tip automatizare *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400 h-11 md:h-12 text-sm md:text-base [&>span]:text-gray-400 [&>span[data-placeholder]]:text-gray-400">
                              <SelectValue placeholder="Selectează tipul de automatizare" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2A2F3C] border-white/20">
                            {automationTypes.map((type) => (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-white hover:bg-white/10 focus:bg-white/10 text-sm md:text-base"
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm md:text-base">Detalii suplimentare (opțional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descrie pe scurt ce tip de automatizare ai nevoie, ce probleme vrei să rezolvi, sau orice alte detalii relevante..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 min-h-[100px] md:min-h-[120px] resize-none text-sm md:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs md:text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-5 md:py-6 rounded-xl text-base md:text-lg shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Trimite Cererea
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-8 md:mt-10 text-center">
            <p className="text-gray-400 text-xs md:text-sm">
              🔒 Datele tale sunt în siguranță și nu vor fi partajate cu terți.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CerereOferta;
