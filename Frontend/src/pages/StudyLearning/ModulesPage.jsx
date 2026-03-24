import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch } from 'react-icons/fi';
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

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // New module form state
  const [formData, setFormData] = useState({ code: '', moduleName: '' });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await api.get('/api/modules');
      // If no modules exist on backend, use defaults to populate UI
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
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
        <button 
          onClick={() => setShowAddModal(true)} 
          className="w-full sm:w-auto flex justify-center items-center bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" /> Add Module
        </button>
      </div>

      {/* Modules Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModules.map((m, i) => (
            <motion.div 
              key={m._id || i}
              initial={{opacity:0, y: 10}} 
              animate={{opacity:1, y:0}} 
              transition={{delay: i * 0.05}}
              className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-primary/40 group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/10 text-primary-dark font-mono text-sm px-2.5 py-1 rounded font-bold border border-primary/20">{m.code}</span>
                <span className="text-xs font-bold text-muted bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded border border-border">Y{m.year || 2} S{m.sem || 1}</span>
              </div>
              <h3 className="text-lg font-bold text-text mb-2 line-clamp-2">{m.moduleName}</h3>
              <p className="text-sm text-muted mb-5 flex-grow font-medium">Progress: {m.progress || 0}%</p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${m.progress || Math.floor(Math.random() * 60 + 20)}%` }}></div>
              </div>

              <button className="w-full py-2.5 text-primary text-sm font-bold border border-primary/20 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                View Details
              </button>
            </motion.div>
          ))}
          
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
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{y:30, scale:0.95}} animate={{y:0, scale:1}} exit={{y:30, scale:0.95}} 
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
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, moduleName: e.target.value})}
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
                  <button type="button" onClick={()=>setShowAddModal(false)} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-text rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-sm transition-colors">Add Module</button>
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
