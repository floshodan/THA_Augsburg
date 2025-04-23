'use client';

import { useState } from 'react';

interface FormData {
  experience: string;
  goal: 'frontend' | 'backend' | 'fullstack';
  preferences: string[];
  learningStyle: 'visual' | 'auditory' | 'hands-on';
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    experience: '',
    goal: 'frontend',
    preferences: [],
    learningStyle: 'visual',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Hier würde normalerweise die Datenverarbeitung stattfinden
      console.log('Formular abgeschlossen:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, value]
        : prev.preferences.filter(item => item !== value)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Willkommen im Bootcamp!</h2>
          <p className="mt-2 text-gray-600">Bitte beantworte ein paar Fragen, damit wir dich besser kennenlernen können.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Deine Erfahrung</h3>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="Erzähle uns von deiner bisherigen Programmiererfahrung..."
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Dein Ziel</h3>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="frontend">Frontend-Entwicklung</option>
                <option value="backend">Backend-Entwicklung</option>
                <option value="fullstack">Fullstack-Entwicklung</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Deine Präferenzen</h3>
              <div className="space-y-2">
                {['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java'].map((tech) => (
                  <label key={tech} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      value={tech}
                      checked={formData.preferences.includes(tech)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{tech}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Dein Lernstil</h3>
              <div className="space-y-2">
                {[
                  { value: 'visual', label: 'Visuell (Videos, Diagramme)' },
                  { value: 'auditory', label: 'Auditiv (Vorträge, Podcasts)' },
                  { value: 'hands-on', label: 'Praktisch (Übungen, Projekte)' },
                ].map((style) => (
                  <label key={style.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="learningStyle"
                      value={style.value}
                      checked={formData.learningStyle === style.value}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="text-gray-700">{style.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Zurück
              </button>
            )}
            <button
              type="submit"
              className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {step === 4 ? 'Abschließen' : 'Weiter'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-2 rounded-full ${
                  s <= step ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 