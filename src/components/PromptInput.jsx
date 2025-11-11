import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Lightbulb, Loader2 } from 'lucide-react';

export default function PromptInput({ onSubmit, placeholder, isLoading, showSuggestions = true }) {
  const [input, setInput] = useState('');

  const suggestions = [
    "I want to switch careers",
    "Should I start a business?",
    "How do I improve my productivity?",
    "What tech stack should I use?",
    "I need help making a big decision"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!isLoading) {
      onSubmit(suggestion);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder || "What decision or problem are you working on?"}
            disabled={isLoading}
            className="w-full px-6 py-4 pr-14 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-lg shadow-lg disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {showSuggestions && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>Try these:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
