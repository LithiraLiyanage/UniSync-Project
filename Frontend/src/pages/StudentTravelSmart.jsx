import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiAlertCircle, FiClock, FiMapPin, FiNavigation } from 'react-icons/fi';

const routes = [
  { id: 'A', name: 'Route A: Main Campus -> Hostel', nextStop: 'Library', eta: '5 mins', capacity: '60%' },
  { id: 'B', name: 'Route B: Science Block -> Station', nextStop: 'Science Block', eta: '12 mins', capacity: '30%' },
  { id: 'C', name: 'Route C: Hostel -> Main Gate', nextStop: 'Sports Complex', eta: 'Arriving', capacity: '90%' }
];

const alerts = [
  { id: 1, type: 'warning', msg: 'Route B delayed by 10 mins due to traffic near the North Gate.', time: '10:05 AM' },
  { id: 2, type: 'info', msg: 'Extra shuttle added to Route A for the lunch rush.', time: '11:45 AM' }
];

const carpoolRequests = [
  { id: 1, student: 'Sarah J.', from: 'City Center', to: 'Campus', time: 'Tomorrow 8:00 AM', spots: 2 },
  { id: 2, student: 'Michael T.', from: 'South Square', to: 'Hostel', time: 'Today 5:30 PM', spots: 1 }
];

const StudentTravelSmart = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiMap className="mr-3 text-amber" /> Travel Smart</h1>
            <p className="mt-1 text-muted">Real-time shuttle tracking, alerts, and campus ride-sharing.</p>
          </motion.div>
          <div className="text-right">
            <div className="text-2xl font-bold font-mono">{currentTime}</div>
            <div className="text-sm text-muted">Local Time</div>
          </div>
        </div>

        {/* Alerts Panel */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`p-4 rounded-xl border flex items-start shadow-sm ${a.type === 'warning' ? 'bg-amber/10 border-amber/30 text-amber-900' : 'bg-primary/10 border-primary/30 text-primary-dark'}`}>
                <FiAlertCircle className={`mt-0.5 mr-3 flex-shrink-0 ${a.type === 'warning' ? 'text-amber' : 'text-primary'}`} size={20} />
                <div className="flex-1">
                  <div className="font-bold mb-1">{a.type === 'warning' ? 'Travel Advisory' : 'Travel Update'}</div>
                  <p className="text-sm">{a.msg}</p>
                </div>
                <div className="text-xs font-bold opacity-60 ml-4 pt-1">{a.time}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Map Placeholder & Shuttles) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Interactive Map Placeholder */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-96 relative">
              <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md border border-border">
                <h4 className="font-bold text-sm flex items-center mb-2"><FiNavigation className="mr-2 text-amber"/> Live Map</h4>
                <div className="space-y-1 text-xs font-semibold">
                  <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple mr-2"></span>Route A</div>
                  <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber mr-2"></span>Route B</div>
                  <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Route C</div>
                </div>
              </div>
              
              {/* Fake Map Graphic */}
              <div className="flex-1 bg-amber/5 relative overflow-hidden flex items-center justify-center">
                <div className="text-amber/30 text-center">
                  <FiMap size={64} className="mx-auto mb-2" />
                  <p className="font-mono font-bold text-lg hidden sm:block">INTERACTIVE MAP INTEGRATION</p>
                </div>
                
                {/* Fake path lines */}
                <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
                  <path d="M 100 300 Q 250 100 400 200 T 700 100" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeDasharray="5,5" />
                  <path d="M 50 100 C 200 150 300 300 500 250 S 700 300 800 150" stroke="#F59E0B" strokeWidth="4" fill="none" />
                  <circle cx="400" cy="200" r="8" fill="#8B5CF6" />
                  <circle cx="500" cy="250" r="8" fill="#F59E0B" />
                  <circle cx="100" cy="300" r="8" fill="#8B5CF6" />
                  <circle cx="800" cy="150" r="8" fill="#F59E0B" />
                </svg>
              </div>
            </div>

            {/* Shuttle List */}
            <div>
              <h3 className="text-xl font-bold mb-4">Active Shuttles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routes.map(r => (
                  <div key={r.id} className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{r.name}</h4>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.id === 'A' ? 'bg-purple/10 text-purple' : r.id === 'B' ? 'bg-amber/10 text-amber' : 'bg-blue-100 text-blue-700'}`}>
                        {r.capacity} Full
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-text">
                      <div className="flex items-center"><FiMapPin className="mr-2 text-muted" /> Next Stop: <span className="font-semibold ml-1">{r.nextStop}</span></div>
                      <div className="flex items-center"><FiClock className="mr-2 text-muted" /> ETA: <span className="font-semibold ml-1 text-primary">{r.eta}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Ride Share board */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Carpool Board</h3>
                <button className="text-sm font-bold text-amber hover:underline">Offer a Ride</button>
              </div>
              <div className="space-y-4">
                {carpoolRequests.map(r => (
                  <div key={r.id} className="p-4 bg-gray-50 border border-border rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm text-text">{r.student}</span>
                      <span className="text-xs bg-white border border-border px-2 py-1 rounded font-bold">{r.spots} spots</span>
                    </div>
                    <div className="text-xs text-muted space-y-1 mb-3">
                      <div><span className="font-semibold text-text">From:</span> {r.from}</div>
                      <div><span className="font-semibold text-text">To:</span> {r.to}</div>
                      <div><span className="font-semibold text-text">When:</span> {r.time}</div>
                    </div>
                    <button className="w-full py-1.5 border border-amber text-amber font-bold rounded hover:bg-amber hover:text-white transition-colors text-sm">
                      Request Seat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-amber/10 border border-amber/20 rounded-2xl p-6">
              <h3 className="font-bold text-amber-dark mb-4">Travel Resources</h3>
              <ul className="space-y-2 text-sm font-semibold text-amber-900">
                <li className="hover:underline cursor-pointer flex items-center"><span className="w-1.5 h-1.5 bg-amber rounded-full mr-2"></span> Download Shuttle Schedule (PDF)</li>
                <li className="hover:underline cursor-pointer flex items-center"><span className="w-1.5 h-1.5 bg-amber rounded-full mr-2"></span> Campus Parking Map</li>
                <li className="hover:underline cursor-pointer flex items-center"><span className="w-1.5 h-1.5 bg-amber rounded-full mr-2"></span> Report an Issue</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentTravelSmart;
