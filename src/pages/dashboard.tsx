import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Willkommensbereich */}
          <div className="bg-[#4B2E83] rounded-lg shadow-lg p-6 text-white mb-8">
            <h1 className="text-2xl font-bold mb-2">Willkommen im Bootcamp!</h1>
            <p className="text-gray-100">Dein Weg zum Entwickler beginnt hier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fortschritt */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Dein Fortschritt</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>HTML & CSS Basics</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>JavaScript Fundamentals</span>
                    <span>60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>React Basics</span>
                    <span>40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nächste Aufgaben */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Nächste Aufgaben</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#4B2E83] rounded-full mr-2"></span>
                  <span>JavaScript Arrays & Objects</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#4B2E83] rounded-full mr-2"></span>
                  <span>DOM Manipulation</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#4B2E83] rounded-full mr-2"></span>
                  <span>Event Handling</span>
                </li>
              </ul>
              <button className="mt-4 text-[#4B2E83] hover:text-[#3b2566] font-medium">
                Alle Aufgaben anzeigen →
              </button>
            </div>

            {/* Ressourcen */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Lernressourcen</h2>
              <div className="space-y-4">
                <a href="#" className="block p-3 border border-gray-200 rounded hover:border-[#4B2E83] transition-colors">
                  <h3 className="font-medium">JavaScript Guide</h3>
                  <p className="text-sm text-gray-500">Umfassende Einführung in JavaScript</p>
                </a>
                <a href="#" className="block p-3 border border-gray-200 rounded hover:border-[#4B2E83] transition-colors">
                  <h3 className="font-medium">CSS Flexbox Tutorial</h3>
                  <p className="text-sm text-gray-500">Moderne Layouts mit Flexbox</p>
                </a>
                <a href="#" className="block p-3 border border-gray-200 rounded hover:border-[#4B2E83] transition-colors">
                  <h3 className="font-medium">React Grundlagen</h3>
                  <p className="text-sm text-gray-500">Erste Schritte mit React</p>
                </a>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Kommende Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-[#4B2E83] font-semibold mb-2">Mo, 15. März</div>
                <h3 className="font-medium">JavaScript Workshop</h3>
                <p className="text-sm text-gray-500">Praktische Übungen zu Arrays und Objekten</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-[#4B2E83] font-semibold mb-2">Mi, 17. März</div>
                <h3 className="font-medium">Code Review Session</h3>
                <p className="text-sm text-gray-500">Gemeinsame Code-Besprechung</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-[#4B2E83] font-semibold mb-2">Fr, 19. März</div>
                <h3 className="font-medium">Tech Talk: React</h3>
                <p className="text-sm text-gray-500">Einführung in React Hooks</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 