
import React from "react";
import { Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  header: string;
}

interface DataTableProps {
  data: any[];
  columns: { key: string; header: string }[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  showActions?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showActions = true,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="rounded-lg shadow-sm overflow-hidden">
      {/* Horizontally scrollable table container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#f4f5f9]">
          {/* Table Header */}
          <thead className="bg-[#EDEFF2]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-[#090909] tracking-wider uppercase whitespace-nowrap"
                >
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-[#090909] tracking-wider uppercase whitespace-nowrap"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-[#fafcff] divide-y divide-[#EDEFF2]">
            {data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td
                    key={`${item.id}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-[#090909]"
                  >
                    {item[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-[#007aff] hover:text-[#007aff] mr-4"
                    >
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-[#EDEFF2] px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              currentPage !== 1 ? "bg-[#e5e7eb] hover:bg-gray-200" : ""
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-[#007aff] text-white"
                    : "text-gray-700 bg-[#EDEFF2] hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              currentPage !== totalPages ? "bg-[#e5e7eb] hover:bg-gray-200" : ""
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
