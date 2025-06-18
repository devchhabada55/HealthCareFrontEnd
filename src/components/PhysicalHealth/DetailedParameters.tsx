import React from 'react';
import { X, Plus } from 'lucide-react';
import MetabolicsHealthDetails from './DetailedParameters/MetabolicsHealthDetails';
import CardiovascularFitnessDetails from './DetailedParameters/CardiovascularFitnessDetails';
import FunctionalCapacityDetails from './DetailedParameters/FunctionalCapacityDetails';
import MuscleStrengthRecoveryDetails from './DetailedParameters/MuscleStrengthRecoveryDetails';
import StructureDisciplineDetails from './DetailedParameters/StructureDisciplineDetails';
import { DetailedParameter } from '../../hooks/usePhysicalHealthData';

interface DetailedParametersProps {
  activeMetric: string | null;
  setActiveMetric: (metric: string | null) => void;
  detailedParameters: Record<string, DetailedParameter[]>;
  isAdmin: boolean;
  isEditMode: boolean;
  onAddDetailedParameter: (domain: string) => void;
}

const DetailedParameters: React.FC<DetailedParametersProps> = ({
  activeMetric,
  setActiveMetric,
  isAdmin,
  isEditMode,
  onAddDetailedParameter
}) => {
  if (!activeMetric) return null;

  const renderDetailedView = () => {
    switch (activeMetric) {
      case 'Metabolic Health':
        return <MetabolicsHealthDetails isAdmin={isAdmin} isEditMode={isEditMode} />;
      
      case 'Cardiovascular Fitness':
        return <CardiovascularFitnessDetails isAdmin={isAdmin} isEditMode={isEditMode} />;

      case 'Functional Capacity':
        return <FunctionalCapacityDetails isAdmin={isAdmin} isEditMode={isEditMode} />;

      case 'Muscle Strength & Recovery':
        return <MuscleStrengthRecoveryDetails isAdmin={isAdmin} isEditMode={isEditMode} />;

      case 'Structure & Discipline':
        return <StructureDisciplineDetails isAdmin={isAdmin} isEditMode={isEditMode} />;

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Detailed parameters not yet implemented for {activeMetric}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
          <h2 className="text-xl font-semibold text-gray-800">
            {activeMetric} - Detailed Parameters
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {isAdmin && isEditMode && (
            <button
              onClick={() => onAddDetailedParameter(activeMetric)}
              className="text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-300 rounded-md text-sm"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add Parameter
            </button>
          )}
          <button
            onClick={() => setActiveMetric(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {renderDetailedView()}

      {/* Close Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setActiveMetric(null)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Close Details
        </button>
      </div>
    </div>
  );
};

export default DetailedParameters; 