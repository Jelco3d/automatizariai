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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bună! Sunt aici să te ajut să descoperi cum AI poate transforma afacerea ta. Spune-mi mai multe despre ce faci!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll doar când se primește un mesaj nou, nu la fiecare render
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // Scroll doar pentru mesaje de la assistant sau când loading-ul se termină
      if (lastMessage.role === "assistant" || !isLoading) {
        scrollToBottom();
      }
    }
  }, [messages.length, isLoading]);

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
          conversationHistory: newMessages
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
    <Card className="w-full max-w-4xl mx-auto bg-[#1A1F2C]/90 border-purple-500/30 backdrop-blur-sm shadow-lg shadow-purple-500/10">
      <div className="flex flex-col h-[600px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-[#2C1F3C]/80 text-gray-100 border border-purple-500/20"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#2C1F3C]/80 border border-purple-500/20 rounded-lg p-4">
                <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-purple-500/20">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie mesajul tău aici..."
              className="flex-1 min-h-[60px] max-h-[120px] bg-[#2C1F3C]/50 border-purple-500/30 text-white placeholder:text-gray-400 resize-none focus:border-purple-500/50"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-[60px] px-6"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Apasă Enter pentru a trimite, Shift+Enter pentru linie nouă
          </p>
        </form>
      </div>
    </Card>
  );
};
