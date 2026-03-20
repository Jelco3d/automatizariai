import { useState, useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

// ── Schema ──
const auditSchema = z.object({
  // Step 1 — obligatorii
  cui: z.string().min(2, "CUI-ul este obligatoriu"),
  fullName: z.string().min(2, "Numele este obligatoriu"),
  email: z.string().email("Email invalid"),
  phone: z.string().min(6, "Numărul de telefon este obligatoriu"),
  roleInCompany: z.string().min(1, "Selectează rolul tău"),
  // Step 2 — opționale
  orderChannels: z.array(z.string()).optional(),
  orderChannelsOther: z.string().optional(),
  dailyOrders: z.string().optional(),
  backofficeEmployees: z.string().optional(),
  mainOperationalProblem: z.string().optional(),
  weeklyRepetitiveHours: z.string().optional(),
  // Step 3 — opționale
  erpSoftware: z.string().optional(),
  erpSoftwareOther: z.string().optional(),
  hasCrm: z.string().optional(),
  stockTracking: z.string().optional(),
  hasWebsite: z.string().optional(),
  websiteUrl: z.string().optional(),
  automationTools: z.array(z.string()).optional(),
  automationToolsOther: z.string().optional(),
  // Step 4 — opționale
  yearlyObjective: z.string().optional(),
  investmentRecovery: z.string().optional(),
  previousDigitalization: z.string().optional(),
  employeesAvoidable: z.string().optional(),
  // Step 5 — opționale, industrie
  industryType: z.string().optional(),
  industryQ1: z.string().optional(),
  industryQ2: z.string().optional(),
  industryQ3: z.string().optional(),
});

type AuditFormValues = z.infer<typeof auditSchema>;

const TOTAL_STEPS = 6;

const stepLabels = ["Contact", "Operațiuni", "Tech Stack", "Financiar", "Industrie", "Rezervare"];

const selectContentClass = "bg-[#0d1225] border border-yellow-500/40 shadow-[0_8px_32px_rgba(234,179,8,0.15),0_2px_8px_rgba(0,0,0,0.5)]";
const selectItemClass = "text-white/80 focus:bg-gradient-to-r focus:from-yellow-600/40 focus:to-amber-500/30 focus:text-yellow-300 cursor-pointer transition-all duration-150";

const orderChannelOptions = ["Telefon", "WhatsApp", "Email", "Formular online", "Marketplace (eMAG etc.)", "Reprezentanți pe teren", "Altul"];
const automationToolOptions = ["ChatGPT / Claude", "Zapier / Make", "Power Automate", "Niciun tool", "Altul"];

const industryGroups: Record<string, { label: string; questions: { label: string; options: string[] }[] }> = {
  distributie: {
    label: "Distribuție & Comerț",
    questions: [
      { label: "Câți furnizori gestionați manual?", options: ["Sub 10", "10–30", "30–100", "Peste 100"] },
      { label: "Aveți flotă proprie de livrare?", options: ["Da", "Nu", "Parțial externalizată"] },
      { label: "Câte SKU-uri aveți în portofoliu?", options: ["Sub 100", "100–500", "500–2000", "Peste 2000"] },
    ],
  },
  constructii: {
    label: "Construcții & Instalații",
    questions: [
      { label: "Câte șantiere / proiecte simultane?", options: ["1–2", "3–5", "6–10", "Peste 10"] },
      { label: "Cum faceți devizele și ofertele?", options: ["Excel", "Soft dedicat", "Manual (hârtie)", "Altul"] },
      { label: "Urmăriți costurile per proiect în timp real?", options: ["Da", "Nu", "Parțial"] },
    ],
  },
  servicii: {
    label: "Servicii Profesionale",
    questions: [
      { label: "Cum gestionați programările / agenda?", options: ["Calendar digital", "Excel / foi", "Telefon", "Soft dedicat"] },
      { label: "Facturați pe bază de ore sau proiect?", options: ["Ore", "Proiect", "Mixt", "Abonament"] },
      { label: "Cum urmăriți satisfacția clienților?", options: ["Sondaje", "Feedback verbal", "NPS", "Nu urmărim"] },
    ],
  },
  productie: {
    label: "Producție & Manufacturing",
    questions: [
      { label: "Urmăriți producția / randamentul pe schimb?", options: ["Da, automatizat", "Da, manual", "Nu"] },
      { label: "Cum planificați producția?", options: ["Soft MRP/MES", "Excel", "Manual", "Altul"] },
      { label: "Aveți probleme de calitate / rebuturi?", options: ["Da, frecvent", "Ocazional", "Rar", "Nu"] },
    ],
  },
};

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
      cui: "",
      fullName: "",
      email: "",
      phone: "",
      roleInCompany: "",
      orderChannels: [],
      automationTools: [],
      industryType: "",
    },
  });

  const onSubmit = async (data: AuditFormValues) => {
    setIsSubmitting(true);
    try {
      const industryQuestions: Record<string, string> = {};
      if (data.industryType && industryGroups[data.industryType]) {
        const qs = industryGroups[data.industryType].questions;
        if (data.industryQ1) industryQuestions[qs[0].label] = data.industryQ1;
        if (data.industryQ2) industryQuestions[qs[1].label] = data.industryQ2;
        if (data.industryQ3 && qs[2]) industryQuestions[qs[2].label] = data.industryQ3;
      }

      const payload = {
        cui: data.cui,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        roleInCompany: data.roleInCompany,
        orderChannels: data.orderChannels,
        orderChannelsOther: data.orderChannelsOther,
        dailyOrders: data.dailyOrders,
        backofficeEmployees: data.backofficeEmployees,
        mainOperationalProblem: data.mainOperationalProblem,
        weeklyRepetitiveHours: data.weeklyRepetitiveHours,
        erpSoftware: data.erpSoftware,
        erpSoftwareOther: data.erpSoftwareOther,
        hasCrm: data.hasCrm,
        stockTracking: data.stockTracking,
        hasWebsite: data.hasWebsite,
        websiteUrl: data.websiteUrl,
        automationTools: data.automationTools,
        automationToolsOther: data.automationToolsOther,
        yearlyObjective: data.yearlyObjective,
        investmentRecovery: data.investmentRecovery,
        previousDigitalization: data.previousDigitalization,
        employeesAvoidable: data.employeesAvoidable,
        industryType: data.industryType,
        industryQuestions,
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

      try {
        await supabase.from("leadmagnet-audit-strategic" as any).insert({
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          company_name: data.cui,
          cui: data.cui,
          role_in_company: data.roleInCompany,
          order_channels: data.orderChannels?.length ? data.orderChannels : null,
          order_channels_other: data.orderChannelsOther || null,
          daily_orders: data.dailyOrders || null,
          backoffice_employees: data.backofficeEmployees || null,
          main_operational_problem: data.mainOperationalProblem || null,
          weekly_repetitive_hours: data.weeklyRepetitiveHours || null,
          erp_software: data.erpSoftware || null,
          erp_software_other: data.erpSoftwareOther || null,
          has_crm: data.hasCrm || null,
          stock_tracking: data.stockTracking || null,
          has_website: data.hasWebsite || null,
          website_url: data.websiteUrl || null,
          automation_tools: data.automationTools?.length ? data.automationTools : null,
          automation_tools_other: data.automationToolsOther || null,
          yearly_objective: data.yearlyObjective || null,
          investment_recovery: data.investmentRecovery || null,
          previous_digitalization: data.previousDigitalization || null,
          employees_avoidable: data.employeesAvoidable || null,
          industry_questions: Object.keys(industryQuestions).length ? industryQuestions : null,
          source: "audit-form-modal",
        } as any);
      } catch (dbErr) {
        console.error("DB insert error:", dbErr);
      }

      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead");
      }

      setDirection(1);
      setCurrentStep(TOTAL_STEPS - 1);
      toast({ title: "Formularul a fost trimis cu succes! Rezervă-ți consultația." });
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
      const valid = await form.trigger(["cui", "fullName", "email", "phone", "roleInCompany"]);
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
    "bg-white/[0.07] border border-yellow-500/40 text-white placeholder:text-white/40 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 focus:bg-white/[0.1] transition-all duration-200";
  const labelClass = "text-white/80";

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-full h-full max-w-none max-h-none rounded-none md:w-auto md:h-auto md:max-w-2xl md:max-h-[90vh] md:rounded-lg p-0 bg-[#0a0e1a] border border-yellow-500/30 overflow-hidden">
        <DialogTitle className="sr-only">Audit Strategic Gratuit</DialogTitle>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Mulțumim!</h2>
            <p className="text-white/60 text-lg max-w-md">
              Îți rezervăm locul pentru audit. Vei primi confirmarea pe email și WhatsApp în maxim 60 de minute.
            </p>
            <Button onClick={handleClose} className="btn-3d-gold mt-8 px-8 py-4 h-auto rounded-xl">Închide</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header + Progress */}
            <div className="p-4 md:p-6 pb-0">
              <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-4 leading-tight">
                Audit Strategic Gratuit
              </h2>
              <div className="flex items-center justify-between mb-3">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[9px] md:text-xs font-bold border-2 transition-all duration-300 ${
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
                <div className="flex-1 overflow-y-auto px-4 py-3 md:px-6 md:py-4">
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
                      {currentStep === 5 && <Step6 />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation footer */}
                <div className="p-3 md:p-4 border-t border-yellow-500/10 flex justify-between items-center">
                  {currentStep > 0 ? (
                    <Button type="button" variant="outline" onClick={handleBack} className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Înapoi
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < TOTAL_STEPS - 2 ? (
                    <Button type="button" onClick={handleNext} className="btn-3d-gold px-6 py-3 h-auto rounded-xl">
                      Continuă <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : currentStep === TOTAL_STEPS - 2 ? (
                    <Button type="submit" disabled={isSubmitting} className="btn-3d-gold px-6 py-3 h-auto rounded-xl animate-glow-pulse">
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                      Trimite și rezervă auditul
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => { toast({ title: "Programare realizată cu succes!", description: "Vei primi confirmarea pe email în câteva minute." }); handleClose(); }} className="btn-3d-gold px-6 py-3 h-auto rounded-xl">
                      <CheckCircle className="w-5 h-5 mr-2" /> Finalizare
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

interface StepProps {
  form: ReturnType<typeof useForm<AuditFormValues>>;
  inputClass: string;
  labelClass: string;
}

// ── STEP 1: Identificare și contact (obligatorii) ──
function Step1({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <p className="text-white/50 text-sm leading-relaxed mb-4">
        Completează datele de identificare — CUI-ul ne permite să preluăm automat informații din ANAF.
      </p>
      <FormField control={form.control} name="cui" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>CUI (Cod Unic de Înregistrare) *</FormLabel>
          <FormControl><Input {...field} className={inputClass} placeholder="ex. RO12345678" /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="fullName" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Prenume + Nume *</FormLabel>
            <FormControl><Input {...field} className={inputClass} placeholder="Ion Popescu" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Telefon / WhatsApp *</FormLabel>
            <FormControl><Input {...field} className={inputClass} placeholder="07xx xxx xxx" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <FormField control={form.control} name="email" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Email profesional *</FormLabel>
          <FormControl><Input {...field} type="email" className={inputClass} placeholder="email@firma.ro" /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="roleInCompany" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Rolul tău în firmă *</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Fondator / CEO / Administrator", "Director operațional", "Director financiar", "Manager", "Alt rol"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}

// ── STEP 2: Cum funcționează firma azi (opționale) ──
function Step2({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Cum funcționează firma azi
      </h3>
      <p className="text-white/40 text-xs">Toate câmpurile sunt opționale dar îmbunătățesc calitatea auditului.</p>

      {/* Order channels - multi-select */}
      <FormField control={form.control} name="orderChannels" render={() => (
        <FormItem>
          <FormLabel className={labelClass}>Cum primiți comenzile acum?</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {orderChannelOptions.map((ch) => (
              <FormField key={ch} control={form.control} name="orderChannels" render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                      checked={field.value?.includes(ch)}
                      onCheckedChange={(checked) => {
                        const cur = field.value || [];
                        field.onChange(checked ? [...cur, ch] : cur.filter((v) => v !== ch));
                      }}
                    />
                  </FormControl>
                  <Label className="text-white/70 text-sm font-normal cursor-pointer">{ch}</Label>
                </FormItem>
              )} />
            ))}
          </div>
          {form.watch("orderChannels")?.includes("Altul") && (
            <FormField control={form.control} name="orderChannelsOther" render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl><Input {...field} className={inputClass} placeholder="Specifică..." /></FormControl>
              </FormItem>
            )} />
          )}
        </FormItem>
      )} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="dailyOrders" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Câte comenzi procesați zilnic?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
              <SelectContent className={selectContentClass}>
                {["Sub 10", "10–50", "50–200", "200–500", "Peste 500"].map((opt) => (
                  <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )} />
        <FormField control={form.control} name="backofficeEmployees" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Angajați în administrare / back-office?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
              <SelectContent className={selectContentClass}>
                {["1–2", "3–5", "6–10", "Peste 10"].map((opt) => (
                  <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )} />
      </div>

      <FormField control={form.control} name="mainOperationalProblem" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Cea mai mare problemă operațională acum?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {[
                "Comenzi procesate greșit sau lent",
                "Stoc gestionat din ochi",
                "Facturare manuală / întârziată",
                "Nu știu ce profit am în timp real",
                "Angajați ocupați cu sarcini repetitive",
                "Clienți pierduți fără să știu de ce",
              ].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      <FormField control={form.control} name="weeklyRepetitiveHours" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Ore/săptămână pe sarcini repetitive (total echipă)?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Sub 5h", "5–15h", "15–30h", "30–60h", "Peste 60h"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />
    </div>
  );
}

// ── STEP 3: Tech Stack actual (opționale) ──
function Step3({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Tech Stack actual
      </h3>
      <p className="text-white/40 text-xs">Opțional — ne ajută să personalizăm recomandările din audit.</p>

      <FormField control={form.control} name="erpSoftware" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Ce soft de gestiune / ERP folosiți?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Saga", "WinMentor", "SmartBill", "Oblio", "Odoo", "SAP", "Niciunul (Excel)", "Altul"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />
      {form.watch("erpSoftware") === "Altul" && (
        <FormField control={form.control} name="erpSoftwareOther" render={({ field }) => (
          <FormItem>
            <FormControl><Input {...field} className={inputClass} placeholder="Specifică ERP-ul..." /></FormControl>
          </FormItem>
        )} />
      )}

      <FormField control={form.control} name="hasCrm" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Aveți un CRM (gestiune clienți)?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Da, folosim activ", "Da, dar nu îl folosim bine", "Nu, gestionăm în Excel / foi", "Nu știu ce e un CRM"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      <FormField control={form.control} name="stockTracking" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Cum urmăriți stocul?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Sistem dedicat (WMS)", "În ERP-ul existent", "Excel / foi fizice", "Din ochi / memorie", "Nu avem stoc"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="hasWebsite" render={({ field }) => (
          <FormItem>
            <FormLabel className={labelClass}>Aveți un website activ?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
              <SelectContent className={selectContentClass}>
                {["Da, cu vânzări online", "Da, fără vânzări online", "Nu"].map((opt) => (
                  <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )} />
        {form.watch("hasWebsite")?.startsWith("Da") && (
          <FormField control={form.control} name="websiteUrl" render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>URL website</FormLabel>
              <FormControl><Input {...field} className={inputClass} placeholder="https://..." /></FormControl>
            </FormItem>
          )} />
        )}
      </div>

      {/* Automation tools multi-select */}
      <FormField control={form.control} name="automationTools" render={() => (
        <FormItem>
          <FormLabel className={labelClass}>Folosiți tool-uri de automatizare sau AI?</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {automationToolOptions.map((tool) => (
              <FormField key={tool} control={form.control} name="automationTools" render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                      checked={field.value?.includes(tool)}
                      onCheckedChange={(checked) => {
                        const cur = field.value || [];
                        field.onChange(checked ? [...cur, tool] : cur.filter((v) => v !== tool));
                      }}
                    />
                  </FormControl>
                  <Label className="text-white/70 text-sm font-normal cursor-pointer">{tool}</Label>
                </FormItem>
              )} />
            ))}
          </div>
          {form.watch("automationTools")?.includes("Altul") && (
            <FormField control={form.control} name="automationToolsOther" render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl><Input {...field} className={inputClass} placeholder="Specifică tool-ul..." /></FormControl>
              </FormItem>
            )} />
          )}
        </FormItem>
      )} />
    </div>
  );
}

// ── STEP 4: Context financiar (opționale) ──
function Step4({ form, inputClass, labelClass }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Context financiar & ambiție
      </h3>
      <p className="text-white/40 text-xs">Opțional — calibrează recomandările și pachetul propus.</p>

      <FormField control={form.control} name="yearlyObjective" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Care este obiectivul principal pentru acest an?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Creștere cifră de afaceri", "Creștere profit / marjă", "Reducere costuri operaționale", "Scalare fără angajări", "Pregătire pentru vânzarea firmei"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      <FormField control={form.control} name="investmentRecovery" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Câte luni ați putea recupera o investiție de 15.000–50.000 €?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Sub 3 luni", "3–6 luni", "6–12 luni", "Peste 12 luni", "Nu știu"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      <FormField control={form.control} name="previousDigitalization" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Ați mai investit în digitalizare / software înainte?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["Nu, niciodată", "Da, cu rezultate bune", "Da, și nu a funcționat cum speram", "Da, dar echipa nu l-a adoptat"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      <FormField control={form.control} name="employeesAvoidable" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Câți angajați noi ați putea evita prin automatizare?</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {["0", "1–2", "3–5", "Peste 5"].map((opt) => (
                <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />
    </div>
  );
}

// ── STEP 5: Specific industrie (opționale, condiționate) ──
function Step5({ form, inputClass, labelClass }: StepProps & { isSubmitting: boolean }) {
  const selectedIndustry = form.watch("industryType");
  const group = selectedIndustry ? industryGroups[selectedIndustry] : null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Specific pe industria ta
      </h3>
      <p className="text-white/40 text-xs">Selectează industria pentru întrebări personalizate — opțional.</p>

      <FormField control={form.control} name="industryType" render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClass}>Selectează industria ta</FormLabel>
          <Select onValueChange={(val) => {
            field.onChange(val);
            form.setValue("industryQ1", "");
            form.setValue("industryQ2", "");
            form.setValue("industryQ3", "");
          }} value={field.value}>
            <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
            <SelectContent className={selectContentClass}>
              {Object.entries(industryGroups).map(([key, g]) => (
                <SelectItem key={key} value={key} className={selectItemClass}>{g.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )} />

      {group && (
        <div className="space-y-4 pt-2 border-t border-yellow-500/10">
          <p className="text-yellow-400/70 text-sm font-medium">{group.label}</p>
          {group.questions.map((q, idx) => {
            const fieldName = `industryQ${idx + 1}` as "industryQ1" | "industryQ2" | "industryQ3";
            return (
              <FormField key={idx} control={form.control} name={fieldName} render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>{q.label}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className={inputClass}><SelectValue placeholder="Selectează..." /></SelectTrigger></FormControl>
                    <SelectContent className={selectContentClass}>
                      {q.options.map((opt) => (
                        <SelectItem key={opt} value={opt} className={selectItemClass}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── STEP 6: Rezervare Cal.com ──
function Step6() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
        Rezervă consultația
      </h3>
      <p className="text-white/50 text-sm">
        Alege un slot disponibil pentru auditul tău strategic gratuit de 20 de minute.
      </p>
      <div className="rounded-xl overflow-hidden border border-yellow-500/20" style={{ height: "450px" }}>
        <iframe
          src="https://cal.com/ai-automatizari-zjwxgt/rezervare-consultatie?embed=true&theme=dark&layout=month_view"
          className="w-full h-full border-0"
          title="Rezervare consultație"
          allow="payment"
        />
      </div>
    </div>
  );
}
