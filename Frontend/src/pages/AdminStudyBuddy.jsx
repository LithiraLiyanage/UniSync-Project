import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiPlus, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

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
  const [activeTab, setActiveTab] = useState('modules');
  const [modules, setModules] = useState(initialModules);
  const [papers, setPapers] = useState(initialPapers);
  const [showModal, setShowModal] = useState(false);

  const approvePaper = (id) => {
    setPapers(papers.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    toast.success('Paper approved');
  };

  const rejectPaper = (id) => {
    setPapers(papers.filter(p => p.id !== id));
    toast.error('Paper rejected');
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiBookOpen className="mr-3 text-primary" /> Manage Study & Learning</h1>
            <p className="mt-1 text-muted">Manage academic modules and approve student uploads.</p>
          </motion.div>
          <div className="flex bg-card p-1 rounded-lg border border-border shadow-sm">
            <button onClick={() => setActiveTab('modules')} className={`px-4 py-2 text-sm font-semibold rounded-md ${activeTab === 'modules' ? 'bg-primary text-white' : 'text-muted'}`}>Modules</button>
            <button onClick={() => setActiveTab('papers')} className={`px-4 py-2 text-sm font-semibold rounded-md ${activeTab === 'papers' ? 'bg-primary text-white' : 'text-muted'}`}>Past Papers</button>
          </div>
        </div>

        {/* Modules Content */}
        {activeTab === 'modules' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold">Academic Modules</h3>
              <button onClick={() => setShowModal(true)} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark">
                <FiPlus className="mr-2" /> Add Module
              </button>
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Module Name</th>
                    <th>Credits</th>
                    <th>Enrolled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map(m => (
                    <tr key={m.id}>
                      <td className="font-bold text-primary">{m.code}</td>
                      <td className="font-semibold text-text">{m.name}</td>
                      <td>{m.credits}</td>
                      <td>{m.students} Students</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FiEdit/></button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Papers Content */}
        {activeTab === 'papers' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-4">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Document Title</th>
                    <th>Uploaded By</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {papers.map(p => (
                    <tr key={p.id}>
                      <td className="font-semibold text-text">{p.title}</td>
                      <td className="font-mono text-muted">{p.uploadedBy}</td>
                      <td>{p.date}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === 'Pending' ? 'tbl-amber' : 'tbl-green'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {p.status === 'Pending' && (
                            <>
                              <button onClick={() => approvePaper(p.id)} className="p-2 text-green bg-green/10 hover:bg-green/20 rounded-lg"><FiCheck/></button>
                              <button onClick={() => rejectPaper(p.id)} className="p-2 text-red bg-red/10 hover:bg-red/20 rounded-lg"><FiX/></button>
                            </>
                          )}
                          <button className="p-2 text-primary hover:bg-primary/10 rounded-lg font-bold text-sm">Review</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {papers.length === 0 && <tr><td colSpan="5" className="text-center py-6 text-muted font-semibold">No papers to display.</td></tr>}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Add Module Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <h2 className="text-2xl font-bold mb-4">Add Course Module</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Module Code (e.g. CS301)" className="w-full px-4 py-2 border border-border rounded-lg" />
                  <input type="text" placeholder="Module Name" className="w-full px-4 py-2 border border-border rounded-lg" />
                  <input type="number" placeholder="Credits" className="w-full px-4 py-2 border border-border rounded-lg" />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 text-muted font-medium hover:text-text">Cancel</button>
                  <button onClick={() => {toast.success('Module added'); setShowModal(false)}} className="px-5 py-2 bg-primary text-white rounded-lg font-bold">Add Module</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminStudyBuddy;
