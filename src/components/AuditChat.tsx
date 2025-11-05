import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Loader2, Bot, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationData {
  sessionId: string;
  messages: Message[];
  userAnswers: string[];
}

// Function to format markdown-style text to HTML with sanitization
const formatMessage = (text: string): string => {
  // Convert **text** to <strong>text</strong>
  const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Sanitize HTML to prevent XSS attacks
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['strong', 'em', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
};

const QUESTIONS = [
  "Ce fel de afacere ai?",
  "Ce provocări sau puncte dureroase întâmpini cel mai des în activitatea ta actuală?",
  "Cât timp crezi că petreci tu sau echipa ta cu aceste provocări, într-o săptămână obișnuită?",
  "Care este cel mai important obiectiv al tău pentru afacere în următoarele 3-6 luni?",
  "Ce instrumente sau software folosești în prezent pentru a gestiona aceste aspecte?",
  "Cum crezi că inteligența artificială te-ar putea ajuta să-ți atingi mai repede acest obiectiv?"
];

export const AuditChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    // Welcome message with first question
    setMessages([{
      role: "assistant",
      content: `👋 Bună! Sunt aici să-ți analizez afacerea și să-ți arăt cum AI poate să te ajute să economisești timp și să crești mai rapid. Hai să începem!\n\n**1/6: ${QUESTIONS[0]}**`
    }]);
  }, []);
  const generateSummary = (answers: string[]): string => {
    return `## 📊 Rezumatul conversației tale

**Afacerea ta:**
${answers[0] || 'N/A'}

**Provocări principale:**
${answers[1] || 'N/A'}

**Timp petrecut cu aceste provocări:**
${answers[2] || 'N/A'}

**Obiectiv principal (3-6 luni):**
${answers[3] || 'N/A'}

**Instrumente actuale:**
${answers[4] || 'N/A'}

**Cum poate AI să te ajute:**
${answers[5] || 'N/A'}`;
  };

  const sendDataToWebhook = async () => {
    setIsLoading(true);
    try {
      const conversationData: ConversationData = {
        sessionId,
        messages,
        userAnswers
      };

      const response = await fetch('https://n8n.srv1055552.hstgr.cloud/webhook/efb0c72e-16c3-4b8c-bddf-6089d48d9781', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversationData)
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      toast({
        title: "Success!",
        description: "Datele au fost trimise cu succes. Vei primi auditul în curând!",
      });
    } catch (error) {
      console.error('Error sending data:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la trimiterea datelor. Te rugăm să încerci din nou.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || showSummary) return;
    
    const userMessage = input.trim();
    setInput("");

    // Add user message
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    
    // Save answer
    const newAnswers = [...userAnswers, userMessage];
    setUserAnswers(newAnswers);

    // Check if this was the last question
    if (currentQuestionIndex === 5) {
      // Generate summary
      setIsLoading(true);
      setTimeout(() => {
        const summary = generateSummary(newAnswers);
        setMessages([...newMessages, {
          role: "assistant",
          content: `${summary}\n\n✨ **Am finalizat analiza!** Apasă butonul de mai jos pentru a primi auditul complet gratuit.`
        }]);
        setShowSummary(true);
        setIsLoading(false);
      }, 1000);
    } else {
      // Ask next question
      setIsLoading(true);
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        setMessages([...newMessages, {
          role: "assistant",
          content: `**${nextIndex + 1}/6: ${QUESTIONS[nextIndex]}**`
        }]);
        setCurrentQuestionIndex(nextIndex);
        setIsLoading(false);
      }, 800);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Messages */}
      {messages.length > 0 && (
        <Card className="bg-[#1A1F2C]/80 border-purple-500/30 backdrop-blur-sm overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                      : "bg-[#2C1F3C]/60 text-gray-200 border border-purple-500/20"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div
                      className="whitespace-pre-wrap text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(message.content),
                      }}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap text-base">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-[#2C1F3C]/60 rounded-2xl px-4 py-3 border border-purple-500/20">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                </div>
              </div>
            )}

            {showSummary && !isLoading && (
              <div className="flex flex-col gap-3 items-center animate-fade-in py-4">
                <Button
                  onClick={sendDataToWebhook}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl text-white px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Obține Auditul Gratuit
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit}>
        <div className="bg-[#2C2D2E] p-4 shadow-2xl rounded-sm">
          <div className="mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={showSummary ? "Apasă butonul de mai sus pentru audit" : "Scrie despre afacerea ta..."}
              disabled={isLoading || showSummary}
              className="w-full bg-transparent text-white text-lg placeholder:text-gray-400 outline-none rounded-sm"
            />
          </div>

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={!input.trim() || isLoading || showSummary}
              size="icon"
              className="h-10 w-10 rounded-full bg-white hover:bg-gray-100 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};