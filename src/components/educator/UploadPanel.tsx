
import React from 'react';
import { Upload, Video, Image, FileText, Code, TrendingUp, Clock } from 'lucide-react';

interface UploadPanelProps {
  onUploadClick: () => void;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ onUploadClick }) => {
  const uploadStats = [
    { label: 'Files Uploaded Today', value: '12', icon: TrendingUp },
    { label: 'Total Storage Used', value: '2.4 GB', icon: FileText },
    { label: 'Last Upload', value: '2 hours ago', icon: Clock }
  ];

  const supportedTypes = [
    { name: 'Videos', icon: Video, types: 'MP4, AVI, MOV', color: 'text-red-400' },
    { name: 'Images', icon: Image, types: 'JPG, PNG, GIF', color: 'text-blue-400' },
    { name: 'Documents', icon: FileText, types: 'PDF, DOC, DOCX', color: 'text-green-400' },
    { name: 'Scripts', icon: Code, types: 'JS, PY, HTML', color: 'text-purple-400' }
  ];

  return (
    <div className="w-80 bg-gray-800 p-6">
      <div className="mb-6">
        <h2 className="text-white text-xl font-bold mb-4">Upload Center</h2>
        
        {/* Upload Button */}
        <button
          onClick={onUploadClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <Upload className="w-6 h-6" />
          <span className="font-semibold">Upload Files</span>
        </button>
        
        <p className="text-gray-400 text-xs mt-2 text-center">
          Drag and drop files or click to browse • Max 25MB per file
        </p>
      </div>

      {/* Upload Stats */}
      <div className="mb-6">
        <h3 className="text-white font-semibold mb-3">Upload Statistics</h3>
        <div className="space-y-3">
          {uploadStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{stat.label}</span>
                  </div>
                  <span className="text-white font-semibold">{stat.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supported File Types */}
      <div>
        <h3 className="text-white font-semibold mb-3">Supported File Types</h3>
        <div className="space-y-3">
          {supportedTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div key={index} className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${type.color}`} />
                  <div>
                    <p className="text-white text-sm font-medium">{type.name}</p>
                    <p className="text-gray-400 text-xs">{type.types}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-3">Recent Uploads</h3>
        <div className="space-y-2">
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-white text-sm">Lecture 5 Notes.pdf</p>
            <p className="text-gray-400 text-xs">CS101 • 2 hours ago</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-white text-sm">Assignment Guidelines.doc</p>
            <p className="text-gray-400 text-xs">CS201 • 5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};
