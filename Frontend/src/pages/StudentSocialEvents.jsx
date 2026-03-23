import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiCalendar, FiMapPin, FiClock, FiPlus, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const eventsList = [
  { id: 1, title: 'Annual Tech Symposium', category: 'Academic', date: 'Oct 15', time: '09:00 AM', location: 'Main Auditorium', rsvp: true },
  { id: 2, title: 'Inter-Batch Cricket Match', category: 'Sports', date: 'Oct 18', time: '03:30 PM', location: 'University Ground', rsvp: false },
  { id: 3, title: 'Photography Club Meetup', category: 'Clubs', date: 'Oct 20', time: '05:00 PM', location: 'Room 402', rsvp: false },
  { id: 4, title: 'AI Ethics Guest Lecture', category: 'Academic', date: 'Oct 22', time: '10:00 AM', location: 'Virtual (Zoom)', rsvp: true },
  { id: 5, title: 'Halloween Campus Party', category: 'Social', date: 'Oct 31', time: '07:00 PM', location: 'Student Center', rsvp: false }
];

const StudentSocialEvents = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState(eventsList);
  const [myEventsTab, setMyEventsTab] = useState(false);

  const tabs = ['All', 'Academic', 'Sports', 'Social', 'Clubs'];

  const filteredEvents = events.filter(e => {
    if (myEventsTab && !e.rsvp) return false;
    if (activeTab === 'All') return true;
    return e.category === activeTab;
  });

  const toggleRSVP = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, rsvp: !e.rsvp } : e));
    const event = events.find(e => e.id === id);
    if (!event.rsvp) toast.success(`RSVP confirmed for ${event.title}!`);
    else toast('RSVP cancelled', { icon: 'ℹ️' });
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiUsers className="mr-3 text-purple" /> Social & Events</h1>
            <p className="mt-1 text-muted">Discover campus activities, club meets, and RSVP to events.</p>
          </motion.div>
          <button onClick={() => setShowModal(true)} className="flex items-center bg-purple text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-dark transition-colors shadow-sm">
            <FiPlus className="mr-2" /> Request Event
          </button>
        </div>

        {/* Tabs & Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex bg-card p-1 rounded-lg border border-border overflow-x-auto whitespace-nowrap shadow-sm">
            {tabs.map(t => (
              <button 
                key={t}
                onClick={() => { setActiveTab(t); setMyEventsTab(false); }}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${!myEventsTab && activeTab === t ? 'bg-purple text-white shadow' : 'text-muted hover:text-text'}`}
              >
                {t}
              </button>
            ))}
            <div className="w-px bg-border mx-2"></div>
            <button 
              onClick={() => setMyEventsTab(true)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${myEventsTab ? 'bg-purple text-white shadow' : 'text-muted hover:text-text'}`}
            >
              My Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted font-bold text-lg border-2 border-dashed border-border rounded-xl">
              No events found.
            </div>
          )}
          {filteredEvents.map(e => (
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} key={e.id} className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group hover:border-purple/40">
              <div className="h-32 bg-gradient-to-br from-purple-light to-purple/20 flex flex-col justify-end p-4 border-b border-border/50 relative">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-purple-dark text-xs font-bold px-2 py-1 rounded">
                  {e.category}
                </div>
                <div className="bg-white text-purple-dark w-max text-center rounded-lg px-3 py-1 font-bold border border-purple/20 shadow-sm leading-tight">
                  <div className="text-xs uppercase opacity-70">{e.date.split(' ')[0]}</div>
                  <div className="text-lg">{e.date.split(' ')[1]}</div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-text mb-3 leading-tight flex-1">{e.title}</h3>
                <div className="space-y-2 text-sm text-muted mb-5">
                  <div className="flex items-center"><FiClock className="mr-2 opacity-70" /> {e.time}</div>
                  <div className="flex items-center"><FiMapPin className="mr-2 opacity-70" /> {e.location}</div>
                </div>
                <button 
                  onClick={() => toggleRSVP(e.id)}
                  className={`w-full py-2.5 font-bold rounded-lg transition-colors flex justify-center items-center ${e.rsvp ? 'bg-green/10 text-green border border-green/30 hover:bg-green/20' : 'bg-purple text-white hover:bg-purple-dark border border-purple'}`}
                >
                  {e.rsvp ? <><FiCheck className="mr-2" /> Going</> : 'RSVP Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Event Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div initial={{y:50}} animate={{y:0}} exit={{y:50}} className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <h2 className="text-2xl font-bold mb-4">Request Event</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-muted mb-1">Event Title</label>
                    <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-purple" placeholder="e.g. Coding Bootcamp Phase 1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-muted mb-1">Category</label>
                      <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-purple">
                        {tabs.filter(t=>t!=='All').map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-muted mb-1">Date</label>
                      <input type="date" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-purple" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-muted mb-1">Time</label>
                      <input type="time" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-purple" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-muted mb-1">Location</label>
                      <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-purple" placeholder="Room/Link" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-muted mb-1">Description</label>
                    <textarea rows="2" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-purple resize-none" placeholder="Provide some details..."></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-muted hover:text-text font-medium">Cancel</button>
                  <button onClick={()=>{
                    toast.success('Event request submitted for approval.');
                    setShowModal(false);
                  }} className="px-5 py-2 bg-purple text-white rounded-lg font-bold hover:bg-purple-dark">Submit</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default StudentSocialEvents;
