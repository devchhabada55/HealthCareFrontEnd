import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  Apple, 
  Moon, 
  Activity, 
  Stethoscope, 
  Menu,
  X,
  BarChart3,
  Settings,
  User,
  Users,
  Bell,
  Shield,
} from 'lucide-react';
import logo from '../logo.png';
import ChatbotPopup from '../components/ChatbotPopup';
import { SpiderChart } from '../components/visualizations/SpiderChart';

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

const saveRequestToStorage = (request: PatientRequest) => {
  try {
    const existingRequests = getStoredRequests();
    const updatedRequests = [...existingRequests, request];
    localStorage.setItem('patientRequests', JSON.stringify(updatedRequests));
  } catch (error) {
    console.error('Error saving request:', error);
  }
};

const Sidebar = ({ isOpen, onClose, isAdmin, newResponses }: { 
  isOpen: boolean; 
  onClose: () => void; 
  isAdmin: boolean; 
  newResponses?: number; 
}) => (
  <>
    {/* Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
    )}
    
    {/* Sidebar */}
    <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-100`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="2H Health Centre Logo" className="w-auto h-20" />
        </div>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="p-6 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {isAdmin ? 'Patient Health Metrics' : 'Health Metrics'}
          </h3>
          <div className="space-y-1">
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg">
              <BarChart3 className="w-4 h-4 mr-3" />
              Dashboard
            </Link>
            <Link to="/physical-health" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Heart className="w-4 h-4 mr-3" />
              Physical Health
            </Link>
            <Link to="/mental-health" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Brain className="w-4 h-4 mr-3" />
              Mental Health
            </Link>
            <Link to="/nutrition" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Apple className="w-4 h-4 mr-3" />
              Nutrition
            </Link>
            <Link to="/sleep" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Moon className="w-4 h-4 mr-3" />
              Sleep Analysis
            </Link>
            <Link to="/inflammatory" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Activity className="w-4 h-4 mr-3" />
              Inflammatory
            </Link>
            <Link to="/medical" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Stethoscope className="w-4 h-4 mr-3" />
              Medical Records
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {isAdmin ? 'Admin Tools' : 'Tools'}
          </h3>
          <div className="space-y-1">
            {isAdmin && (
              <Link to="/manage-patients" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <Users className="w-4 h-4 mr-3" />
                Manage Patients
              </Link>
            )}
            {!isAdmin && (
              <Link to="/my-requests" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <Bell className="w-4 h-4 mr-3" />
                My Requests
                {newResponses && newResponses > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {newResponses}
                  </span>
                )}
              </Link>
            )}
            <Link to="/profile" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <User className="w-4 h-4 mr-3" />
              Profile
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Bottom Section */}
    </div>
  </>
);

const PatientDashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    type: 'General Consultation',
    message: ''
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get('patientId');
  
  // Check if user is admin
  const isAdmin = localStorage.getItem('role') === 'admin';

  // Set current patient ID for regular patients (this would normally come from authentication)
  useEffect(() => {
    if (!isAdmin && !localStorage.getItem('currentPatientId')) {
      localStorage.setItem('currentPatientId', 'p001'); // Default patient for demo
    }
  }, [isAdmin]);

  // Dummy patient data based on patientId for demonstration
  const patientInfo = patientId ? 
    { name: `Patient ${patientId}`, age: 30, gender: 'Female' } : 
    { name: 'John Doe', age: 45, gender: 'Male' };

  // Get stored requests for admin requests count
  const storedRequests = getStoredRequests();
  const pendingRequests = storedRequests.filter(req => req.status === 'pending').length;

  // Get patient's requests and check for new responses
  const currentPatientId = localStorage.getItem('currentPatientId') || 'p001';
  const patientRequests = storedRequests.filter(req => req.patientId === currentPatientId);
  const newResponses = patientRequests.filter(req => req.status === 'reviewed' && req.adminResponse).length;

  const handleContactExpert = () => {
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setContactForm({
      type: 'General Consultation',
      message: ''
    });
  };

  const handleSubmitContactRequest = () => {
    if (!contactForm.message.trim()) {
      alert('Please enter your message');
      return;
    }

    const currentPatientId = localStorage.getItem('currentPatientId') || 'p001';
    const currentPatientName = patientInfo.name;

    // Create new request
    const newRequest: PatientRequest = {
      id: Date.now(), // Simple ID generation for demo
      patientName: currentPatientName,
      patientId: currentPatientId,
      type: contactForm.type,
      message: contactForm.message,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      status: 'pending'
    };

    // Save to localStorage
    saveRequestToStorage(newRequest);

    // Close modal and show success message
    handleCloseContactModal();
    alert('Your request has been sent to the health experts. You will receive a response soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isAdmin={isAdmin} newResponses={newResponses} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {isAdmin ? 'Admin Health Dashboard' : 'Health Dashboard'}
                </h1>
                <p className="text-sm text-gray-600">
                  {isAdmin ? 'Manage patient health data with comprehensive insights' : 'Track and improve your health with science-based insights'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Admin Mode</span>
                </div>
              )}
              <Link to="/profile" className="relative p-2 rounded-full bg-teal-500 text-white flex items-center justify-center w-10 h-10 shadow-md hover:bg-teal-600 transition-colors duration-200">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isAdmin ? `Patient Health Overview - ${patientInfo.name}` : 'Your Health Overview'}
              </h2>
              <div className="h-[400px] overflow-hidden">
                <SpiderChart data={{
                  physical: 85,
                  mental: 70,
                  nutrition: 90,
                  sleep: 75,
                  inflammatory: 60,
                  medical: 80,
                }} />
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Patient Information</h3>
              <Link 
                to={isAdmin ? `/reports?patientId=${patientId || 'p001'}` : '/reports'} 
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
              >
                View All Reports
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{patientInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="text-lg font-semibold text-gray-900">{patientInfo.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-lg font-semibold text-gray-900">{patientInfo.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA - Different for Admin vs Patient */}
          <div className="bg-white rounded-xl p-8 border border-gray-100">
            <div className="text-center max-w-2xl mx-auto">
              {isAdmin ? (
                <>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Patient Request Management
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Stay connected with your patients through our comprehensive request management system. 
                    Review consultation requests, health concerns, and provide expert guidance with ease.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      to="/manage-patients"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      View Patient Requests ({pendingRequests})
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    A refreshing approach to your health
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    We are rewiring the way work, life and health are defined and intertwined with the use of 
                    scientifically validated data. Our integrative support ecosystem guides you through 
                    innovation and evidence-based approaches.
                  </p>
                  <button 
                    onClick={handleContactExpert}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
                  >
                    Contact Health Experts
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Contact Health Experts Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Health Experts</h3>
              <button
                onClick={handleCloseContactModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Type
              </label>
              <select
                value={contactForm.type}
                onChange={(e) => setContactForm({...contactForm, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="General Consultation">General Consultation</option>
                <option value="Report Review">Report Review</option>
                <option value="Health Concern">Health Concern</option>
                <option value="Nutrition Guidance">Nutrition Guidance</option>
                <option value="Mental Health Support">Mental Health Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Please describe your concern or question in detail..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseContactModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitContactRequest}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      <ChatbotPopup />
    </div>
  );
};

export default PatientDashboardPage;