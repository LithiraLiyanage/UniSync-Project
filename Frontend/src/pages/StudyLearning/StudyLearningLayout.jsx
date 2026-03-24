import { NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiHome, FiFolder, FiFileText, FiLink, FiTrendingUp, FiBell, FiMessageSquare } from 'react-icons/fi';

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

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full bg-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center text-text">
              <FiBookOpen className="mr-3 text-primary" /> Study & Learning
            </h1>
            <p className="mt-1 text-muted">Manage your modules, past papers, resources, and progress.</p>
          </motion.div>
          
          <div className="flex bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-x-auto max-w-full gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={`/study-learning${item.path ? `/${item.path}` : ''}`}
                end={item.path === ''}
                className={({ isActive }) => 
                  `flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30 font-bold' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold'
                  }`
                }
              >
                {item.icon} <span className="hidden sm:inline">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Dynamic Content Area */}
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
  );
};

export default StudyLearningLayout;
