'use client';

import { useState, useRef, useEffect } from 'react';

interface Progress {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
}

interface DayNode {
  id: number;
  weekNumber: number;
  dayNumber: number;
  title: string;
  description: string;
  tasks: string[];
  status: 'completed' | 'current' | 'upcoming';
  progress: Progress;
}

interface RoadMapProps {
  days: DayNode[];
  weekNumber: number;
  showTitle?: boolean;
}

export default function RoadMap({ days, weekNumber, showTitle = false }: RoadMapProps) {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
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

  // Funktion zur Bestimmung der Fortschrittsfarbe (ohne 'bg-' Präfix)
  const getColorClass = (percentage: number) => {
    if (percentage === 100) return 'green-500';
    if (percentage >= 75) return 'green-400';
    if (percentage >= 50) return 'yellow-400';
    if (percentage >= 25) return 'orange-400';
    return 'red-500';
  };

  // Funktion zur Bestimmung der Rahmenfarbe
  const getBorderColor = (day: DayNode) => {
    if (day.status === 'current') return 'border-[#4B2E83]';
    return `border-${getColorClass(day.progress.percentage)}`;
  };

  // Funktion zur Bestimmung der Fortschrittsbalkenfarbe
  const getProgressColor = (percentage: number) => {
    return `bg-${getColorClass(percentage)}`;
  };

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
      {showTitle && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dein Wochenplan</h2>
          <p className="text-gray-600">Klicke auf einen Tag für mehr Details</p>
        </div>
      )}

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
                        className={`p-4 rounded-lg border-2 transition-all bg-white ${getBorderColor(day)}`}
                      >
                        <div className={`text-lg font-semibold mb-2 ${
                          day.status === 'current' ? 'text-[#4B2E83]' : 'text-gray-900'
                        }`}>Tag {day.dayNumber}</div>
                        <h3 className="font-medium mb-1 text-gray-900">{day.title}</h3>
                        
                        {/* Fortschrittsanzeige */}
                        <div className="mt-2">
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${getProgressColor(day.progress.percentage)}`}
                              style={{ width: `${day.progress.percentage}%` }}
                            />
                          </div>
                          <div className="text-xs mt-1 text-gray-500">
                            {day.progress.completedTasks} von {day.progress.totalTasks} Aufgaben
                          </div>
                        </div>

                        {selectedNode === day.id && (
                          <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-500">
                              {day.description}
                            </p>
                            <ul className="text-sm space-y-1 mt-2 text-gray-500">
                              {day.tasks.map((task, index) => (
                                <li key={index} className="flex items-center">
                                  <span className={`mr-2 ${
                                    index < day.progress.completedTasks ? 'text-green-500' : 'text-gray-400'
                                  }`}>
                                    {index < day.progress.completedTasks ? '✓' : '•'}
                                  </span>
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
