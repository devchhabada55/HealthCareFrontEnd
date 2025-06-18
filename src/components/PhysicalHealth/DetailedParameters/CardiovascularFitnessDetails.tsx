import React, { useState } from 'react';
import { Heart, Activity, Edit3, Save, Info } from 'lucide-react';

interface CardiovascularFitnessDetailsProps {
  isAdmin?: boolean;
  isEditMode?: boolean;
}

const CardiovascularFitnessDetails: React.FC<CardiovascularFitnessDetailsProps> = ({ 
  isAdmin = false, 
  isEditMode = false 
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showInfoCard, setShowInfoCard] = useState<string | null>(null);
  
  const [vo2Data, setVo2Data] = useState({
    value: 32,
    unit: 'ml/kg/min'
  });
  const [oxygenSaturationData, setOxygenSaturationData] = useState({
    value: 98,
    unit: '%'
  });
  const [bloodPressureData, setBloodPressureData] = useState({
    systolic: 128,
    diastolic: 82,
    unit: 'mmHg'
  });
  const [restingHeartRateData, setRestingHeartRateData] = useState({
    value: 72,
    unit: 'BPM'
  });
  const [hrvData, setHrvData] = useState({
    value: 42,
    unit: 'RMSSD (ms)'
  });

  // Info card content
  const infoContent = {
    vo2max: {
      title: "VO₂ Max",
      description: "VO₂ Max measures your body's maximum ability to consume oxygen during exercise. It's considered the gold standard for cardiovascular fitness and aerobic endurance. Higher values indicate better cardiovascular health and athletic performance potential."
    },
    oxygenSaturation: {
      title: "Oxygen Saturation", 
      description: "Oxygen saturation (SpO₂) measures the percentage of hemoglobin in your blood that is carrying oxygen. It's a vital sign that indicates how well your lungs are working and how efficiently oxygen is being delivered to your organs and tissues."
    },
    bloodPressure: {
      title: "Blood Pressure",
      description: "Blood pressure measures the force of blood against arterial walls as your heart pumps. The systolic number (top) measures pressure during heartbeats, while diastolic (bottom) measures pressure between beats. It's a key indicator of cardiovascular health."
    },
    restingHeartRate: {
      title: "Resting Heart Rate",
      description: "Resting heart rate is the number of times your heart beats per minute when you're at rest. A lower resting heart rate generally indicates better cardiovascular fitness and more efficient heart function. Athletes often have notably lower rates."
    },
    hrv: {
      title: "Heart Rate Variability",
      description: "HRV measures the variation in time between heartbeats. Higher variability typically indicates better cardiovascular health, stress resilience, and recovery capacity. It's an important marker for overall autonomic nervous system function."
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
      
      {/* Row 1: Column 1 (Oxygen Saturation + Blood Pressure) and Column 2 (Resting Heart Rate + HRV) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Column 1: Blood Pressure and Resting Heart Rate */}
        <div className="space-y-8">
          {/* Blood Pressure Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowInfoCard('bloodPressure')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Blood Pressure</h3>
                    <p className="text-sm text-gray-600">Systolic / Diastolic</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'bloodPressure' ? null : 'bloodPressure')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'bloodPressure' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Primary Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'bloodPressure' ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            step="1"
                            value={bloodPressureData.systolic}
                            onChange={(e) => setBloodPressureData(prev => ({ ...prev, systolic: parseInt(e.target.value) }))}
                            className="w-16 text-2xl font-bold text-orange-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                          />
                          <span className="text-2xl font-bold text-orange-600">/</span>
                          <input
                            type="number"
                            step="1"
                            value={bloodPressureData.diastolic}
                            onChange={(e) => setBloodPressureData(prev => ({ ...prev, diastolic: parseInt(e.target.value) }))}
                            className="w-16 text-2xl font-bold text-orange-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                          />
                        </div>
                        <div className="text-sm text-gray-500 font-medium">{bloodPressureData.unit}</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-orange-600 mb-1">{bloodPressureData.systolic}/{bloodPressureData.diastolic}</div>
                        <div className="text-sm text-gray-500 font-medium">{bloodPressureData.unit}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Ranges */}
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Blood Pressure Categories</div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Optimal</span>
                  </div>
                  <div className="text-sm text-green-700 font-medium">90/60 - 135/85</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-800">Elevated (Your Level)</span>
                  </div>
                  <div className="text-sm text-orange-700 font-medium">&gt; 135/85</div>
                </div>
              </div>
            </div>
          </div>

          {/* Resting Heart Rate Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowInfoCard('restingHeartRate')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Resting Heart Rate</h3>
                    <p className="text-sm text-gray-600">Beats per minute</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'restingHeartRate' ? null : 'restingHeartRate')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'restingHeartRate' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Primary Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'restingHeartRate' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="1"
                          value={restingHeartRateData.value}
                          onChange={(e) => setRestingHeartRateData(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                          className="w-20 text-4xl font-bold text-orange-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <div className="text-sm text-gray-500 font-medium">{restingHeartRateData.unit}</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-orange-600 mb-1">{restingHeartRateData.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{restingHeartRateData.unit}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Ranges */}
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Heart Rate Categories</div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Excellent</span>
                  </div>
                  <div className="text-sm text-green-700 font-medium">30 - 60</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-800">Good</span>
                  </div>
                  <div className="text-sm text-yellow-700 font-medium">60 - 69</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-800">Above Average (Your Level)</span>
                  </div>
                  <div className="text-sm text-orange-700 font-medium">&gt; 69</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Oxygen Saturation and Heart Rate Variability */}
        <div className="space-y-8">
          {/* Oxygen Saturation Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowInfoCard('oxygenSaturation')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Oxygen Saturation</h3>
                    <p className="text-sm text-gray-600">Blood oxygen level</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'oxygenSaturation' ? null : 'oxygenSaturation')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'oxygenSaturation' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Primary Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'oxygenSaturation' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="1"
                          value={oxygenSaturationData.value}
                          onChange={(e) => setOxygenSaturationData(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                          className="w-20 text-4xl font-bold text-green-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <div className="text-sm text-gray-500 font-medium">SpO₂</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-green-600 mb-1">{oxygenSaturationData.value}%</div>
                        <div className="text-sm text-gray-500 font-medium">SpO₂</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Ranges */}
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Normal Ranges</div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Excellent (Your Level)</span>
                  </div>
                  <div className="text-sm text-green-700 font-medium">95% - 100%</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-800">Concerning</span>
                  </div>
                  <div className="text-sm text-red-700 font-medium">&lt; 95%</div>
                </div>
              </div>
            </div>
          </div>

          {/* HRV Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowInfoCard('hrv')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Heart Rate Variability</h3>
                    <p className="text-sm text-gray-600">Recovery indicator</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'hrv' ? null : 'hrv')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'hrv' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Primary Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'hrv' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="0.1"
                          value={hrvData.value}
                          onChange={(e) => setHrvData(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                          className="w-20 text-4xl font-bold text-yellow-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <div className="text-sm text-gray-500 font-medium">{hrvData.unit}</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-yellow-600 mb-1">{hrvData.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{hrvData.unit}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Ranges */}
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">HRV Categories</div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Excellent</span>
                  </div>
                  <div className="text-sm text-green-700 font-medium">&gt; 50</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-800">Average (Your Level)</span>
                  </div>
                  <div className="text-sm text-yellow-700 font-medium">30 - 50</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-800">Poor</span>
                  </div>
                  <div className="text-sm text-red-700 font-medium">&lt; 30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: VO2 Max (single card centered) */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          {/* VO2 Max Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowInfoCard('vo2max')}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">VO₂ Max</h3>
                    <p className="text-sm text-gray-600">Cardiovascular fitness level</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdmin && isEditMode && (
                    <button
                      onClick={() => setEditingField(editingField === 'vo2max' ? null : 'vo2max')}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      {editingField === 'vo2max' ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Primary Metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    {isAdmin && isEditMode && editingField === 'vo2max' ? (
                      <div className="space-y-2">
                        <input
                          type="number"
                          step="0.1"
                          value={vo2Data.value}
                          onChange={(e) => setVo2Data(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
                          className="w-20 text-4xl font-bold text-red-600 text-center border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-600"
                        />
                        <div className="text-sm text-gray-500 font-medium">{vo2Data.unit}</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-red-600 mb-1">{vo2Data.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{vo2Data.unit}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Reference Ranges for Age 45-49 Male */}
              <div className="space-y-3 mb-6">
                <div className="text-sm font-medium text-gray-700 mb-2">Age-Specific Ranges (45-49 years, Male)</div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Very Good</span>
                  </div>
                  <div className="text-sm text-green-700 font-medium">&gt; 45</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Good</span>
                  </div>
                  <div className="text-sm text-blue-700 font-medium">40 - 45</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-800">Average</span>
                  </div>
                  <div className="text-sm text-yellow-700 font-medium">34 - 39</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-800">Weak (Your Level)</span>
                  </div>
                  <div className="text-sm text-orange-700 font-medium">30 - 33</div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-800">Very Poor</span>
                  </div>
                  <div className="text-sm text-red-700 font-medium">&lt; 30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardiovascularFitnessDetails; 