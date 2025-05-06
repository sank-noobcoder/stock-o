
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatbotFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Hi there! I'm your AI financial assistant. How can I help you today?", isUser: false},
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages([...messages, {text: inputMessage, isUser: true}]);
    
    // Clear input
    setInputMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      let response = "Thanks for your message! I'm analyzing your query and will provide financial insights shortly.";
      
      if (inputMessage.toLowerCase().includes('stock')) {
        response = "I can help with stock information. Which specific stocks are you interested in?";
      } else if (inputMessage.toLowerCase().includes('learn') || inputMessage.toLowerCase().includes('tutorial')) {
        response = "We have various learning materials available. Would you like to learn about technical analysis, fundamental analysis, or investment basics?";
      } else if (inputMessage.toLowerCase().includes('predict')) {
        response = "Our prediction tools use AI to forecast potential price movements. You can set different timeframes and trading types for more accurate predictions.";
      }
      
      setMessages(prev => [...prev, {text: response, isUser: false}]);
    }, 1000);
  };

  return (
    <>
      <Button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg p-0 flex items-center justify-center z-50"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl border-primary/20 glass-card z-50">
          <CardHeader className="bg-primary/10 pb-4">
            <CardTitle className="text-lg flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/20">AI</AvatarFallback>
              </Avatar>
              AI Financial Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 max-h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ChatbotFloatingButton;
