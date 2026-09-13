import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Check, Clock, Mail, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEBINAR, formatWebinarDate, formatWebinarTime } from "@/config/webinar";

const WebinarConfirmare = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Loc rezervat | Webinar afacere autonomă";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const dateLabel = formatWebinarDate();
  const timeLabel = formatWebinarTime();

  return (
    <div className="webinar-theme min-h-screen bg-background text-foreground">
      <main className="webinar-entry relative mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-5 py-14 md:px-10">
        <div className="webinar-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

        <div className="relative">
          <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check className="h-6 w-6" aria-hidden="true" />
          </span>

          <p className="font-mono text-sm text-accent">Înscriere confirmată</p>
          <h1 className="mt-3 font-webinar-heading text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            Locul tău e rezervat
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            {WEBINAR.title} — îți trimit reminder pe WhatsApp înainte de sesiune.
          </p>

          <div className="mt-9 grid gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Data
              </div>
              <p className="mt-2 text-lg font-semibold capitalize text-foreground">{dateLabel}</p>
            </div>
            <div className="bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Ora
              </div>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {timeLabel} (ora României)
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Durată: {WEBINAR.durationMinutes} de minute
              </p>
            </div>
            <div className="bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <Video className="h-4 w-4" aria-hidden="true" />
                Link webinar
              </div>
              <a
                href={WEBINAR.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block break-all text-sm text-foreground underline decoration-accent underline-offset-4 outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {WEBINAR.joinUrl}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              className="h-12 rounded-sm bg-primary px-6 text-base font-bold text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring"
            >
              <a href={WEBINAR.joinUrl} target="_blank" rel="noopener noreferrer">
                Salvează linkul de acces
              </a>
            </Button>
            <Link
              to={WEBINAR.registrationPath}
              className="font-mono text-xs text-muted-foreground underline-offset-4 outline-none hover:text-accent hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Înapoi la pagina webinarului
            </Link>
          </div>

          <div className="mt-12 border-t border-border pt-5">
            <a
              href="mailto:contact@aiautomatizari.ro"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              contact@aiautomatizari.ro
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WebinarConfirmare;
