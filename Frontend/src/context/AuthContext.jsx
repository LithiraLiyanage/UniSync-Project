import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await api.get('/api/auth/profile');
        setUser(data.user);
      } catch (error) {
        // Handled by axios interceptor if 401, but we reset state here
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [token]);

  const login = async (email, password, role) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password, role });
      
      setToken(data.token);
      setUser(data.user); // Should contain role
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role);
      
      if (role === 'student') {
        navigate('/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
      
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      throw error;
    }
  };

  const register = async (userData, role) => {
    try {
      const { data } = await api.post('/api/auth/register', { ...userData, role });
      
      // Auto login after success
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role);
      
      if (role === 'student') {
        navigate('/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
      
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
