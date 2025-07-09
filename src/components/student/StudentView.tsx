
import React, { useState } from "react";
import { User } from "../../pages/Index";
import { Sidebar } from "../common/Sidebar";
import { ModulesPage } from "./ModulesPage";
import { ModuleContentPage } from "./ModuleContentPage";
import { ChatInterface } from "./ChatInterface";
import { AISummaryPage } from "./AISummaryPage";
import { AIQuizPage } from "./AIQuizPage";
import { StudentProfile } from "./StudentProfile";
import { AISummaryLoadingSkeleton, AIQuizLoadingSkeleton } from "../ui/ai-skeleton";
import { Module, ModuleContent } from "../../data/mockData";

interface StudentViewProps {
  user: User;
  onLogout: () => void;
}

export const StudentView: React.FC<StudentViewProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedContent, setSelectedContent] = useState<ModuleContent | null>(null);
  const [aiPageType, setAIPageType] = useState<"summary" | "quiz" | null>(null);
  const [aiData, setAIData] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setActiveTab("content");
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedContent(null);
    setAIPageType(null);
    setAIData(null);
    setActiveTab("modules");
  };

  const handleBackToModuleContent = () => {
    setAIPageType(null);
    setAIData(null);
    setActiveTab("content");
  };

  // Add content deselection handler
  const handleDeselectContent = () => {
    setSelectedContent(null);
  };

  const handleAIToolSelect = (toolType: "summary" | "quiz" | "chat", module: Module, content?: ModuleContent) => {
    setSelectedModule(module);
    setSelectedContent(content || null);
    
    if (toolType === "chat") {
      setActiveTab("chat");
    } else {
      setIsLoadingAI(true);
      setAIPageType(toolType);
      
      // Simulate AI generation delay
      setTimeout(() => {
        // Generate mock AI data
        const mockData = toolType === "summary" 
          ? {
              title: `AI Summary: ${content ? content.title : module.title}`,
              content: `This is a comprehensive summary of ${content ? content.title : module.title}.\n\nKey points covered:\n\n• Understanding the fundamental concepts\n• Practical applications and examples\n• Common challenges and solutions\n• Best practices and recommendations\n\nThe content provides detailed insights into the subject matter, helping students grasp complex topics through clear explanations and structured learning paths.`,
              images: ["photo-1649972904349-6e44c42644a7", "photo-1488590528505-98d2b5aba04b"]
            }
          : {
              title: `AI Quiz: ${content ? content.title : module.title}`,
              timeLimit: 30,
              questions: [
                {
                  id: "1",
                  type: "multiple-choice" as const,
                  question: "What is the main topic covered in this module?",
                  options: ["Basic concepts", "Advanced techniques", "Practical applications", "All of the above"],
                  correctAnswer: "All of the above"
                },
                {
                  id: "2", 
                  type: "true-false" as const,
                  question: "This module covers both theoretical and practical aspects.",
                  correctAnswer: "true"
                },
                {
                  id: "3",
                  type: "short-answer" as const,
                  question: "Name one key benefit of studying this subject."
                },
                {
                  id: "4",
                  type: "long-answer" as const,
                  question: "Explain how you would apply the concepts learned in this module to a real-world scenario."
                }
              ]
            };
        
        setAIData(mockData);
        setIsLoadingAI(false);
      }, 2500);
    }
  };

  // Determine if right sidebar should be shown - FIXED to exclude AI pages
  const shouldShowRightSidebar = () => {
    // Only show right sidebar for chat, modules, and content pages (NOT for AI pages or profile)
    return (activeTab === "chat" || activeTab === "modules" || activeTab === "content") && !aiPageType && !isLoadingAI;
  };

  // Determine margin classes based on sidebar visibility
  const getContentMarginClass = () => {
    if (shouldShowRightSidebar()) {
      return "ml-64 mr-80"; // Left sidebar + right sidebar
    }
    return "ml-64"; // Only left sidebar
  };

  const renderContent = () => {
    // Show loading skeletons during AI generation
    if (isLoadingAI && aiPageType === "summary") {
      return <AISummaryLoadingSkeleton />;
    }
    
    if (isLoadingAI && aiPageType === "quiz") {
      return <AIQuizLoadingSkeleton />;
    }
    
    if (aiPageType === "summary" && selectedModule && aiData && !isLoadingAI) {
      return (
        <AISummaryPage
          module={selectedModule}
          selectedContent={selectedContent}
          summaryData={aiData}
          onBack={handleBackToModuleContent}
        />
      );
    }
    
    if (aiPageType === "quiz" && selectedModule && aiData && !isLoadingAI) {
      return (
        <AIQuizPage
          module={selectedModule}
          selectedContent={selectedContent}
          quizData={aiData}
          onBack={handleBackToModuleContent}
        />
      );
    }

    switch (activeTab) {
      case "modules":
        return (
          <ModulesPage 
            onModuleSelect={handleModuleSelect} 
            onAIToolSelect={handleAIToolSelect}
          />
        );
      case "content":
        return selectedModule ? (
          <ModuleContentPage
            module={selectedModule}
            onBack={handleBackToModules}
            onAIToolSelect={handleAIToolSelect}
            selectedContent={selectedContent}
            onDeselectContent={handleDeselectContent}
          />
        ) : (
          <ModulesPage 
            onModuleSelect={handleModuleSelect}
            onAIToolSelect={handleAIToolSelect}
          />
        );
      case "chat":
        return <ChatInterface selectedModule={selectedModule} selectedContent={selectedContent} />;
      case "profile":
        return <StudentProfile user={user} />;
      default:
        return (
          <ModulesPage 
            onModuleSelect={handleModuleSelect}
            onAIToolSelect={handleAIToolSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f9] flex">
      <div className="fixed left-0 top-0 bottom-0">
        <Sidebar
          user={user}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={onLogout}
        />
      </div>
      {/* Main Content Area */}
      <div className={`flex-1 ${getContentMarginClass()} min-h-screen`}>
        <div className="min-h-screen">{renderContent()}</div>
      </div>
      
      {/* Right Sidebar - AI Tools - Only show when appropriate */}
      {shouldShowRightSidebar() && (
        <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#edeff1] overflow-y-auto">
          {(activeTab === "modules" || activeTab === "content") && (
            <div className="p-6">
              {/* AI Tools content will be rendered by the respective pages */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
