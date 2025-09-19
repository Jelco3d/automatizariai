import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Mail, Phone, User, Briefcase, Search, ArrowRight } from "lucide-react";
import jelcoProfile from '@/assets/jelco-profile.jpg';

const LinkTree = () => {
  const links = [{
    title: "Website Principal",
    description: "Soluții de automatizare și dezvoltare web",
    url: "/",
    icon: <Globe className="w-5 h-5" />
  }, {
    title: "Servicii",
    description: "Vedeți toate serviciile noastre",
    url: "/services",
    icon: <Briefcase className="w-5 h-5" />
  }, {
    title: "Portofoliu",
    description: "Proiecte realizate și case studies",
    url: "/portfolio",
    icon: <Search className="w-5 h-5" />
  }, {
    title: "Contact Direct",
    description: "Contactați-mă pentru consultanță",
    url: "/contact",
    icon: <Mail className="w-5 h-5" />
  }];
  
  const contactInfo = [{
    label: "Telefon",
    value: "+40754274528",
    href: "tel:+40754274528",
    icon: <Phone className="w-4 h-4" />
  }, {
    label: "Email",
    value: "contact@aiautomatizari.ro",
    href: "mailto:contact@aiautomatizari.ro",
    icon: <Mail className="w-4 h-4" />
  }];
  
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
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
              <img src={jelcoProfile} alt="Jelco - Founder" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Jelco</h1>
          <h2 className="text-2xl font-semibold text-blue-300 mb-3">AI Automatizări</h2>
          <p className="text-slate-400 text-lg font-light">High Ticket  Automation</p>
          
          {/* Social Media Icons */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 hover:bg-blue-600/20 rounded-xl flex items-center justify-center transition-all duration-300 group border border-slate-700/30 hover:border-blue-500/30">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 hover:bg-pink-600/20 rounded-xl flex items-center justify-center transition-all duration-300 group border border-slate-700/30 hover:border-pink-500/30">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.458 0 4.468 2.01 4.468 4.468s-2.01 4.468-4.468 4.468zm7.519 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.458 0 4.468 2.01 4.468 4.468s-2.01 4.468-4.468 4.468z"/>
                <path d="M12 7.978c-2.209 0-4.022 1.813-4.022 4.022S9.791 16.022 12 16.022s4.022-1.813 4.022-4.022S14.209 7.978 12 7.978zm0 6.616c-1.431 0-2.594-1.163-2.594-2.594S10.569 9.406 12 9.406s2.594 1.163 2.594 2.594-1.163 2.594-2.594 2.594z"/>
                <circle cx="16.109" cy="7.891" r="1.1"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 hover:bg-red-600/20 rounded-xl flex items-center justify-center transition-all duration-300 group border border-slate-700/30 hover:border-red-500/30">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 hover:bg-red-600/20 rounded-xl flex items-center justify-center transition-all duration-300 group border border-slate-700/30 hover:border-red-500/30">
              <svg className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          
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
          {links.map((link, index) => <div key={index} className="animate-fade-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Card className="relative backdrop-blur-xl bg-slate-900/60 border border-slate-700/50 hover:border-slate-600/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <a href={link.url.startsWith('/') ? link.url : link.url} className="flex items-center p-4 group/link" target={link.url.startsWith('http') ? '_blank' : '_self'} rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}>
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
            </div>)}
        </div>

        {/* Contact Information */}
        <div className="animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-3xl blur-xl"></div>
            <Card className="relative backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-3xl shadow-2xl">
              <CardContent className="p-8 py-0">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-2xl text-white mb-2">Contact Direct</h3>
                  <p className="text-slate-400 font-light">Conectare instantanee pentru proiecte premium</p>
                </div>
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => <a key={index} href={contact.href} className="flex items-center p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group/contact py-[22px]">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-xl flex items-center justify-center group-hover/contact:from-blue-600/20 group-hover/contact:to-purple-600/20 transition-all duration-300 mr-4">
                        <div className="text-slate-400 group-hover/contact:text-blue-400 transition-colors">
                          {contact.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-1">{contact.label}</p>
                        <p className="text-sm font-medium text-white group-hover/contact:text-blue-300 transition-colors font-mono">
                          {contact.value}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover/contact:text-purple-400 transition-colors" />
                    </a>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="text-center mt-12 animate-fade-in" style={{
        animationDelay: '0.6s'
      }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-slate-700/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">PREMIUM DIGITAL SERVICES</p>
          </div>
          <p className="text-xs text-slate-500 mt-4 font-light">
            © 2024 Jelco • AI Automatizări. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </div>;
};
export default LinkTree;