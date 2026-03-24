import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiAlertTriangle, FiSend, FiPlus, FiPower } from 'react-icons/fi';
import toast from 'react-hot-toast';

const initialRoutes = [
  { id: 'A', name: 'Route A: Main Campus -> Hostel', status: 'Active', driver: 'D. Silva', bus: 'NB-4092' },
  { id: 'B', name: 'Route B: Science Block -> Station', status: 'Active', driver: 'M. Perera', bus: 'NA-1100' },
  { id: 'C', name: 'Route C: Hostel -> Main Gate', status: 'Maintenance', driver: '-', bus: 'ND-5541' }
];

const AdminTravelSmart = () => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('warning');

  const handleSendAlert = () => {
    if (!alertMsg) return toast.error('Alert message is required');
    toast.success('Travel alert broadcasted to all students!');
    setAlertMsg('');
  };

  const toggleRouteStatus = (id) => {
    setRoutes(routes.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Maintenance' : 'Active' } : r));
    toast.success('Route status updated');
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiMap className="mr-3 text-amber" /> Travel Smart Administration</h1>
            <p className="mt-1 text-muted">Manage shuttle routes, monitor capacity, and broadcast emergency alerts.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Routes Table) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-bold">Active Shuttle Routes</h3>
              <button className="flex items-center bg-amber text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors">
                <FiPlus className="mr-2" /> Add Route
              </button>
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Route ID</th>
                    <th>Path Name</th>
                    <th>Bus Reg.</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map(r => (
                    <tr key={r.id}>
                      <td className="font-bold text-amber">{r.id}</td>
                      <td className="font-semibold text-text">{r.name}</td>
                      <td className="font-mono text-muted">{r.bus}</td>
                      <td>{r.driver}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${r.status === 'Active' ? 'tbl-green' : 'tbl-red'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleRouteStatus(r.id)}
                          className={`p-2 rounded-lg title="Toggle Status" transition-colors ${r.status === 'Active' ? 'text-red bg-red/10 hover:bg-red/20' : 'text-green bg-green/10 hover:bg-green/20'}`}
                        >
                          <FiPower/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar (Broadcast Alert) */}
          <div className="space-y-6">
            <div className="bg-amber/10 border border-amber/30 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber/20 rounded-full translate-x-16 -translate-y-16 blur-2xl pointer-events-none"></div>
              
              <h3 className="text-lg font-bold flex items-center mb-4 text-amber-900"><FiAlertTriangle className="mr-2"/> Broadcast Alert</h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-bold text-amber-900 mb-1">Alert Level</label>
                  <select value={alertType} onChange={e=>setAlertType(e.target.value)} className="w-full px-4 py-2 border border-amber/30 rounded-lg focus:outline-none focus:border-amber bg-white/80">
                    <option value="warning">Warning (Delays, Traffic)</option>
                    <option value="info">Info (Schedule changes)</option>
                    <option value="emergency">Emergency (Holidays, Cancellations)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-amber-900 mb-1">Message</label>
                  <textarea 
                    rows="4" 
                    value={alertMsg} 
                    onChange={e=>setAlertMsg(e.target.value)} 
                    placeholder="E.g. Route A will be delayed by 15 minutes due to heavy rain..."
                    className="w-full px-4 py-2 border border-amber/30 rounded-lg focus:outline-none focus:border-amber resize-none bg-white/80"
                  ></textarea>
                </div>
                <button 
                  onClick={handleSendAlert}
                  className="w-full flex items-center justify-center bg-amber text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                >
                  <FiSend className="mr-2" /> Push Alert to Students
                </button>
              </div>
            </div>

            <div className="bg-card border border-border p-5 rounded-xl shadow-sm text-center py-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <FiMap size={32}/>
              </div>
              <h4 className="font-bold mb-2">GPS Tracking Module</h4>
              <p className="text-sm text-muted mb-4">Live bus tracking visualization is currently active and gathering coordinates.</p>
              <button className="text-primary font-bold hover:underline">View Live Map &rarr;</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminTravelSmart;
