import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiPlus, FiSearch, FiFileText } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const defaultPapers = [
  { _id: '1', module: { code: 'CS201', moduleName: 'Data Structures' }, year: 2025, semester: 1, color: 'purple' },
  { _id: '2', module: { code: 'CS202', moduleName: 'DBMS' }, year: 2024, semester: 1, color: 'blue' },
  { _id: '3', module: { code: 'CS203', moduleName: 'OOP' }, year: 2024, semester: 2, color: 'blue' },
  { _id: '4', module: { code: 'CS204', moduleName: 'Networks' }, year: 2023, semester: 1, color: 'green' },
  { _id: '5', module: { code: 'CS205', moduleName: 'OS' }, year: 2022, semester: 2, color: 'amber' },
  { _id: '6', module: { code: 'CS206', moduleName: 'Math' }, year: 2025, semester: 1, color: 'purple' },
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
    // In actual implementation, trigger file download logic
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
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-purple/20 border-t-purple rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPapers.map((p, i) => (
            <motion.div 
              key={p._id || i}
              initial={{opacity:0, scale:0.95}} 
              animate={{opacity:1, scale:1}} 
              transition={{delay: i * 0.05}}
              className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <FiFileText size={80} />
              </div>
              
              <div className="flex gap-2 mb-4 w-full justify-center relative z-10">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md text-white ${p.color ? `bg-${p.color}` : 'bg-primary'}`}>
                  {p.year}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md text-red bg-red/10 border border-red/20">
                  Sem {p.semester}
                </span>
              </div>
              
              <div className="mb-2 text-xs font-bold text-primary-dark bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wide relative z-10">
                {p.module?.code || 'CSXXX'}
              </div>
              
              <h3 className="text-md font-bold text-text mb-6 flex-grow relative z-10">{p.module?.moduleName || 'Unknown Module'}</h3>
              
              <button 
                onClick={() => handleDownload(p._id)}
                className="w-full flex justify-center items-center py-2.5 bg-gray-50 hover:bg-purple hover:text-white dark:bg-gray-800 text-text font-bold rounded-lg border border-border transition-all shadow-sm relative z-10"
              >
                <FiDownload className="mr-2" /> Download File
              </button>
            </motion.div>
          ))}
          
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
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{y:30, scale:0.95}} animate={{y:0, scale:1}} exit={{y:30, scale:0.95}} 
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
                  <button type="button" onClick={()=>setShowUploadModal(false)} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-text rounded-lg font-medium transition-colors">Cancel</button>
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
