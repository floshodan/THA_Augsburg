'use client';

import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Hier würde die Integration mit dem AI-Lehrer stattfinden
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: 'Ich helfe dir gerne bei deiner Frage...',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Minimized State - Always visible */}
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-5 right-4 w-12 h-12 bg-[#4B2E83] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#3b2566] transition-colors z-50"
        title="Frag deinen Lehrer"
      >
        <FaQuestionCircle className="w-6 h-6" />
      </button>

      {/* Expanded State - Only visible when not minimized */}
      {!isMinimized && (
        <div className="fixed bottom-5 right-4 w-96 bg-white rounded-t-lg shadow-xl z-50">
          {/* Header */}
          <div
            className="p-4 bg-[#4B2E83] text-white rounded-t-lg cursor-pointer flex justify-between items-center"
            onClick={() => setIsMinimized(true)}
          >
            <h3 className="font-medium">Frag deinen Lehrer</h3>
            <button className="text-white hover:text-gray-200">
              ▼
            </button>
          </div>

          {/* Chat Container */}
          <div className="p-4 h-[400px] overflow-y-auto">
            {messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.isBot ? 'text-left' : 'text-right'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
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
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Stelle eine Frage..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2E83]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#4B2E83] text-white rounded-md hover:bg-[#3b2566]"
              >
                Senden
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 