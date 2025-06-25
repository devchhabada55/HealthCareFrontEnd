import React from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import { MentalRadarDataPoint } from '../../hooks/useMentalHealthData';

interface MentalAssessmentProps {
  mentalRadarData: MentalRadarDataPoint[];
  isEditMode: boolean;
  isAdmin: boolean;
  activeMetric: string | null;
  onSetActiveMetric: (metric: string | null) => void;
  onAddRadarDataPoint: () => void;
  onUpdateRadarDataPoint: (index: number, field: keyof MentalRadarDataPoint, value: any) => void;
  onRemoveRadarDataPoint: (index: number) => void;
}

const MentalAssessment: React.FC<MentalAssessmentProps> = ({
  mentalRadarData,
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
          <Target className="w-6 h-6 mr-2 text-purple-500" />
          Comprehensive Mental Assessment
        </h2>
        {isAdmin && isEditMode && (
          <span className="text-sm text-purple-600 font-medium">
            Edit Mode: Modify metrics below
          </span>
        )}
      </div>
      
      {isAdmin && isEditMode && (
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-purple-800">Admin Edit Mode Active</h3>
            <span className="text-xs text-purple-600">Click on metric cards below to edit directly</span>
          </div>
        </div>
      )}
      
      {/* Enhanced Radar Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={mentalRadarData} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fontSize: 12, fill: '#374151' }}
              className="text-sm"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 6]} 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickCount={7}
            />
            <Radar 
              name="Your Score" 
              dataKey="value" 
              stroke="#8b5cf6"
              fill="#8b5cf6" 
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{ r: 4, fill: '#8b5cf6' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Metric Cards - 3 buttons per row, names only */}
      <div className="grid grid-cols-3 gap-4">
        {mentalRadarData.map((metric, index) => {
          const isActive = activeMetric === metric.subject;

          return (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                isAdmin && isEditMode 
                  ? 'bg-purple-50 border-purple-200' 
                  : `cursor-pointer transform hover:scale-105 ${
                      isActive 
                        ? 'ring-2 ring-purple-500 shadow-lg' 
                        : metric.colorClass || 'bg-gray-50 hover:bg-gray-100'
                    }`
              }`}
              onClick={!isAdmin || !isEditMode ? () => onSetActiveMetric(isActive ? null : metric.subject) : undefined}
            >
              <div className="text-center">
                {isAdmin && isEditMode ? (
                  <>
                    {/* Editable Metric Name */}
                    <textarea
                      value={metric.subject}
                      onChange={(e) => onUpdateRadarDataPoint(index, 'subject', e.target.value)}
                      className="w-full font-medium text-sm mb-2 leading-tight bg-transparent border border-purple-300 rounded px-2 py-1 text-center resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={2}
                    />
                    
                    {/* Editable Score (hidden from view) */}
                    <div className="flex items-center justify-center mb-2">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="6"
                        value={metric.value}
                        onChange={(e) => onUpdateRadarDataPoint(index, 'value', parseFloat(e.target.value))}
                        className="text-2xl font-bold w-16 text-center bg-transparent border border-purple-300 rounded px-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <span className="text-lg text-gray-500 ml-1">/6</span>
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
                    <h3 className="font-medium text-sm leading-tight">
                      {metric.subject}
                    </h3>
                  </>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Add New Metric Card - Only in Edit Mode */}
        {isAdmin && isEditMode && (
          <div 
            className="border-2 border-dashed border-purple-300 rounded-lg p-4 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
            onClick={onAddRadarDataPoint}
          >
            <div className="text-center text-purple-600">
              <Plus className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Metric</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalAssessment;