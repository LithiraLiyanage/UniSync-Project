import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiUsers, FiMessageCircle, FiGrid, FiTrendingUp, FiClock, FiStar, FiActivity } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from "chart.js";
import api from "../../api/axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    todayEvents: 0,
    eventsByCategory: [],
    eventsByPriority: [],
  });
  const [loading, setLoading] = useState(true);

  const cards = [
    {
      title: "Events",
      desc: "Explore university events",
      icon: <FiGrid size={28} />,
      color: "from-violet-500 via-purple-500 to-indigo-600",
      path: "/event-feature/events",
      stats: stats.totalEvents,
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
      iconBg: "bg-violet-500",
    },
    {
      title: "Social",
      desc: "Find people with similar interests",
      icon: <FiUsers size={28} />,
      color: "from-pink-500 via-rose-400 to-red-500",
      path: "/event-feature/social",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
      iconBg: "bg-pink-500",
    },
    {
      title: "Calendar",
      desc: "Manage your personal schedule",
      icon: <FiCalendar size={28} />,
      color: "from-emerald-500 via-teal-400 to-green-500",
      path: "/event-feature/calendar",
      stats: stats.upcomingEvents,
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      iconBg: "bg-emerald-500",
    },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/personal-events/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Events This Week',
        data: [2, 3, 1, 4, 2, 5, 3],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        pointBackgroundColor: '#8B5CF6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#8B5CF6',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Events: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Event Management Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Manage your events, connect with others, and stay organized
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm">Total Events</p>
              <p className="text-3xl font-bold">{stats.totalEvents}</p>
            </div>
            <FiActivity size={24} className="text-violet-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Upcoming</p>
              <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
            </div>
            <FiClock size={24} className="text-emerald-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-pink-500 to-rose-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Today</p>
              <p className="text-3xl font-bold">{stats.todayEvents}</p>
            </div>
            <FiStar size={24} className="text-pink-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Now</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <FiTrendingUp size={24} className="text-blue-200" />
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feature Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Access</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(card.path)}
                className={`cursor-pointer group relative overflow-hidden rounded-3xl p-6 ${card.bgColor} border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${card.iconBg} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {card.desc}
                  </p>
                  
                  {card.stats !== undefined && (
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold">
                      <span className="text-2xl mr-2">{card.stats}</span>
                      <span className="text-sm">events</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Weekly Activity</h2>
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Category Distribution */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-3">
              {stats.eventsByCategory.slice(0, 3).map((category, index) => (
                <div key={category._id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      index === 0 ? 'bg-violet-500' : index === 1 ? 'bg-emerald-500' : 'bg-pink-500'
                    }`}></div>
                    <span className="text-gray-700 dark:text-gray-300 capitalize">{category._id}</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{category.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;