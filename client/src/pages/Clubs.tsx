import { MagnifyingGlass, Funnel } from '@phosphor-icons/react';
import ClubCard from '../components/ClubCard';

// Mock Data
const CLUBS = [
    {
        id: '1',
        name: 'The Vault',
        location: 'Mumbai, BKC',
        rating: 4.8,
        description: 'Elite techno sanctuary with a custom Funktion-One sound system. Experience the underground.',
        image: 'https://images.unsplash.com/photo-1571266028243-e4bb33394833?auto=format&fit=crop&q=80&w=800', // Temporary fallback or use generated if path known
        isVerified: true
    },
    {
        id: '2',
        name: 'Neon Sky',
        location: 'Bangalore, Indiranagar',
        rating: 4.5,
        description: 'Breathtaking rooftop views with a futuristic cocktail menu and deep house beats.',
        image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800',
        isVerified: true
    },
    {
        id: '3',
        name: 'Chaos Theory',
        location: 'Delhi, Mehrauli',
        rating: 4.9,
        description: 'Where jungle vibes meet cyberpunk electronics. The wildest night in the capital.',
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800',
        isVerified: false
    }
];

export default function Clubs() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-display font-black text-white italic tracking-tighter mb-4">
                    DISCOVER <span className="text-neon-slime">CHAOS</span>
                </h1>
                <p className="text-brand-gray/60 font-mono text-lg max-w-2xl">
                    Browse verified clubs across India. Secure your entry. Skip the queue.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
                <div className="relative flex-grow">
                    <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray/40" size={24} />
                    <input
                        type="text"
                        placeholder="Search clubs by name or city..."
                        className="w-full bg-void-black border-2 border-brand-gray/10 focus:border-neon-slime/50 focus:shadow-slime-glow outline-none py-4 pl-14 pr-4 transition-all font-mono text-white"
                    />
                </div>
                <button className="flex items-center gap-2 bg-brand-gray/5 border-2 border-brand-gray/10 px-8 py-4 font-mono font-bold text-white hover:bg-brand-gray/10 transition-all">
                    <Funnel size={20} />
                    FILTERS
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CLUBS.map((club) => (
                    <ClubCard key={club.id} {...club} />
                ))}
            </div>
        </div>
    );
}
