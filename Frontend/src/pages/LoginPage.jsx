import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in as student
  useEffect(() => {
    if (token && user?.role === 'student') {
      navigate('/dashboard');
    }
  }, [token, user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(email, password, 'student');
    } catch (error) {
      // Error handled by context (toast)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen student-auth-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity inline-block mb-2"
              style={{ color: 'var(--text)' }}
            >
              UniSync
            </Link>
            <h2
              className="text-xl font-medium"
              style={{ color: 'var(--muted)' }}
            >
              Student Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  style={{ color: 'var(--muted)' }}
                >
                  <FiMail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="University Email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'var(--inp-bg)',
                    border: '1px solid var(--inp-border)',
                    color: 'var(--text)',
                    '--tw-ring-color': 'var(--primary)',
                  }}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm" style={{ color: 'var(--red)' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  style={{ color: 'var(--muted)' }}
                >
                  <FiLock />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'var(--inp-bg)',
                    border: '1px solid var(--inp-border)',
                    color: 'var(--text)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm" style={{ color: 'var(--red)' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label
                className="flex items-center cursor-pointer"
                style={{ color: 'var(--text)' }}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded"
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="transition-colors hover:underline"
                style={{ color: 'var(--primary)' }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 font-semibold rounded-lg shadow-lg transition-all disabled:opacity-70 flex justify-center items-center"
              style={{
                background: 'linear-gradient(to right, var(--p2), var(--p3))',
                color: '#ffffff',
              }}
            >
              {isSubmitting ? (
                <div
                  className="h-5 w-5 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: 'rgba(255,255,255,0.5)', borderTopColor: 'transparent' }}
                />
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: 'var(--border)' }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2"
                  style={{
                    background: 'var(--auth-card)',
                    color: 'var(--muted)',
                  }}
                >
                  or
                </span>
              </div>
            </div>

            {/* Footer links */}
            <div className="mt-6 text-center space-y-4">
              <p style={{ color: 'var(--text)' }}>
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium transition-colors hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  Register
                </Link>
              </p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Are you an admin?{' '}
                <Link
                  to="/admin/login"
                  className="transition-colors hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  Admin Login →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;