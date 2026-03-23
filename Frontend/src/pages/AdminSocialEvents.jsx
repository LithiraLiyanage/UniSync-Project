import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiMapPin, FiClock, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';

const initialEvents = [
  { id: 201, title: 'Annual Tech Symposium', category: 'Academic', date: 'Oct 15, 2024', time: '09:00 AM', location: 'Main Auditorium', requestedBy: 'CS Students Union', status: 'Approved' },
  { id: 202, title: 'Photography Club Meetup', category: 'Clubs', date: 'Oct 20, 2024', time: '05:00 PM', location: 'Room 402', requestedBy: 'Photo Club', status: 'Pending' },
  { id: 203, title: 'Halloween Campus Party', category: 'Social', date: 'Oct 31, 2024', time: '07:00 PM', location: 'Student Center', requestedBy: 'Social Committee', status: 'Pending' }
];

const AdminSocialEvents = () => {
  const [events, setEvents] = useState(initialEvents);

  const approveEvent = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, status: 'Approved' } : e));
    toast.success('Event approved successfully');
  };

  const rejectEvent = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, status: 'Rejected' } : e));
    toast.error('Event rejected');
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiUsers className="mr-3 text-purple" /> Event Management</h1>
            <p className="mt-1 text-muted">Review, approve, and manage campus events and club activities.</p>
          </motion.div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Pending Approvals</h4>
            <div className="text-3xl font-bold text-amber">12</div>
          </div>
          <div className="bg-purple/10 border border-purple/20 p-5 rounded-xl text-purple-dark">
            <h4 className="text-sm font-semibold uppercase mb-2 flex items-center"><FiCalendar className="mr-2"/> Upcoming Events</h4>
            <div className="text-3xl font-bold">8</div>
          </div>
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Active Clubs</h4>
            <div className="text-3xl font-bold text-green">34</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Events Table) */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-4">
            <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold">Event Requests</h3>
              <select className="px-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:border-purple">
                <option>All Requests</option>
                <option>Pending Only</option>
                <option>Approved</option>
              </select>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Event Details</th>
                  <th>Requested By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(e => (
                  <tr key={e.id} className={e.status === 'Pending' ? 'bg-amber/5' : ''}>
                    <td>
                      <div className="font-bold text-purple">{e.title}</div>
                      <div className="text-xs text-muted mt-1 space-y-0.5">
                        <div className="flex items-center"><FiCalendar className="mr-1 inline"/> {e.date} at {e.time}</div>
                        <div className="flex items-center"><FiMapPin className="mr-1 inline"/> {e.location}</div>
                      </div>
                    </td>
                    <td>
                      <div className="font-semibold text-text">{e.requestedBy}</div>
                      <span className="text-xs font-bold border border-border px-1.5 py-0.5 rounded mt-1 inline-block">{e.category}</span>
                    </td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${e.status === 'Pending' ? 'tbl-amber' : e.status === 'Approved' ? 'tbl-green' : 'tbl-red'}`}>
                        {e.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details"><FiInfo/></button>
                        {e.status === 'Pending' && (
                          <>
                            <button onClick={() => approveEvent(e.id)} className="p-2 text-green bg-green/10 hover:bg-green/20 rounded-lg" title="Approve"><FiCheck/></button>
                            <button onClick={() => rejectEvent(e.id)} className="p-2 text-red bg-red/10 hover:bg-red/20 rounded-lg" title="Reject"><FiX/></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mini Calendar / Agenda Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 mt-4">
              <h3 className="text-lg font-bold mb-4 flex items-center"><FiCalendar className="mr-2 text-purple" /> Weekly Agenda</h3>
              
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                
                {events.filter(e => e.status === 'Approved').map((e, index) => (
                  <div key={e.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-purple text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <FiCalendar size={18} />
                    </div>
                    
                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-border shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-text text-sm">{e.title}</div>
                      </div>
                      <div className="text-xs text-muted">{e.date} · {e.time}</div>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
            <button className="w-full bg-purple text-white font-bold py-3 rounded-lg hover:bg-purple-dark transition-colors shadow-sm">
              View Full Calendar Dashboard
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminSocialEvents;
