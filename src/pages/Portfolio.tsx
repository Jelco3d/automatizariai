import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, DollarSign, LineChart, Zap } from "lucide-react";

const Portfolio = () => {
  console.log("Rendering Portfolio page");

  const caseStudies = [
    {
      client: "TechCorp Solutions",
      industry: "Manufacturing",
      challenge: "Manual data processing taking 40+ hours weekly",
      solution: "Implemented AI-powered document processing",
      results: {
        timeReduction: "85%",
        costSaving: "$120,000 annually",
        roi: "380%",
        timeline: "3 months"
      },
      beforeAfter: {
        before: "Manual data entry, high error rates",
        after: "Automated processing, 99.9% accuracy"
      }
    },
    {
      client: "Global Logistics Inc",
      industry: "Transportation",
      challenge: "Inefficient route planning and scheduling",
      solution: "AI route optimization system",
      results: {
        timeReduction: "60%",
        costSaving: "$250,000 annually",
        roi: "450%",
        timeline: "4 months"
      },
      beforeAfter: {
        before: "Manual route planning, fuel wastage",
        after: "Optimized routes, 40% fuel savings"
      }
    },
    {
      client: "FinTech Innovations",
      industry: "Financial Services",
      challenge: "Customer support backlog of 72+ hours",
      solution: "AI chatbot and ticket automation",
      results: {
        timeReduction: "90%",
        costSaving: "$180,000 annually",
        roi: "320%",
        timeline: "2 months"
      },
      beforeAfter: {
        before: "72-hour response time",
        after: "Instant responses, 95% satisfaction"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Success Stories
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Discover how our AI automation solutions have transformed businesses and delivered measurable results.
        </p>
      </motion.section>

      {/* Case Studies Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">{study.client}</h3>
                <p className="text-gray-400 mb-4">{study.industry}</p>
                
                <div className="space-y-6">
                  {/* Challenge & Solution */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Challenge:</h4>
                    <p className="text-gray-300">{study.challenge}</p>
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-white">Solution:</h4>
                    <p className="text-gray-300">{study.solution}</p>
                  </div>

                  {/* Before/After */}
                  <div className="grid grid-cols-2 gap-4 bg-purple-500/5 p-4 rounded-lg text-white">
                    <div>
                      <h5 className="font-semibold text-purple-400 mb-2">Before</h5>
                      <p className="text-sm text-gray-300">{study.beforeAfter.before}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-400 mb-2">After</h5>
                      <p className="text-sm text-gray-300">{study.beforeAfter.after}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Time Saved</p>
                        <p className="font-semibold">{study.results.timeReduction}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Cost Savings</p>
                        <p className="font-semibold">{study.results.costSaving}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <LineChart className="text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">ROI</p>
                        <p className="font-semibold">{study.results.roi}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Timeline</p>
                        <p className="font-semibold">{study.results.timeline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <Button
          onClick={() => window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Book a Consultation
          <ArrowRight className="ml-2" />
        </Button>
      </motion.section>
    </div>
  );
};

export default Portfolio;