
import { Footer } from "@/components/website/Footer";
import { Navigation } from "@/components/website/Navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          Termeni și Condiții
        </h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a utiliza serviciile noastre.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptarea Termenilor</h2>
          <p className="text-gray-300 mb-6">
            Prin utilizarea serviciilor noastre, sunteți de acord cu acești termeni și condiții în totalitate. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați serviciile noastre.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-white">2. Descrierea Serviciilor</h2>
          <p className="text-gray-300 mb-6">
            Oferim soluții de automatizare bazate pe inteligență artificială pentru afaceri. Serviciile noastre includ, dar nu se limitează la, automatizarea proceselor, analiza datelor și implementarea soluțiilor AI personalizate.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-white">3. Utilizarea Serviciilor</h2>
          <p className="text-gray-300 mb-6">
            Vă angajați să utilizați serviciile noastre doar în scopuri legale și în conformitate cu acești termeni. Nu veți utiliza serviciile noastre pentru activități ilegale sau neautorizate.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-white">4. Confidențialitate</h2>
          <p className="text-gray-300 mb-6">
            Protejăm confidențialitatea datelor dvs. conform politicii noastre de confidențialitate. Prin utilizarea serviciilor noastre, sunteți de acord cu colectarea și utilizarea informațiilor conform acestei politici.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-white">5. Proprietate Intelectuală</h2>
          <p className="text-gray-300 mb-6">
            Toate drepturile de proprietate intelectuală asupra serviciilor noastre și conținutului asociat sunt rezervate. Nu aveți permisiunea să reproduceți, distribuiți sau creați lucrări derivate fără acordul nostru explicit.
          </p>
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Terms;
