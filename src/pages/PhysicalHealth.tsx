import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Custom hooks
import { usePhysicalHealthData } from '../hooks/usePhysicalHealthData';
import { usePhysicalHealthActions } from '../hooks/usePhysicalHealthActions';

// Components
import AdminPanel from '../components/PhysicalHealth/AdminPanel';
import UserInfoEditor from '../components/PhysicalHealth/UserInfoEditor';
import AssessmentOverview from '../components/PhysicalHealth/AssessmentOverview';
import FitnessAssessment from '../components/PhysicalHealth/FitnessAssessment';
import DetailedParameters from '../components/PhysicalHealth/DetailedParameters';
import KeyFindings from '../components/PhysicalHealth/KeyFindings';
import ActionPlan from '../components/PhysicalHealth/ActionPlan';
import WeeklySchedule from '../components/PhysicalHealth/WeeklySchedule';
import Notes from '../components/PhysicalHealth/Notes';

const PhysicalHealth: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';

  // Use custom hooks for state management
  const healthData = usePhysicalHealthData();
  const actions = usePhysicalHealthActions(healthData);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Admin Panel */}
        <AdminPanel
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
          showAdminPanel={healthData.showAdminPanel}
          setIsEditMode={healthData.setIsEditMode}
          setShowAdminPanel={healthData.setShowAdminPanel}
          onSaveChanges={actions.handleSaveChanges}
          onAddKeyFinding={actions.addKeyFinding}
          onAddRecommendation={actions.addRecommendation}
          onAddNote={() => {/* This will be handled in the Notes component */}}
        />

        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
        </div>

        {/* User Info Editor */}
        <UserInfoEditor
          userData={healthData.userData}
          setUserData={healthData.setUserData}
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
        />

        {/* Assessment Overview */}
        <AssessmentOverview
          userData={healthData.userData}
          isEditMode={healthData.isEditMode}
          isAdmin={isAdmin}
          onUpdateUserData={(field: string, value: any) => {
            healthData.setUserData({ ...healthData.userData, [field]: value });
          }}
        />

        {/* Fitness Assessment */}
        <FitnessAssessment
          radarData={healthData.radarData}
          isEditMode={healthData.isEditMode}
          isAdmin={isAdmin}
          activeMetric={healthData.activeMetric}
          onSetActiveMetric={healthData.setActiveMetric}
          onAddRadarDataPoint={actions.addRadarDataPoint}
          onUpdateRadarDataPoint={actions.updateRadarDataPoint}
          onRemoveRadarDataPoint={actions.removeRadarDataPoint}
        />

        {/* Detailed Parameters Modal */}
        <DetailedParameters
          activeMetric={healthData.activeMetric}
          setActiveMetric={healthData.setActiveMetric}
          detailedParameters={healthData.detailedParameters}
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
          onAddDetailedParameter={actions.addDetailedParameter}
        />

        {/* Key Findings */}
        <KeyFindings
          keyFindings={healthData.keyFindings}
          isEditMode={healthData.isEditMode}
          isAdmin={isAdmin}
          onAddKeyFinding={actions.addKeyFinding}
          onUpdateKeyFinding={actions.updateKeyFinding}
          onRemoveKeyFinding={actions.removeKeyFinding}
        />

        {/* Action Plan */}
        <ActionPlan 
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
        />

        {/* Weekly Schedule */}
        <WeeklySchedule
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
          recommendations={healthData.recommendations}
          updateRecommendation={actions.updateRecommendation}
          removeRecommendation={actions.removeRecommendation}
        />

        {/* Notes Section - Below Weekly Schedule */}
        <Notes
          notes={healthData.notes}
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
          onAddNote={actions.addNote}
          onRemoveNote={actions.removeNote}
          onUpdateNote={actions.updateNote}
        />
      </div>
    </div>
  );
};

export default PhysicalHealth;