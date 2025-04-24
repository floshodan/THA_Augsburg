'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useOnboardingStore } from '../store/onboardingStore';

interface FormData {
  firstName: string;
  lastName: string;
  profilePicture?: File;
  hideEmail: boolean;
  experience: string;
  goal: 'frontend' | 'backend' | 'fullstack';
  preferences: string[];
  learningStyle: 'visual' | 'auditory' | 'hands-on';
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const { data, setData } = useOnboardingStore();
  const [formData, setFormData] = useState<FormData>({
    firstName: data.firstName,
    lastName: data.lastName,
    hideEmail: data.hideEmail,
    experience: data.experience,
    goal: data.goal,
    preferences: data.preferences,
    learningStyle: data.learningStyle,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setData(formData);
      console.log('Formular abgeschlossen:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profilePicture: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Log in</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B2E83] focus:border-[#4B2E83]"
              />
              {formData.firstName && (
                <span className="absolute right-3 text-green-500">✓</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4B2E83] focus:border-[#4B2E83]"
              />
              {formData.lastName && (
                <span className="absolute right-3 text-green-500">✓</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile picture</label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {formData.profilePicture ? (
                    <Image
                      src={URL.createObjectURL(formData.profilePicture)}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400">📷</span>
                  )}
                </div>
                <label className="cursor-pointer text-[#4B2E83] hover:text-[#3b2566]">
                  Upload a profile picture
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="hideEmail"
                checked={formData.hideEmail}
                onChange={handleChange}
                className="h-4 w-4 text-[#4B2E83] focus:ring-[#4B2E83] border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Hide email
              </label>
            </div>
          </div>

          <div className="pt-5">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4B2E83] hover:bg-[#3b2566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E83]"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="mt-4">
          <a href="#" className="text-sm text-[#4B2E83] hover:text-[#3b2566]">
            Change your password
          </a>
        </div>
      </div>
    </div>
  );
} 