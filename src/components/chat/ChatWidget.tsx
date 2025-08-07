import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Send, X, Minimize2, Car } from "lucide-react";
import { MessageRenderer } from "./MessageRenderer";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatId] = useState(() => `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [vinNumber, setVinNumber] = useState("");
  const [showVinInput, setShowVinInput] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Salut! Sunt asistentul virtual al StockAuto.ro. Cum te pot ajuta astăzi cu piese auto?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      // Send message to n8n webhook
      const response = await fetch('https://ejelco8.app.n8n.cloud/webhook-test/a2020483-44a2-4eff-9bfd-b6b73e42fc54', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          message: currentMessage,
          chat_messages: [...messages, newMessage],
          vin_car: vinNumber || null,
          timestamp: new Date().toISOString(),
          user: 'website-visitor'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON or plain text
      const contentType = response.headers.get('content-type');
      let responseText: string;
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        responseText = data.response || data.message || 'Am primit mesajul tău și îl procesez.';
      } else {
        // Handle plain text response
        responseText = await response.text();
      }
      
      // Add n8n response to messages
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message to n8n:', error);
      
      // Add error message
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Ne pare rău, a apărut o eroare în procesarea mesajului. Te rog încearcă din nou.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <img 
            src="/lovable-uploads/9e4a46e2-d243-4d05-93aa-19c19276ddda.png" 
            alt="StockAuto.ro" 
            className="w-8 h-8 object-contain"
          />
          {/* Green live indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
            <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 bg-[#1A1F2C]/95 backdrop-blur-xl border-blue-500/50 shadow-2xl transition-all duration-300 ${
        isMinimized ? "h-14" : "h-[500px]"
      }`}>
        <CardHeader className="p-4 border-b border-blue-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img 
                  src="/lovable-uploads/9e4a46e2-d243-4d05-93aa-19c19276ddda.png" 
                  alt="StockAuto.ro" 
                  className="w-8 h-8 object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">StockAuto.ro</h3>
                <p className="text-xs text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVinInput(!showVinInput)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
                title="Adaugă VIN"
              >
                <Car className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 h-64 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white"
                          : "bg-gray-700/80 text-gray-100"
                      }`}
                    >
                      <MessageRenderer text={message.text} isUser={message.isUser} />
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="p-4 border-t border-blue-500/30">
              {showVinInput && (
                <div className="mb-3">
                  <Input
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value)}
                    placeholder="Introdu codul VIN (opțional)"
                    className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">VIN-ul va fi inclus în toate mesajele pentru identificarea mașinii</p>
                </div>
              )}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isLoading ? "Se trimite..." : "Scrie un mesaj..."}
                  disabled={isLoading}
                  className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 disabled:opacity-50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-3 disabled:opacity-50"
                >
                  {isLoading ? "..." : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};