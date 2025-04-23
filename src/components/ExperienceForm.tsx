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
  const [formData, setFormData] = useState<FormData>({
    selectedExperiences: [],
    interestedExperiences: [],
    additionalExperience: '',
    githubProfile: '',
    linkedinProfile: '',
    githubConnected: false,
    linkedinConnected: false
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
      // Create a simplified JSON object with just titles
      const selectedTopics = {
        known: formData.selectedExperiences.map(id => {
          const option = experienceOptions.find(opt => opt.id === id);
          return option?.title || '';
        }),
        interested: formData.interestedExperiences.map(id => {
          const option = experienceOptions.find(opt => opt.id === id);
          return option?.title || '';
        }),
        additional: formData.additionalExperience
      };

      console.log('Selected Topics:', JSON.stringify(selectedTopics, null, 2));
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
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border-2 ${
              formData.githubConnected
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">GitHub Profile</h3>
                    <p className="text-gray-600">Connect your GitHub account to automatically import your repositories and contributions</p>
                  </div>
                </div>
                {formData.githubConnected ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Connected</span>
                  </div>
                ) : null}
              </div>
              
              {!formData.githubConnected && (
                <div className="mt-6">
                  <div className="flex space-x-4">
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
                      className="px-4 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3b2566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E83]"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'linkedin':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl border-2 ${
              formData.linkedinConnected
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">LinkedIn Profile</h3>
                    <p className="text-gray-600">Connect your LinkedIn account to automatically import your work experience and skills</p>
                  </div>
                </div>
                {formData.linkedinConnected ? (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Connected</span>
                  </div>
                ) : null}
              </div>
              
              {!formData.linkedinConnected && (
                <div className="mt-6">
                  <div className="flex space-x-4">
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
                      className="px-4 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#3b2566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E83]"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Select Your Experience</h2>
          <p className="mt-2 text-lg text-gray-600">
            Choose what you know and what you want to learn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tab Selection */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('know')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'know'
                  ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              What I Know
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('want')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'want'
                  ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              What I Want to Learn
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('github')}
              className={`px-4 py-2 text-sm font-medium ${
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
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'linkedin'
                  ? 'border-b-2 border-[#4B2E83] text-[#4B2E83]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              LinkedIn
            </button>
          </div>

          {renderTabContent()}

          {/* Additional Experience */}
          {activeTab === 'know' || activeTab === 'want' ? (
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Experience or Details
              </label>
              <textarea
                value={formData.additionalExperience}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  additionalExperience: e.target.value
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B2E83] focus:border-[#4B2E83]"
                placeholder="Tell us more about your specific experiences, projects, or interests..."
              />
            </div>
          ) : null}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#4B2E83] hover:bg-[#3b2566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E83]"
            >
              Continue to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 