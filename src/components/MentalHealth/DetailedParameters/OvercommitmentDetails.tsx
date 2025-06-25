import React, { useState } from 'react';
import { Edit3, Save} from 'lucide-react';

interface OvercommitmentDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const OvercommitmentDetails: React.FC<OvercommitmentDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false 
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Overcommitment stress categories (0-7 scale, yes/no questions)
  const [stressCategories, setStressCategories] = useState({
    workStress: 3,        // 3 questions, 3 yes = high risk
    familyStress: 0,      // 2 questions, 1 yes
    socialStress: 0       // 2 questions, 2 yes
  });

  const updateStressCategory = (field: string, value: number) => {
    setStressCategories(prev => ({ ...prev, [field]: value }));
  };

  // Visual representation of overcommitment degree
  const getVisualBar = (score: number, maxScore: number, barColor: string) => {
    const percentage = (score / maxScore) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall Overcommitment card removed as requested. */}
      <p className="text-sm text-gray-600 mb-4">These results are based on the Questionnaire from Copenhagen Burnout Inventory (CBI).</p>
      {/* Individual Stress Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Work-related stress */}
        <div className={`bg-white rounded-xl shadow-md hover:shadow-lg border overflow-hidden transition-shadow duration-200 ${
            stressCategories.workStress < 3 ? 'border-green-400' : 'border-red-400'
        }`}>
          <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-gray-900">Work Stress</h3>
              </div>
              {isAdmin && isEditMode && (
                <button
                  onClick={() => setEditingField(editingField === 'workStress' ? null : 'workStress')}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  {editingField === 'workStress' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-4">
              {isAdmin && isEditMode && editingField === 'workStress' ? (
                <input
                  type="number"
                  min="0"
                  max="7"
                  value={stressCategories.workStress}
                  onChange={(e) => updateStressCategory('workStress', parseInt(e.target.value))}
                  className="w-16 text-3xl font-bold text-blue-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                />
              ) : (
                <div className={`text-4xl font-bold ${
                  stressCategories.workStress < 3 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stressCategories.workStress}/7
                </div>
              )}
            </div>

            <div className="mt-3">
              {getVisualBar(stressCategories.workStress, 7, stressCategories.workStress < 3 ? 'bg-green-500' : 'bg-red-500')}
            </div>
            <p className="text-xs text-gray-600 mt-2">Indicates the burden from professional demands and tasks.</p>
            <div className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Risk Scale:</span> &lt;3 = Low, &ge;3 = High
            </div>
          </div>
        </div>

        {/* Family-related stress */}
        <div className={`bg-white rounded-xl shadow-md hover:shadow-lg border overflow-hidden transition-shadow duration-200 ${
            stressCategories.familyStress < 1 ? 'border-green-400' : 'border-red-400'
        }`}>
          <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-gray-900">Family Stress</h3>
              </div>
              {isAdmin && isEditMode && (
                <button
                  onClick={() => setEditingField(editingField === 'familyStress' ? null : 'familyStress')}
                  className="text-purple-600 hover:text-purple-800 p-1"
                >
                  {editingField === 'familyStress' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-4">
              {isAdmin && isEditMode && editingField === 'familyStress' ? (
                <input
                  type="number"
                  min="0"
                  max="2"
                  value={stressCategories.familyStress}
                  onChange={(e) => updateStressCategory('familyStress', parseInt(e.target.value))}
                  className="w-16 text-3xl font-bold text-purple-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-600"
                />
              ) : (
                <div className={`text-4xl font-bold ${
                  stressCategories.familyStress < 1 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stressCategories.familyStress}/2
                </div>
              )}
            </div>

            <div className="mt-3">
              {getVisualBar(stressCategories.familyStress, 2, stressCategories.familyStress < 1 ? 'bg-green-500' : 'bg-red-500')}
            </div>
            <p className="text-xs text-gray-600 mt-2">Reflects pressure from home life and family obligations.</p>
            <div className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Risk Scale:</span> 0 = Low, &ge;1 = High
            </div>
          </div>
        </div>

        {/* Social stress */}
        <div className={`bg-white rounded-xl shadow-md hover:shadow-lg border overflow-hidden transition-shadow duration-200 ${
            stressCategories.socialStress < 1 ? 'border-green-400' : 'border-red-400'
        }`}>
          <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-gray-900">Social Stress</h3>
              </div>
              {isAdmin && isEditMode && (
                <button
                  onClick={() => setEditingField(editingField === 'socialStress' ? null : 'socialStress')}
                  className="text-orange-600 hover:text-orange-800 p-1"
                >
                  {editingField === 'socialStress' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="text-center mb-4">
              {isAdmin && isEditMode && editingField === 'socialStress' ? (
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={stressCategories.socialStress}
                  onChange={(e) => updateStressCategory('socialStress', parseInt(e.target.value))}
                  className="w-16 text-3xl font-bold text-orange-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-orange-600"
                />
              ) : (
                <div className={`text-4xl font-bold ${
                  stressCategories.socialStress < 1 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stressCategories.socialStress}/3
                </div>
              )}
            </div>

            <div className="mt-3">
              {getVisualBar(stressCategories.socialStress, 3, stressCategories.socialStress < 1 ? 'bg-green-500' : 'bg-red-500')}
            </div>
            <p className="text-xs text-gray-600 mt-2">Measures burdens arising from social interactions and expectations.</p>
            <div className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Risk Scale:</span> 0 = Low, &ge;1 = High
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvercommitmentDetails; 