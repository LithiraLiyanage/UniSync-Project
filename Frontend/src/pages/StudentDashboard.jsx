import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBookOpen, FiDollarSign, FiMap, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const modules = [
  {
    id: 1,
    title: 'Study & Learning',
    description: 'Smart study assistant, progress tracking & resources',
    icon: <FiBookOpen size={28} className="text-dark-blue" />,
    link: '/study',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  {
    id: 2,
    title: 'Earn & Skills',
    description: 'Find campus gigs, freelance work & skill-building tasks',
    icon: <FiDollarSign size={28} className="text-dark-blue" />,
    link: '/earn',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  {
    id: 3,
    title: 'Travel Smart',
    description: 'Real-time shuttle tracking & smart travel planning',
    icon: <FiMap size={28} className="text-dark-blue" />,
    link: '/travel',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  {
    id: 4,
    title: 'Social & Events',
    description: 'Connect with peers, join clubs & discover campus events',
    icon: <FiUsers size={28} className="text-dark-blue" />,
    link: '/events',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  }
];

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Welcome back, <span className="text-dark-blue">{user?.name?.split(' ')[0] || 'Student'}</span>! 👋
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's what's happening on your campus today.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`rounded-2xl p-8 border-2 ${mod.border} bg-white shadow-sm hover:shadow-xl hover:border-dark-blue transition-all group flex flex-col`}
            >
              <div className={`w-16 h-16 rounded-2xl ${mod.bg} flex items-center justify-center mb-6`}>
                {mod.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{mod.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow text-lg">
                {mod.description}
              </p>
              
              <Link 
                to={mod.link}
                className="inline-flex items-center w-max px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-black font-semibold transition-colors"
                onClick={() => {
                  console.log(`Navigating to ${mod.title}`);
                }}
              >
                Open Module <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
