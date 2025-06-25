import React, { useState } from 'react';
import { Edit3, Save, Info } from 'lucide-react';

interface MentalResilienceDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
  onShowInfoCard?: (type: string) => void;
}

const MentalResilienceDetails: React.FC<MentalResilienceDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false,
  onShowInfoCard
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);

  // Mental Resilience Parameters (0-6 scale)
  const [mentalParameters, setMentalParameters] = useState({
    perfectionism: 3.2,
    missingDissociation: 1.8,
    selfDemand: 4.1,
    anxiety: 2.5,
    externalDemand: 3.7,
    recognition: 2.2,
    nervousnessAndMentalFatigue: 3.9
  });

  const updateParameter = (field: string, value: number) => {
    setMentalParameters(prev => ({ ...prev, [field]: value }));
  };

  const getRiskLevel = (value: number) => {
    if (value <= 2) return { level: 'Good', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-400', textColor: 'text-green-800' };
    if (value <= 4) return { level: 'Medium Risk', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-400', textColor: 'text-yellow-800' };
    return { level: 'High Risk', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-400', textColor: 'text-red-800' };
  };

  const parameters = [
    { key: 'perfectionism', name: 'Perfectionism', value: mentalParameters.perfectionism },
    { key: 'missingDissociation', name: 'Missing Dissociation', value: mentalParameters.missingDissociation },
    { key: 'selfDemand', name: 'Self Demand', value: mentalParameters.selfDemand },
    { key: 'anxiety', name: 'Anxiety', value: mentalParameters.anxiety },
    { key: 'externalDemand', name: 'External Demand', value: mentalParameters.externalDemand },
    { key: 'recognition', name: 'Recognition', value: mentalParameters.recognition },
    { key: 'nervousnessAndMentalFatigue', name: 'Nervousness & Mental Fatigue', value: mentalParameters.nervousnessAndMentalFatigue }
  ];

  return (
    <div className="space-y-6">
      {/* Risk Scale Definition */}
      <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
          Mental Resilience Risk Scale (0-6)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center justify-start gap-x-2 py-3 px-4 rounded-lg border-l-4 border-green-400">
            <div className="text-sm text-green-700 font-bold">0 - 2</div>
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span className="text-sm font-medium text-green-800">Good</span>
          </div>
          
          <div className="flex items-center justify-start gap-x-2 py-3 px-4 rounded-lg border-l-4 border-yellow-400">
            <div className="text-sm text-yellow-700 font-bold">2 - 4</div>
            <div className="w-3 h-0.5 bg-yellow-500"></div>
            <span className="text-sm font-medium text-yellow-800">Medium Risk</span>
          </div>
          
          <div className="flex items-center justify-start gap-x-2 py-3 px-4 rounded-lg border-l-4 border-red-400">
            <div className="text-sm text-red-700 font-bold">4 - 6</div>
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span className="text-sm font-medium text-red-800">High Risk</span>
          </div>
        </div>
      </div>

      {/* Parameter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {parameters.map((param) => {
          const risk = getRiskLevel(param.value);
          
          return (
            <div key={param.key} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl border ${risk.borderColor}`}>
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{param.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isAdmin && isEditMode && (
                      <button
                        onClick={() => setEditingField(editingField === param.key ? null : param.key)}
                        className="text-purple-600 hover:text-purple-800 p-1 ml-2 flex-shrink-0"
                      >
                        {editingField === param.key ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                    )}
                    <button
                      onClick={() => onShowInfoCard && onShowInfoCard(param.key)}
                      className="text-gray-500 hover:text-purple-600 transition-colors p-1"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 bg-white">
                {/* Value Display */}
                <div className="text-center mb-3">
                  {isAdmin && isEditMode && editingField === param.key ? (
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="6"
                      value={param.value}
                      onChange={(e) => updateParameter(param.key, parseFloat(e.target.value))}
                      className={`w-20 text-4xl font-bold ${risk.textColor} text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-600`}
                    />
                  ) : (
                    <div className={`text-4xl font-bold ${risk.textColor}`}>
                      {param.value.toFixed(1)}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="text-center">
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentalResilienceDetails; 