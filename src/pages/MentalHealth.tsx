import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft
} from 'lucide-react';

// Custom hooks
import { useMentalHealthData } from '../hooks/useMentalHealthData';
import { useMentalHealthActions } from '../hooks/useMentalHealthActions';

// Components
import AdminPanel from '../components/MentalHealth/AdminPanel';
import MentalAssessment from '../components/MentalHealth/MentalAssessment';
import KeyFindings from '../components/MentalHealth/KeyFindings';
import ActionPlan from '../components/MentalHealth/ActionPlan';
import Notes from '../components/MentalHealth/Notes';
import DetailedParameters from '../components/MentalHealth/DetailedParameters';

const MentalHealth: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';

  // Use custom hooks for state management
  const healthData = useMentalHealthData();
  const actions = useMentalHealthActions({
    mentalRadarData: healthData.mentalRadarData,
    setMentalRadarData: healthData.setMentalRadarData,
    mentalParameters: healthData.mentalParameters,
    setMentalParameters: healthData.setMentalParameters,
    stressCategories: healthData.stressCategories,
    setStressCategories: healthData.setStressCategories,
    keyFindings: healthData.keyFindings,
    setKeyFindings: healthData.setKeyFindings,
    notes: healthData.notes,
    setNotes: healthData.setNotes,
    cardColors: healthData.cardColors
  });

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
          onAddActionItem={() => {/* Placeholder for adding action item */}}
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

        {/* Mental Assessment - Radar Chart */}
        <MentalAssessment
          mentalRadarData={healthData.mentalRadarData}
          isEditMode={healthData.isEditMode}
          isAdmin={isAdmin}
          activeMetric={healthData.activeMetric}
          onSetActiveMetric={healthData.setActiveMetric}
          onAddRadarDataPoint={actions.addMentalRadarDataPoint}
          onUpdateRadarDataPoint={actions.updateMentalRadarDataPoint}
          onRemoveRadarDataPoint={actions.removeMentalRadarDataPoint}
        />

        {/* Detailed Parameters Modal */}
        <DetailedParameters
          activeMetric={healthData.activeMetric}
          setActiveMetric={healthData.setActiveMetric}
          isAdmin={isAdmin}
          isEditMode={healthData.isEditMode}
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

        {/* Notes Section */}
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

export default MentalHealth;