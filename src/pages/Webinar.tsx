import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Check, Loader2, Mail, MessageSquareText, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const WEBHOOK_URL = "WEBHOOK_URL";

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Introdu numele tău.")
    .max(100, "Numele poate avea maximum 100 de caractere.")
    .regex(/^[\p{L}\p{M}\s.'-]+$/u, "Numele conține caractere nepermise."),
  email: z
    .string()
    .trim()
    .email("Introdu o adresă de email validă.")
    .max(255, "Emailul poate avea maximum 255 de caractere."),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Introdu un număr WhatsApp valid.")
    .max(20, "Numărul poate avea maximum 20 de caractere.")
    .regex(/^\+?[0-9\s()-]+$/, "Folosește doar cifre și prefixul internațional."),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

const learningPoints = [
  {
    icon: Radio,
    title: "Cum construiești o afacere 100% autonomă",
    description:
      "Vezi arhitectura completă a unei agenții care poate funcționa fără ca tu să fii operatorul ei zilnic.",
  },
  {
    icon: Bot,
    title: "Cum folosești un bot AI pentru clienți, comunicare și livrare",
    description:
      "Îți arăt live cum Grok găsește oportunități, poartă conversațiile și coordonează munca de la cap la coadă.",
  },
  {
    icon: Users,
    title: "Cum obții primul client fără să faci tu munca manuală",
    description:
      "Construim fluxul care identifică, contactează și califică primul client pentru noua afacere.",
  },
];

const Webinar = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", email: "", whatsapp: "" },
  });

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Webinar gratuit | Afacere care rulează singură";
    description?.setAttribute(
      "content",
      "Webinar live gratuit: construiește o afacere autonomă condusă de un bot AI care găsește clienți și coordonează livrarea."
    );

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  const scrollToRegistration = () => {
    document.getElementById("inscriere")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (values: RegistrationValues) => {
    const validated = registrationSchema.safeParse(values);
    if (!validated.success || status === "sending") return;

    setStatus("sending");

    if (WEBHOOK_URL === "WEBHOOK_URL") {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validated.data,
          source: "webinar-afacere-autonoma",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Registration failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="webinar-theme min-h-screen overflow-hidden bg-background text-foreground">
      <main className="webinar-entry">
        <section className="relative border-b border-border px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-10">
          <div className="webinar-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-7xl items-center justify-between border-b border-border pb-5">
            <a
              href="/"
              className="font-webinar-heading text-xl font-bold uppercase text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              AI Automatizări
            </a>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Sesiune live
            </div>
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 pt-12 md:grid-cols-[3fr_2fr] md:gap-16 md:pt-20">
            <div>
              <div className="mb-6 flex items-center gap-3 font-mono text-sm text-accent">
                <span className="h-px w-10 bg-accent" />
                Webinar gratuit live
              </div>
              <h1 className="max-w-4xl font-webinar-heading text-5xl font-bold uppercase leading-[0.94] md:text-7xl lg:text-8xl">
                Cum construiești o afacere care rulează singură
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">
                Webinar live unde construiesc, chiar în timpul sesiunii, o afacere autonomă (agenție de marketing sau video editing) condusă de un bot AI — și îți arăt exact cum poți face același lucru.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  onClick={scrollToRegistration}
                  className="h-auto min-h-12 w-full rounded-sm bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring sm:w-auto"
                >
                  Rezervă-ți locul gratuit
                </Button>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground sm:max-w-56">
                  Durează 45 de minute, e live, nu e o reluare.
                </p>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-md" aria-label="Flux operațional automatizat">
              <div className="absolute inset-0 border border-border bg-card/40" />
              <svg className="absolute inset-0 h-full w-full text-accent" viewBox="0 0 440 440" fill="none" aria-hidden="true">
                <path d="M72 112H220V68H366" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 8" />
                <path d="M72 112V330H218V264H366" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 8" />
                <path d="M220 68V264" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="72" cy="112" r="8" fill="currentColor" />
                <circle cx="220" cy="68" r="8" fill="currentColor" />
                <circle cx="220" cy="264" r="8" fill="currentColor" />
                <circle cx="366" cy="68" r="8" fill="currentColor" />
                <circle cx="366" cy="264" r="8" fill="currentColor" />
                <circle cx="72" cy="330" r="8" fill="currentColor" />
              </svg>
              <div className="absolute left-[8%] top-[18%] bg-background px-2 py-1 font-mono text-[11px] text-foreground">Cerere</div>
              <div className="absolute left-[39%] top-[7%] bg-background px-2 py-1 font-mono text-[11px] text-foreground">Grok AI</div>
              <div className="absolute right-[5%] top-[7%] bg-background px-2 py-1 font-mono text-[11px] text-foreground">Client</div>
              <div className="absolute left-[37%] top-[58%] bg-background px-2 py-1 font-mono text-[11px] text-foreground">Coordonare</div>
              <div className="absolute right-[2%] top-[58%] bg-background px-2 py-1 font-mono text-[11px] text-foreground">Livrare</div>
              <div className="absolute bottom-[18%] left-[8%] bg-background px-2 py-1 font-mono text-[11px] text-foreground">Feedback</div>
              <div className="absolute bottom-5 left-5 right-5 flex justify-between border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
                <span>Sistem activ</span><span>Intervenție minimă</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <p className="font-mono text-sm text-accent">Ce înveți</p>
              <h2 className="mt-3 font-webinar-heading text-4xl font-bold uppercase leading-none md:text-5xl">
                Sistemul, nu teoria
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {learningPoints.map(({ icon: Icon, title, description }) => (
                <article key={title} className="grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-6">
                  <div className="flex h-11 w-11 items-center justify-center border border-accent text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-webinar-heading text-2xl font-semibold uppercase text-foreground md:text-3xl">{title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/40 px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl border-l-2 border-accent pl-6 md:pl-10">
            <p className="font-mono text-sm text-accent">Pentru cine e</p>
            <h2 className="mt-4 max-w-5xl font-webinar-heading text-3xl font-semibold uppercase leading-tight md:text-5xl">
              Pentru oameni ocupați — care au un job full-time sau alte afaceri de administrat — și vor o afacere care nu le cere prezența zilnică pentru a funcționa.
            </h2>
          </div>
        </section>

        <section id="inscriere" className="scroll-mt-6 px-5 py-14 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-9 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <div className="flex items-center gap-3 font-mono text-sm text-accent">
                <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                Înscriere
              </div>
              <h2 className="mt-4 font-webinar-heading text-4xl font-bold uppercase leading-none md:text-6xl">Rezervă-ți locul</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Detaliile de acces vor fi trimise pe WhatsApp înainte de sesiunea live.
              </p>
            </div>

            <div className="border border-border bg-card p-5 md:p-8">
              {status === "success" ? (
                <div className="flex min-h-72 flex-col items-center justify-center text-center" role="status" aria-live="polite">
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-webinar-heading text-3xl font-bold uppercase">Ești înscris.</h3>
                  <p className="mt-3 text-muted-foreground">Îți trimit detaliile pe WhatsApp în curând.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs text-foreground">Nume</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="name"
                              maxLength={100}
                              placeholder="Numele tău"
                              className="h-12 rounded-sm border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                              {...field}
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
                          <FormLabel className="font-mono text-xs text-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              maxLength={255}
                              placeholder="nume@email.ro"
                              className="h-12 rounded-sm border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs text-foreground">Număr WhatsApp</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              maxLength={20}
                              placeholder="+40 7XX XXX XXX"
                              className="h-12 rounded-sm border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {status === "error" && (
                      <p className="border-l-2 border-destructive bg-destructive/10 p-3 text-sm text-destructive" role="alert">
                        Înscrierea nu a putut fi trimisă. Te rugăm să încerci din nou în curând.
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="h-12 w-full rounded-sm bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring"
                    >
                      {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                      Rezervă-ți locul
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-7 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>AI Automatizări</span>
          <a
            href="mailto:contact@aiautomatizari.ro"
            className="inline-flex items-center gap-2 text-foreground outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            contact@aiautomatizari.ro
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Webinar;