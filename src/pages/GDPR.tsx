
import { Footer } from "@/components/website/Footer";
import { Navigation } from "@/components/website/Navigation";
import { Shield, Lock, FileText } from "lucide-react";
import { ChatWidget } from "@/components/chat/ChatWidget";

const GDPR = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Politica GDPR
          </h1>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-8">
            Conform Regulamentului General privind Protecția Datelor (GDPR) și legislației române în vigoare, vă informăm despre modul în care colectăm și procesăm datele dumneavoastră personale.
          </p>

          <div className="bg-[#1A1F2C] p-6 rounded-lg mb-8 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white m-0">Date Personale Colectate</h2>
            </div>
            <p className="text-gray-300">
              Colectăm și procesăm următoarele categorii de date personale:
            </p>
            <ul className="text-gray-300">
              <li>Nume și prenume</li>
              <li>Adresă de email</li>
              <li>Număr de telefon (opțional)</li>
              <li>Informații despre companie (pentru clienții business)</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Scopul Prelucrării Datelor</h2>
            <p className="text-gray-300">
              Datele dumneavoastră sunt prelucrate în următoarele scopuri:
            </p>
            <ul className="text-gray-300 list-disc pl-6">
              <li>Furnizarea serviciilor solicitate</li>
              <li>Îmbunătățirea serviciilor noastre</li>
              <li>Comunicări legate de serviciile contractate</li>
              <li>Conformitate cu obligațiile legale</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white">Drepturile Dumneavoastră</h2>
            <p className="text-gray-300">
              Conform GDPR, beneficiați de următoarele drepturi:
            </p>
            <ul className="text-gray-300 list-disc pl-6">
              <li>Dreptul de acces la date</li>
              <li>Dreptul la rectificarea datelor</li>
              <li>Dreptul la ștergerea datelor ("dreptul de a fi uitat")</li>
              <li>Dreptul la restricționarea prelucrării</li>
              <li>Dreptul la portabilitatea datelor</li>
              <li>Dreptul la opoziție</li>
            </ul>

            <h2 className="text-2xl font-semibold text-white">Perioada de Stocare</h2>
            <p className="text-gray-300">
              Datele personale sunt stocate pe perioada necesară îndeplinirii scopurilor pentru care au fost colectate, cu respectarea procedurilor interne privind retenția datelor, inclusiv a regulilor de arhivare aplicabile.
            </p>

            <h2 className="text-2xl font-semibold text-white">Contact DPO</h2>
            <p className="text-gray-300">
              Pentru orice întrebări sau solicitări legate de modul în care datele dumneavoastră personale sunt utilizate, ne puteți contacta la: 
              <a href="mailto:dpo@automationai.ro" className="text-purple-400 hover:text-purple-300 ml-1">
                dpo@automationai.ro
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default GDPR;
