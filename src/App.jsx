import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import Home from './components/Home';
import NodeJourney from './components/NodeJourney';
import AdminPanel from './components/AdminPanel';
import { aiService } from './services/aiService';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'journey', 'admin'
  const [aiEnabled, setAiEnabled] = useState(false);

  useEffect(() => {
    // Check if AI is configured
    checkAIStatus();

    // Listen for storage changes (if user opens admin in another tab)
    window.addEventListener('storage', checkAIStatus);
    return () => window.removeEventListener('storage', checkAIStatus);
  }, []);

  const checkAIStatus = () => {
    setAiEnabled(aiService.isConfigured());
  };

  const handleAdminClose = () => {
    setCurrentView('home');
    checkAIStatus(); // Recheck status after closing admin
  };

  return (
    <div className="relative">
      {/* Settings Button - Only show on home */}
      {currentView === 'home' && (
        <button
          onClick={() => setCurrentView('admin')}
          className="fixed top-4 right-4 z-40 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-indigo-500"
          title="Admin Panel"
        >
          <Settings className={`w-6 h-6 ${aiEnabled ? 'text-purple-600' : 'text-gray-600'}`} />
        </button>
      )}

      {/* Main Content - Show one view at a time */}
      {currentView === 'home' && (
        <Home
          onStartJourney={() => setCurrentView('journey')}
          aiEnabled={aiEnabled}
        />
      )}

      {currentView === 'journey' && (
        <NodeJourney
          onGoHome={() => setCurrentView('home')}
          onOpenSettings={() => setCurrentView('admin')}
          aiEnabled={aiEnabled}
        />
      )}

      {currentView === 'admin' && (
        <AdminPanel
          onClose={handleAdminClose}
        />
      )}
    </div>
  );
}

export default App;
