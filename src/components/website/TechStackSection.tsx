import { Code2, Workflow, Brain, Zap, Bot, Sparkles, Network, Cpu } from "lucide-react";

export const TechStackSection = () => {
  console.log("Rendering TechStackSection");
  
  const techStack = [
    {
      name: "Make (Integromat)",
      description: "Platformă avansată de automatizare pentru fluxuri de lucru complexe",
      icon: <Workflow className="w-5 h-5 text-purple-300" />
    },
    {
      name: "n8n",
      description: "Instrument open-source pentru automatizarea fluxurilor de lucru",
      icon: <Network className="w-5 h-5 text-purple-300" />
    },
    {
      name: "Relevance AI",
      description: "Procesare și analiză de date bazată pe AI",
      icon: <Brain className="w-5 h-5 text-purple-300" />
    },
    {
      name: "Zapier",
      description: "Conectați și automatizați aplicațiile preferate",
      icon: <Zap className="w-5 h-5 text-purple-300" />
    },
    {
      name: "OpenAI",
      description: "Modele de limbaj avansate și capabilități AI",
      icon: <Sparkles className="w-5 h-5 text-purple-300" />
    },
    {
      name: "Langchain",
      description: "Framework pentru dezvoltarea aplicațiilor bazate pe AI",
      icon: <Code2 className="w-5 h-5 text-purple-300" />
    },
    {
      name: "AutoGPT",
      description: "Agent AI autonom pentru automatizarea sarcinilor",
      icon: <Bot className="w-5 h-5 text-purple-300" />
    },
    {
      name: "Power Automate",
      description: "Soluția Microsoft pentru automatizarea proceselor de business",
      icon: <Cpu className="w-5 h-5 text-purple-300" />
    }
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Tehnologiile Noastre
          </h2>
          <p className="text-purple-200 text-xs max-w-xl mx-auto">
            Folosim instrumente și platforme de automatizare de ultimă generație pentru a oferi soluții puternice
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="p-2 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/30 border border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 group backdrop-blur-sm shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="p-1 rounded-full bg-gradient-to-br from-purple-800/50 to-purple-700/40 group-hover:from-purple-700/60 group-hover:to-purple-600/50 transition-colors shadow-inner">
                  {tech.icon}
                </div>
                <h3 className="text-sm font-semibold text-purple-100">{tech.name}</h3>
                <p className="text-purple-300 text-xs">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};