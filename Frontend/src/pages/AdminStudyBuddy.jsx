import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBookOpen, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiLayers, 
  FiFileText, FiUsers, FiTrendingUp, FiActivity, FiArrowRight,
  FiAlertCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
  LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const initialModules = [
  { id: 1, code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, students: 245 },
  { id: 2, code: 'CS202', name: 'Database Management Systems', credits: 3, students: 230 },
  { id: 3, code: 'CS204', name: 'Computer Networks', credits: 3, students: 210 }
];

const initialPapers = [
  { id: 1, title: 'CS201 - Mid Term 2024.pdf', uploadedBy: 'S10294', status: 'Pending', date: '2024-10-10' },
  { id: 2, title: 'CS202 - Final 2023.pdf', uploadedBy: 'S18392', status: 'Approved', date: '2024-10-08' }
];

// Reusable Skeleton Component
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-700/50 rounded-xl ${className}`}></div>
);

const AdminStudyBuddy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [modules, setModules] = useState(initialModules);
  const [papers, setPapers] = useState(initialPapers);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, type: '', id: null });
  
  // Validation States
  const [newModule, setNewModule] = useState({ code: '', name: '', credits: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulate initial data loading for skeleton UI
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const approvePaper = (id) => {
    setPapers(papers.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    toast.success('Paper approved successfully');
  };

  const confirmDeleteModule = (id) => {
    setShowConfirmModal({ isOpen: true, type: 'module', id });
  };

  const confirmRejectPaper = (id) => {
    setShowConfirmModal({ isOpen: true, type: 'paper', id });
  };

  const handleConfirmAction = () => {
    if (showConfirmModal.type === 'module') {
      setModules(modules.filter(m => m.id !== showConfirmModal.id));
      toast.success('Module successfully deleted');
    } else if (showConfirmModal.type === 'paper') {
      setPapers(papers.filter(p => p.id !== showConfirmModal.id));
      toast.success('Paper rejected and removed');
    }
    setShowConfirmModal({ isOpen: false, type: '', id: null });
  };

  const handleAddModule = () => {
    let errors = {};
    if (!newModule.code.trim()) errors.code = 'Module Code is required';
    if (!newModule.name.trim()) errors.name = 'Module Name is required';
    if (!newModule.credits || newModule.credits <= 0) errors.credits = 'Valid Credits are required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix validation errors');
      return;
    }

    setModules([...modules, { id: Date.now(), ...newModule, students: 0 }]);
    setNewModule({ code: '', name: '', credits: '' });
    setFormErrors({});
    setShowAddModal(false);
    toast.success('Module added successfully');
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Student Activity',
      data: [120, 190, 300, 250, 280, 150, 210],
      borderColor: '#6366f1',
      borderWidth: 3,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#6366f1',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#6366f1',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        bodyFont: { font: { weight: 'bold' } },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: { 
        grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
        ticks: { color: '#94a3b8', font: { size: 12 } }
      },
      x: { 
        grid: { display: false, drawBorder: false },
        ticks: { color: '#94a3b8', font: { size: 12 } }
      },
    }
  };

  const statCards = [
    { title: 'Total Modules', value: modules.length.toString(), icon: FiLayers, colorClass: 'text-blue-600', bgClass: 'bg-blue-100 dark:bg-blue-900/30', borderClass: 'border-t-blue-500', trend: '↑ +3%' },
    { title: 'Total Resources', value: '1,204', icon: FiBookOpen, colorClass: 'text-green-600', bgClass: 'bg-green-100 dark:bg-green-900/30', borderClass: 'border-t-green-500', trend: '↑ +12%' },
    { title: 'Total Papers', value: papers.length.toString(), icon: FiFileText, colorClass: 'text-orange-600', bgClass: 'bg-orange-100 dark:bg-orange-900/30', borderClass: 'border-t-orange-500', trend: '↓ -2%' },
    { title: 'Active Students', value: '2,845', icon: FiUsers, colorClass: 'text-pink-600', bgClass: 'bg-pink-100 dark:bg-pink-900/30', borderClass: 'border-t-pink-500', trend: '↑ +8%' },
  ];

  const managementCards = [
    { title: 'Manage Modules', desc: 'Add, update or remove course modules.', tab: 'modules', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
    { title: 'Manage Resources', desc: 'Organize study materials and links.', tab: 'resources', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/10' },
    { title: 'Manage Past Papers', desc: 'Review and approve student uploads.', tab: 'papers', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/10' },
    { title: 'Monitor Progress', desc: 'View analytics and user engagement.', tab: 'progress', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/10' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <div className="flex-1 pt-28 pb-12 px-6 md:px-8 overflow-y-auto w-full transition-colors duration-300 relative bg-slate-50 dark:bg-[var(--bg)] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Study & Learning Admin
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
              Manage the academic ecosystem efficiently.
            </p>
          </motion.div>
          
          <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50">
            {['dashboard', 'modules', 'papers'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold capitalize ${
                  activeTab === tab 
                  ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab === 'dashboard' ? 'Overview' : tab === 'papers' ? 'Past Papers' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- Dashboard Content --- */}
        {activeTab === 'dashboard' && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {statCards.map((s, i) => (
                <motion.div custom={i} variants={fadeUp} key={i} className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 border-t-4 ${s.borderClass} hover:scale-[1.03] hover:shadow-lg transition-all duration-300 flex items-center justify-between group`}>
                  {isLoading ? (
                    <div className="w-full flex justify-between items-center space-x-4">
                      <div className="space-y-3 flex-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-12" />
                      </div>
                      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{s.title}</p>
                        <div className="flex items-center gap-3">
                          <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white">{s.value}</h3>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${s.trend.includes('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {s.trend}
                          </span>
                        </div>
                      </div>
                      <div className={`p-4 rounded-xl ${s.bgClass} text-slate-800 dark:text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                        <s.icon className={`${s.colorClass}`} size={24} />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Pane */}
              <motion.div custom={4} variants={fadeUp} className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><FiTrendingUp /></div>
                    Student Activity
                  </h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">This Week</span>
                </div>
                {isLoading ? (
                  <Skeleton className="flex-1 w-full min-h-[250px]" />
                ) : (
                  <div className="flex-1 relative w-full min-h-[260px]">
                    <Line ref={chartRef} data={chartData} options={chartOptions} />
                  </div>
                )}
              </motion.div>

              {/* Quick Actions Panel */}
              <motion.div custom={5} variants={fadeUp} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col h-full">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600"><FiLayers /></div>
                  Quick Actions
                </h3>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1,2,3,4].map(i => <Skeleton key={i} className="h-[72px] w-full" />)}
                  </div>
                ) : (
                  <div className="flex-1 grid grid-cols-1 gap-3 content-start">
                    {managementCards.map((m, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActiveTab(m.tab === 'progress' || m.tab === 'resources' ? 'dashboard' : m.tab)}
                        className={`flex items-center p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 relative overflow-hidden`}
                      >
                        <div className={`p-3 rounded-lg ${m.bg} mr-4 transition-transform group-hover:scale-110`}>
                          <FiArrowRight className={`transform -rotate-45 ${m.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-white">{m.title}</h4>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{m.desc}</p>
                        </div>
                        <FiArrowRight className="text-slate-300 dark:text-slate-500 absolute right-4 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Recent Activity Timeline */}
            <motion.div custom={6} variants={fadeUp} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 mt-6 lg:mt-8">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600"><FiActivity /></div>
                Recent Activity
              </h3>
              
              {isLoading ? (
                <div className="space-y-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-100 dark:border-slate-700 ml-4 space-y-8">
                  {[
                    { title: 'New Module Added: AI Engineering', time: '10 mins ago', desc: 'Added by Administrator', icon: FiBookOpen, colorClass: 'text-blue-600', bgClass: 'bg-blue-100 dark:bg-blue-900' },
                    { title: 'Past Paper Approved: CS202', time: '1 hour ago', desc: 'Approved by Administrator', icon: FiCheck, colorClass: 'text-green-600', bgClass: 'bg-green-100 dark:bg-green-900' },
                    { title: 'New Resource Uploaded', time: '3 hours ago', desc: 'Uploaded by Student S10294', icon: FiLayers, colorClass: 'text-purple-600', bgClass: 'bg-purple-100 dark:bg-purple-900' },
                  ].map((act, i) => (
                    <div key={i} className="relative group">
                      {/* Timeline dot */}
                      <div className={`absolute -left-[45px] sm:-left-[53px] top-0 p-2 rounded-full ${act.bgClass} border-4 border-white dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform`}>
                        <act.icon size={16} className={act.colorClass} />
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50">
                        <p className="font-bold text-sm text-slate-800 dark:text-white mb-1">{act.title}</p>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span>{act.time}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          <span>{act.desc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

          </motion.div>
        )}

        {/* --- Modules Tab --- */}
        {activeTab === 'modules' && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Academic Modules</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">Manage and review all system modules</p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <FiPlus className="mr-2" /> Add Module
              </button>
            </div>
            
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-sm text-slate-800 dark:text-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Code</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Module Name</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Credits</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {modules.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200 group">
                        <td className="px-6 py-4">
                          <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">{m.code}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{m.name}</td>
                        <td className="px-6 py-4 font-medium">{m.credits}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">Active</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors" title="Edit"><FiEdit size={18} /></button>
                            <button onClick={() => confirmDeleteModule(m.id)} className="p-2 text-slate-400 hover:text-red-600 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors" title="Delete"><FiTrash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {modules.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-500">
                            <FiBookOpen size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
                            <p className="font-bold text-lg text-slate-700 dark:text-slate-300">No Modules Found</p>
                            <p className="text-sm mt-1">Get started by creating a new module.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- Papers Tab --- */}
        {activeTab === 'papers' && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Past Papers Review</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">Approve or reject student uploads</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden text-slate-800 dark:text-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Document Title</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Uploaded By</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Date</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {papers.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-200">
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                          <FiFileText className="text-slate-400" size={20} />
                          {p.title}
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-slate-500">{p.uploadedBy}</td>
                        <td className="px-6 py-4 font-medium text-slate-500">{p.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            p.status === 'Pending' 
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 border-orange-200' 
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:border-green-800 border-green-200'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            {p.status === 'Pending' && (
                              <>
                                <button onClick={() => approvePaper(p.id)} className="p-2 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/50 rounded-lg transition-colors" title="Approve"><FiCheck size={18} /></button>
                                <button onClick={() => confirmRejectPaper(p.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/50 rounded-lg transition-colors" title="Reject"><FiX size={18} /></button>
                              </>
                            )}
                            <button className="px-3 py-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-2">
                              Preview
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {papers.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-500">
                            <FiFileText size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
                            <p className="font-bold text-lg text-slate-700 dark:text-slate-300">No Past Papers</p>
                            <p className="text-sm mt-1">There are currently no uploaded past papers.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- Modals --- */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl relative border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/80 p-6 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <FiBookOpen className="text-blue-600" /> Add Course Module
                  </h2>
                </div>
                
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Module Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. CS301" 
                      value={newModule.code}
                      onChange={(e) => setNewModule({...newModule, code: e.target.value})}
                      className={`w-full px-4 py-3 bg-white dark:bg-[var(--bg)] text-slate-800 dark:text-slate-200 rounded-xl border outline-none transition-shadow duration-200 focus:ring-2 ${formErrors.code ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'}`}
                    />
                    {formErrors.code && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><FiAlertCircle /> {formErrors.code}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Module Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Artificial Intelligence" 
                      value={newModule.name}
                      onChange={(e) => setNewModule({...newModule, name: e.target.value})}
                      className={`w-full px-4 py-3 bg-white dark:bg-[var(--bg)] text-slate-800 dark:text-slate-200 rounded-xl border outline-none transition-shadow duration-200 focus:ring-2 ${formErrors.name ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'}`}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><FiAlertCircle /> {formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Credits</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 3" 
                      value={newModule.credits}
                      onChange={(e) => setNewModule({...newModule, credits: e.target.value})}
                      className={`w-full px-4 py-3 bg-white dark:bg-[var(--bg)] text-slate-800 dark:text-slate-200 rounded-xl border outline-none transition-shadow duration-200 focus:ring-2 ${formErrors.credits ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/30' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-100 dark:focus:ring-blue-900/30'}`}
                    />
                    {formErrors.credits && <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1"><FiAlertCircle /> {formErrors.credits}</p>}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                  <button 
                    onClick={() => { setShowAddModal(false); setFormErrors({}); }} 
                    className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddModule} 
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <FiPlus /> Add Module
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          {showConfirmModal.isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-2xl relative border border-slate-200 dark:border-slate-700 p-6 text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Are you sure?</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">
                  This action cannot be undone. This will permanently delete the {showConfirmModal.type}.
                </p>
                <div className="flex justify-center gap-3 w-full">
                  <button 
                    onClick={() => setShowConfirmModal({ isOpen: false, type: '', id: null })} 
                    className="flex-1 py-2.5 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmAction} 
                    className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-md"
                  >
                    Yes, {showConfirmModal.type === 'module' ? 'Delete' : 'Reject'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminStudyBuddy;
