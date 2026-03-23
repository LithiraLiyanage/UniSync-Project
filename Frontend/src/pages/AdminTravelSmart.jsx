import { motion } from 'framer-motion';
import { FiMap, FiArrowLeft, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminTravelSmart = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-blue-900 border border-blue-800 p-8 rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-blue-800/50">
             <FiMap size={150} />
          </div>
          <div className="relative z-10">
             <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Travel & Fleet Management</h1>
             <p className="text-blue-200 text-lg">Update shuttle schedules, report delays, and manage campus routes.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FiMap className="mr-2 text-indigo-600" /> Active Routes
                 </h2>
                 <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">Manage Fleet</button>
              </div>
              <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <span className="text-gray-500 font-medium">Interactive Fleet Map View</span>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FiClock className="mr-2 text-indigo-600" /> Dispatch Controls
                 </h2>
                 <div className="space-y-3">
                    <div className="p-3 bg-gray-50 border border-gray-100 rounded">
                       <p className="font-semibold text-gray-900">Campus North Loop</p>
                       <p className="text-sm text-green-600 font-medium mb-2">Status: On Time</p>
                       <div className="flex space-x-2">
                           <button className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs py-1 rounded hover:bg-gray-50">Delay 5m</button>
                           <button className="flex-1 bg-white border border-gray-300 text-gray-700 text-xs py-1 rounded hover:bg-gray-50">Delay 15m</button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                 <h2 className="text-lg font-bold text-red-900 mb-2 flex items-center">
                    <FiAlertTriangle className="mr-2" /> Global Alerts
                 </h2>
                 <p className="text-sm text-red-700 mb-4">Broadcast an emergency message or travel delay to all students.</p>
                 <button className="w-full bg-red-600 text-white font-bold py-2 rounded shadow hover:bg-red-700 transition">Broadcast Alert</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTravelSmart;
