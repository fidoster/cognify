import { useState } from 'react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import NodeView from './NodeView';
import ResultView from './ResultView';
import AIInsights from './AIInsights';
import DecisionPath from './DecisionPath';

export default function DecisionTreeView({ tree, onBack, aiEnabled }) {
  const [currentNode, setCurrentNode] = useState(tree.rootNode);
  const [path, setPath] = useState([]);
  const [result, setResult] = useState(null);

  const handleOptionSelect = (option) => {
    const newPath = [...path, {
      question: currentNode.question,
      answer: option.text
    }];
    setPath(newPath);

    if (option.result) {
      setResult(option.result);
    } else if (option.nextNode) {
      setCurrentNode(option.nextNode);
    }
  };

  const handleBack = () => {
    if (result) {
      // Go back from result to last node
      setResult(null);
    } else if (path.length > 0) {
      // Navigate back through the tree
      const newPath = [...path];
      newPath.pop();
      setPath(newPath);

      // Reconstruct the node from path
      let node = tree.rootNode;
      for (const step of newPath) {
        const option = node.options.find(opt => opt.text === step.answer);
        if (option && option.nextNode) {
          node = option.nextNode;
        }
      }
      setCurrentNode(node);
    } else {
      onBack();
    }
  };

  const handleReset = () => {
    setCurrentNode(tree.rootNode);
    setPath([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <span className="text-3xl">{tree.icon}</span>
              {tree.title}
            </h1>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>

        {/* Decision Path */}
        {path.length > 0 && (
          <DecisionPath path={path} onReset={handleReset} />
        )}

        {/* AI Badge */}
        {aiEnabled && (
          <div className="mb-4 flex justify-center">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg">
              <Sparkles className="w-4 h-4" />
              AI Insights Enabled
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {result ? (
            <ResultView
              result={result}
              path={path}
              onReset={handleReset}
              aiEnabled={aiEnabled}
            />
          ) : (
            <NodeView
              node={currentNode}
              onSelect={handleOptionSelect}
            />
          )}

          {/* AI Insights */}
          {aiEnabled && !result && (
            <AIInsights
              currentNode={currentNode}
              path={path}
            />
          )}
        </div>
      </div>
    </div>
  );
}
