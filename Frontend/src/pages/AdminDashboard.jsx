import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiBookOpen, 
  FiDollarSign, 
  FiMap, 
  FiUsers, 
  FiArrowRight,
  FiHome,
  FiUser,
  FiSettings,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const adminModules = [
  {
    id: 1,
    title: 'Study & Learning',
    subtitle: 'Management',
    description: 'Manage study resources, configs & tracking',
    icon: <FiBookOpen size={24} className="text-white" />,
    link: '/admin/study',
  },
  {
    id: 2,
    title: 'Earn & Skills',
    subtitle: 'Management',
    description: 'Review gigs, approve tasks & skill listings',
    icon: <FiDollarSign size={24} className="text-white" />,
    link: '/admin/earn',
  },
  {
    id: 3,
    title: 'Travel Smart',
    subtitle: 'Management',
    description: 'Update shuttle schedules & travel routes',
    icon: <FiMap size={24} className="text-white" />,
    link: '/admin/travel',
  },
  {
    id: 4,
    title: 'Social & Events',
    subtitle: 'Management',
    description: 'Create events, manage clubs & announcements',
    icon: <FiUsers size={24} className="text-white" />,
    link: '/admin/events',
  }
];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-16">
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between z-20 sticky top-16">
        <span className="text-white font-medium">Admin Menu</span>
        <button onClick={toggleSidebar} className="text-white p-2">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <motion.aside 
        className={`fixed md:sticky top-0 md:top-16 left-0 h-[calc(100vh-4rem)] bg-slate-900 w-64 flex-shrink-0 z-30 transition-transform duration-300 ease-in-out border-r border-slate-800
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6">Navigation</div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-3 bg-indigo-600 rounded-lg text-white font-medium group transition-colors">
              <FiHome className="mr-3 text-indigo-200 group-hover:text-white transition-colors" size={20} />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white font-medium group transition-colors">
              <FiUser className="mr-3 text-slate-500 group-hover:text-slate-300 transition-colors" size={20} />
              Manage Users
            </a>
            <a href="#" className="flex items-center px-4 py-3 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white font-medium group transition-colors">
              <FiSettings className="mr-3 text-slate-500 group-hover:text-slate-300 transition-colors" size={20} />
              Settings
            </a>
          </nav>
        </div>
      </motion.aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden top-16"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Admin Panel <span className="text-indigo-600">— Welcome, {user?.name?.split(' ')[0] || 'Admin'}!</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Overview and management of UniSync platform features.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {adminModules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="bg-indigo-900 px-6 py-4 flex items-center space-x-4">
                <div className="bg-indigo-800 p-2 rounded-lg">
                  {mod.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{mod.title}</h3>
                  <p className="text-indigo-300 text-sm font-medium">{mod.subtitle}</p>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="text-gray-700 font-medium mb-6 text-lg">
                  {mod.description}
                </p>
                
                <Link 
                  to={mod.link}
                  className="inline-flex items-center text-indigo-700 font-bold hover:text-indigo-900 transition-colors w-max"
                  onClick={() => {
                     console.log(`Manage ${mod.title}`);
                  }}
                >
                  Manage <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
