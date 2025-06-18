import React, { useState } from 'react';
import { Edit3, Save} from 'lucide-react';

interface MuscleStrengthRecoveryDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const MuscleStrengthRecoveryDetails: React.FC<MuscleStrengthRecoveryDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false 
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [muscleData, setMuscleData] = useState({
    mass: 34.2,
    percentage: 36.8,
    standardRange: '32-38 kg',
    status: 'Normal Range',
    quality: 'Good for age group'
  });

  const updateMuscleData = (field: string, value: string | number) => {
    setMuscleData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <>
      {/* Skeletal Muscle Mass - Gauge */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
          Skeletal Muscle Mass Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-32">
              <div className="absolute inset-0">
                <div className="w-full h-full border-8 border-gray-200 rounded-t-full"></div>
                <div className="absolute inset-0 w-full h-full border-8 border-green-500 rounded-t-full" style={{ clipPath: 'polygon(0% 100%, 0% 45%, 55% 0%, 100% 100%)' }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">34.2</div>
                  <div className="text-sm text-gray-600">kg</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">
                  Muscle Mass: {muscleData.mass} kg
                </h4>
                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setEditingField(editingField === 'muscle' ? null : 'muscle')}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    {editingField === 'muscle' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  </button>
                )}
              </div>
              
              {isAdmin && isEditMode && editingField === 'muscle' ? (
                <div className="space-y-3 text-sm border-t pt-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Mass (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={muscleData.mass}
                        onChange={(e) => updateMuscleData('mass', parseFloat(e.target.value))}
                        className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Percentage (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={muscleData.percentage}
                        onChange={(e) => updateMuscleData('percentage', parseFloat(e.target.value))}
                        className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Standard Range</label>
                    <input
                      type="text"
                      value={muscleData.standardRange}
                      onChange={(e) => updateMuscleData('standardRange', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                      <input
                        type="text"
                        value={muscleData.status}
                        onChange={(e) => updateMuscleData('status', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quality</label>
                      <input
                        type="text"
                        value={muscleData.quality}
                        onChange={(e) => updateMuscleData('quality', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p><strong>Percentage of Body Weight:</strong> {muscleData.percentage}%</p>
                  <p><strong>Age 45 Male Standard:</strong> {muscleData.standardRange}</p>
                  <p><strong>Status:</strong> <span className="text-green-600">{muscleData.status}</span></p>
                  <p><strong>Muscle Quality:</strong> {muscleData.quality}</p>
                </div>
              )}
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-green-800">💪 Muscle Assessment</h5>
                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setEditingField(editingField === 'assessment' ? null : 'assessment')}
                    className="text-green-600 hover:text-green-800 p-1"
                  >
                    {editingField === 'assessment' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  </button>
                )}
              </div>
              
              {isAdmin && isEditMode && editingField === 'assessment' ? (
                <div className="space-y-2">
                  <textarea
                    defaultValue={`• Skeletal muscle mass within healthy range for age
• Good foundation for strength and mobility  
• Age-related muscle loss (sarcopenia) not evident
• Continue resistance training to maintain/improve
• Target: Maintain current mass, focus on strength gains`}
                    rows={6}
                    className="w-full px-3 py-2 border border-green-300 rounded text-sm text-green-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter assessment points..."
                  />
                  <p className="text-xs text-green-600">Tip: Use • for bullet points</p>
                </div>
              ) : (
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Skeletal muscle mass within healthy range for age</li>
                  <li>• Good foundation for strength and mobility</li>
                  <li>• Age-related muscle loss (sarcopenia) not evident</li>
                  <li>• Continue resistance training to maintain/improve</li>
                  <li>• Target: Maintain current mass, focus on strength gains</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MuscleStrengthRecoveryDetails; 