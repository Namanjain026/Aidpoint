import { useState, useEffect, useContext, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, Search, AlertTriangle, Stethoscope, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { AuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'appointment' | 'medical' | 'emergency' | 'action_buttons';
  data?: any;
}

interface ConversationContext {
  topic: string;
  userIntent: string;
  lastAction: string;
  appointmentData?: any;
  medicalQuery?: string;
}

interface MedicalTopic {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  advice: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  description: string;
  action: () => void;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    topic: 'general',
    userIntent: '',
    lastAction: ''
  });
  
  const { user } = useContext(AuthContext) || {};
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: user 
        ? `Hello ${user.email}! I'm your AidPoint assistant. I can help you with medical questions, book appointments, find doctors, and provide health information. What can I do for you today?`
        : 'Hello! I\'m your AidPoint assistant. I can help you with medical questions, find hospitals, provide health information, and more. Sign in to book appointments and access personalized features. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'action_buttons'
    },
  ]);

  // Medical knowledge base
  const medicalTopics: MedicalTopic[] = [
    {
      id: 'fever',
      name: 'Fever',
      description: 'Body temperature above 100.4°F (38°C)',
      symptoms: ['high temperature', 'chills', 'sweating', 'headache', 'muscle aches'],
      advice: 'Rest, stay hydrated, take fever reducers like acetaminophen. Seek medical attention if fever exceeds 103°F or persists more than 3 days.',
      urgency: 'medium'
    },
    {
      id: 'headache',
      name: 'Headache',
      description: 'Pain in head or neck area',
      symptoms: ['head pain', 'throbbing', 'pressure', 'tension', 'migraine'],
      advice: 'Rest in dark room, stay hydrated, apply cold/warm compress. Over-the-counter pain relievers may help.',
      urgency: 'low'
    },
    {
      id: 'chest_pain',
      name: 'Chest Pain',
      description: 'Pain or discomfort in chest area',
      symptoms: ['chest pain', 'chest pressure', 'shortness of breath', 'radiating pain'],
      advice: 'SEEK IMMEDIATE MEDICAL ATTENTION. Call 911 if experiencing severe chest pain, especially with shortness of breath.',
      urgency: 'emergency'
    },
    {
      id: 'cold_flu',
      name: 'Cold & Flu',
      description: 'Common viral infections',
      symptoms: ['runny nose', 'cough', 'sore throat', 'congestion', 'body aches', 'fatigue'],
      advice: 'Rest, fluids, throat lozenges. Symptoms usually resolve in 7-10 days. See doctor if symptoms worsen or persist.',
      urgency: 'low'
    },
    {
      id: 'stomach_pain',
      name: 'Stomach Pain',
      description: 'Abdominal discomfort or pain',
      symptoms: ['stomach ache', 'abdominal pain', 'nausea', 'cramping', 'bloating'],
      advice: 'Try bland foods, stay hydrated. Avoid spicy foods. Seek medical attention for severe or persistent pain.',
      urgency: 'medium'
    }
  ];

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

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change or typing state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Quick actions
  const quickActions: QuickAction[] = [
    {
      id: 'book_appointment',
      label: 'Book',
      icon: Calendar,
      description: 'Schedule a doctor visit',
      action: () => handleQuickAction('book_appointment')
    },
    {
      id: 'find_doctor',
      label: 'Find Dr.',
      icon: Search,
      description: 'Search for specialists',
      action: () => handleQuickAction('find_doctor')
    },
    {
      id: 'medical_help',
      label: 'Medical',
      icon: Stethoscope,
      description: 'Get health advice',
      action: () => handleQuickAction('medical_help')
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: AlertTriangle,
      description: 'Emergency information',
      action: () => handleQuickAction('emergency')
    },
    {
      id: 'find_hospital',
      label: 'Hospital',
      icon: MapPin,
      description: 'Locate nearby hospitals',
      action: () => handleQuickAction('find_hospital')
    }
  ];

  const handleQuickAction = (actionId: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `${quickActions.find(a => a.id === actionId)?.label}`,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setContext(prev => ({ ...prev, lastAction: actionId, userIntent: actionId }));

    // Handle different actions
    setTimeout(() => {
      let botResponse = '';
      let responseType: Message['type'] = 'text';

      switch (actionId) {
        case 'book_appointment':
          if (!user) {
            botResponse = 'To book an appointment, you need to be signed in. Please log in to your account first. Once logged in, I can help you:\n\n• Find available doctors\n• Check appointment slots\n• Book your preferred time\n• Send confirmation details';
          } else {
            botResponse = 'Great! I\'ll help you book an appointment. What type of doctor or specialist are you looking for?\n\nPopular specialties:\n• General Physician\n• Cardiologist\n• Dermatologist\n• Orthopedic\n• Gynecologist\n• Pediatrician';
            responseType = 'appointment';
          }
          break;

        case 'find_doctor':
          botResponse = 'I can help you find the right doctor! You can search by:\n\n• **Specialty** (e.g., "cardiologist near me")\n• **Condition** (e.g., "doctor for diabetes")\n• **Location** (e.g., "doctors in downtown")\n• **Hospital** (e.g., "doctors at City General")\n\nWhat are you looking for?';
          break;

        case 'medical_help':
          botResponse = 'I can provide general health information and guidance. Please describe your symptoms or health concern, and I\'ll try to help.\n\n**Disclaimer:** This is not a substitute for professional medical advice. For emergencies, call 911 immediately.\n\nWhat would you like to know about?';
          responseType = 'medical';
          break;

        case 'emergency':
          botResponse = '🚨 **Emergency Information**\n\n**Call 911 immediately for:**\n• Chest pain or heart attack symptoms\n• Difficulty breathing\n• Severe injuries or bleeding\n• Loss of consciousness\n• Stroke symptoms\n\n**Nearest Emergency Rooms:**\nI can help you find the closest emergency facilities. Would you like me to locate hospitals near you?';
          responseType = 'emergency';
          break;

        case 'find_hospital':
          botResponse = 'I can help you find hospitals and medical facilities. What are you looking for?\n\n• **Emergency rooms** nearby\n• **Specialty hospitals** (cardiac, cancer, etc.)\n• **Urgent care centers**\n• **Clinics** in your area\n\nYou can also specify your location or let me use your current location.';
          break;

        default:
          botResponse = 'How can I assist you today?';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: responseType
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Enhanced medical analysis
  const analyzeMedicalQuery = (input: string): MedicalTopic | null => {
    const lowercaseInput = input.toLowerCase();
    
    return medicalTopics.find(topic => 
      topic.symptoms.some(symptom => lowercaseInput.includes(symptom.toLowerCase())) ||
      lowercaseInput.includes(topic.name.toLowerCase())
    ) || null;
  };

  // Context-aware response generation
  const generateContextualResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for medical queries first
    const medicalTopic = analyzeMedicalQuery(input);
    if (medicalTopic) {
      let response = `**${medicalTopic.name}**\n\n${medicalTopic.description}\n\n**Advice:** ${medicalTopic.advice}`;
      
      if (medicalTopic.urgency === 'emergency') {
        response += '\n\n🚨 **This may require immediate medical attention. Consider calling 911 or visiting an emergency room.**';
      } else if (medicalTopic.urgency === 'high') {
        response += '\n\n⚠️ **Please consult a healthcare provider soon.**';
      }
      
      response += '\n\n**Disclaimer:** This information is for educational purposes only and not a substitute for professional medical advice.';
      return response;
    }

    // Check for appointment booking context
    if (context.lastAction === 'book_appointment' || lowercaseInput.includes('appointment')) {
      if (lowercaseInput.includes('cancel')) {
        return 'To cancel an appointment:\n\n1. Go to "My Appointments" in your dashboard\n2. Find the appointment you want to cancel\n3. Click "Cancel Appointment"\n4. Please cancel at least 24 hours in advance when possible\n\nWould you like me to help you find your appointments?';
      }
      
      if (!user) {
        return 'To book appointments, please sign in to your account first. Once logged in, I can help you find doctors and schedule appointments.';
      }
      
      return 'I can help you book an appointment! Please tell me:\n\n1. What type of doctor do you need?\n2. Your preferred date/time\n3. Any specific hospital preference\n\nWhat specialty are you looking for?';
    }

    // General FAQ matching
    const matchedFaq = faqs.find(faq => 
      lowercaseInput.includes('insurance') && faq.question.toLowerCase().includes('insurance') ||
      lowercaseInput.includes('book') && faq.question.toLowerCase().includes('book') ||
      lowercaseInput.includes('timing') && faq.question.toLowerCase().includes('timing') ||
      lowercaseInput.includes('hours') && faq.question.toLowerCase().includes('timing') ||
      lowercaseInput.includes('cancel') && faq.question.toLowerCase().includes('cancel') ||
      lowercaseInput.includes('information') && faq.question.toLowerCase().includes('information')
    );

    if (matchedFaq) {
      return matchedFaq.answer;
    }

    // Greeting responses
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
      return user 
        ? `Hello ${user.email}! I'm here to help you with medical questions, appointments, and healthcare information. What can I do for you today?`
        : "Hello! I'm here to help you with healthcare questions, find hospitals, and provide medical information. Sign in to access appointment booking and personalized features. How can I assist you?";
    }

    // Thank you responses
    if (lowercaseInput.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with today? I'm here for medical questions, appointments, or any other healthcare needs.";
    }

    // Default response with suggestions
    return "I'm here to help with your healthcare needs! I can assist with:\n\n• **Medical questions** and symptom information\n• **Booking appointments** with doctors\n• **Finding hospitals** and specialists\n• **Insurance** and billing questions\n• **Emergency information** and guidance\n\nWhat would you like to know about?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Update context based on user input
    const lowercaseInput = inputValue.toLowerCase();
    const medicalTopic = analyzeMedicalQuery(inputValue);
    
    setContext(prev => ({
      ...prev,
      topic: medicalTopic ? 'medical' : 
             lowercaseInput.includes('appointment') ? 'appointment' :
             lowercaseInput.includes('doctor') ? 'doctor_search' : 'general',
      userIntent: lowercaseInput,
      medicalQuery: medicalTopic ? inputValue : prev.medicalQuery
    }));

    // Generate contextual response
    const botResponse = generateContextualResponse(inputValue);

    setTimeout(() => {
      setIsTyping(false);
      const responseType: Message['type'] = 
        medicalTopic ? 'medical' :
        lowercaseInput.includes('appointment') ? 'appointment' :
        lowercaseInput.includes('emergency') ? 'emergency' : 'text';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: responseType
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);

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
                    className={`flex items-start space-x-2 max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                        message.sender === 'user' ? 'bg-primary' : 
                        message.type === 'emergency' ? 'bg-red-500' :
                        message.type === 'medical' ? 'bg-green-500' :
                        message.type === 'appointment' ? 'bg-blue-500' : 'bg-secondary'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3" />
                      ) : message.type === 'emergency' ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : message.type === 'medical' ? (
                        <Stethoscope className="h-3 w-3" />
                      ) : message.type === 'appointment' ? (
                        <Calendar className="h-3 w-3" />
                      ) : (
                        <Bot className="h-3 w-3" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : message.type === 'emergency' 
                          ? 'bg-red-50 text-red-900 border border-red-200'
                          : message.type === 'medical'
                          ? 'bg-green-50 text-green-900 border border-green-200'
                          : message.type === 'appointment'
                          ? 'bg-blue-50 text-blue-900 border border-blue-200'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.text.split('\n').map((line, index) => (
                        <div key={index} className={line.startsWith('**') && line.endsWith('**') ? 'font-semibold' : ''}>
                          {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                          {index < message.text.split('\n').length - 1 && <br />}
                        </div>
                      ))}
                      
                      {/* Quick Action Buttons */}
                      {message.type === 'action_buttons' && message.sender === 'bot' && (
                        <div className="mt-3 space-y-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Quick Actions:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {quickActions.slice(0, 4).map((action) => {
                              const IconComponent = action.icon;
                              return (
                                <Button
                                  key={action.id}
                                  variant="outline"
                                  size="sm"
                                  onClick={action.action}
                                  className="flex items-center justify-center space-x-1 h-auto py-2 px-2 text-xs min-w-0 truncate"
                                >
                                  <IconComponent className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">{action.label}</span>
                                </Button>
                              );
                            })}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => quickActions[4].action()}
                            className="w-full flex items-center justify-center space-x-2 h-auto py-2 px-3 text-xs mt-2"
                          >
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{quickActions[4].label}</span>
                          </Button>
                        </div>
                      )}

                      {/* Medical urgency badges */}
                      {message.type === 'medical' && message.sender === 'bot' && (
                        <div className="mt-2">
                          <Badge variant={
                            message.text.includes('🚨') ? 'destructive' :
                            message.text.includes('⚠️') ? 'secondary' : 'outline'
                          } className="text-xs">
                            {message.text.includes('🚨') ? 'Emergency' :
                             message.text.includes('⚠️') ? 'Urgent' : 'General Info'}
                          </Badge>
                        </div>
                      )}

                      {/* Emergency contact info */}
                      {message.type === 'emergency' && message.sender === 'bot' && (
                        <div className="mt-3 p-2 bg-red-100 rounded border border-red-200">
                          <div className="flex items-center space-x-2 text-red-800">
                            <Phone className="h-4 w-4" />
                            <span className="font-semibold">Emergency: 911</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondary text-white text-xs">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
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