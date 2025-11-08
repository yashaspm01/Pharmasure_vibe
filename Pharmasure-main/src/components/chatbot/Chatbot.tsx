
'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatWithBot, type ChatMessage } from '@/ai/flows/chatbot';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useUser } from '@/firebase';

const initialMessages: ChatMessage[] = [
  {
    role: 'model',
    content: "Hello! I'm your friendly PharmaSure Assistant. How can I help you today? You can ask me about your medications, reminders, or any app features."
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    // Reset chat if user is closing the window
    if (!newIsOpen) {
      setTimeout(() => {
        setMessages(initialMessages);
        setIsLoading(false);
        setInput('');
      }, 300); // Delay reset until after close animation
    }
  };

  const handleNewChat = () => {
    setMessages(initialMessages);
    setIsLoading(false);
    setInput('');
    scrollToBottom();
  }

  const scrollToBottom = () => {
    setTimeout(() => {
        if(scrollAreaRef.current) {
            const scrollableView = scrollAreaRef.current.querySelector('div');
            if (scrollableView) {
                scrollableView.scrollTop = scrollableView.scrollHeight;
            }
        }
    }, 100);
  };
  

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    scrollToBottom();
    
    try {
        const botResponse = await chatWithBot(newMessages);
        setMessages(prev => [...prev, botResponse]);
    } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
        scrollToBottom();
    }
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  return (
    <>
      <div className={cn("fixed bottom-24 right-4 z-50 transition-transform duration-300 ease-in-out", 
        isOpen ? 'translate-x-24 opacity-0' : 'translate-x-0 opacity-100')}>
        <Button
          onClick={handleToggle}
          className="rounded-full w-16 h-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          <Bot className="w-8 h-8" />
        </Button>
      </div>

      <Card className={cn(
        "fixed bottom-0 right-0 z-50 m-4 w-[calc(100%-2rem)] max-w-sm h-[70vh] flex flex-col transition-transform duration-300 ease-in-out shadow-2xl",
        isOpen ? "translate-y-0" : "translate-y-[calc(100%+1rem)]"
      )}>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className='flex items-center gap-3'>
            <Bot className='text-primary'/>
            <CardTitle className="text-lg">PharmaSure Assistant</CardTitle>
          </div>
          <div className='flex items-center'>
            <Button variant="ghost" size="icon" onClick={handleNewChat} className='rounded-full'>
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleToggle} className='rounded-full'>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {message.role === 'model' && (
                    <Avatar className='w-8 h-8 border-2 border-primary/50'>
                        <AvatarFallback className='bg-primary/20 text-primary'><Bot className='w-5 h-5'/></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("p-3 rounded-lg max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && isClient && (
                     <Avatar className='w-8 h-8 border-2 border-muted'>
                        {user?.photoURL ? <AvatarImage src={user.photoURL} /> : null}
                        <AvatarFallback>{user?.firstName?.charAt(0) || <User />}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                    <Avatar className='w-8 h-8 border-2 border-primary/50'>
                        <AvatarFallback className='bg-primary/20 text-primary'><Bot className='w-5 h-5'/></AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-lg bg-secondary">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0"></span>
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
                            <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300"></span>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your health..."
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
