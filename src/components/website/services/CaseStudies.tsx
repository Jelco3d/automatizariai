import { Card, CardContent } from "@/components/ui/card";

export const CaseStudies = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
        Studii de Caz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Gigant E-commerce</h3>
            <p className="text-gray-300 mb-4">Operațiuni de servicii pentru clienți automatizate, rezultând o reducere cu 70% a timpului de răspuns</p>
            <div className="flex justify-between text-purple-400">
              <span>ROI: 300%</span>
              <span>Durată: 3 luni</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Instituție Financiară</h3>
            <p className="text-gray-300 mb-4">Sistem de detectare a fraudelor bazat pe AI implementat, prevenind tranzacții frauduloase în valoare de 2M€</p>
            <div className="flex justify-between text-purple-400">
              <span>ROI: 500%</span>
              <span>Durată: 6 luni</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};