import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EventListing from './pages/EventListing';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';

function Navbar({ isAuthenticated, setIsAuthenticated, isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls mobile dropdown view

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // Close mobile menu whenever user clicks a link and switches pages
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="w-full px-4 pt-4 sticky top-0 z-50">
      <nav className={`max-w-7xl mx-auto rounded-xl border px-6 py-3 shadow-sm backdrop-blur-md transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#0f172a]/90 border-slate-800 text-white shadow-black/40' 
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-slate-100'
      }`}>
        <div className="flex justify-between items-center h-10">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-5 w-5 bg-amber-500 rounded-full shadow-sm"></div>
            <Link to="/" className="text-lg font-bold tracking-tight">Pathway</Link>
          </div>

          {/* Desktop Navigation View - Hidden completely on mobile screens */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              to="/" 
              className={`transition-colors duration-200 ${
                isActive('/') ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-registrations" 
                  className={`transition-colors duration-200 ${
                    isActive('/my-registrations') ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  My Registrations
                </Link>
                <button 
                  onClick={handleLogout} 
                  className={`border px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDarkMode ? 'border-slate-700 hover:border-rose-500 text-slate-300 bg-slate-900/50' : 'border-slate-200 hover:border-rose-500 text-slate-600 bg-slate-50'
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`transition-colors duration-200 ${
                    isActive('/login') ? 'text-amber-500 font-semibold' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`font-semibold px-4 py-2 rounded-lg text-xs shadow-sm transition-all duration-200 ${
                    isDarkMode ? 'bg-white text-slate-950 hover:bg-amber-400' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}

            <span className={`h-4 w-[1px] ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></span>

            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-amber-400' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          {/* Mobile Right Bar View Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-lg border transition-all ${
                isDarkMode ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-slate-600'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {/* Mobile Menu Action Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg border focus:outline-none ${
                isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Content Panel - Only visible when menu is active */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 pt-4 border-t space-y-3 flex flex-col ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <Link 
              to="/" 
              className={`py-2 text-sm font-medium ${isActive('/') ? 'text-amber-500' : 'text-slate-400'}`}
            >
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-registrations" 
                  className={`py-2 text-sm font-medium ${isActive('/my-registrations') ? 'text-amber-500' : 'text-slate-400'}`}
                >
                  My Registrations
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left bg-rose-500/10 text-rose-500 py-2.5 px-3 rounded-lg text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link 
                  to="/login" 
                  className={`w-full text-center border py-2.5 rounded-lg text-sm font-medium ${
                    isDarkMode ? 'border-slate-800 text-white bg-slate-900' : 'border-slate-200 text-slate-700 bg-slate-50'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="w-full text-center bg-amber-500 text-slate-950 py-2.5 rounded-lg text-sm font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col justify-between antialiased font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-[#090d16] text-slate-200' : 'bg-slate-50 text-slate-800'
      }`}>
        <div>
          <Navbar 
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated} 
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
          />
          <div className="relative w-full">
            <Routes>
              <Route path="/" element={<EventListing isDarkMode={isDarkMode} />} />
              <Route path="/events/:id" element={<EventDetails isAuthenticated={isAuthenticated} isDarkMode={isDarkMode} />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} isDarkMode={isDarkMode} />} />
              <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
              <Route path="/my-registrations" element={<MyRegistrations isDarkMode={isDarkMode} />} />
            </Routes>
          </div>
        </div>

        <footer className={`border-t mt-32 py-12 px-6 text-sm transition-colors duration-300 ${
          isDarkMode ? 'border-slate-900 bg-[#05070f] text-slate-500' : 'border-slate-200 bg-white text-slate-500'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 Pathway Platform. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}