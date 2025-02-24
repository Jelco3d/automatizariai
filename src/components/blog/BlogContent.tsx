
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, User, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function BlogContent() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementare newsletter
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementare comentarii
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      {/* Hero Section */}
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          Cum Automatizarea AI Transformă Afacerile în 2024
        </h1>
        <div className="flex items-center gap-6 text-gray-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Alex Ionescu</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>15 Mar 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>10 min citire</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <img 
          src="/lovable-uploads/ca45f4a2-1d64-4f6d-839b-f8513856ea53.jpg"
          alt="AI Automation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Table of Contents */}
      <div className="bg-[#1A1F2C]/50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cuprins</h2>
        <nav className="space-y-2">
          <a href="#introducere" className="block text-purple-400 hover:text-purple-300">Introducere</a>
          <a href="#problema" className="block text-purple-400 hover:text-purple-300">Definirea Problemei</a>
          <a href="#solutia" className="block text-purple-400 hover:text-purple-300">Prezentarea Soluției</a>
          <a href="#studiu-caz" className="block text-purple-400 hover:text-purple-300">Studiu de Caz</a>
          <a href="#tendinte" className="block text-purple-400 hover:text-purple-300">Tendințe Viitoare</a>
          <a href="#concluzie" className="block text-purple-400 hover:text-purple-300">Concluzie</a>
        </nav>
      </div>

      {/* Content Sections */}
      <article className="prose prose-invert max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h3:text-2xl prose-h3:font-semibold prose-p:text-gray-300">
        <section id="introducere">
          <h2>Introducere</h2>
          <p>În era digitală actuală, automatizarea bazată pe Inteligența Artificială devine din ce în ce mai crucială pentru succesul afacerilor...</p>
        </section>

        <section id="problema">
          <h2>Definirea Problemei</h2>
          <p>Companiile se confruntă cu provocări tot mai complexe în gestionarea operațiunilor lor zilnice...</p>
        </section>

        <section id="solutia">
          <h2>Prezentarea Soluției</h2>
          <h3>Cum Funcționează Automatizarea AI</h3>
          <p>Automatizarea AI utilizează algoritmi avansați de machine learning pentru a procesa și analiza date...</p>
          
          <h3>Tehnologii Cheie</h3>
          <p>Printre tehnologiile esențiale se numără procesarea limbajului natural (NLP), învățarea automată și computer vision...</p>
          
          <h3>Beneficii</h3>
          <ul>
            <li>Creșterea eficienței operaționale</li>
            <li>Reducerea costurilor</li>
            <li>Îmbunătățirea experienței clienților</li>
          </ul>
        </section>

        <section id="studiu-caz">
          <h2>Studiu de Caz</h2>
          <p>Compania XYZ a implementat soluții de automatizare AI pentru procesarea comenzilor...</p>
        </section>

        <section id="tendinte">
          <h2>Tendințe Viitoare</h2>
          <p>Viitorul automatizării AI se îndreaptă către sisteme tot mai sofisticate...</p>
        </section>

        <section id="concluzie">
          <h2>Concluzie</h2>
          <p>Automatizarea AI reprezintă viitorul afacerilor moderne...</p>
        </section>
      </article>

      {/* Related Posts */}
      <div>
        <h2 className="text-3xl font-bold mb-8">Postări Asemănătoare</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#1A1F2C]/50 border-purple-500/20">
              <CardContent className="p-4">
                <img
                  src="/lovable-uploads/ca45f4a2-1d64-4f6d-839b-f8513856ea53.jpg"
                  alt="Related post"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Titlu Articol Similar {i}</h3>
                <p className="text-gray-400 mb-4">Scurtă descriere a articolului...</p>
                <Link to="/blog" className="text-purple-400 hover:text-purple-300">
                  Citește mai mult
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#1A1F2C]/50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Rămâi la Curent cu Automatizarea AI</h2>
        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Adresa ta de email"
              className="bg-[#0F1117] border-purple-500/20"
            />
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500">
              Abonează-te
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            Prin abonare, ești de acord cu{" "}
            <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
              Politica noastră de Confidențialitate
            </Link>
          </p>
        </form>
      </div>

      {/* Comments */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Comentarii</h2>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <Input
            placeholder="Nume"
            className="bg-[#0F1117] border-purple-500/20"
          />
          <Input
            type="email"
            placeholder="Email"
            className="bg-[#0F1117] border-purple-500/20"
          />
          <Textarea
            placeholder="Mesajul tău"
            className="bg-[#0F1117] border-purple-500/20"
          />
          <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500">
            Trimite Comentariul
          </Button>
        </form>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8">
        <Button 
          className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
          onClick={() => window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank')}
        >
          Programează O Consultație Strategică
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
