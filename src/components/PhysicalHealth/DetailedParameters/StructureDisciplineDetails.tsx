import React, { useState } from 'react';
import { Target, TrendingUp, Check, X, Edit3, Save, Plus, Trash2 } from 'lucide-react';

interface StructureDisciplineDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const StructureDisciplineDetails: React.FC<StructureDisciplineDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false 
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [activityData, setActivityData] = useState([
    { day: 'Mon', sessions: 0, completed: false, exercise: '' },
    { day: 'Tue', sessions: 1, completed: true, exercise: 'Padel' },
    { day: 'Wed', sessions: 0, completed: false, exercise: '' },
    { day: 'Thu', sessions: 1, completed: true, exercise: 'Swimming' },
    { day: 'Fri', sessions: 0, completed: false, exercise: '' },
    { day: 'Sat', sessions: 1, completed: true, exercise: 'Tennis' },
    { day: 'Sun', sessions: 0, completed: false, exercise: '' }
  ]);

  const [recommendations, setRecommendations] = useState([
    { id: '1', title: 'Strength Training', description: '2-3 sessions per week focusing on major muscle groups' },
    { id: '2', title: 'Cardiovascular Exercise', description: '150 minutes of moderate intensity weekly' },
    { id: '3', title: 'Flexibility Training', description: 'Daily stretching for 10-15 minutes' }
  ]);

  const [benefits, setBenefits] = useState([
    { id: '1', title: 'Improved Cardiovascular Health', description: 'Strengthens heart and reduces disease risk' },
    { id: '2', title: 'Enhanced Mental Well-being', description: 'Reduces stress and improves mood' },
    { id: '3', title: 'Better Sleep Quality', description: 'Promotes deeper, more restful sleep patterns' }
  ]);

  const [targetSessions, setTargetSessions] = useState(5);
  const completedSessions = activityData.reduce((sum, day) => sum + day.sessions, 0);

  const updateActivityDay = (index: number, field: string, value: any) => {
    const updated = [...activityData];
    updated[index] = { ...updated[index], [field]: value };
    setActivityData(updated);
  };

  const updateRecommendation = (id: string, field: string, value: string) => {
    setRecommendations(recs => 
      recs.map(rec => rec.id === id ? { ...rec, [field]: value } : rec)
    );
  };

  const addRecommendation = () => {
    const newRec = {
      id: Date.now().toString(),
      title: 'New Activity',
      description: 'Description of the activity'
    };
    setRecommendations([...recommendations, newRec]);
  };

  const removeRecommendation = (id: string) => {
    setRecommendations(recs => recs.filter(rec => rec.id !== id));
  };

  const updateBenefit = (id: string, field: string, value: string) => {
    setBenefits(benefits => 
      benefits.map(benefit => benefit.id === id ? { ...benefit, [field]: value } : benefit)
    );
  };

  const addBenefit = () => {
    const newBenefit = {
      id: Date.now().toString(),
      title: 'New Benefit',
      description: 'Description of the benefit'
    };
    setBenefits([...benefits, newBenefit]);
  };

  const removeBenefit = (id: string) => {
    setBenefits(benefits => benefits.filter(benefit => benefit.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Physical Activity Assessment</h1>
        <p className="text-gray-600">Weekly performance overview and personalized recommendations</p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Activity Tracker */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Activity Sessions</h2>
              {isAdmin && isEditMode && (
                <button
                  onClick={() => setEditingField(editingField === 'activities' ? null : 'activities')}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  {editingField === 'activities' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </button>
              )}
            </div>
            <div className="flex items-center space-x-6 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-600">Completed: {completedSessions} sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                {isAdmin && isEditMode && editingField === 'activities' ? (
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600">Target:</span>
                    <input
                      type="number"
                      min="1"
                      max="14"
                      value={targetSessions}
                      onChange={(e) => setTargetSessions(parseInt(e.target.value))}
                      className="w-12 px-1 py-0.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-600">sessions</span>
                  </div>
                ) : (
                  <span className="text-gray-600">Target: {targetSessions} sessions</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Simple Daily Activity Grid */}
          <div className="space-y-4">
            {activityData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      day.completed 
                        ? 'bg-green-100 border-2 border-green-500' 
                        : 'bg-gray-100 border-2 border-gray-300'
                    } ${isAdmin && isEditMode && editingField === 'activities' ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                    onClick={() => {
                      if (isAdmin && isEditMode && editingField === 'activities') {
                        updateActivityDay(index, 'completed', !day.completed);
                        updateActivityDay(index, 'sessions', !day.completed ? 1 : 0);
                      }
                    }}
                  >
                    {day.completed ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  {isAdmin && isEditMode && editingField === 'activities' && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Sessions:</span>
                      <input
                        type="number"
                        min="0"
                        max="3"
                        value={day.sessions}
                        onChange={(e) => {
                          const sessions = parseInt(e.target.value);
                          updateActivityDay(index, 'sessions', sessions);
                          updateActivityDay(index, 'completed', sessions > 0);
                        }}
                        className="w-12 px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-500">Exercise:</span>
                      <input
                        type="text"
                        placeholder="e.g. Padel, Swimming"
                        value={day.exercise}
                        onChange={(e) => updateActivityDay(index, 'exercise', e.target.value)}
                        className="w-24 px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {isAdmin && isEditMode && editingField === 'activities' ? (
                    <span className={`text-sm font-medium ${
                      day.sessions > 0 ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {day.sessions > 0 ? `${day.sessions} session${day.sessions > 1 ? 's' : ''}` : 'No Activity'}
                    </span>
                  ) : (
                    <span className={`text-sm font-medium ${
                      day.completed ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {day.completed ? `Exercise: ${day.exercise}` : 'No Activity'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
              <span className="text-lg font-bold text-blue-600">
                {completedSessions} / {targetSessions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((completedSessions / targetSessions) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-600">
                {Math.round((completedSessions / targetSessions) * 100)}% Complete
              </span>
            </div>
          </div> */}
        </div>

        {/* Right Column - Information Cards */}
        <div className="space-y-6">
          {/* Recommendations Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Recommended Activities</h3>
                  {isAdmin && isEditMode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={addRecommendation}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Add recommendation"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingField(editingField === 'recommendations' ? null : 'recommendations')}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        {editingField === 'recommendations' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      {isAdmin && isEditMode && editingField === 'recommendations' ? (
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={rec.title}
                              onChange={(e) => updateRecommendation(rec.id, 'title', e.target.value)}
                              className="font-medium text-sm text-gray-700 border-b border-blue-300 bg-transparent focus:outline-none focus:border-blue-600 flex-1"
                            />
                            <button
                              onClick={() => removeRecommendation(rec.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <textarea
                            value={rec.description}
                            onChange={(e) => updateRecommendation(rec.id, 'description', e.target.value)}
                            className="w-full text-sm text-gray-700 border border-blue-300 rounded px-2 py-1 bg-transparent focus:outline-none focus:border-blue-600"
                            rows={2}
                          />
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{rec.title}:</span> {rec.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Physical Activity Guidelines Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Physical Activity Benefits</h3>
                  {isAdmin && isEditMode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={addBenefit}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Add benefit"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingField(editingField === 'benefits' ? null : 'benefits')}
                        className="text-green-600 hover:text-green-800 p-1"
                      >
                        {editingField === 'benefits' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit) => (
                    <div key={benefit.id} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      {isAdmin && isEditMode && editingField === 'benefits' ? (
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={benefit.title}
                              onChange={(e) => updateBenefit(benefit.id, 'title', e.target.value)}
                              className="font-medium text-sm text-gray-700 border-b border-green-300 bg-transparent focus:outline-none focus:border-green-600 flex-1"
                            />
                            <button
                              onClick={() => removeBenefit(benefit.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <textarea
                            value={benefit.description}
                            onChange={(e) => updateBenefit(benefit.id, 'description', e.target.value)}
                            className="w-full text-sm text-gray-700 border border-green-300 rounded px-2 py-1 bg-transparent focus:outline-none focus:border-green-600"
                            rows={2}
                          />
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{benefit.title}:</span> {benefit.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureDisciplineDetails;