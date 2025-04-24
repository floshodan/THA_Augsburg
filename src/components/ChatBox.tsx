import { useState } from 'react';

interface ChatBoxProps {
  onMessageSubmit: (message: string) => void;
}

export default function ChatBox({ onMessageSubmit }: ChatBoxProps) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://agent.floshodan.io:5678/webhook/7853e7c5-40bb-4703-8bb2-5caeb8e404b6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          knowledge: "UI/UX, Flutter, HTML, JS",
          wantKnow: "UI/UX, Flutter, HTML, JS",
          description: "mein name ist mike und ich liebe torte",
          message: input,
          sessionId: 1
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        throw new Error('Invalid JSON response from server');
      }

      if (!data || !data.output) {
        throw new Error('Invalid response format');
      }

      // Remove the <think> section from the output
      const cleanOutput = data.output.replace(/<think>[\s\S]*?<\/think>\n\n/, '');
      setResponse(cleanOutput);
      onMessageSubmit(input);
    } catch (error) {
      console.error('Error:', error);
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (text: string) => {
    // Split the text into paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if the paragraph contains code blocks
      if (paragraph.includes('```')) {
        const [language, ...codeLines] = paragraph.split('\n');
        const code = codeLines.join('\n').replace(/```/g, '');
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">{code}</code>
          </pre>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        {response && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="prose max-w-none">
              {formatResponse(response)}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B2E83]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3B1E73] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
} 