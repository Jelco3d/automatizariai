import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Brain, Clock, Coins, Quote, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Website = () => {
  console.log("Rendering Website page");

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center relative">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6 animate-shimmer">
            AI Automation Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
            Transform your business operations with cutting-edge AI automation. Save time, reduce costs, and boost productivity.
          </p>
          <Button 
            onClick={handleBooking}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Book Free Consultation
            <ArrowRight className="ml-2 animate-bounce" />
          </Button>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16 relative">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-lg border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
            <CardContent className="p-6 text-center">
              <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <h3 className="text-xl font-bold text-white mb-2">AI Process Automation</h3>
              <p className="text-gray-300">Automate repetitive tasks and workflows with AI-powered solutions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-lg border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <h3 className="text-xl font-bold text-white mb-2">Data Analysis</h3>
              <p className="text-gray-300">Transform raw data into actionable insights with AI analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 backdrop-blur-lg border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <h3 className="text-xl font-bold text-white mb-2">Workflow Optimization</h3>
              <p className="text-gray-300">Streamline your business processes for maximum efficiency</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16 bg-[#1A1F2C]/50 backdrop-blur-lg relative">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center mb-12">Why Choose AI Automation?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4 p-6 rounded-lg bg-[#1A1F2C]/50 backdrop-blur-lg hover:bg-[#1A1F2C]/70 transition-all duration-300 transform hover:scale-105">
            <Clock className="w-8 h-8 text-purple-400 flex-shrink-0 animate-pulse" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Save Time</h3>
              <p className="text-gray-300">Reduce manual work hours by up to 70% with automated processes</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-6 rounded-lg bg-[#1A1F2C]/50 backdrop-blur-lg hover:bg-[#1A1F2C]/70 transition-all duration-300 transform hover:scale-105">
            <Coins className="w-8 h-8 text-purple-400 flex-shrink-0 animate-pulse" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Reduce Costs</h3>
              <p className="text-gray-300">Lower operational costs through efficient automation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-[#1A1F2C]/80 backdrop-blur-lg border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-purple-400 mb-4 transform transition-all duration-300 hover:rotate-12" />
              <p className="text-gray-300 mb-4">"The AI automation solutions implemented have reduced our processing time by 70%. Incredible results!"</p>
              <div className="flex items-center gap-2 text-purple-400">
                <Star className="w-4 h-4 fill-current animate-pulse" />
                <Star className="w-4 h-4 fill-current animate-pulse delay-100" />
                <Star className="w-4 h-4 fill-current animate-pulse delay-200" />
                <Star className="w-4 h-4 fill-current animate-pulse delay-300" />
                <Star className="w-4 h-4 fill-current animate-pulse delay-400" />
              </div>
              <p className="text-white font-semibold mt-2">Sarah Johnson</p>
              <p className="text-sm text-gray-400">Operations Manager</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/50 hover:border-purple-400 transition-all">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-gray-300 mb-4">"The workflow optimization has transformed our business operations. We're now more efficient than ever."</p>
              <div className="flex items-center gap-2 text-purple-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-white font-semibold mt-2">Michael Chen</p>
              <p className="text-sm text-gray-400">Tech Director</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/50 hover:border-purple-400 transition-all">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-gray-300 mb-4">"The data analysis automation has given us insights we never had before. Game-changing for our decision-making."</p>
              <div className="flex items-center gap-2 text-purple-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-white font-semibold mt-2">Emily Rodriguez</p>
              <p className="text-sm text-gray-400">Data Analytics Lead</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center relative">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Book a free consultation to discover how AI automation can benefit your business
          </p>
          <Button 
            onClick={handleBooking}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Schedule Your Free AI Audit
            <ArrowRight className="ml-2 animate-bounce" />
          </Button>
        </div>
      </div>

      {/* Navigation back to card */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors hover:scale-105 inline-block transform">
          ← Back to Digital Card
        </Link>
      </div>
    </div>
  );
};

export default Website;