import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, SpinnerGap, ArrowRight, Sparkle, CaretRight } from '@phosphor-icons/react';
import LocationSelector from '../components/LocationSelector';
import type { Event } from '../types';

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('PUNE');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append('search', searchQuery);
                if (selectedCity !== 'ALL') params.append('city', selectedCity);

                const response = await fetch(`${import.meta.env.VITE_API_URL}/events?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchEvents, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery, selectedCity]);

    const dates = [
        { label: 'Today', value: new Date().toISOString().split('T')[0] },
        { label: 'Tomorrow', value: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
        { label: 'This Weekend', value: 'weekend' },
        { label: 'Pick Date', value: 'custom' },
    ];

    const highlights = events.slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-neon-slime uppercase tracking-[0.4em] mb-4">
                        <Sparkle weight="fill" /> Nightlife Protocol v2.0
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-black text-white italic tracking-tighter uppercase leading-[0.8]">
                        EVENT <span className="text-neon-slime glitch">DROPS</span>
                    </h1>
                </div>
                <LocationSelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
            </div>

            {}
            <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xs font-mono font-black text-brand-gray/40 uppercase tracking-[0.3em]">
                        Weekend High-Frequency Highlights
                    </h2>
                    <div className="flex gap-2">
                        <div className="w-12 h-1 bg-neon-slime" />
                        <div className="w-4 h-1 bg-white/10" />
                        <div className="w-4 h-1 bg-white/10" />
                    </div>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                    {highlights.map((event) => (
                        <div key={`high-${event.id}`} className="min-w-[350px] md:min-w-[500px] h-[350px] relative overflow-hidden group snap-center border border-white/5">
                            <img
                                src={event.club.image || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200"}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                alt={event.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="px-2 py-1 bg-neon-slime text-void-black font-mono text-[10px] uppercase font-black mb-2 inline-block">
                                    {event.club.city} • FEATURED
                                </span>
                                <h3 className="text-3xl md:text-4xl font-display font-black text-white italic tracking-tighter uppercase mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-brand-gray/60 font-mono text-xs uppercase mb-4">
                                    {event.club.name} • {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}
                                </p>
                                <Link to={`/event/${event.clubId}`} className="inline-flex items-center gap-4 text-neon-slime font-mono font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                    Secure Access <CaretRight weight="bold" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="flex flex-col lg:flex-row gap-12">
                {}
                <div className="lg:w-64 shrink-0">
                    <div className="sticky top-32 space-y-8">
                        <div>
                            <h3 className="text-[10px] font-mono font-black text-brand-gray/40 uppercase tracking-[0.3em] mb-6">Discovery Window</h3>
                            <div className="space-y-2">
                                {dates.map((date) => (
                                    <button
                                        key={date.value}
                                        onClick={() => setSelectedDate(date.value)}
                                        className={`w-full flex justify-between items-center p-4 border transition-all ${selectedDate === date.value
                                            ? 'bg-neon-slime/10 border-neon-slime text-neon-slime'
                                            : 'bg-white/5 border-white/10 text-brand-gray/60 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="font-mono text-[10px] uppercase font-bold">{date.label}</span>
                                        <CaretRight weight="bold" size={12} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/10">
                            <h4 className="text-[10px] font-mono font-black text-neon-slime uppercase mb-2">VIP Portal</h4>
                            <p className="text-[9px] font-mono text-brand-gray/40 uppercase leading-relaxed mb-4">
                                Access localized table bookings and private sector entries.
                            </p>
                            <button className="w-full py-2 bg-white/5 border border-white/10 hover:border-neon-slime transition-all text-white font-mono text-[9px] uppercase font-black">
                                Switch to VIP
                            </button>
                        </div>
                    </div>
                </div>

                {}
                <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-8">
                        <MagnifyingGlass className="text-brand-gray/40" size={20} />
                        <input
                            type="text"
                            placeholder="SEARCH BY ARTIST, GENRE, OR ENERGY..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-b border-white/10 py-2 font-mono text-xs text-white focus:outline-none focus:border-neon-slime transition-all uppercase"
                        />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <SpinnerGap className="text-neon-slime animate-spin" size={48} />
                            <span className="font-mono text-xs text-brand-gray/40 uppercase tracking-widest">Scanning Frequencies...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {events.map((event) => (
                                <Link
                                    to={`/event/${event.clubId}`}
                                    key={event.id}
                                    className="glass-panel group border-white/5 hover:border-neon-slime/40 transition-all overflow-hidden flex flex-col"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={event.club.image || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"}
                                            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                                            alt={event.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-4 right-4 bg-void-black/80 backdrop-blur-md px-3 py-1 border border-white/10 text-white font-mono text-[10px]">
                                            {new Date(event.date).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-neon-slime font-mono text-[9px] uppercase tracking-widest mb-1">{event.club.name}</div>
                                        <h3 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase mb-4 group-hover:text-neon-slime transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex justify-between items-end">
                                            <div className="font-mono text-[10px] text-brand-gray/40 uppercase">
                                                From ₹{event.passTypes?.[0]?.price || '---'}
                                            </div>
                                            <div className="flex items-center gap-2 text-hot-pink font-mono text-[10px] font-black uppercase group-hover:translate-x-1 transition-transform">
                                                Infiltrate <ArrowRight />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
