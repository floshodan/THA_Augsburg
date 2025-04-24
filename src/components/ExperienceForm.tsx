'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';

interface ExperienceOption {
  id: string;
  title: string;
  category: 'language' | 'framework' | 'tool' | 'field' | 'skill';
}

const experienceOptions: ExperienceOption[] = [
  // Languages
  { id: 'javascript', title: 'JavaScript', category: 'language' },
  { id: 'typescript', title: 'TypeScript', category: 'language' },
  { id: 'python', title: 'Python', category: 'language' },
  { id: 'java', title: 'Java', category: 'language' },
  { id: 'csharp', title: 'C#', category: 'language' },
  { id: 'php', title: 'PHP', category: 'language' },
  { id: 'ruby', title: 'Ruby', category: 'language' },
  { id: 'go', title: 'Go', category: 'language' },
  { id: 'rust', title: 'Rust', category: 'language' },
  { id: 'swift', title: 'Swift', category: 'language' },
  { id: 'kotlin', title: 'Kotlin', category: 'language' },
  { id: 'scala', title: 'Scala', category: 'language' },
  { id: 'r', title: 'R', category: 'language' },
  { id: 'sql', title: 'SQL', category: 'language' },
  
  // Frontend Frameworks
  { id: 'react', title: 'React', category: 'framework' },
  { id: 'vue', title: 'Vue.js', category: 'framework' },
  { id: 'angular', title: 'Angular', category: 'framework' },
  { id: 'svelte', title: 'Svelte', category: 'framework' },
  { id: 'nextjs', title: 'Next.js', category: 'framework' },
  { id: 'nuxt', title: 'Nuxt.js', category: 'framework' },
  
  // Backend Frameworks
  { id: 'nodejs', title: 'Node.js', category: 'framework' },
  { id: 'express', title: 'Express.js', category: 'framework' },
  { id: 'django', title: 'Django', category: 'framework' },
  { id: 'flask', title: 'Flask', category: 'framework' },
  { id: 'spring', title: 'Spring', category: 'framework' },
  { id: 'laravel', title: 'Laravel', category: 'framework' },
  { id: 'rails', title: 'Ruby on Rails', category: 'framework' },
  
  // Mobile Frameworks
  { id: 'reactnative', title: 'React Native', category: 'framework' },
  { id: 'flutter', title: 'Flutter', category: 'framework' },
  { id: 'xamarin', title: 'Xamarin', category: 'framework' },
  
  // Tools & Technologies
  { id: 'git', title: 'Git', category: 'tool' },
  { id: 'docker', title: 'Docker', category: 'tool' },
  { id: 'kubernetes', title: 'Kubernetes', category: 'tool' },
  { id: 'aws', title: 'AWS', category: 'tool' },
  { id: 'azure', title: 'Azure', category: 'tool' },
  { id: 'gcp', title: 'Google Cloud', category: 'tool' },
  { id: 'jenkins', title: 'Jenkins', category: 'tool' },
  { id: 'terraform', title: 'Terraform', category: 'tool' },
  
  // Study Fields
  { id: 'cs', title: 'Computer Science', category: 'field' },
  { id: 'se', title: 'Software Engineering', category: 'field' },
  { id: 'ai', title: 'Artificial Intelligence', category: 'field' },
  { id: 'ml', title: 'Machine Learning', category: 'field' },
  { id: 'ds', title: 'Data Science', category: 'field' },
  { id: 'cybersecurity', title: 'Cybersecurity', category: 'field' },
  { id: 'ux', title: 'User Experience', category: 'field' },
  { id: 'ui', title: 'User Interface', category: 'field' },
  
  // Skills
  { id: 'agile', title: 'Agile Methodologies', category: 'skill' },
  { id: 'scrum', title: 'Scrum', category: 'skill' },
  { id: 'tdd', title: 'Test-Driven Development', category: 'skill' },
  { id: 'ci', title: 'Continuous Integration', category: 'skill' },
  { id: 'cd', title: 'Continuous Deployment', category: 'skill' },
  { id: 'devops', title: 'DevOps', category: 'skill' },
  { id: 'microservices', title: 'Microservices', category: 'skill' },
  { id: 'rest', title: 'RESTful APIs', category: 'skill' },
  { id: 'graphql', title: 'GraphQL', category: 'skill' },
];

