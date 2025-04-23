'use client';

import { useState, useRef, useEffect } from 'react';

interface DayNode {
  id: number;
  weekNumber: number;
  title: string;
  description: string;
  tasks: string[];
  status: 'completed' | 'current' | 'upcoming';
}

interface RoadMapProps {
  days: DayNode[];
  weekNumber: number;
  showTitle?: boolean;
}

export default function RoadMap({ days, weekNumber, showTitle = false }: RoadMapProps) {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<string>('');

  // Berechne den SVG-Pfad basierend auf den Node-Positionen
  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = containerRef.current.querySelectorAll('.node-button');
    if (nodes.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const points: { x: number; y: number }[] = [];

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) - containerRect.left;
      const y = (rect.top + rect.height / 2) - containerRect.top;
      points.push({ x, y });
    });

    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const controlPoint1 = {
        x: prevPoint.x + (currentPoint.x - prevPoint.x) / 2,
        y: prevPoint.y
      };
      const controlPoint2 = {
        x: prevPoint.x + (currentPoint.x - prevPoint.x) / 2,
        y: currentPoint.y
      };
      pathD += ` C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${currentPoint.x} ${currentPoint.y}`;
    }
    setPath(pathD);
  }, [days]);

  // Gruppiere Tage nach Wochen
  const weekGroups = days.reduce((acc, day) => {
    const weekIndex = Math.floor((day.id - 1) / 5);
    if (!acc[weekIndex]) {
      acc[weekIndex] = [];
    }
    acc[weekIndex].push(day);
    return acc;
  }, {} as Record<number, typeof days>);

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

      <div ref={containerRef} className="relative">
        {/* Verbindungslinien */}
        <svg 
          className="absolute top-0 left-0 w-full h-full" 
          style={{ zIndex: 0 }}
          preserveAspectRatio="none"
        >
          <path
            d={path}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Nodes */}
        <div className="relative space-y-16">
          {Object.entries(weekGroups).map(([weekIndex, weekDays]) => (
            <div 
              // style={{ marginTop: '-100px' , paddingTop: '100px'}}
              key={weekIndex}
              data-week={weekDays[0].weekNumber}
              className="relative min-h-[20vh] flex items-center"
            >
              <div className="grid grid-cols-5 gap-8 w-full">
                {weekDays.map((day) => (
                  <div key={day.id} className="relative">
                    <button
                      className={`node-button w-full transition-all ${
                        selectedNode === day.id ? 'scale-105' : ''
                      }`}
                      onClick={() => setSelectedNode(selectedNode === day.id ? null : day.id)}
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
          ))}
        </div>
      </div>
    </div>
  );
} 