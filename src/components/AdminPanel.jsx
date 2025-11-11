import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Settings, Key, Sliders, Palette, FileText, BarChart3,
  Check, AlertCircle, Download, Upload, Trash2, Save
} from 'lucide-react';
import { aiService } from '../services/aiService';

export default function AdminPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('providers');
  const [settings, setSettings] = useState(aiService.settings);
  const [provider, setProvider] = useState(aiService.provider);
  const [apiKeys, setApiKeys] = useState({
    anthropic: '',
    openai: '',
    gemini: '',
    deepseek: ''
  });
  const [providerStatus, setProviderStatus] = useState(aiService.getAllProviderStatus());
  const [usage, setUsage] = useState(aiService.usage);
  const [templates, setTemplates] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'default');
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  useEffect(() => {
    // Load templates
    const savedTemplates = localStorage.getItem('prompt_templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      setTemplates([
        { id: 1, name: 'Career Decision', prompt: 'I want to explore my career options' },
        { id: 2, name: 'Business Strategy', prompt: 'How should I approach my business strategy?' },
        { id: 3, name: 'Problem Solving', prompt: 'I need help solving a complex problem' }
      ]);
    }
  }, []);

  const handleSaveApiKey = (prov) => {
    aiService.setApiKey(prov, apiKeys[prov]);
    setProviderStatus(aiService.getAllProviderStatus());
    showNotification();
  };

  const handleProviderChange = (prov) => {
    setProvider(prov);
    aiService.setProvider(prov);
    showNotification();
  };

  const handleSettingsChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    aiService.updateSettings(newSettings);
    showNotification();
  };

  const handleModelChange = (prov, model) => {
    const newSettings = {
      ...settings,
      model: { ...settings.model, [prov]: model }
    };
    setSettings(newSettings);
    aiService.updateSettings(newSettings);
    showNotification();
  };

  const showNotification = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 2000);
  };

  const exportSettings = () => {
    const data = {
      settings,
      provider,
      templates,
      theme,
      usage
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cognify-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.settings) {
            setSettings(data.settings);
            aiService.updateSettings(data.settings);
          }
          if (data.provider) {
            setProvider(data.provider);
            aiService.setProvider(data.provider);
          }
          if (data.templates) {
            setTemplates(data.templates);
            localStorage.setItem('prompt_templates', JSON.stringify(data.templates));
          }
          if (data.theme) {
            setTheme(data.theme);
            localStorage.setItem('theme', data.theme);
          }
          showNotification();
        } catch (error) {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetUsage = () => {
    if (confirm('Are you sure you want to reset usage statistics?')) {
      aiService.resetUsage();
      setUsage(aiService.usage);
      showNotification();
    }
  };

  const addTemplate = () => {
    const name = prompt('Template name:');
    const promptText = prompt('Template prompt:');
    if (name && promptText) {
      const newTemplates = [...templates, { id: Date.now(), name, prompt: promptText }];
      setTemplates(newTemplates);
      localStorage.setItem('prompt_templates', JSON.stringify(newTemplates));
      showNotification();
    }
  };

  const deleteTemplate = (id) => {
    const newTemplates = templates.filter(t => t.id !== id);
    setTemplates(newTemplates);
    localStorage.setItem('prompt_templates', JSON.stringify(newTemplates));
    showNotification();
  };

  const tabs = [
    { id: 'providers', label: 'AI Providers', icon: <Key className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
    { id: 'templates', label: 'Templates', icon: <FileText className="w-4 h-4" /> },
    { id: 'theme', label: 'Theme', icon: <Palette className="w-4 h-4" /> },
    { id: 'usage', label: 'Usage', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const providers = [
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Most capable, best for complex reasoning',
      models: ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
      placeholder: 'sk-ant-...',
      link: 'https://console.anthropic.com/'
    },
    {
      id: 'openai',
      name: 'OpenAI GPT',
      description: 'Fast and versatile, great all-rounder',
      models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
      placeholder: 'sk-...',
      link: 'https://platform.openai.com/api-keys'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Fast and efficient, great for speed',
      models: ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash'],
      placeholder: 'AIza...',
      link: 'https://aistudio.google.com/app/apikey'
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      description: 'Cost-effective and capable',
      models: ['deepseek-chat', 'deepseek-coder'],
      placeholder: 'sk-...',
      link: 'https://platform.deepseek.com/'
    }
  ];

  const themes = [
    { id: 'default', name: 'Default', colors: 'from-indigo-500 to-purple-600' },
    { id: 'ocean', name: 'Ocean', colors: 'from-blue-500 to-cyan-600' },
    { id: 'sunset', name: 'Sunset', colors: 'from-orange-500 to-pink-600' },
    { id: 'forest', name: 'Forest', colors: 'from-green-500 to-emerald-600' },
    { id: 'dark', name: 'Dark', colors: 'from-gray-700 to-gray-900' }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <p className="text-indigo-100 text-sm">Configure your Cognify experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50 px-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'providers' && (
              <motion.div
                key="providers"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Current Provider:</strong> {aiService.getProviderName()}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Configure at least one provider to use AI features
                  </p>
                </div>

                {providers.map(prov => (
                  <div
                    key={prov.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{prov.name}</h3>
                          {providerStatus[prov.id] && (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <Check className="w-3 h-3" />
                              Configured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{prov.description}</p>
                      </div>
                      {providerStatus[prov.id] && (
                        <button
                          onClick={() => handleProviderChange(prov.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            provider === prov.id
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {provider === prov.id ? 'Active' : 'Use This'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API Key
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={apiKeys[prov.id]}
                            onChange={(e) => setApiKeys({ ...apiKeys, [prov.id]: e.target.value })}
                            placeholder={prov.placeholder}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleSaveApiKey(prov.id)}
                            disabled={!apiKeys[prov.id]}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                        </div>
                        <a
                          href={prov.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-600 hover:underline mt-1 inline-block"
                        >
                          Get API key →
                        </a>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Model
                        </label>
                        <select
                          value={settings.model[prov.id]}
                          onChange={(e) => handleModelChange(prov.id, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          {prov.models.map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">AI Generation Settings</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature (Creativity): {settings.temperature}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.temperature}
                        onChange={(e) => handleSettingsChange('temperature', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Lower = more focused, Higher = more creative
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Options per Node: {settings.optionsCount}
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        step="1"
                        value={settings.optionsCount}
                        onChange={(e) => handleSettingsChange('optionsCount', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Number of options AI generates for each prompt
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Tokens: {settings.maxTokens}
                      </label>
                      <input
                        type="range"
                        min="512"
                        max="4096"
                        step="256"
                        value={settings.maxTokens}
                        onChange={(e) => handleSettingsChange('maxTokens', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum length of AI responses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Import/Export</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={exportSettings}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Export Settings
                    </button>
                    <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5" />
                      Import Settings
                      <input
                        type="file"
                        accept=".json"
                        onChange={importSettings}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'templates' && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Prompt Templates</h3>
                  <button
                    onClick={addTemplate}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    + Add Template
                  </button>
                </div>

                {templates.map(template => (
                  <div
                    key={template.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{template.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{template.prompt}</p>
                      </div>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'theme' && (
              <motion.div
                key="theme"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        localStorage.setItem('theme', t.id);
                        showNotification();
                      }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        theme === t.id
                          ? 'border-indigo-600 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-full h-20 rounded-lg bg-gradient-to-r ${t.colors} mb-3`} />
                      <div className="font-bold text-gray-900">{t.name}</div>
                      {theme === t.id && (
                        <div className="flex items-center gap-1 text-sm text-indigo-600 mt-2">
                          <Check className="w-4 h-4" />
                          Active
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Theme changes will be applied on next page load
                </p>
              </motion.div>
            )}

            {activeTab === 'usage' && (
              <motion.div
                key="usage"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Usage Statistics</h3>
                  <button
                    onClick={resetUsage}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="text-sm opacity-90">Total Requests</div>
                  <div className="text-4xl font-bold mt-2">{usage.totalRequests}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(usage.byProvider).map(([prov, count]) => (
                    <div
                      key={prov}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4"
                    >
                      <div className="text-sm text-gray-600 capitalize">{prov}</div>
                      <div className="text-2xl font-bold text-gray-900 mt-1">{count}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {usage.totalRequests > 0
                          ? `${Math.round((count / usage.totalRequests) * 100)}%`
                          : '0%'}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Save Notification */}
        <AnimatePresence>
          {showSaveNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Settings saved successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
