import { useState } from 'react';
import { NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiHome, FiFolder, FiFileText, FiLink, FiTrendingUp, FiBell, FiMessageSquare, FiMenu, FiX } from 'react-icons/fi';

// Import subpages (to be created)
import HomeDashboard from './HomeDashboard';
import ModulesPage from './ModulesPage';
import PapersPage from './PapersPage';
import ResourcesPage from './ResourcesPage';
import ProgressPage from './ProgressPage';
import NotificationsPage from './NotificationsPage';
import ChatbotPage from './ChatbotPage';

const navItems = [
  { path: '', name: 'Dashboard', icon: <FiHome /> },
  { path: 'modules', name: 'Modules', icon: <FiFolder /> },
  { path: 'papers', name: 'Past Papers', icon: <FiFileText /> },
  { path: 'resources', name: 'Resources', icon: <FiLink /> },
  { path: 'progress', name: 'Progress', icon: <FiTrendingUp /> },
  { path: 'notifications', name: 'Alerts', icon: <FiBell /> },
  { path: 'chatbot', name: 'AI Chat', icon: <FiMessageSquare /> }
];

const StudyLearningLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-bg transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Fixed Vertical Sidebar */}
      <aside 
        className={`fixed top-[64px] left-0 z-40 h-[calc(100vh-64px)] w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm flex flex-col transform transition-transform duration-300 ease-in-out py-6 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center px-6 mb-6 md:hidden">
            <h2 className="text-xl font-bold text-text">Menu</h2>
            <button 
              className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 custom-scrollbar">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={`/study-learning${item.path ? `/${item.path}` : ''}`}
              end={item.path === ''}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 text-[15px] rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20 font-bold' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 font-semibold'
                }`
              }
            >
              <span className={`text-lg transition-transform duration-300 group-hover:scale-110`}>{item.icon}</span> 
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 w-full overflow-hidden mt-[64px] p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="flex items-start gap-4 mb-2">
            <button 
              className="md:hidden mt-1 p-2 text-gray-500 hover:text-blue-600 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl font-bold flex items-center text-text tracking-tight">
                <FiBookOpen className="mr-3 text-primary hidden md:block" /> Study & Learning
              </h1>
              <p className="mt-2 text-muted max-w-2xl text-[15px]">Manage your modules, past papers, resources, and progress.</p>
            </motion.div>
          </div>

          {/* Dynamic Content */}
          <motion.div 
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-[600px]"
          >
            <Routes>
              <Route index element={<HomeDashboard />} />
              <Route path="modules" element={<ModulesPage />} />
              <Route path="papers" element={<PapersPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="progress" element={<ProgressPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="chatbot" element={<ChatbotPage />} />
              <Route path="*" element={<Navigate to="/study-learning" replace />} />
            </Routes>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StudyLearningLayout;
