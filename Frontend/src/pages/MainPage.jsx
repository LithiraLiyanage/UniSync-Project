import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiBookOpen, FiDollarSign, FiMap, FiUsers, FiArrowRight } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: 'Study & Learning',
    description: 'Smart study assistant, progress tracking & resources',
    icon: <FiBookOpen size={24} className="text-blue-400" />,
    color: 'from-black to-blue-900',
    path: '/features/study',           // ✅
  },
  {
    id: 2,
    title: 'Earn & Skills',
    description: 'Find campus gigs, freelance work & skill-building tasks',
    icon: <FiDollarSign size={24} className="text-green-400" />,
    color: 'from-black to-emerald-900',
    path: '/features/earn',            // ✅
  },
  {
    id: 3,
    title: 'Travel Smart',
    description: 'Real-time shuttle tracking & smart travel planning',
    icon: <FiMap size={24} className="text-purple-400" />,
    color: 'from-black to-purple-900',
    path: '/features/travel',          // ✅
  },
  {
    id: 4,
    title: 'Social & Events',
    description: 'Connect with peers, join clubs & discover campus events',
    icon: <FiUsers size={24} className="text-pink-400" />,
    color: 'from-black to-pink-900',
    path: '/features/events',          // ✅
  },
];

const MainPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex-grow flex items-center relative overflow-hidden bg-[var(--bg)] transition-colors duration-300">
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />

        <div className="max-w-7xl mx-auto w-full text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[var(--text)] transition-colors duration-300"
          >
            Your Smart Campus <span className="text-dark-blue">Assistant</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl max-w-2xl mx-auto mb-10 text-[var(--muted)] transition-colors duration-300"
          >
            Manage studies, find gigs, travel smart & connect with peers. One platform to power your entire university experience.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            {!token ? (
              <>
                <Link to="/register" className="w-full sm:w-auto px-8 py-3 bg-dark-blue text-white rounded-lg hover:bg-black font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Get Started
                </Link>
                <Link to="/admin/login" className="w-full sm:w-auto px-8 py-3 bg-[var(--card)] text-[var(--text)] border border-[var(--border)] rounded-lg font-semibold shadow-sm transition-all hover:opacity-80">
                  Admin Portal
                </Link>
                <button onClick={handleLearnMore} className="w-full sm:w-auto px-8 py-3 text-[var(--text)] font-medium transition-colors hover:opacity-80">
                  Learn More ↓
                </button>
              </>
            ) : user?.role === 'student' ? (
              <Link to="/dashboard" className="px-8 py-3 bg-dark-blue text-white rounded-lg hover:bg-black font-semibold shadow-lg transition-all transform hover:-translate-y-1">
                Go to Dashboard
              </Link>
            ) : user?.role === 'admin' ? (
              <Link to="/admin/dashboard" className="px-8 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 font-semibold shadow-lg transition-all transform hover:-translate-y-1">
                Go to Admin Dashboard
              </Link>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[var(--bg)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text)] transition-colors duration-300">Everything you need in one place</h2>
            <p className="mt-4 text-lg text-[var(--muted)] transition-colors duration-300">Explore the core features of UniSync</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                to={feature.path}
                key={feature.id}
                className="no-underline"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-2xl p-6 shadow-lg border bg-[var(--card)] border-[var(--border)] transition-colors duration-300 group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} shadow-inner`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-[var(--muted)] mb-6 flex-grow transition-colors duration-300">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-dark-blue transition-colors">
                    Explore <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 text-center bg-[var(--bg)] border-[var(--border)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-2xl font-bold text-dark-blue mb-4">UniSync</div>
          <p className="text-[var(--muted)] mb-6 transition-colors duration-300">© 2026 Built for Students</p>
          <div className="flex space-x-6 text-sm font-medium text-[var(--muted)] transition-colors duration-300">
            <Link to="/" className="hover:text-dark-blue transition-colors">Home</Link>
            <Link to="/login" className="hover:text-dark-blue transition-colors">Login</Link>
            <Link to="/admin/login" className="hover:text-dark-blue transition-colors">Admin Login</Link>
            <Link to="/register" className="hover:text-dark-blue transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;