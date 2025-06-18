import React from 'react';
import { 
  Settings,
  Eye,
  EyeOff,
  Edit3,
  Save,
  X,
  Plus
} from 'lucide-react';

interface AdminPanelProps {
  isAdmin: boolean;
  isEditMode: boolean;
  showAdminPanel: boolean;
  setIsEditMode: (value: boolean) => void;
  setShowAdminPanel: (value: boolean) => void;
  onSaveChanges: () => void;
  onAddKeyFinding: () => void;
  onAddRecommendation: () => void;
  onAddNote: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isAdmin,
  isEditMode,
  showAdminPanel,
  setIsEditMode,
  setShowAdminPanel,
  onSaveChanges,
  onAddKeyFinding,
  onAddRecommendation,
  onAddNote
}) => {
  if (!isAdmin) return null;

  return (
    <>
      {/* Admin Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Physical Health Report
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showAdminPanel ? 'Hide' : 'Show'} Controls
            </button>
            {isEditMode ? (
              <div className="flex space-x-2">
                <button
                  onClick={onSaveChanges}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditMode(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Page
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Admin Controls Panel */}
      {showAdminPanel && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Quick Admin Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
            >
              {isEditMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {isEditMode ? 'Preview' : 'Edit Mode'}
            </button>
            <button
              onClick={onAddKeyFinding}
              className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Finding
            </button>
            <button
              onClick={onAddRecommendation}
              className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Recommendation
            </button>
            <button
              onClick={onAddNote}
              className="flex items-center justify-center px-3 py-2 bg-white border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Notes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel; 