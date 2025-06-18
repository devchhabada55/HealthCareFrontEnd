import React from 'react';
import { UserData } from '../../hooks/usePhysicalHealthData';

interface UserInfoEditorProps {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  isAdmin: boolean;
  isEditMode: boolean;
}

const UserInfoEditor: React.FC<UserInfoEditorProps> = ({
  userData,
  setUserData,
  isAdmin,
  isEditMode
}) => {
  if (!isAdmin || !isEditMode) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-yellow-800 mb-3">Edit User Information</h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={userData.gender}
            onChange={(e) => setUserData({...userData, gender: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            value={userData.age}
            onChange={(e) => setUserData({...userData, age: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            value={userData.height}
            onChange={(e) => setUserData({...userData, height: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            value={userData.weight}
            onChange={(e) => setUserData({...userData, weight: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
          <input
            type="text"
            value={userData.testDate}
            onChange={(e) => setUserData({...userData, testDate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Overall Health Score</label>
        <input
          type="number"
          min="0"
          max="100"
          value={userData.overallHealthScore}
          onChange={(e) => setUserData({...userData, overallHealthScore: parseInt(e.target.value)})}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default UserInfoEditor; 