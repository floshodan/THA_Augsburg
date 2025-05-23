'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import DailyFeedback from './DailyFeedback';
import GlobalFeedback from './GlobalFeedback';
import { DayNode } from '../types/course';

interface RoadMapProps {
  days: DayNode[];
  weekNumber: number;
  showTitle?: boolean;
}

// Utility functions
const getColorClass = (percentage: number): string => {
  if (percentage === 100) return 'green-500';
  if (percentage >= 75) return 'green-400';
  if (percentage >= 50) return 'yellow-400';
  if (percentage >= 25) return 'orange-400';
  return 'red-500';
};

const getBorderColor = (day: DayNode): string => {
  if (day.status === 'upcoming') return 'border-gray-200';
  if (day.status === 'current') return 'border-[#4B2E83]';
  return `border-${getColorClass(day.progress.percentage)}`;
};

const getProgressColor = (percentage: number): string => {
  return `bg-${getColorClass(percentage)}`;
};

const getProgressColorClass = (percentage: number, status: string): string => {
  if (status === 'upcoming') return 'bg-gray-300';
  if (percentage === 100) return 'bg-green-500';
  if (percentage >= 75) return 'bg-green-400';
  if (percentage >= 50) return 'bg-yellow-400';
  if (percentage >= 25) return 'bg-orange-400';
  return 'bg-red-500';
};

const getBorderColorClass = (percentage: number, status: string): string => {
  if (status === 'upcoming') return 'border-gray-300';
  if (status === 'current') return 'border-[#4B2E83]';
  if (percentage === 100) return 'border-green-500';
  if (percentage >= 75) return 'border-green-400';
  if (percentage >= 50) return 'border-yellow-400';
  if (percentage >= 25) return 'border-orange-400';
  return 'border-red-500';
};

// Custom hooks
const useScrollPosition = (selectedNode: number | null, containerRef: React.RefObject<HTMLDivElement | null>) => {
  const calculateAndScrollToOptimalPosition = useCallback(() => {
    if (selectedNode && containerRef.current) {
      const nodeElement = containerRef.current.querySelector(`[data-node-id="${selectedNode}"]`);
      if (nodeElement) {
        const mainContent = document.querySelector('main.overflow-y-auto');
        
        if (mainContent) {
          const nodeRect = nodeElement.getBoundingClientRect();
          const mainContentRect = mainContent.getBoundingClientRect();
          const nodeOffsetTop = nodeRect.top - mainContentRect.top + mainContent.scrollTop;
          const targetScroll = nodeOffsetTop - 40;

          mainContent.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [selectedNode]);

  return calculateAndScrollToOptimalPosition;
};

const useNodePosition = (selectedNode: number | null, containerRef: React.RefObject<HTMLDivElement | null>) => {
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (selectedNode && containerRef.current) {
      const nodeElement = containerRef.current.querySelector(`[data-node-id="${selectedNode}"]`);
      if (nodeElement) {
        const rect = nodeElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        setPosition({
          top: rect.bottom - containerRect.top,
          left: 0,
          width: containerRect.width
        });
      }
    } else {
      setPosition(null);
    }
  }, [selectedNode]);

  return position;
};

// Main component
export default function RoadMap({ days, weekNumber, showTitle = false }: RoadMapProps) {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<string>('');

  const calculateAndScrollToOptimalPosition = useScrollPosition(selectedNode, containerRef);
  const selectedNodePosition = useNodePosition(selectedNode, containerRef);

  // Group days by week
  const weekGroups = useMemo(() => {
    return days.reduce((acc, day) => {
      const weekIndex = Math.floor((day.id - 1) / 5);
      if (!acc[weekIndex]) {
        acc[weekIndex] = [];
      }
      acc[weekIndex].push(day);
      return acc;
    }, {} as Record<number, typeof days>);
  }, [days]);

  // Calculate SVG path
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

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        const clickedElement = event.target as HTMLElement;
        const isTagButton = clickedElement.closest('.node-button');
        
        if (!isTagButton) {
          setSelectedNode(null);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
      {showTitle && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Weekly Plan</h2>
          <p className="text-gray-600">Click on a day for more details</p>
        </div>
      )}

      <GlobalFeedback days={days} />

      <div ref={containerRef} className="relative">
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
                      data-node-id={day.id}
                      className={`node-button w-full transition-all ${
                        selectedNode === day.id ? 'scale-105' : ''
                      }`}
                      onClick={() => day.status !== 'upcoming' && setSelectedNode(selectedNode === day.id ? null : day.id)}
                      disabled={day.status === 'upcoming'}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 transition-all ${
                          day.status === 'upcoming' ? 'bg-gray-50 opacity-60 cursor-not-allowed' : 'bg-white'
                        } ${getBorderColorClass(day.progress.percentage, day.status)}`}
                      >
                        <div className={`text-lg font-semibold mb-2 ${
                          day.status === 'current' ? 'text-[#4B2E83]' : 
                          day.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                        }`}>Day {day.dayNumber}</div>
                        <h3 className={`font-medium mb-1 ${
                          day.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                        }`}>{day.title}</h3>
                        
                        <div className="mt-2">
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${getProgressColorClass(day.progress.percentage, day.status)}`}
                              style={{ width: `${day.progress.percentage}%` }}
                            />
                          </div>
                          <div className={`text-xs mt-1 ${
                            day.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {day.progress.completedTasks} of {day.progress.totalTasks} tasks
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedNode && (
          <div
            ref={overlayRef}
            className="absolute left-0 w-full bg-white rounded-lg shadow-lg transition-all duration-300"
            style={{
              top: selectedNodePosition?.top,
              transform: 'translateY(1rem)'
            }}
          >
            <DailyFeedback
              day={days.find(d => d.id === selectedNode)!}
              onClose={() => setSelectedNode(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
} 
