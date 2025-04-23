import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-[#4B2E83] text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
          <span className="text-white font-semibold">Le</span>
        </div>
        <span className="text-lg font-medium">Le Wagon</span>
      </div>
      <div className="w-8 h-8 bg-white rounded-full"></div>
    </nav>
  );
} 