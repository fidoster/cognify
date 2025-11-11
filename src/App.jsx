import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import Home from './components/Home';
import NodeJourney from './components/NodeJourney';
import AdminPanel from './components/AdminPanel';
import { aiService } from './services/aiService';

function App() {
  const [showJourney, setShowJourney] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
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
    setShowAdmin(false);
    checkAIStatus(); // Recheck status after closing admin
  };

  return (
    <div className="relative">
      {/* Settings Button - Only show on home */}
      {!showJourney && (
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed top-4 right-4 z-40 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-indigo-500"
          title="Admin Panel"
        >
          <Settings className={`w-6 h-6 ${aiEnabled ? 'text-purple-600' : 'text-gray-600'}`} />
        </button>
      )}

      {/* Main Content */}
      {showJourney ? (
        <NodeJourney
          onGoHome={() => setShowJourney(false)}
          onOpenSettings={() => setShowAdmin(true)}
          aiEnabled={aiEnabled}
        />
      ) : (
        <Home
          onStartJourney={() => setShowJourney(true)}
          aiEnabled={aiEnabled}
        />
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel
          onClose={handleAdminClose}
        />
      )}
    </div>
  );
}

export default App;
