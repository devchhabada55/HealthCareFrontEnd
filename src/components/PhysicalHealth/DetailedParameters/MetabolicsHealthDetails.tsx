import React, { useState } from 'react';
import { Edit3, Save, Info } from 'lucide-react';
import { usePatient } from '../../../contexts/PatientContext';
import { 
  PieChart, 
  Pie, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface MetabolicHealthDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const MetabolicHealthDetails: React.FC<MetabolicHealthDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false 
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showInfoCard, setShowInfoCard] = useState<string | null>(null);
  const { patient } = usePatient();
  
  // Body Composition Data
  const [bodyComposition, setBodyComposition] = useState({
    muscleMass: 45.2,
    fatMass: 28.3,
    waterContent: 26.5
  });

  // Visceral Fat Data
  const [visceralFat, setVisceralFat] = useState({
    value: 91.2,
    unit: 'cm²'
  });

  // Phase Angle Data
  const [phaseAngle, setPhaseAngle] = useState({
    value: 6.2,
    unit: '°'
  });

  // Waist Measurements
  const [waistMeasurements, setWaistMeasurements] = useState({
    waistToHeightRatio: 0.52,
    waistCircumference: 94
  });

  const updateBodyComposition = (field: string, value: number) => {
    setBodyComposition(prev => ({ ...prev, [field]: value }));
  };

  const updateVisceralFat = (field: string, value: number | string) => {
    setVisceralFat(prev => ({ ...prev, [field]: value }));
  };

  const updatePhaseAngle = (field: string, value: number | string) => {
    setPhaseAngle(prev => ({ ...prev, [field]: value }));
  };

  const updateWaistMeasurements = (field: string, value: number) => {
    setWaistMeasurements(prev => ({ ...prev, [field]: value }));
  };

  // Dynamic pie chart data
  const pieChartData = [
    { name: 'Muscle Mass', value: bodyComposition.muscleMass, fill: '#10b981' },
    { name: 'Fat Mass', value: bodyComposition.fatMass, fill: '#f59e0b' },
    { name: 'Water Content', value: bodyComposition.waterContent, fill: '#3b82f6' }
  ];

  // Info card content
  const infoContent = {
    bodyComposition: {
      title: "Body Composition Analysis",
      description: "A comprehensive analysis that breaks down your body into its main components: muscle mass (lean tissue), fat mass (adipose tissue), and water content. This assessment helps evaluate overall body health, metabolic function, and fitness level."
    },
    visceralFat: {
      title: "Visceral Fat Level", 
      description: "Visceral fat is the fat stored around internal organs in the abdominal cavity. Unlike subcutaneous fat under the skin, visceral fat can affect organ function and is linked to increased health risks including cardiovascular disease and diabetes."
    },
    phaseAngle: {
      title: "Phase Angle",
      description: "Phase angle is a bioelectrical measurement that indicates cellular health and body cell mass quality. Higher values generally indicate better cellular integrity, muscle quality, and overall health status. It's considered a marker of nutritional status and physical fitness."
    },
    waistRatio: {
      title: "Waist-to-Height Ratio",
      description: "This ratio divides waist circumference by height and is a strong predictor of health risks. It's considered more accurate than BMI for assessing central obesity and cardiovascular risk. A lower ratio indicates better health outcomes."
    },
    waistCircumference: {
      title: "Waist Circumference", 
      description: "A direct measurement around the waist that indicates abdominal fat accumulation. It's a simple but effective measure for assessing central obesity and related health risks including metabolic syndrome and cardiovascular disease."
    }
  };

  const InfoCard = ({ type }: { type: string }) => {
    const info = infoContent[type as keyof typeof infoContent];
    if (!info) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowInfoCard(null)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
            <button
              onClick={() => setShowInfoCard(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 leading-relaxed">{info.description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {showInfoCard && <InfoCard type={showInfoCard} />}
      <div className="space-y-8">
        
        {/* First Row: Body Composition Analysis and Visceral Fat Level */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Body Composition - Pie Chart */}
          <div className={`lg:col-span-2 bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border ${
            (bodyComposition.muscleMass > 40 && bodyComposition.fatMass < 30) ? 'border-green-300' : 'border-red-300'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold flex items-center text-black-900">
                  Body Composition Analysis
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowInfoCard('bodyComposition')}
                  className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                >
                  <Info className="w-4 h-4" />
                </button>
                {isAdmin && isEditMode && (
                  <button
                    onClick={() => setEditingField(editingField === 'bodyComposition' ? null : 'bodyComposition')}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    {editingField === 'bodyComposition' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-2">Body Composition Summary</h4>
                    {isAdmin && isEditMode && editingField === 'bodyComposition' ? (
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Muscle Mass (%)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={bodyComposition.muscleMass}
                              onChange={(e) => updateBodyComposition('muscleMass', parseFloat(e.target.value))}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Fat Mass (%)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={bodyComposition.fatMass}
                              onChange={(e) => updateBodyComposition('fatMass', parseFloat(e.target.value))}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Water Content (%)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={bodyComposition.waterContent}
                              onChange={(e) => updateBodyComposition('waterContent', parseFloat(e.target.value))}
                              className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span>Muscle Mass</span>
                          </div>
                          <span className="font-bold text-green-600">{bodyComposition.muscleMass}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                            <span>Fat Mass</span>
                          </div>
                          <span className="font-bold text-yellow-600">{bodyComposition.fatMass}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span>Water Content</span>
                          </div>
                          <span className="font-bold text-blue-600">{bodyComposition.waterContent}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visceral Fat Level Card */}
          <div className={`lg:col-span-1 bg-white rounded-xl shadow-lg border ${
            visceralFat.value < 100 ? 'border-green-300' : 'border-red-300'
          } overflow-hidden`}>
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Visceral Fat Level</h3>
                    <p className="text-sm text-gray-600">Abdominal fat measurement</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowInfoCard('visceralFat')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'visceralFat' ? null : 'visceralFat')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'visceralFat' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'visceralFat' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="0.1"
                          value={visceralFat.value}
                          onChange={(e) => updateVisceralFat('value', parseFloat(e.target.value))}
                          className="w-24 text-4xl font-bold text-green-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <input
                          type="text"
                          value={visceralFat.unit}
                          onChange={(e) => updateVisceralFat('unit', e.target.value)}
                          className="text-sm text-gray-500 font-medium text-center border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-600 w-16"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-green-600 mb-1">{visceralFat.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{visceralFat.unit}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Reference Ranges</div>
                
                {patient?.gender === 'Male' && (
                  <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-green-400">
                  <div className="text-sm text-green-700">
                    &lt;100 cm²
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-px bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-green-800">Healthy</span>
                  </div>
                </div>
                )}
                {patient?.gender === 'Female' && (
                  <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-700">
                      &lt;80 cm²
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-px bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-800">Healthy</span>
                    </div>
                  </div>
                )}

                {patient?.gender === 'Male' && (
                  <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-yellow-400">
                    <div className="text-sm text-yellow-700">
                      100-130 cm²
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-px bg-yellow-500 mr-2"></div>
                      <span className="text-sm font-medium text-yellow-800">Increased Risk</span>
                    </div>
                  </div>
                )}
                {patient?.gender === 'Female' && (
                  <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-yellow-400">
                    <div className="text-sm text-yellow-700">
                      81-100 cm²
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-px bg-yellow-500 mr-2"></div>
                      <span className="text-sm font-medium text-yellow-800">Increased Risk</span>
                    </div>
                  </div>
                )}

                {patient?.gender === 'Male' && (
                  <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-red-400">
                    <div className="text-sm text-red-700">
                      &gt;130 cm²
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-px bg-red-500 mr-2"></div>
                      <span className="text-sm font-medium text-red-800">High Risk</span>
                    </div>
                  </div>
                )}
                {patient?.gender === 'Female' && (
                  <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-red-400">
                    <div className="text-sm text-red-700">
                      &gt;100 cm²
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-px bg-red-500 mr-2"></div>
                      <span className="text-sm font-medium text-red-800">High Risk</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Phase Angle, Waist-to-Height Ratio, and Waist Circumference */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Phase Angle Card */}
          <div className={`bg-white rounded-xl shadow-lg border ${
            phaseAngle.value >= 6.5 && phaseAngle.value <= 8.0 ? 'border-green-300' :
            phaseAngle.value >= 4.8 && phaseAngle.value < 6.5 ? 'border-orange-300' :
            'border-red-300'
          } overflow-hidden`}>
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phase Angle</h3>
                    <p className="text-sm text-gray-600">Cell membrane integrity</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowInfoCard('phaseAngle')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'phaseAngle' ? null : 'phaseAngle')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'phaseAngle' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'phaseAngle' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="0.1"
                          value={phaseAngle.value}
                          onChange={(e) => updatePhaseAngle('value', parseFloat(e.target.value))}
                          className="w-24 text-4xl font-bold text-orange-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <span className="text-4xl font-bold text-orange-600">{phaseAngle.unit}</span>
                        <div className="text-sm text-gray-500 font-medium">Phase Angle</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-orange-600 mb-1">{phaseAngle.value}{phaseAngle.unit}</div>
                        <div className="text-sm text-gray-500 font-medium">Phase Angle</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Age-Specific Ranges (36-45 years)</div>
                
                <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-green-400">
                  <div className="text-sm text-green-700 font-medium">6.5 - 8.0°</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-px bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-green-800">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-orange-400">
                  <div className="text-sm text-orange-700 font-medium">4.8 - 6.5°</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-px bg-orange-500 mr-2"></div>
                    <span className="text-sm font-medium text-orange-800">Moderate</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-red-400">
                  <div className="text-sm text-red-700 font-medium">&lt;4.8°</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-px bg-red-500 mr-2"></div>
                    <span className="text-sm font-medium text-red-800">Clinical Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waist-to-Height Ratio Card */}
          <div className={`bg-white rounded-xl shadow-lg border ${
            waistMeasurements.waistToHeightRatio >= 0.44 && waistMeasurements.waistToHeightRatio <= 0.53 ? 'border-green-300' : 'border-red-300'
          } overflow-hidden`}>
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Waist-to-Height Ratio</h3>
                    <p className="text-sm text-gray-600">Central obesity indicator</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowInfoCard('waistRatio')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'waistRatio' ? null : 'waistRatio')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'waistRatio' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'waistRatio' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="0.01"
                          value={waistMeasurements.waistToHeightRatio}
                          onChange={(e) => updateWaistMeasurements('waistToHeightRatio', parseFloat(e.target.value))}
                          className="w-24 text-4xl font-bold text-green-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <div className="text-sm text-gray-500 font-medium">WHtR</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-green-600 mb-1">{waistMeasurements.waistToHeightRatio}</div>
                        <div className="text-sm text-gray-500 font-medium">WHtR</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Age-Specific Ranges (36-50 years)</div>
                
                <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-green-400">
                  <div className="text-sm text-green-700 font-medium">0.44 - 0.53</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-px bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium text-green-800">Recommended</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-red-400">
                  <div className="text-sm text-red-700 font-medium">&gt; 0.54</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-px bg-red-500 mr-2"></div>
                    <span className="text-sm font-medium text-red-800">Risk Threshold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waist Circumference Card */}
          <div className={`bg-white rounded-xl shadow-lg border ${
            waistMeasurements.waistCircumference < 94 ? 'border-green-300' :
            waistMeasurements.waistCircumference >= 94 && waistMeasurements.waistCircumference <= 102 ? 'border-yellow-300' :
            'border-red-300'
          } overflow-hidden`}>
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Waist Circumference</h3>
                    <p className="text-sm text-gray-600">Abdominal obesity assessment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowInfoCard('waistCircumference')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'waistCircumference' ? null : 'waistCircumference')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'waistCircumference' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
  
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'waistCircumference' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="1"
                          value={waistMeasurements.waistCircumference}
                          onChange={(e) => updateWaistMeasurements('waistCircumference', parseInt(e.target.value))}
                          className="w-24 text-4xl font-bold text-green-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <div className="text-sm text-gray-500 font-medium">cm</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-green-600 mb-1">{waistMeasurements.waistCircumference}</div>
                        <div className="text-sm text-gray-500 font-medium">cm</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Health Risk Categories</div>
  
                {patient?.gender === 'Male' && (
                  <>
                    <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-green-400">
                      <div className="text-sm text-green-700 font-medium">&lt; 94 cm</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-px bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium text-green-800">Low Risk</span>
                      </div>
                    </div>
  
                    <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-yellow-400">
                      <div className="text-sm text-yellow-700 font-medium">94 - 102 cm</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-px bg-yellow-500 mr-2"></div>
                        <span className="text-sm font-medium text-yellow-800">Increased Risk</span>
                      </div>
                    </div>
  
                    <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-red-400">
                      <div className="text-sm text-red-700 font-medium">&gt; 102 cm</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-px bg-red-500 mr-2"></div>
                        <span className="text-sm font-medium text-red-800">High Risk</span>
                      </div>
                    </div>
                  </>
                )}
  
                {patient?.gender === 'Female' && (
                  <>
                    <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-green-400">
                      <div className="text-sm text-green-700 font-medium">&lt; 80 cm</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-px bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium text-green-800">Low Risk</span>
                      </div>
                    </div>
  
                    <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-yellow-400">
                      <div className="text-sm text-yellow-700 font-medium">80 - 88 cm</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-px bg-yellow-500 mr-2"></div>
                        <span className="text-sm font-medium text-yellow-800">Increased Risk</span>
                      </div>
                    </div>
  
                    <div className="flex items-center justify-start gap-x-4 py-2 px-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-red-400">
                      <div className="text-sm text-red-700 font-medium">&gt; 88 cm</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-px bg-red-500 mr-2"></div>
                        <span className="text-sm font-medium text-red-800">High Risk</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MetabolicHealthDetails;