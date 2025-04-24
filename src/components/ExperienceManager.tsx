import { useState } from 'react';
import ExperienceForm from './ExperienceForm';
import ChatBot from './ChatBot';

interface ExperienceData {
  knowledge: string;
  wantKnow: string;
  description: string;
}

export default function ExperienceManager() {
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);

  const handleExperienceSubmit = (data: ExperienceData) => {
    setExperienceData(data);
  };

  return (
    <div className="space-y-8">
      {!experienceData ? (
        <ExperienceForm onExperienceSubmit={handleExperienceSubmit} />
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Deine Erfahrungen</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Dein Wissen</h3>
                <p className="text-gray-600">{experienceData.knowledge}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Was du lernen möchtest</h3>
                <p className="text-gray-600">{experienceData.wantKnow}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Über dich</h3>
                <p className="text-gray-600">{experienceData.description}</p>
              </div>
            </div>
          </div>
          <ChatBot experienceData={experienceData} />
        </div>
      )}
    </div>
  );
} 