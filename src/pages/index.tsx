import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ExperienceForm from '../components/ExperienceForm';
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
        <ExperienceForm />
      </main>
    </div>
  );
}
