
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { ChatWidget } from "@/components/chat/ChatWidget";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Eye className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Politica de Confidențialitate
          </h1>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-8">
            Această Politică de Confidențialitate descrie modul în care colectăm, utilizăm și protejăm informațiile dumneavoastră atunci când utilizați serviciile noastre.
          </p>

          <div className="bg-[#1A1F2C] p-6 rounded-lg mb-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white m-0">Informații Colectate</h2>
            </div>
            <ul className="text-gray-300 space-y-2">
              <li>Date de identificare (nume, prenume)</li>
              <li>Informații de contact (email, telefon)</li>
              <li>Date despre companie și rolul în cadrul acesteia</li>
              <li>Informații tehnice despre dispozitivul și browserul utilizat</li>
              <li>Date de utilizare și preferințe</li>
            </ul>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white">Utilizarea Informațiilor</h2>
              <p className="text-gray-300">
                Utilizăm informațiile colectate pentru:
              </p>
              <ul className="text-gray-300 list-disc pl-6">
                <li>Furnizarea și îmbunătățirea serviciilor noastre</li>
                <li>Personalizarea experienței utilizatorului</li>
                <li>Comunicarea cu dumneavoastră despre serviciile noastre</li>
                <li>Analize și statistici pentru îmbunătățirea platformei</li>
                <li>Conformitatea cu obligațiile legale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Protecția Datelor</h2>
              <p className="text-gray-300">
                Implementăm măsuri de securitate tehnice și organizatorice pentru a proteja datele dumneavoastră împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii neautorizate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Cookie-uri și Tehnologii Similar</h2>
              <p className="text-gray-300">
                Utilizăm cookie-uri și tehnologii similare pentru a îmbunătăți experiența de navigare și a analiza utilizarea site-ului. Puteți controla utilizarea cookie-urilor prin setările browserului dumneavoastră.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Partajarea Informațiilor</h2>
              <p className="text-gray-300">
                Nu vindem sau închiriem informațiile dumneavoastră personale către terți. Putem partaja informații cu:
              </p>
              <ul className="text-gray-300 list-disc pl-6">
                <li>Furnizori de servicii care ne ajută să operăm platforma</li>
                <li>Autorități publice, când legislația o impune</li>
                <li>Parteneri de afaceri, cu acordul dumneavoastră explicit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Actualizări ale Politicii</h2>
              <p className="text-gray-300">
                Ne rezervăm dreptul de a actualiza această politică de confidențialitate în orice moment. Vă vom notifica despre orice modificări prin postarea noii versiuni pe site-ul nostru.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white">Contact</h2>
              <p className="text-gray-300">
                Pentru orice întrebări sau preocupări legate de politica noastră de confidențialitate, ne puteți contacta la:
                <a href="mailto:privacy@automationai.ro" className="text-purple-400 hover:text-purple-300 ml-1">
                  privacy@automationai.ro
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default PrivacyPolicy;
