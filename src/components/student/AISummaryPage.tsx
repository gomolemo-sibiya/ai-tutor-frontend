
import React, { useState } from "react";
import { Module, ModuleContent } from "../../data/mockData";
import { ArrowLeft, Save, FileText, Video, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISummaryPageProps {
  module: Module;
  selectedContent: ModuleContent | null;
  summaryData: {
    title: string;
    content: string;
    images?: string[];
  };
  onBack: () => void;
}

export const AISummaryPage: React.FC<AISummaryPageProps> = ({
  module,
  selectedContent,
  summaryData,
  onBack,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate saving the summary as a file component
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Summary Saved",
        description: `Summary has been saved to ${module.moduleCode}`,
      });
    }, 1000);
  };

  const getIcon = (fileType: string) => {
    switch (fileType) {
      case "Video":
        return <Video className="w-4 h-4 text-red-500" />;
      case "PDF":
        return <FileText className="w-4 h-4 text-[#007aff]" />;
      case "Word":
        return <File className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case "Video":
        return "bg-red-50 text-red-700";
      case "Syllabus":
        return "bg-blue-50 text-[#007aff]";
      case "Notes":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#007aff] hover:text-[#0046cf] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Module</span>
          </button>

          {/* Summary Header Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-gray-900 text-3xl font-bold mb-2">
                  {summaryData.title}
                </h1>
                <p className="text-gray-600 mb-2">
                  Summary for: {selectedContent ? selectedContent.title : module.title}
                </p>
                <p className="text-gray-500 text-sm">Module: {module.moduleCode}</p>
                
                {/* Content Card if specific content is selected */}
                {selectedContent && (
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      {getIcon(selectedContent.fileType)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedContent.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(
                              selectedContent.contentType
                            )}`}
                          >
                            {selectedContent.contentType}
                          </span>
                          <span className="text-gray-500 text-xs">{selectedContent.fileType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#007aff] to-[#0066cc] hover:from-[#0066cc] hover:to-[#0052a3] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Summary"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
              {summaryData.content}
            </div>
            
            {/* Images Section */}
            {summaryData.images && summaryData.images.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summaryData.images.map((image, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={`https://images.unsplash.com/${image}?w=400&h=300&fit=crop`}
                        alt={`Summary illustration ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>AI Generated Summary</span>
            </div>
            <span>•</span>
            <span>Generated: {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>Module: {module.moduleCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
