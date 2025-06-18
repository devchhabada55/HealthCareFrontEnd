import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  ArrowLeft, 
  User,
  Calendar,
  Search,
  Filter,
  Upload
} from 'lucide-react';
import logo from '../logo.png';

interface UploadedReport {
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  data: string; // base64 encoded file data
}

const ReportsPage = () => {
  const [reports, setReports] = useState<UploadedReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<UploadedReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get('patientId');
  
  // Check if user is admin
  const isAdmin = localStorage.getItem('role') === 'admin';
  
  // Get current user info
  const getCurrentPatientId = () => {
    if (isAdmin && patientId) {
      return patientId;
    }
    // For patients, we'll use a default patient ID (in real app, this would come from authentication)
    return localStorage.getItem('currentPatientId') || 'p001';
  };

  const currentPatientId = getCurrentPatientId();

  // Get patient name for display
  const getPatientName = (id: string) => {
    const patients: { [key: string]: string } = {
      'p001': 'Jane Doe',
      'p002': 'John Smith', 
      'p003': 'Emily White'
    };
    return patients[id] || 'Unknown Patient';
  };

  useEffect(() => {
    loadReports();
  }, [currentPatientId]);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, filterType]);

  const loadReports = () => {
    setLoading(true);
    try {
      const storedReports = localStorage.getItem(`patient_reports_${currentPatientId}`);
      if (storedReports) {
        const parsedReports = JSON.parse(storedReports);
        setReports(parsedReports);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(report => 
        report.type.includes(filterType)
      );
    }

    setFilteredReports(filtered);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewReport = (report: UploadedReport) => {
    try {
      // Convert base64 to blob
      const byteCharacters = atob(report.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: report.type });
      
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Clean up the URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error('Error viewing report:', error);
      alert('Error opening report. Please try again.');
    }
  };

  const handleDownloadReport = (report: UploadedReport) => {
    try {
      // Convert base64 to blob
      const byteCharacters = atob(report.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: report.type });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = report.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Error downloading report. Please try again.');
    }
  };

  const handleDeleteReport = (reportIndex: number) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const updatedReports = reports.filter((_, index) => index !== reportIndex);
      setReports(updatedReports);
      localStorage.setItem(`patient_reports_${currentPatientId}`, JSON.stringify(updatedReports));
    }
  };

  const navigateBack = () => {
    if (isAdmin) {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="2H Health Centre Logo" className="w-auto h-14" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">2H Health Centre</h1>
                <p className="text-sm text-gray-600">
                  {isAdmin ? 'Admin - Patient Reports' : 'My Health Reports'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateBack}
                className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isAdmin ? `Reports for ${getPatientName(currentPatientId)}` : 'My Health Reports'}
              </h2>
              <p className="text-gray-600">
                {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} available
              </p>
            </div>
            {isAdmin && (
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Admin View</span>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF Files</option>
                  <option value="image">Images</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterType !== 'all' 
                ? "No reports match your search criteria." 
                : "No reports have been uploaded yet."}
            </p>
            {(searchTerm || filterType !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate" title={report.name}>
                        {report.name}
                      </h3>
                      <p className="text-sm text-gray-500">{formatFileSize(report.size)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(report.uploadDate)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Uploaded by {report.uploadedBy}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewReport(report)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteReport(index)}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportsPage; 