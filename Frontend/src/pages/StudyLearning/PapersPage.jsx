import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiPlus, FiSearch, FiFileText } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const COLOR_THEMES = [
  {
    badge: 'bg-violet-500',
    codeBg: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    btnHover: 'hover:bg-violet-500 hover:border-violet-500',
    iconColor: 'text-violet-400',
    accent: 'before:bg-violet-500',
  },
  {
    badge: 'bg-sky-500',
    codeBg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    btnHover: 'hover:bg-sky-500 hover:border-sky-500',
    iconColor: 'text-sky-400',
    accent: 'before:bg-sky-500',
  },
  {
    badge: 'bg-emerald-500',
    codeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    btnHover: 'hover:bg-emerald-500 hover:border-emerald-500',
    iconColor: 'text-emerald-400',
    accent: 'before:bg-emerald-500',
  },
  {
    badge: 'bg-rose-500',
    codeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    btnHover: 'hover:bg-rose-500 hover:border-rose-500',
    iconColor: 'text-rose-400',
    accent: 'before:bg-rose-500',
  },
  {
    badge: 'bg-amber-500',
    codeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    btnHover: 'hover:bg-amber-500 hover:border-amber-500',
    iconColor: 'text-amber-400',
    accent: 'before:bg-amber-500',
  },
  {
    badge: 'bg-fuchsia-500',
    codeBg: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
    btnHover: 'hover:bg-fuchsia-500 hover:border-fuchsia-500',
    iconColor: 'text-fuchsia-400',
    accent: 'before:bg-fuchsia-500',
  },
  {
    badge: 'bg-teal-500',
    codeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    btnHover: 'hover:bg-teal-500 hover:border-teal-500',
    iconColor: 'text-teal-400',
    accent: 'before:bg-teal-500',
  },
  {
    badge: 'bg-orange-500',
    codeBg: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    btnHover: 'hover:bg-orange-500 hover:border-orange-500',
    iconColor: 'text-orange-400',
    accent: 'before:bg-orange-500',
  },
];

const defaultPapers = [
  { _id: '1', module: { code: 'CS201', moduleName: 'Data Structures' }, year: 2025, semester: 1 },
  { _id: '2', module: { code: 'CS202', moduleName: 'DBMS' }, year: 2024, semester: 1 },
  { _id: '3', module: { code: 'CS203', moduleName: 'OOP' }, year: 2024, semester: 2 },
  { _id: '4', module: { code: 'CS204', moduleName: 'Networks' }, year: 2023, semester: 1 },
  { _id: '5', module: { code: 'CS205', moduleName: 'OS' }, year: 2022, semester: 2 },
  { _id: '6', module: { code: 'CS206', moduleName: 'Math' }, year: 2025, semester: 1 },
];

const PapersPage = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await api.get('/api/papers');
      if (res.data.data.length === 0) {
        setPapers(defaultPapers);
      } else {
        setPapers(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load past papers');
      setPapers(defaultPapers);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (paperId) => {
    toast.success('Downloading past paper...');
  };

  const filteredPapers = papers.filter(p => {
    const modName = p.module?.moduleName || '';
    const modCode = p.module?.code || '';
    const search = searchTerm.toLowerCase();
    return modName.toLowerCase().includes(search) ||
      modCode.toLowerCase().includes(search) ||
      p.year.toString().includes(search);
  });

  return (
    <div className="space-y-6 animate-fade-in pb-10">

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by module or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg w-full focus:outline-none focus:border-primary bg-card text-text"
          />
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="w-full sm:w-auto flex justify-center items-center bg-purple text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-dark transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" /> Upload Paper
        </button>
      </div>

      {/* Papers Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-purple/20 border-t-purple rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPapers.map((p, i) => {
            const theme = COLOR_THEMES[i % COLOR_THEMES.length];
            return (
              <motion.div
                key={p._id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center h-full relative overflow-hidden"
              >
                {/* Colored top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${theme.badge}`} />

                {/* Faint background icon */}
                <div className={`absolute top-0 right-0 p-3 opacity-10 ${theme.iconColor}`}>
                  <FiFileText size={80} />
                </div>

                {/* Year + Semester badges */}
                <div className="flex gap-2 mb-4 w-full justify-center relative z-10 mt-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md text-white ${theme.badge}`}>
                    {p.year}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md text-red bg-red/10 border border-red/20">
                    Sem {p.semester}
                  </span>
                </div>

                {/* Module code */}
                <div className={`mb-2 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide relative z-10 ${theme.codeBg}`}>
                  {p.module?.code || 'CSXXX'}
                </div>

                {/* Module name */}
                <h3 className="text-md font-bold text-text mb-6 flex-grow relative z-10">
                  {p.module?.moduleName || 'Unknown Module'}
                </h3>

                {/* Download button */}
                <button
                  onClick={() => handleDownload(p._id)}
                  className={`w-full flex justify-center items-center py-2.5 font-bold rounded-lg border transition-all shadow-sm relative z-10 text-white ${theme.badge} border-transparent hover:opacity-90`}
                >
                  <FiDownload className="mr-2" /> Download File
                </button>
              </motion.div>
            );
          })}

          {filteredPapers.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted">
              <FiFileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>No past papers found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}

      {/* Upload Paper Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.95 }}
              className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-text">Upload Past Paper</h2>
              <form onSubmit={(e) => { e.preventDefault(); toast.success('Upload started!'); setShowUploadModal(false); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Module</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-purple text-text" defaultValue="">
                    <option value="" disabled>Select Module</option>
                    <option value="CS201">CS201 - Data Structures</option>
                    <option value="CS202">CS202 - DBMS</option>
                    <option value="CS203">CS203 - OOP</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Year</label>
                    <input type="number" defaultValue={2026} className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-purple text-text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Semester</label>
                    <input type="number" defaultValue={1} className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-purple text-text" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">PDF File</label>
                  <input type="file" accept="application/pdf" className="w-full px-4 py-2 border border-border rounded-lg bg-bg focus:outline-none focus:border-purple text-text text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple/10 file:text-purple hover:file:bg-purple/20 transition-colors" />
                </div>
                <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-border">
                  <button type="button" onClick={() => setShowUploadModal(false)} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-text rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-purple text-white rounded-lg font-bold hover:bg-purple-dark shadow-sm transition-colors">Upload</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PapersPage;
