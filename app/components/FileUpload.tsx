import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onDataLoaded: (data: Array<{ height: string; side: string }>) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file.');
      return;
    }

    setIsProcessing(true);
    setError('');
    setFileName(file.name);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length === 0) {
        setError('The CSV file appears to be empty.');
        setIsProcessing(false);
        return;
      }

      // Find header row and column indices
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      let heightColumnIndex = -1;
      let sideColumnIndex = -1;

      // Search for columns containing "plateloche" and "platelocsi" (case-insensitive)
      headers.forEach((header, index) => {
        if (header.includes('plateloche')) {
          heightColumnIndex = index;
        }
        if (header.includes('platelocsi')) {
          sideColumnIndex = index;
        }
      });

      if (heightColumnIndex === -1 || sideColumnIndex === -1) {
        setError('Could not find required columns. Please ensure your CSV contains columns with "PlateLocHeight" and "PlateLocSide" in their names.');
        setIsProcessing(false);
        return;
      }

      // Parse data rows
      const dataRows = lines.slice(1); // Skip header row
      const parsedData = dataRows.map(line => {
        const columns = line.split(',');
        return {
          height: columns[heightColumnIndex]?.trim() || '',
          side: columns[sideColumnIndex]?.trim() || ''
        };
      });

      onDataLoaded(parsedData);
      setError('');
    } catch (err) {
      setError('Error reading file. Please ensure it is a valid CSV file.');
      console.error('File parsing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">CSV File Upload</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center">
          <Upload className={`w-12 h-12 mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
          
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your TrackMan CSV file here
            </p>
            <p className="text-gray-600">
              or click to browse and select a file
            </p>
          </div>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            id="csvFileInput"
            disabled={isProcessing}
          />
          
          <label
            htmlFor="csvFileInput"
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? 'Processing...' : 'Select CSV File'}
          </label>
        </div>
      </div>

      {fileName && !error && (
        <div className="flex items-center mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <FileText className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-green-800">
            Successfully loaded: <strong>{fileName}</strong>
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Requirements:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>CSV file format</li>
          <li>Must contain columns with "PlateLocHeight" and "PlateLocSide" in their names</li>
          <li>First row should contain column headers</li>
        </ul>
      </div>
    </div>
  );
}
