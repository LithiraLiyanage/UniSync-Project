import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiPlus } from 'react-icons/fi';

const StudentSocialEvents = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex-grow max-w-3xl"
          >
            <div className="flex items-center space-x-4 mb-2">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-indigo-100">
                <FiUsers size={28} className="text-dark-blue" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Social & Events</h1>
            </div>
            <p className="text-gray-600 text-lg ml-16">Connect with peers, join clubs, and never miss a campus event.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6 md:mt-0 flex shrink-0"
          >
             <button className="flex items-center justify-center px-6 py-4 h-max bg-dark-blue text-white rounded-xl shadow-lg hover:bg-black font-semibold transition-colors w-full md:w-auto">
               <FiPlus className="mr-2" size={20} /> Host an Event
             </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-8 border-2 border-transparent hover:border-indigo-100 transition-colors"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiCalendar className="mr-3 text-dark-blue" /> Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Spring Tech Career Fair", date: "Apr 12, 10:00 AM", loc: "Main Hall" },
                { title: "Campus Hackathon 2026", date: "Apr 20, 08:00 AM", loc: "Innovation Center" },
                { title: "Outdoor Movie Night", date: "May 5, 07:30 PM", loc: "South Lawn" },
                { title: "Student Council Meeting", date: "Tomorrow, 5:00 PM", loc: "Student Union" }
              ].map((event, i) => (
                <div key={i} className="flex flex-col bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-sm font-semibold text-indigo-600 mb-2">{event.date}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                  <div className="text-gray-500 text-sm mb-4">{event.loc}</div>
                  <button className="mt-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors w-full">
                    RSVP
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 border-2 border-transparent hover:border-indigo-100 transition-colors flex flex-col"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiUsers className="mr-3 text-dark-blue" /> Your Clubs
            </h2>
            <div className="flex-grow bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
               <FiUsers size={48} className="text-gray-300 mb-4" />
               <h3 className="text-lg font-medium text-gray-900 mb-2">Not in any clubs yet</h3>
               <p className="text-gray-500 mb-4">Discover student organizations that match your interests.</p>
               <button className="px-6 py-2 border border-dark-blue text-dark-blue rounded-lg hover:bg-blue-50 font-medium transition-colors">Browse Clubs</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentSocialEvents;
