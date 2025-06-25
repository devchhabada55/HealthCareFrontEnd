import React from 'react';
import { AlertTriangle, TrendingDown, Plus, Trash2 } from 'lucide-react';

interface KeyFindingsProps {
  keyFindings: string[];
  isEditMode: boolean;
  isAdmin: boolean;
  onAddKeyFinding: () => void;
  onUpdateKeyFinding: (index: number, value: string) => void;
  onRemoveKeyFinding: (index: number) => void;
}

const KeyFindings: React.FC<KeyFindingsProps> = ({
  keyFindings,
  isEditMode,
  isAdmin,
  onAddKeyFinding,
  onUpdateKeyFinding,
  onRemoveKeyFinding
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
          Key Findings
        </h2>
        {isAdmin && isEditMode && (
          <button
            onClick={onAddKeyFinding}
            className="text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {keyFindings.map((finding, index) => (
          <div key={index} className="flex items-start">
            <TrendingDown className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-1" />
            {isEditMode ? (
              <div className="flex-1 flex items-center space-x-2">
                <textarea
                  value={finding}
                  onChange={(e) => onUpdateKeyFinding(index, e.target.value)}
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                />
                <button
                  onClick={() => onRemoveKeyFinding(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-gray-700">{finding}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFindings; 