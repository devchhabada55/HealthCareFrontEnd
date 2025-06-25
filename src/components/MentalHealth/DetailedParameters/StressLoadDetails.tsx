import React, { useState } from 'react';
import { Edit3, Save } from 'lucide-react';

interface StressLoadDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const StressLoadDetails: React.FC<StressLoadDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false 
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Scored Wellbeing Metrics (7-10 scale)
  const [scoredMetrics, setScoredMetrics] = useState({
    socialWellbeing: 8.5,
    familialWellbeing: 7.8
  });

  // Binary Wellbeing Indicators
  const [binaryIndicators, setBinaryIndicators] = useState([
    { name: 'Work-Life Balance', status: true },
    { name: 'General Wellbeing', status: true },
    { name: 'Professional Wellbeing', status: false },
    { name: 'Brain Wellbeing', status: true }
  ]);

  const updateScoredMetric = (field: string, value: number) => {
    setScoredMetrics(prev => ({ ...prev, [field]: value }));
  };

  const toggleBinaryIndicator = (index: number) => {
    const updated = [...binaryIndicators];
    updated[index] = { ...updated[index], status: !updated[index].status };
    setBinaryIndicators(updated);
  };

  const getProgressBar = (value: number, maxValue: number = 10) => {
    const percentage = (value / maxValue) * 100;
    const color = value >= 7 ? 'bg-green-500' : 'bg-red-500';
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Scored Wellbeing Metrics */}
      <div className={`bg-white rounded-xl shadow-sm border ${
        ((scoredMetrics.socialWellbeing + scoredMetrics.familialWellbeing) / 2) >= 7 ? 'border-green-300' : 'border-red-300'
      } overflow-hidden`}>
        <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Scored Wellbeing Metrics (7-10)</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Social Wellbeing */}
          <div className={`bg-white rounded-xl border ${
            scoredMetrics.socialWellbeing >= 7 ? 'border-green-300' : 'border-red-300'
          } p-4 hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-base font-semibold text-gray-900">Social Wellbeing</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  scoredMetrics.socialWellbeing >= 7 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isAdmin && isEditMode && editingField === 'socialWellbeing' ? (
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={scoredMetrics.socialWellbeing}
                      onChange={(e) => updateScoredMetric('socialWellbeing', parseFloat(e.target.value))}
                      className="w-12 text-center bg-transparent border-b border-current focus:outline-none"
                    />
                  ) : (
                    scoredMetrics.socialWellbeing
                  )}/10
                </span>
                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setEditingField(editingField === 'socialWellbeing' ? null : 'socialWellbeing')}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {editingField === 'socialWellbeing' ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
            {getProgressBar(scoredMetrics.socialWellbeing)}
            <p className="text-sm text-gray-600">
              {scoredMetrics.socialWellbeing >= 7 ? 'Healthy social connections maintained' : 'Needs attention to improve social interactions'}
            </p>
          </div>

          {/* Familial Wellbeing */}
          <div className={`bg-white rounded-xl border ${
            scoredMetrics.familialWellbeing >= 7 ? 'border-green-300' : 'border-red-300'
          } p-4 hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-base font-semibold text-gray-900">Familial Wellbeing</h4>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  scoredMetrics.familialWellbeing >= 7 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isAdmin && isEditMode && editingField === 'familialWellbeing' ? (
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={scoredMetrics.familialWellbeing}
                      onChange={(e) => updateScoredMetric('familialWellbeing', parseFloat(e.target.value))}
                      className="w-12 text-center bg-transparent border-b border-current focus:outline-none"
                    />
                  ) : (
                    scoredMetrics.familialWellbeing
                  )}/10
                </span>
                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setEditingField(editingField === 'familialWellbeing' ? null : 'familialWellbeing')}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {editingField === 'familialWellbeing' ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
            {getProgressBar(scoredMetrics.familialWellbeing)}
            <p className="text-sm text-gray-600">
              {scoredMetrics.familialWellbeing >= 7 ? 'Good family relationship status' : 'Family relationships need attention'}
            </p>
          </div>
        </div>
      </div>

      {/* Binary Wellbeing Indicators */}
      <div className={`bg-white rounded-xl shadow-sm border ${
        binaryIndicators.every(indicator => indicator.status) ? 'border-green-300' : 'border-red-300'
      } overflow-hidden`}>
        <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">General Wellbeing Indicators</h3>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {binaryIndicators.map((indicator, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                indicator.status 
                  ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                  : 'border-red-200 bg-red-50 hover:bg-red-100'
              } ${isAdmin && isEditMode ? 'cursor-pointer' : ''}`}
              onClick={isAdmin && isEditMode ? () => toggleBinaryIndicator(index) : undefined}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  indicator.status ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium text-gray-900">{indicator.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  indicator.status 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {indicator.status ? 'Yes' : 'No'}
                </span>
                {isAdmin && isEditMode && (
                  <Edit3 className="w-3 h-3 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">Stress Load Assessment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`bg-white rounded-lg p-4 border ${
            ((scoredMetrics.socialWellbeing + scoredMetrics.familialWellbeing) / 2) >= 7 ? 'border-green-300' : 'border-red-300'
          }`}>
            <h4 className="font-semibold text-gray-900 mb-2">Scored Metrics</h4>
            <p className="text-sm text-gray-600">
              Average Score: {((scoredMetrics.socialWellbeing + scoredMetrics.familialWellbeing) / 2).toFixed(1)}/10
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Target: ≥ 7.0 for optimal wellbeing
            </p>
          </div>
          <div className={`bg-white rounded-lg p-4 border ${
            binaryIndicators.filter(i => i.status).length === binaryIndicators.length ? 'border-green-300' : 'border-red-300'
          }`}>
            <h4 className="font-semibold text-gray-900 mb-2">Binary Indicators</h4>
            <p className="text-sm text-gray-600">
              Positive Status: {binaryIndicators.filter(i => i.status).length}/{binaryIndicators.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Goal: All indicators should be positive
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressLoadDetails; 