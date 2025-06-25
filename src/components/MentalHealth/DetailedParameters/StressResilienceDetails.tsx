import React, { useState } from 'react';
import { Edit3, Save, HelpCircle } from 'lucide-react';

interface StressResilienceDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
  onShowInfoCard?: (type: string) => void;
}

const StressResilienceDetails: React.FC<StressResilienceDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false,
  onShowInfoCard
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // BOLT Score
  const [boltScore, setBoltScore] = useState(15);

  const updateBoltScore = (value: number) => {
    setBoltScore(value);
  };

  const getBoltLevel = (score: number) => {
    if (score < 10) return { level: 'Very low CO₂ tolerance', color: 'red', bgColor: 'bg-red-50' };
    if (score < 20) return { level: 'Needs improvement', color: 'yellow', bgColor: 'bg-yellow-50' };
    if (score < 30) return { level: 'Functional breathing', color: 'green', bgColor: 'bg-green-50' };
    return { level: 'Excellent regulation', color: 'darkGreen', bgColor: 'bg-blue-50' };
  };

  const boltLevel = getBoltLevel(boltScore);

  // BOLT Reference ranges
  const boltRanges = [
    { range: '< 10 sec', level: 'Very low CO₂ tolerance', color: 'red' },
    { range: '10-20 sec', level: 'Needs improvement', color: 'yellow' },
    { range: '20-30 sec', level: 'Functional breathing', color: 'green' },
    { range: '> 40 sec', level: 'Excellent regulation', color: 'darkGreen' }
  ];

  const getBoltRangeColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 border-red-100 text-red-800';
      case 'yellow': return 'bg-yellow-50 border-yellow-100 text-yellow-800';
      case 'green': return 'bg-green-50 border-green-100 text-green-800';
      case 'darkGreen': return 'bg-emerald-400 border-emerald-500 text-white';
      default: return 'bg-gray-50 border-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* BOLT Score Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">BOLT Score Assessment</h3>
            <button
              onClick={() => onShowInfoCard && onShowInfoCard('bolt')}
              className="text-gray-500 hover:text-purple-600 transition-colors p-1"
              title="Learn more about BOLT Score"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Current BOLT Score */}
            <div className="flex-1">
              <div className={`bg-white rounded-xl border ${
                boltLevel.color === 'green' ? 'border-green-300' :
                boltLevel.color === 'yellow' ? 'border-yellow-300' :
                boltLevel.color === 'darkGreen' ? 'border-emerald-400' :
                'border-red-300'
              } p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-base font-semibold text-gray-900">Current BOLT Score</h4>
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'boltScore' ? null : 'boltScore')}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      {editingField === 'boltScore' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between mb-4">
                  {isAdmin && isEditMode && editingField === 'boltScore' ? (
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={boltScore}
                      onChange={(e) => updateBoltScore(parseInt(e.target.value))}
                      className="text-4xl font-bold text-purple-600 w-20 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-600"
                    />
                  ) : (
                    <span className={`text-4xl font-bold ${
                      boltLevel.color === 'green' ? 'text-green-600' :
                      boltLevel.color === 'yellow' ? 'text-yellow-600' :
                      boltLevel.color === 'darkGreen' ? 'text-green-100' :
                      'text-red-600'
                    }`}>{boltScore}</span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${boltLevel.color === 'green' ? 'bg-green-100 text-green-800' :
                    boltLevel.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    boltLevel.color === 'darkGreen' ? 'bg-emerald-400 text-white' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {boltLevel.level}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className={`h-2.5 rounded-full ${
                      boltLevel.color === 'green' ? 'bg-green-500' :
                      boltLevel.color === 'yellow' ? 'bg-yellow-500' :
                      boltLevel.color === 'darkGreen' ? 'bg-emerald-400' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((boltScore/60) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Seconds you can hold your breath after a normal exhale while maintaining a comfortable state.
                </p>
              </div>
            </div>

            {/* BOLT Reference Table */}
            <div className="flex-1">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">BOLT Score Reference</h4>
                <div className="space-y-3">
                  {boltRanges.map((range, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-lg border ${getBoltRangeColor(range.color)}`}
                    >
                      <span className="text-sm font-medium text-gray-900">{range.range}</span>
                      <span className="text-sm">{range.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breathing Efficiency Analysis */}
      {/* <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Breathing Efficiency Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-2">CO₂ Tolerance</h4>
            <div className={`text-2xl font-bold mb-2 ${
              boltLevel.color === 'green' || boltLevel.color === 'blue' ? 'text-green-600' : 
              boltLevel.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {boltLevel.color === 'green' || boltLevel.color === 'blue' ? 'Good' :
               boltLevel.color === 'yellow' ? 'Moderate' : 'Low'}
            </div>
            <p className="text-xs text-gray-500">
              Higher tolerance indicates better stress resilience
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-2">Breathing Pattern</h4>
            <div className={`text-2xl font-bold mb-2 ${
              boltScore >= 20 ? 'text-green-600' : 'text-red-600'
            }`}>
              {boltScore >= 20 ? 'Efficient' : 'Inefficient'}
            </div>
            <p className="text-xs text-gray-500">
              Efficient breathing supports better mental performance
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-gray-900 mb-2">Stress Response</h4>
            <div className={`text-2xl font-bold mb-2 ${
              boltScore >= 25 ? 'text-green-600' : boltScore >= 15 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {boltScore >= 25 ? 'Resilient' : boltScore >= 15 ? 'Moderate' : 'Sensitive'}
            </div>
            <p className="text-xs text-gray-500">
              Better breathing control improves stress management
            </p>
          </div>
        </div>
      </div> */}

      {/* Recommendations */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Breathing Improvement Recommendations</h3>
        <div className="space-y-3">
          {boltScore < 20 && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Priority Actions</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Practice nasal breathing throughout the day</li>
                <li>• Reduce breathing volume through gentle exercises</li>
                <li>• Consider breathing training programs</li>
              </ul>
            </div>
          )}
          {boltScore >= 20 && boltScore < 30 && (
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
              <h4 className="font-semibold text-green-800 mb-2">Maintenance & Enhancement</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Continue current breathing practices</li>
                <li>• Add breath-hold exercises for further improvement</li>
                <li>• Monitor during stress situations</li>
              </ul>
            </div>
          )}
          {boltScore >= 30 && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Excellent Control</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Maintain current excellent breathing efficiency</li>
                <li>• Use as a foundation for stress management</li>
                <li>• Consider teaching others your techniques</li>
              </ul>
            </div>
          )}
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default StressResilienceDetails; 