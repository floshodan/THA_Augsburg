import { useState, useRef, useEffect } from 'react';
import { useOnboardingStore } from '../store/onboardingStore';
import ApiService from '../services/ApiService';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface InterviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  review?: string;
}

export default function InterviewDialog({ isOpen, onClose, review = "" }: InterviewDialogProps) {
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: "Hallo! Ich bin Ihr Interviewer. Lassen Sie uns mit dem Interview beginnen. Bitte stellen Sie sich kurz vor.",
    isBot: true,
    timestamp: new Date()
  }]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialMessageSent = useRef(false);
  const { data: onboardingData } = useOnboardingStore();

  const resetChat = async () => {
    // Reset messages to initial greeting
    setMessages([{
      id: Date.now(),
      text: "Hallo! Ich bin Ihr Interviewer. Lassen Sie uns mit dem Interview beginnen. Bitte stellen Sie sich kurz vor.",
      isBot: true,
      timestamp: new Date()
    }]);

    try {
      // Reset the interview session
      await ApiService.resetInterviewDialog(1);
      
      // Send initial "Hei!" message again
      const response = await ApiService.sendInterviewDialogMessage({
        sessionId: 1,
        message: "Hei!",
        mode: "interview",
        review: review
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response.response || response.output || 'No response received',
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    try {
      const response = await ApiService.sendInterviewDialogMessage({
        sessionId: 1,
        message: message.trim() === "" ? "Hei!" : message,
        mode: "interview",
        review: review
      });
      
      if (message) { // Only add user message if there is one
        const newMessage: Message = {
          id: Date.now(),
          text: message,
          isBot: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
      }
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: response.response || response.output || 'No response received',
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: 'Sorry, there was an error processing your message.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    const messageText = inputText;
    setInputText('');
    
    await sendMessage(messageText);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-[800px] max-h-[90vh] rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-4 bg-[#4B2E83] text-white rounded-t-lg flex justify-between items-center">
          <h3 className="font-medium">Mock Interview</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={resetChat}
              className="text-white hover:text-gray-200 text-sm font-medium px-2 py-1 rounded border border-white/30 hover:border-white/50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-xl font-medium"
            >
              ×
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="p-4 h-[600px] overflow-y-auto"
        >
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}
            >
              <div
                className={`inline-block p-3 rounded-lg whitespace-pre-line ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-[#4B2E83] text-white'
                }`}
              >
                {message.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2E83] text-gray-900"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#4B2E83] text-white rounded-md hover:bg-[#3b2566] disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 