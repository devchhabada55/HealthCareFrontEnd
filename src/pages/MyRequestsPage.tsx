import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, MessageCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Request interface
interface PatientRequest {
  id: number;
  patientName: string;
  patientId: string;
  type: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'reviewed';
  adminResponse?: string;
  responseTimestamp?: string;
}

// Utility function for getting stored requests
const getStoredRequests = (): PatientRequest[] => {
  try {
    const stored = localStorage.getItem('patientRequests');
    if (stored) {
      return JSON.parse(stored);
    } else {
      // Initialize with some demo data if no requests exist
      const demoRequests: PatientRequest[] = [
        {
          id: 1,
          patientName: 'Jane Doe',
          patientId: 'p001',
          type: 'Consultation Request',
          message: 'Need help understanding my latest blood test results',
          timestamp: '2024-01-15 10:30 AM',
          status: 'pending'
        },
        {
          id: 2,
          patientName: 'John Smith',
          patientId: 'p002',
          type: 'Report Review',
          message: 'Please review my nutrition analysis and provide recommendations',
          timestamp: '2024-01-14 3:45 PM',
          status: 'pending'
        },
        {
          id: 3,
          patientName: 'Emily White',
          patientId: 'p003',
          type: 'Health Concern',
          message: 'Experiencing unusual symptoms, need medical guidance',
          timestamp: '2024-01-14 1:20 PM',
          status: 'reviewed',
          adminResponse: 'Thank you for reaching out. Based on your symptoms, I recommend scheduling an in-person consultation within the next week. In the meantime, please monitor your symptoms and contact us immediately if they worsen. I\'ve also ordered some preliminary blood tests that you can complete at your convenience.',
          responseTimestamp: '2024-01-14 4:30 PM'
        }
      ];
      localStorage.setItem('patientRequests', JSON.stringify(demoRequests));
      return demoRequests;
    }
  } catch (error) {
    console.error('Error loading requests:', error);
    return [];
  }
};

const MyRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<PatientRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<PatientRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewed'>('all');

  // Get current patient ID
  const currentPatientId = localStorage.getItem('currentPatientId') || 'p001';

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    filterRequestsByStatus();
  }, [requests, filterStatus]);

  const loadRequests = () => {
    const allRequests = getStoredRequests();
    // Filter requests for current patient
    const patientRequests = allRequests.filter(req => req.patientId === currentPatientId);
    setRequests(patientRequests);
  };

  const filterRequestsByStatus = () => {
    if (filterStatus === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(req => req.status === filterStatus));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getStatusColor = (status: string) => {
    return status === 'pending' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-green-100 text-green-800';
  };

  const getStatusIcon = (status: string) => {
    return status === 'pending' 
      ? <Clock className="w-4 h-4" />
      : <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main Content */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Back</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-900">My Requests</h2>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setFilterStatus('all')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${
              filterStatus === 'all'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All Requests ({requests.length})
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${
              filterStatus === 'pending'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending ({requests.filter(req => req.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('reviewed')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${
              filterStatus === 'reviewed'
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviewed ({requests.filter(req => req.status === 'reviewed').length})
          </button>
        </div>
        
        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {filterStatus === 'all' 
                  ? 'No requests submitted yet.' 
                  : `No ${filterStatus} requests.`
                }
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {filterStatus === 'all' && 'Submit a request from your dashboard to get started.'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.type}</h3>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {request.timestamp}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1">
                      {request.status === 'pending' ? 'Pending Review' : 'Reviewed'}
                    </span>
                  </span>
                </div>
                
                {/* Original Message */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Your Message:</h4>
                  <p className="text-gray-600 bg-white p-3 rounded border">{request.message}</p>
                </div>

                {/* Admin Response */}
                {request.adminResponse && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="w-4 h-4 text-teal-600 mr-2" />
                      <h4 className="text-sm font-medium text-teal-700">Health Expert Response:</h4>
                    </div>
                    <p className="text-gray-700 bg-teal-50 p-3 rounded border border-teal-200 mb-2">
                      {request.adminResponse}
                    </p>
                    {request.responseTimestamp && (
                      <p className="text-xs text-gray-500">
                        Responded: {request.responseTimestamp}
                      </p>
                    )}
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Your request is being reviewed by our health experts. You will receive a response soon.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequestsPage; 