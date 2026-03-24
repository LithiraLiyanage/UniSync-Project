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
        const { data } = await api.get('/api/auth/me');
        setUser(data.data);
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
      
      const resData = data.data;
      const userRole = resData.role;

      setToken(resData.token);
      setUser(resData); 
      localStorage.setItem('token', resData.token);
      localStorage.setItem('role', userRole);
      
      if (userRole === 'student') {
        navigate('/dashboard');
      } else if (userRole === 'admin') {
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
      
      const resData = data.data;
      const userRole = resData.role;

      // Auto login after success
      setToken(resData.token);
      setUser(resData);
      localStorage.setItem('token', resData.token);
      localStorage.setItem('role', userRole);
      
      if (userRole === 'student') {
        navigate('/dashboard');
      } else if (userRole === 'admin') {
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
