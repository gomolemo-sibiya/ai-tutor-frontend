
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { StudentLayout } from '../components/student/StudentLayout';
import { ModulesPage } from '../components/student/ModulesPage';
import { ModuleContentPage } from '../components/student/ModuleContentPage';
import { AISummaryPage } from '../components/student/AISummaryPage';
import { AIQuizPage } from '../components/student/AIQuizPage';
import { ChatInterface } from '../components/student/ChatInterface';
import { StudentProfile } from '../components/student/StudentProfile';
import { AIToolsPanel } from '../components/student/AIToolsPanel';
import { User } from '../pages/Index';
import { mockModules, Module, ModuleContent } from '../data/mockData';

// Global state for selected content (in a real app, this would use context or state management)
let globalSelectedContent: ModuleContent | null = null;
let globalSelectedModule: Module | null = null;

// Wrapper component for ModulesPage
const ModulesPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleModuleSelect = (module: Module) => {
    navigate(`/student/modules/${module.id}`);
  };

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
  };

  const handleAIToolSelect = (toolType: "summary" | "quiz" | "chat", module: Module, content?: ModuleContent) => {
    globalSelectedModule = module;
    globalSelectedContent = content || null;
    
    if (toolType === 'chat') {
      navigate('/student/chat');
    } else if (content) {
      navigate(`/student/modules/${module.id}/content/${content.id}/${toolType}`);
    } else {
      navigate(`/student/modules/${module.id}/${toolType}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8f9]">
      {/* Main Content Area */}
      <div className="flex-1 mr-80">
        <ModulesPage 
          onModuleSelect={handleModuleSelect} 
          onAIToolSelect={handleAIToolSelect}
          onModuleClick={handleModuleClick}
          selectedModule={selectedModule}
        />
      </div>
      
      {/* Right Sidebar - AI Tools */}
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#edeff1] overflow-y-auto">
        <AIToolsPanel 
          selectedModule={selectedModule} 
          onAIToolSelect={handleAIToolSelect}
        />
      </div>
    </div>
  );
};

// Wrapper component for ModuleContentPage
const ModuleContentPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [selectedContent, setSelectedContent] = useState<ModuleContent | null>(globalSelectedContent);
  
  const module = mockModules.find(m => m.id === moduleId);
  
  if (!module) {
    return <Navigate to="/student/modules" replace />;
  }

  const handleBack = () => {
    globalSelectedContent = null;
    globalSelectedModule = null;
    navigate('/student/modules');
  };

  const handleAIToolSelect = (toolType: "summary" | "quiz" | "chat", module: Module, content?: ModuleContent) => {
    globalSelectedModule = module;
    globalSelectedContent = content || null;
    
    if (toolType === 'chat') {
      navigate('/student/chat');
    } else if (content) {
      navigate(`/student/modules/${module.id}/content/${content.id}/${toolType}`);
    } else {
      navigate(`/student/modules/${module.id}/${toolType}`);
    }
  };

  const handleContentSelect = (content: ModuleContent) => {
    setSelectedContent(content);
    globalSelectedContent = content;
    globalSelectedModule = module;
  };

  const handleDeselectContent = () => {
    setSelectedContent(null);
    globalSelectedContent = null;
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8f9]">
      {/* Main Content Area */}
      <div className="flex-1 mr-80">
        <ModuleContentPage 
          module={module} 
          onBack={handleBack}
          onAIToolSelect={handleAIToolSelect}
          selectedContent={selectedContent}
          onDeselectContent={handleDeselectContent}
          onContentSelect={handleContentSelect}
        />
      </div>
      
      {/* Right Sidebar - AI Tools */}
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#edeff1] overflow-y-auto">
        <AIToolsPanel 
          selectedModule={module}
          selectedContent={selectedContent}
          onAIToolSelect={handleAIToolSelect}
        />
      </div>
    </div>
  );
};

// Wrapper component for AISummaryPage
const AISummaryPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId, contentId } = useParams();
  
  const module = mockModules.find(m => m.id === moduleId);
  const selectedContent = contentId ? module?.contents.find(c => c.id === contentId) || null : null;
  
  if (!module) {
    return <Navigate to="/student/modules" replace />;
  }

  const handleBack = () => {
    if (contentId) {
      navigate(`/student/modules/${moduleId}`);
    } else {
      navigate('/student/modules');
    }
  };

  // Mock summary data
  const summaryData = {
    title: `AI Summary: ${selectedContent ? selectedContent.title : module.title}`,
    content: `This is a comprehensive AI-generated summary of ${selectedContent ? selectedContent.title : module.title}. The content covers key concepts, important points, and provides a structured overview to help with understanding and retention.`,
    images: ['photo-1516321318423-f06f85e504b3', 'photo-1434030216411-0b793f4b4173']
  };

  return (
    <AISummaryPage 
      module={module}
      selectedContent={selectedContent}
      summaryData={summaryData}
      onBack={handleBack}
    />
  );
};

// Wrapper component for AIQuizPage
const AIQuizPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId, contentId } = useParams();
  
  const module = mockModules.find(m => m.id === moduleId);
  const selectedContent = contentId ? module?.contents.find(c => c.id === contentId) || null : null;
  
  if (!module) {
    return <Navigate to="/student/modules" replace />;
  }

  const handleBack = () => {
    if (contentId) {
      navigate(`/student/modules/${moduleId}`);
    } else {
      navigate('/student/modules');
    }
  };

  // Mock quiz data
  const quizData = {
    title: `AI Quiz: ${selectedContent ? selectedContent.title : module.title}`,
    timeLimit: 30,
    questions: [
      {
        id: '1',
        type: 'multiple-choice' as const,
        question: 'What is the main topic of this content?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A'
      },
      {
        id: '2',
        type: 'true-false' as const,
        question: 'This statement is correct based on the content.',
        correctAnswer: 'true'
      }
    ]
  };

  return (
    <AIQuizPage 
      module={module}
      selectedContent={selectedContent}
      quizData={quizData}
      onBack={handleBack}
    />
  );
};

// Wrapper component for ChatInterface
const ChatInterfaceWrapper: React.FC = () => {
  return (
    <ChatInterface 
      selectedModule={globalSelectedModule} 
      selectedContent={globalSelectedContent}
    />
  );
};

// Wrapper component for StudentProfile
const StudentProfileWrapper: React.FC = () => {
  const user: User = JSON.parse(localStorage.getItem('aiTutorUser') || '{"name":"","email":"","role":"student"}');
  return <StudentProfile user={user} />;
};

const StudentRoutes: React.FC = () => {
  return (
    <StudentLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/student/modules" replace />} />
        <Route path="/modules" element={<ModulesPageWrapper />} />
        <Route path="/modules/:moduleId" element={<ModuleContentPageWrapper />} />
        <Route path="/modules/:moduleId/content/:contentId/summary" element={<AISummaryPageWrapper />} />
        <Route path="/modules/:moduleId/content/:contentId/quiz" element={<AIQuizPageWrapper />} />
        <Route path="/modules/:moduleId/summary" element={<AISummaryPageWrapper />} />
        <Route path="/modules/:moduleId/quiz" element={<AIQuizPageWrapper />} />
        <Route path="/chat" element={<ChatInterfaceWrapper />} />
        <Route path="/profile" element={<StudentProfileWrapper />} />
      </Routes>
    </StudentLayout>
  );
};

export default StudentRoutes;
