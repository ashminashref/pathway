import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login({ setIsAuthenticated, isDarkMode }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return setError('Please fill in all fields.');
    
    setLoading(true);
    setError('');
    try {
      const res = await api.post('login', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      setIsAuthenticated(true);
      navigate('/');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090d16]' : 'bg-slate-50'
    }`}>
      <div className={`w-full max-w-md border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm ${
        isDarkMode ? 'bg-[#0f172a]/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-1.5 text-center">
          <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Login
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Sign in to manage and view your active event registrations.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs rounded-lg font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Username
            </label>
            <input 
              type="text" 
              className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Enter your username"
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
            />
          </div>

          <div className="space-y-1">
            <label className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Password
            </label>
            <input 
              type="password" 
              className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Enter your password"
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-amber-400 transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={`border-t pt-4 text-center text-xs ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-500'}`}>
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-500 hover:underline font-medium">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}