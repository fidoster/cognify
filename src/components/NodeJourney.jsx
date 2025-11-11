import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Home as HomeIcon, Settings } from 'lucide-react';
import DecisionNode from './DecisionNode';
import PromptInput from './PromptInput';
import JourneySummary from './JourneySummary';
import { aiService } from '../services/aiService';

export default function NodeJourney({ onGoHome, onOpenSettings, aiEnabled }) {
  const [nodes, setNodes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [error, setError] = useState(null);

  const addNode = async (prompt) => {
    if (!aiEnabled) {
      setError('Please configure your API key in settings to use AI features.');
      return;
    }

    setError(null);
    const nodeId = `node-${Date.now()}`;
    const newNode = {
      id: nodeId,
      prompt,
      options: [],
      selectedOption: null,
      depth: nodes.length
    };

    setNodes([...nodes, newNode]);
    setIsGenerating(true);

    try {
      const context = nodes.map(n => ({
        prompt: n.prompt,
        selectedOption: n.selectedOption?.title
      }));

      const options = await aiService.generateOptionsFromPrompt(prompt, context);

      setNodes(prev => prev.map(n =>
        n.id === nodeId ? { ...n, options } : n
      ));
    } catch (error) {
      console.error('Failed to generate options:', error);
      setError('Failed to generate options. Please check your API key and try again.');
      setNodes(prev => prev.filter(n => n.id !== nodeId));
    } finally {
      setIsGenerating(false);
    }
  };

  const selectOption = (nodeId, option) => {
    setNodes(prev => prev.map(n =>
      n.id === nodeId ? { ...n, selectedOption: option } : n
    ));
  };

  const continueJourney = async (nextPrompt) => {
    await addNode(nextPrompt);
  };

  const completeJourney = () => {
    if (nodes.length === 0) {
      setError('Start a journey first before completing it!');
      return;
    }
    setShowSummary(true);
  };

  const startNewJourney = () => {
    setNodes([]);
    setShowSummary(false);
    setError(null);
  };

  const currentActiveNode = nodes.find(n => !n.selectedOption);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onGoHome}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Home"
              >
                <HomeIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Decision Journey</h1>
                <p className="text-sm text-gray-500">
                  {nodes.length > 0 ? `${nodes.length} step${nodes.length > 1 ? 's' : ''} explored` : 'Start your journey'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {nodes.length > 0 && !showSummary && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={completeJourney}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors shadow-md text-sm font-medium"
                >
                  <Flag className="w-4 h-4" />
                  Complete Journey
                </motion.button>
              )}
              <button
                onClick={onOpenSettings}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className={`w-5 h-5 ${aiEnabled ? 'text-purple-600' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {showSummary ? (
            <JourneySummary
              key="summary"
              nodes={nodes}
              onStartNew={startNewJourney}
            />
          ) : (
            <motion.div
              key="journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Welcome / Instructions */}
              {nodes.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="text-6xl mb-6"
                  >
                    🧠
                  </motion.div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Start Your Decision Journey
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    Enter any question, problem, or decision you're facing.
                    AI will help you explore options, consider alternatives, and make better choices.
                  </p>
                  {!aiEnabled && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 max-w-md mx-auto mb-6"
                    >
                      <p className="text-yellow-800 text-sm">
                        ⚠️ Configure your API key in settings to enable AI features
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6 max-w-2xl mx-auto"
                >
                  <p className="text-red-800">{error}</p>
                </motion.div>
              )}

              {/* Nodes */}
              <div className="mb-8">
                {nodes.map((node, index) => (
                  <DecisionNode
                    key={node.id}
                    node={node}
                    isActive={!node.selectedOption}
                    onSelectOption={selectOption}
                    isGenerating={isGenerating && index === nodes.length - 1}
                    depth={index}
                  />
                ))}
              </div>

              {/* Prompt Input */}
              <div className="sticky bottom-6">
                {(!currentActiveNode || currentActiveNode?.selectedOption) && (
                  <PromptInput
                    onSubmit={currentActiveNode?.selectedOption?.nextPrompt
                      ? continueJourney
                      : addNode
                    }
                    placeholder={
                      currentActiveNode?.selectedOption?.nextPrompt ||
                      (nodes.length > 0
                        ? "What's your next question?"
                        : "What decision or problem are you working on?")
                    }
                    isLoading={isGenerating}
                    showSuggestions={nodes.length === 0}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
