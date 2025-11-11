import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Target, ArrowRight, Network } from 'lucide-react';
import { aiService } from '../services/aiService';

export default function Home({ onStartJourney, aiEnabled }) {
  const features = [
    {
      icon: <Network className="w-8 h-8" />,
      title: "Interactive Nodes",
      description: "Explore decisions through connected nodes that expand as you go"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Get intelligent options and insights generated specifically for your situation"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Dynamic Exploration",
      description: "Each choice opens new possibilities - explore multiple paths"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Summary",
      description: "Receive AI-generated insights and actionable recommendations"
    }
  ];

  const examples = [
    { emoji: "💼", text: "Career decisions", gradient: "from-blue-500 to-indigo-600" },
    { emoji: "🚀", text: "Business strategy", gradient: "from-purple-500 to-pink-600" },
    { emoji: "💡", text: "Problem solving", gradient: "from-green-500 to-teal-600" },
    { emoji: "🎯", text: "Life choices", gradient: "from-orange-500 to-red-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 3, -3, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Cognify
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-6">
            AI-Powered Interactive Decision Pathfinder
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Navigate complex decisions through an interactive node-based journey.
            AI helps you explore options, consider alternatives, and make better choices.
          </p>

          {!aiEnabled ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 max-w-md mx-auto mb-8"
            >
              <p className="text-yellow-800 font-medium">
                ⚠️ Configure your API key in admin panel to enable AI features
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 max-w-md mx-auto mb-8"
            >
              <p className="text-green-800 font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Powered by {aiService.getProviderName()}
              </p>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartJourney}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all"
          >
            <Sparkles className="w-6 h-6" />
            Start Your Journey
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Perfect for any decision
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${example.gradient} p-6 rounded-xl shadow-lg text-white text-center cursor-pointer`}
              >
                <div className="text-4xl mb-3">{example.emoji}</div>
                <div className="font-semibold">{example.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-12 mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-4">
            Ready to make better decisions?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartJourney}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
