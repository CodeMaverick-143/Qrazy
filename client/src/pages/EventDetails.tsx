import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, CaretLeft, CheckCircle, SpinnerGap } from '@phosphor-icons/react';
import { useAuth } from '../hooks/useAuth';
import type { Club, PassType } from '../types';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, session } = useAuth();
    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState<string | null>(null);

    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setClub(data);
                }
            } catch (error) {
                console.error('Failed to fetch club details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClubDetails();
    }, [id]);

    const handlePurchase = async (passTypeId: string) => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!session) return;

        setPurchasing(passTypeId);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/passes/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ passTypeId })
            });

            if (response.ok) {
               
                navigate('/profile');
            } else {
                const error = await response.json();
                alert(error.message || 'Purchase failed');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Something went wrong. High frequency trade failed.');
        } finally {
            setPurchasing(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <SpinnerGap className="text-neon-slime animate-spin" size={48} />
                <span className="font-mono text-xs text-brand-gray/40 uppercase tracking-widest">Decoding Club Signals...</span>
            </div>
        );
    }

    if (!club) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl font-display font-black text-white uppercase italic mb-4 text-glow-pink">Sector Redacted</h2>
                <p className="text-brand-gray/60 font-mono mb-8">This club is currently offline or doesn't exist.</p>
                <Link to="/clubs" className="btn-secondary">Back to Map</Link>
            </div>
        );
    }

    // Assuming first event for now as per schema logic
    const event = club.events?.[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/clubs" className="flex items-center gap-2 text-brand-gray/60 hover:text-neon-slime font-mono text-sm mb-8 transition-colors group">
                <CaretLeft weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                BACK TO DISCOVER
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Event Info */}
                <div className="lg:col-span-2">
                    <div className="relative h-[400px] overflow-hidden rounded-none border-2 border-neon-slime/20 shadow-lg mb-8">
                        <img
                            src={club.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200"}
                            className="w-full h-full object-cover"
                            alt="Event Banner"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter mb-2 uppercase">
                                {event?.title || club.name}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-brand-gray/80 font-mono text-sm">
                                {event && (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="text-neon-slime" />
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="text-neon-slime" />
                                            10:00 PM onwards
                                        </div>
                                    </>
                                )}
                                <div className="flex items-center gap-1">
                                    <MapPin className="text-hot-pink" />
                                    {club.city}
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mb-12">
                        <h2 className="text-2xl font-display font-black text-white uppercase mb-4 tracking-tight">Transmission Details</h2>
                        <p className="text-brand-gray/70 font-sans leading-relaxed text-lg">
                            {club.description || "The city's hottest underground sanctuary. Experience pure sonic chaos. Strictly 21+. Proper club attire requested."}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-black text-white uppercase mb-6 tracking-tight">Security Protocols</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'No screenshots allowed for entry',
                                'Pass once scanned is invalid',
                                'Refunds only if event is cancelled',
                                'Club rules apply for dress code'
                            ].map((policy, i) => (
                                <div key={i} className="flex items-center gap-2 p-4 bg-white/5 border border-white/10 text-brand-gray/80 font-mono text-sm">
                                    <CheckCircle weight="fill" className="text-neon-slime" />
                                    {policy}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right: Pass Selection */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-8 sticky top-32 border-hot-pink/20 shadow-pink-glow">
                        <h3 className="text-2xl font-display font-black text-white uppercase mb-6 flex items-center gap-2">
                            <Ticket className="text-hot-pink" weight="fill" />
                            Secure Entrance
                        </h3>

                        {!event || !event.passTypes || event.passTypes.length === 0 ? (
                            <div className="py-8 text-center border border-white/5 bg-white/5">
                                <p className="text-brand-gray/40 font-mono text-xs uppercase">No passes currently listed.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {event.passTypes.map((pass: PassType) => (
                                    <div key={pass.id} className="p-4 bg-void-black border border-brand-gray/10 hover:border-neon-slime transition-colors group">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-mono font-black text-white uppercase">{pass.name}</h4>
                                            <span className="text-neon-slime font-mono font-bold">₹{pass.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-[10px] text-brand-gray/40 font-mono uppercase">
                                                {pass.capacity > 0 ? `${pass.capacity} slots left` : 'SOLD OUT'}
                                            </span>
                                            <button
                                                disabled={pass.capacity <= 0 || purchasing === pass.id}
                                                onClick={() => handlePurchase(pass.id)}
                                                className={`text-[10px] font-black uppercase px-4 py-2 border transition-all ${pass.capacity > 0
                                                    ? 'border-neon-slime text-neon-slime hover:bg-neon-slime hover:text-void-black'
                                                    : 'border-white/10 text-white/10 cursor-not-allowed'
                                                    }`}
                                            >
                                                {purchasing === pass.id ? 'BUYING...' : pass.capacity > 0 ? 'PURCHASE' : 'FULL'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-[10px] text-center text-brand-gray/40 font-mono uppercase max-w-[200px] mx-auto leading-relaxed">
                                Cryptographically verified entry • Instant QR generation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
