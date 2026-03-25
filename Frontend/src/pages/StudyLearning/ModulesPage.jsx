import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch, FiBook } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const defaultModules = [
  { _id: '1', code: 'CS201', moduleName: 'Data Structures & Algorithms', credits: 4, year: 2, sem: 1 },
  { _id: '2', code: 'CS202', moduleName: 'Database Management Systems', credits: 3, year: 2, sem: 1 },
  { _id: '3', code: 'CS203', moduleName: 'Object Oriented Programming', credits: 3, year: 2, sem: 1 },
  { _id: '4', code: 'CS204', moduleName: 'Computer Networks', credits: 3, year: 2, sem: 1 },
  { _id: '5', code: 'CS205', moduleName: 'Operating Systems', credits: 3, year: 2, sem: 1 },
  { _id: '6', code: 'CS206', moduleName: 'Discrete Mathematics', credits: 3, year: 2, sem: 1 }
];

// Darker, richer card color themes
const cardThemes = [
  {
    gradient: 'linear-gradient(135deg, #3730a3 0%, #5b21b6 100%)', // deep indigo → deep violet
    codeBg: 'rgba(255,255,255,0.15)',
    codeText: '#c7d2fe',
    yearBg: 'rgba(255,255,255,0.12)',
    yearText: '#c7d2fe',
    titleColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)',
    progressFill: '#a5b4fc',
    btnBorder: 'rgba(255,255,255,0.35)',
    btnText: '#e0e7ff',
  },
  {
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0e7490 100%)', // deep sky → deep cyan
    codeBg: 'rgba(255,255,255,0.15)',
    codeText: '#bae6fd',
    yearBg: 'rgba(255,255,255,0.12)',
    yearText: '#bae6fd',
    titleColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)',
    progressFill: '#7dd3fc',
    btnBorder: 'rgba(255,255,255,0.35)',
    btnText: '#e0f2fe',
  },
  {
    gradient: 'linear-gradient(135deg, #b45309 0%, #b91c1c 100%)', // deep amber → deep red
    codeBg: 'rgba(255,255,255,0.15)',
    codeText: '#fde68a',
    yearBg: 'rgba(255,255,255,0.12)',
    yearText: '#fde68a',
    titleColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)',
    progressFill: '#fcd34d',
    btnBorder: 'rgba(255,255,255,0.35)',
    btnText: '#fef3c7',
  },
  {
    gradient: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', // deep emerald
    codeBg: 'rgba(255,255,255,0.15)',
    codeText: '#a7f3d0',
    yearBg: 'rgba(255,255,255,0.12)',
    yearText: '#a7f3d0',
    titleColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)',
    progressFill: '#6ee7b7',
    btnBorder: 'rgba(255,255,255,0.35)',
    btnText: '#d1fae5',
  },
  {
    gradient: 'linear-gradient(135deg, #9d174d 0%, #be123c 100%)', // deep rose → deep pink
    codeBg: 'rgba(255,255,255,0.15)',
    codeText: '#fbcfe8',
    yearBg: 'rgba(255,255,255,0.12)',
    yearText: '#fbcfe8',
    titleColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)',
    progressFill: '#f9a8d4',
    btnBorder: 'rgba(255,255,255,0.35)',
    btnText: '#fce7f3',
  },
  {
    gradient: 'linear-gradient(135deg, #c2410c 0%, #b45309 100%)', // deep orange → deep amber
    codeBg: 'rgba(255,255,255,0.15)',
    codeText: '#fed7aa',
    yearBg: 'rgba(255,255,255,0.12)',
    yearText: '#fed7aa',
    titleColor: '#fff',
    mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)',
    progressFill: '#fdba74',
    btnBorder: 'rgba(255,255,255,0.35)',
    btnText: '#ffedd5',
  },
];

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ code: '', moduleName: '' });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await api.get('/api/modules');
      if (res.data.data.length === 0) {
        setModules(defaultModules);
      } else {
        setModules(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load modules');
      setModules(defaultModules);
    } finally {
      setLoading(false);
    }
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/modules', formData);
      setModules([res.data.data, ...modules]);
      toast.success('Module added successfully!');
      setShowAddModal(false);
      setFormData({ code: '', moduleName: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding module');
    }
  };

  const filteredModules = modules.filter(m =>
    m.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">

      {/* Top Bar — Search left, Add Module button right */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg w-full focus:outline-none focus:border-primary bg-card text-text"
          />
        </div>

        {/* Add Module Button — positioned on the right where the arrow points */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto flex justify-center items-center bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-sm gap-2"
        >
          <FiPlus size={18} />
          Add Module
        </button>
      </div>

      {/* Modules Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModules.map((m, i) => {
            const theme = cardThemes[i % cardThemes.length];
            const progress = m.progress || Math.floor(Math.random() * 60 + 20);
            return (
              <motion.div
                key={m._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ background: theme.gradient }}
                className="relative overflow-hidden p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex flex-col h-full"
              >
                {/* Decorative blobs */}
                <div
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none"
                />
                <div
                  style={{ background: 'rgba(0,0,0,0.08)' }}
                  className="absolute -bottom-8 -left-6 w-36 h-36 rounded-full pointer-events-none"
                />

                {/* Header Row */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span
                    style={{ background: theme.codeBg, color: theme.codeText, borderColor: 'rgba(255,255,255,0.2)' }}
                    className="font-mono text-sm px-2.5 py-1 rounded font-bold border backdrop-blur-sm"
                  >
                    {m.code}
                  </span>
                  <span
                    style={{ background: theme.yearBg, color: theme.yearText, borderColor: 'rgba(255,255,255,0.15)' }}
                    className="text-xs font-bold px-2.5 py-1 rounded border backdrop-blur-sm"
                  >
                    Y{m.year || 2} S{m.sem || 1}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{ color: theme.titleColor }}
                  className="text-lg font-bold mb-1 line-clamp-2 relative z-10"
                >
                  {m.moduleName}
                </h3>

                {/* Progress label */}
                <p
                  style={{ color: theme.mutedColor }}
                  className="text-sm mb-3 flex-grow font-medium relative z-10"
                >
                  Progress: {progress}%
                </p>

                {/* Progress Bar */}
                <div
                  style={{ background: theme.progressBg }}
                  className="w-full rounded-full h-1.5 mb-4 relative z-10"
                >
                  <div
                    style={{ width: `${progress}%`, background: theme.progressFill }}
                    className="h-1.5 rounded-full transition-all duration-500"
                  />
                </div>

                {/* View Details Button */}
                <button
                  style={{ borderColor: theme.btnBorder, color: theme.btnText }}
                  className="w-full py-2.5 text-sm font-bold border rounded-lg transition-colors relative z-10 hover:bg-white/10 backdrop-blur-sm"
                >
                  View Details
                </button>
              </motion.div>
            );
          })}

          {filteredModules.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted">
              <FiSearch size={48} className="mx-auto mb-4 opacity-20" />
              <p>No modules found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}

      {/* Add Module Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.95 }}
              className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-text">Add New Module</h2>
              <form onSubmit={handleAddModule} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Module Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. CS201"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-primary text-text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Module Name</label>
                  <input
                    type="text"
                    required
                    value={formData.moduleName}
                    onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
                    placeholder="e.g. Data Structures"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-primary text-text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Year</label>
                    <input type="number" defaultValue={2} className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-primary text-text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Semester</label>
                    <input type="number" defaultValue={1} className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-primary text-text" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-text rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-sm transition-colors"
                  >
                    Add Module
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModulesPage;
