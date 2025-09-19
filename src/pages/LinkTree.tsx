import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Mail, Phone, User, Briefcase, Search, ArrowRight } from "lucide-react";
import jelcoProfile from '@/assets/jelco-profile.jpg';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 max-w-md mx-auto py-8 px-4">
        {/* Profile Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30"></div>
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-slate-700/50 shadow-2xl">
              <img 
                src={jelcoProfile} 
                alt="Jelco - Founder" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Jelco</h1>
          <h2 className="text-2xl font-semibold text-blue-300 mb-3">AI Automatizări</h2>
          <p className="text-slate-400 text-lg font-light">Premium Digital Solutions & Automation</p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4 mb-12">
          {links.map((link, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Card className="relative backdrop-blur-xl bg-slate-900/60 border border-slate-700/50 hover:border-slate-600/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <a
                      href={link.url.startsWith('/') ? link.url : link.url}
                      className="flex items-center p-6 group/link"
                      target={link.url.startsWith('http') ? '_blank' : '_self'}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl flex items-center justify-center group-hover/link:from-blue-600/20 group-hover/link:to-purple-600/20 transition-all duration-300 mr-4">
                        <div className="text-slate-400 group-hover/link:text-blue-400 transition-colors">
                          {link.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-white group-hover/link:text-blue-300 transition-colors mb-1">
                          {link.title}
                        </h3>
                        <p className="text-sm text-slate-400 font-light">{link.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover/link:text-purple-400 group-hover/link:translate-x-1 transition-all duration-300" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-3xl blur-xl"></div>
            <Card className="relative backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-2xl text-white mb-2">Contact Direct</h3>
                  <p className="text-slate-400 font-light">Conectare instantanee pentru proiecte premium</p>
                </div>
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group/contact"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-xl flex items-center justify-center group-hover/contact:from-blue-600/20 group-hover/contact:to-purple-600/20 transition-all duration-300 mr-4">
                        <div className="text-slate-400 group-hover/contact:text-blue-400 transition-colors">
                          {contact.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-1">{contact.label}</p>
                        <p className="text-lg font-medium text-white group-hover/contact:text-blue-300 transition-colors font-mono">
                          {contact.value}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover/contact:text-purple-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-slate-700/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">PREMIUM DIGITAL SERVICES</p>
          </div>
          <p className="text-xs text-slate-500 mt-4 font-light">
            © 2024 Jelco • AI Automatizări. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;