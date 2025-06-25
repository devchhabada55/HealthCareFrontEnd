import React, { useState } from 'react';
import { X} from 'lucide-react';
import MentalResilienceDetails from './DetailedParameters/MentalResilienceDetails';
import OvercommitmentDetails from './DetailedParameters/OvercommitmentDetails';
import StressLoadDetails from './DetailedParameters/StressLoadDetails';
import StressResilienceDetails from './DetailedParameters/StressResilienceDetails';
import StressHormonalLoadDetails from './DetailedParameters/StressHormonalLoadDetails';
import StressResilienceHormonalDetails from './DetailedParameters/StressResilienceHormonalDetails';

interface DetailedParametersProps {
  activeMetric: string | null;
  setActiveMetric: (metric: string | null) => void;
  isAdmin: boolean;
  isEditMode: boolean;
}

const DetailedParameters: React.FC<DetailedParametersProps> = ({
  activeMetric,
  setActiveMetric,
  isAdmin,
  isEditMode
}) => {
  const [showInfoCard, setShowInfoCard] = useState<string | null>(null);

  if (!activeMetric) return null;

  const InfoCard = ({ type }: { type: string }) => {
    const infoContent: { [key: string]: { title: string; description: string } } = {
      perfectionism: {
        title: "Perfectionism",
        description: "The tendency to set extremely high standards for oneself, often leading to self-criticism, anxiety, and stress when these standards are not met."
      },
      missingDissociation: {
        title: "Missing Dissociation",
        description: "Difficulty in detaching from work or stressful situations, leading to prolonged mental engagement and an inability to relax or recover."
      },
      selfDemand: {
        title: "Self Demand",
        description: "The internal pressure to continuously perform at a high level and to always be productive, often without acknowledging the need for rest or breaks."
      },
      anxiety: {
        title: "Anxiety",
        description: "A state of unease, worry, or fear, often over an impending event or something with an uncertain outcome. In mental resilience, it refers to the general level of anxiety experienced."
      },
      externalDemand: {
        title: "External Demand",
        description: "Pressure or expectations placed on an individual by external factors, such as work, social obligations, or family responsibilities, which can contribute to stress."
      },
      recognition: {
        title: "Recognition",
        description: "The perceived lack or presence of appreciation and acknowledgment for one's efforts and achievements, which can significantly impact motivation and mental well-being."
      },
      nervousnessAndMentalFatigue: {
        title: "Nervousness & Mental Fatigue",
        description: "A state characterized by persistent mental exhaustion, reduced cognitive function, and increased irritability, often resulting from prolonged stress or overwork."
      },
      bolt: {
        title: "Understanding BOLT Score",
        description: "The BOLT (Body Oxygen Level Test) score measures your breathing efficiency and CO₂ tolerance. This simple yet powerful test provides insights into your breathing patterns and their impact on stress resilience."
      },
      dheas: {
        title: "About DHEA-S Levels",
        description: "DHEA-S (Dehydroepiandrosterone sulfate) is a crucial hormone produced by your adrenal glands. It plays a vital role in stress response and overall health, with levels naturally varying by age and gender."
      },
      tco: {
        title: "Total Cortisol Output (TCO)",
        description: "Total Cortisol Output (TCO) measures the overall amount of cortisol produced by your adrenal glands throughout the day. Cortisol is a primary stress hormone, and a balanced output is essential for proper stress response and metabolic function."
      },
      stressReactions: {
        title: "Understanding Stress Reactions",
        description: "Stress reactions encompass various physical, emotional, and behavioral changes in response to stressors. Monitoring these reactions helps assess the body's overall stress burden and adaptive capacity."
      },
      comt: {
        title: "COMT Profile Analysis",
        description: "The COMT (Catechol-O-methyltransferase) gene influences how your body processes certain neurotransmitters, affecting your stress response and emotional resilience."
      }
    };

    const info = infoContent[type];
    if (!info) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowInfoCard(null)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl mx-4 p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
            <button
              onClick={() => setShowInfoCard(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-600">{info.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showInfoCard && <InfoCard type={showInfoCard} />}
      <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-500">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
            <h2 className="text-lg font-semibold text-gray-800">
              {activeMetric} - Detailed Parameters
            </h2>
          </div>
          <button
            onClick={() => setActiveMetric(null)}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Mental Resilience Details */}
          {activeMetric === 'Mental Resilience' && (
            <MentalResilienceDetails 
              isAdmin={isAdmin} 
              isEditMode={isEditMode}
              onShowInfoCard={setShowInfoCard}
            />
          )}

          {/* Overcommitment Details */}
          {activeMetric === 'Overcommitment' && (
            <OvercommitmentDetails 
              isAdmin={isAdmin} 
              isEditMode={isEditMode}
            />
          )}

          {/* Stress Load Details */}
          {activeMetric === 'Stress Load' && (
            <StressLoadDetails 
              isAdmin={isAdmin} 
              isEditMode={isEditMode}
            />
          )}

          {/* Stress Resilience Details */}
          {activeMetric === 'Stress Resilience' && (
            <StressResilienceDetails 
              isAdmin={isAdmin} 
              isEditMode={isEditMode}
              onShowInfoCard={setShowInfoCard}
            />
          )}

          {/* Stress Hormonal Load Details */}
          {activeMetric === 'Stress Hormonal Load' && (
            <StressHormonalLoadDetails 
              isAdmin={isAdmin} 
              isEditMode={isEditMode}
              onShowInfoCard={setShowInfoCard}
            />
          )}

          {/* Stress Resilience Hormonal Details */}
          {activeMetric === 'Stress Resilience Hormonal' && (
            <StressResilienceHormonalDetails 
              isAdmin={isAdmin} 
              isEditMode={isEditMode}
              onShowInfoCard={setShowInfoCard}
            />
          )}

          {/* Fallback for unknown metrics */}
          {!['Mental Resilience', 'Overcommitment', 'Stress Load', 'Stress Resilience', 'Stress Hormonal Load', 'Stress Resilience Hormonal'].includes(activeMetric) && (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{activeMetric}</h3>
              <p className="text-gray-600">Detailed parameters for {activeMetric} are not yet available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailedParameters; 