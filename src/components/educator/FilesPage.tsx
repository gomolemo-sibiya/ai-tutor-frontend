
import React, { useState, useEffect } from "react";
import { mockFiles, FileData } from "../../data/mockData";
import {
  Search,
  Download,
  Trash2,
  Upload,
  FileText,
  File,
  Sheet,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { UploadModal } from "./UploadModal";
import { FileSkeleton } from "../ui/admin-skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const FilesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState<string | null>(null);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFiles(mockFiles);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredFiles = files
    .filter((file) => {
      const matchesSearch =
        file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.moduleCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFileType =
        fileTypeFilter === "All" || file.fileType === fileTypeFilter;
      return matchesSearch && matchesFileType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "DOC":
        return <File className="w-5 h-5 text-blue-500" />;
      case "XLS":
        return <Sheet className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleUpload = (newFiles: FileData[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setShowUploadModal(false);
  };

  const handleDelete = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <>
      <div className="flex-1 p-8 min-h-screen bg-[#f7f8f9]">
        <div className="mb-8">
          <h1 className="text-gray-800 text-3xl font-bold mb-4">
            File Management
          </h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
              <input
                type="text"
                placeholder="Search files by title or module code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-gray-800 border-[0.1px] border-[#e6edfb] pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#b6c2d6]"
              />
            </div>

            <div className="flex gap-2">
              <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
                <SelectTrigger className="w-40 bg-white border-[#e6edfb]">
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All File Types</SelectItem>
                  <SelectItem value="DOC">DOC</SelectItem>
                  <SelectItem value="XLS">XLS</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white border-[#e6edfb]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Sort by Title</SelectItem>
                  <SelectItem value="date">Sort by Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 bg-[#007aff] hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Files</span>
          </button>
        </div>

        {/* Files List */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <FileSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {filteredFiles.map((file) => (
                <React.Fragment key={file.id}>
                  <div className="relative w-full">
                    <div className="bg-white rounded-lg p-4 flex flex-col w-full relative z-10 shadow-sm border-[0.1px] border-[#e6edfb]">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.fileType)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-gray-800 font-medium">
                                {file.title}
                              </h3>
                              <span className="text-[#007aff] text-sm bg-[#007bff16] rounded-full px-2 py-0.5">
                                {file.moduleCode}
                              </span>
                              <span className="text-[#b6c2d6] text-sm">•</span>
                              <span className="text-[#007aff] text-sm bg-[#007bff16] rounded-full px-2 py-0.5">
                                {file.category}
                              </span>
                            </div>
                            <p className="text-[#b6c2d6] text-sm mt-1">
                              {file.author}
                            </p>
                            <p className="text-[#b6c2d6] text-xs mt-1">
                              {new Date(file.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex-col flex justify-between gap-5">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="text-[#b6c2d6] hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-all duration-200">
                              <MoreVertical className="w-5 h-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg border border-gray-200">
                              <DropdownMenuItem className="flex items-center text-[#007aff] hover:bg-gray-50 cursor-pointer">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center text-red-600 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleDelete(file.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          {/* Description toggle icon at bottom right */}
                          <div className="flex justify-end mt-2">
                            <button
                              className="text-[#b6c2d6] hover:text-gray-700 focus:outline-none p-1 rounded hover:bg-gray-100 transition-all duration-200"
                              onClick={() =>
                                setExpandedDescriptionId(
                                  expandedDescriptionId === file.id ? null : file.id
                                )
                              }
                              aria-label={
                                expandedDescriptionId === file.id
                                  ? "Hide description"
                                  : "Show description"
                              }
                            >
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  expandedDescriptionId === file.id
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description with smooth animation */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        expandedDescriptionId === file.id
                          ? "max-h-40 opacity-100 mt-[-5px]"
                          : "max-h-0 opacity-0"
                      }`}
                      style={{ zIndex: 0 }}
                    >
                      <div className="p-4 bg-[#2c2c36] rounded-b-lg rounded-t-none shadow-sm border-[0.1px] border-t-0 border-[#e6edfb]">
                        <p className="text-white text-sm">Description</p>
                        <p className="text-[#d2d2d2] text-sm">
                          {file.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        {!isLoading && filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#b6c2d6] text-lg">
              No files found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};
