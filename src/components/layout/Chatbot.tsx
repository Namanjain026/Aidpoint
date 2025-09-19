import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AidPoint assistant. I can help you with information about hospitals, insurance, appointments, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const faqs = [
    {
      question: 'What insurance do you accept?',
      answer: 'Our partner hospitals accept various insurance plans including Blue Cross, Aetna, Medicare, Medicaid, Humana, Cigna, and United Healthcare. You can filter hospitals by accepted insurance on our search page.',
    },
    {
      question: 'How do I book an appointment?',
      answer: 'To book an appointment: 1) Search for doctors by specialization or hospital, 2) Select a doctor and view their profile, 3) Click "Book Appointment" and fill in your details, 4) Choose your preferred date and time. You\'ll need to create an account first.',
    },
    {
      question: 'What are hospital timings?',
      answer: 'Most hospitals operate 24/7 for emergencies. Regular consultation hours are typically 9 AM to 6 PM. Specific doctor availability varies - you can check individual doctor schedules on their profile pages.',
    },
    {
      question: 'How can I cancel my appointment?',
      answer: 'You can cancel appointments from your "My Appointments" page. Click on the appointment and select "Cancel" from the options menu. Please cancel at least 24 hours in advance when possible.',
    },
    {
      question: 'What information do I need for booking?',
      answer: 'For booking appointments, you\'ll need: your full name, phone number, email address, preferred date and time, and a brief description of your concern or reason for the visit.',
    },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple FAQ matching
    const lowercaseInput = inputValue.toLowerCase();
    let botResponse = "I'm sorry, I didn't understand that. Here are some topics I can help with:\n\n• Insurance and billing questions\n• How to book appointments\n• Hospital hours and availability\n• Appointment cancellation\n• General healthcare information\n\nTry asking about any of these topics!";

    const matchedFaq = faqs.find(faq => 
      lowercaseInput.includes('insurance') && faq.question.toLowerCase().includes('insurance') ||
      lowercaseInput.includes('book') && faq.question.toLowerCase().includes('book') ||
      lowercaseInput.includes('appointment') && faq.question.toLowerCase().includes('appointment') ||
      lowercaseInput.includes('timing') && faq.question.toLowerCase().includes('timing') ||
      lowercaseInput.includes('hours') && faq.question.toLowerCase().includes('timing') ||
      lowercaseInput.includes('cancel') && faq.question.toLowerCase().includes('cancel') ||
      lowercaseInput.includes('information') && faq.question.toLowerCase().includes('information')
    );

    if (matchedFaq) {
      botResponse = matchedFaq.answer;
    } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      botResponse = "Hello! I'm here to help you with any questions about AidPoint. You can ask me about booking appointments, insurance, hospital information, or any other healthcare-related queries.";
    } else if (lowercaseInput.includes('thank')) {
      botResponse = "You're welcome! Is there anything else I can help you with today?";
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-strong z-40 transition-all hover:scale-110 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <Card
        className={`fixed bottom-6 right-6 w-96 h-[500px] shadow-strong z-50 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-4 pointer-events-none'
        }`}
      >
        <CardHeader className="pb-3 bg-gradient-hero text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">AidPoint Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-blue-100">
            Online • Usually replies instantly
          </p>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(500px-140px)]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                        message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3" />
                      ) : (
                        <Bot className="h-3 w-3" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.text.split('\n').map((line, index) => (
                        <div key={index}>
                          {line}
                          {index < message.text.split('\n').length - 1 && <br />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ask about insurance, appointments, hospital hours, and more!
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Chatbot;