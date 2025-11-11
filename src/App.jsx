import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import Home from './components/Home';
import DecisionTreeView from './components/DecisionTreeView';
import APIConfig from './components/APIConfig';
import { aiService } from './services/aiService';

function App() {
  const [selectedTree, setSelectedTree] = useState(null);
  const [showAPIConfig, setShowAPIConfig] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [aiEnabled, setAiEnabled] = useState(false);

  useEffect(() => {
    // Load API key from localStorage
    const savedKey = localStorage.getItem('anthropic_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      aiService.setApiKey(savedKey);
      setAiEnabled(true);
    }
  }, []);

  const handleSaveAPIKey = (key) => {
    setApiKey(key);
    localStorage.setItem('anthropic_api_key', key);
    aiService.setApiKey(key);
    setAiEnabled(!!key);
  };

  const handleRemoveAPIKey = () => {
    setApiKey('');
    localStorage.removeItem('anthropic_api_key');
    aiService.setApiKey(null);
    setAiEnabled(false);
  };

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setShowAPIConfig(true)}
        className="fixed top-4 right-4 z-40 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-indigo-500"
        title="AI Settings"
      >
        <Settings className={`w-6 h-6 ${aiEnabled ? 'text-purple-600' : 'text-gray-600'}`} />
      </button>

      {/* Main Content */}
      {selectedTree ? (
        <DecisionTreeView
          tree={selectedTree}
          onBack={() => setSelectedTree(null)}
          aiEnabled={aiEnabled}
        />
      ) : (
        <Home onSelectTree={setSelectedTree} />
      )}

      {/* API Config Modal */}
      {showAPIConfig && (
        <APIConfig
          onSave={handleSaveAPIKey}
          onClose={() => setShowAPIConfig(false)}
          currentKey={apiKey}
        />
      )}
    </div>
  );
}

export default App;
