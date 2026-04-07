import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiAward, FiBook, FiExternalLink } from 'react-icons/fi';

const ModuleDetailsModal = ({ isOpen, onClose, module }) => {
  if (!isOpen || !module) return null;

  // Mock details
  const details = {
    lecturer: 'Dr. Alan Turing',
    email: 'alan.turing@university.edu',
    description: `This module covers the advanced topics of ${module.moduleName}. Students will learn the theoretical foundations and practical applications required to excel in this subject. The coursework includes bi-weekly assignments, a mid-term project, and a final written examination.`,
    resources: [
      { title: 'Lecture Slides - Week 1 to 5', type: 'PDF' },
      { title: 'Recommended Reading: Chapter 4 & 5', type: 'Link' },
      { title: 'Past Paper 2024 - Semester 1', type: 'PDF' }
    ]
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="relative px-6 py-8 sm:px-8 bg-gradient-to-br from-indigo-600 to-violet-800 text-white overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors backdrop-blur-sm"
            >
              <FiX size={20} />
            </button>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-lg backdrop-blur-md">
                  {module.code}
                </span>
                <span className="px-3 py-1 bg-black/20 text-white text-xs font-bold rounded-lg backdrop-blur-md">
                  Year {module.year} • Sem {module.sem}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2 leading-tight">
                {module.moduleName}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {/* Lecturer Info */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FiUser size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Lecturer</h4>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{details.lecturer}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{details.email}</p>
                </div>
              </div>

              {/* Credits */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <FiAward size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Credits</h4>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{module.credits} Credits</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Core Module</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FiBook className="text-indigo-500" /> Module Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50">
                {details.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FiExternalLink className="text-indigo-500" /> Related Resources
              </h3>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {details.resources.map((res, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 sm:px-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {res.title}
                      </span>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                        {res.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModuleDetailsModal;
