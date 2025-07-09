
import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload } from 'lucide-react';
import { DataTable } from './DataTable';
import { CRUDModal } from './CRUDModal';
import { DataTableSkeleton } from '../ui/admin-skeleton';

interface Campus {
  id: string;
  name: string;
  location: string;
  capacity: number;
  buildings: number;
  established: string;
}

const mockCampus: Campus[] = [
  { id: '1', name: 'Main Campus', location: 'Downtown', capacity: 5000, buildings: 12, established: '1965' },
  { id: '2', name: 'North Campus', location: 'North District', capacity: 3000, buildings: 8, established: '1995' },
  { id: '3', name: 'South Campus', location: 'South District', capacity: 2500, buildings: 6, established: '2005' },
];

export const CampusPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [campus, setCampus] = useState<Campus[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCampus, setEditingCampus] = useState<Campus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCampus(mockCampus);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCampus = campus.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCampus = filteredCampus.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCampus.length / itemsPerPage);

  const handleAdd = () => {
    setEditingCampus(null);
    setShowModal(true);
  };

  const handleEdit = (item: Campus) => {
    setEditingCampus(item);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setCampus((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSave = (campusData: Partial<Campus>) => {
    if (editingCampus) {
      // Edit existing
      setCampus((prev) =>
        prev.map((c) =>
          c.id === editingCampus.id ? { ...c, ...campusData } : c
        )
      );
    } else {
      // Add new
      const newCampus: Campus = {
        id: Date.now().toString(),
        name: campusData.name || "",
        location: campusData.location || "",
        capacity: campusData.capacity || 0,
        buildings: campusData.buildings || 0,
        established: campusData.established || "",
      };
      setCampus((prev) => [...prev, newCampus]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'name', header: 'Campus Name' },
    { key: 'location', header: 'Location' },
    { key: 'capacity', header: 'Capacity' },
    { key: 'buildings', header: 'Buildings' },
    { key: 'established', header: 'Established' }
  ];

  const modalFields = [
    {
      key: "name",
      label: "Campus Name",
      type: "text" as const,
      required: true,
    },
    {
      key: "location",
      label: "Location",
      type: "text" as const,
      required: true,
    },
    {
      key: "capacity",
      label: "Student Capacity",
      type: "text" as const,
      required: true,
    },
    {
      key: "buildings",
      label: "Number of Buildings",
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
        <h1 className="text-gray-800 text-3xl font-bold mb-4">Campus Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search campus..."
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
            data={paginatedCampus}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredCampus.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingCampus ? "Edit Campus" : "Add New Campus"}
          fields={modalFields}
          initialData={editingCampus || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
