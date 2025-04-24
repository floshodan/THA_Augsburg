import { create } from 'zustand';

interface OnboardingData {
  firstName: string;
  lastName: string;
  profilePicture?: File;
  hideEmail: boolean;
  experience: string;
  goal: 'frontend' | 'backend' | 'fullstack';
  preferences: string[];
  learningStyle: 'visual' | 'auditory' | 'hands-on';
  selectedExperiences: string[];
  interestedExperiences: string[];
  additionalExperience: string;
  githubProfile: string;
  linkedinProfile: string;
  githubConnected: boolean;
  linkedinConnected: boolean;
}

interface OnboardingStore {
  data: OnboardingData;
  setData: (data: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const initialState: OnboardingData = {
  firstName: '',
  lastName: '',
  hideEmail: false,
  experience: '',
  goal: 'frontend',
  preferences: [],
  learningStyle: 'visual',
  selectedExperiences: [],
  interestedExperiences: [],
  additionalExperience: '',
  githubProfile: '',
  linkedinProfile: '',
  githubConnected: false,
  linkedinConnected: false,
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: initialState,
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  resetData: () => set({ data: initialState }),
})); 