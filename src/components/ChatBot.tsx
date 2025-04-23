'use client';

import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  data?: {
    quality?: { score: number; description: string };
    readability?: { score: number; description: string };
    structure?: { score: number; description: string };
    efficiency?: { score: number; description: string };
    tips?: string;
    progress_checkpoint?: {
      problems: string;
      category: string;
    };
  };
}

export default function ChatBot() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatResponse = (data: any) => {
    let responseText = '';
    
    if (data.quality) {
      responseText += `\nQuality Score: ${data.quality.score}/10\n${data.quality.description}\n`;
    }
    if (data.readability) {
      responseText += `\nReadability Score: ${data.readability.score}/10\n${data.readability.description}\n`;
    }
    if (data.structure) {
      responseText += `\nStructure Score: ${data.structure.score}/10\n${data.structure.description}\n`;
    }
    if (data.efficiency) {
      responseText += `\nEfficiency Score: ${data.efficiency.score}/10\n${data.efficiency.description}\n`;
    }
    if (data.tips) {
      responseText += `\nTips:\n${data.tips}\n`;
    }
    if (data.progress_checkpoint) {
      responseText += `\nProgress Checkpoint:\nCategory: ${data.progress_checkpoint.category}\nProblems: ${data.progress_checkpoint.problems}\n`;
    }

    return responseText.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://agent.floshodan.io:5678/webhook/grade-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: "value",
          code: inputText
        }),
      });

      const data = await response.json();
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: formatResponse(data.output),
        isBot: true,
        timestamp: new Date(),
        data: data.output
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Nachricht.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Stelle eine Frage..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B2E83] text-gray-900"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#4B2E83] text-white rounded-md hover:bg-[#3b2566] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? '...' : 'Senden'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 