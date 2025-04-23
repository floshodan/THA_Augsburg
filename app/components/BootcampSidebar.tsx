'use client';

interface BootcampSidebarProps {
  selectedWeek: number;
  onWeekSelect: (week: number) => void;
}

const TOTAL_WEEKS = 12;

export default function BootcampSidebar({ selectedWeek, onWeekSelect }: BootcampSidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Bootcamp Progress</h2>
        <nav className="space-y-2">
          {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((week) => (
            <button
              key={week}
              onClick={() => onWeekSelect(week)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedWeek === week
                  ? 'bg-[#4B2E83] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week {week}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
} 