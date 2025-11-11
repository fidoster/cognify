import { Brain, ArrowRight } from 'lucide-react';
import { getAllTrees } from '../data/decisionTrees';

export default function Home({ onSelectTree }) {
  const trees = getAllTrees();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Cognify
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-Powered Interactive Decision Trees
          </p>
          <p className="text-gray-500 mt-2">
            Navigate complex decisions with intelligent guidance
          </p>
        </div>

        {/* Decision Trees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trees.map((tree) => (
            <div
              key={tree.id}
              onClick={() => onSelectTree(tree)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-500 overflow-hidden group"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{tree.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tree.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tree.description}
                </p>
                <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform">
                  Start Journey
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Cognify?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Get intelligent suggestions and insights at every step
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Structured</h3>
              <p className="text-gray-600 text-sm">
                Clear decision paths guide you to the right answers
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Insightful</h3>
              <p className="text-gray-600 text-sm">
                Analyze your decision path and get actionable recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>Navigate complex decisions with confidence</p>
        </div>
      </div>
    </div>
  );
}
