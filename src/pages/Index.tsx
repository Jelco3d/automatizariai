import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ArrowRight, CheckCircle2, Clock, DollarSign, Zap } from "lucide-react";

const Index = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-lg font-semibold" href="/">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-lg" href="#about">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="font-medium">AI Automation</div>
                    <div className="font-medium">Lead Generation</div>
                    <div className="font-medium">Workflow Optimization</div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-lg" href="#testimonials">
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-lg" href="#contact">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Unlock Productivity with AI Automation</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Save time, reduce costs, and grow your business through tailored AI solutions.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Book a Free AI Audit Today <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-gray-600 mb-8">
              Hi, I'm an automation expert passionate about helping businesses achieve efficiency and productivity. 
              I specialize in identifying repetitive tasks and implementing AI-driven systems that deliver results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Clock className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Save 10+ Hours Weekly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Automate repetitive tasks and free up valuable time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Cut Operational Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Reduce expenses through efficient automation</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle>Streamline Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Optimize processes for maximum efficiency</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How I Can Help You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "AI Audit",
                description: "I analyze where your business wastes time and resources.",
              },
              {
                title: "Custom Automation Plan",
                description: "Tailored strategies to streamline workflows.",
              },
              {
                title: "Full Implementation",
                description: "Build AI-powered systems (e.g., lead generation, invoice automation, scheduling).",
              },
              {
                title: "Support & Training",
                description: "Ongoing optimization and team education.",
              },
            ].map((service) => (
              <Card key={service.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Automate Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your free consultation now and take the first step toward a smarter, automated workflow.
          </p>
          <Button size="lg" variant="secondary">
            Book a Call Now <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;