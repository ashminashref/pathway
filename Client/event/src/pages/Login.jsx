import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login({ setIsAuthenticated }) {
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

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 antialiased text-white">
      
      {/* High-End Glassmorphic Card Container Component */}
      <div className="w-full max-w-md rounded-3xl p-8 space-y-8 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-2xl">
        
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="text-xs text-white/60 font-light tracking-wide">
            Sign in to manage your active enterprise masterclasses.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-2xl font-semibold tracking-wide">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input Block: Username */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-white/50">
              Username
            </label>
            <input 
              type="text" 
              className="w-full bg-white/[0.04] border border-white/10 rounded-full py-3.5 px-5 text-sm focus:outline-none focus:border-white/30 transition-all placeholder-white/20 text-white font-light tracking-wide"
              placeholder="Enter your registered identifier"
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
            />
          </div>

          {/* Input Block: Password */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold tracking-widest uppercase text-white/50">
              Password
            </label>
            <input 
              type="password" 
              className="w-full bg-white/[0.04] border border-white/10 rounded-full py-3.5 px-5 text-sm focus:outline-none focus:border-white/30 transition-all placeholder-white/20 text-white font-light"
              placeholder="••••••••"
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
          </div>

          {/* Premium Capsule Action Call button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-[#96f940] text-slate-950 font-bold text-xs uppercase tracking-widest py-4 rounded-full hover:bg-[#86e236] transition-all duration-300 shadow-lg active:scale-[0.99] disabled:opacity-40 flex justify-center items-center gap-1.5"
          >
            <span>{loading ? 'Authenticating System...' : 'Sign In'}</span>
            {!loading && (
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            )}
          </button>
        </form>

        <div className="border-t border-white/10 pt-5 text-center text-xs tracking-wide text-white/50 font-light">
          New to the network?{' '}
          <Link to="/register" className="text-[#96f940] hover:underline font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}