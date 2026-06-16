import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function EventListing() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Explicitly using the clean trailing slash endpoint
    api.get('events/')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  const featuredEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen text-white antialiased">
      
      {/* Premium Corporate Minimalist Hero Header Section */}
      <header className="max-w-4xl mx-auto text-center pt-8 pb-16 px-4 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
          Building the future of <br className="hidden sm:inline" />
          <span className="text-[#96f940]">experiences and strategy</span>
        </h1>
        <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-white/70 font-light tracking-wide">
          Browse our premium scheduled masterclasses, view detailed event specifications, and secure your access passes seamlessly.
        </p>

        {/* Minimal Search Bar Config matching reference */}
        <div className="max-w-md mx-auto pt-4">
          <div className="flex items-center bg-white/[0.06] border border-white/10 rounded-full p-2 pl-5 transition-all focus-within:border-white/30 shadow-2xl">
            <input 
              type="text" 
              placeholder="Search events by title or city..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-xs w-full py-2 focus:outline-none placeholder-white/40 text-white tracking-wide"
            />
            <button className="bg-[#96f940] hover:bg-[#86e236] font-bold text-slate-950 px-6 py-3 text-[11px] uppercase tracking-wider rounded-full transition-all duration-200 shadow-md">
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Glassmorphic Featured Grid Panel Block */}
        {!loading && events.length >= 3 && !search && (
          <div className="mb-20 space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-3">
              Featured Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[20rem]">
              
              {/* Box 1: Large Featured Card */}
              <div className="md:col-span-2 relative group overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-xl hover:bg-white/[0.09] hover:scale-[1.005]">
                <div className="space-y-3">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-slate-950 bg-[#96f940] px-2.5 py-1 rounded-full">
                    Featured Masterclass
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{featuredEvents[0].title}</h3>
                  <p className="text-xs sm:text-sm line-clamp-3 font-light text-white/70 tracking-wide max-w-2xl">{featuredEvents[0].description}</p>
                </div>
                <Link to={`/events/${featuredEvents[0].id}`} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#96f940] group-hover:underline">
                  Explore Details <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Box 2: Secondary Featured Card */}
              <div className="relative group overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-xl hover:bg-white/[0.09] hover:scale-[1.005]">
                <div className="space-y-3">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-white bg-white/10 px-2.5 py-1 rounded-full">
                    Trending Session
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white line-clamp-2">{featuredEvents[1].title}</h3>
                  <p className="text-xs line-clamp-4 font-light text-white/60 tracking-wide">{featuredEvents[1].description}</p>
                </div>
                <Link to={`/events/${featuredEvents[1].id}`} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#96f940] group-hover:underline">
                  View Space <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Box 3: Full Width Row Highlight */}
              <div className="md:col-span-3 relative group overflow-hidden rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-300 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-xl hover:bg-white/[0.09]">
                <div className="space-y-2 max-w-4xl">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-[#96f940] bg-[#96f940]/10 px-2.5 py-1 rounded-full mb-1">
                    Open Panel
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white">{featuredEvents[2].title}</h3>
                  <p className="text-xs line-clamp-2 font-light text-white/60 tracking-wide">{featuredEvents[2].description}</p>
                </div>
                <Link to={`/events/${featuredEvents[2].id}`} className="text-center font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full border border-white/20 text-white bg-white/5 hover:bg-white hover:text-slate-950 transition-all duration-200 shrink-0 shadow-sm flex items-center gap-1">
                  Secure Pass
                  <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Directory Listings Header */}
        <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-6">
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-white/40">
            All Platform Events ({filteredEvents.length})
          </h2>
        </div>

        {/* Core Content Pipeline */}
        {loading ? (
          <div className="text-center py-20 text-[13px] tracking-widest uppercase text-white/40 animate-pulse">Loading directory data...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-white/40 text-sm font-light tracking-wide">
            No active events match your current search criteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all backdrop-blur-md bg-white/[0.04] border border-white/5 hover:border-white/15 hover:bg-white/[0.07] shadow-sm group"
              >
                <div className="space-y-2.5 flex-1 min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wider text-[#96f940]">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="hidden sm:inline text-white/20">•</span>
                    <span className="text-white/50 font-normal normal-case tracking-wide">{event.location}</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight truncate text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm line-clamp-2 leading-relaxed text-white/70 font-light tracking-wide">
                    {event.description}
                  </p>
                </div>
                
                <Link 
                  to={`/events/${event.id}/`} 
                  className="w-full md:w-auto text-center font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full border border-white/20 text-white bg-white/5 hover:bg-[#96f940] hover:text-slate-950 hover:border-[#96f940] transition-all duration-200 whitespace-nowrap shadow-sm flex items-center justify-center gap-1"
                >
                  Get Tickets
                  <svg className="w-3.5 h-3.5 stroke-current opacity-0 group-hover:opacity-100 transition-opacity" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}