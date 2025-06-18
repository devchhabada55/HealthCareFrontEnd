import { 
  RadarDataPoint, 
  DetailedParameter, 
  UserData, 
  AssessmentData,
  Note
} from './usePhysicalHealthData';

interface UsePhysicalHealthActionsProps {
  keyFindings: string[];
  setKeyFindings: (findings: string[]) => void;
  recommendations: string[];
  setRecommendations: (recommendations: string[]) => void;
  radarData: RadarDataPoint[];
  setRadarData: (data: RadarDataPoint[]) => void;
  detailedParameters: Record<string, DetailedParameter[]>;
  setDetailedParameters: (params: Record<string, DetailedParameter[]>) => void;
  userData: UserData;
  assessmentData: AssessmentData;
  setIsEditMode: (value: boolean) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export const usePhysicalHealthActions = ({
  keyFindings,
  setKeyFindings,
  recommendations,
  setRecommendations,
  radarData,
  setRadarData,
  detailedParameters,
  setDetailedParameters,
  userData,
  assessmentData,
  setIsEditMode,
  notes,
  setNotes
}: UsePhysicalHealthActionsProps) => {
  
  // Admin Functions
  const handleSaveChanges = () => {
    setIsEditMode(false);
    // Here you would typically save to backend
    console.log('Saving changes...', {
      userData,
      assessmentData,
      radarData,
      keyFindings,
      recommendations
    });
  };

  // Key Findings Actions
  const addKeyFinding = () => {
    setKeyFindings([...keyFindings, "New finding - click to edit"]);
  };

  const removeKeyFinding = (index: number) => {
    setKeyFindings(keyFindings.filter((_, i) => i !== index));
  };

  const updateKeyFinding = (index: number, value: string) => {
    const updated = [...keyFindings];
    updated[index] = value;
    setKeyFindings(updated);
  };

  // Recommendations Actions
  const addRecommendation = () => {
    setRecommendations([...recommendations, "New recommendation - click to edit"]);
  };

  const removeRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const updateRecommendation = (index: number, value: string) => {
    const updated = [...recommendations];
    updated[index] = value;
    setRecommendations(updated);
  };

  // Radar Data Actions
  const addRadarDataPoint = () => {
    setRadarData([...radarData, { subject: 'New Metric', score: 50, fullMark: 100 }]);
  };

  const removeRadarDataPoint = (index: number) => {
    setRadarData(radarData.filter((_, i) => i !== index));
  };

  const updateRadarDataPoint = (index: number, field: string, value: string) => {
    const updated = [...radarData];
    updated[index] = { ...updated[index], [field]: value };
    setRadarData(updated);
  };

  // Detailed Parameters Actions
  const updateDetailedParameter = (domain: string, paramIndex: number, field: string, value: string) => {
    const updated = { ...detailedParameters };
    if (updated[domain as keyof typeof detailedParameters]) {
      (updated[domain as keyof typeof detailedParameters] as any)[paramIndex] = { 
        ...(updated[domain as keyof typeof detailedParameters] as any)[paramIndex], 
        [field]: value 
      };
      setDetailedParameters(updated);
    }
  };

  const addDetailedParameter = (domain: string) => {
    const updated = { ...detailedParameters };
    if (updated[domain as keyof typeof detailedParameters]) {
      (updated[domain as keyof typeof detailedParameters] as any).push({
        parameter: 'New Parameter',
        domain: domain,
        visualization: 'Chart Type',
        textInsight: 'Yes',
        value: 'Value',
        status: 'Normal'
      });
      setDetailedParameters(updated);
    }
  };

  const removeDetailedParameter = (domain: string, paramIndex: number) => {
    const updated = { ...detailedParameters };
    if (updated[domain as keyof typeof detailedParameters]) {
      (updated[domain as keyof typeof detailedParameters] as any) = (updated[domain as keyof typeof detailedParameters] as any).filter((_: any, i: number) => i !== paramIndex);
      setDetailedParameters(updated);
    }
  };

  // Notes Actions
  const addNote = (type: 'text' | 'image' | 'pdf' | 'video' | 'file', title: string, content: string, fileName?: string, fileSize?: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      type,
      title,
      content,
      fileName,
      fileSize,
      createdAt: new Date().toISOString()
    };
    setNotes([...notes, newNote]);
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id: string, field: string, value: string) => {
    const updated = notes.map(note => 
      note.id === id ? { ...note, [field]: value } : note
    );
    setNotes(updated);
  };

  return {
    // Admin
    handleSaveChanges,
    
    // Key Findings
    addKeyFinding,
    removeKeyFinding,
    updateKeyFinding,
    
    // Recommendations
    addRecommendation,
    removeRecommendation,
    updateRecommendation,
    
    // Radar Data
    addRadarDataPoint,
    removeRadarDataPoint,
    updateRadarDataPoint,
    
    // Detailed Parameters
    updateDetailedParameter,
    addDetailedParameter,
    removeDetailedParameter,
    
    // Notes
    addNote,
    removeNote,
    updateNote
  };
}; 