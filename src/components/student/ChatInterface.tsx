
import React, { useState } from "react";
import { Module, ModuleContent } from "../../data/mockData";
import { Send, Plus, Pin, Trash2, MessageSquare, FileText, Video, File } from "lucide-react";

interface ChatInterfaceProps {
  selectedModule: Module | null;
  selectedContent?: ModuleContent | null;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  isPinned: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedModule,
  selectedContent,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedContext, setSelectedContext] = useState("general");

  // Mock chat sessions
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "CS101 Discussion",
      isPinned: true,
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you with Computer Science?",
          isUser: false,
          timestamp: new Date(),
        },
        {
          id: "2",
          content: "Can you explain object-oriented programming?",
          isUser: true,
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Database Queries",
      isPinned: false,
      messages: [
        {
          id: "1",
          content: "I can help you with SQL queries!",
          isUser: false,
          timestamp: new Date(),
        },
      ],
    },
  ]);

  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);

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

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    let newChatId: string | null = null;

    if (!currentChat) {
      // Create a new chat session if none is selected
      const newChat: ChatSession = {
        id: Date.now().toString(),
        title: selectedContent ? selectedContent.title : `Chat ${chatSessions.length + 1}`,
        isPinned: false,
        messages: [newMessage],
      };
      newChatId = newChat.id;
      setChatSessions((prev) => [...prev, newChat]);
      setCurrentChat(newChat);
    } else {
      // Add message to existing chat
      setCurrentChat((prev) => ({
        ...prev!,
        messages: [...prev!.messages, newMessage],
      }));
      // Update chatSessions to reflect the new message
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === currentChat.id
            ? { ...session, messages: [...session.messages, newMessage] }
            : session
        )
      );
    }

    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `That's a great question about ${selectedContent ? selectedContent.title : selectedModule?.title}! Based on the context of ${
          selectedModule?.title || "your selected module"
        }, I can help you understand this concept better. Let me break it down...`,
        isUser: false,
        timestamp: new Date(),
      };

      setCurrentChat((prev) => ({
        ...prev!,
        messages: [...prev!.messages, aiResponse],
      }));
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === (currentChat?.id || newChatId)
            ? { ...session, messages: [...session.messages, aiResponse] }
            : session
        )
      );
      setIsTyping(false);
    }, 2000);
  };

  const handleNewChat = () => {
    setCurrentChat(null);
    setCurrentMessage("");
  };

  const handleSelectChat = (session: ChatSession) => {
    setCurrentChat(session);
  };

  const handleDeleteChat = (sessionId: string) => {
    setChatSessions((prev) =>
      prev.filter((session) => session.id !== sessionId)
    );
    if (currentChat?.id === sessionId) {
      setCurrentChat(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8f9]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen mr-80">
        {/* Content Card - Show selected content */}
        {selectedContent && selectedModule && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-3">
                  {getIcon(selectedContent.fileType)}
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold text-sm">
                      Chatting about: {selectedContent.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(
                          selectedContent.contentType
                        )}`}
                      >
                        {selectedContent.contentType}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {selectedModule.moduleCode} • {selectedContent.fileType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentChat ? (
          <>
            {/* Header - Module Context */}
            <div className="bg-white p-4 sticky top-0 z-10">
              <div className="flex items-center space-x-4 max-w-2xl mx-auto">
                <label className="text-gray-600 text-sm">Module Context:</label>
                <select
                  value={selectedContext}
                  onChange={(e) => setSelectedContext(e.target.value)}
                  className="bg-white text-gray-900 px-3 py-2 rounded-lg border border-[#ebecec] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-transparent text-sm"
                >
                  <option value="general">General Discussion</option>
                  {selectedModule && (
                    <option value={selectedModule.moduleCode}>
                      {selectedModule.title}
                    </option>
                  )}
                </select>
              </div>
            </div>

            {/* Messages - Scrollable area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f7f8f9]">
              {currentChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.isUser
                        ? "bg-[#007aff] text-white"
                        : "bg-white text-gray-900"
                    } shadow-sm`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input - Fixed at bottom */}
            <div className="bg-[#f7f8f9] p-6 sticky bottom-0">
              <div className="flex space-x-2 items-center max-w-2xl mx-auto">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-transparent shadow-sm text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-[#007bff16] hover:bg-[#007bff24] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-[#007aff] p-3 rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="max-w-2xl w-full flex flex-col items-center">
              <h1 className="text-gray-900 text-3xl font-bold mb-8 text-center">
                Get Smarter with AI Tutor
              </h1>
              <div className="flex space-x-2 items-center w-full">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-transparent shadow-sm text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="bg-[#007bff16] hover:bg-[#007bff24] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-[#007aff] p-3 rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Chat History */}
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#edeff1] overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-[#007aff] hover:bg-[#0066cc] text-white px-4 py-3 rounded-lg transition-colors duration-200 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Chat History</h3>
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                    currentChat?.id === session.id
                      ? "bg-[#2c2c36] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  } shadow-sm `}
                  onClick={() => handleSelectChat(session)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium truncate">
                        {session.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {session.isPinned && (
                        <Pin className="w-3 h-3 text-yellow-500" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(session.id);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      currentChat?.id === session.id
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {session.messages.length} messages
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
