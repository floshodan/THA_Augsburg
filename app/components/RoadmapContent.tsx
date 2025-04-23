'use client';

interface RoadmapContentProps {
  week: number;
}

// This is a placeholder for the actual roadmap data
// In a real application, this would come from an API or database
const roadmapData = {
  1: {
    title: "Introduction to Web Development",
    topics: [
      "HTML & CSS Fundamentals",
      "Git & Version Control",
      "JavaScript Basics",
      "Project Setup"
    ],
    milestones: [
      "Complete HTML/CSS exercises",
      "Create first Git repository",
      "Build a simple landing page"
    ]
  },
  2: {
    title: "Advanced JavaScript",
    topics: [
      "ES6+ Features",
      "DOM Manipulation",
      "Async Programming",
      "Error Handling"
    ],
    milestones: [
      "Implement ES6 features in projects",
      "Create interactive web applications",
      "Handle API requests"
    ]
  }
  // Add more weeks as needed
};

export default function RoadmapContent({ week }: RoadmapContentProps) {
  const weekData = roadmapData[week as keyof typeof roadmapData] || {
    title: "Week Not Available",
    topics: [],
    milestones: []
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Week {week}: {weekData.title}
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Topics</h2>
        <ul className="space-y-2">
          {weekData.topics.map((topic, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-[#4B2E83] rounded-full mr-3"></span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Milestones</h2>
        <ul className="space-y-2">
          {weekData.milestones.map((milestone, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-[#4B2E83] rounded-full mr-3"></span>
              {milestone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 