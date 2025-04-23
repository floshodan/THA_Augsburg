import { FaGithub, FaSlack, FaDiscord, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Kontaktiere deinen Lehrer:</span>
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              title="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              title="Slack"
            >
              <FaSlack className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              title="Discord"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
          >
            <FaGithub className="w-5 h-5" />
            <span className="text-sm">Bootcamp Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
} 