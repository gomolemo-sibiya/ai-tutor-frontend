import React, { useState, useEffect } from "react";
import { Module, ModuleContent } from "../../data/mockData";
import {
  ArrowLeft,
  Save,
  Clock,
  Trophy,
  FileText,
  Video,
  File,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "long-answer";
  question: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
}

interface AIQuizPageProps {
  module: Module;
  selectedContent: ModuleContent | null;
  quizData: {
    title: string;
    questions: QuizQuestion[];
    timeLimit: number; // in minutes
  };
  onBack: () => void;
}

export const AIQuizPage: React.FC<AIQuizPageProps> = ({
  module,
  selectedContent,
  quizData,
  onBack,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60); // in seconds
  const [isSaving, setIsSaving] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSave();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((question) => {
      if (
        question.correctAnswer &&
        answers[question.id] === question.correctAnswer
      ) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const handleAutoSave = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    handleSave(true);
  };

  const handleSave = async (isAutoSave = false) => {
    setIsSaving(true);

    const finalScore = score || calculateScore();
    setScore(finalScore);

    // Simulate saving the quiz as a file component
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: isAutoSave ? "Quiz Auto-Saved" : "Quiz Saved",
        description: `Quiz responses saved to ${module.moduleCode}. Score: ${finalScore}%`,
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

  const renderQuestion = (question: QuizQuestion, index: number) => {
    const questionNumber = index + 1;
    const isAnswered = answers[question.id];

    return (
      <div key={question.id} className="mb-8">
        <div className="flex items-start space-x-4">
          {/* Question Number Circle */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              isAnswered
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {questionNumber}
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {question.question}
            </h3>

            {question.type === "multiple-choice" && (
              <div className="space-y-3">
                {question.options?.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="w-4 h-4 text-[#007aff] border-gray-300 focus:ring-[#007aff] focus:ring-2"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {question.type === "true-false" && (
              <div className="flex space-x-8">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={question.id}
                    value="true"
                    checked={answers[question.id] === "true"}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    className="w-4 h-4 text-[#007aff] border-gray-300 focus:ring-[#007aff] focus:ring-2"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                    True
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={question.id}
                    value="false"
                    checked={answers[question.id] === "false"}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    className="w-4 h-4 text-[#007aff] border-gray-300 focus:ring-[#007aff] focus:ring-2"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                    False
                  </span>
                </label>
              </div>
            )}

            {question.type === "short-answer" && (
              <input
                type="text"
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                placeholder="Enter your answer..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
              />
            )}

            {question.type === "long-answer" && (
              <textarea
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                placeholder="Enter your detailed answer..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-transparent resize-vertical bg-gray-50 focus:bg-white transition-colors"
              />
            )}
          </div>
        </div>
      </div>
    );
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

          {/* Quiz Header Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-gray-900 text-3xl font-bold mb-2">
                  {quizData.title}
                </h1>
                <p className="text-gray-600 mb-2">
                  Quiz for:{" "}
                  {selectedContent ? selectedContent.title : module.title}
                </p>
                <p className="text-gray-500 text-sm">
                  Module: {module.moduleCode}
                </p>

                {/* Content Card if specific content is selected */}
                {selectedContent && (
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      {getIcon(selectedContent.fileType)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedContent.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(
                              selectedContent.contentType
                            )}`}
                          >
                            {selectedContent.contentType}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {selectedContent.fileType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quiz Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span
                      className={`font-mono text-xl font-bold ${
                        timeRemaining < 300 ? "text-red-600" : "text-[#007aff]"
                      }`}
                    >
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Time Remaining</p>
                </div>
                {score !== null && (
                  <div className="text-center">
                    <div className="flex items-center space-x-2 text-green-600">
                      <Trophy className="w-5 h-5" />
                      <span className="font-bold text-xl">{score}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Score</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="space-y-8">
            {quizData.questions.map((question, index) =>
              renderQuestion(question, index)
            )}
          </div>
        </div>

        {/* Progress and Save Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Progress: {Object.keys(answers).length} of{" "}
                {quizData.questions.length} questions answered
              </span>
              <span>
                {Math.round(
                  (Object.keys(answers).length / quizData.questions.length) *
                    100
                )}
                % Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#007aff] to-[#0066cc] h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{
                  width: `${
                    (Object.keys(answers).length / quizData.questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving || timeRemaining === 0}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#007aff] to-[#0066cc] hover:from-[#0066cc] hover:to-[#0052a3] disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? "Saving..." : "Save Quiz"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
