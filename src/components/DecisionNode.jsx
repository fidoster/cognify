import { motion } from 'framer-motion';
import { Sparkles, Check, ChevronRight, Loader2 } from 'lucide-react';

export default function DecisionNode({
  node,
  isActive,
  onSelectOption,
  isGenerating,
  depth = 0
}) {
  const getNodeColor = (depth) => {
    const colors = [
      'from-blue-500 to-indigo-600',
      'from-purple-500 to-pink-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
    ];
    return colors[depth % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="mb-8"
    >
      {/* Node Header */}
      <motion.div
        className={`bg-gradient-to-r ${getNodeColor(depth)} p-6 rounded-t-xl shadow-lg text-white`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {node.selectedOption ? (
              <Check className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm opacity-90 mb-1">Step {depth + 1}</div>
            <h3 className="text-xl font-bold leading-tight">{node.prompt}</h3>
            {node.selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-white/20 backdrop-blur-sm rounded-lg p-3"
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Check className="w-4 h-4" />
                  Selected: {node.selectedOption.title}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Options Panel */}
      {isActive && !node.selectedOption && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-b-xl shadow-lg border-x-2 border-b-2 border-gray-200"
        >
          {isGenerating ? (
            <div className="p-8 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
              <p className="text-gray-600">AI is generating options for you...</p>
            </div>
          ) : node.options && node.options.length > 0 ? (
            <div className="p-6 space-y-3">
              <p className="text-sm font-medium text-gray-500 mb-4">Choose a direction:</p>
              {node.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onSelectOption(node.id, option)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover:text-indigo-700 mb-1">
                        {option.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.description}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No options available. Try a different prompt.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Connection Line */}
      {node.selectedOption && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          className="w-1 h-8 bg-gradient-to-b from-gray-300 to-transparent mx-auto"
        />
      )}
    </motion.div>
  );
}
