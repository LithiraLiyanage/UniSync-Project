import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiCalendar, FiAlertCircle, FiArrowRight, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const modules = [
  { id: 1, title: 'Study & Learning', desc: 'Manage papers & resources', link: '/admin/study', bg: 'bg-primary/10', text: 'text-primary' },
  { id: 2, title: 'Earn & Skills', desc: 'Moderate marketplace', link: '/admin/earn', bg: 'bg-green/10', text: 'text-green' },
  { id: 3, title: 'Travel Smart', desc: 'Send alerts & track shuttles', link: '/admin/travel', bg: 'bg-amber/10', text: 'text-amber' },
  { id: 4, title: 'Social & Events', desc: 'Approve student events', link: '/admin/events', bg: 'bg-purple/10', text: 'text-purple' }
];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const barData = {
    labels: ['Study', 'Earn', 'Travel', 'Social'],
    datasets: [{
      label: 'Active Users Today',
      data: [1250, 480, 890, 650],
      backgroundColor: ['#4DA8FF', '#10B981', '#F59E0B', '#8B5CF6'],
      borderRadius: 6
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Overview, <span className="text-primary">{user?.name?.split(' ')[0] || 'Admin'}</span> 👑
          </h1>
          <p className="mt-1 text-muted">System analytics and pending actions.</p>
        </motion.div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-muted uppercase mb-1">Active Users</div>
              <div className="text-3xl font-bold text-text">2,845</div>
            </div>
            <div className="p-3 bg-purple/10 rounded-xl text-purple"><FiUsers size={24}/></div>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-muted uppercase mb-1">Pending Listings</div>
              <div className="text-3xl font-bold text-text">12</div>
            </div>
            <div className="p-3 bg-green/10 rounded-xl text-green"><FiDollarSign size={24}/></div>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-muted uppercase mb-1">Pending Events</div>
              <div className="text-3xl font-bold text-text">8</div>
            </div>
            <div className="p-3 bg-amber/10 rounded-xl text-amber"><FiCalendar size={24}/></div>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-muted uppercase mb-1">Active Alerts</div>
              <div className="text-3xl font-bold text-text">2</div>
            </div>
            <div className="p-3 bg-red/10 rounded-xl text-red"><FiAlertCircle size={24}/></div>
          </div>
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col h-80">
            <h3 className="text-lg font-bold mb-4">Module Engagement (Today)</h3>
            <div className="flex-1 relative w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm p-6 flex flex-col h-80">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="flex items-start">
                <div className="mt-1 p-1.5 bg-green/10 text-green rounded-full mr-3"><FiCheckCircle size={14}/></div>
                <div><p className="text-sm font-semibold">User reported an issue</p><p className="text-xs text-muted">10 mins ago</p></div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 p-1.5 bg-amber/10 text-amber rounded-full mr-3"><FiClock size={14}/></div>
                <div><p className="text-sm font-semibold">Listing #104 awaits approval</p><p className="text-xs text-muted">25 mins ago</p></div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 p-1.5 bg-red/10 text-red rounded-full mr-3"><FiXCircle size={14}/></div>
                <div><p className="text-sm font-semibold">Suspicious login attempt</p><p className="text-xs text-muted">1 hour ago</p></div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 p-1.5 bg-primary/10 text-primary rounded-full mr-3"><FiClock size={14}/></div>
                <div><p className="text-sm font-semibold">Event request: Tech Symp.</p><p className="text-xs text-muted">2 hours ago</p></div>
              </div>
            </div>
          </div>

        </div>

        {/* Module Management Access */}
        <div>
          <h3 className="text-xl font-bold mb-4">Department Management</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map(mod => (
              <Link to={mod.link} key={mod.id}>
                <motion.div whileHover={{ scale: 1.02 }} className={`${mod.bg} border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all`}>
                  <h3 className={`text-lg font-bold mb-1 ${mod.text}`}>{mod.title}</h3>
                  <p className="text-sm text-text font-medium mb-3">{mod.desc}</p>
                  <div className={`flex items-center text-sm font-bold ${mod.text}`}>Manage <FiArrowRight className="ml-1"/></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
