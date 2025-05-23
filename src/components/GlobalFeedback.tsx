'use client';

import { useState, useEffect, useMemo } from 'react';
import { DayNode } from '../types/course';
import InterviewDialog from './InterviewDialog';
import ApiService from '../services/ApiService';

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
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);

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
        const response = await ApiService.getGlobalFeedback();
        
        setFeedback({
          shortAnswer: response.output.shortAnswer,
          longAnswer: response.output.longAnswer,
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
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
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
              <div className="relative">
                <button
                  className="px-4 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3b2566] transition-colors"
                  title="Start Interactive mock job interview"
                  onClick={() => setShowInterviewDialog(true)}
                >
                  Start Interview
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <InterviewDialog 
        isOpen={showInterviewDialog}
        onClose={() => setShowInterviewDialog(false)}
        review={feedback?.longAnswer || ""}
      />
    </div>
  );
} 