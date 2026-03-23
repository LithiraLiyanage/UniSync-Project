import { motion } from 'framer-motion';
import { FiDollarSign, FiArrowLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminEarnSkills = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-slate-800/50">
             <FiDollarSign size={150} />
          </div>
          <div className="relative z-10">
             <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Gig Approvals & Skills</h1>
             <p className="text-slate-300 text-lg">Review and approve campus jobs, freelance gigs, and reported skills.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Pending Gigs</h2>
              <div className="space-y-4">
                 {[1, 2].map((item) => (
                    <div key={item} className="p-4 border border-gray-100 rounded-lg shadow-sm">
                       <h3 className="font-bold text-gray-900">Research Assistant</h3>
                       <p className="text-sm text-gray-500 mb-3">Submitted by Prof. Davis • $15/hr</p>
                       <div className="flex space-x-3">
                          <button className="flex-1 bg-green-50 text-green-700 border border-green-200 py-2 rounded-md font-medium flex items-center justify-center hover:bg-green-100 transition">
                             <FiCheckCircle className="mr-2" /> Approve
                          </button>
                          <button className="flex-1 bg-red-50 text-red-700 border border-red-200 py-2 rounded-md font-medium flex items-center justify-center hover:bg-red-100 transition">
                             <FiXCircle className="mr-2" /> Reject
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Recent Approvals</h2>
              <div className="space-y-4">
                 {[1, 2, 3].map((item) => (
                    <div key={item} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg">
                       <div>
                          <p className="font-medium text-gray-900">Library Front Desk</p>
                          <p className="text-xs text-green-600 font-semibold">Approved by you</p>
                       </div>
                       <button className="text-indigo-600 text-sm font-medium hover:underline">View</button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEarnSkills;
