import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiPlus, FiEdit, FiTrash2, FiCheck, FiX, FiLayers, FiFileText, FiUsers, FiTrendingUp, FiActivity, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

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

const AdminStudyBuddy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modules, setModules] = useState(initialModules);
  const [papers, setPapers] = useState(initialPapers);
  const [showModal, setShowModal] = useState(false);
  
  // Validation States
  const [newModule, setNewModule] = useState({ code: '', name: '', credits: '' });
  const [formErrors, setFormErrors] = useState({});

  const approvePaper = (id) => {
    setPapers(papers.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    toast.success('Paper approved successfully');
  };

  const rejectPaper = (id) => {
    setPapers(papers.filter(p => p.id !== id));
    toast.success('Paper rejected and removed');
  };

  const deleteModule = (id) => {
    setModules(modules.filter(m => m.id !== id));
    toast.success('Module successfully deleted');
  }

  const handleAddModule = () => {
    let errors = {};
    if (!newModule.code.trim()) errors.code = 'Module Code is required';
    if (!newModule.name.trim()) errors.name = 'Module Name is required';
    if (!newModule.credits || newModule.credits <= 0) errors.credits = 'Valid Credits are required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Error: Missing or invalid fields');
      return;
    }

    setModules([...modules, { id: Date.now(), ...newModule, students: 0 }]);
    setNewModule({ code: '', name: '', credits: '' });
    setFormErrors({});
    setShowModal(false);
    toast.success('Module added successfully');
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Student Activity',
      data: [120, 190, 300, 250, 280, 150, 210],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { color: 'transparent' } },
    }
  };

  const statCards = [
    { title: 'Total Modules', value: modules.length.toString(), icon: FiLayers, bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30' },
    { title: 'Total Resources', value: '1,204', icon: FiBookOpen, bg: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30' },
    { title: 'Total Papers', value: papers.length.toString(), icon: FiFileText, bg: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30' },
    { title: 'Active Students', value: '2,845', icon: FiUsers, bg: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30' },
  ];

  const managementCards = [
    { title: 'Manage Modules', tab: 'modules', color: 'text-indigo-600' },
    { title: 'Manage Resources', tab: 'resources', color: 'text-teal-600' },
    { title: 'Manage Past Papers', tab: 'papers', color: 'text-amber-600' },
    { title: 'Monitor Progress', tab: 'progress', color: 'text-pink-600' },
  ];

  return (
    <div className="flex-1 pt-28 pb-12 px-6 md:px-8 overflow-y-auto w-full transition-colors duration-300 relative bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center text-[var(--text)]">
              Study & Learning - Admin Dashboard
            </h1>
            <p className="mt-1 text-[var(--muted)]">Manage academic system and overview.</p>
          </motion.div>
          
          <div className="flex bg-[var(--card)] p-1.5 rounded-lg border border-[var(--border)] shadow-sm backdrop-blur-xl text-sm font-semibold">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white shadow-md' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[#6366f1]'}`}>Overview</button>
            <button onClick={() => setActiveTab('modules')} className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'modules' ? 'bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white shadow-md' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[#6366f1]'}`}>Modules</button>
            <button onClick={() => setActiveTab('papers')} className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'papers' ? 'bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white shadow-md' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[#6366f1]'}`}>Past Papers</button>
          </div>
        </div>

        {/* --- Dashboard Content Sub-View --- */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statCards.map((s, i) => (
                <div key={i} className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] backdrop-blur-xl shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${s.bg}`}>
                    <s.icon size={28} />
                  </div>
                  <div>
                    <p className="text-[var(--muted)] text-xs font-bold uppercase tracking-wider mb-1">{s.title}</p>
                    <h3 className="text-3xl font-extrabold text-[var(--text)]">{s.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Pane */}
              <div className="col-span-2 bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] backdrop-blur-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <h3 className="text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2"><FiTrendingUp className="text-[#6366f1]" /> Student Activity</h3>
                <div className="flex-1 relative w-full min-h-[250px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Management Actions */}
              <div className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] shadow-sm backdrop-blur-xl hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1">
                <h3 className="text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2"><FiLayers className="text-[#6366f1]" /> Quick Actions</h3>
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  {managementCards.map((m, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveTab(m.tab === 'progress' || m.tab === 'resources' ? 'dashboard' : m.tab)}
                      className={`flex items-center justify-between p-4 rounded-xl border border-[var(--border)] group cursor-pointer hover:bg-[var(--hover)] transition-all duration-200 hover:-translate-y-0.5 shadow-sm active:scale-95`}
                    >
                      <span className="font-semibold text-[var(--text)] transition-colors">{m.title}</span>
                      <FiArrowRight className={`transform group-hover:translate-x-1 transition-transform ${m.color}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] shadow-sm backdrop-blur-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2"><FiActivity className="text-[#6366f1]" /> Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { title: 'New Module Added: AI Engineering', time: '10 mins ago', icon: FiBookOpen, color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30' },
                  { title: 'Past Paper Approved: CS202', time: '1 hour ago', icon: FiCheck, color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
                  { title: 'New Resource Uploaded', time: '3 hours ago', icon: FiLayers, color: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                    <div className={`p-3 rounded-full ${act.color}`}>
                      <act.icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--text)]">{act.title}</p>
                      <p className="text-xs font-semibold text-[var(--muted)]">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* --- Modules Content --- */}
        {activeTab === 'modules' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
            <div className="flex justify-between items-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] shadow-sm backdrop-blur-xl">
              <h3 className="text-xl font-bold text-[var(--text)]">Academic Modules</h3>
              <button 
                onClick={() => setShowModal(true)} 
                className="flex items-center bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white px-5 py-2.5 rounded-lg font-bold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                <FiPlus className="mr-2" /> Add Module
              </button>
            </div>
            
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm backdrop-blur-xl overflow-hidden text-[var(--text)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[var(--hover)] border-b border-[var(--border)]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Code</th>
                    <th className="px-6 py-4 font-semibold">Module Name</th>
                    <th className="px-6 py-4 font-semibold">Credits</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {modules.map((m, idx) => (
                    <tr key={m.id} className={`hover:bg-[var(--hover)] transition-colors duration-200 ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[var(--hover)]/30'}`}>
                      <td className="px-6 py-4 font-bold text-[#6366f1]">{m.code}</td>
                      <td className="px-6 py-4 font-semibold text-[var(--text)]">{m.name}</td>
                      <td className="px-6 py-4 text-[var(--muted)] font-medium">{m.credits}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#22c55e]/10 text-[#22c55e]">Active</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button className="p-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 rounded-lg transition-transform hover:scale-110 active:scale-95"><FiEdit size={16} /></button>
                          <button onClick={() => deleteModule(m.id)} className="p-2 text-[#ef4444] bg-[#ef4444]/10 hover:bg-[#ef4444]/20 rounded-lg transition-transform hover:scale-110 active:scale-95"><FiTrash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {modules.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-10 text-[var(--muted)] font-semibold">No modules available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* --- Papers Content --- */}
        {activeTab === 'papers' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
            <div className="flex justify-between items-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)] shadow-sm backdrop-blur-xl">
              <h3 className="text-xl font-bold text-[var(--text)]">Past Papers Review</h3>
            </div>
            
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm backdrop-blur-xl overflow-hidden text-[var(--text)] mt-4">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[var(--hover)] border-b border-[var(--border)]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Document Title</th>
                    <th className="px-6 py-4 font-semibold">Uploaded By</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {papers.map((p, idx) => (
                    <tr key={p.id} className={`hover:bg-[var(--hover)] transition-colors duration-200 ${idx % 2 === 0 ? 'bg-transparent' : 'bg-[var(--hover)]/30'}`}>
                      <td className="px-6 py-4 font-semibold text-[var(--text)]">{p.title}</td>
                      <td className="px-6 py-4 font-mono text-[var(--muted)] text-sm">{p.uploadedBy}</td>
                      <td className="px-6 py-4 text-[var(--muted)] font-medium">{p.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'Pending' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#22c55e]/10 text-[#22c55e]'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {p.status === 'Pending' && (
                            <>
                              <button onClick={() => approvePaper(p.id)} className="p-2 text-[#22c55e] bg-[#22c55e]/10 hover:bg-[#22c55e]/20 rounded-lg transition-transform hover:scale-110 active:scale-95"><FiCheck size={16} /></button>
                              <button onClick={() => rejectPaper(p.id)} className="p-2 text-[#ef4444] bg-[#ef4444]/10 hover:bg-[#ef4444]/20 rounded-lg transition-transform hover:scale-110 active:scale-95"><FiX size={16} /></button>
                            </>
                          )}
                          <button className="px-3 py-1.5 text-[#6366f1] border border-[#6366f1] hover:bg-[#6366f1]/10 rounded-lg font-bold text-sm transition-colors active:scale-95">Review</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {papers.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-10 text-[var(--muted)] font-semibold">No papers uploaded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* --- Add Module Modal --- */}
        <AnimatePresence>
          {showModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-[var(--card)] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-6 text-[var(--text)]">Add Course Module</h2>
                
                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Module Code (e.g. CS301)" 
                      value={newModule.code}
                      onChange={(e) => setNewModule({...newModule, code: e.target.value})}
                      className={`w-full px-4 py-3 border bg-[var(--bg)] text-[var(--text)] rounded-xl outline-none transition-colors ${formErrors.code ? 'border-[#ef4444] shadow-[0_0_0_2px_rgba(239,68,68,0.2)]' : 'border-[var(--border)] focus:border-[#6366f1]'}`}
                    />
                    {formErrors.code && <p className="text-[#ef4444] text-xs font-semibold mt-1.5 ml-1">{formErrors.code}</p>}
                  </div>
                  
                  <div>
                    <input 
                      type="text" 
                      placeholder="Module Name" 
                      value={newModule.name}
                      onChange={(e) => setNewModule({...newModule, name: e.target.value})}
                      className={`w-full px-4 py-3 border bg-[var(--bg)] text-[var(--text)] rounded-xl outline-none transition-colors ${formErrors.name ? 'border-[#ef4444] shadow-[0_0_0_2px_rgba(239,68,68,0.2)]' : 'border-[var(--border)] focus:border-[#6366f1]'}`}
                    />
                    {formErrors.name && <p className="text-[#ef4444] text-xs font-semibold mt-1.5 ml-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <input 
                      type="number" 
                      placeholder="Credits" 
                      value={newModule.credits}
                      onChange={(e) => setNewModule({...newModule, credits: e.target.value})}
                      className={`w-full px-4 py-3 border bg-[var(--bg)] text-[var(--text)] rounded-xl outline-none transition-colors ${formErrors.credits ? 'border-[#ef4444] shadow-[0_0_0_2px_rgba(239,68,68,0.2)]' : 'border-[var(--border)] focus:border-[#6366f1]'}`}
                    />
                    {formErrors.credits && <p className="text-[#ef4444] text-xs font-semibold mt-1.5 ml-1">{formErrors.credits}</p>}
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button 
                    onClick={() => { setShowModal(false); setFormErrors({}); }} 
                    className="px-5 py-2.5 text-[var(--muted)] font-medium hover:text-[var(--text)] transition-colors active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddModule} 
                    className="px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg active:scale-95 hover:-translate-y-0.5"
                  >
                    Add Module
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
