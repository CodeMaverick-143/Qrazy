import { Star, MapPin, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface ClubCardProps {
    id: string;
    name: string;
    location: string;
    rating: number;
    image: string;
    description: string;
    isVerified?: boolean;
}

export default function ClubCard({ id, name, location, rating, image, description, isVerified }: ClubCardProps) {
    return (
        <div className="glass-panel group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 border-neon-slime/20 hover:border-neon-slime shadow-lg hover:shadow-slime-glow">
            {}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-transparent opacity-60" />

                {isVerified && (
                    <div className="absolute top-4 left-4 bg-neon-slime text-void-black text-[10px] font-black uppercase px-2 py-1 flex items-center gap-1 shadow-slime-glow">
                        <Star weight="fill" size={12} />
                        Verified Club
                    </div>
                )}

                <div className="absolute top-4 right-4 bg-void-black/80 backdrop-blur-md text-neon-slime border border-neon-slime/30 px-2 py-1 text-xs font-mono font-bold">
                    {}
                </div>
            </div>

            {}
            <div className="p-6">
                <Link to={`/event/${id}`} className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase group-hover:text-neon-slime transition-colors">
                        {name}
                    </h3>
                </Link>
                <div className="flex items-center gap-4 text-brand-gray/40 font-mono text-[10px] uppercase mb-4 tracking-widest leading-none">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-hot-pink" />
                        {location}
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="text-neon-slime" weight="fill" />
                        {rating}
                    </div>
                </div>
                <p className="text-brand-gray/60 font-mono text-xs leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>
                <Link
                    to={`/event/${id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-white font-mono font-bold text-[10px] uppercase group-hover:bg-neon-slime group-hover:text-void-black transition-all group-hover:border-neon-slime"
                >
                    Infiltrate <ArrowRight />
                </Link>
            </div>

            {}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-hot-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </div>
    );
}
