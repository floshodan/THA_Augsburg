import { useState } from 'react';
import mockData from '../../data/mockdata.json';

interface MockData {
  bootcampName: string;
  progress: number;
  currentDay: number;
  taskCount: number;
  bootcampContent: Array<{
    title: string;
    subtitle: string;
    nodes: Array<{
      day: number;
      content: string;
      description: string;
    }>;
  }>;
}

const data: MockData = mockData;

export default function WeekSidebar() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  return (
    <div className="h-full bg-white w-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Dein Lernfortschritt</h2>
        <p className="text-sm text-gray-500 mt-1">{data.bootcampName}</p>
      </div>
      <nav className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px - 89px)' }}>
        <ul className="space-y-3">
          {data.bootcampContent.map((week, index) => {
            const isCurrent = index + 1 === Math.floor((data.currentDay - 1) / 5) + 1;
            const isCompleted = index + 1 < Math.floor((data.currentDay - 1) / 5) + 1;

            return (
              <li key={index} className="h-32">
                <button
                  onClick={() => setSelectedWeek(selectedWeek === index ? null : index)}
                  className={`w-full h-full p-4 rounded-lg transition-all relative hover:bg-gray-50 flex items-center ${
                    isCurrent 
                      ? 'border-2 border-[#4B2E83] bg-[#4B2E83] text-white'
                      : isCompleted
                        ? 'border-2 border-green-500 bg-green-50'
                        : 'border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      isCompleted 
                        ? 'bg-green-500'
                        : isCurrent
                          ? 'bg-white'
                          : 'bg-gray-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold truncate ${
                        isCurrent ? 'text-white' : 'text-gray-900'
                      }`}>
                        {week.title}
                      </div>
                      <div className={`text-sm truncate ${
                        isCurrent ? 'text-gray-200' : 'text-gray-500'
                      }`}>
                        {week.subtitle}
                      </div>
                    </div>
                  </div>
                  {isCurrent && (
                    <div className="absolute bottom-2 right-2 text-xs font-medium px-1.5 py-0.5 bg-white text-[#4B2E83] rounded">
                      aktuell
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 