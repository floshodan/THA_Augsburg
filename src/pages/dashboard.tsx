'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import WeekSidebar from '../components/WeekSidebar';
import RoadMap from '../components/RoadMap';
import ChatBot from '../components/ChatBot';
import courseData from '../mockData/courseData.json';

type DayStatus = 'completed' | 'current' | 'upcoming';

interface DayTemplate {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
  tasks: string[];
  status: DayStatus;
}

export default function Dashboard() {
  const { currentWeek, bootcampWeeks, weekDays, bootcampTitle } = courseData;

  // Generiere alle 35 Tage in der richtigen Reihenfolge
  const allDays = Array.from({ length: 35 }, (_, index) => {
    const weekIndex = Math.floor(index / 5);
    const dayInWeek = (index % 5) + 1;
    const week = bootcampWeeks[weekIndex];
    const dayTemplate = weekDays[dayInWeek - 1] as DayTemplate;

    let status: DayStatus;
    if (week.number < currentWeek) {
      status = 'completed';
    } else if (week.number === currentWeek) {
      status = dayTemplate.status;
    } else {
      status = 'upcoming';
    }

    return {
      ...dayTemplate,
      id: index + 1,
      weekNumber: week.number,
      dayNumber: dayTemplate.dayNumber,
      status
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