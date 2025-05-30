
import { useState, useRef, useEffect } from 'react';
import { useOpenAi, ChatMessage, setOpenAiApiKey } from '@/utils/openAiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, MessageCircle, Send, Bot, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Bună ziua! Sunt asistentul virtual AI Automatizari. Cum vă pot ajuta astăzi cu soluții de automatizare AI pentru afacerea dvs.?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { callOpenAi, isLoading, error } = useOpenAi();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank');
  };

  const handleUpdateApiKey = () => {
    if (apiKeyInput.trim()) {
      setOpenAiApiKey(apiKeyInput.trim());
      setShowApiKeyInput(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'API key updated successfully. How can I help you today?'
      }]);
    }
  };

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Get AI response
    const newMessages = [...messages, userMessage];
    const response = await callOpenAi(newMessages);
    
    // Add AI response
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 text-white",
            isOpen && "bg-red-500 hover:bg-red-600"
          )}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-5 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-purple-300 dark:border-purple-800 w-80 md:w-96 h-[500px] max-h-[calc(100vh-150px)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-medium">AI Automatizari Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)} 
                  className="text-xs text-white/70 hover:text-white"
                >
                  {showApiKeyInput ? 'Hide API' : 'API Key'}
                </button>
                <X 
                  className="cursor-pointer hover:text-gray-200 transition-colors" 
                  size={18} 
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>

            {/* API Key Input */}
            <AnimatePresence>
              {showApiKeyInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-4 space-y-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Enter your OpenAI API key to connect the chatbot:
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        type="password"
                        value={apiKeyInput} 
                        onChange={e => setApiKeyInput(e.target.value)}
                        placeholder="sk-..." 
                        className="text-xs"
                      />
                      <Button size="sm" onClick={handleUpdateApiKey}>Apply</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-full",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      msg.role === "user"
                        ? "bg-purple-100 dark:bg-purple-900 ml-auto"
                        : "bg-gray-100 dark:bg-gray-800"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {error && (
                <Alert variant="destructive" className="text-xs">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="break-words">
                    {error}
                    {error.includes('API key') && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => setShowApiKeyInput(true)}
                      >
                        Update API Key
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Book appointment button */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <Button 
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Programează o Consultație Gratuită
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>

            {/* Input */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Scrieți un mesaj..."
                  className="pr-10"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 disabled:text-gray-300 disabled:hover:text-gray-300"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
