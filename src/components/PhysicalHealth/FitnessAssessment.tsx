import React from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { RadarDataPoint } from '../../hooks/usePhysicalHealthData';
import { getScoreColor, getScoreLabel } from '../../utils/healthUtils';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer
} from 'recharts';

interface FitnessAssessmentProps {
  radarData: RadarDataPoint[];
  isEditMode: boolean;
  isAdmin: boolean;
  activeMetric: string | null;
  onSetActiveMetric: (metric: string | null) => void;
  onAddRadarDataPoint: () => void;
  onUpdateRadarDataPoint: (index: number, field: string, value: string) => void;
  onRemoveRadarDataPoint: (index: number) => void;
}

const FitnessAssessment: React.FC<FitnessAssessmentProps> = ({
  radarData,
  isEditMode,
  isAdmin,
  activeMetric,
  onSetActiveMetric,
  onAddRadarDataPoint,
  onUpdateRadarDataPoint,
  onRemoveRadarDataPoint
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-500" />
          Comprehensive Fitness Assessment
        </h2>
        {isAdmin && isEditMode && (
          <span className="text-sm text-blue-600 font-medium">
            Edit Mode: Modify metrics below
          </span>
        )}
      </div>
      
      {isAdmin && isEditMode && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-800">Admin Edit Mode Active</h3>
            <span className="text-xs text-blue-600">Click on metric cards below to edit directly</span>
          </div>
        </div>
      )}
      
      {/* Enhanced Radar Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#374151' }}
              className="text-sm"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickCount={6}
            />
            <Radar 
              name="Your Score" 
              dataKey="score" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{ r: 4, fill: '#3b82f6' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {radarData.map((metric, index) => {
          const isActive = activeMetric === metric.subject;

          return (
            <div 
              key={index} 
              className={`border rounded-lg p-4 transition-all duration-200 ${
                isAdmin && isEditMode 
                  ? 'bg-blue-50 border-blue-200' 
                  : `cursor-pointer transform hover:scale-105 ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''}`
              } ${!isAdmin || !isEditMode ? getScoreColor(metric.score) : ''}`}
              onClick={!isAdmin || !isEditMode ? () => onSetActiveMetric(isActive ? null : metric.subject) : undefined}
            >
              <div className="text-center">
                {isAdmin && isEditMode ? (
                  <>
                    {/* Editable Metric Name */}
                    <textarea
                      value={metric.subject}
                      onChange={(e) => onUpdateRadarDataPoint(index, 'subject', e.target.value)}
                      className="w-full font-medium text-sm mb-2 leading-tight bg-transparent border border-blue-300 rounded px-2 py-1 text-center resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                    />
                    
                    {/* Editable Score */}
                    <div className="flex items-center justify-center mb-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={metric.score}
                        onChange={(e) => onUpdateRadarDataPoint(index, 'score', e.target.value)}
                        className="text-2xl font-bold w-16 text-center bg-transparent border border-blue-300 rounded px-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-lg text-gray-500 ml-1">/100</span>
                    </div>
                    
                    {/* Current Label */}
                    <div className="text-xs opacity-75 mb-2">
                      {getScoreLabel(metric.score)}
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveRadarDataPoint(index);
                      }}
                      className="text-red-500 hover:text-red-700 text-xs flex items-center justify-center mx-auto"
                      title="Remove metric"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-medium text-sm mb-2 leading-tight">
                      {metric.subject}
                    </h3>
                    <div className="text-2xl font-bold mb-1">
                      {metric.score}
                    </div>
                    <div className="text-xs opacity-75">
                      {getScoreLabel(metric.score)}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Add New Metric Card - Only in Edit Mode */}
        {isAdmin && isEditMode && (
          <div 
            className="border-2 border-dashed border-blue-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
            onClick={onAddRadarDataPoint}
          >
            <div className="text-center text-blue-600">
              <Plus className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Metric</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessAssessment; 