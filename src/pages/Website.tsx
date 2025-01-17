import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Brain, Clock, Coins, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Website = () => {
  console.log("Rendering Website page");

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          AI Automation Solutions
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Transform your business operations with cutting-edge AI automation. Save time, reduce costs, and boost productivity.
        </p>
        <Button 
          onClick={handleBooking}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-lg"
        >
          Book Free Consultation
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-[#1A1F2C] border-purple-500/50 hover:border-purple-400 transition-all">
            <CardContent className="p-6 text-center">
              <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Process Automation</h3>
              <p className="text-gray-300">Automate repetitive tasks and workflows with AI-powered solutions</p>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1F2C] border-purple-500/50 hover:border-purple-400 transition-all">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Data Analysis</h3>
              <p className="text-gray-300">Transform raw data into actionable insights with AI analysis</p>
            </CardContent>
          </Card>
          <Card className="bg-[#1A1F2C] border-purple-500/50 hover:border-purple-400 transition-all">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Workflow Optimization</h3>
              <p className="text-gray-300">Streamline your business processes for maximum efficiency</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16 bg-[#1A1F2C]/50">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose AI Automation?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <Clock className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Save Time</h3>
              <p className="text-gray-300">Reduce manual work hours by up to 70% with automated processes</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Coins className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Reduce Costs</h3>
              <p className="text-gray-300">Lower operational costs through efficient automation</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Book a free consultation to discover how AI automation can benefit your business
        </p>
        <Button 
          onClick={handleBooking}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-lg"
        >
          Schedule Your Free AI Audit
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      {/* Navigation back to card */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">
          ← Back to Digital Card
        </Link>
      </div>
    </div>
  );
};

export default Website;