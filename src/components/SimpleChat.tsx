import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
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
      
      // Add assistant response
      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }]);

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

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white/10 via-white/5 to-purple-500/10 border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(139,92,246,0.37)] overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none before:rounded-lg">
      <div className="flex flex-col h-[600px] relative">
        {/* 3D Glass layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-500/5 to-purple-600/10 pointer-events-none rounded-lg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 transition-all duration-300 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-pink-500/90 text-white backdrop-blur-xl shadow-[0_8px_32px_0_rgba(139,92,246,0.4)] border border-white/20 hover:shadow-[0_12px_48px_0_rgba(139,92,246,0.5)] hover:translate-y-[-2px]"
                    : "bg-white/10 text-white border border-white/30 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:border-white/40 hover:bg-white/15 hover:translate-y-[-2px]"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/10 border border-white/30 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-300" />
                  <span className="text-sm text-purple-200">Se gândește...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-white/20 backdrop-blur-xl bg-white/5 relative z-10">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie mesajul tău aici..."
              className="flex-1 min-h-[60px] max-h-[120px] bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none focus:border-white/50 focus:ring-2 focus:ring-purple-500/30 rounded-xl transition-all duration-300 backdrop-blur-xl shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.2)]"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-pink-500/90 hover:from-purple-600 hover:via-purple-700 hover:to-pink-600 h-[60px] px-6 rounded-xl shadow-[0_8px_32px_0_rgba(139,92,246,0.4)] hover:shadow-[0_12px_48px_0_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0 backdrop-blur-xl border border-white/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-white/60 mt-3 flex items-center gap-1">
            <span className="text-purple-300">💡</span>
            Apasă Enter pentru a trimite, Shift+Enter pentru linie nouă
          </p>
        </form>
      </div>
    </Card>
  );
};
