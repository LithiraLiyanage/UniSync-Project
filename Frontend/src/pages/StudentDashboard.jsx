import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBookOpen, FiDollarSign, FiMap, FiUsers, FiArrowRight, FiBell, FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const modules = [
  { id: 1, title: 'Study & Learning', description: 'Smart study assistant, progress tracking & resources', icon: <FiBookOpen size={28} className="text-primary" />, link: '/study-learning', border: 'border-primary-light' },
  { id: 2, title: 'Earn & Skills', description: 'Find campus gigs, freelance work & skill-building tasks', icon: <FiDollarSign size={28} className="text-green" />, link: '/earn', border: 'border-green' },
  { id: 3, title: 'Travel Smart', description: 'Real-time shuttle tracking & smart travel planning', icon: <FiMap size={28} className="text-amber" />, link: '/travel', border: 'border-amber' },
  { id: 4, title: 'Social & Events', description: 'Connect with peers, join clubs & discover campus events', icon: <FiUsers size={28} className="text-purple" />, link: '/events', border: 'border-purple' }
];

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  // Chart data
  const chartData = {
    labels: ['DSA', 'DBMS', 'OOP', 'Networks', 'OS'],
    datasets: [
      {
        label: 'Module Marks (%)',
        data: [85, 72, 78, 44, 68],
        borderColor: '#4DA8FF',
        backgroundColor: 'rgba(77, 168, 255, 0.1)',
        pointBackgroundColor: ['#4DA8FF', '#4DA8FF', '#4DA8FF', '#EF4444', '#4DA8FF'],
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
    scales: {
      y: { min: 0, max: 100 }
    },
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            {getGreeting()}, <span className="text-primary">{user?.name?.split(' ')[0] || 'Student'}</span> 👋
          </h1>
          <p className="mt-1 text-muted">Year {user?.year || 2} · Semester {user?.semester || 1} · {dateStr}</p>
        </motion.div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">My Modules</h4>
            <div className="text-3xl font-bold text-text">6</div>
          </div>
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Past Papers</h4>
            <div className="text-3xl font-bold text-text">14</div>
          </div>
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Current GPA</h4>
            <div className="text-3xl font-bold text-primary">3.2</div>
          </div>
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Notifications</h4>
            <div className="text-3xl font-bold text-amber">3</div>
          </div>
        </div>

        {/* Middle Section: Chart & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border p-6 rounded-xl shadow-sm h-80">
            <h3 className="text-lg font-bold mb-4">Performance Overview</h3>
            <div className="relative h-60 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm h-80 flex flex-col">
            <h3 className="text-lg font-bold mb-4 flex items-center"><FiBell className="mr-2 text-primary" /> Announcements</h3>
            <div className="flex-1 overflow-y-auto space-y-3">
              <div className="p-3 bg-green/10 border-l-4 border-green rounded-r-lg">
                <div className="flex items-center text-green font-semibold text-sm mb-1"><FiCheckCircle className="mr-1" /> Success</div>
                <p className="text-xs text-text">Your scholarship application for Semester 2 has been approved.</p>
              </div>
              <div className="p-3 bg-red/10 border-l-4 border-red rounded-r-lg">
                <div className="flex items-center text-red font-semibold text-sm mb-1"><FiAlertTriangle className="mr-1" /> Urgent</div>
                <p className="text-xs text-text">Registration for next semester modules closes in 24 hours!</p>
              </div>
              <div className="p-3 bg-amber/10 border-l-4 border-amber rounded-r-lg">
                <div className="flex items-center text-amber font-semibold text-sm mb-1"><FiInfo className="mr-1" /> Warning</div>
                <p className="text-xs text-text">Library book "Clean Code" is due tomorrow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((mod, i) => (
              <Link to={mod.link} key={mod.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border-2 border-transparent hover:border-primary/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all h-full flex flex-col cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-primary/10`}>
                    {mod.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{mod.title}</h3>
                  <p className="text-sm text-muted flex-grow">{mod.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
