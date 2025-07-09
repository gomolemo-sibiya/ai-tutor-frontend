
import React, { useState, useEffect } from "react";
import { mockModules, Module, ModuleContent } from "../../data/mockData";
import { Search, ArrowRight } from "lucide-react";
import { ModuleCardSkeleton } from "../ui/module-skeleton";

interface ModulesPageProps {
  onModuleSelect: (module: Module) => void;
  onAIToolSelect?: (toolType: "summary" | "quiz" | "chat", module: Module, content?: ModuleContent) => void;
  onModuleClick?: (module: Module) => void;
  selectedModule?: Module | null;
}

export const ModulesPage: React.FC<ModulesPageProps> = ({ 
  onModuleSelect,
  onAIToolSelect,
  onModuleClick,
  selectedModule
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay for modules
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredModules = mockModules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.moduleCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigateToContent = (module: Module) => {
    onModuleSelect(module);
  };

  const handleModuleClick = (module: Module) => {
    if (onModuleClick) {
      onModuleClick(module);
    }
  };

  return (
    <div className="p-8 bg-[#f7f8f9]">
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-gray-900 text-3xl font-bold mb-4">
            Learning Modules
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search modules by title or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-800 border-[0.1px] border-[#e6edfb] pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#b6c2d6] shadow-sm"
            />
          </div>
        </div>

        {/* Module Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ModuleCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                className={`bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border-1 relative flex flex-col cursor-pointer hover:scale-[1.02] ${
                  selectedModule?.id === module.id
                    ? "border-[#007aff] shadow-lg"
                    : "border-[#ebecec] shadow-sm"
                }`}
                style={{ minHeight: "380px" }}
                onClick={() => handleModuleClick(module)}
              >
                <div className="h-56 bg-gradient-to-br from-[#00A3FF] to-[#0066FF] relative overflow-hidden">
                  <img
                    src={module.thumbnail}
                    alt={module.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 right-4 bg-[#007aff] text-white px-2 py-1 rounded text-sm">
                    {module.moduleCode}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-gray-900 text-2xl font-semibold mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-base mb-4 line-clamp-2">
                    {module.description}
                  </p>
                  <div className="flex-1"></div>
                  {/* Button at bottom right */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToContent(module);
                      }}
                      className="bg-[#007bff16] hover:bg-[#007bff24] text-[#007aff] p-2 rounded-full transition-all duration-200 flex items-center justify-center hover:scale-110"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredModules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No modules found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
