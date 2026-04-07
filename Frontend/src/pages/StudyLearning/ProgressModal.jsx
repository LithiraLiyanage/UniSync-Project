import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiTarget, FiAlertCircle } from 'react-icons/fi';

const ProgressModal = ({ isOpen, onClose, mockProgress }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200); // Simulate AI analysis
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalMarks = mockProgress.reduce((acc, curr) => acc + curr.marks, 0);
  const avg = Math.round(totalMarks / mockProgress.length || 0);

  const strong = mockProgress.filter((m) => m.marks >= 75);
  const weak = mockProgress.filter((m) => m.marks < 50);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-primary px-6 py-4 flex justify-between items-center text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiTarget />
              AI Progress Analysis
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                <p className="text-muted font-medium animate-pulse">
                  Analyzing your performance data...
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Score Ring */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="12"
                        stroke="currentColor"
                        fill="transparent"
                        r="70"
                        cx="80"
                        cy="80"
                      />
                      <motion.circle
                        initial={{ strokeDasharray: '0 440' }}
                        animate={{ strokeDasharray: `${(avg / 100) * 440} 440` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="text-violet-500 drop-shadow-md"
                        strokeWidth="12"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="70"
                        cx="80"
                        cy="80"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-black text-text">{avg}%</span>
                      <span className="text-xs font-bold text-muted uppercase">Overall</span>
                    </div>
                  </div>
                </div>

                {/* Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 p-5 rounded-xl">
                    <h4 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 mb-3">
                      <FiCheckCircle /> Keep it up!
                    </h4>
                    <p className="text-sm text-text mb-2">
                      You are performing exceptionally well in:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {strong.length > 0 ? (
                        strong.map(s => (
                          <span key={s.id} className="bg-emerald-200 dark:bg-emerald-800/50 text-emerald-900 dark:text-emerald-100 px-2 py-1 rounded text-xs font-bold uppercase">
                            {s.module} ({s.marks}%)
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted">Keep pushing to build your strengths!</span>
                      )}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 p-5 rounded-xl">
                    <h4 className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-400 mb-3">
                      <FiAlertCircle /> Areas to Improve
                    </h4>
                    <p className="text-sm text-text mb-2">
                      Focus more study time on these subjects:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {weak.length > 0 ? (
                        weak.map(w => (
                          <span key={w.id} className="bg-rose-200 dark:bg-rose-800/50 text-rose-900 dark:text-rose-100 px-2 py-1 rounded text-xs font-bold uppercase">
                            {w.module} ({w.marks}%)
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted">Great job, no critical weak areas!</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {!loading && (
            <div className="border-t border-border p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-bold transition-colors"
              >
                Close Insights
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProgressModal;
