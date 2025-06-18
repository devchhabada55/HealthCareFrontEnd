import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
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

// Utility functions for managing requests in localStorage
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

const updateRequestsInStorage = (requests: PatientRequest[]) => {
  try {
    localStorage.setItem('patientRequests', JSON.stringify(requests));
  } catch (error) {
    console.error('Error updating requests:', error);
  }
};

const ManagePatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [responseText, setResponseText] = useState('');
  const [adminRequests, setAdminRequests] = useState<PatientRequest[]>([]);

  // Load requests from localStorage on component mount
  useEffect(() => {
    const storedRequests = getStoredRequests();
    setAdminRequests(storedRequests);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRespond = (requestId: number) => {
    setSelectedRequestId(requestId);
    setShowResponseModal(true);
  };

  const handleSendResponse = () => {
    if (selectedRequestId && responseText.trim()) {
      // In a real app, you would send this response to the backend
      console.log(`Sending response to request ${selectedRequestId}: ${responseText}`);
      
      // Update the request status to reviewed after responding and save the response
      const updatedRequests = adminRequests.map(req =>
        req.id === selectedRequestId ? { 
          ...req, 
          status: 'reviewed' as const,
          adminResponse: responseText,
          responseTimestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        } : req
      );
      
      setAdminRequests(updatedRequests);
      updateRequestsInStorage(updatedRequests);
      
      // Close modal and reset
      setShowResponseModal(false);
      setResponseText('');
      setSelectedRequestId(null);
      
      alert('Response sent successfully!');
    } else {
      alert('Please enter a response message.');
    }
  };

  const handleMarkAsReviewed = (requestId: number) => {
    const updatedRequests = adminRequests.map(req =>
      req.id === requestId ? { ...req, status: 'reviewed' as const } : req
    );
    
    setAdminRequests(updatedRequests);
    updateRequestsInStorage(updatedRequests);
    alert('Request marked as reviewed!');
  };

  const handleCloseResponseModal = () => {
    setShowResponseModal(false);
    setResponseText('');
    setSelectedRequestId(null);
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
            <h2 className="text-2xl font-bold text-gray-900">Patient Requests</h2>
          </div>
        </div>
        
        <div className="space-y-4">
          {adminRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No patient requests at this time.</p>
              <p className="text-gray-400 text-sm mt-2">Patient requests will appear here when submitted.</p>
            </div>
          ) : (
            adminRequests.map((request) => (
              <div key={request.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.patientName}</h3>
                    <p className="text-sm text-gray-600">{request.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.timestamp}</p>
                  </div>
                  <span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " +
                    (request.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800')
                  }>
                    {request.status === 'pending' ? 'Pending' : 'Reviewed'}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{request.message}</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleRespond(request.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Respond
                  </button>
                  <button 
                    onClick={() => handleMarkAsReviewed(request.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      request.status === 'reviewed' 
                        ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                    disabled={request.status === 'reviewed'}
                  >
                    {request.status === 'reviewed' ? 'Already Reviewed' : 'Mark as Reviewed'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Send Response</h3>
              <button
                onClick={handleCloseResponseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Message
              </label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Type your response to the patient here..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseResponseModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendResponse}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatientsPage; 