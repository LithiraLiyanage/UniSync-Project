import { motion } from 'framer-motion';
import { FiBookOpen, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminStudyBuddy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-indigo-900 border border-indigo-800 p-8 rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-indigo-800/50">
             <FiBookOpen size={150} />
          </div>
          <div className="relative z-10">
             <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Manage Study Resources</h1>
             <p className="text-indigo-200 text-lg">Upload, review, and organize learning materials for students.</p>
          </div>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Resource Database</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm">Add Resource</button>
           </div>
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-gray-500 text-sm">
                       <th className="p-4 font-semibold">Title</th>
                       <th className="p-4 font-semibold hidden md:table-cell">Category</th>
                       <th className="p-4 font-semibold hidden sm:table-cell">Uploaded By</th>
                       <th className="p-4 font-semibold">Status</th>
                       <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody>
                    {[
                      { title: "Intro to Algorithms PDF", cat: "Computer Science", user: "Prof. Smith", status: "Active" },
                      { title: "Calculus 101 Notes", cat: "Mathematics", user: "StudentA", status: "Pending Review" },
                      { title: "React Crash Course", cat: "Programming", user: "Admin", status: "Active" }
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                         <td className="p-4 font-medium text-gray-900">{item.title}</td>
                         <td className="p-4 text-gray-600 hidden md:table-cell">{item.cat}</td>
                         <td className="p-4 text-gray-600 hidden sm:table-cell">{item.user}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                               {item.status}
                            </span>
                         </td>
                         <td className="p-4 flex justify-end space-x-2">
                             <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><FiEdit2 size={16} /></button>
                             <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><FiTrash2 size={16} /></button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudyBuddy;
