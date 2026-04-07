import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PreviewModal = ({ isOpen, onClose, paper }) => {
  if (!isOpen || !paper) return null;

  const handleDownload = () => {
    toast.success('Downloading past paper...');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card w-full max-w-4xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col h-[90vh]"
        >
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex justify-between items-center text-white shrink-0">
            <h3 className="text-sm font-bold flex items-center gap-2 truncate">
              <FiFileText className="text-blue-400" />
              {paper.module?.moduleName} - {paper.year} Semester {paper.semester}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded font-bold text-xs transition-colors"
              >
                <FiDownload /> Download
              </button>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Body - Simulated PDF View */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto p-4 md:p-8 flex justify-center items-start">
            <div className="bg-white text-black w-full max-w-[800px] min-h-[1000px] shadow-lg rounded p-8 md:p-12 animate-fade-in pointer-events-none">
              {/* Mock PDF Content */}
              <div className="border-b-2 border-black pb-4 mb-8 text-center">
                <h1 className="text-2xl font-black uppercase mb-1">University Examination</h1>
                <h2 className="text-lg font-bold">{paper.year} - Semester {paper.semester}</h2>
              </div>
              
              <div className="mb-8">
                <div className="font-bold text-lg mb-2 flex">
                  <span className="w-32">Module Code:</span>
                  <span>{paper.module?.code}</span>
                </div>
                <div className="font-bold text-lg flex">
                  <span className="w-32">Module Name:</span>
                  <span>{paper.module?.moduleName}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-lg mb-2">Question 1. (Compulsory)</h3>
                  <p className="text-justify mb-4">(a) Explain the fundamental concepts related to this module, providing examples where appropriate. (10 marks)</p>
                  <p className="text-justify mb-4">(b) Discuss the architectural differences between standard implementations. Draw a diagram if necessary. (15 marks)</p>
                </div>
                
                <div className="w-full h-px bg-gray-300 my-8"></div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Question 2.</h3>
                  <p className="text-justify mb-4">(a) Analyze the performance characteristics under varying load conditions. (12 marks)</p>
                  <p className="text-justify mb-4">(b) Calculate the optimal configuration given the parameters discussed in class. Show all working. (13 marks)</p>
                </div>

                <div className="w-full flex flex-col gap-4 opacity-30 mt-20">
                  <div className="h-4 bg-gray-400 rounded w-full"></div>
                  <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-400 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PreviewModal;
