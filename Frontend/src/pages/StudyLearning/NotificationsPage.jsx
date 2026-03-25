import { FiBell, FiCheckCircle, FiAlertTriangle, FiInfo, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const defaultNotifications = [
  { id: 1, type: 'urgent', title: 'Exam Tomorrow', desc: 'Networks practical exam is scheduled for 9:00 AM in Lab 3.', time: '2 hours ago', unread: true },
  { id: 2, type: 'success', title: 'Grade Published', desc: 'Your assignment for OOP was graded: A-.', time: '5 hours ago', unread: false },
  { id: 3, type: 'warning', title: 'Pending Report', desc: 'You have 1 pending lab report for OS. Due in 2 days.', time: '1 day ago', unread: true },
  { id: 4, type: 'info', title: 'New Resource Added', desc: 'A new video lecture has been uploaded for Database Management Systems.', time: '2 days ago', unread: false },
  { id: 5, type: 'success', title: 'Event Registration', desc: 'Your registration for the Tech Symposium was successful.', time: '3 days ago', unread: false },
];

const TYPE_STYLES = {
  urgent: {
    border:   'border-l-rose-500',
    bg:       'bg-rose-50 dark:bg-rose-900/20',
    iconBg:   'bg-rose-500 text-white',
    dot:      'bg-rose-500',
    badge:    'bg-rose-100 text-rose-700 dark:bg-rose-800/50 dark:text-rose-300',
  },
  success: {
    border:   'border-l-emerald-500',
    bg:       'bg-emerald-50 dark:bg-emerald-900/20',
    iconBg:   'bg-emerald-500 text-white',
    dot:      'bg-emerald-500',
    badge:    'bg-emerald-100 text-emerald-700 dark:bg-emerald-800/50 dark:text-emerald-300',
  },
  warning: {
    border:   'border-l-amber-500',
    bg:       'bg-amber-50 dark:bg-amber-900/20',
    iconBg:   'bg-amber-500 text-white',
    dot:      'bg-amber-500',
    badge:    'bg-amber-100 text-amber-700 dark:bg-amber-800/50 dark:text-amber-300',
  },
  info: {
    border:   'border-l-sky-500',
    bg:       'bg-sky-50 dark:bg-sky-900/20',
    iconBg:   'bg-sky-500 text-white',
    dot:      'bg-sky-500',
    badge:    'bg-sky-100 text-sky-700 dark:bg-sky-800/50 dark:text-sky-300',
  },
};

const TYPE_ICONS = {
  urgent:  <FiAlertTriangle size={18} />,
  success: <FiCheckCircle size={18} />,
  warning: <FiInfo size={18} />,
  info:    <FiBell size={18} />,
};

const NotificationsPage = () => {
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

      <div className="space-y-3">
        {defaultNotifications.map((notif, i) => {
          const style = TYPE_STYLES[notif.type] || TYPE_STYLES.info;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`border-l-4 border border-border p-4 rounded-r-xl shadow-sm hover:shadow-md transition-all flex items-start gap-4 ${style.border} ${style.bg}`}
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${style.iconBg}`}>
                {TYPE_ICONS[notif.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className={`font-bold text-sm ${notif.unread ? 'text-text' : 'text-muted'}`}>
                    {notif.title}
                  </h3>
                  <span className="flex items-center text-xs text-muted whitespace-nowrap shrink-0">
                    <FiClock className="mr-1" /> {notif.time}
                  </span>
                </div>
                <p className="text-sm text-text/70 leading-snug">{notif.desc}</p>
              </div>

              {/* Unread dot */}
              {notif.unread && (
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 self-center ${style.dot}`} />
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default NotificationsPage;