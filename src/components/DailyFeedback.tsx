import { useState, useEffect } from 'react';

interface DailyFeedbackProps {
  day: {
    id: number;
    title: string;
    description: string;
    tasks: string[];
    progress: {
      completedTasks: number;
      totalTasks: number;
      percentage: number;
    };
  };
  onClose: () => void;
}

export default function DailyFeedback({ day, onClose }: DailyFeedbackProps) {
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState<'not-understood' | 'no-time' | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://agent.floshodan.io:5678/webhook/1836e87e-4937-4db2-b8c0-6131d633a0a6', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: "value",
            code: "your code here"
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }

        const data = await response.json();
        setFeedback(data.output);
      } catch (err) {
        setError('Failed to load feedback. Please try again later.');
        console.error('Error fetching feedback:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleAcknowledge = (type: 'not-understood' | 'no-time') => {
    setAcknowledged(type);
    // Here you would typically send the acknowledgment to your backend
    console.log('Feedback acknowledged:', type);
    setTimeout(() => {
      onClose();
    }, 1000); // Close after animation
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg mt-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{day.title}</h2>
          <p className="text-gray-600 mt-1">Tag {day.id}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Beschreibung</h3>
            <p className="text-gray-600 text-sm">{day.description}</p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Aufgaben</h3>
            <ul className="space-y-2">
              {day.tasks.map((task, index) => (
                <li key={index} className="flex items-center">
                  <span className={`mr-2 ${
                    index < day.progress.completedTasks ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {index < day.progress.completedTasks ? '✓' : '•'}
                  </span>
                  <span className="text-gray-600 text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Tägliches Feedback</h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4B2E83]"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                {feedback.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 text-sm mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleAcknowledge('not-understood')}
                  disabled={acknowledged !== null}
                  className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    acknowledged === 'not-understood'
                      ? 'bg-green-100 text-green-700 scale-95'
                      : acknowledged === null
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 hover:scale-[1.02] active:scale-95'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    I did not understand well enough
                  </span>
                </button>
                
                <button
                  onClick={() => handleAcknowledge('no-time')}
                  disabled={acknowledged !== null}
                  className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    acknowledged === 'no-time'
                      ? 'bg-green-100 text-green-700 scale-95'
                      : acknowledged === null
                      ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:scale-[1.02] active:scale-95'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    I did not have time
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 