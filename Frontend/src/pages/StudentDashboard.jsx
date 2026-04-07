import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  FiBookOpen, FiDollarSign, FiMap, FiUsers,
  FiBell, FiCheckCircle, FiAlertTriangle, FiInfo,
  FiTrendingUp, FiSun, FiMoon
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const modules = [
  {
    id: 1, title: 'Study & Learning',
    description: 'Smart study assistant, progress tracking & resources',
    icon: FiBookOpen, link: '/study-learning',
    gradient: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
    lightGradient: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
    glow: 'rgba(109,40,217,0.35)', lightGlow: 'rgba(109,40,217,0.18)',
    iconColor: '#e9d5ff', tag: 'Academics',
    darkTagColor: '#a78bfa', lightTagColor: '#6d28d9',
  },
  {
    id: 2, title: 'Earn & Skills',
    description: 'Find campus gigs, freelance work & skill-building tasks',
    icon: FiDollarSign, link: '/dashboard',   //earn
    gradient: 'linear-gradient(135deg, #065f46, #0d9488)',
    lightGradient: 'linear-gradient(135deg, #0d9488, #14b8a6)',
    glow: 'rgba(13,148,136,0.35)', lightGlow: 'rgba(13,148,136,0.18)',
    iconColor: '#ccfbf1', tag: 'Career',
    darkTagColor: '#2dd4bf', lightTagColor: '#0d9488',
  },
  {
    id: 3, title: 'Travel Smart',
    description: 'Real-time shuttle tracking & smart travel planning',
    icon: FiMap, link: '/travel',
    gradient: 'linear-gradient(135deg, #92400e, #d97706)',
    lightGradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    glow: 'rgba(217,119,6,0.35)', lightGlow: 'rgba(217,119,6,0.18)',
    iconColor: '#fef3c7', tag: 'Transport',
    darkTagColor: '#fbbf24', lightTagColor: '#b45309',
  },
  {
    id: 4, title: 'Social & Events',
    description: 'Connect with peers, join clubs & discover campus events',
    icon: FiUsers, link: '/events',
    gradient: 'linear-gradient(135deg, #9d174d, #db2777)',
    lightGradient: 'linear-gradient(135deg, #db2777, #ec4899)',
    glow: 'rgba(219,39,119,0.35)', lightGlow: 'rgba(219,39,119,0.18)',
    iconColor: '#fce7f3', tag: 'Community',
    darkTagColor: '#f472b6', lightTagColor: '#be185d',
  },
];

const statDefs = [
  { label: 'My Modules',    value: '6',   color: '#7c3aed', darkShadow: 'rgba(124,58,237,0.3)',  lightShadow: 'rgba(124,58,237,0.12)', darkBg: 'rgba(124,58,237,0.1)',  lightBg: '#f5f3ff',  darkBorder: 'rgba(124,58,237,0.3)', lightBorder: '#ddd6fe' },
  { label: 'Past Papers',   value: '14',  color: '#0d9488', darkShadow: 'rgba(13,148,136,0.3)',  lightShadow: 'rgba(13,148,136,0.12)', darkBg: 'rgba(13,148,136,0.1)',  lightBg: '#f0fdfa',  darkBorder: 'rgba(13,148,136,0.3)', lightBorder: '#99f6e4' },
  { label: 'Current GPA',   value: '3.2', color: '#0891b2', darkShadow: 'rgba(8,145,178,0.3)',   lightShadow: 'rgba(8,145,178,0.12)', darkBg: 'rgba(8,145,178,0.1)',   lightBg: '#ecfeff',  darkBorder: 'rgba(8,145,178,0.3)',  lightBorder: '#a5f3fc' },
  { label: 'Notifications', value: '3',   color: '#db2777', darkShadow: 'rgba(219,39,119,0.3)', lightShadow: 'rgba(219,39,119,0.12)', darkBg: 'rgba(219,39,119,0.1)', lightBg: '#fdf2f8', darkBorder: 'rgba(219,39,119,0.3)', lightBorder: '#fbcfe8' },
];

