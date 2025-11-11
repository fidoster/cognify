import { useState, useEffect } from 'react';
import { CheckCircle, RefreshCw, Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

export default function ResultView({ result, path, onReset, aiEnabled }) {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aiEnabled) {
      loadAIAnalysis();
    }
  }, []);

  const loadAIAnalysis = async () => {
    setLoading(true);
    try {
      const pathText = path.map(p => `${p.question}: ${p.answer}`);
      const analysis = await aiService.analyzeDecisionPath(pathText);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Failed to load AI analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h2 className="text-3xl font-bold text-gray-900">
            {result.title}
          </h2>
        </div>

        <p className="text-lg text-gray-700 mb-6">
          {result.description}
        </p>

        {result.recommendations && result.recommendations.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Recommended Next Steps:
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="text-indigo-600 font-bold mt-1">
                    {index + 1}.
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* AI Analysis */}
      {aiEnabled && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              AI Analysis
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing your decision path...
            </div>
          ) : aiAnalysis ? (
            <p className="text-gray-700 leading-relaxed">
              {aiAnalysis}
            </p>
          ) : (
            <p className="text-gray-600">
              Unable to load AI analysis. Check your API configuration.
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </div>
  );
}
