import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import StudentStudyBuddy from './pages/StudentStudyBuddy';
import StudentEarnSkills from './pages/StudentEarnSkills';
import StudentTravelSmart from './pages/StudentTravelSmart';
import StudentSocialEvents from './pages/StudentSocialEvents';

import AdminStudyBuddy from './pages/AdminStudyBuddy';
import AdminEarnSkills from './pages/AdminEarnSkills';
import AdminTravelSmart from './pages/AdminTravelSmart';
import AdminSocialEvents from './pages/AdminSocialEvents';

// ✅ Feature preview pages (public)
import FeatureStudyLearning from './pages/FeatureStudyLearning';
import FeatureEarnSkills    from './pages/FeatureEarnSkills';
import FeatureTravelSmart   from './pages/FeatureTravelSmart';
import FeatureSocialEvents  from './pages/FeatureSocialEvents';

function App() {
  return (
    <AuthContextProvider>
      <div className="min-h-screen flex flex-col m-0 p-0 font-sans text-gray-900 bg-white">
        <Navbar />
        <main className="flex-grow flex flex-col relative">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/register" element={<AdminRegisterPage />} />

            {/* ✅ Public feature preview routes */}
            <Route path="/features/study"  element={<FeatureStudyLearning />} />
            <Route path="/features/earn"   element={<FeatureEarnSkills />} />
            <Route path="/features/travel" element={<FeatureTravelSmart />} />
            <Route path="/features/events" element={<FeatureSocialEvents />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/study" element={
              <ProtectedRoute allowedRole="student">
                <StudentStudyBuddy />
              </ProtectedRoute>
            } />
            <Route path="/earn" element={
              <ProtectedRoute allowedRole="student">
                <StudentEarnSkills />
              </ProtectedRoute>
            } />
            <Route path="/travel" element={
              <ProtectedRoute allowedRole="student">
                <StudentTravelSmart />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute allowedRole="student">
                <StudentSocialEvents />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/study" element={
              <ProtectedRoute allowedRole="admin">
                <AdminStudyBuddy />
              </ProtectedRoute>
            } />
            <Route path="/admin/earn" element={
              <ProtectedRoute allowedRole="admin">
                <AdminEarnSkills />
              </ProtectedRoute>
            } />
            <Route path="/admin/travel" element={
              <ProtectedRoute allowedRole="admin">
                <AdminTravelSmart />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute allowedRole="admin">
                <AdminSocialEvents />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            }
          }} 
        />
      </div>
    </AuthContextProvider>
  );
}

export default App;
