import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Mail, Phone, User, Briefcase, Search } from "lucide-react";

const LinkTree = () => {
  const links = [
    {
      title: "Website Principal",
      description: "Soluții de automatizare și dezvoltare web",
      url: "/",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Servicii",
      description: "Vedeți toate serviciile noastre",
      url: "/services",
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      title: "Portofoliu",
      description: "Proiecte realizate și case studies",
      url: "/portfolio",
      icon: <Search className="w-5 h-5" />
    },
    {
      title: "Contact Direct",
      description: "Contactați-mă pentru consultanță",
      url: "/contact",
      icon: <Mail className="w-5 h-5" />
    }
  ];

  const contactInfo = [
    {
      label: "Telefon",
      value: "+40754274528",
      href: "tel:+40754274528",
      icon: <Phone className="w-4 h-4" />
    },
    {
      label: "Email",
      value: "contact@aiautomatizari.ro", 
      href: "mailto:contact@aiautomatizari.ro",
      icon: <Mail className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-md mx-auto py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">AI Automatizări</h1>
          <p className="text-muted-foreground">Automatizare & Dezvoltare Web</p>
        </div>

        {/* Links Section */}
        <div className="space-y-4 mb-8">
          {links.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <a
                  href={link.url.startsWith('/') ? link.url : link.url}
                  className="flex items-center gap-4 group"
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 text-center">Contact Direct</h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors group"
                >
                  <div className="p-1 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{contact.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2024 AI Automatizări. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;