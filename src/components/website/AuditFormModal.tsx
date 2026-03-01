import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const auditSchema = z.object({
  fullName: z.string().min(2, "Numele este obligatoriu"),
  phone: z.string().min(6, "Numărul de telefon este obligatoriu"),
  email: z.string().email("Email invalid"),
  companyName: z.string().min(1, "Numele firmei este obligatoriu"),
  businessType: z.string().optional(),
  businessTypeOther: z.string().optional(),
  teamSize: z.string().optional(),
  revenue: z.string().optional(),
  excelCount: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  platformsOther: z.string().optional(),
  timeLost: z.string().optional(),
  frustrations: z.string().optional(),
  impactScale: z.number().min(1).max(10).optional(),
  weeklyQuotes: z.string().optional(),
  dailyInteractions: z.string().optional(),
  motivation: z.string().optional(),
  budget: z.string().optional(),
});

type AuditFormValues = z.infer<typeof auditSchema>;

const platformOptions = [
  "Excel pentru stoc/inventar",
  "Excel pentru oferte / comenzi",
  "Excel pentru facturi / proforme",
  "Excel pentru clienți / istoric",
  "WhatsApp Business",
  "SmartBill / Saga / alt ERP",
  "Google Sheets",
];

interface AuditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditFormModal = ({ isOpen, onClose }: AuditFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      companyName: "",
      platforms: [],
      impactScale: 5,
    },
  });

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        source: "audit-form-modal",
      };

      await fetch(
        "https://n8n.srv1055552.hstgr.cloud/webhook/297031c0-fb10-49bf-9634-02f73c3b059a",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors",
        }
      );

      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead");
      }

      setIsSubmitted(true);
      toast({ title: "Formularul a fost trimis cu succes!" });
    } catch {
      toast({
        title: "Eroare la trimitere",
        description: "Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    form.reset();
    onClose();
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mt-6 mb-4">
      {children}
    </h3>
  );

  const inputClass =
    "bg-yellow-900/10 border-yellow-500/30 text-white placeholder:text-white/30 focus:border-yellow-400/60";
  const labelClass = "text-white/80";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 bg-[#0a0e1a] border border-yellow-500/30 overflow-hidden">
        <DialogTitle className="sr-only">Audit Strategic Gratuit</DialogTitle>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Mulțumim!</h2>
            <p className="text-white/60 text-lg max-w-md">
              Îți rezervăm locul pentru audit. Vei primi confirmarea pe email și
              WhatsApp în maxim 60 de minute.
            </p>
            <Button onClick={handleClose} className="btn-3d-gold mt-8 px-8 py-4 h-auto rounded-xl">
              Închide
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6 md:p-8">
              {/* Header */}
              <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-3 leading-tight">
                Audit Strategic Gratuit – Recuperează-ți timpul pierdut cu
                Excel-urile și platformele separate
              </h2>
              <p className="text-white/50 text-sm md:text-base mb-8 leading-relaxed">
                Completează acest scurt chestionar (5–7 minute). Pe baza
                răspunsurilor tale îți voi pregăti un audit personalizat de 20 de
                minute în care vom vedea exact cât timp și bani pierzi din cauza
                fișierelor separate și a platformelor care nu comunică, plus 3–5
                idei concrete de soluționare.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Required fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Nume complet *</FormLabel>
                        <FormControl><Input {...field} className={inputClass} placeholder="Ion Popescu" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Telefon *</FormLabel>
                        <FormControl><Input {...field} className={inputClass} placeholder="07xx xxx xxx" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Email *</FormLabel>
                        <FormControl><Input {...field} type="email" className={inputClass} placeholder="email@firma.ro" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Nume firmă *</FormLabel>
                        <FormControl><Input {...field} className={inputClass} placeholder="SC Exemplu SRL" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Section 1 */}
                  <SectionTitle>Secțiunea 1: Contextul afacerii tale</SectionTitle>

                  <FormField control={form.control} name="businessType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Care este tipul principal al afacerii tale?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                        <SelectContent className="bg-[#0a0e1a] border-yellow-500/30">
                          {["Construcții / Amenajări interioare", "Distribuție (alimentară, materiale, etc.)", "Cosmetice / Parfumuri / Seturi cadou", "Retail / Magazin fizic sau online", "Producție", "Servicii", "Altceva"].map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-yellow-500/20">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {form.watch("businessType") === "Altceva" && (
                    <FormField control={form.control} name="businessTypeOther" render={({ field }) => (
                      <FormItem>
                        <FormControl><Input {...field} className={inputClass} placeholder="Descrie tipul afacerii..." /></FormControl>
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="teamSize" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Câte persoane are echipa ta activă?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                        <SelectContent className="bg-[#0a0e1a] border-yellow-500/30">
                          {["1–5", "6–10", "11–20", "21–40", "Peste 40"].map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-yellow-500/20">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="revenue" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Cifra de afaceri aproximativă anuală?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                        <SelectContent className="bg-[#0a0e1a] border-yellow-500/30">
                          {["Sub 2 mil. lei", "2–5 mil. lei", "5–15 mil. lei", "15–30 mil. lei", "Peste 30 mil. lei"].map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-yellow-500/20">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  {/* Section 2 */}
                  <SectionTitle>Secțiunea 2: Fragmentarea actuală</SectionTitle>

                  <FormField control={form.control} name="excelCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Câte fișiere Excel diferite folosești regulat?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                        <SelectContent className="bg-[#0a0e1a] border-yellow-500/30">
                          {["1–2", "3–4", "5–7", "8 sau mai multe"].map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-yellow-500/20">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="platforms" render={() => (
                    <FormItem>
                      <FormLabel className={labelClass}>Fișiere/platforme folosite zilnic (selectează multiple)</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {platformOptions.map((platform) => (
                          <FormField key={platform} control={form.control} name="platforms" render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                                  checked={field.value?.includes(platform)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    field.onChange(
                                      checked
                                        ? [...current, platform]
                                        : current.filter((v) => v !== platform)
                                    );
                                  }}
                                />
                              </FormControl>
                              <Label className="text-white/70 text-sm font-normal cursor-pointer">{platform}</Label>
                            </FormItem>
                          )} />
                        ))}
                      </div>
                      <FormField control={form.control} name="platformsOther" render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormControl><Input {...field} className={inputClass} placeholder="Altceva..." /></FormControl>
                        </FormItem>
                      )} />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="timeLost" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Cât timp pierzi pe săptămână căutând informații corecte?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                        <SelectContent className="bg-[#0a0e1a] border-yellow-500/30">
                          {["Sub 5 ore", "5–10 ore", "10–20 ore", "20–30 ore", "Peste 30 ore"].map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-yellow-500/20">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="frustrations" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Cea mai mare frustrare legată de fișiere și platforme separate?</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className={`${inputClass} min-h-[80px]`}
                          placeholder="ex. Cine are ultima versiune? Trebuie să copiez date manual, erori frecvente..."
                        />
                      </FormControl>
                    </FormItem>
                  )} />

                  {/* Section 3 */}
                  <SectionTitle>Secțiunea 3: Impact & Volum</SectionTitle>

                  <FormField control={form.control} name="impactScale" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Cât de mult te afectează haosul de fișiere? ({field.value}/10)
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value || 5]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="mt-2 [&_[role=slider]]:bg-yellow-400 [&_[role=slider]]:border-yellow-500"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-white/30 mt-1">
                        <span>1 – Deloc</span>
                        <span>10 – Foarte mult</span>
                      </div>
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="weeklyQuotes" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Oferte/cereri de preț pe săptămână?</FormLabel>
                        <FormControl><Input {...field} type="number" className={inputClass} placeholder="ex. 15" /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="dailyInteractions" render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClass}>Interacțiuni repetitive zilnice?</FormLabel>
                        <FormControl><Input {...field} type="number" className={inputClass} placeholder="ex. 30–50 mesaje/zi" /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  {/* Section 4 */}
                  <SectionTitle>Secțiunea 4: Motivație & Disponibilitate</SectionTitle>

                  <FormField control={form.control} name="motivation" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Ce te-ar convinge să investești într-o soluție care unifică totul?</FormLabel>
                      <FormControl>
                        <Textarea {...field} className={`${inputClass} min-h-[70px]`} placeholder="Descrie pe scurt..." />
                      </FormControl>
                    </FormItem>
                  )} />

                  {/* Calendly embed */}
                  <div>
                    <Label className={labelClass}>Când ai timp pentru un audit strategic de max 20 de minute?</Label>
                    <div className="mt-2 rounded-xl overflow-hidden border border-yellow-500/20">
                      <iframe
                        src="https://calendly.com/aiautomatizari/automatizari-ai"
                        className="w-full h-[420px] border-0"
                        title="Calendly"
                      />
                    </div>
                  </div>

                  <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Bugetul aproximativ pentru o soluție?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                        <SelectContent className="bg-[#0a0e1a] border-yellow-500/30">
                          {["Sub 10.000 €", "10.000 – 25.000 €", "25.000 – 50.000 €", "Peste 50.000 €", "Nu știu încă"].map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-yellow-500/20">{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />

                  {/* Submit */}
                  <div className="pt-4 pb-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-3d-gold w-full py-6 h-auto text-base md:text-lg rounded-xl animate-glow-pulse"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <ArrowRight className="w-5 h-5 mr-2" />
                      )}
                      Trimite răspunsurile și rezervă-ți auditul gratuit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
