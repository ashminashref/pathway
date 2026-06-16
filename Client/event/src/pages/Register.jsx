import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register({ theme }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      return setError('Please fill in all fields.');
    }
    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }
    
    setLoading(true);
    setError('');
    try {
      await api.post('register/', form);
      navigate('/login');
    } catch (err) {
      const backendError = err.response?.data?.password?.[0] || err.response?.data?.username?.[0] || 'Registration failed.';
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: '', color: 'bg-slate-300 dark:bg-white/20' };
    let points = 0;
    if (pwd.length >= 8) points++;
    if (/[A-Z]/.test(pwd)) points++;
    if (/[0-9]/.test(pwd)) points++;

    if (points === 1) return { score: 33, text: 'Weak (Add capitals & digits)', color: 'bg-rose-400' };
    if (points === 2) return { score: 66, text: 'Medium (Add digits or capitals)', color: 'bg-amber-400' };
    return { score: 100, text: 'Strong security mapping verified', color: 'text-[#5ca122] dark:text-[#96f940] bg-[#5ca122] dark:bg-[#96f940]' };
  };

  const strength = getPasswordStrength(form.password);
  const isDark = theme === 'dark';

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-8 antialiased">
      
      <div className={`w-full max-w-md rounded-3xl p-8 space-y-8 border shadow-sm transition-all duration-300 ${
        isDark 
          ? 'bg-[#141414] border-white/5 text-white' 
          : 'bg-[#f4f4f4] border-slate-200 text-slate-950'
      }`}>
        
        <div className="space-y-2 text-center">
          <h1 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Create Account
          </h1>
          <p className={`text-xs font-light tracking-wide ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
            Register to claim access passes to global platform masterclasses.
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
          
          {/* Username Input */}
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
              placeholder="Choose a platform handle"
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
            />
          </div>

          {/* Email Address Input */}
          <div className="space-y-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase ${
              isDark ? 'text-white/50' : 'text-slate-400'
            }`}>
              Email Address
            </label>
            <input 
              type="email" 
              className={`w-full rounded-full py-3.5 px-5 text-sm focus:outline-none transition-all font-light tracking-wide border ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/20 focus:border-white/30' 
                  : 'bg-white border-slate-200 text-slate-950 placeholder-slate-300 focus:border-slate-400'
              }`}
              placeholder="name@example.com"
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className={`block text-[10px] font-bold tracking-widest uppercase ${
              isDark ? 'text-white/50' : 'text-slate-400'
            }`}>
              Password
            </label>
            <input 
              type="password" 
              className={`w-full rounded-full py-3.5 px-5 text-sm focus:outline-none transition-all font-light tracking-wide border ${
                isDark 
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-white/20 focus:border-white/30' 
                  : 'bg-white border-slate-200 text-slate-950 placeholder-slate-300 focus:border-slate-400'
              }`}
              placeholder="Minimum 8 characters, capitalization & digit"
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
            
            {form.password && (
              <div className="pt-2 space-y-1.5 px-1">
                <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                  <div 
                    className={`h-full transition-all duration-300 ${strength.color}`} 
                    style={{ width: `${strength.score}%` }}
                  ></div>
                </div>
                <p className={`text-[10px] font-medium tracking-wide ${
                  form.password.length >= 8 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) 
                    ? 'text-[#5ca122] dark:text-[#96f940]' 
                    : (isDark ? 'text-white/50' : 'text-slate-400')
                }`}>
                  {strength.text}
                </p>
              </div>
            )}
          </div>

          {/* Action Call Button  */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-slate-950 text-white dark:bg-[#96f940] dark:text-slate-950 font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all duration-300 active:scale-[0.99] disabled:opacity-40 flex justify-center items-center gap-1.5 hover:opacity-90"
          >
            <span>{loading ? 'Generating Infrastructure...' : 'Get Started'}</span>
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
          Already verified on the network?{' '}
          <Link to="/login" className="text-[#5ca122] dark:text-[#96f940] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}