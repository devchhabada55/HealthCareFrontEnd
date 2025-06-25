import { MentalRadarDataPoint, Note, MentalParameters, StressCategories } from './useMentalHealthData';

interface MentalHealthData {
  mentalRadarData: MentalRadarDataPoint[];
  setMentalRadarData: (data: MentalRadarDataPoint[]) => void;
  mentalParameters: MentalParameters;
  setMentalParameters: (params: MentalParameters) => void;
  stressCategories: StressCategories;
  setStressCategories: (categories: StressCategories) => void;
  keyFindings: string[];
  setKeyFindings: (findings: string[]) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  cardColors: string[];
}

export const useMentalHealthActions = (healthData: MentalHealthData) => {
  // Admin Functions
  const handleSaveChanges = () => {
    console.log('Saving mental health data changes...', {
      mentalRadarData: healthData.mentalRadarData,
      keyFindings: healthData.keyFindings,
      notes: healthData.notes,
      mentalParameters: healthData.mentalParameters,
      stressCategories: healthData.stressCategories
    });
  };

  // Key Findings Functions
  const addKeyFinding = () => {
    healthData.setKeyFindings([...healthData.keyFindings, 'New finding']);
  };

  const updateKeyFinding = (index: number, value: string) => {
    const updated = [...healthData.keyFindings];
    updated[index] = value;
    healthData.setKeyFindings(updated);
  };

  const removeKeyFinding = (index: number) => {
    healthData.setKeyFindings(healthData.keyFindings.filter((_, i) => i !== index));
  };

  // Mental Radar Data Functions
  const addMentalRadarDataPoint = () => {
    const randomColor = healthData.cardColors[Math.floor(Math.random() * healthData.cardColors.length)];
    healthData.setMentalRadarData([...healthData.mentalRadarData, {
      subject: 'New Metric',
      colorClass: randomColor,
      value: 3
    }]);
  };

  const removeMentalRadarDataPoint = (index: number) => {
    healthData.setMentalRadarData(healthData.mentalRadarData.filter((_, i) => i !== index));
  };

  const updateMentalRadarDataPoint = (index: number, field: keyof MentalRadarDataPoint, value: any) => {
    const updated = [...healthData.mentalRadarData];
    const processedValue = field === 'value' ? (isNaN(parseFloat(value)) ? 3 : Math.round(parseFloat(value))) : value;
    updated[index] = { ...updated[index], [field]: processedValue };
    healthData.setMentalRadarData(updated);
  };

  // Mental Parameters Functions
  const updateMentalParameter = (field: keyof MentalParameters, value: number) => {
    healthData.setMentalParameters({ ...healthData.mentalParameters, [field]: value });
  };

  // Stress Categories Functions
  const updateStressCategory = (field: keyof StressCategories, value: number) => {
    healthData.setStressCategories({ ...healthData.stressCategories, [field]: value });
  };

  // Notes Functions
  const addNote = (type: 'text' | 'image' | 'pdf' | 'video' | 'file', title: string, content: string, fileName?: string, fileSize?: string) => {
    healthData.setNotes([
      ...healthData.notes,
      {
        id: Date.now().toString(),
        type,
        title,
        content,
        fileName,
        fileSize,
        createdAt: new Date().toISOString()
      }
    ]);
  };

  const updateNote = (id: string, field: string, value: string) => {
    healthData.setNotes(healthData.notes.map(note => 
      note.id === id ? { ...note, [field]: value } : note
    ));
  };

  const removeNote = (id: string) => {
    healthData.setNotes(healthData.notes.filter(note => note.id !== id));
  };

  return {
    handleSaveChanges,
    addKeyFinding,
    updateKeyFinding,
    removeKeyFinding,
    addMentalRadarDataPoint,
    removeMentalRadarDataPoint,
    updateMentalRadarDataPoint,
    updateMentalParameter,
    updateStressCategory,
    addNote,
    updateNote,
    removeNote
  };
}; 