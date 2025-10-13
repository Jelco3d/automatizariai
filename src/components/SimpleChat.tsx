import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SimpleContactModal } from "@/components/SimpleContactModal";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Function to format markdown-style text to HTML
const formatMessage = (text: string): string => {
  // Convert **text** to <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export const SimpleChat = () => {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bună! Sunt aici să te ajut să descoperi cum AI poate transforma afacerea ta. Spune-mi mai multe despre ce faci!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll doar când se primește un mesaj nou de la assistant
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        scrollToBottom();
      }
    }
  }, [messages.length]);

  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const N8N_WEBHOOK = "https://n8n.srv1055552.hstgr.cloud/webhook/4365afb5-e39d-4ff0-a9c0-acc1cd5b21ef";
      
      const response = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory: newMessages,
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook error: ${response.status}`);
      }

      const data = await response.json();
      
      // Logging pentru debugging
      console.log("📩 Răspuns complet de la n8n:", data);
      console.log("📊 Tipul răspunsului:", typeof data);
      console.log("🔑 Chei disponibile:", Array.isArray(data) ? "Array" : Object.keys(data));
      console.log("🆔 Session ID:", sessionId);
      
      // Dacă data este un array, ia primul element
      const responseData = Array.isArray(data) ? data[0] : data;
      
      // Extract the response from n8n - suportă multiple formate
      let assistantMessage: string;
      
      if (responseData.response) {
        assistantMessage = responseData.response;
      } else if (responseData.message && responseData.message !== "Workflow was started") {
        assistantMessage = responseData.message;
      } else if (responseData.text) {
        assistantMessage = responseData.text;
      } else if (responseData.output) {
        assistantMessage = responseData.output;
      } else if (responseData.result) {
        assistantMessage = responseData.result;
      } else if (responseData.data) {
        // Dacă există un obiect data, încearcă să extragi conținutul
        assistantMessage = typeof responseData.data === 'string' 
          ? responseData.data 
          : JSON.stringify(responseData.data, null, 2);
      } else {
        // Fallback: afișează tot răspunsul formatat
        console.warn("⚠️ Format de răspuns neașteptat de la n8n");
        assistantMessage = JSON.stringify(responseData, null, 2);
      }
      
      console.log("✅ Mesaj extras:", assistantMessage);
      
      // Curăță mesajul de markeri interni
      const cleanedMessage = assistantMessage.replace(/GENERATE_REPORT_NOW/g, '').trim();
      
      // Add assistant response
      setMessages(prev => [...prev, { role: "assistant", content: cleanedMessage }]);

    } catch (error) {
      console.error("❌ Chat error:", error);
      
      // Mesaj de eroare mai detaliat
      const errorMessage = error instanceof Error ? error.message : "Eroare necunoscută";
      
      toast({
        title: "Eroare de comunicare",
        description: `Nu am putut primi răspuns de la server: ${errorMessage}`,
        variant: "destructive",
      });
      
      // Adaugă un mesaj de eroare în chat pentru transparență
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Scuze, am întâmpinat o problemă tehnică. Te rog încearcă din nou." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await streamChat(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const shouldShowReportButton = (content: string, messageIndex: number) => {
    // Logica existentă - verifică textele specifice
    const hasReportMarkers = content.includes("🎉 Excelent!") && content.includes("Raportul tău va include:");
    
    // Verifică dacă mesajul anterior al utilizatorului a fost "da"
    const previousUserMessage = messages[messageIndex - 1];
    const isPreviousMessageDa = previousUserMessage?.role === "user" && 
      previousUserMessage.content.toLowerCase().trim() === "da";
    
    // Verifică dacă mesajul curent pare să fie un răspuns de confirmare
    const lowerContent = content.toLowerCase();
    const isConfirmationResponse = isPreviousMessageDa && (
      lowerContent.includes("excelent") || 
      lowerContent.includes("genial") || 
      lowerContent.includes("perfect") ||
      lowerContent.includes("raport")
    );
    
    return hasReportMarkers || isConfirmationResponse;
  };

  return (
    <>
      <SimpleContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
      
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-[#1A1F2C]/95 via-[#1A1F2C]/90 to-[#2C1F3C]/95 border-purple-500/20 backdrop-blur-xl shadow-2xl shadow-purple-500/20 overflow-hidden">
        <div className="flex flex-col h-[500px] md:h-[550px] relative">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
          
          {/* Messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div className="flex flex-col gap-2 max-w-[85%] md:max-w-[80%]">
                <div
                  className={`rounded-2xl p-3 md:p-4 transition-all duration-300 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gradient-to-br from-[#2C1F3C]/90 to-[#1A1F2C]/90 text-gray-100 border border-purple-500/30 backdrop-blur-sm shadow-lg shadow-black/20"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div 
                      className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm">{message.content}</p>
                  )}
                </div>
                
                {message.role === "assistant" && shouldShowReportButton(message.content, index) && (
                  <Button
                    onClick={() => setShowContactModal(true)}
                    size="sm"
                    className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30 text-xs md:text-sm"
                  >
                    Obține Auditul
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gradient-to-br from-[#2C1F3C]/90 to-[#1A1F2C]/90 border border-purple-500/30 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin text-purple-400" />
                  <span className="text-xs md:text-sm text-purple-300">Se gândește...</span>
                </div>
              </div>
            </div>
          )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-purple-500/20 backdrop-blur-sm bg-[#1A1F2C]/50 relative z-10">
          <div className="flex gap-2 md:gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie despre afacerea ta..."
              className="flex-1 min-h-[48px] md:min-h-[52px] max-h-[100px] bg-[#2C1F3C]/60 border-purple-500/30 text-white placeholder:text-gray-400/70 resize-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-inner text-xs md:text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 h-[48px] w-[48px] md:h-[52px] md:w-[52px] rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>
          </div>
          <p className="text-[10px] md:text-xs text-gray-400/80 mt-2 hidden md:flex items-center gap-1">
            <span className="text-purple-400">💡</span>
            Apasă Enter pentru a trimite, Shift+Enter pentru linie nouă
          </p>
          </form>
        </div>
      </Card>
    </>
  );
};
