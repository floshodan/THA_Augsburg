export interface Progress {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
}

export interface DayNode {
  id: number;
  weekNumber: number;
  dayNumber: number;
  title: string;
  description: string;
  tasks: string[];
  status: 'completed' | 'current' | 'upcoming';
  progress: Progress;
}

export interface Week {
  number: number;
  title: string;
  subtitle: string;
  isCompleted: boolean;
}

export interface CourseData {
  bootcampTitle: string;
  currentWeek: number;
  currentDay: number;
  status: {
    COMPLETED: string;
    CURRENT: string;
    UPCOMING: string;
  };
  bootcampWeeks: Week[];
  weekDays: DayNode[];
} 