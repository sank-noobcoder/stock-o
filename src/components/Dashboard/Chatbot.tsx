
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bot, User, Send, Loader2, Share2, Info, Lightbulb } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m StockOracle AI. I can help you with stock information, investment basics, or answer questions about our platform. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on recent market trends, tech stocks are showing strong momentum. Have you considered diversifying your portfolio?",
        "That's a great question! The S&P 500 index is a collection of 500 large-cap U.S. stocks, used as a benchmark for the overall market performance.",
        "For beginners, I'd recommend starting with index funds or ETFs as they provide instant diversification with lower risk.",
        "When analyzing a stock, focus on fundamentals like P/E ratio, earnings growth, revenue trends, and competitive advantages.",
        "Our prediction algorithm uses machine learning models trained on historical price data, fundamental analysis, technical indicators, and sentiment analysis from news and social media.",
        "Remember, past performance is not indicative of future results. Always do your own research before investing."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: crypto.randomUUID(),
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const predefinedQuestions = [
    "How do I start investing?",
    "What stocks are trending today?",
    "How do you generate predictions?",
    "What's your advice for beginners?",
    "What is a P/E ratio?"
  ];

  return (
    <Card className="glass-card flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          StockOracle Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 h-[400px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl py-2 px-3 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.type === 'bot' ? (
                  <Bot className="h-4 w-4 mr-1" />
                ) : (
                  <User className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl py-2 px-3 bg-muted text-foreground">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-1" />
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      
      <div className="px-4 py-2 bg-muted/20 rounded-md mx-4 mb-2">
        <div className="flex items-center">
          <Lightbulb className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Try asking about specific stocks, investment strategies, or market trends!
          </p>
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {predefinedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setInputValue(question);
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
      
      <CardFooter className="pt-0">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chatbot;
