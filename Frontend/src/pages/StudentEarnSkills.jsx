import { motion } from 'framer-motion';
import { FiDollarSign, FiBriefcase, FiAward } from 'react-icons/fi';

const StudentEarnSkills = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-green-50/50 p-6 rounded-2xl border border-green-100"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-green-100">
              <FiDollarSign size={28} className="text-dark-blue" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Earn & Skills</h1>
          </div>
          <p className="text-gray-600 text-lg ml-16">Find campus gigs, build your portfolio, and earn while learning.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 border-2 border-transparent hover:border-green-100 transition-colors"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiBriefcase className="mr-3 text-dark-blue" /> Available Gigs
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">Graphic Design Volunteer</h3>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">$20 / Task</span>
                  </div>
                  <p className="text-gray-600 mb-4 sm:text-sm">Help design flyers for the upcoming Spring festival. Remote work available.</p>
                  <button className="text-dark-blue font-semibold hover:underline">Apply Now &rarr;</button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 border-2 border-transparent hover:border-green-100 transition-colors flex flex-col"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiAward className="mr-3 text-dark-blue" /> Your Skills
            </h2>
            <div className="flex-grow bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
               <FiAward size={48} className="text-gray-300 mb-4" />
               <h3 className="text-lg font-medium text-gray-900 mb-2">Build your Profile</h3>
               <p className="text-gray-500 mb-4">Complete gigs to earn badges and showcase your practical skills to future employers.</p>
               <button className="px-6 py-2 bg-dark-blue text-white rounded-lg hover:bg-black font-medium transition-colors">Setup Profile</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentEarnSkills;
