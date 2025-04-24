'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useOnboardingStore } from '../store/onboardingStore';

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

interface FormData {
  selectedExperiences: string[];
  interestedExperiences: string[];
  additionalExperience: string;
  githubProfile: string;
  linkedinProfile: string;
  githubConnected: boolean;
  linkedinConnected: boolean;
}

type TabType = 'know' | 'want' | 'github' | 'linkedin';

export default function ExperienceForm() {
  const router = useRouter();
  const { data, setData } = useOnboardingStore();
  const [formData, setFormData] = useState({
    selectedExperiences: data.selectedExperiences,
    interestedExperiences: data.interestedExperiences,
    additionalExperience: data.additionalExperience,
    githubProfile: data.githubProfile,
    linkedinProfile: data.linkedinProfile,
    githubConnected: data.githubConnected,
    linkedinConnected: data.linkedinConnected
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('know');

  const filteredOptions = useMemo(() => {
    return experienceOptions.filter(option =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleExperience = (id: string, type: 'know' | 'want') => {
    if (type === 'know') {
      setFormData(prev => ({
        ...prev,
        selectedExperiences: prev.selectedExperiences.includes(id)
          ? prev.selectedExperiences.filter(exp => exp !== id)
          : [...prev.selectedExperiences, id],
        interestedExperiences: prev.interestedExperiences.filter(exp => exp !== id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interestedExperiences: prev.interestedExperiences.includes(id)
          ? prev.interestedExperiences.filter(exp => exp !== id)
          : [...prev.interestedExperiences, id],
        selectedExperiences: prev.selectedExperiences.filter(exp => exp !== id)
      }));
    }
  };

  const handleProfileSubmit = (type: 'github' | 'linkedin') => {
    // In a real implementation, this would trigger the scraping process
    setFormData(prev => ({
      ...prev,
      [`${type}Connected`]: true
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setData(formData);
      console.log('Selected Topics:', JSON.stringify({
        known: formData.selectedExperiences.map(id => {
          const option = experienceOptions.find(opt => opt.id === id);
          return option?.title || '';
        }),
        interested: formData.interestedExperiences.map(id => {
          const option = experienceOptions.find(opt => opt.id === id);
          return option?.title || '';
        }),
        additional: formData.additionalExperience
      }, null, 2));
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting experience:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'know':
      case 'want':
        return (
          <>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search for ${activeTab === 'know' ? 'skills you know' : 'skills you want to learn'}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B2E83] focus:border-transparent"
              />
            </div>

            {/* Selected Experiences */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                {activeTab === 'know' ? 'Your Skills' : 'Skills You Want to Learn'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(activeTab === 'know' ? formData.selectedExperiences : formData.interestedExperiences).map(expId => {
                  const exp = experienceOptions.find(opt => opt.id === expId);
                  return exp ? (
                    <div
                      key={exp.id}
                      className="flex items-center gap-2 bg-[#4B2E83] text-white px-3 py-1 rounded-full"
                    >
                      <span>{exp.title}</span>
                      <button
                        type="button"
                        onClick={() => toggleExperience(exp.id, activeTab)}
                        className="hover:text-gray-200"
                      >
                        ×
                      </button>
                    </div>
                  ) : null;
                })}
                {(activeTab === 'know' ? formData.selectedExperiences : formData.interestedExperiences).length === 0 && (
                  <p className="text-gray-500">No {activeTab === 'know' ? 'skills' : 'interests'} selected yet</p>
                )}
              </div>
            </div>

            {/* Experience Options with Scrollable Container */}
            <div className="relative">
              <div className="h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredOptions.map((option) => {
                    const isSelected = activeTab === 'know' 
                      ? formData.selectedExperiences.includes(option.id)
                      : formData.interestedExperiences.includes(option.id);
                    const isInOtherList = activeTab === 'know'
                      ? formData.interestedExperiences.includes(option.id)
                      : formData.selectedExperiences.includes(option.id);
                    
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleExperience(option.id, activeTab)}
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
      case 'github':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Connect your GitHub profile</h3>
              <p className="text-gray-600 mb-4">
                Connect your GitHub profile to automatically analyze your repositories and skills.
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={formData.githubProfile}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubProfile: e.target.value }))}
                  placeholder="Enter your GitHub username"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B2E83] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleProfileSubmit('github')}
                  className="px-6 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3b2566] transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        );
      case 'linkedin':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Connect your LinkedIn profile</h3>
              <p className="text-gray-600 mb-4">
                Connect your LinkedIn profile to automatically analyze your professional experience and skills.
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                  placeholder="Enter your LinkedIn profile URL"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B2E83] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleProfileSubmit('linkedin')}
                  className="px-6 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3b2566] transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Experience</h2>
        <p className="text-gray-600">
          Tell us about your skills and what you want to learn. This helps us personalize your learning experience.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('know')}
          className={`pb-2 px-4 ${
            activeTab === 'know'
              ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Skills I Know
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('want')}
          className={`pb-2 px-4 ${
            activeTab === 'want'
              ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Skills I Want to Learn
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('github')}
          className={`pb-2 px-4 ${
            activeTab === 'github'
              ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          GitHub
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('linkedin')}
          className={`pb-2 px-4 ${
            activeTab === 'linkedin'
              ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          LinkedIn
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {renderTabContent()}
      </div>

      {/* Additional Experience */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Additional Experience</h3>
        <textarea
          value={formData.additionalExperience}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalExperience: e.target.value }))}
          placeholder="Tell us about any other relevant experience or skills..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B2E83] focus:border-transparent h-32 text-black placeholder-gray-600"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3b2566] transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    </form>
  );
} 