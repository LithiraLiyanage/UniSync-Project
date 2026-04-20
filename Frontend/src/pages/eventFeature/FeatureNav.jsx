import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGrid, FiCalendar, FiUsers, FiHome } from "react-icons/fi";

const links = [
  { 
    path: "/event-dashboard", 
    label: "Dashboard", 
    icon: <FiHome size={16} />,
    color: "from-violet-500 to-purple-600",
    hoverColor: "hover:from-violet-600 hover:to-purple-700"
  },
  { 
    path: "/event-feature/events", 
    label: "Events", 
    icon: <FiGrid size={16} />,
    color: "from-pink-500 to-rose-600",
    hoverColor: "hover:from-pink-600 hover:to-rose-700"
  },
  { 
    path: "/event-feature/social", 
    label: "Social", 
    icon: <FiUsers size={16} />,
    color: "from-emerald-500 to-teal-600",
    hoverColor: "hover:from-emerald-600 hover:to-teal-700"
  },
  { 
    path: "/event-feature/calendar", 
    label: "Calendar", 
    icon: <FiCalendar size={16} />,
    color: "from-blue-500 to-cyan-600",
    hoverColor: "hover:from-blue-600 hover:to-cyan-700"
  },
];

export default function FeatureNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="mb-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
        <div className="flex flex-wrap gap-2">
          {links.map((link, index) => {
            const isActive = pathname === link.path;
            
            return (
              <motion.button
                key={link.path}
                onClick={() => navigate(link.path)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${isActive 
                    ? `bg-gradient-to-r ${link.color} text-white shadow-lg` 
                    : `text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800`
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                {/* Icon */}
                <span className={`transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}>
                  {link.icon}
                </span>
                
                {/* Label */}
                <span className="relative z-10">
                  {link.label}
                </span>
                
                {/* Hover effect for non-active tabs */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-2">
          <FiHome size={14} />
          <span>Event Management</span>
        </span>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {links.find(link => link.path === pathname)?.label || 'Dashboard'}
        </span>
      </div>
    </div>
  );
}