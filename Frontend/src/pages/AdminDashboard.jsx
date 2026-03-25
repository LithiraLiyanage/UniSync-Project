import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  FiUsers, FiDollarSign, FiCalendar, FiAlertCircle,
  FiArrowRight, FiCheckCircle, FiClock, FiXCircle,
  FiSun, FiMoon
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const modules = [
  {
    id: 1, title: 'Study & Learning', desc: 'Manage papers & resources', link: '/admin/study',
    color: '#6d28d9',
    darkBg: 'rgba(109,40,217,0.1)', lightBg: '#f5f3ff',
    darkBorder: 'rgba(109,40,217,0.25)', lightBorder: '#ddd6fe',
    darkGlow: 'rgba(109,40,217,0.25)', lightGlow: 'rgba(109,40,217,0.12)',
  },
  {
    id: 2, title: 'Earn & Skills', desc: 'Moderate marketplace', link: '/admin/earn',
    color: '#0d9488',
    darkBg: 'rgba(13,148,136,0.1)', lightBg: '#f0fdfa',
    darkBorder: 'rgba(13,148,136,0.25)', lightBorder: '#99f6e4',
    darkGlow: 'rgba(13,148,136,0.25)', lightGlow: 'rgba(13,148,136,0.12)',
  },
  {
    id: 3, title: 'Travel Smart', desc: 'Send alerts & track shuttles', link: '/admin/travel',
    color: '#d97706',
    darkBg: 'rgba(217,119,6,0.1)', lightBg: '#fffbeb',
    darkBorder: 'rgba(217,119,6,0.25)', lightBorder: '#fde68a',
    darkGlow: 'rgba(217,119,6,0.25)', lightGlow: 'rgba(217,119,6,0.12)',
  },
  {
    id: 4, title: 'Social & Events', desc: 'Approve student events', link: '/admin/events',
    color: '#db2777',
    darkBg: 'rgba(219,39,119,0.1)', lightBg: '#fdf2f8',
    darkBorder: 'rgba(219,39,119,0.25)', lightBorder: '#fbcfe8',
    darkGlow: 'rgba(219,39,119,0.25)', lightGlow: 'rgba(219,39,119,0.12)',
  },
];

const statDefs = [
  {
    label: 'Active Users', value: '2,845', icon: FiUsers,
    color: '#7c3aed',
    darkIconBg: 'rgba(124,58,237,0.12)', lightIconBg: '#f5f3ff',
    darkBg: 'rgba(124,58,237,0.07)', lightBg: '#faf5ff',
    darkBorder: 'rgba(124,58,237,0.2)', lightBorder: '#ddd6fe',
    darkShadow: 'rgba(124,58,237,0.2)', lightShadow: 'rgba(124,58,237,0.1)',
  },
  {
    label: 'Pending Listings', value: '12', icon: FiDollarSign,
    color: '#0d9488',
    darkIconBg: 'rgba(13,148,136,0.12)', lightIconBg: '#f0fdfa',
    darkBg: 'rgba(13,148,136,0.07)', lightBg: '#f0fdf9',
    darkBorder: 'rgba(13,148,136,0.2)', lightBorder: '#99f6e4',
    darkShadow: 'rgba(13,148,136,0.2)', lightShadow: 'rgba(13,148,136,0.1)',
  },
  {
    label: 'Pending Events', value: '8', icon: FiCalendar,
    color: '#d97706',
    darkIconBg: 'rgba(217,119,6,0.12)', lightIconBg: '#fffbeb',
    darkBg: 'rgba(217,119,6,0.07)', lightBg: '#fefce8',
    darkBorder: 'rgba(217,119,6,0.2)', lightBorder: '#fde68a',
    darkShadow: 'rgba(217,119,6,0.2)', lightShadow: 'rgba(217,119,6,0.1)',
  },
  {
    label: 'Active Alerts', value: '2', icon: FiAlertCircle,
    color: '#e11d48',
    darkIconBg: 'rgba(225,29,72,0.12)', lightIconBg: '#fff1f2',
    darkBg: 'rgba(225,29,72,0.07)', lightBg: '#fff5f6',
    darkBorder: 'rgba(225,29,72,0.2)', lightBorder: '#fecdd3',
    darkShadow: 'rgba(225,29,72,0.2)', lightShadow: 'rgba(225,29,72,0.1)',
  },
];

