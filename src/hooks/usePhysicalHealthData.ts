import { useState } from 'react';

// Types
export interface UserData {
  name: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  testDate: string;
  overallHealthScore: number;
}

export interface AssessmentData {
  vo2max: number;
  handgripRight: number;
  handgripLeft: number;
  pushups: number;
  bmi: number;
}

export interface RadarDataPoint {
  subject: string;
  score: number;
  fullMark: number;
}

export interface DetailedParameter {
  parameter: string;
  domain: string;
  visualization: string;
  textInsight: string;
  value: string;
  status: string;
}

export interface MetricConfig {
  key: string;
  title: string;
  icon: any;
  color: 'red' | 'blue' | 'green' | 'purple' | 'orange';
  status: string;
  statusColor: 'red' | 'orange' | 'green';
  unit?: string;
}

export interface Note {
  id: string;
  type: 'text' | 'image' | 'pdf' | 'video' | 'file';
  content: string;
  title: string;
  fileName?: string;
  fileSize?: string;
  createdAt: string;
}

export const usePhysicalHealthData = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  // User Data State
  const [userData, setUserData] = useState<UserData>({
    name: "Yves Vannerom",
    gender: "Male",
    age: 45,
    height: 184,
    weight: 93,
    testDate: "April 8, 2025",
    overallHealthScore: 72
  });

  // Assessment Data State
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    vo2max: 32,
    handgripRight: 42.1,
    handgripLeft: 37.4,
    pushups: 9,
    bmi: 27.5
  });

  // Radar Chart Data State
  const [radarData, setRadarData] = useState<RadarDataPoint[]>([
    { subject: 'Metabolic Health', score: 65, fullMark: 100 },
    { subject: 'Cardiovascular Fitness', score: 30, fullMark: 100 },
    { subject: 'Functional Capacity', score: 35, fullMark: 100 },
    { subject: 'Muscle Strength & Recovery', score: 25, fullMark: 100 },
    { subject: 'Structure & Discipline', score: 45, fullMark: 100 }
  ]);

  // Key Findings State
  const [keyFindings, setKeyFindings] = useState<string[]>([
    "VO2 max of 32 ml/min/kg is below average for your age group",
    "Handgrip strength is normal but on the lower end",
    "Upper body strength needs significant improvement", 
    "Currently experiencing lower back pain",
    "Minimal regular physical activity (mainly padel)"
  ]);

  // Recommendations State
  const [recommendations, setRecommendations] = useState<string[]>([
    "Start with 2-3 cardio sessions per week (walking, swimming)",
    "Begin basic strength training with bodyweight exercises",
    "Continue physiotherapy for back pain management",
    "Gradually increase activity level over 3-6 months",
    "Focus on core strengthening and mobility work"
  ]);

  // Notes State
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      type: 'text',
      content: 'Patient has shown good compliance with previous recommendations. Continue monitoring progress.',
      title: 'Progress Note',
      createdAt: '2025-01-09T10:00:00Z'
    }
  ]);

  // Detailed Parameters Data
  const [detailedParameters, setDetailedParameters] = useState<Record<string, DetailedParameter[]>>({
    'Metabolic Health': [
      { parameter: 'Body Composition (fat/muscle balance, D-shape)', domain: 'Metabolic Health', visualization: 'Radar Chart / Bar Chart (fat %, muscle %)', textInsight: 'Yes', value: '23.5% fat, 76.5% muscle', status: 'Good' },
      { parameter: 'Fat Mass', domain: 'Metabolic Health', visualization: 'Stacked Bar Chart (normal vs. obese)', textInsight: 'Yes', value: '18.2 kg', status: 'Normal' },
      { parameter: 'Phase Angle', domain: 'Metabolic Health', visualization: 'Line Plot by Age / Colored Score Gauge', textInsight: 'Yes (interpretation varies by age)', value: '6.2°', status: 'Good' },
      { parameter: 'Visceral Fat', domain: 'Metabolic Health', visualization: 'Bar Chart with Zones (safe/risk)', textInsight: 'Yes', value: '8.5', status: 'Safe' },
      { parameter: 'Waist-to-Height Ratio', domain: 'Metabolic Health', visualization: 'Thermometer-style bar', textInsight: 'Yes', value: '0.52', status: 'Good' },
      { parameter: 'Waist Circumference', domain: 'Metabolic Health', visualization: 'Gender-Specific Color Ranges', textInsight: 'Yes', value: '94 cm', status: 'Normal' }
    ],
    'Cardiovascular Fitness': [
      { parameter: 'VO₂ Max', domain: 'Cardiovascular Fitness', visualization: 'Line Plot / Color Bar (with labels: good, average, etc.)', textInsight: 'Yes', value: '32 ml/min/kg', status: 'Below Average' },
      { parameter: 'Oxygen Saturation', domain: 'Cardiovascular Fitness', visualization: 'Simple Number Card / Green-Red bar', textInsight: 'Yes', value: '98%', status: 'Excellent' },
      { parameter: 'Blood Pressure', domain: 'Cardiovascular Fitness', visualization: 'Dual Gauge (Systolic/Diastolic)', textInsight: 'Yes', value: '128/82 mmHg', status: 'Normal' },
      { parameter: 'Resting Heart Rate', domain: 'Cardiovascular Fitness', visualization: 'Line Chart over time', textInsight: 'Yes', value: '72 bpm', status: 'Good' },
      { parameter: 'HRV (Heart Rate Variability)', domain: 'Cardiovascular Fitness', visualization: 'Boxplot / Score Meter', textInsight: 'Yes', value: '42 ms', status: 'Average' }
    ],
    'Functional Capacity': [
      { parameter: 'Handgrip Strength', domain: 'Functional Capacity', visualization: 'Dual Bar Chart (left/right hand)', textInsight: 'Yes', value: '42.1 kg (R), 37.4 kg (L)', status: 'Normal but Low' },
      { parameter: 'Ruffier-Dickson Index', domain: 'Functional Capacity', visualization: 'Score Indicator / Traffic Light Scale', textInsight: 'Yes', value: '8.2', status: 'Good' }
    ],
    'Muscle Strength & Recovery': [
      { parameter: 'Skeletal Muscle Mass (SSM)', domain: 'Muscle Strength & Recovery', visualization: 'Gauge / Progress Bar (vs. norm)', textInsight: 'Yes', value: '34.2 kg', status: 'Normal' }
    ],
    'Structure & Discipline': [
      { parameter: 'Activity (Q13: how often do sports)', domain: 'Structure & Discipline', visualization: 'Pie Chart / Weekly Bar Chart', textInsight: 'Yes', value: '2-3 times per week (Padel)', status: 'Moderate' }
    ]
  });

  return {
    // State
    isEditMode,
    setIsEditMode,
    showAdminPanel,
    setShowAdminPanel,
    activeMetric,
    setActiveMetric,
    userData,
    setUserData,
    assessmentData,
    setAssessmentData,
    radarData,
    setRadarData,
    keyFindings,
    setKeyFindings,
    recommendations,
    setRecommendations,
    detailedParameters,
    setDetailedParameters,
    notes,
    setNotes
  };
}; 