import { useState } from 'react';

interface MentalRadarDataPoint {
  subject: string;
  colorClass: string;
  value: number;
}

interface Note {
  id: string;
  type: 'text' | 'image' | 'pdf' | 'video' | 'file';
  title: string;
  content: string;
  fileName?: string;
  fileSize?: string;
  createdAt: string;
}

interface MentalParameters {
  perfectionism: number;
  missingDissociation: number;
  selfDemand: number;
  anxiety: number;
  externalDemand: number;
  recognition: number;
  nervousnessAndMentalFatigue: number;
}

interface StressCategories {
  workStress: number;
  familyStress: number;
  socialStress: number;
}

export const useMentalHealthData = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [showInfoCard, setShowInfoCard] = useState<string | null>(null);

  // Color options for parameter cards
  const cardColors = [
    'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
    'bg-red-50 border-red-200 text-red-800 hover:bg-red-100',
    'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100'
  ];

  // Mental Health Radar Chart Data
  const [mentalRadarData, setMentalRadarData] = useState<MentalRadarDataPoint[]>([
    { subject: 'Mental Resilience', colorClass: cardColors[0], value: 4 },
    { subject: 'Overcommitment', colorClass: cardColors[1], value: 2 },
    { subject: 'Stress Load', colorClass: cardColors[2], value: 4 },
    { subject: 'Stress Resilience', colorClass: cardColors[0], value: 5 },
    { subject: 'Stress Hormonal Load', colorClass: cardColors[1], value: 3 },
    { subject: 'Stress Resilience Hormonal', colorClass: cardColors[2], value: 3 }
  ]);

  // Mental Resilience Parameters
  const [mentalParameters, setMentalParameters] = useState<MentalParameters>({
    perfectionism: 3.2,
    missingDissociation: 1.8,
    selfDemand: 4.1,
    anxiety: 2.5,
    externalDemand: 3.7,
    recognition: 2.2,
    nervousnessAndMentalFatigue: 3.9
  });

  // Overcommitment stress categories
  const [stressCategories, setStressCategories] = useState<StressCategories>({
    workStress: 3,
    familyStress: 1,
    socialStress: 2
  });

  // Key Findings State
  const [keyFindings, setKeyFindings] = useState([
    "High stress resilience but showing signs of perfectionism",
    "Excellent social support system contributing to mental wellbeing",
    "Moderate work-life balance concerns requiring attention",
    "Strong emotional regulation capabilities",
    "Need for improved sleep hygiene and recovery practices"
  ]);

  // Notes State
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      type: 'text',
      title: 'Stress Management Progress',
      content: 'Patient has shown significant improvement in stress management techniques. Regular meditation practice has been particularly effective.',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      type: 'text',
      title: 'Sleep Pattern Observations',
      content: 'Sleep quality has been inconsistent. Recommended implementing a stricter bedtime routine and reducing screen time.',
      createdAt: new Date().toISOString()
    }
  ]);

  return {
    // State
    isEditMode,
    setIsEditMode,
    showAdminPanel,
    setShowAdminPanel,
    activeMetric,
    setActiveMetric,
    showInfoCard,
    setShowInfoCard,
    cardColors,
    mentalRadarData,
    setMentalRadarData,
    mentalParameters,
    setMentalParameters,
    stressCategories,
    setStressCategories,
    keyFindings,
    setKeyFindings,
    notes,
    setNotes
  };
};

export type { MentalRadarDataPoint, Note, MentalParameters, StressCategories }; 