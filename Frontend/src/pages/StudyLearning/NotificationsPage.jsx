import { FiBell, FiCheckCircle, FiAlertTriangle, FiInfo, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const defaultNotifications = [
  { id: 1, type: 'urgent', title: 'Exam Tomorrow', desc: 'Networks practical exam is scheduled for 9:00 AM in Lab 3.', time: '2 hours ago', unread: true },
  { id: 2, type: 'success', title: 'Grade Published', desc: 'Your assignment for OOP was graded: A-.', time: '5 hours ago', unread: false },
  { id: 3, type: 'warning', title: 'Pending Report', desc: 'You have 1 pending lab report for OS. Due in 2 days.', time: '1 day ago', unread: true },
  { id: 4, type: 'info', title: 'New Resource Added', desc: 'A new video lecture has been uploaded for Database Management Systems.', time: '2 days ago', unread: false },
  { id: 5, type: 'success', title: 'Event Registration', desc: 'Your registration for the Tech Symposium was successful.', time: '3 days ago', unread: false },
];

const NotificationsPage = () => {

  const getIcon = (type) => {
    switch(type) {
      case 'urgent': return <FiAlertTriangle className="text-red" size={20} />;
      case 'success': return <FiCheckCircle className="text-green" size={20} />;
      case 'warning': return <FiInfo className="text-amber" size={20} />;
      case 'info': return <FiBell className="text-primary" size={20} />;
      default: return <FiBell className="text-muted" size={20} />;
    }
  };

  const getBorderColor = (type) => {
    switch(type) {
      case 'urgent': return 'border-l-red bg-red/5';
      case 'success': return 'border-l-green bg-green/5';
      case 'warning': return 'border-l-amber bg-amber/5';
      case 'info': return 'border-l-primary bg-primary/5';
      default: return 'border-l-border bg-card';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center text-text">
          <FiBell className="mr-2 text-primary" /> Notifications
        </h2>
        <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {defaultNotifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border-l-4 border-y border-r border-y-border border-r-border p-5 rounded-r-xl shadow-sm transition-all hover:shadow-md flex items-start gap-4 ${getBorderColor(notif.type)}`}
          >
            <div className="pt-1">
              {getIcon(notif.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold ${notif.unread ? 'text-text' : 'text-muted'}`}>
                  {notif.title}
                </h3>
                <span className="flex items-center text-xs font-semibold text-muted ml-4 whitespace-nowrap">
                  <FiClock className="mr-1" /> {notif.time}
                </span>
              </div>
              <p className="text-sm text-text/80">{notif.desc}</p>
            </div>

            {notif.unread && (
              <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 self-center"></div>
            )}
          </motion.div>
        ))}
      </div>
      
    </div>
  );
};

export default NotificationsPage;
