
import React, { useState, useEffect } from 'react';
import { mockFiles } from '../../data/mockData';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { DataTable } from './DataTable';
import { CRUDModal } from './CRUDModal';
import { DataTableSkeleton } from '../ui/admin-skeleton';

interface FileData {
  id: string;
  title: string;
  moduleCode: string;
  fileType: string;
  category: string;
  author: string;
  date: string;
}

export const AdminFilesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState<FileData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFile, setEditingFile] = useState<FileData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFiles(mockFiles);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredFiles = files.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.moduleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  const handleAdd = () => {
    setEditingFile(null);
    setShowModal(true);
  };

  const handleEdit = (file: FileData) => {
    setEditingFile(file);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSave = (fileData: Partial<FileData>) => {
    if (editingFile) {
      // Edit existing
      setFiles((prev) =>
        prev.map((f) =>
          f.id === editingFile.id ? { ...f, ...fileData } : f
        )
      );
    } else {
      // Add new
      const newFile: FileData = {
        id: Date.now().toString(),
        title: fileData.title || "",
        moduleCode: fileData.moduleCode || "",
        fileType: fileData.fileType || "",
        category: fileData.category || "",
        author: fileData.author || "",
        date: new Date().toLocaleDateString(),
      };
      setFiles((prev) => [...prev, newFile]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'title', header: 'File Title' },
    { key: 'moduleCode', header: 'Module Code' },
    { key: 'fileType', header: 'File Type' },
    { key: 'category', header: 'Category' },
    { key: 'author', header: 'Author' },
    { key: 'date', header: 'Upload Date' }
  ];

  const modalFields = [
    {
      key: "title",
      label: "File Title",
      type: "text" as const,
      required: true,
    },
    {
      key: "moduleCode",
      label: "Module Code",
      type: "text" as const,
      required: true,
    },
    {
      key: "fileType",
      label: "File Type",
      type: "select" as const,
      required: true,
      options: ["PDF", "DOC", "PPT", "XLS", "TXT", "ZIP"],
    },
    {
      key: "category",
      label: "Category",
      type: "select" as const,
      required: true,
      options: ["Lecture Notes", "Assignment", "Lab Manual", "Reference", "Other"],
    },
    {
      key: "author",
      label: "Author",
      type: "text" as const,
      required: true,
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">File Management</h1>
        
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-800 border-[0.1px] border-[#e6edfb] pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#b6c2d6]"
            />
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-md transition-all duration-150 ease-in-out shadow-xs hover:shadow-sm">
              <Download className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm font-medium">Export</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-md transition-all duration-150 ease-in-out shadow-xs hover:shadow-sm">
              <Upload className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm font-medium">Import</span>
            </button>

            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 bg-[#090909] hover:bg-[#2c2c36] text-white px-4 py-2.5 rounded-md transition-all duration-150 ease-in-out shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm font-medium">Add New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-6">
            <DataTableSkeleton />
          </div>
        ) : (
          <DataTable
            data={paginatedFiles}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredFiles.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingFile ? "Edit File" : "Add New File"}
          fields={modalFields}
          initialData={editingFile || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
