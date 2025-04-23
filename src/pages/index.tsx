import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import OnboardingForm from '../components/OnboardingForm';
import Navbar from '../components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <OnboardingForm />
      </main>
    </div>
  );
}
