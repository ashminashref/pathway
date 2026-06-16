import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register({ isDarkMode }) {
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
      await api.post('register', form);
      navigate('/login');
    } catch (err) {
      const backendError = err.response?.data?.password?.[0] || err.response?.data?.username?.[0] || 'Registration failed.';
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, text: '', color: 'bg-slate-300' };
    let points = 0;
    if (pwd.length >= 8) points++;
    if (/[A-Z]/.test(pwd)) points++;
    if (/[0-9]/.test(pwd)) points++;

    if (points === 1) return { score: 33, text: 'Weak (Add capital letters & numbers)', color: 'bg-rose-500' };
    if (points === 2) return { score: 66, text: 'Medium (Add numbers or capital letters)', color: 'bg-amber-500' };
    return { score: 100, text: 'Strong password', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div className={`min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090d16]' : 'bg-slate-50'
    }`}>
      <div className={`w-full max-w-md border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm ${
        isDarkMode ? 'bg-[#0f172a]/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-1.5 text-center">
          <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Register
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Create a new account to join upcoming platform events.
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
              placeholder="Choose a username"
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
            />
          </div>

          <div className="space-y-1">
            <label className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address
            </label>
            <input 
              type="email" 
              className={`w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-amber-500 transition-all ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="name@example.com"
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
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
              placeholder="Minimum 8 characters, capital & digit"
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
            
            {form.password && (
              <div className="pt-2 space-y-1.5">
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${strength.color}`} 
                    style={{ width: `${strength.score}%` }}
                  ></div>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{strength.text}</p>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-amber-400 transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className={`border-t pt-4 text-center text-xs ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-500'}`}>
          Already have an account?{' '}
          <Link to="/login" className="text-amber-500 hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}