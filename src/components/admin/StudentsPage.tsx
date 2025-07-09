
import React, { useState, useEffect } from "react";
import { Search, Plus, Download, Upload } from "lucide-react";
import { DataTable } from "./DataTable";
import { CRUDModal } from "./CRUDModal";
import { DataTableSkeleton } from "../ui/admin-skeleton";

interface Student {
  id: string;
  studentNumber: string;
  name: string;
  email: string;
  program: string;
  year: string;
  status: string;
}

export const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  // Mock student data
  const mockStudents: Student[] = [
    {
      id: "1",
      studentNumber: "ST001",
      name: "Alice Johnson",
      email: "alice@email.com",
      program: "Computer Science",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: "2",
      studentNumber: "ST002",
      name: "Bob Smith",
      email: "bob@email.com",
      program: "Information Technology",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: "3",
      studentNumber: "ST003",
      name: "Carol Williams",
      email: "carol@email.com",
      program: "Data Science",
      year: "1st Year",
      status: "Active",
    },
    {
      id: "4",
      studentNumber: "ST004",
      name: "David Brown",
      email: "david@email.com",
      program: "Computer Science",
      year: "4th Year",
      status: "Graduated",
    },
    {
      id: "5",
      studentNumber: "ST005",
      name: "Emma Davis",
      email: "emma@email.com",
      program: "Mathematics",
      year: "2nd Year",
      status: "Active",
    },
  ];

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handleAdd = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    console.log("Delete student:", id);
  };

  const handleSave = (studentData: Partial<Student>) => {
    console.log("Save student:", studentData);
    setShowModal(false);
  };

  const columns = [
    { key: "studentNumber", header: "Student Number" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "program", header: "Program" },
    { key: "year", header: "Year" },
    { key: "status", header: "Status" },
  ];

  const modalFields = [
    {
      key: "studentNumber",
      label: "Student Number",
      type: "text" as const,
      required: true,
    },
    { key: "name", label: "Full Name", type: "text" as const, required: true },
    { key: "email", label: "Email", type: "email" as const, required: true },
    {
      key: "program",
      label: "Program",
      type: "select" as const,
      required: true,
      options: [
        "Computer Science",
        "Information Technology",
        "Data Science",
        "Mathematics",
        "Physics",
        "Chemistry",
      ],
    },
    {
      key: "year",
      label: "Year",
      type: "select" as const,
      required: true,
      options: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      required: true,
      options: ["Active", "Inactive", "Graduated", "Suspended"],
    },
  ];

  return (
    <div className="flex-1 p-8 bg-[#f7f8f9]">
      <div className="mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-4">
          Student Management
        </h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#b6c2d6]" />
            <input
              type="text"
              placeholder="Search students..."
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
              <span className="text-sm font-medium">Add Student</span>
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
            data={paginatedStudents}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredStudents.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {showModal && (
        <CRUDModal
          title={editingStudent ? "Edit Student" : "Add New Student"}
          fields={modalFields}
          initialData={editingStudent || {}}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
