import React, { useState } from 'react';
import { Upload, AlertCircle, Check, X } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface DocumentUploadFormProps {
  onComplete: (files: UploadedFile[]) => void;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onComplete }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(fileList).forEach(file => {
      // Mock file upload with progress
      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
      
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        status: 'uploading',
        progress: 0
      };
      
      newFiles.push(newFile);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prev => 
          prev.map(f => {
            if (f.id === fileId) {
              const newProgress = f.progress + 10;
              
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...f, progress: 100, status: 'success' };
              }
              
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 300);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // After all files are "uploaded", notify parent
    setTimeout(() => {
      const completedFiles = [...files, ...newFiles].map(f => ({ ...f, status: 'success', progress: 100 }));
      setFiles(completedFiles);
      onComplete(completedFiles);
    }, 4000);
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div className="space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } transition-colors duration-200`}
      >
        <div className="mx-auto flex justify-center">
          <Upload className={`h-12 w-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-900">
          Drag and drop your files here
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Accepted file types: PDF, JPEG, PNG (Max: 10MB per file)
        </p>
        
        <div className="mt-4">
          <label
            htmlFor="file-upload"
            className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isDragging ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Browse Files
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Uploaded Documents</h3>
          <ul className="mt-3 divide-y divide-gray-100 border border-gray-200 rounded-md">
            {files.map((file) => (
              <li
                key={file.id}
                className="px-4 py-3 flex items-center justify-between text-sm"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {file.status === 'uploading' ? (
                      <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                    ) : file.status === 'success' ? (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>
                {file.status === 'uploading' ? (
                  <div className="ml-4 flex-shrink-0 w-24">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">
                      {file.progress}%
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure all documents are clear and legible</li>
                <li>Required documents: ID proof, income verification, and address proof</li>
                <li>For income verification, include your last 3 months' pay stubs or bank statements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;