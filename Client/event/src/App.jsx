import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import EventListing from './pages/EventListing';
import EventDetails from './pages/EventDetails';
import MyRegistrations from './pages/MyRegistrations';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
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

  return (
    <div className="w-full sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#0074e8]/10">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Premium Aeline Style Brand Identity */}
        <div className="flex items-center space-x-2.5 flex-shrink-0">
          <svg className="h-6 text-white fill-current" viewBox="0 0 24 24" style={{ transform: 'rotate(-10deg)' }}>
            <path d="M12 2L2 22h4l6-12 6 12h4L12 2zm0 6l4.5 9h-9L12 8z" />
          </svg>
          <Link to="/" className="text-xl font-bold tracking-tight text-white font-sans">
            Aeline <span className="text-[#96f940] font-light">Pathway</span>
          </Link>
        </div>

        {/* Clean, Capitalized Minimalist Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-widest uppercase">
          <Link 
            to="/" 
            className={`transition-colors duration-200 hover:text-white ${
              isActive('/') ? 'text-white font-semibold' : 'text-white/75'
            }`}
          >
            Home
          </Link>
          
          <Link 
            to="/" 
            className="text-white/75 transition-colors duration-200 hover:text-white"
          >
            Services
          </Link>

          {isAuthenticated && (
            <Link 
              to="/my-registrations" 
              className={`transition-colors duration-200 hover:text-white ${
                isActive('/my-registrations') ? 'text-white font-semibold' : 'text-white/75'
              }`}
            >
              My Registrations
            </Link>
          )}
        </div>

        {/* Premium Geometric Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-white/90 hover:text-white text-xs font-semibold tracking-wider uppercase px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-[#96f940] text-slate-950 hover:bg-[#86e236] px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center gap-1.5"
              >
                Get Started
                <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Layout */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white/90 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0060c4] border-t border-white/10 px-6 py-6 space-y-4 flex flex-col shadow-xl">
          <Link to="/" className={`text-sm font-medium tracking-wider uppercase ${isActive('/') ? 'text-[#96f940]' : 'text-white'}`}>Home</Link>
          <Link to="/" className="text-sm font-medium tracking-wider uppercase text-white/80">Services</Link>
          {isAuthenticated ? (
            <>
              <Link to="/my-registrations" className={`text-sm font-medium tracking-wider uppercase ${isActive('/my-registrations') ? 'text-[#96f940]' : 'text-white'}`}>My Registrations</Link>
              <button onClick={handleLogout} className="w-full text-center bg-white/10 text-white py-3 rounded-full text-sm font-semibold uppercase tracking-wider">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/login" className="w-full text-center border border-white/20 text-white py-3 rounded-full text-sm font-medium uppercase tracking-wider">Login</Link>
              <Link to="/register" className="w-full text-center bg-[#96f940] text-slate-950 py-3 rounded-full text-sm font-bold uppercase tracking-wider">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      {/* Premium Deep Blue Radial Gradient Backdrop Layout */}
      <div className="min-h-screen flex flex-col justify-between antialiased font-sans bg-[#0060c4] bg-radial-[circle_at_top,_var(--tw-gradient-stops)] from-[#0178f0] via-[#0057b3] to-[#003b7a] text-white">
        
        <div>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          
          <main className="relative w-full max-w-7xl mx-auto px-6 pt-16 pb-24">
            <Routes>
              <Route path="/" element={<EventListing isDarkMode={true} />} />
              <Route path="/events/:id" element={<EventDetails isAuthenticated={isAuthenticated} isDarkMode={true} />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} isDarkMode={true} />} />
              <Route path="/register" element={<Register isDarkMode={true} />} />
              <Route path="/my-registrations" element={<MyRegistrations isDarkMode={true} />} />
            </Routes>
          </main>
        </div>

        {/* Minimalist Corporate Footer */}
        <footer className="border-t border-white/10 py-12 px-6 text-sm text-white/60 bg-[#002f63]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-light">© 2026 Pathway Platform. Powered by Aeline Infrastructure.</p>
            <div className="flex space-x-8 font-medium tracking-wide">
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}