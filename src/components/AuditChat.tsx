import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Loader2, Bot, User, Plus, Mic, Globe, Zap, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactModal } from "./ContactModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Function to format markdown-style text to HTML
const formatMessage = (text: string): string => {
  // Convert **text** to <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};
export const AuditChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportButton, setShowReportButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    // Welcome message
    setMessages([{
      role: "assistant",
      content: "👋 Bună! Sunt aici să-ți analizez afacerea și să-ți arăt cum AI poate să te ajute să economisești timp și să crești mai rapid. Hai să începem! Ce fel de afacere ai?"
    }]);
  }, []);
  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, {
      role: "user" as const,
      content: userMessage
    }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-audit-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: newMessages,
          sessionId
        })
      });
      if (!response.ok || !response.body) {
        if (response.status === 429) {
          toast({
            title: "Prea multe cereri",
            description: "Te rugăm să încerci din nou peste câteva momente.",
            variant: "destructive"
          });
          setMessages(newMessages);
          return;
        }
        throw new Error("Failed to start stream");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantMessage = "";

      // Add empty assistant message that we'll update
      setMessages([...newMessages, {
        role: "assistant",
        content: ""
      }]);

      let fullAssistantMessage = "";
      while (!streamDone) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, {
          stream: true
        });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantMessage += content;
              fullAssistantMessage += content;
              setMessages([...newMessages, {
                role: "assistant",
                content: assistantMessage
              }]);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantMessage += content;
              fullAssistantMessage += content;
              setMessages([...newMessages, {
                role: "assistant",
                content: assistantMessage
              }]);
            }
          } catch {
            /* ignore */
          }
        }
      }

      // Check if AI is asking for report confirmation
      const lowerContent = fullAssistantMessage.toLowerCase();
      if (
        (lowerContent.includes('raport') && lowerContent.includes('email')) ||
        lowerContent.includes('îți trimit raportul') || 
        lowerContent.includes('iti trimit raportul')
      ) {
        setShowReportButton(true);
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare. Te rugăm să încerci din nou.",
        variant: "destructive"
      });
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return <>
    <ContactModal 
      isOpen={showContactModal}
      onClose={() => setShowContactModal(false)}
      sessionId={sessionId}
    />
    
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Messages */}
      {messages.length > 1 && <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" : "bg-[#2C1F3C]/60 text-gray-200 border border-purple-500/20"}`}>
                  {message.role === "assistant" ? (
                    <div 
                      className="whitespace-pre-wrap text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap text-base">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>}
              </div>)}
            {isLoading && <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-[#2C1F3C]/60 rounded-2xl px-4 py-3 border border-purple-500/20">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                </div>
              </div>}

            {showReportButton && !isLoading && (
              <div className="flex justify-center animate-fade-in py-4">
                <Button
                  onClick={() => setShowContactModal(true)}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-white px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Da, vreau raportul complet! 📊
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>}

      {/* Input - Lovable Style */}
      <form onSubmit={handleSubmit}>
        <div className="bg-[#2C2D2E] rounded-[32px] p-4 shadow-2xl">
          <div className="mb-3">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Scrie despre afacerea ta..." className="w-full bg-transparent text-white text-lg placeholder:text-gray-400 outline-none" disabled={isLoading} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              
              
              
              
              
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-gray-700/50 text-gray-400">
                <Mic className="w-5 h-5" />
              </Button>
              
              <Button type="submit" disabled={!input.trim() || isLoading} size="icon" className="h-10 w-10 rounded-full bg-white hover:bg-gray-100 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </>;
};