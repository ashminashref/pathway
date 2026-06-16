import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EventListing from './pages/EventListing';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';

function Navbar({ isAuthenticated, setIsAuthenticated, theme, setTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isDark = theme === 'dark';

  return (
    <div className={`w-full sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${
      isDark ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-[#fafafa]/80 border-black/5'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        <div className="flex items-center space-x-2.5 flex-shrink-0">
          <svg className={`h-6 fill-current transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`} viewBox="0 0 24 24" style={{ transform: 'rotate(-10deg)' }}>
            <path d="M12 2L2 22h4l6-12 6 12h4L12 2zm0 6l4.5 9h-9L12 8z" />
          </svg>
          <Link to="/" className={`text-xl font-bold tracking-tight font-sans transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Aeline <span className="text-[#5ca122] dark:text-[#96f940] font-light">Pathway</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-widest uppercase">
          <Link to="/" className={`transition-colors duration-200 ${
            isActive('/') 
              ? (isDark ? 'text-white font-semibold' : 'text-slate-950 font-semibold') 
              : (isDark ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-slate-950')
          }`}>Home</Link>
          {isAuthenticated && (
            <Link to="/my-registrations" className={`transition-colors duration-200 ${
              isActive('/my-registrations') 
                ? (isDark ? 'text-white font-semibold' : 'text-slate-950 font-semibold') 
                : (isDark ? 'text-white/75 hover:text-white' : 'text-slate-600 hover:text-slate-950')
            }`}>My Registrations</Link>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-full border transition-all ${
              isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-950 hover:bg-slate-200'
            }`}
            title="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4 h-4 text-[#96f940]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-[#5ca122]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {isAuthenticated ? (
            <button onClick={handleLogout} className={`border px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-950 hover:bg-slate-100'
            }`}>Logout</button>
          ) : (
            <>
              <Link to="/login" className={`text-xs font-semibold tracking-wider uppercase px-4 py-2 transition-colors ${isDark ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}>Login</Link>
              <Link to="/register" className="bg-[#96f940] text-slate-950 hover:bg-[#86e236] px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all flex items-center gap-1.5">
                Get Started
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </Link>
            </>
          )}
        </div>

        {/*Hamburger */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2 text-xl">
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 focus:outline-none ${isDark ? 'text-white' : 'text-slate-950'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

      </nav>

      {/* Mobile  */}
      {isMenuOpen && (
        <div className={`md:hidden border-t px-6 py-6 space-y-4 flex flex-col shadow-xl ${isDark ? 'bg-[#141414] border-white/10' : 'bg-[#fafafa] border-slate-200'}`}>
          <Link to="/" className={`text-sm font-medium tracking-wider uppercase ${isDark ? 'text-white' : 'text-slate-950'}`}>Home</Link>
          <Link to="/" className={`text-sm font-medium tracking-wider uppercase ${isDark ? 'text-white/80' : 'text-slate-600'}`}>Services</Link>
          {isAuthenticated ? (
            <>
              <Link to="/my-registrations" className={`text-sm font-medium tracking-wider uppercase ${isDark ? 'text-white' : 'text-slate-950'}`}>My Registrations</Link>
              <button onClick={handleLogout} className={`w-full text-center py-3 rounded-full text-sm font-semibold uppercase ${isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-950'}`}>Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/login" className={`w-full text-center border py-3 rounded-full text-sm font-medium uppercase ${isDark ? 'border-white/20 text-white' : 'border-slate-300 text-slate-950'}`}>Login</Link>
              <Link to="/register" className="w-full text-center bg-[#96f940] text-slate-950 py-3 rounded-full text-sm font-bold uppercase">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'dark' stays identical; 'light' renders the matte-grey look

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col justify-between antialiased font-sans transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'
      }`}>
        
        <div>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} theme={theme} setTheme={setTheme} />
          
          <main className="relative w-full max-w-7xl mx-auto px-6">
            <Routes>
              <Route path="/" element={<EventListing theme={theme} />} />
              <Route path="/events/:id" element={<EventDetails isAuthenticated={isAuthenticated} theme={theme} />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} theme={theme} />} />
              <Route path="/register" element={<Register theme={theme} />} />
              <Route path="/my-registrations" element={<MyRegistrations theme={theme} />} />
            </Routes>
          </main>
        </div>

        <footer className={`border-t py-12 px-6 text-sm transition-colors duration-300 ${
          theme === 'dark' ? 'border-white/5 text-white/40 bg-[#0d0d0d]' : 'border-black/5 text-slate-500 bg-[#f4f4f4]'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-light">© 2026 Pathway Platform. Powered by Aeline Infrastructure.</p>
            <div className="flex space-x-8 font-medium tracking-wide text-xs">
              <a href="#" className="hover:underline transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:underline transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}