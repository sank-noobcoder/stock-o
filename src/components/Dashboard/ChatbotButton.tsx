
import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatbotButton = () => {
  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
      size="icon"
      aria-label="Open chatbot"
    >
      <MessageSquareText className="h-6 w-6" />
    </Button>
  );
};

export default ChatbotButton;
