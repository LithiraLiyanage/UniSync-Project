import { motion } from 'framer-motion';
import { FiBookOpen, FiSearch, FiMessageSquare } from 'react-icons/fi';

const StudentStudyBuddy = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-100"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
              <FiBookOpen size={28} className="text-dark-blue" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Study & Learning</h1>
          </div>
          <p className="text-gray-600 text-lg ml-16">Your personal space for smart learning and progress tracking.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-8 border-2 border-transparent hover:border-blue-100 transition-colors"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FiSearch className="mr-3 text-dark-blue" /> Study Resources
              </h2>
              <button className="px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-black transition-colors font-medium">
                Upload New
              </button>
            </div>
            <div className="h-72 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
              <FiBookOpen size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500">Upload your syllabus, notes, or PDFs to get started with your smart AI tutor.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiMessageSquare className="mr-3 text-dark-blue" /> AI Tutor
            </h2>
            <div className="flex-grow bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4 flex items-center justify-center">
              <p className="text-center text-gray-500">Select a resource to start asking questions.</p>
            </div>
            <div className="flex items-center space-x-2">
              <input type="text" disabled placeholder="Ask a question..." className="flex-grow bg-gray-100 border border-transparent rounded-lg px-4 py-3 cursor-not-allowed text-gray-500" />
              <button disabled className="bg-gray-200 text-gray-400 p-3 rounded-lg cursor-not-allowed">
                <FiMessageSquare size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentStudyBuddy;
