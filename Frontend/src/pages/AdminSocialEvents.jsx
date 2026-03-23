import { motion } from 'framer-motion';
import { FiUsers, FiArrowLeft, FiCalendar, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminSocialEvents = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-indigo-950 border border-indigo-900 p-8 rounded-2xl shadow-lg relative overflow-hidden flex justify-between items-center"
        >
          <div className="relative z-10 w-full md:w-2/3">
             <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Social & Event Control</h1>
             <p className="text-indigo-200 text-lg">Approve student events, manage club creation, and moderate social hubs.</p>
          </div>
          <div className="hidden md:block relative z-10">
             <button className="bg-white text-indigo-900 font-bold px-6 py-3 rounded-xl shadow hover:bg-indigo-50 transition">
                Create Official Event
             </button>
          </div>
          <div className="absolute -right-10 -top-10 text-indigo-900/50">
             <FiUsers size={150} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center">
                 <FiCalendar className="text-indigo-600 mr-3" size={24} />
                 <h2 className="text-xl font-bold text-gray-900">Event Requests</h2>
              </div>
              <div className="p-0">
                 <ul>
                    {[
                      { title: "Esports Tournament", date: "Oct 15", org: "Gaming Club" },
                      { title: "Pottery Workshop", date: "Oct 22", org: "Art Society" }
                    ].map((req, i) => (
                      <li key={i} className="p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition flex justify-between items-center">
                         <div>
                            <h3 className="font-bold text-gray-900 text-lg">{req.title}</h3>
                            <p className="text-sm text-gray-500">{req.date} • {req.org}</p>
                         </div>
                         <div className="flex space-x-2">
                             <button className="p-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition"><FiCheck size={18} /></button>
                         </div>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center">
                 <FiUsers className="text-indigo-600 mr-3" size={24} />
                 <h2 className="text-xl font-bold text-gray-900">Registered Clubs</h2>
              </div>
              <div className="p-6 flex-grow flex flex-col items-center justify-center bg-gray-50/50">
                 <p className="text-gray-500 mb-4 text-center">Manage the permissions and funding of 48 active student organizations.</p>
                 <button className="bg-white border border-gray-300 text-gray-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm">
                    View Organization Directory
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSocialEvents;
