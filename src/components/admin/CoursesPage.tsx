
import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { DataTable } from './DataTable';
import { CRUDModal } from './CRUDModal';
import { DataTableSkeleton } from '../ui/admin-skeleton';

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  semester: string;
}

const mockCourses: Course[] = [
  { id: '1', name: 'Computer Science', code: 'CS101', department: 'Computer Science', credits: 3, semester: 'Fall 2024' },
  { id: '2', name: 'Calculus I', code: 'MATH101', department: 'Mathematics', credits: 4, semester: 'Fall 2024' },
  { id: '3', name: 'English Composition', code: 'ENG101', department: 'English Literature', credits: 3, semester: 'Fall 2024' },
];

export const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = courses.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handleAdd = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleEdit = (item: Course) => {
    setEditingCourse(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSave = (courseData: Partial<Course>) => {
    if (editingCourse) {
      // Edit existing
      setCourses((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id ? { ...c, ...courseData } : c
        )
      );
    } else {
      // Add new
      const newCourse: Course = {
        id: Date.now().toString(),
        name: courseData.name || "",
        code: courseData.code || "",
        department: courseData.department || "",
        credits: courseData.credits || 0,
        semester: courseData.semester || "",
      };
      setCourses((prev) => [...prev, newCourse]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'name', header: 'Course Name' },
    { key: 'code', header: 'Course Code' },
    { key: 'department', header: 'Department' },
    { key: 'credits', header: 'Credits' },
    { key: 'semester', header: 'Semester' }
  ];

  const modalFields = [
    {
      key: "name",
      label: "Course Name",
      type: "text" as const,
      required: true,
    },
    {
      key: "code",
      label: "Course Code",
      type: "text" as const,
      required: true,
    },
    {
      key: "department",
      label: "Department",
      type: "select" as const,
      required: true,
      options: ["Computer Science", "Mathematics", "English Literature", "Physics", "Chemistry"],
    },
    {
      key: "credits",
      label: "Credits",
      type: "text" as const,
      required: true,
    },
    {
      key: "semester",
      label: "Semester",
      type: "select" as const,
      required: true,
      options: ["Fall 2024", "Spring 2024", "Summer 2024", "Fall 2025", "Spring 2025"],
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">Course Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search courses..."
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
            data={paginatedCourses}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredCourses.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingCourse ? "Edit Course" : "Add New Course"}
          fields={modalFields}
          initialData={editingCourse || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