const announcementDefs = [
  { icon: FiCheckCircle, label: 'Success', labelColor: '#059669', borderColor: '#10b981', darkBg: 'rgba(16,185,129,0.08)', lightBg: '#f0fdf4', text: 'Your scholarship application for Semester 2 has been approved.' },
  { icon: FiAlertTriangle, label: 'Urgent', labelColor: '#dc2626', borderColor: '#f87171', darkBg: 'rgba(248,113,113,0.08)', lightBg: '#fff5f5', text: 'Registration for next semester modules closes in 24 hours!' },
  { icon: FiInfo, label: 'Notice', labelColor: '#d97706', borderColor: '#fbbf24', darkBg: 'rgba(251,191,36,0.08)', lightBg: '#fffbeb', text: 'Library book "Clean Code" is due tomorrow.' },
];

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  // ✅ Default changed to light mode (false = light)
  const [isDark, setIsDark] = useState(false);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const d = new Date();
    setDateStr(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const t = isDark ? {
    pageBg:         'var(--bg)',
    cardBg:         'rgba(26, 26, 26, 0.65)',
    cardBorder:     'rgba(255, 255, 255, 0.08)',
    cardShadow:     '0 8px 32px rgba(0, 0, 0, 0.25)',
    titleClr:       'var(--text)',
    subtitleClr:    'var(--muted)',
    sectionTitleClr:'var(--text)',
    cardTitleClr:   'var(--text)',
    cardDescClr:    'var(--muted)',
    annTextClr:     'var(--muted)',
    chartGrid:      'rgba(255, 255, 255, 0.05)',
    chartTick:      'var(--muted)',
    chartLegend:    'var(--muted)',
    toggleBg:       'rgba(255,255,255,0.05)',
    toggleBorder:   'rgba(255,255,255,0.1)',
    toggleColor:    'var(--text)',
    quickCardBg:    'rgba(26, 26, 26, 0.65)',
    quickCardBorder:'rgba(255, 255, 255, 0.08)',
    nameGradient:   'linear-gradient(90deg, #8b5cf6, #3b82f6)',
  } : {
    pageBg:         'var(--bg)',
    cardBg:         'rgba(255, 255, 255, 0.8)',
    cardBorder:     'rgba(0, 0, 0, 0.05)',
    cardShadow:     '0 8px 32px rgba(0, 0, 0, 0.06)',
    titleClr:       'var(--text)',
    subtitleClr:    'var(--muted)',
    sectionTitleClr:'var(--text)',
    cardTitleClr:   'var(--text)',
    cardDescClr:    'var(--muted)',
    annTextClr:     'var(--muted)',
    chartGrid:      'rgba(0, 0, 0, 0.04)',
    chartTick:      'var(--muted)',
    chartLegend:    'var(--muted)',
    toggleBg:       'rgba(0,0,0,0.03)',
    toggleBorder:   'rgba(0,0,0,0.08)',
    toggleColor:    'var(--text)',
    quickCardBg:    'rgba(255, 255, 255, 0.8)',
    quickCardBorder:'rgba(0, 0, 0, 0.05)',
    nameGradient:   'linear-gradient(90deg, #6d28d9, #2563eb)',
  };

  const chartData = {
    labels: ['DSA', 'DBMS', 'OOP', 'Networks', 'OS'],
    datasets: [
      {
        label: 'Module Marks (%)',
        data: [85, 72, 78, 44, 68],
        borderColor: '#7c3aed',
        backgroundColor: isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.06)',
        pointBackgroundColor: ['#7c3aed','#7c3aed','#7c3aed','#f43f5e','#7c3aed'],
        pointBorderColor: ['#a78bfa','#a78bfa','#a78bfa','#fda4af','#a78bfa'],
        pointRadius: 6, pointBorderWidth: 2,
        fill: true, tension: 0.4,
      },
      {
        label: 'Pass Line (50%)',
        data: [50,50,50,50,50],
        borderColor: '#f43f5e',
        borderDash: [5,5],
        pointRadius: 0, fill: false, borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 100, grid: { color: t.chartGrid }, ticks: { color: t.chartTick } },
      x: { grid: { color: t.chartGrid }, ticks: { color: t.chartTick } },
    },
    plugins: {
      legend: { labels: { color: t.chartLegend, boxWidth: 12 } },
    },
  };

  return (
    <div className="flex-1 pt-28 pb-12 px-6 md:px-8 overflow-y-auto w-full transition-colors duration-300 relative"
      style={{ background: t.pageBg }}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: t.titleClr }}>
              {getGreeting()},{' '}
              <span style={{ background: t.nameGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {user?.name?.split(' ')[0] || 'Student'}
              </span>{' '}👋
            </h1>
            <p className="mt-1 text-sm" style={{ color: t.subtitleClr }}>
              Year {user?.year || 2} · Semester {user?.semester || 1} · {dateStr}
            </p>
          </div>

          {/* Dark/Light toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            className="mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all focus:outline-none"
            style={{
              background: t.toggleBg,
              border: `1px solid ${t.toggleBorder}`,
              color: t.toggleColor,
              boxShadow: isDark ? '0 0 12px rgba(124,58,237,0.3)' : '0 2px 8px rgba(15,23,42,0.15)'
            }}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statDefs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-6 rounded-2xl relative overflow-hidden transition-all duration-300 backdrop-blur-xl hover:-translate-y-1"
              style={{
                background: isDark ? `color-mix(in srgb, ${s.darkBg} 40%, transparent)` : `color-mix(in srgb, ${s.lightBg} 60%, transparent)`,
                border: `1px solid ${isDark ? s.darkBorder : s.lightBorder}`,
                boxShadow: `0 8px 32px ${isDark ? s.darkShadow : s.lightShadow}`,
              }}
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20 pointer-events-none"
                style={{ background: s.color }} />
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: s.color }}>{s.label}</h4>
              <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Chart + Announcements ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl h-80 transition-all duration-300 backdrop-blur-xl hover:shadow-2xl"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: t.sectionTitleClr }}>
              <FiTrendingUp style={{ color: '#7c3aed' }} /> Performance Overview
            </h3>
            <div className="relative h-56 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Announcements */}
          <div className="p-6 rounded-2xl h-80 flex flex-col transition-all duration-300 backdrop-blur-xl hover:shadow-2xl"
            style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
            <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: t.sectionTitleClr }}>
              <FiBell style={{ color: '#db2777' }} /> Announcements
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {announcementDefs.map((a, i) => (
                <div key={i} className="p-3 rounded-xl transition-colors duration-300"
                  style={{ background: isDark ? a.darkBg : a.lightBg, borderLeft: `3px solid ${a.borderColor}` }}>
                  <div className="flex items-center gap-1.5 font-semibold text-xs mb-1" style={{ color: a.labelColor }}>
                    <a.icon size={12} /> {a.label}
                  </div>
                  <p className="text-xs" style={{ color: t.annTextClr }}>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Access ── */}
        <div>
          <h3 className="text-lg font-bold mb-4" style={{ color: t.sectionTitleClr }}>Quick Access</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              const grad = isDark ? mod.gradient : mod.lightGradient;
              const glow = isDark ? mod.glow : mod.lightGlow;
              const tagColor = isDark ? mod.darkTagColor : mod.lightTagColor;
              return (
                <Link to={mod.link} key={mod.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative overflow-hidden p-6 rounded-2xl flex flex-col cursor-pointer h-full transition-all duration-300 backdrop-blur-xl hover:-translate-y-1.5 hover:shadow-2xl group"
                    style={{ background: t.quickCardBg, border: `1px solid ${t.quickCardBorder}`, boxShadow: t.cardShadow }}
                  >
                    {/* Blob */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15 pointer-events-none"
                      style={{ background: grad }} />

                    {/* Icon badge */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0"
                      style={{ background: grad, boxShadow: `0 4px 14px ${glow}` }}>
                      <Icon size={22} color={mod.iconColor} />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: tagColor }}>
                      {mod.tag}
                    </span>
                    <h3 className="text-base font-bold mb-1" style={{ color: t.cardTitleClr }}>{mod.title}</h3>
                    <p className="text-xs flex-grow" style={{ color: t.cardDescClr }}>{mod.description}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;

