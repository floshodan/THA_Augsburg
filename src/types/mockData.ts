export interface Topic {
  topicId: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  completedAt: string;
}

export interface Task {
  taskId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt: string;
  points: number;
  feedback?: {
    score: number;
    comment: string;
  };
}

export interface Day {
  dayId: string;
  dayNumber: number;
  date: string;
  isCompleted: boolean;
  progressPercentage: number;
  topics: Topic[];
  tasks: Task[];
  resources: {
    id: string;
    title: string;
    type: string;
    url: string;
  }[];
}

export interface Week {
  weekId: string;
  weekNumber: number;
  theme: string;
  startDate: string;
  endDate: string;
  isCurrentWeek: boolean;
  isCompleted: boolean;
  progressPercentage: number;
  totalTasks: number;
  completedTasks: number;
  days: Day[];
  currentDay?: number;
}

export interface StudentData {
  studentId: string;
  name: string;
  email: string;
  enrollmentDate: string;
  overallProgress: number;
  streak: number;
  lastLogin: string;
  completedCourses: string[];
  inProgressCourses: string[];
  earnedBadges: {
    id: string;
    name: string;
    dateEarned: string;
    description: string;
  }[];
}

export interface ProgramData {
  programId: string;
  programName: string;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  currentWeek: number;
}

export interface MockData {
  programData: ProgramData;
  studentData: StudentData;
  weeklyProgression: Week[];
} 