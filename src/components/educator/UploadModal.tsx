
import React, { useState } from 'react';
import { FileData } from '../../data/mockData';
import { X, Upload, Check, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (files: FileData[]) => void;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

export const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [step, setStep] = useState(1);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [metadata, setMetadata] = useState({
    module: '',
    contentType: '',
    theme: '',
    author: 'Current User'
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 25 * 1024 * 1024; // 25MB
      return isValidType && isValidSize;
    });

    const newUploadFiles: UploadFile[] = validFiles.map(file => ({
      file,
      id: Date.now().toString() + Math.random().toString(),
      progress: 0,
      status: 'pending'
    }));

    setUploadFiles(prev => [...prev, ...newUploadFiles]);
  };

  const removeFile = (id: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleMetadataChange = (field: string, value: string) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Simulate upload process
    setUploadFiles(prev => 
      prev.map(f => ({ ...f, status: 'uploading' as const }))
    );

    // Simulate progress
    const interval = setInterval(() => {
      setUploadFiles(prev => {
        const updated = prev.map(f => {
          if (f.status === 'uploading' && f.progress < 100) {
            return { ...f, progress: Math.min(f.progress + 20, 100) };
          }
          if (f.progress === 100 && f.status === 'uploading') {
            return { ...f, status: 'success' as const };
          }
          return f;
        });

        if (updated.every(f => f.status === 'success')) {
          clearInterval(interval);
          
          // Create file data objects
          const newFiles: FileData[] = updated.map(uf => ({
            id: uf.id,
            title: uf.file.name.replace(/\.[^/.]+$/, ''),
            moduleCode: metadata.module,
            fileType: uf.file.type.includes('pdf') ? 'PDF' : 'DOC',
            category: metadata.contentType,
            author: metadata.author,
            date: new Date().toISOString().split('T')[0],
            description: metadata.theme || `Uploaded file: ${uf.file.name.replace(/\.[^/.]+$/, '')}`
          }));

          setTimeout(() => {
            onUpload(newFiles);
          }, 1000);
        }

        return updated;
      });
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 69, 207, 0.3)' }}>
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">Upload Files</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center space-x-4 mb-8">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600' : 'bg-gray-600'}`}>
              1
            </div>
            <span>Select Files</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-600"></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600' : 'bg-gray-600'}`}>
              2
            </div>
            <span>Add Metadata</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-600"></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600' : 'bg-gray-600'}`}>
              3
            </div>
            <span>Upload</span>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white mb-2">Drop files here or click to browse</p>
              <p className="text-gray-400 text-sm">JPG, PNG, PDF files up to 25MB</p>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                className="mt-4 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#007aff] file:text-white hover:file:bg-blue-600"
              />
            </div>

            {/* Selected Files */}
            {uploadFiles.length > 0 && (
              <div className="space-y-2 mb-6">
                <h3 className="text-white font-semibold">Selected Files ({uploadFiles.length})</h3>
                {uploadFiles.map((uploadFile) => (
                  <div key={uploadFile.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                    <div>
                      <p className="text-white text-sm">{uploadFile.file.name}</p>
                      <p className="text-gray-400 text-xs">{(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={uploadFiles.length === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Add Metadata (Required)</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Module Code *</label>
                <select
                  value={metadata.module}
                  onChange={(e) => handleMetadataChange('module', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Module</option>
                  <option value="CS101">CS101 - Introduction to Computer Science</option>
                  <option value="CS201">CS201 - Data Structures & Algorithms</option>
                  <option value="CS301">CS301 - Database Management Systems</option>
                  <option value="CS401">CS401 - Web Development</option>
                  <option value="CS501">CS501 - Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Content Type *</label>
                <select
                  value={metadata.contentType}
                  onChange={(e) => handleMetadataChange('contentType', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Content Type</option>
                  <option value="Lecture Notes">Lecture Notes</option>
                  <option value="Textbook">Textbook</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Lab Materials">Lab Materials</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Theme/Topic</label>
                <input
                  type="text"
                  value={metadata.theme}
                  onChange={(e) => handleMetadataChange('theme', e.target.value)}
                  placeholder="e.g., Introduction to Programming"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Author</label>
                <input
                  type="text"
                  value={metadata.author}
                  onChange={(e) => handleMetadataChange('author', e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!metadata.module || !metadata.contentType}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Upload Progress</h3>
            
            <div className="space-y-3 mb-6">
              {uploadFiles.map((uploadFile) => (
                <div key={uploadFile.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">{uploadFile.file.name}</span>
                    <div className="flex items-center space-x-2">
                      {uploadFile.status === 'success' && <Check className="w-4 h-4 text-green-400" />}
                      {uploadFile.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                      {uploadFile.status === 'uploading' && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadFile.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-400 text-xs">{uploadFile.progress}%</span>
                    <span className="text-gray-400 text-xs capitalize">{uploadFile.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                disabled={uploadFiles.some(f => f.status === 'uploading')}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              
              {uploadFiles.every(f => f.status === 'pending') && (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Start Upload
                </button>
              )}
              
              {uploadFiles.every(f => f.status === 'success') && (
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
