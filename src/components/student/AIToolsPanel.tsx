
import React, { useState } from 'react';
import { Module, ModuleContent } from '../../data/mockData';
import { Brain, MessageSquare, FileQuestion, Sparkles, AlertCircle } from 'lucide-react';

interface AIToolsPanelProps {
  selectedModule: Module | null;
  selectedContent?: ModuleContent | null;
  onAIToolSelect?: (toolType: "summary" | "quiz" | "chat", module: Module, content?: ModuleContent) => void;
}

export const AIToolsPanel: React.FC<AIToolsPanelProps> = ({ 
  selectedModule, 
  selectedContent,
  onAIToolSelect 
}) => {
  const [activeAITool, setActiveAITool] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIToolClick = (tool: string) => {
    if (!selectedModule || !onAIToolSelect) return;
    
    // Enforce content selection for all AI tools
    if (!selectedContent) {
      return;
    }
    
    setActiveAITool(tool);
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Navigate to appropriate page based on tool type
      if (tool === 'summary') {
        onAIToolSelect('summary', selectedModule, selectedContent);
      } else if (tool === 'quiz') {
        onAIToolSelect('quiz', selectedModule, selectedContent);
      } else if (tool === 'chat') {
        onAIToolSelect('chat', selectedModule, selectedContent);
      }
    }, 2000);
  };

  const aiTools = [
    {
      id: 'summary',
      name: 'Summarize',
      icon: Brain,
      description: 'Get a summary of the content',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'quiz',
      name: 'Generate Quiz',
      icon: FileQuestion,
      description: 'Create a quiz based on the content',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'chat',
      name: 'AI Chat',
      icon: MessageSquare,
      description: 'Ask questions about the material',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="w-80 bg-[#edeff1] p-6 h-full">
      <div className="mb-6">
        <h2 className="text-gray-900 text-xl font-bold mb-2">AI Tools</h2>
        {/* {!selectedModule ? (
          <p className="text-gray-500 text-sm">Select a module to enable AI tools</p>
        ) : !selectedContent ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <p className="text-amber-700 text-sm font-medium">Select content first</p>
            </div>
            <p className="text-amber-600 text-xs mt-1">Choose a specific content item to use AI tools</p>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-700 text-sm font-medium">Ready for AI tools</p>
            <p className="text-blue-600 text-xs mt-1">Selected: {selectedContent.title}</p>
          </div>
        )} */}
      </div>

      <div className="space-y-4">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          const isDisabled = !selectedModule || !selectedContent;
          
          return (
            <button
              key={tool.id}
              onClick={() => handleAIToolClick(tool.id)}
              disabled={isDisabled || isGenerating}
              className={`w-full p-4 rounded-xl transition-all duration-200 shadow-sm ${
                isDisabled || isGenerating
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : `bg-gradient-to-r ${tool.color} hover:shadow-lg hover:scale-105 cursor-pointer text-white border border-transparent`
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${isDisabled ? 'text-gray-600' : 'text-white'}`}>{tool.name}</h3>
                  <p className={`text-sm ${isDisabled ? 'text-gray-500' : 'text-white text-opacity-80'}`}>{tool.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Generation Status */}
      {isGenerating && (
        <div className="mt-6 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h3 className="text-gray-900 font-semibold">AI Processing</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-gray-600 text-sm">Generating AI content...</span>
          </div>
        </div>
      )}
    </div>
  );
};
