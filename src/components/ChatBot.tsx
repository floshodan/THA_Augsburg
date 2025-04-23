'use client';

import { useState } from 'react';

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
    <div
      className={`fixed bottom-0 right-4 w-96 bg-white rounded-t-lg shadow-xl transition-all duration-300 ${
        isMinimized ? 'h-12' : 'h-[500px]'
      }`}
    >
      {/* Header */}
      <div
        className="p-4 bg-[#4B2E83] text-white rounded-t-lg cursor-pointer flex justify-between items-center"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <h3 className="font-medium">Frag deinen Lehrer</h3>
        <button className="text-white hover:text-gray-200">
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>

      {/* Chat Container */}
      {!isMinimized && (
        <>
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
        </>
      )}
    </div>
  );
} 