'use client';

import { useState } from 'react';

interface DayNode {
  id: number;
  title: string;
  description: string;
  tasks: string[];
  status: 'completed' | 'current' | 'upcoming';
}

interface RoadMapProps {
  days: DayNode[];
  weekNumber: number;
}

export default function RoadMap({ days, weekNumber }: RoadMapProps) {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  // Calculate progress
  const totalTasks = days.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedTasks = days.reduce((acc, day) => {
    if (day.status === 'completed') {
      return acc + day.tasks.length;
    }
    return acc;
  }, 0);
  const progressPercentage = (completedTasks / totalTasks) * 100;

  // Placeholder feedback data
  const feedbackData = {
    performance: 'Gut',
    comment: 'Du machst sehr gute Fortschritte! Besonders deine HTML/CSS Kenntnisse sind bereits sehr solide.'
  };

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dein Wochenplan</h2>
        <p className="text-gray-600">Klicke auf einen Tag für mehr Details</p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Fortschritt</span>
          <span className="text-sm font-medium text-gray-700">
            {completedTasks} von {totalTasks} Aufgaben erledigt
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4B2E83] transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Simple Feedback Box */}
      <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Your Feedback</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${
            feedbackData.performance === 'Gut' 
              ? 'bg-green-100 text-green-800'
              : feedbackData.performance === 'Mittel'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {feedbackData.performance}
          </span>
        </div>
        <p className="mt-2 text-gray-900 text-sm">{feedbackData.comment}</p>
      </div>

      <div className="relative min-h-[400px]">
        {/* Verbindungslinien */}
        <svg 
          className="absolute top-0 left-0 w-full h-full" 
          style={{ zIndex: 0 }}
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <path
            d="M100 100 Q 200 100, 300 200 T 500 200 T 700 100 T 900 200"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Nodes */}
        <div className="relative z-10 grid grid-cols-5 gap-6">
          {days.map((day) => (
            <div key={day.id} className="relative pt-16">
              <button
                onClick={() => setSelectedNode(selectedNode === day.id ? null : day.id)}
                className={`w-full transition-all ${
                  selectedNode === day.id ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`p-4 rounded-lg border-2 transition-all ${
                    day.status === 'completed'
                      ? 'border-green-500 bg-green-50'
                      : day.status === 'current'
                      ? 'border-[#4B2E83] bg-[#4B2E83] text-white'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-lg font-semibold mb-2">Tag {day.id}</div>
                  <h3 className="font-medium mb-1">{day.title}</h3>
                  {selectedNode === day.id && (
                    <div className="mt-4 space-y-2">
                      <p className={`text-sm ${
                        day.status === 'current' ? 'text-gray-100' : 'text-gray-500'
                      }`}>
                        {day.description}
                      </p>
                      <ul className={`text-sm space-y-1 mt-2 ${
                        day.status === 'current' ? 'text-gray-100' : 'text-gray-500'
                      }`}>
                        {day.tasks.map((task, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-2">•</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 