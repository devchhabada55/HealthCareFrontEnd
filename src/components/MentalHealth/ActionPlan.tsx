import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ActionItem {
  id: string;
  text: string;
  category: 'immediate' | 'short-term';
}

interface ActionPlanProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ isAdmin = false, isEditMode = false }) => {
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: '1', text: 'Continue daily mindfulness practice', category: 'immediate' },
    { id: '2', text: 'Start journaling for 10 minutes daily', category: 'immediate' },
    { id: '3', text: 'Practice deep breathing exercises', category: 'immediate' },
    { id: '4', text: 'Improve stress management techniques', category: 'short-term' },
    { id: '5', text: 'Enhance emotional regulation skills', category: 'short-term' },
    { id: '6', text: 'Build stronger coping mechanisms', category: 'short-term' },
  ]);

  const addActionItem = (category: 'immediate' | 'short-term') => {
    const newItem: ActionItem = {
      id: Date.now().toString(),
      text: 'New action item - click to edit',
      category
    };
    setActionItems([...actionItems, newItem]);
  };

  const updateActionItem = (id: string, text: string) => {
    setActionItems(actionItems.map(item => 
      item.id === id ? { ...item, text } : item
    ));
  };

  const removeActionItem = (id: string) => {
    setActionItems(actionItems.filter(item => item.id !== id));
  };

  const immediateActions = actionItems.filter(item => item.category === 'immediate');
  const shortTermActions = actionItems.filter(item => item.category === 'short-term');
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recommended Action Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Immediate Actions (0-4 weeks)</h3>
            {isAdmin && isEditMode && (
              <button
                onClick={() => addActionItem('immediate')}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {immediateActions.map((action) => (
              <li key={action.id} className="flex items-start group">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                {isAdmin && isEditMode ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={action.text}
                      onChange={(e) => updateActionItem(action.id, e.target.value)}
                      className="text-sm flex-1 border-b border-gray-300 focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={() => removeActionItem(action.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm">{action.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Short-term Goals (1-3 months)</h3>
            {isAdmin && isEditMode && (
              <button
                onClick={() => addActionItem('short-term')}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {shortTermActions.map((action) => (
              <li key={action.id} className="flex items-start group">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                {isAdmin && isEditMode ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={action.text}
                      onChange={(e) => updateActionItem(action.id, e.target.value)}
                      className="text-sm flex-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeActionItem(action.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm">{action.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan; 