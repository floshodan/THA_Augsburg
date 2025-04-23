'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Navbar from '../components/Navbar';
import WeekSidebar from '../components/WeekSidebar';
import RoadMap from '../components/RoadMap';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';

// Bootcamp Wochen
const bootcampWeeks = [
  { 
    number: 1, 
    title: 'Web Grundlagen', 
    subtitle: 'HTML, CSS & Git',
    isActive: true, 
    isCompleted: false 
  },
  { 
    number: 2, 
    title: 'JavaScript Basics', 
    subtitle: 'Syntax & DOM',
    isActive: false, 
    isCompleted: false 
  },
  { 
    number: 3, 
    title: 'JavaScript Advanced', 
    subtitle: 'APIs & Async',
    isActive: false, 
    isCompleted: false 
  },
  { 
    number: 4, 
    title: 'React Fundamentals', 
    subtitle: 'Components & Props',
    isActive: false, 
    isCompleted: false 
  },
  { 
    number: 5, 
    title: 'React State & Hooks', 
    subtitle: 'State Management',
    isActive: false, 
    isCompleted: false 
  },
  { 
    number: 6, 
    title: 'Backend Basics', 
    subtitle: 'Node.js & Express',
    isActive: false, 
    isCompleted: false 
  },
  { 
    number: 7, 
    title: 'Datenbanken', 
    subtitle: 'SQL & MongoDB',
    isActive: false, 
    isCompleted: false 
  }
];

// Tage der aktuellen Woche
const weekDays = [
  {
    id: 1,
    title: 'HTML Grundlagen',
    description: 'Einführung in HTML5 und semantische Elemente',
    tasks: [
      'HTML Dokumentstruktur',
      'Semantische Tags',
      'Formulare & Validierung',
      'Übungsprojekt: Portfolio-Seite'
    ],
    status: 'completed' as const
  },
  {
    id: 2,
    title: 'CSS Basics',
    description: 'Styling und Layout-Grundlagen',
    tasks: [
      'CSS Selektoren',
      'Box Model',
      'Flexbox Layout',
      'Responsive Design'
    ],
    status: 'current' as const
  },
  {
    id: 3,
    title: 'CSS Advanced',
    description: 'Fortgeschrittene Styling-Techniken',
    tasks: [
      'CSS Grid',
      'Animationen',
      'CSS Variables',
      'CSS Frameworks'
    ],
    status: 'upcoming' as const
  },
  {
    id: 4,
    title: 'Git & GitHub',
    description: 'Versionskontrolle und Zusammenarbeit',
    tasks: [
      'Git Grundlagen',
      'Branching & Merging',
      'GitHub Workflow',
      'Team Collaboration'
    ],
    status: 'upcoming' as const
  },
  {
    id: 5,
    title: 'Projekt',
    description: 'Wochenprojekt: Responsive Website',
    tasks: [
      'Wireframing',
      'HTML Struktur',
      'CSS Styling',
      'Git Deployment'
    ],
    status: 'upcoming' as const
  }
];

export default function Dashboard() {
  const currentWeek = 4; // Fallback zu Woche 4

  // Generiere alle 35 Tage in der richtigen Reihenfolge
  const allDays = Array.from({ length: 35 }, (_, index) => {
    const weekIndex = Math.floor(index / 5);
    const dayInWeek = (index % 5) + 1;
    const week = bootcampWeeks[weekIndex];

    return {
      ...weekDays[index % 5],
      id: index + 1,
      weekNumber: week.number,
      title: `Tag ${dayInWeek}: ${weekDays[index % 5].title}`,
      status: weekIndex === 0 ? weekDays[index % 5].status : 'upcoming'
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
      
      <div className="flex flex-1 overflow-hidden">
        {/* Fixierte Sidebar */}
        <div className="w-72 flex-shrink-0 border-r border-gray-200">
          <WeekSidebar 
            weeks={memoizedWeeks}
            onWeekSelect={handleWeekSelect} 
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

      <ChatBot />
      <Footer />
    </div>
  );
} 