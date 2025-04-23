declare module '*/mockdata.json' {
  interface MockData {
    programData: {
      programId: string;
      programName: string;
      startDate: string;
      endDate: string;
      totalWeeks: number;
      currentWeek: number;
    };
    studentData: {
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
    };
    weeklyProgression: {
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
      days: {
        dayId: string;
        dayNumber: number;
        date: string;
        isCompleted: boolean;
        progressPercentage: number;
        topics: {
          topicId: string;
          title: string;
          duration: string;
          isCompleted: boolean;
          completedAt: string;
        }[];
        tasks: {
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
        }[];
        resources: {
          id: string;
          title: string;
          type: string;
          url: string;
        }[];
      }[];
      currentDay?: number;
    }[];
  }
  const value: MockData;
  export default value;
} 