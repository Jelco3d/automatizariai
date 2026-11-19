import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
    const prev = robots.content;
    robots.content = "noindex, nofollow";
    const prevTitle = document.title;
    document.title = "Pagina nu a fost găsită | AI Automatizări";
    return () => { robots!.content = prev; document.title = prevTitle; };
  }, []);
  return (
    <main className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-yellow-400">404</p>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-white">Pagina nu a fost găsită</h1>
        <p className="mt-3 text-white/60">Adresa pe care ai accesat-o nu există sau a fost mutată.</p>
        <Link to="/" className="btn-3d-gold inline-block mt-6 px-6 py-3 rounded-xl font-semibold">Înapoi la pagina principală</Link>
      </div>
    </main>
  );
}
