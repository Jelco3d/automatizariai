export const IntegrationOptions = () => {
  const techs = ["Make (Integromat)", "n8n", "Relevance AI", "Zapier", "OpenAI", "Langchain", "AutoGPT", "Power Automate", "React", "Supabase", "AWS"];
  
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-center mb-12">
        Tehnologii de Integrare
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {techs.map((tech, i) => (
          <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 p-4 md:p-6 rounded-lg flex items-center justify-center transition-all hover:bg-white/[0.06]">
            <span className="text-white font-medium">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
