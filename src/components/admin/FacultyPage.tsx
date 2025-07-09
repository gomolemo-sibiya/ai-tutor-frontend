
import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { DataTable } from './DataTable';
import { CRUDModal } from './CRUDModal';
import { DataTableSkeleton } from '../ui/admin-skeleton';

interface Faculty {
  id: string;
  name: string;
  dean: string;
  departments: number;
  established: string;
}

const mockFaculty: Faculty[] = [
  { id: '1', name: 'Faculty of Engineering', dean: 'Dr. Smith', departments: 5, established: '1985' },
  { id: '2', name: 'Faculty of Science', dean: 'Dr. Johnson', departments: 8, established: '1978' },
  { id: '3', name: 'Faculty of Arts', dean: 'Dr. Williams', departments: 6, established: '1990' },
];

export const FacultyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFaculty(mockFaculty);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredFaculty = faculty.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dean.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);

  const handleAdd = () => {
    setEditingFaculty(null);
    setShowModal(true);
  };

  const handleEdit = (item: Faculty) => {
    setEditingFaculty(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSave = (facultyData: Partial<Faculty>) => {
    if (editingFaculty) {
      // Edit existing
      setFaculty((prev) =>
        prev.map((f) =>
          f.id === editingFaculty.id ? { ...f, ...facultyData } : f
        )
      );
    } else {
      // Add new
      const newFaculty: Faculty = {
        id: Date.now().toString(),
        name: facultyData.name || "",
        dean: facultyData.dean || "",
        departments: facultyData.departments || 0,
        established: facultyData.established || "",
      };
      setFaculty((prev) => [...prev, newFaculty]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'name', header: 'Faculty Name' },
    { key: 'dean', header: 'Dean' },
    { key: 'departments', header: 'Departments' },
    { key: 'established', header: 'Established' }
  ];

  const modalFields = [
    {
      key: "name",
      label: "Faculty Name",
      type: "text" as const,
      required: true,
    },
    {
      key: "dean",
      label: "Dean",
      type: "text" as const,
      required: true,
    },
    {
      key: "departments",
      label: "Number of Departments",
      type: "text" as const,
      required: true,
    },
    {
      key: "established",
      label: "Established Year",
      type: "text" as const,
      required: true,
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">Faculty Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search faculty..."
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
            data={paginatedFaculty}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredFaculty.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingFaculty ? "Edit Faculty" : "Add New Faculty"}
          fields={modalFields}
          initialData={editingFaculty || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
