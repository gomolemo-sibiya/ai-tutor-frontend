
import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { DataTable } from './DataTable';
import { CRUDModal } from './CRUDModal';
import { DataTableSkeleton } from '../ui/admin-skeleton';

interface Department {
  id: string;
  name: string;
  faculty: string;
  head: string;
  students: number;
}

const mockDepartments: Department[] = [
  { id: '1', name: 'Computer Science', faculty: 'Faculty of Engineering', head: 'Dr. Brown', students: 250 },
  { id: '2', name: 'Mathematics', faculty: 'Faculty of Science', head: 'Dr. Davis', students: 180 },
  { id: '3', name: 'English Literature', faculty: 'Faculty of Arts', head: 'Dr. Wilson', students: 120 },
];

export const DepartmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDepartments(mockDepartments);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredDepartments = departments.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  const handleAdd = () => {
    setEditingDepartment(null);
    setShowModal(true);
  };

  const handleEdit = (item: Department) => {
    setEditingDepartment(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSave = (departmentData: Partial<Department>) => {
    if (editingDepartment) {
      // Edit existing
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === editingDepartment.id ? { ...d, ...departmentData } : d
        )
      );
    } else {
      // Add new
      const newDepartment: Department = {
        id: Date.now().toString(),
        name: departmentData.name || "",
        faculty: departmentData.faculty || "",
        head: departmentData.head || "",
        students: departmentData.students || 0,
      };
      setDepartments((prev) => [...prev, newDepartment]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'name', header: 'Department Name' },
    { key: 'faculty', header: 'Faculty' },
    { key: 'head', header: 'Department Head' },
    { key: 'students', header: 'Students' }
  ];

  const modalFields = [
    {
      key: "name",
      label: "Department Name",
      type: "text" as const,
      required: true,
    },
    {
      key: "faculty",
      label: "Faculty",
      type: "select" as const,
      required: true,
      options: ["Faculty of Engineering", "Faculty of Science", "Faculty of Arts", "Faculty of Business"],
    },
    {
      key: "head",
      label: "Department Head",
      type: "text" as const,
      required: true,
    },
    {
      key: "students",
      label: "Number of Students",
      type: "text" as const,
      required: true,
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">Department Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search departments..."
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
            data={paginatedDepartments}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredDepartments.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingDepartment ? "Edit Department" : "Add New Department"}
          fields={modalFields}
          initialData={editingDepartment || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
