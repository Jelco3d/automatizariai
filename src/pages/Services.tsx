import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Zap, Brain, ArrowRight, Database, Cloud, Lock, Cog } from "lucide-react";

const Services = () => {
  console.log("Rendering Services page");

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center relative">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
          Our Services
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Comprehensive AI automation solutions tailored to your business needs
        </p>
      </div>

      {/* Detailed Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Bot className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Process Automation</h3>
              <p className="text-gray-300 mb-4">Transform your business operations with AI-powered automation solutions that streamline workflows and reduce manual tasks.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Workflow optimization
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Document processing
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Data entry automation
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6">
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">AI Analytics</h3>
              <p className="text-gray-300 mb-4">Leverage advanced AI algorithms to analyze your data and extract actionable insights for better decision-making.</p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Predictive analytics
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Pattern recognition
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Real-time monitoring
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <p className="text-3xl font-bold text-purple-400 mb-4">$999<span className="text-sm text-gray-400">/month</span></p>
              <ul className="text-gray-300 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Basic process automation
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  5 automated workflows
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Email support
                </li>
              </ul>
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
              <p className="text-3xl font-bold text-purple-400 mb-4">$2,499<span className="text-sm text-gray-400">/month</span></p>
              <ul className="text-gray-300 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Advanced automation
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  15 automated workflows
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Custom integrations
                </li>
              </ul>
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-purple-400 mb-4">Custom</p>
              <ul className="text-gray-300 space-y-2 mb-6 text-left">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Full automation suite
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Unlimited workflows
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  24/7 support
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                  Dedicated account manager
                </li>
              </ul>
              <Button onClick={handleBooking} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Case Studies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">E-commerce Giant</h3>
              <p className="text-gray-300 mb-4">Automated customer service operations resulting in 70% reduction in response time</p>
              <div className="flex justify-between text-purple-400">
                <span>ROI: 300%</span>
                <span>Time: 3 months</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Financial Institution</h3>
              <p className="text-gray-300 mb-4">Implemented AI-driven fraud detection system, preventing $2M in fraudulent transactions</p>
              <div className="flex justify-between text-purple-400">
                <span>ROI: 500%</span>
                <span>Time: 6 months</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Capabilities Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Technical Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Data Processing</h3>
              <p className="text-gray-300">Advanced algorithms for efficient data handling</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cloud Integration</h3>
              <p className="text-gray-300">Seamless cloud service integration</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Security</h3>
              <p className="text-gray-300">Enterprise-grade security protocols</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Cog className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Customization</h3>
              <p className="text-gray-300">Flexible and customizable solutions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integration Options Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
          Integration Options
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Salesforce</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">SAP</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Microsoft</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">Oracle</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg flex items-center justify-center">
            <span className="text-white">n8n</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Book a free consultation to discover how our AI automation services can benefit your business
        </p>
        <Button 
          onClick={handleBooking}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all hover:scale-105"
        >
          Schedule Your Free Consultation
          <ArrowRight className="ml-2" />
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
