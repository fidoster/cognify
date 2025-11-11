import { ChevronRight, RotateCcw } from 'lucide-react';

export default function DecisionPath({ path, onReset }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <span className="text-sm font-medium text-gray-600">Your Path:</span>
          {path.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm text-gray-900 bg-indigo-100 px-3 py-1 rounded-full">
                {step.answer}
              </span>
              {index < path.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onReset}
          className="ml-4 flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          title="Start over"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
