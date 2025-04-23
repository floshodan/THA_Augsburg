'use client';

import { useState } from 'react';
import BootcampSidebar from '../components/BootcampSidebar';
import RoadmapContent from '../components/RoadmapContent';

export default function BootcampPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  return (
    <div className="flex h-screen bg-gray-100">
      <BootcampSidebar 
        selectedWeek={selectedWeek} 
        onWeekSelect={setSelectedWeek} 
      />
      <main className="flex-1 p-8 overflow-auto">
        <RoadmapContent week={selectedWeek} />
      </main>
    </div>
  );
} 