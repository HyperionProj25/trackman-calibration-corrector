import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultsDisplayProps {
  correctedHeights: string;
  correctedSides: string;
}

export function ResultsDisplay({ correctedHeights, correctedSides }: ResultsDisplayProps) {
  const [copiedHeights, setCopiedHeights] = useState(false);
  const [copiedSides, setCopiedSides] = useState(false);

  const copyToClipboard = async (text: string, type: 'heights' | 'sides') => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === 'heights') {
        setCopiedHeights(true);
        setTimeout(() => setCopiedHeights(false), 2000);
      } else {
        setCopiedSides(true);
        setTimeout(() => setCopiedSides(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        if (type === 'heights') {
          setCopiedHeights(true);
          setTimeout(() => setCopiedHeights(false), 2000);
        } else {
          setCopiedSides(true);
          setTimeout(() => setCopiedSides(false), 2000);
        }
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const heightLines = correctedHeights.split('\n');
  const sideLines = correctedSides.split('\n');
  const totalRows = Math.max(heightLines.length, sideLines.length);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Corrected Results</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Corrected Heights */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Corrected Heights</h3>
            <button
              onClick={() => copyToClipboard(correctedHeights, 'heights')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                copiedHeights
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200'
              }`}
            >
              {copiedHeights ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="border border-gray-300 rounded-lg">
            <textarea
              value={correctedHeights}
              readOnly
              className="w-full h-64 p-3 font-mono text-sm text-black border-none rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Corrected height values will appear here..."
            />
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {heightLines.filter(line => line.trim() !== '').length} values
          </p>
        </div>

        {/* Corrected Sides */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Corrected Sides</h3>
            <button
              onClick={() => copyToClipboard(correctedSides, 'sides')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                copiedSides
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200'
              }`}
            >
              {copiedSides ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="border border-gray-300 rounded-lg">
            <textarea
              value={correctedSides}
              readOnly
              className="w-full h-64 p-3 font-mono text-sm text-black border-none rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Corrected side values will appear here..."
            />
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {sideLines.filter(line => line.trim() !== '').length} values
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Usage Instructions</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Copy the corrected values using the buttons above</p>
          <p>• Paste them into your analysis software or spreadsheet</p>
          <p>• Each line represents one data point from your original CSV</p>
          <p>• Empty values in the original data remain empty in the results</p>
          <p>• Non-numeric values are preserved unchanged</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Data Summary:</strong> Processed {totalRows} rows with 6 decimal precision.
          Values are formatted for direct use in analysis tools.
        </p>
      </div>
    </div>
  );
}
