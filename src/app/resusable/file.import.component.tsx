'use client';
import { useState, useRef } from 'react';

type FileImportProps = {
  title?: string;
  onFileSelect?: (file: File) => void;
  onImport?: (file: File) => void;
};

export default function FileImportComponent({ title = 'Import File', onFileSelect, onImport }: FileImportProps) {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFileName(file?.name || '');
    if (file && onFileSelect) onFileSelect(file);
  };

  const handleImportClick = () => {
    if (selectedFile && onImport) onImport(selectedFile);
  };

  return (
    <div className="flex flex-col w-1/2 bg-white rounded-md shadow-sm mt-4 p-4">
      <strong className="font-bold mb-4 text-md">{title}</strong>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={handleChooseFileClick}
          className="px-4 py-2 bg-blue-400 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Choose File
        </button>

        <input
          type="text"
          readOnly
          value={fileName}
          placeholder="No file chosen"
          className="flex-grow border border-gray-300 rounded-md p-2"
        />

        <button
          disabled={!selectedFile}
          onClick={handleImportClick}
          className={`px-4 py-2 rounded-md shadow-sm border 
            ${selectedFile
              ? 'border-blue-400 text-blue-500 cursor-pointer pointer-events-auto opacity-100'
              : 'border-gray-400 text-gray-400 cursor-not-allowed pointer-events-none opacity-50'
            }`}
        >
          Import
        </button>
      </div>
    </div>
  );
}
