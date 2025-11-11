import { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

export default function AIInsights({ currentNode, path }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInsight();
  }, [currentNode.id]);

  const loadInsight = async () => {
    setLoading(true);
    try {
      const pathText = path.map(p => p.answer).join(' → ');
      const context = pathText || 'Starting decision journey';
      const newInsight = await aiService.getInsight(
        path.map(p => p.answer),
        currentNode.question
      );
      setInsight(newInsight);
    } catch (error) {
      console.error('Failed to load insight:', error);
      setInsight(null);
    } finally {
      setLoading(false);
    }
  };

  if (!insight && !loading) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border-2 border-purple-200">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">
            AI Insight
          </h3>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating insight...
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {insight}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
