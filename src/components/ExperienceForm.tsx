'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

interface ExperienceOption {
  id: string;
  title: string;
  description: string;
}

const experienceOptions: ExperienceOption[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'HTML, CSS, JavaScript, React, etc.'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Python, Java, Node.js, Databases, etc.'
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    description: 'Figma, Adobe XD, Design Principles'
  },
  {
    id: 'data',
    title: 'Data Science',
    description: 'Python, R, Machine Learning, Statistics'
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'iOS, Android, React Native, Flutter'
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Docker, CI/CD, Cloud Services'
  }
];

interface FormData {
  selectedExperiences: string[];
  additionalExperience: string;
}

export default function ExperienceForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    selectedExperiences: [],
    additionalExperience: ''
  });

  const toggleExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedExperiences: prev.selectedExperiences.includes(id)
        ? prev.selectedExperiences.filter(exp => exp !== id)
        : [...prev.selectedExperiences, id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hier würde die API-Integration stattfinden
    try {
      // Beispiel API-Call:
      // await fetch('/api/experience', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log('Submitted data:', formData);
      router.push('/dashboard'); // Navigation zur Dashboard-Seite
    } catch (error) {
      console.error('Error submitting experience:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Erzähl uns von deiner Erfahrung</h2>
          <p className="mt-2 text-lg text-gray-600">
            Wähle alle Bereiche aus, in denen du bereits Erfahrung hast
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experienceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleExperience(option.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-lg ${
                  formData.selectedExperiences.includes(option.id)
                    ? 'border-[#4B2E83] bg-[#4B2E83] text-white'
                    : 'border-gray-200 hover:border-[#4B2E83] bg-white text-gray-700'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className={`text-sm ${
                  formData.selectedExperiences.includes(option.id)
                    ? 'text-gray-100'
                    : 'text-gray-500'
                }`}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weitere Erfahrungen oder Details
            </label>
            <textarea
              value={formData.additionalExperience}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                additionalExperience: e.target.value
              }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B2E83] focus:border-[#4B2E83]"
              placeholder="Erzähle uns mehr über deine spezifischen Erfahrungen, Projekte oder Interessen..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#4B2E83] hover:bg-[#3b2566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E83]"
            >
              Weiter zum Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 