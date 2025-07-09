import React, { useState, useEffect } from "react";
import { mockLecturers, Lecturer } from "../../data/mockData";
import { Search, Plus, Download, Upload } from "lucide-react";
import { DataTable } from "./DataTable";
import { CRUDModal } from "./CRUDModal";
import { DataTableSkeleton } from "../ui/admin-skeleton";

export const LecturersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState<Lecturer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLecturers(mockLecturers);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredLecturers = lecturers.filter(
    (lecturer) =>
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.staffNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedLecturers = filteredLecturers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLecturers.length / itemsPerPage);

  const handleAdd = () => {
    setEditingLecturer(null);
    setShowModal(true);
  };

  const handleEdit = (lecturer: Lecturer) => {
    setEditingLecturer(lecturer);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setLecturers((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSave = (lecturerData: Partial<Lecturer>) => {
    if (editingLecturer) {
      // Edit existing
      setLecturers((prev) =>
        prev.map((l) =>
          l.id === editingLecturer.id ? { ...l, ...lecturerData } : l
        )
      );
    } else {
      // Add new
      const newLecturer: Lecturer = {
        id: Date.now().toString(),
        staffNumber: lecturerData.staffNumber || "",
        name: lecturerData.name || "",
        department: lecturerData.department || "",
        moduleCode: lecturerData.moduleCode || "",
        campus: lecturerData.campus || "",
      };
      setLecturers((prev) => [...prev, newLecturer]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: "staffNumber", header: "Staff Number" },
    { key: "name", header: "Name" },
    { key: "department", header: "Department" },
    { key: "moduleCode", header: "Module Code" },
    { key: "campus", header: "Campus" },
  ];

  const modalFields = [
    {
      key: "staffNumber",
      label: "Staff Number",
      type: "text" as const,
      required: true,
    },
    { key: "name", label: "Full Name", type: "text" as const, required: true },
    {
      key: "department",
      label: "Department",
      type: "select" as const,
      required: true,
      options: [
        "Computer Science",
        "Information Technology",
        "Data Science",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "History",
        "Psychology",
      ],
    },
    {
      key: "moduleCode",
      label: "Module Code",
      type: "text" as const,
      required: true,
    },
    {
      key: "campus",
      label: "Campus",
      type: "select" as const,
      required: true,
      options: ["Main Campus", "North Campus", "South Campus"],
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">
          Lecturer Management
        </h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search lecturers..."
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
            data={paginatedLecturers}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredLecturers.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingLecturer ? "Edit Lecturer" : "Add New Lecturer"}
          fields={modalFields}
          initialData={editingLecturer || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
