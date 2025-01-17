import { Card, CardContent } from "@/components/ui/card";
import { Bot, Brain, Zap, Database, Cloud, Lock } from "lucide-react";

export const ServicesSection = () => {
  return (
    <div className="container mx-auto px-4 py-16 relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">AI Process Automation</h3>
            <p className="text-gray-300">Automate repetitive tasks and workflows with AI-powered solutions</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Data Analysis</h3>
            <p className="text-gray-300">Transform raw data into actionable insights with AI analysis</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Workflow Optimization</h3>
            <p className="text-gray-300">Streamline your business processes for maximum efficiency</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Data Integration</h3>
            <p className="text-gray-300">Seamlessly connect and synchronize data across multiple platforms</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Cloud Solutions</h3>
            <p className="text-gray-300">Leverage cloud technology for scalable and efficient automation</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Security Automation</h3>
            <p className="text-gray-300">Automate security protocols and compliance monitoring</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};