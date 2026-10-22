import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const WebsiteChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chat is first opened
      setMessages([
        {
          role: "assistant",
          content: "Bună! 👋 Sunt asistentul AI al companiei AI Automatizari. Cum te pot ajuta astăzi?",
        },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response from chatbot");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;

        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ne pare rău, am întâmpinat o eroare. Te rog încearcă din nou.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-1 group cursor-pointer"
          aria-label="Open chat"
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-300 via-teal-400 to-cyan-600 flex items-center justify-center border border-cyan-300/50 logo-3d overflow-hidden transition-transform duration-300 group-hover:scale-110">
            <span
              className="relative z-10 text-black font-extrabold text-2xl md:text-3xl"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2), 0 -1px 0 rgba(255,255,255,0.3)' }}
            >
              AI
            </span>
          </div>
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.15em] bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
            AUTOMATIZĂRI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-0 right-0 md:bottom-4 md:right-4 w-full md:w-[380px] h-[100dvh] md:h-[600px] md:rounded-lg flex flex-col bg-[#051535] border-cyan-500/30 shadow-2xl shadow-cyan-500/10 z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-300 via-teal-400 to-cyan-600 flex items-center justify-center border border-cyan-300/50 logo-3d overflow-hidden">
                <span className="relative z-10 text-black font-extrabold text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2), 0 -1px 0 rgba(255,255,255,0.3)' }}>AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm md:text-base">AI Automatizari</h3>
                <p className="text-xs text-cyan-400/60">Asistent AI</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-cyan-400/60 hover:text-cyan-400 h-8 w-8 md:h-10 md:w-10"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3 md:p-4" ref={scrollAreaRef}>
            <div className="space-y-3 md:space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-2.5 md:p-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-black font-medium shadow-lg shadow-cyan-500/20"
                        : "bg-cyan-900/10 text-white border border-cyan-500/20"
                    }`}
                  >
                    <p className="text-sm md:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-lg p-2.5 md:p-3">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-3 md:px-4 pb-2 space-y-2">
              <p className="text-xs text-gray-400">Acțiuni rapide:</p>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                <Button
                  onClick={() => handleQuickAction("Vreau să programez o consultație")}
                  size="sm"
                  variant="outline"
                  className="text-[10px] md:text-xs border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400/80 px-2 md:px-3 h-7 md:h-8"
                >
                  📅 Programează
                </Button>
                <Button
                  onClick={() => handleQuickAction("Ce servicii oferiți?")}
                  size="sm"
                  variant="outline"
                  className="text-[10px] md:text-xs border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400/80 px-2 md:px-3 h-7 md:h-8"
                >
                  🔧 Servicii
                </Button>
                <Button
                  onClick={() => handleQuickAction("Cum mă puteți ajuta cu AI?")}
                  size="sm"
                  variant="outline"
                  className="text-[10px] md:text-xs border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400/80 px-2 md:px-3 h-7 md:h-8"
                >
                  💡 Despre AI
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 md:p-4 border-t border-cyan-500/30 safe-area-bottom">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrie mesajul tău..."
                disabled={isLoading}
                className="bg-cyan-900/10 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 text-sm h-10 md:h-10"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-3d-gold h-10 w-10 md:h-10 md:w-10 p-0 flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};
