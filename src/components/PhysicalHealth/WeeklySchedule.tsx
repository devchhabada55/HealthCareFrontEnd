import React, { useState } from 'react';
import { Trash2, Plus} from 'lucide-react';

interface ScheduleItem {
  id: string;
  day: string;
  activity: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

interface WeeklyScheduleProps {
  isAdmin: boolean;
  isEditMode: boolean;
  recommendations: string[];
  updateRecommendation: (index: number, value: string) => void;
  removeRecommendation: (index: number) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  isAdmin,
  isEditMode,
  recommendations,
  updateRecommendation,
  removeRecommendation
}) => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { id: '1', day: 'Monday & Wednesday', activity: 'Cardio (30 min walking/swimming)', color: 'blue' },
    { id: '2', day: 'Tuesday & Thursday', activity: 'Strength training (bodyweight exercises)', color: 'green' },
    { id: '3', day: 'Friday', activity: 'Flexibility & mobility work', color: 'purple' }
  ]);

  const addScheduleItem = () => {
    const colors: ('blue' | 'green' | 'purple' | 'orange' | 'red')[] = ['blue', 'green', 'purple', 'orange', 'red'];
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      day: 'New Day',
      activity: 'New Activity',
      color: colors[scheduleItems.length % colors.length]
    };
    setScheduleItems([...scheduleItems, newItem]);
  };

  const updateScheduleItem = (id: string, field: 'day' | 'activity', value: string) => {
    setScheduleItems(items =>
      items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeScheduleItem = (id: string) => {
    setScheduleItems(items => items.filter(item => item.id !== id));
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-900 border-blue-300';
      case 'green': return 'bg-green-50 text-green-900 border-green-300';
      case 'purple': return 'bg-purple-50 text-purple-900 border-purple-300';
      case 'orange': return 'bg-orange-50 text-orange-900 border-orange-300';
      case 'red': return 'bg-red-50 text-red-900 border-red-300';
      default: return 'bg-gray-50 text-gray-900 border-gray-300';
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Suggested Weekly Schedule</h2>
        {isAdmin && isEditMode && (
          <button
            onClick={addScheduleItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Schedule Item
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scheduleItems.map((item) => (
          <div key={item.id} className={`p-4 rounded-lg relative group ${getColorClasses(item.color)}`}>
            {isAdmin && isEditMode ? (
              <>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeScheduleItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.day}
                  onChange={(e) => updateScheduleItem(item.id, 'day', e.target.value)}
                  className="font-medium bg-transparent border-b focus:outline-none w-full mb-2 pr-8"
                />
                <textarea
                  value={item.activity}
                  onChange={(e) => updateScheduleItem(item.id, 'activity', e.target.value)}
                  className="text-sm bg-transparent border-b focus:outline-none w-full resize-none pr-8"
                  rows={2}
                />
              </>
            ) : (
              <>
                <h3 className="font-medium">{item.day}</h3>
                <p className="text-sm mt-1">{item.activity}</p>
              </>
            )}
          </div>
        ))}
        
        {/* Add New Item Card - Only in Edit Mode */}
        {isAdmin && isEditMode && scheduleItems.length < 7 && (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
            onClick={addScheduleItem}
          >
            <div className="text-center text-gray-600 hover:text-blue-600">
              <Plus className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Day</span>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      {recommendations && recommendations.length > 0 && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                {isAdmin && isEditMode ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <textarea
                      value={recommendation}
                      onChange={(e) => updateRecommendation(index, e.target.value)}
                      className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={2}
                    />
                    <button
                      onClick={() => removeRecommendation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-700 flex-1">{recommendation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule; 