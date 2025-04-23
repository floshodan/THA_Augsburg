interface Week {
  number: number;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface WeekSidebarProps {
  weeks: Week[];
  onWeekSelect: (weekNumber: number) => void;
  bootcampTitle: string;
}

export default function WeekSidebar({ weeks, onWeekSelect, bootcampTitle }: WeekSidebarProps) {
  return (
    <div className="h-full bg-white">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Dein Lernfortschritt</h2>
        <p className="text-sm text-gray-500 mt-1">{bootcampTitle}</p>
      </div>
      <nav className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px - 89px)' }}>
        <ul className="space-y-3">
          {weeks.map((week) => (
            <li key={week.number}>
              <button
                onClick={() => onWeekSelect(week.number)}
                className={`w-full p-4 rounded-lg transition-all relative hover:bg-gray-50 ${
                  week.isCurrent 
                    ? 'border-2 border-green-500 bg-green-50'
                    : 'border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    week.isCompleted 
                      ? 'bg-green-500'
                      : week.isCurrent
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                  }`} />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">{week.title}</div>
                    <div className="text-sm text-gray-500">
                      {week.subtitle}
                    </div>
                  </div>
                </div>
                {week.isCurrent && (
                  <div className="absolute bottom-2 right-2 text-xs font-medium px-1.5 py-0.5 bg-green-100 text-green-800 rounded">
                    current
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 