const activityDefs = [
  { icon: FiCheckCircle, color: '#10b981', darkBg: 'rgba(16,185,129,0.12)', lightBg: '#f0fdf4', title: 'User reported an issue', time: '10 mins ago' },
  { icon: FiClock,        color: '#f59e0b', darkBg: 'rgba(245,158,11,0.12)', lightBg: '#fffbeb', title: 'Listing #104 awaits approval', time: '25 mins ago' },
  { icon: FiXCircle,      color: '#f43f5e', darkBg: 'rgba(244,63,94,0.12)',  lightBg: '#fff1f2', title: 'Suspicious login attempt', time: '1 hour ago' },
  { icon: FiClock,        color: '#6d28d9', darkBg: 'rgba(109,40,217,0.12)', lightBg: '#f5f3ff', title: 'Event request: Tech Symp.', time: '2 hours ago' },
];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const t = isDark ? {
    pageBg:          '#08080f',
    cardBg:          '#0d0d14',
    cardBorder:      '#1f1b33',
    cardShadow:      '0 4px 24px rgba(0,0,0,0.4)',
    titleClr:        '#f3f4f6',
    subtitleClr:     '#6b7280',
    sectionTitleClr: '#e9d5ff',
    cardTitleClr:    '#f3f4f6',
    cardDescClr:     '#9ca3af',
    activityTitle:   '#e5e7eb',
    activityTime:    '#6b7280',
    chartGrid:       'rgba(255,255,255,0.05)',
    chartTick:       '#6b7280',
    toggleBg:        '#1a0f2e',
    toggleBorder:    '#4c1d95',
    toggleColor:     '#c4b5fd',
    nameGradient:    'linear-gradient(90deg,#a78bfa,#f472b6)',
  } : {
    pageBg:          '#f1f5f9',
    cardBg:          '#ffffff',
    cardBorder:      '#e2e8f0',
    cardShadow:      '0 2px 16px rgba(15,23,42,0.07)',
    titleClr:        '#0f172a',
    subtitleClr:     '#64748b',
    sectionTitleClr: '#1e293b',
    cardTitleClr:    '#1e293b',
    cardDescClr:     '#64748b',
    activityTitle:   '#1e293b',
    activityTime:    '#94a3b8',
    chartGrid:       'rgba(15,23,42,0.06)',
    chartTick:       '#94a3b8',
    toggleBg:        '#1e293b',
    toggleBorder:    '#334155',
    toggleColor:     '#94a3b8',
    nameGradient:    'linear-gradient(90deg,#7c3aed,#db2777)',
  };

  const barData = {
    labels: ['Study', 'Earn', 'Travel', 'Social'],
    datasets: [{
      label: 'Active Users Today',
      data: [1250, 480, 890, 650],
      backgroundColor: ['#6d28d9', '#0d9488', '#d97706', '#db2777'],
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: t.chartGrid },
        ticks: { color: t.chartTick },
      },
      x: {
        grid: { color: 'transparent' },
        ticks: { color: t.chartTick },
      },
    },
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full transition-colors duration-300"
      style={{ background: t.pageBg }}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: t.titleClr }}>
              Admin Overview,{' '}
              <span style={{ background: t.nameGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {user?.name?.split(' ')[0] || 'Admin'}
              </span>{' '}👑
            </h1>
            <p className="mt-1 text-sm" style={{ color: t.subtitleClr }}>
              System analytics and pending actions · {dateStr}
            </p>
          </div>

          <button
            onClick={() => setIsDark(d => !d)}
            className="mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all focus:outline-none"
            style={{
              background: t.toggleBg,
              border: `1px solid ${t.toggleBorder}`,
              color: t.toggleColor,
              boxShadow: isDark ? '0 0 12px rgba(124,58,237,0.3)' : '0 2px 8px rgba(15,23,42,0.15)',
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statDefs.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-5 rounded-2xl flex items-center justify-between transition-colors duration-300"
                style={{
                  background: isDark ? s.darkBg : s.lightBg,
                  border: `1px solid ${isDark ? s.darkBorder : s.lightBorder}`,
                  boxShadow: `0 4px 20px ${isDark ? s.darkShadow : s.lightShadow}`,
                }}
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: s.color }}>
                    {s.label}
                  </div>
                  <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                </div>
                <div className="p-3 rounded-xl shrink-0"
                  style={{ background: isDark ? s.darkIconBg : s.lightIconBg }}>
                  <Icon size={22} color={s.color} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Chart + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Bar Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl h-80 flex flex-col transition-colors duration-300"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
            <h3 className="text-base font-bold mb-4" style={{ color: t.sectionTitleClr }}>
              Module Engagement (Today)
            </h3>
            <div className="flex-1 relative w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-2xl h-80 flex flex-col transition-colors duration-300"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
            <h3 className="text-base font-bold mb-4" style={{ color: t.sectionTitleClr }}>Recent Activity</h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {activityDefs.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-full shrink-0 transition-colors duration-300"
                      style={{ background: isDark ? a.darkBg : a.lightBg }}>
                      <Icon size={13} color={a.color} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: t.activityTitle }}>{a.title}</p>
                      <p className="text-xs" style={{ color: t.activityTime }}>{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Department Management ── */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: t.sectionTitleClr }}>Department Management</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod, i) => (
              <Link to={mod.link} key={mod.id}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 28px ${isDark ? mod.darkGlow : mod.lightGlow}` }}
                  className="p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: isDark ? mod.darkBg : mod.lightBg,
                    border: `1px solid ${isDark ? mod.darkBorder : mod.lightBorder}`,
                    boxShadow: t.cardShadow,
                  }}
                >
                  <h3 className="text-base font-bold mb-1" style={{ color: mod.color }}>{mod.title}</h3>
                  <p className="text-sm mb-3" style={{ color: t.cardDescClr }}>{mod.desc}</p>
                  <div className="flex items-center text-sm font-bold gap-1" style={{ color: mod.color }}>
                    Manage <FiArrowRight size={14} />
                  </div>
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
