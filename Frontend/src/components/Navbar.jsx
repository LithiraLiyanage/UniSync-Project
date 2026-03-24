import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const scrollToFeatures = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-dark-blue tracking-tight hover:opacity-90 transition-opacity">
              UniSync
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-6 w-full justify-between ml-10">
            <div className="flex space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => `text-base font-medium transition-colors hover:text-dark-blue ${isActive ? 'text-dark-blue font-semibold' : 'text-gray-600'}`}
              >
                Home
              </NavLink>
              <a 
                href="/#features"
                onClick={scrollToFeatures}
                className="text-base font-medium text-gray-600 hover:text-dark-blue transition-colors"
              >
                Features
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 text-gray-500 hover:text-dark-blue transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              {!token ? (
                <>
                  <Link 
                    to="/login"
                    className="px-4 py-2 border border-blue-200 text-gray-800 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors font-medium text-sm"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/admin/login"
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm font-medium text-sm"
                  >
                    Admin Login
                  </Link>
                </>
              ) : user?.role === 'student' ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-dark-blue flex items-center justify-center font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <span className="text-gray-700 font-medium">Hi, {user.name?.split(' ')[0]} 👋</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                    title="Logout"
                  >
                    <FiLogOut size={20} />
                  </button>
                </>
              ) : user?.role === 'admin' ? (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">Admin</span>
                    <span className="text-gray-700 font-medium">Admin: {user.name?.split(' ')[0]} 👋</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                    title="Logout"
                  >
                    <FiLogOut size={20} />
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-dark-blue' : 'text-gray-700 hover:bg-gray-50 hover:text-dark-blue'}`}
            >
              Home
            </NavLink>
            <a
              href="/#features"
              onClick={scrollToFeatures}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-dark-blue"
            >
              Features
            </a>
            
            {/* Mobile Auth Options */}
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="px-3 mb-4 flex justify-end">
                <button 
                  onClick={toggleTheme} 
                  className="p-2 flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg w-full justify-center border border-gray-200"
                >
                  {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              {!token ? (
                <div className="flex flex-col space-y-2 px-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-2 border border-blue-200 text-gray-800 rounded-lg hover:bg-blue-50 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-medium"
                  >
                    Admin Login
                  </Link>
                </div>
              ) : (
                <div className="px-3 flex items-center justify-between">
                  {user?.role === 'student' ? (
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-dark-blue flex items-center justify-center font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <span className="text-gray-700 font-medium">Hi, {user.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded">Admin</span>
                      <span className="text-gray-700 font-medium">{user?.name}</span>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-600 px-3 py-2"
                  >
                    <FiLogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
