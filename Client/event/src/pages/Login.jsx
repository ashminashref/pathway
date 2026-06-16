import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login({ setIsAuthenticated, theme }) {
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
      // Fixed endpoint route string explicitly with the required trailing slash
      const res = await api.post('login/', form);
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

  const isDark = theme === 'dark';

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 antialiased">
      
      <div className={`w-full max-w-md rounded-3xl p-8 space-y-8 border shadow-sm transition-all duration-300 ${
        isDark 
          ? 'bg-[#141414] border-white/5 text-white' 
          : 'bg-[#f4f4f4] border-slate-200 text-slate-950'
      }`}>
        
        <div className="space-y-2 text-center">
          <h1 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Welcome Back
          </h1>
          <p className={`text-xs font-light tracking-wide ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
            Sign in to manage your active enterprise masterclasses.
          </p>
        </div>

        {error && (
          <div className={`p-4 border text-xs rounded-2xl font-semibold tracking-wide ${
            isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'
          }`}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input Block: Username */}
          <div className="space-y-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase ${
              isDark ? 'text-white/50' : 'text-slate-400'
            }`}>
              Username
            </label>
            <input 
              type="text" 
              className={`w-full rounded-full py-3.5 px-5 text-sm focus:outline-none transition-all font-light tracking-wide border ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/20 focus:border-white/30' 
                  : 'bg-white border-slate-200 text-slate-950 placeholder-slate-300 focus:border-slate-400'
              }`}
              placeholder="Enter your registered identifier"
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
            />
          </div>

          {/* Input Block: Password */}
          <div className="space-y-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase ${
              isDark ? 'text-white/50' : 'text-slate-400'
            }`}>
              Password
            </label>
            <input 
              type="password" 
              className={`w-full rounded-full py-3.5 px-5 text-sm focus:outline-none transition-all font-light border ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/20 focus:border-white/30' 
                  : 'bg-white border-slate-200 text-slate-950 placeholder-slate-300 focus:border-slate-400'
              }`}
              placeholder="••••••••"
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
          </div>

          {/* Action Call Button Component */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-slate-950 text-white dark:bg-[#96f940] dark:text-slate-950 font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all duration-300 active:scale-[0.99] disabled:opacity-40 flex justify-center items-center gap-1.5 hover:opacity-90"
          >
            <span>{loading ? 'Authenticating System...' : 'Sign In'}</span>
            {!loading && (
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            )}
          </button>
        </form>

        <div className={`border-t pt-5 text-center text-xs tracking-wide font-light ${
          isDark ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-500'
        }`}>
          New to the network?{' '}
          <Link to="/register" className="text-[#5ca122] dark:text-[#96f940] hover:underline font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}