// import { Link } from 'react-router-dom'; // Commented out for demo
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Eye, Trash2, X, CheckCircle, User, Activity, FileUp, Database, Download, Menu } from 'lucide-react';
import logo from '../logo.png'; // Import the logo
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminDashboardPage = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'patient'>('admin'); // State for role selection
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingPatientId, setUploadingPatientId] = useState<string | null>(null);
  const [uploadedReports, setUploadedReports] = useState<{ [key: string]: File[] }>({});
  const [showUploadedReports, setShowUploadedReports] = useState<string | null>(null);
  const [showAdminDetailsModal, setShowAdminDetailsModal] = useState(false); // State for admin details modal
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
  const [adminDetails, setAdminDetails] = useState({
    name: 'Admin User',
    email: 'admin.user@2hhealth.com',
    specialization: 'General Administration',
  });
  const navigate = useNavigate(); // Navigation hook

  const handleRoleChange = (role: 'admin' | 'patient') => {
    setSelectedRole(role);
    localStorage.setItem('role', role);  
    if (role === 'patient') {
      navigate('/login'); // Redirect to login page for patients
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem('role') as 'admin' | 'patient' | null;
    if (saved) setSelectedRole(saved);
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadReports = async () => {
    if (selectedFiles.length > 0 && uploadingPatientId) {
      const newReports = [];
      
      // Convert files to base64 and create report objects
      for (const file of selectedFiles) {
        try {
          const base64Data = await fileToBase64(file);
          const reportData = {
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
            uploadedBy: 'Admin',
            data: base64Data
          };
          newReports.push(reportData);
        } catch (error) {
          console.error('Error converting file to base64:', error);
        }
      }

      // Update local state
      setUploadedReports((prev) => ({
        ...prev,
        [uploadingPatientId]: [...(prev[uploadingPatientId] || []), ...selectedFiles],
      }));

      // Persist to localStorage for patient access
      const existingReports = JSON.parse(localStorage.getItem(`patient_reports_${uploadingPatientId}`) || '[]');
      const updatedReports = [...existingReports, ...newReports];
      localStorage.setItem(`patient_reports_${uploadingPatientId}`, JSON.stringify(updatedReports));

      console.log(`Uploading ${selectedFiles.length} files for patient ${uploadingPatientId}:`);
      selectedFiles.forEach((file) => {
        console.log(`- ${file.name} (${file.type}, ${file.size} bytes)`);
      });

      setSelectedFiles([]);
      setUploadingPatientId(null);
      alert(`Successfully uploaded ${selectedFiles.length} reports for patient ${uploadingPatientId}.`);
    } else {
      alert('Please select files to upload.');
    }
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const deleteUploadedReport = (patientId: string, fileIndex: number) => {
    setUploadedReports((prev) => ({
      ...prev,
      [patientId]: prev[patientId].filter((_, i) => i !== fileIndex),
    }));
  };

  const viewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const dummyPatients = [
    {
      id: 'p001',
      name: 'Yves Vannerom',
      username: 'YvesVannerom',
      reportsUploaded: uploadedReports['p001']?.length > 0,
      lastVisit: '2024-06-10',
      status: 'Active',
    },
    {
      id: 'p002',
      name: 'John Smith',
      username: 'johnsmith',
      reportsUploaded: uploadedReports['p002']?.length > 0,
      lastVisit: '2024-06-08',
      status: 'Active',
    },
    {
      id: 'p003',
      name: 'Emily White',
      username: 'emilywhite',
      reportsUploaded: uploadedReports['p003']?.length > 0,
      lastVisit: '2024-06-05',
      status: 'Inactive',
    },
  ];

  const totalPatients = dummyPatients.length;
  const activePatients = dummyPatients.filter((p) => p.status === 'Active').length;
  const totalReports = Object.values(uploadedReports).reduce((sum, reports) => sum + reports.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src={logo} alt="2H Health Centre Logo" className="w-auto h-10 sm:h-14" />
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">2H Health Centre</h1>
                <p className="text-xs sm:text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
              <button
                className="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => setShowAdminDetailsModal(true)}
              >
                <User className="w-4 h-4 mr-1" />
                Edit Profile
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => {
                  localStorage.removeItem('role');
                  navigate('/login');
                }}
              >
                <X className="w-4 h-4 mr-1" />
                Logout
              </button>
              {/* Toggle Button */}
              <div className="flex items-center space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => handleRoleChange('admin')}
                >
                  Admin
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedRole === 'patient' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => handleRoleChange('patient')}
                >
                  Patient
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">Admin</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => handleRoleChange('admin')}
                  >
                    Admin
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedRole === 'patient' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => handleRoleChange('patient')}
                  >
                    Patient
                  </button>
                </div>

                <button
                  className="w-full inline-flex items-center justify-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={() => {
                    setShowAdminDetailsModal(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
                <button
                  className="w-full inline-flex items-center justify-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  onClick={() => {
                    localStorage.removeItem('role');
                    navigate('/login');
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      {selectedRole === 'admin' && (
        <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Patients</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalPatients}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Patients</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{activePatients}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Reports</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalReports}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Patient Management Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-slate-200/60">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Patient Management
              </h2>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/80">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Patient Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Reports
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {dummyPatients.map(patient => (
                    <tr key={patient.id} className="hover:bg-slate-50/50 transition-all duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{patient.name}</p>
                            <p className="text-sm text-slate-600">@{patient.username}</p>
                            <p className="text-xs text-slate-500">Last visit: {patient.lastVisit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">
                            {uploadedReports[patient.id]?.length || 0} reports
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                            onClick={() => setUploadingPatientId(uploadingPatientId === patient.id ? null : patient.id)}
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Upload Report
                          </button>
                          
                          <button
                            className="inline-flex items-center px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium transition-colors duration-200"
                            onClick={() => alert(`Analyze Reports for ${patient.name}`)}
                          >
                            <Activity className="w-4 h-4 mr-1" />
                            Analyze Reports
                          </button>

                          {uploadedReports[patient.id]?.length > 0 && (
                            <button
                              className="inline-flex items-center px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                              onClick={() => setShowUploadedReports(showUploadedReports === patient.id ? null : patient.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Reports
                            </button>
                          )}
                          
                          <a 
                            href={`/dashboard?patientId=${patient.id}`} 
                            className="inline-flex items-center px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            <Activity className="w-4 h-4 mr-1" />
                            Edit Dashboard
                          </a>

                          <button
                            className="inline-flex items-center px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-sm font-medium transition-colors duration-200"
                            onClick={() => alert(`Submit Dashboard for ${patient.name}`)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Submit Dashboard
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-slate-200/60">
              {dummyPatients.map(patient => (
                <div key={patient.id} className="p-4 sm:p-6 hover:bg-slate-50/50 transition-all duration-200">
                  {/* Patient Info */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-800 text-lg">{patient.name}</p>
                          <p className="text-sm text-slate-600">@{patient.username}</p>
                          <p className="text-xs text-slate-500">Last visit: {patient.lastVisit}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                          {uploadedReports[patient.id]?.length || 0} reports
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      className="inline-flex items-center justify-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                      onClick={() => setUploadingPatientId(uploadingPatientId === patient.id ? null : patient.id)}
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Upload Report</span>
                      <span className="sm:hidden">Upload</span>
                    </button>
                    
                    <button
                      className="inline-flex items-center justify-center px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium transition-colors duration-200"
                      onClick={() => alert(`Analyze Reports for ${patient.name}`)}
                    >
                      <Activity className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Analyze</span>
                      <span className="sm:hidden">Analyze</span>
                    </button>

                    {uploadedReports[patient.id]?.length > 0 && (
                      <button
                        className="inline-flex items-center justify-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                        onClick={() => setShowUploadedReports(showUploadedReports === patient.id ? null : patient.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">View Reports</span>
                        <span className="sm:hidden">View</span>
                      </button>
                    )}
                    
                    <a 
                      href={`/dashboard?patientId=${patient.id}`} 
                      className="inline-flex items-center justify-center px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <Activity className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Edit Dashboard</span>
                      <span className="sm:hidden">Edit</span>
                    </a>

                    <button
                      className="inline-flex items-center justify-center px-3 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-sm font-medium transition-colors duration-200 sm:col-span-2"
                      onClick={() => alert(`Submit Dashboard for ${patient.name}`)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Submit Dashboard
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Upload Section */}
          {uploadingPatientId && (
            <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center">
                  <FileUp className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="hidden sm:inline">Upload Reports for {dummyPatients.find(p => p.id === uploadingPatientId)?.name}</span>
                  <span className="sm:hidden">Upload for {dummyPatients.find(p => p.id === uploadingPatientId)?.name}</span>
                </h3>
                <button
                  onClick={() => {
                    setUploadingPatientId(null);
                    setSelectedFiles([]);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 sm:p-8 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-slate-400 mx-auto mb-2 sm:mb-4" />
                  <p className="text-slate-600 text-sm sm:text-base mb-2">
                    <span className="hidden sm:inline">Drag and drop PDF files here or</span>
                    <span className="sm:hidden">Select PDF files</span>
                  </p>
                  <label className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer text-sm sm:text-base font-medium transition-colors duration-200">
                    <FileText className="w-4 h-4 mr-2" />
                    Browse Files
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800 text-sm sm:text-base">Selected Files ({selectedFiles.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              <FileText className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mt-1 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 truncate text-sm sm:text-base">{file.name}</p>
                                <p className="text-xs sm:text-sm text-slate-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-slate-200 rounded-lg transition-colors duration-200 flex-shrink-0"
                            >
                              <X className="w-4 h-4 text-slate-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={handleUploadReports}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View Uploaded Reports Section */}
          {showUploadedReports && uploadedReports[showUploadedReports] && (
            <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  <span className="hidden sm:inline">Uploaded Reports for {dummyPatients.find(p => p.id === showUploadedReports)?.name}</span>
                  <span className="sm:hidden">Reports for {dummyPatients.find(p => p.id === showUploadedReports)?.name}</span>
                </h3>
                <button
                  onClick={() => setShowUploadedReports(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedReports[showUploadedReports].map((file, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-200">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate text-sm sm:text-base">{file.name}</p>
                        <p className="text-xs sm:text-sm text-slate-500 mb-3">{formatFileSize(file.size)}</p>
                        
                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                          <button
                            onClick={() => viewFile(file)}
                            className="inline-flex items-center justify-center px-2 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors duration-200"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          <button
                            onClick={() => downloadFile(file)}
                            className="inline-flex items-center justify-center px-2 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-medium transition-colors duration-200"
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">Download</span>
                          </button>
                          <button
                            onClick={() => deleteUploadedReport(showUploadedReports, index)}
                            className="inline-flex items-center justify-center px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition-colors duration-200"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* Admin Details Modal */}
      {showAdminDetailsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Admin Profile</h2>
              <button
                onClick={() => setShowAdminDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="adminName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={adminDetails.name}
                  onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="adminEmail"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={adminDetails.email}
                  onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="adminSpecialization" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  id="adminSpecialization"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={adminDetails.specialization}
                  onChange={(e) => setAdminDetails({ ...adminDetails, specialization: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setShowAdminDetailsModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Admin details updated successfully!');
                  setShowAdminDetailsModal(false);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
