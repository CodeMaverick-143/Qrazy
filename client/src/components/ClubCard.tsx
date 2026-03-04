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
            {/* Image Section */}
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
                    {rating} ★
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-display font-black text-white group-hover:text-neon-slime transition-colors">
                        {name}
                    </h3>
                </div>

                <div className="flex items-center gap-1 text-brand-gray/60 text-xs font-mono mb-4">
                    <MapPin weight="fill" className="text-hot-pink" />
                    {location}
                </div>

                <p className="text-sm text-brand-gray/80 line-clamp-2 mb-6 font-sans">
                    {description}
                </p>

                <Link
                    to={`/event/${id}`}
                    className="flex items-center justify-between w-full font-mono font-bold text-neon-slime group/btn uppercase tracking-tighter text-sm"
                >
                    <span>View Passes</span>
                    <div className="w-8 h-8 rounded-full border border-neon-slime/30 flex items-center justify-center group-hover/btn:bg-neon-slime group-hover/btn:text-void-black transition-all">
                        <ArrowRight weight="bold" />
                    </div>
                </Link>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-hot-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </div>
    );
}
