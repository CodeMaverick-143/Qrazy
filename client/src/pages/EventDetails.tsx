import { useParams, Link } from 'react-router-dom';
import { Ticket, Calendar, Clock, MapPin, CaretLeft, CheckCircle } from '@phosphor-icons/react';

const PASS_TYPES = [
    { id: 'p1', name: 'General Entry', price: 1500, description: 'Single entry access to the main floor.', slots: 50 },
    { id: 'p2', name: 'Stag Entry', price: 2500, description: 'Single entry for males. Limited availability.', slots: 20 },
    { id: 'p3', name: 'Couple Entry', price: 3000, description: 'Entry for one male and one female companion.', slots: 15 },
    { id: 'p4', name: 'VIP Lounge', price: 15000, description: 'Reserved table, bottle service, and private access.', slots: 5 }
];

export default function EventDetails() {
    const { id } = useParams();

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
                            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200"
                            className="w-full h-full object-cover"
                            alt="Event Banner"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <h1 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter mb-2">
                                MIDNIGHT <span className="text-hot-pink">MAYHEM</span>
                            </h1>
                            <div className="flex flex-wrap gap-4 text-brand-gray/80 font-mono text-sm">
                                <div className="flex items-center gap-1">
                                    <Calendar className="text-neon-slime" />
                                    Tomorrow night
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="text-neon-slime" />
                                    10:00 PM onwards
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="text-hot-pink" />
                                    The Vault, Mumbai
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mb-12">
                        <h2 className="text-2xl font-display font-black text-white uppercase mb-4 tracking-tight">About the Night</h2>
                        <p className="text-brand-gray/70 font-sans leading-relaxed text-lg">
                            Get ready for the most anticipated electronic night of the month. Featuring a secret lineup of international techno heavyweights, immersive 3D mapping, and a vibe that goes until dawn. Strictly 21+. Proper club attire requested.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-black text-white uppercase mb-6 tracking-tight">Policies</h2>
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
                            Select Passes
                        </h3>

                        <div className="space-y-4 mb-8">
                            {PASS_TYPES.map((pass) => (
                                <div key={pass.id} className="p-4 bg-void-black border border-brand-gray/10 hover:border-neon-slime transition-colors group cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-mono font-black text-white uppercase">{pass.name}</h4>
                                        <span className="text-neon-slime font-mono font-bold">₹{pass.price}</span>
                                    </div>
                                    <p className="text-[10px] text-brand-gray/60 font-mono uppercase tracking-tighter mb-2">{pass.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-brand-gray/40 font-mono uppercase">{pass.slots} slots left</span>
                                        <button className="text-[10px] font-black uppercase text-neon-slime px-2 py-1 border border-neon-slime hover:bg-neon-slime hover:text-void-black transition-all">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-brand-gray/10 pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-brand-gray/60 font-mono text-sm uppercase">Total Amount</span>
                                <span className="text-2xl font-display font-black text-white tracking-tight">₹0.00</span>
                            </div>
                            <button className="w-full btn-primary bg-hot-pink border-neon-slime hover:bg-white text-void-black text-center">
                                Purchase Now
                            </button>
                            <p className="text-[10px] text-center text-brand-gray/40 mt-4 font-mono">
                                TAXES AND FEES CALCULATED AT CHECKOUT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
