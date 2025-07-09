
import React, { useState, useEffect } from "react";
import { Module, ModuleContent } from "../../data/mockData";
import { ArrowLeft, Play, FileText, Video, Image, X } from "lucide-react";
import { ContentSkeleton } from "../ui/module-skeleton";

interface ModuleContentPageProps {
  module: Module;
  onBack: () => void;
  onAIToolSelect?: (toolType: "summary" | "quiz" | "chat", module: Module, content?: ModuleContent) => void;
  selectedContent?: ModuleContent | null;
  onDeselectContent?: () => void;
  onContentSelect?: (content: ModuleContent) => void;
}

export const ModuleContentPage: React.FC<ModuleContentPageProps> = ({ 
  module, 
  onBack, 
  onAIToolSelect,
  selectedContent,
  onDeselectContent,
  onContentSelect
}) => {
  const [activeContent, setActiveContent] = useState<ModuleContent | null>(selectedContent || null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Update local state when selectedContent prop changes
  useEffect(() => {
    setActiveContent(selectedContent || null);
  }, [selectedContent]);

  const handleContentSelect = (content: ModuleContent) => {
    setActiveContent(content);
    if (onContentSelect) {
      onContentSelect(content);
    }
  };

  const handleDeselectContent = () => {
    setActiveContent(null);
    if (onDeselectContent) {
      onDeselectContent();
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      case "image":
        return <Image className="w-5 h-5" />;
      default:
        return <Play className="w-5 h-5" />;
    }
  };

  const getContentColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-red-600 bg-red-50";
      case "document":
        return "text-blue-600 bg-blue-50";
      case "image":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-[#f7f8f9]">
        <ContentSkeleton />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#f7f8f9]">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#007aff] hover:text-[#0056b3] transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Modules</span>
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00A3FF] to-[#0066FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {module.moduleCode.substring(0, 2)}
            </span>
          </div>
          <div>
            <h1 className="text-gray-900 text-3xl font-bold mb-2">
              {module.title}
            </h1>
            <p className="text-gray-600 text-lg">{module.moduleCode}</p>
          </div>
        </div>

        {/* Selected Content Display */}
        {activeContent && (
          <div className="mb-6 p-4 bg-white rounded-lg border-2 border-[#007aff] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Selected: {activeContent.title}
              </h3>
              <button
                onClick={handleDeselectContent}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Deselect content"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-2">{activeContent.description}</p>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getContentColor(activeContent.type)}`}>
                {getContentIcon(activeContent.type)}
                <span className="ml-1 capitalize">{activeContent.type}</span>
              </span>
              <span className="text-gray-500 text-xs">{activeContent.duration}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content List */}
      <div className="space-y-4">
        <h2 className="text-gray-900 text-xl font-semibold mb-4">
          Module Content
        </h2>
        
        {module.contents.map((content) => (
          <div
            key={content.id}
            className={`bg-white rounded-lg p-6 border transition-all duration-200 cursor-pointer hover:shadow-md ${
              activeContent?.id === content.id 
                ? "border-[#007aff] shadow-lg bg-[#f8faff]" 
                : "border-[#ebecec] hover:border-[#d1d5db]"
            }`}
            onClick={() => handleContentSelect(content)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${getContentColor(content.type)}`}>
                {getContentIcon(content.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {content.description}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getContentColor(content.type)}`}>
                        <span className="capitalize">{content.type}</span>
                      </span>
                      <span className="text-gray-500 text-sm">
                        {content.duration}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {content.size}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
