import { motion } from 'framer-motion';
import { FiMap, FiClock, FiMapPin } from 'react-icons/fi';

const StudentTravelSmart = () => {
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
              <FiMap size={28} className="text-dark-blue" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Travel Smart</h1>
          </div>
          <p className="text-gray-600 text-lg ml-16">Live campus bus tracking, optimal routing, and safe travel planning.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-4 overflow-hidden"
          >
            <div className="w-full h-[500px] bg-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-500">
              <FiMap size={64} className="mb-4 opacity-50 text-dark-blue" />
              <h3 className="text-xl font-bold text-gray-700">Interactive Map Interface</h3>
              <p className="mt-2 text-gray-600">Real-time GPS tracking visualization placeholder mapping here.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 border-2 border-transparent hover:border-blue-100 transition-colors">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FiClock className="mr-2 text-dark-blue" /> Upcoming Shuttles
              </h2>
              <ul className="space-y-4">
                {['Campus North (Route A)', 'Downtown Express', 'South Residences Loop'].map((route, i) => (
                   <li key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                     <div className="flex items-center">
                        <FiMapPin className="text-dark-blue mr-3" />
                        <span className="font-medium text-gray-900">{route}</span>
                     </div>
                     <span className="font-bold text-dark-blue">{`In ${(i + 1) * 5} min`}</span>
                   </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 bg-dark-blue text-white overflow-hidden relative">
               <div className="absolute -right-4 -top-4 opacity-10">
                 <FiMap size={120} />
               </div>
               <h2 className="text-xl font-bold mb-2">Need a late night escort?</h2>
               <p className="text-blue-100 mb-4 text-sm">Request a campus security escort for safe travels after 10 PM.</p>
               <button className="w-full py-2 bg-white text-dark-blue font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                 Request SafeRide
               </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentTravelSmart;
