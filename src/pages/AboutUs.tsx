import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  console.log("Rendering AboutUs page");

  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg",
    },
    {
      name: "Sarah Johnson",
      role: "Head of AI Development",
      image: "/placeholder.svg",
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      <Navigation />
      
      {/* Company Story Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Our Story
        </h1>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-4">
          <p>
            Founded in 2020, our company emerged from a vision to revolutionize business processes through AI automation. What started as a small team of innovators has grown into a leading force in the automation industry.
          </p>
          <p>
            Today, we continue to push the boundaries of what's possible with AI, helping businesses across the globe transform their operations and achieve unprecedented efficiency.
          </p>
        </div>
      </motion.section>

      {/* Team Members Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-purple-500/20"
                />
                <h3 className="text-xl font-semibold text-center text-purple-400">{member.name}</h3>
                <p className="text-center text-gray-400">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Mission and Values Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-purple-900/10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Our Mission</h3>
              <p className="text-gray-300">
                To empower businesses through intelligent automation solutions that drive growth and innovation.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Our Values</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Innovation First</li>
                <li>• Client Success</li>
                <li>• Continuous Learning</li>
                <li>• Ethical AI</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Company Culture Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Culture</h2>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-6">
          <p className="text-center">
            We foster an environment of creativity, collaboration, and continuous growth. Our team members are encouraged to innovate, take initiative, and contribute to our collective success.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Remote-First</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Flexible Hours</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Learning Budget</p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <p className="font-semibold">Team Events</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Awards Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Awards & Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Innovation Award 2023</h3>
              <p className="text-gray-400">Tech Innovation Summit</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Best AI Solution</h3>
              <p className="text-gray-400">Global Tech Awards 2023</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2F3C]/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">Top Startup 2022</h3>
              <p className="text-gray-400">Enterprise Tech Magazine</p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <Button 
          onClick={() => window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Book a Consultation
        </Button>
      </motion.section>
    </div>
  );
};

export default AboutUs;