'use client';

import { useState, useEffect, useMemo } from 'react';
import { DayNode } from '../types/course';

interface GlobalFeedbackProps {
  days: DayNode[];
}

interface FeedbackData {
  shortAnswer: string;
  longAnswer: string;
  timestamp: string;
}

export default function GlobalFeedback({ days }: GlobalFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLongAnswer, setShowLongAnswer] = useState(false);

  // Calculate total progress
  const totalProgress = useMemo(() => {
    const totalTasks = days.reduce((sum, day) => sum + day.progress.totalTasks, 0);
    const completedTasks = days.reduce((sum, day) => sum + day.progress.completedTasks, 0);
    return {
      total: totalTasks,
      completed: completedTasks,
      percentage: Math.round((completedTasks / totalTasks) * 100)
    };
  }, [days]);

  // Fetch feedback from API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://agent.floshodan.io:5678/webhook/1836e87e-4937-4db2-b8c0-6131d633a0a6', {
          method: 'POST',
          body: 'coolResponse=1'
        });
        const data = await response.json();
        console.log(data);
        
        setFeedback({
          shortAnswer: data.output.shortAnswer,
          longAnswer: data.output.longAnswer,
          timestamp: new Date().toISOString()
        });
        setError(null);
      } catch (err) {
        setError('Error loading feedback');
        console.error('Error fetching feedback:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Bootcamp Progress</h2>
        <span className="text-sm text-gray-500">
          {totalProgress.completed} of {totalProgress.total} tasks
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-4 mb-4">
        <div 
          className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
          style={{ width: `${totalProgress.percentage}%` }}
        />
      </div>

      {/* Feedback Section */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : feedback ? (
          <div className="space-y-4">
            <p className="text-gray-700">{showLongAnswer ? feedback.longAnswer : feedback.shortAnswer}</p>
            <button
              onClick={() => setShowLongAnswer(!showLongAnswer)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              {showLongAnswer ? 'Show less' : 'Show more'}
            </button>
            <p className="text-xs text-gray-500">
              Last update: {new Date(feedback.timestamp).toLocaleDateString()}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
} 