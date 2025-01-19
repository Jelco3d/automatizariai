import { Code2, Workflow, Brain, Zap, Bot, Sparkles, Network, Cpu } from "lucide-react";

export const TechStackSection = () => {
  console.log("Rendering TechStackSection");
  
  const techStack = [
    {
      name: "Make (Integromat)",
      description: "Advanced automation platform for complex workflows",
      icon: <Workflow className="w-5 h-5 text-purple-400" />
    },
    {
      name: "n8n",
      description: "Open-source workflow automation tool",
      icon: <Network className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Relevance AI",
      description: "AI-powered data processing and analysis",
      icon: <Brain className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Zapier",
      description: "Connect and automate your favorite apps",
      icon: <Zap className="w-5 h-5 text-purple-400" />
    },
    {
      name: "OpenAI",
      description: "Advanced language models and AI capabilities",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Langchain",
      description: "Framework for developing AI-powered applications",
      icon: <Code2 className="w-5 h-5 text-purple-400" />
    },
    {
      name: "AutoGPT",
      description: "Autonomous AI agent for task automation",
      icon: <Bot className="w-5 h-5 text-purple-400" />
    },
    {
      name: "Power Automate",
      description: "Microsoft's automation solution for business processes",
      icon: <Cpu className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Our Tech Stack
          </h2>
          <p className="text-purple-200 text-xs max-w-xl mx-auto">
            We leverage cutting-edge automation tools and platforms to deliver powerful solutions
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="p-2 rounded-lg bg-purple-900/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="p-1 rounded-full bg-purple-900/30 group-hover:bg-purple-900/50 transition-colors">
                  {tech.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{tech.name}</h3>
                <p className="text-purple-200 text-xs">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};