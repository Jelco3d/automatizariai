import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Politica de Cookie-uri</h1>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Ce sunt cookie-urile?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul dumneavoastră (computer, tabletă sau telefon mobil) 
                atunci când vizitați un site web. Acestea permit site-ului web să vă recunoască și să rețină preferințele dumneavoastră.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Cum folosim cookie-urile</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Folosim cookie-uri pentru a:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Îmbunătăți experiența dumneavoastră de navigare</li>
                <li>Analiza traficul pe site-ul nostru</li>
                <li>Personaliza conținutul și reclamele</li>
                <li>Facilita funcționarea rețelelor sociale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Tipuri de cookie-uri</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2 text-blue-300">Cookie-uri esențiale</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Acestea sunt necesare pentru funcționarea corectă a site-ului și nu pot fi dezactivate. 
                    Includ cookie-uri pentru autentificare, securitate și preferințe de bază.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-blue-300">Cookie-uri de performanță</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ne ajută să înțelegem cum interactionați cu site-ul nostru prin colectarea de informații anonime 
                    despre paginile vizitate și erorile întâlnite.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-blue-300">Cookie-uri funcționale</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Permit site-ului să rețină alegerile făcute (cum ar fi limba sau regiunea) și să ofere 
                    funcții îmbunătățite și personalizate.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2 text-blue-300">Cookie-uri de marketing</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Sunt folosite pentru a urmări vizitatorii pe site-uri web și pentru a afișa reclame 
                    care sunt relevante și captivante pentru utilizatorul individual.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Gestionarea cookie-urilor</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți șterge toate cookie-urile 
                care sunt deja pe computerul dumneavoastră și puteți seta majoritatea browserelor să le împiedice să fie plasate.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Dacă faceți acest lucru, este posibil să fie nevoie să ajustați manual unele preferințe de fiecare dată 
                când vizitați un site și este posibil ca unele servicii și funcții să nu funcționeze.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Cookie-uri terțe părți</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Site-ul nostru poate conține cookie-uri plasate de servicii terțe părți, cum ar fi:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Google Analytics - pentru analiza traficului</li>
                <li>Rețele sociale (Facebook, LinkedIn) - pentru partajarea conținutului</li>
                <li>Servicii de chat și suport client</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Actualizări ale politicii</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Această politică poate fi actualizată periodic. Vă recomandăm să o verificați regulat pentru 
                a fi la curent cu orice modificări.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                Pentru întrebări despre această politică de cookie-uri, ne puteți contacta la: 
                <a href="mailto:contact@aiautomatizari.ro" className="text-blue-400 hover:text-blue-300 ml-1">
                  contact@aiautomatizari.ro
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}