interface ExperienceData {
  knowledge: string[];
  wantKnow: string[];
  description: string;
}

const defaultExperienceData: ExperienceData = {
  knowledge: [],
  wantKnow: [],
  description: 'No description provided'
};

export default function ExperienceForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ExperienceData>(defaultExperienceData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'knowledge' | 'wantKnow' | 'description'>('knowledge');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredOptions = useMemo(() => {
    return experienceOptions.filter(option =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleExperience = (id: string, type: 'know' | 'want') => {
    if (type === 'know') {
      setFormData(prev => ({
        ...prev,
        knowledge: prev.knowledge.includes(id)
          ? prev.knowledge.filter(exp => exp !== id)
          : [...prev.knowledge, id],
        wantKnow: prev.wantKnow.filter(exp => exp !== id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        wantKnow: prev.wantKnow.includes(id)
          ? prev.wantKnow.filter(exp => exp !== id)
          : [...prev.wantKnow, id],
        knowledge: prev.knowledge.filter(exp => exp !== id)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Ensure we have valid data
      const dataToSubmit = {
        knowledge: formData.knowledge.length > 0 ? formData.knowledge : defaultExperienceData.knowledge,
        wantKnow: formData.wantKnow.length > 0 ? formData.wantKnow : defaultExperienceData.wantKnow,
        description: formData.description.trim() || defaultExperienceData.description
      };
      
      // Save the data to localStorage
      localStorage.setItem('experienceData', JSON.stringify(dataToSubmit));
      
      // Navigate to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'knowledge':
      case 'wantKnow':
        return (
          <>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search for ${activeTab === 'knowledge' ? 'skills you know' : 'skills you want to learn'}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B2E83] focus:border-transparent"
              />
            </div>

            {/* Selected Experiences */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                {activeTab === 'knowledge' ? 'Your Skills' : 'Skills You Want to Learn'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(activeTab === 'knowledge' ? formData.knowledge : formData.wantKnow).map(expId => {
                  const exp = experienceOptions.find(opt => opt.id === expId);
                  return exp ? (
                    <div
                      key={exp.id}
                      className="flex items-center gap-2 bg-[#4B2E83] text-white px-3 py-1 rounded-full"
                    >
                      <span>{exp.title}</span>
                      <button
                        type="button"
                        onClick={() => toggleExperience(exp.id, activeTab === 'knowledge' ? 'know' : 'want')}
                        className="hover:text-gray-200"
                      >
                        ×
                      </button>
                    </div>
                  ) : null;
                })}
                {(activeTab === 'knowledge' ? formData.knowledge : formData.wantKnow).length === 0 && (
                  <p className="text-gray-500">No {activeTab === 'knowledge' ? 'skills' : 'interests'} selected yet</p>
                )}
              </div>
            </div>

            {/* Experience Options with Scrollable Container */}
            <div className="relative">
              <div className="h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredOptions.map((option) => {
                    const isSelected = activeTab === 'knowledge' 
                      ? formData.knowledge.includes(option.id)
                      : formData.wantKnow.includes(option.id);
                    const isInOtherList = activeTab === 'knowledge'
                      ? formData.wantKnow.includes(option.id)
                      : formData.knowledge.includes(option.id);
                    
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleExperience(option.id, activeTab === 'knowledge' ? 'know' : 'want')}
                        disabled={isInOtherList}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'border-[#4B2E83] bg-[#4B2E83] text-white'
                            : isInOtherList
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'border-gray-200 hover:border-[#4B2E83] bg-white text-gray-700'
                        }`}
                      >
                        <span>{option.title}</span>
                        <span className="text-lg">
                          {isSelected ? '×' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </>
        );

      case 'description':
        return (
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Über dich
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B2E83] focus:border-[#4B2E83]"
              placeholder="Erzähl etwas über dich..."
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Deine Erfahrungen</h2>
          <p className="mt-2 text-lg text-gray-600">
            Teile uns dein Wissen und deine Ziele mit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tab Selection */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('knowledge')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'knowledge'
                  ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dein Wissen
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wantKnow')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'wantKnow'
                  ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Was möchtest du lernen?
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'description'
                  ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Über dich
            </button>
          </div>

          {renderTabContent()}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#4B2E83] hover:bg-[#3b2566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E83] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Speichern...' : 'Weiter zum Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 