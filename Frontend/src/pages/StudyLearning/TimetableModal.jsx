import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiDownload, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TimetableModal = ({ isOpen, onClose, mockProgress }) => {
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);

  const generateSchedule = () => {
    setLoading(true);
    // Fake logic: sort subjects by lowest marks first to prioritize them
    const sortedSubs = [...mockProgress].sort((a, b) => a.marks - b.marks);
    
    setTimeout(() => {
      setTimetable([
        { day: 'Monday', slots: [{ time: '09:00 AM', subject: sortedSubs[0]?.module, color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' }, { time: '02:00 PM', subject: sortedSubs[1]?.module, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' }] },
        { day: 'Tuesday', slots: [{ time: '10:00 AM', subject: sortedSubs[2]?.module, color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-200' }] },
        { day: 'Wednesday', slots: [{ time: '09:00 AM', subject: sortedSubs[0]?.module, color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' }, { time: '03:00 PM', subject: sortedSubs[3]?.module, color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200' }] },
        { day: 'Thursday', slots: [{ time: '11:00 AM', subject: sortedSubs[4]?.module || 'Revision', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' }] },
        { day: 'Friday', slots: [{ time: '01:00 PM', subject: sortedSubs[1]?.module, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' }] },
      ]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (isOpen) {
      generateSchedule();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => toast.success('Timetable PDF downloaded successfully!');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 flex justify-between items-center text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiCalendar />
              AI Study Timetable
            </h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
              <FiX size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
                <p className="text-muted font-medium animate-pulse">Optmizing your schedule...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-text">
                  Based on your performance, we have prioritized weaker subjects earlier in the week.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {timetable.map((day, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 border border-border rounded-xl p-4">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-center border-b border-border pb-2">{day.day}</h4>
                      <div className="space-y-3">
                        {day.slots.map((slot, sIdx) => (
                          <div key={sIdx} className={`p-3 rounded-lg text-sm font-bold shadow-sm ${slot.color}`}>
                            <div className="text-[10px] opacity-80 uppercase tracking-wider mb-1">{slot.time}</div>
                            {slot.subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {!loading && (
            <div className="border-t border-border p-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
              <button
                onClick={generateSchedule}
                className="px-5 py-2 flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-bold transition-colors"
              >
                <FiRefreshCw /> Regenerate
              </button>
              <button
                onClick={handleDownload}
                className="px-5 py-2 flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold transition-colors shadow-md shadow-sky-500/20"
              >
                <FiDownload /> Download PDF
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TimetableModal;
