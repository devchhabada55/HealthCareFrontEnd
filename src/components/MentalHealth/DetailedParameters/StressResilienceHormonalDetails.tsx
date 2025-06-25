import React, { useState } from 'react';
import { Edit3, Save, HelpCircle } from 'lucide-react';

interface StressResilienceHormonalDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
  onShowInfoCard?: (type: string) => void;
}

const StressResilienceHormonalDetails: React.FC<StressResilienceHormonalDetailsProps> = ({
  isAdmin = false,
  isEditMode = false,
  onShowInfoCard
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // COMT Profile - State for the current COMT type
  const [comtType, setComtType] = useState('GG'); // Default to GG as requested
  const [comtDescription, setComtDescription] = useState('Your profile indicates high stress tolerance and performs well under pressure.');

  return (
    <div className="space-y-6">
      {/* COMT Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">COMT Profile Analysis</h3>
            <div className="flex items-center space-x-2">
              {isAdmin && isEditMode && editingField !== 'comt' && (
                <button
                  onClick={() => setEditingField('comt')}
                  className="text-gray-500 hover:text-purple-600 transition-colors p-1"
                  title="Edit COMT Profile"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
              {isAdmin && isEditMode && editingField === 'comt' && (
                <button
                  onClick={() => setEditingField(null)} // Save logic would be here
                  className="text-gray-500 hover:text-green-600 transition-colors p-1"
                  title="Save COMT Profile"
                >
                  <Save className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => onShowInfoCard && onShowInfoCard('comt')}
                className="text-gray-500 hover:text-purple-600 transition-colors p-1"
                title="Learn more about COMT Profile"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Current Profile */}
            <div className="flex-1">
              <div className={`bg-white rounded-xl border ${comtType === 'GG' ? 'border-green-300' : comtType === 'AG' ? 'border-orange-300' : 'border-red-300'} p-6`}>
                <h4 className="text-base font-semibold text-gray-900 mb-4">Your COMT Profile</h4>
                {editingField === 'comt' && isAdmin ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="comtType" className="block text-sm font-medium text-gray-700">COMT Type</label>
                      <input
                        type="text"
                        id="comtType"
                        value={comtType}
                        onChange={(e) => setComtType(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="comtDescription" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="comtDescription"
                        value={comtDescription}
                        onChange={(e) => setComtDescription(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-4xl font-bold ${comtType === 'GG' ? 'text-green-600' : comtType === 'AG' ? 'text-orange-600' : 'text-red-600'}`}>{comtType}</span>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        comtType === 'GG' ? 'bg-green-100 text-green-800' :
                        comtType === 'AG' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {comtType === 'GG' ? 'Warrior Type' : comtType === 'AG' ? 'Flexible Type' : 'Worrier Type'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {comtDescription}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Profile Types */}
            <div className="flex-1">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">COMT Profile Types</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="font-medium text-gray-900 mb-1">GG - "Warrior"</div>
                    <p className="text-sm text-green-800">Positive Effect</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="font-medium text-gray-900 mb-1">AG - "Flexible"</div>
                    <p className="text-sm text-orange-800">Median Positive Effect</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="font-medium text-gray-900 mb-1">AA - "Worrier"</div>
                    <p className="text-sm text-red-800">Negative Effect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressResilienceHormonalDetails; 