'use client';

import { useState, useEffect, useMemo } from 'react';
import { DayNode } from '../types/course';

interface GlobalFeedbackProps {
  days: DayNode[];
}

interface FeedbackData {
  message: string;
  timestamp: string;
}

export default function GlobalFeedback({ days }: GlobalFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Berechne den Gesamtfortschritt
  const totalProgress = useMemo(() => {
    const totalTasks = days.reduce((sum, day) => sum + day.progress.totalTasks, 0);
    const completedTasks = days.reduce((sum, day) => sum + day.progress.completedTasks, 0);
    return {
      total: totalTasks,
      completed: completedTasks,
      percentage: Math.round((completedTasks / totalTasks) * 100)
    };
  }, [days]);

  // Hole Feedback von der API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        // Hier würde der tatsächliche API-Call stehen
        // const response = await fetch('/api/global-feedback');
        // const data = await response.json();
        
        // Temporärer Mock-Daten
        const mockData: FeedbackData = {
          message: "Super Fortschritt! Du hast bereits 75% des Bootcamps abgeschlossen. Weiter so!",
          timestamp: new Date().toISOString()
        };
        
        setFeedback(mockData);
        setError(null);
      } catch (err) {
        setError('Fehler beim Laden des Feedbacks');
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
        <h2 className="text-xl font-bold text-gray-900">Bootcamp Fortschritt</h2>
        <span className="text-sm text-gray-500">
          {totalProgress.completed} von {totalProgress.total} Aufgaben
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
          <>
            <p className="text-gray-700">{feedback.message}</p>
            <p className="text-xs text-gray-500 mt-2">
              Letztes Update: {new Date(feedback.timestamp).toLocaleDateString()}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
} 