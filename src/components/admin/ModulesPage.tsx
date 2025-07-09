
import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { DataTable } from './DataTable';
import { CRUDModal } from './CRUDModal';
import { DataTableSkeleton } from '../ui/admin-skeleton';

interface Module {
  id: string;
  title: string;
  code: string;
  course: string;
  duration: string;
  status: string;
  credits: number;
  instructor: string;
}

const mockModules: Module[] = [
  { id: '1', title: 'Introduction to Programming', code: 'CS101-M1', course: 'Computer Science', duration: '4 weeks', status: 'Active', credits: 3, instructor: 'Dr. Smith' },
  { id: '2', title: 'Data Structures', code: 'CS101-M2', course: 'Computer Science', duration: '6 weeks', status: 'Active', credits: 4, instructor: 'Dr. Johnson' },
  { id: '3', title: 'Calculus Fundamentals', code: 'MATH101-M1', course: 'Calculus I', duration: '5 weeks', status: 'Draft', credits: 3, instructor: 'Dr. Williams' },
  { id: '4', title: 'Database Design', code: 'CS201-M1', course: 'Database Systems', duration: '8 weeks', status: 'Active', credits: 4, instructor: 'Dr. Brown' },
  { id: '5', title: 'Web Development Basics', code: 'CS102-M1', course: 'Web Development', duration: '6 weeks', status: 'Active', credits: 3, instructor: 'Dr. Davis' },
];

export const ModulesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modules, setModules] = useState<Module[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setModules(mockModules);
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredModules = modules.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedModules = filteredModules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);

  const handleAdd = () => {
    setEditingModule(null);
    setShowModal(true);
  };

  const handleEdit = (item: Module) => {
    setEditingModule(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSave = (moduleData: Partial<Module>) => {
    if (editingModule) {
      // Edit existing
      setModules((prev) =>
        prev.map((m) =>
          m.id === editingModule.id ? { ...m, ...moduleData } : m
        )
      );
    } else {
      // Add new
      const newModule: Module = {
        id: Date.now().toString(),
        title: moduleData.title || "",
        code: moduleData.code || "",
        course: moduleData.course || "",
        duration: moduleData.duration || "",
        status: moduleData.status || "Draft",
        credits: moduleData.credits || 0,
        instructor: moduleData.instructor || "",
      };
      setModules((prev) => [...prev, newModule]);
    }
    setShowModal(false);
  };

  const handleExport = () => {
    console.log('Exporting modules...');
  };

  const handleImport = () => {
    console.log('Importing modules...');
  };

  const columns = [
    { key: 'title', header: 'Module Title' },
    { key: 'code', header: 'Module Code' },
    { key: 'course', header: 'Course' },
    { key: 'duration', header: 'Duration' },
    { key: 'credits', header: 'Credits' },
    { key: 'instructor', header: 'Instructor' },
    { key: 'status', header: 'Status' }
  ];

  const modalFields = [
    {
      key: "title",
      label: "Module Title",
      type: "text" as const,
      required: true,
    },
    {
      key: "code",
      label: "Module Code",
      type: "text" as const,
      required: true,
    },
    {
      key: "course",
      label: "Course",
      type: "text" as const,
      required: true,
    },
    {
      key: "duration",
      label: "Duration",
      type: "text" as const,
      required: true,
    },
    {
      key: "credits",
      label: "Credits",
      type: "text" as const,
      required: true,
    },
    {
      key: "instructor",
      label: "Instructor",
      type: "text" as const,
      required: true,
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      required: true,
      options: ["Active", "Draft", "Inactive"],
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">Module Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-800 border-[0.1px] border-[#e6edfb] pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#b6c2d6]"
            />
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-md transition-all duration-150 ease-in-out shadow-xs hover:shadow-sm"
            >
              <Download className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-sm font-medium">Export</span>
            </button>

            <button 
              onClick={handleImport}
              className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-md transition-all duration-150 ease-in-out shadow-xs hover:shadow-sm"
            >
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
            data={paginatedModules}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredModules.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingModule ? "Edit Module" : "Add New Module"}
          fields={modalFields}
          initialData={editingModule || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
