import { ChevronRight } from 'lucide-react';

export default function NodeView({ node, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {node.question}
      </h2>

      <div className="space-y-4">
        {node.options.map((option, index) => (
          <button
            key={option.id || index}
            onClick={() => onSelect(option)}
            className="w-full text-left p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-indigo-600">
                  {option.text}
                </div>
                {option.description && (
                  <div className="text-gray-600 text-sm">
                    {option.description}
                  </div>
                )}
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
