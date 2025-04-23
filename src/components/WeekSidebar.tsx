interface Week {
  number: number;
  title: string;
  subtitle: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface WeekSidebarProps {
  weeks: Week[];
  onWeekSelect: (weekNumber: number) => void;
}

export default function WeekSidebar({ weeks, onWeekSelect }: WeekSidebarProps) {
  return (
    <div className="h-full bg-white">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Dein Lernfortschritt</h2>
        <p className="text-sm text-gray-500 mt-1">Web Development Bootcamp</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-3">
          {weeks.map((week) => (
            <li key={week.number}>
              <button
                onClick={() => onWeekSelect(week.number)}
                className={`w-full p-4 rounded-lg transition-all ${
                  week.isActive
                    ? 'bg-[#4B2E83] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    week.isCompleted 
                      ? 'bg-green-500' 
                      : week.isActive 
                        ? 'bg-white' 
                        : 'bg-gray-300'
                  }`} />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{week.title}</div>
                    <div className={`text-sm ${
                      week.isActive ? 'text-gray-100' : 'text-gray-500'
                    }`}>
                      {week.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 