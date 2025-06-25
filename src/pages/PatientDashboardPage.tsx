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
    <div className={`fixed left-0 top-0 h-full w-80 sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-100`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="2H Health Centre Logo" className="w-auto h-16 lg:h-20" />
        </div>
        <button 
          onClick={onClose} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 lg:p-6 space-y-2 overflow-y-auto flex-1">
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {isAdmin ? 'Patient Health Metrics' : 'Health Metrics'}
          </h3>
          <div className="space-y-1">
            <Link 
              to="/dashboard" 
              className="flex items-center px-3 py-3 text-sm font-medium text-[rgb(124,58,237)] bg-[rgb(237,230,250)] rounded-xl min-h-[44px] touch-manipulation"
            >
              <BarChart3 className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Dashboard</span>
            </Link>
            <Link 
              to="/physical-health" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Heart className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Physical Health</span>
            </Link>
            <Link 
              to="/mental-health" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Brain className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Mental Health</span>
            </Link>
            <Link 
              to="/nutrition" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Apple className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Nutrition</span>
            </Link>
            <Link 
              to="/sleep" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Moon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Sleep Analysis</span>
            </Link>
            <Link 
              to="/inflammatory" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Activity className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Inflammatory</span>
            </Link>
            <Link 
              to="/medical" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Stethoscope className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Medical Records</span>
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {isAdmin ? 'Admin Tools' : 'Tools'}
          </h3>
          <div className="space-y-1">
            {isAdmin && (
              <Link 
                to="/manage-patients" 
                className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
              >
                <Users className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">Manage Patients</span>
              </Link>
            )}
            {!isAdmin && (
              <Link 
                to="/my-requests" 
                className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
              >
                <Bell className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate flex-1">My Requests</span>
                {newResponses && newResponses > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {newResponses}
                  </span>
                )}
              </Link>
            )}
            <Link 
              to="/profile" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <User className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Profile</span>
            </Link>
            <Link 
              to="#" 
              className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl min-h-[44px] touch-manipulation transition-colors"
            >
              <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
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
  const isAdmin = localStorage.getItem('role') === 'admin';
  const urlParams = new URLSearchParams(location.search);
  const patientId = urlParams.get('patientId');

  // Patient information - In a real app, this would come from an API
  const patientInfo = {
    name: isAdmin ? (patientId === 'p002' ? 'John Smith' : 'Jane Doe') : 'Your Profile',
    age: isAdmin ? (patientId === 'p002' ? 45 : 32) : 29,
    gender: isAdmin ? (patientId === 'p002' ? 'Male' : 'Female') : 'Female'
  };

  // Count pending requests for admin
  const pendingRequests = isAdmin ? getStoredRequests().filter(req => req.status === 'pending').length : 0;

  const handleContactExpert = () => {
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setContactForm({ type: 'General Consultation', message: '' });
  };

  const handleSubmitContactRequest = () => {
    if (!contactForm.message.trim()) return;

    const newRequest: PatientRequest = {
      id: Date.now(),
      patientName: patientInfo.name,
      patientId: 'current-user', // In a real app, this would be the actual user ID
      type: contactForm.type,
      message: contactForm.message,
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };

    saveRequestToStorage(newRequest);
    handleCloseContactModal();
    alert('Your request has been submitted successfully! Our health experts will respond within 24-48 hours.');
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isAdmin={isAdmin}
        newResponses={!isAdmin ? 1 : undefined}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-w-0">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-100 px-3 sm:px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 truncate">
                  {isAdmin ? 'Admin Health Dashboard' : 'Health Dashboard'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {isAdmin ? 'Manage patient health data with comprehensive insights' : 'Track and improve your health with science-based insights'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {isAdmin && (
                <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Admin</span>
                </div>
              )}
              <Link 
                to="/profile" 
                className="relative p-2 rounded-full bg-[rgb(124,58,237)] text-white flex items-center justify-center w-10 h-10 shadow-md hover:bg-[rgb(109,40,217)] transition-colors duration-200 touch-manipulation"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                {isAdmin ? `Patient Health Overview - ${patientInfo.name}` : 'Your Health Overview'}
              </h2>
              <div className="h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden">
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

            {/* Patient Information Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Patient Information</h3>
                <Link 
                  to={isAdmin ? `/reports?patientId=${patientId || 'p001'}` : '/reports'} 
                  className="bg-[rgb(124,58,237)] hover:bg-[rgb(109,40,217)] text-white font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 text-center touch-manipulation min-h-[44px] flex items-center justify-center"
                >
                  <span className="hidden sm:inline">View All Reports</span>
                  <span className="sm:hidden">Reports</span>
                </Link>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Name</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">{patientInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Age</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">{patientInfo.age}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Gender</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">{patientInfo.gender}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA - Different for Admin vs Patient */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100">
              <div className="text-center max-w-2xl mx-auto">
                {isAdmin ? (
                  <>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                      Patient Request Management
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                      Stay connected with your patients through our comprehensive request management system. 
                      Review consultation requests, health concerns, and provide expert guidance with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link 
                        to="/manage-patients"
                        className="bg-[rgb(124,58,237)] hover:bg-[rgb(109,40,217)] text-white font-medium px-6 sm:px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation min-h-[48px]"
                      >
                        <Bell className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span className="truncate">View Patient Requests ({pendingRequests})</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                      A refreshing approach to your health
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                      We are rewiring the way work, life and health are defined and intertwined with the use of 
                      scientifically validated data. Our integrative support ecosystem guides you through 
                      innovation and evidence-based approaches.
                    </p>
                    <button 
                      onClick={handleContactExpert}
                      className="bg-[rgb(124,58,237)] hover:bg-[rgb(109,40,217)] text-white font-medium px-6 sm:px-8 py-3 rounded-lg transition-colors duration-200 touch-manipulation min-h-[48px]"
                    >
                      Contact Health Experts
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Contact Health Experts Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Contact Health Experts</h3>
                <button
                  onClick={handleCloseContactModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Type
                  </label>
                  <select
                    value={contactForm.type}
                    onChange={(e) => setContactForm({...contactForm, type: e.target.value})}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base touch-manipulation"
                  >
                    <option value="General Consultation">General Consultation</option>
                    <option value="Report Review">Report Review</option>
                    <option value="Health Concern">Health Concern</option>
                    <option value="Nutrition Guidance">Nutrition Guidance</option>
                    <option value="Mental Health Support">Mental Health Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full h-32 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-base"
                    placeholder="Please describe your concern or question in detail..."
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                <button
                  onClick={handleCloseContactModal}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200 touch-manipulation min-h-[48px] order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitContactRequest}
                  className="bg-[rgb(124,58,237)] hover:bg-[rgb(109,40,217)] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 touch-manipulation min-h-[48px] order-1 sm:order-2"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatbotPopup />
    </div>
  );
};

export default PatientDashboardPage;