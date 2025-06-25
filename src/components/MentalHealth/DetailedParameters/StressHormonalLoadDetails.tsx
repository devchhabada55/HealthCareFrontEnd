import React, { useState } from 'react';
import { Edit3, Save, HelpCircle } from 'lucide-react';

interface StressHormonalLoadDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
  onShowInfoCard?: (type: string) => void;
}

const StressHormonalLoadDetails: React.FC<StressHormonalLoadDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false,
  onShowInfoCard
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // DHEA-S Level
  const [dheasLevel, setDheasLevel] = useState(350);
  const [userAge] = useState(45);
  const [userGender] = useState('Male');

  // TCO (Total Cortisol Output)
  const [tcoLevel, setTcoLevel] = useState(1.45);

  const [dailyStress] = useState([
    { day: 'Day 1', reaction: 50 },
    { day: 'Day 2', reaction: 70 },
    { day: 'Day 3', reaction: 60 },
    { day: 'Day 4', reaction: 55 },
    { day: 'Day 5', reaction: 75 },
  ]);

  const overallStressScore = Math.round(dailyStress.reduce((sum, day) => sum + day.reaction, 0) / dailyStress.length);
  const isOverallStressNormal = overallStressScore <= 65;

  const normalDaysCount = dailyStress.filter(d => d.reaction <= 65).length;
  const isDailyStressOverallNormal = normalDaysCount >= 4;

  const updateDheasLevel = (value: number) => {
    setDheasLevel(value);
  };

  const updateTcoLevel = (value: number) => {
    setTcoLevel(value);
  };


  // DHEA-S reference ranges for males by age
  const getDheasReferenceRange = (age: number, gender: string) => {
    if (gender === 'Male') {
      if (age >= 18 && age <= 29) return { min: 280, max: 640, range: '280 - 640 μg/dL', ageRangeDisplay: '18-29 years' };
      if (age >= 30 && age <= 39) return { min: 220, max: 520, range: '220 - 520 μg/dL', ageRangeDisplay: '30-39 years' };
      if (age >= 40 && age <= 49) return { min: 180, max: 460, range: '180 - 460 μg/dL', ageRangeDisplay: '40-49 years' };
      if (age >= 50 && age <= 59) return { min: 120, max: 400, range: '120 - 400 μg/dL', ageRangeDisplay: '50-59 years' };
    }
    // Default range for females or other cases
    return { min: 150, max: 380, range: '150 - 380 μg/dL', ageRangeDisplay: '18-59 years (Female)' };
  };

  const referenceRange = getDheasReferenceRange(userAge, userGender);
  const isDheasNormal = dheasLevel >= referenceRange.min && dheasLevel <= referenceRange.max;

  const getTcoStatus = (value: number) => {
    if (value >= 1.29 && value <= 1.75) return { status: 'Normal', color: 'green' };
    if (value < 1.29) return { status: 'Low', color: 'yellow' };
    return { status: 'High', color: 'red' };
  };

  const tcoStatus = getTcoStatus(tcoLevel);

  // const ageRanges = [
  //   { range: '18-29 years', values: '280 - 640 μg/dL' },
  //   { range: '30-39 years', values: '220 - 520 μg/dL' },
  //   { range: '40-49 years', values: '180 - 460 μg/dL' },
  //   { range: '50-59 years', values: '120 - 400 μg/dL' }
  // ];

  return (
    <div className="space-y-6">
      {/* DHEA-S Section */}
      <div className={`bg-white rounded-xl shadow-sm border ${isDheasNormal ? 'border-green-300' : 'border-red-300'} overflow-hidden`}>
        <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">DHEA-S Levels</h3>
            <button
              onClick={() => onShowInfoCard && onShowInfoCard('dheas')}
              className="text-gray-500 hover:text-purple-600 transition-colors p-1"
              title="Learn more about DHEA-S Levels"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Current DHEA-S Level */}
            <div className="flex-1">
              <div className={`bg-white rounded-xl border-2 ${isDheasNormal ? 'border-green-300' : 'border-red-300'} p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-base font-semibold text-gray-900">Current DHEA-S Level</h4>
                  {/* <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {userGender}, Age {userAge}
                  </span> */}
                </div>
                <div className="flex items-center justify-between mb-4">
                  {isAdmin && isEditMode && editingField === 'dheasLevel' ? (
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={dheasLevel}
                      onChange={(e) => updateDheasLevel(parseInt(e.target.value))}
                      className="text-4xl font-bold text-purple-600 w-32 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-600"
                    />
                  ) : (
                    <div className={`text-4xl font-bold ${isDheasNormal ? 'text-green-600' : 'text-red-600'}`}>{dheasLevel} μg/dL</div>
                  )}
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'dheasLevel' ? null : 'dheasLevel')}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      {editingField === 'dheasLevel' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: `${Math.min((dheasLevel/referenceRange.max) * 100, 100)}%` }}
                  />
                </div>
                <p className={`text-sm mt-2 ${isDheasNormal ? 'text-green-800' : 'text-red-800'}`}>
                  {isDheasNormal ? `Within normal range (${referenceRange.range})` : `Outside normal range (${referenceRange.range})`}
                </p>
              </div>
            </div>

            {/* Reference Ranges */}
            <div className="flex-1">
              <div className={`bg-gray-50 rounded-xl border ${isDheasNormal ? 'border-green-300' : 'border-red-300'} p-6`}>
                <h4 className="text-base font-semibold text-gray-900 mb-4">Normal Reference Ranges (Male)</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div
                      className="p-2 rounded-lg border border-gray-300"
                    >
                      <span className="font-medium">{referenceRange.ageRangeDisplay}</span>
                      <div className="text-gray-800">{referenceRange.range}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TCO and Stress Reactions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Cortisol Output (TCO) */}
        <div className={`bg-white rounded-xl border-2 z-10 ${tcoStatus.color === 'green' ? 'border-green-300' : tcoStatus.color === 'yellow' ? 'border-yellow-300' : 'border-red-300'} overflow-hidden`}>
          <div className="bg-white px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Total Cortisol Output (TCO)</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onShowInfoCard && onShowInfoCard('tco')}
                  className="text-gray-500 hover:text-purple-600 transition-colors p-1"
                  title="Learn more about Total Cortisol Output"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setEditingField(editingField === 'tcoLevel' ? null : 'tcoLevel')}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {editingField === 'tcoLevel' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 rounded-b-xl">
            <div className="mb-4">
              {isAdmin && isEditMode && editingField === 'tcoLevel' ? (
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="3"
                  value={tcoLevel}
                  onChange={(e) => updateTcoLevel(parseFloat(e.target.value))}
                  className="text-4xl font-bold text-purple-600 w-24 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-purple-600"
                />
              ) : (
                <div className={`text-4xl font-bold ${tcoStatus.status === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>{tcoLevel}</div>
              )}
              <p className="text-sm text-gray-600 mt-2">Normal range: 1.29 - 1.75</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className={`h-2.5 rounded-full ${
                  tcoStatus.color === 'green' ? 'bg-green-500' : 
                  tcoStatus.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(((tcoLevel - 1.29) / (1.75 - 1.29)) * 100, 100)}%` }}
              />
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              tcoStatus.color === 'green' ? 'bg-green-100 text-green-800' :
              tcoStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {tcoStatus.status}
            </span>
          </div>
        </div>

        {/* Stress Reactions */}
        <div className={`bg-white rounded-xl shadow-sm border ${isDailyStressOverallNormal ? 'border-green-300' : 'border-red-300'} overflow-hidden`}>
          <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Stress Reactions</h3>
              <button
                onClick={() => onShowInfoCard && onShowInfoCard('stressReactions')}
                className="text-gray-500 hover:text-gray-900 transition-colors p-1"
                title="Learn more about Stress Reactions"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Overall Stress Reaction Score</span>
                <span className={`text-3xl font-bold ${isOverallStressNormal ? 'text-green-600' : 'text-red-600'}`}>{overallStressScore}%</span>
              </div>
              {/* <p className={`text-base font-semibold mt-2 ${isDailyStressOverallNormal ? 'text-green-800' : 'text-red-800'}`}>
              Overall status: {isDailyStressOverallNormal ? 'Normal' : 'Elevated'} based on daily reactions.
              </p> */}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Stress Reactions</h3>
            <div className="flex justify-around items-end h-32 mb-4 p-4 rounded-lg border border-gray-100 bg-white">
              {dailyStress.map((data) => (
                <div key={data.day} className="flex flex-col items-center">
                  <div
                    className={`w-8 rounded-t-lg ${data.reaction <= 65 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ height: `${data.reaction * 0.8}px` }} // Scale height for visualization
                  ></div>
                  <span className="text-xs mt-1 text-gray-600">{data.day}</span>
                  <span className="text-sm text-gray-800 font-medium">{data.reaction}%</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {/* Object.entries(stressReactions).map(([key, value]) => {
                const label = key === 'physicalReactions' ? 'Physical Reactions' :
                            key === 'emotionalResponses' ? 'Emotional Responses' : 'Behavioral Changes';
                
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{value}%</span>
                      {isAdmin && isEditMode && (
                        <button
                          onClick={() => setEditingField(editingField === key ? null : key)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          {editingField === key ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              }) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressHormonalLoadDetails; 