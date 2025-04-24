import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-[#4B2E83] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-12 h-12">
            <Image
              src="/lewagon-icon.png"
              alt="Le Wagon Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-white text-2xl">Le Wagon</div>
        </Link>
        <div className="text-white">
          <FaUserCircle className="w-10 h-10" />
        </div>
      </div>
    </nav>
  );
} 