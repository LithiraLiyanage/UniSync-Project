import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBell, FiCheckCircle, FiAlertTriangle, FiInfo, FiMessageSquare, FiTrendingUp, FiFileText, FiLink, FiFolder, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const HomeDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const chartData = {
    labels: ['DSA', 'DBMS', 'OOP', 'Networks', 'OS'],
    datasets: [
      {
        label: 'Module Marks (%)',
        data: [85, 72, 78, 44, 68],
        borderColor: '#4DA8FF',
        backgroundColor: 'rgba(77, 168, 255, 0.1)',
        pointBackgroundColor: function(context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value < 50 ? '#EF4444' : '#4DA8FF';
        },
        pointRadius: 6,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Pass Line (50%)',
        data: [50, 50, 50, 50, 50],
        borderColor: '#EF4444',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { min: 0, max: 100 } },
    plugins: { legend: { position: 'top' } }
  };

  const quickAccess = [
    { id: 1, title: 'AI Chatbot', desc: 'Ask study questions', icon: <FiMessageSquare size={24} className="text-blue-500" />, iconBg: 'bg-blue-100 dark:bg-blue-900/50', link: '/study-learning/chatbot' },
    { id: 2, title: 'Progress', desc: 'View GPA & charts', icon: <FiTrendingUp size={24} className="text-green-500" />, iconBg: 'bg-green-100 dark:bg-green-900/50', link: '/study-learning/progress' },
    { id: 3, title: 'Past Papers', desc: 'Download old exams', icon: <FiFileText size={24} className="text-purple-500" />, iconBg: 'bg-purple-100 dark:bg-purple-900/50', link: '/study-learning/papers' },
    { id: 4, title: 'Resources', desc: 'Find study materials', icon: <FiLink size={24} className="text-amber-500" />, iconBg: 'bg-amber-100 dark:bg-amber-900/50', link: '/study-learning/resources' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-black dark:text-black flex items-center">
          {getGreeting()}, <span className="text-blue-600 dark:text-blue-400 ml-2">{user?.name?.split(' ')[0] || 'Student'}</span> <span className="ml-3 wave-emoji">👋</span>
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium text-lg">
          Year {user?.year || 2} · Semester {user?.semester || 1} <span className="mx-2">•</span> {dateStr}
        </p>
      </motion.div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Modules Card */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-between border border-blue-200 dark:border-blue-800/50 group">
          <div>
            <h4 className="text-blue-900 dark:text-blue-900 text-sm font-bold uppercase tracking-wider mb-1">Modules</h4>
            <div className="text-4xl font-extrabold text-white mt-2">6</div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
            <FiFolder size={32} />
          </div>
        </div>

        {/* Past Papers Card */}
        <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/20 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-between border border-green-200 dark:border-green-800/50 group">
          <div>
            <h4 className="text-green-900 dark:text-green-900 text-sm font-bold uppercase tracking-wider mb-1">Past Papers</h4>
            <div className="text-4xl font-extrabold text-white mt-2">14</div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
            <FiFileText size={32} />
          </div>
        </div>

        {/* GPA Card */}
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/40 dark:to-yellow-800/20 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-between border border-yellow-200 dark:border-yellow-800/50 group">
          <div>
            <h4 className="text-orange-700 dark:text-orange-700 text-sm font-bold uppercase tracking-wider mb-1">Current GPA</h4>
            <div className="text-4xl font-extrabold text-white mt-2">3.2</div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-white flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
            <FiAward size={32} />
          </div>
        </div>

        {/* Notifications Card */}
        <div className="bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/40 dark:to-red-800/20 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-between border border-red-200 dark:border-red-800/50 group">
          <div>
            <h4 className="text-red-900 dark:text-red-900 text-sm font-bold uppercase tracking-wider mb-1">Alerts</h4>
            <div className="text-4xl font-extrabold text-white mt-2">3</div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
            <FiBell size={32} />
          </div>
        </div>
      </div>

      {/* Middle Section: Chart & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow h-96 flex flex-col">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Performance Overview</h3>
          <div className="relative flex-1 w-full min-h-0">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-lg h-96 flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
              <FiBell className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            Announcements
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            
            <div className="group p-4 bg-gray-50 dark:bg-gray-800/50 border-l-4 border-green-500 rounded-2xl hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold rounded-bl-xl shadow-sm">Success</div>
              <h4 className="font-bold text-gray-800 dark:text-white mt-2 mb-1 flex items-center"><FiCheckCircle className="mr-2 text-green-500" /> Assignment Graded</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your assignment for OOP was graded with an A+.</p>
            </div>

            <div className="group p-4 bg-gray-50 dark:bg-gray-800/50 border-l-4 border-red-500 rounded-2xl hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-xs font-bold rounded-bl-xl shadow-sm">Urgent</div>
              <h4 className="font-bold text-gray-800 dark:text-white mt-2 mb-1 flex items-center"><FiAlertTriangle className="mr-2 text-red-500" /> Exam Tomorrow!</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Networks practical exam is tomorrow at 9:00 AM.</p>
            </div>

            <div className="group p-4 bg-gray-50 dark:bg-gray-800/50 border-l-4 border-yellow-500 rounded-2xl hover:bg-white dark:hover:bg-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all relative overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-bl-xl shadow-sm">Warning</div>
              <h4 className="font-bold text-gray-800 dark:text-white mt-2 mb-1 flex items-center"><FiInfo className="mr-2 text-yellow-500" /> Pending Task</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">You have 1 pending lab report for Operating Systems.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {quickAccess.map((item, i) => (
            <Link to={item.link} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-400 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex items-center group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.iconBg} group-hover:scale-110 mr-5 shrink-0 transition-all shadow-sm`}>
                  <div className="transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomeDashboard;
