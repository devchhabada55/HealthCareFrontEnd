import React from 'react';
import { Activity, User, Heart } from 'lucide-react';
import { UserData } from '../../hooks/usePhysicalHealthData';
import { getHealthScoreColor, getHealthScoreBgColor, getHealthScoreLabel } from '../../utils/healthUtils';

interface AssessmentOverviewProps {
  userData: UserData;
  isEditMode: boolean;
  isAdmin: boolean;
  onUpdateUserData: (field: string, value: any) => void;
}

const AssessmentOverview: React.FC<AssessmentOverviewProps> = ({
  userData,
  isEditMode,
  isAdmin,
  onUpdateUserData
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Activity className="w-8 h-8 text-blue-500 mr-3" />
          Physical Health Assessment
        </h1>
        {isEditMode && (
          <div className="text-sm text-gray-500">
            Edit mode active
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Information */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <User className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium text-lg">
              {userData.name} • {userData.gender} • Age {userData.age}
            </span>
          </div>
          <div className="text-gray-600 ml-7">
            {userData.testDate} • {userData.height}cm • {userData.weight}kg
          </div>
        </div>
        
        {/* Overall Health Score */}
        <div className="flex items-center justify-end">
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Overall Health Score</div>
            <div className="flex items-center">
              {isAdmin && isEditMode ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={userData.overallHealthScore}
                  onChange={(e) => onUpdateUserData('overallHealthScore', parseInt(e.target.value))}
                  className={`text-4xl font-bold mr-3 w-20 border-b-2 bg-transparent text-center focus:outline-none ${getHealthScoreColor(userData.overallHealthScore)}`}
                />
              ) : (
                <div className={`text-4xl font-bold mr-3 ${getHealthScoreColor(userData.overallHealthScore)}`}>
                  {userData.overallHealthScore}
                </div>
              )}
              <div className="text-gray-400 text-lg">/100</div>
            </div>
            <div className={`text-sm font-medium ${getHealthScoreColor(userData.overallHealthScore)}`}>
              {getHealthScoreLabel(userData.overallHealthScore)}
            </div>
          </div>
          <div className={`ml-4 p-3 rounded-full ${getHealthScoreBgColor(userData.overallHealthScore)}`}>
            <Heart className={`w-8 h-8 ${getHealthScoreColor(userData.overallHealthScore)}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentOverview; 