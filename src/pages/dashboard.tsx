'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import WeekSidebar from '../components/WeekSidebar';
import RoadMap from '../components/RoadMap';
import ChatBot from '../components/ChatBot';
import courseData from '../mockData/courseData.json';

type DayStatus = 'completed' | 'current' | 'upcoming';

interface Progress {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
}

interface DayTemplate {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
  tasks: string[];
  status: DayStatus;
  progress: Progress;
}

export default function Dashboard() {
  const { currentWeek, currentDay, bootcampWeeks, weekDays, bootcampTitle } = courseData;

  // Generiere alle 35 Tage in der richtigen Reihenfolge
  const allDays = Array.from({ length: 35 }, (_, index) => {
    const weekIndex = Math.floor(index / 5);
    const dayInWeek = (index % 5) + 1;
    const week = bootcampWeeks[weekIndex];
    const dayTemplate = weekDays[index] as DayTemplate;

    // Berechne den absoluten Tag im Bootcamp (1-35)
    const absoluteDayNumber = index + 1;
    
    let status: DayStatus;
    if (absoluteDayNumber === currentDay) {
      status = 'current';
    } else if (absoluteDayNumber > currentDay) {
      status = 'upcoming';
    } else {
      status = 'completed';
    }

    // Bestimme den Fortschritt basierend auf dem Status
    let progress: Progress;
    if (status === 'upcoming') {
      progress = {
        completedTasks: 0,
        totalTasks: dayTemplate.tasks.length,
        percentage: 0
      };
    } else {
      // Für vergangene und aktuelle Tage verwenden wir die Werte aus den Mock-Daten
      progress = dayTemplate.progress;
    }

    return {
      ...dayTemplate,
      id: absoluteDayNumber,
      weekNumber: week.number,
      dayNumber: absoluteDayNumber,
      status,
      progress
    };
  });

  const handleWeekSelect = (weekNumber: number) => {
    const weekElement = document.querySelector(`[data-week="${weekNumber}"]`);
    weekElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Memoize die Wochen-Liste mit der aktuellen Woche
  const memoizedWeeks = useMemo(() => 
    bootcampWeeks.map(week => ({
      ...week,
      isCurrent: week.number === currentWeek
    })),
    [currentWeek]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 border-r border-gray-200">
          <WeekSidebar 
            weeks={memoizedWeeks}
            onWeekSelect={handleWeekSelect}
            bootcampTitle={bootcampTitle}
          />
        </div>

        {/* Scrollbare Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            <RoadMap 
              days={allDays}
              weekNumber={currentWeek}
              showTitle={true}
            />
          </div>
        </main>
      </div>

      {/* ChatBot */}
      <div className="fixed bottom-12 right-8 z-50">
        <ChatBot />
      </div>
    </div>
  );
} 