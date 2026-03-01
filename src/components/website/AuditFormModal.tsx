import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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

const TOTAL_STEPS = 5;

const stepFields: (keyof AuditFormValues)[][] = [
  ["fullName", "phone", "email", "companyName"],
  ["businessType", "teamSize", "revenue"],
  ["excelCount", "platforms", "timeLost", "frustrations"],
  ["impactScale", "weeklyQuotes", "dailyInteractions"],
  ["motivation", "budget"],
];

const stepLabels = [
  "Contact",
  "Afacere",
  "Fragmentare",
  "Impact",
  "Motivație",
];

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
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
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
    setCurrentStep(0);
    setDirection(1);
    form.reset();
    onClose();
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      const valid = await form.trigger(["fullName", "phone", "email", "companyName"]);
      if (!valid) return;
    }
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const inputClass =
    "bg-yellow-900/10 border-yellow-500/30 text-white placeholder:text-white/30 focus:border-yellow-400/60";
  const labelClass = "text-white/80";

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-[#0a0e1a] border border-yellow-500/30 overflow-hidden">
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
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header + Progress */}
            <div className="p-6 pb-0">
              <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-4 leading-tight">
                Audit Strategic Gratuit
              </h2>

              {/* Step indicators */}
              <div className="flex items-center justify-between mb-3">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                          i < currentStep
                            ? "bg-yellow-500 border-yellow-500 text-black"
                            : i === currentStep
                            ? "border-yellow-400 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]"
                            : "border-white/20 text-white/30"
                        }`}
                      >
                        {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-[10px] mt-1 hidden md:block ${i <= currentStep ? "text-yellow-400/80" : "text-white/30"}`}>
                        {label}
                      </span>
                    </div>
                    {i < TOTAL_STEPS - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 transition-colors duration-300 ${i < currentStep ? "bg-yellow-500" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
              <p className="text-white/40 text-xs mt-2">Pas {currentStep + 1} din {TOTAL_STEPS}</p>
            </div>

            {/* Step content */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      {currentStep === 0 && <Step1 form={form} inputClass={inputClass} labelClass={labelClass} />}
                      {currentStep === 1 && <Step2 form={form} inputClass={inputClass} labelClass={labelClass} />}
                      {currentStep === 2 && <Step3 form={form} inputClass={inputClass} labelClass={labelClass} />}
                      {currentStep === 3 && <Step4 form={form} inputClass={inputClass} labelClass={labelClass} />}
                      {currentStep === 4 && <Step5 form={form} inputClass={inputClass} labelClass={labelClass} isSubmitting={isSubmitting} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation footer */}
                <div className="p-4 border-t border-yellow-500/10 flex justify-between items-center">
                  {currentStep > 0 ? (
                    <Button type="button" variant="outline" onClick={handleBack} className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Înapoi
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < TOTAL_STEPS - 1 ? (
                    <Button type="button" onClick={handleNext} className="btn-3d-gold px-6 py-3 h-auto rounded-xl">
                      Continuă <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="btn-3d-gold px-6 py-3 h-auto rounded-xl animate-glow-pulse">
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                      Trimite și rezervă auditul
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ── Step Components ── */

function Step1({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <p className="text-white/50 text-sm leading-relaxed mb-4">
        Completează datele de contact pentru a-ți rezerva auditul gratuit de 20 de minute.
      </p>
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
    </div>
  );
}

function Step2({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Contextul afacerii tale
      </h3>
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
    </div>
  );
}

function Step3({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Fragmentarea actuală
      </h3>
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
          <FormLabel className={labelClass}>Fișiere/platforme folosite zilnic</FormLabel>
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
                        field.onChange(checked ? [...current, platform] : current.filter((v) => v !== platform));
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
          <FormLabel className={labelClass}>Cât timp pierzi pe săptămână căutând informații?</FormLabel>
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
          <FormLabel className={labelClass}>Cea mai mare frustrare?</FormLabel>
          <FormControl>
            <Textarea {...field} className={`${inputClass} min-h-[70px]`} placeholder="ex. Cine are ultima versiune? Trebuie să copiez date manual..." />
          </FormControl>
        </FormItem>
      )} />
    </div>
  );
}

function Step4({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Impact & Volum
      </h3>
      <FormField control={form.control} name="impactScale" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>
            Cât de mult te afectează haosul de fișiere? ({field.value}/10)
          </FormLabel>
          <FormControl>
            <Slider
              min={1} max={10} step={1}
              value={[field.value || 5]}
              onValueChange={(vals) => field.onChange(vals[0])}
              className="mt-2 [&_[role=slider]]:bg-yellow-400 [&_[role=slider]]:border-yellow-500"
            />
          </FormControl>
          <div className="flex justify-between text-xs text-white/30 mt-1">
            <span>1 – Deloc</span><span>10 – Foarte mult</span>
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
            <FormControl><Input {...field} type="number" className={inputClass} placeholder="ex. 30–50" /></FormControl>
          </FormItem>
        )} />
      </div>
    </div>
  );
}

function Step5({ form, inputClass, labelClass, isSubmitting }: StepProps & { isSubmitting: boolean }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Motivație & Disponibilitate
      </h3>
      <FormField control={form.control} name="motivation" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Ce te-ar convinge să investești într-o soluție care unifică totul?</FormLabel>
          <FormControl>
            <Textarea {...field} className={`${inputClass} min-h-[60px]`} placeholder="Descrie pe scurt..." />
          </FormControl>
        </FormItem>
      )} />
      <div>
        <Label className={labelClass}>Când ai timp pentru un audit strategic de max 20 de minute?</Label>
        <div className="mt-2 rounded-xl overflow-hidden border border-yellow-500/20">
          <iframe
            src="https://calendly.com/aiautomatizari/automatizari-ai"
            className="w-full h-[350px] border-0"
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
    </div>
  );
}

interface StepProps {
  form: ReturnType<typeof useForm<AuditFormValues>>;
  inputClass: string;
  labelClass: string;
}
