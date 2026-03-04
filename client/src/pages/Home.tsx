import Hero from '../components/Hero';
import ClubCard from '../components/ClubCard';
import { Sparkle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import clubImg from '../assets/club.png';
import djImg from '../assets/dj.png';

// Featured Data
const FEATURED_CLUBS = [
    {
        id: '1',
        name: 'The Vault',
        location: 'Mumbai, BKC',
        rating: 4.8,
        description: 'Elite techno sanctuary with a custom Funktion-One sound system. Experience the underground.',
        image: clubImg,
        isVerified: true
    },
    {
        id: '2',
        name: 'Neon Sky',
        location: 'Bangalore, Indiranagar',
        rating: 4.5,
        description: 'Breathtaking rooftop views with a futuristic cocktail menu and deep house beats.',
        image: djImg,
        isVerified: true
    }
];

function Home() {
    return (
        <div className="min-h-screen bg-void-black">
            <main>
                <Hero />

                {/* Featured Section */}
                <section className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-none border border-hot-pink/50 bg-hot-pink/10">
                                    <Sparkle weight="fill" className="text-hot-pink" />
                                    <span className="text-hot-pink font-mono text-[10px] font-black uppercase tracking-[0.2em]">Featured Drops</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter uppercase leading-none">
                                    LIVE IN <span className="text-neon-slime underline decoration-wavy underline-offset-8">DEMAND</span>
                                </h2>
                            </div>
                            <Link to="/clubs" className="text-neon-slime font-mono font-bold hover:text-white transition-all flex items-center gap-2 group">
                                VIEW ALL CLUBS <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {FEATURED_CLUBS.map((club) => (
                                <ClubCard key={club.id} {...club} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Qrazy Section */}
                <section className="py-24 bg-neon-slime text-void-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-16">
                            <div>
                                <h3 className="text-4xl font-display font-black uppercase italic leading-none mb-4">NO SCAMS</h3>
                                <p className="font-mono text-sm leading-relaxed border-t-2 border-void-black pt-4">
                                    Every pass is cryptographically verified. Promoters can't double-sell or fake QR codes. Your entry is 100% guaranteed.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display font-black uppercase italic leading-none mb-4">GUESTLIST++</h3>
                                <p className="font-mono text-sm leading-relaxed border-t-2 border-void-black pt-4">
                                    Stop waiting for a text back. Browse, buy, and get your QR instantly. The smoothest check-in you've ever experienced.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display font-black uppercase italic leading-none mb-4">RESALE PK</h3>
                                <p className="font-mono text-sm leading-relaxed border-t-2 border-void-black pt-4">
                                    Plans changed? List your pass for resale directly in the app. Safe for the buyer, easy for you. Platform-verified transfer.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 relative overflow-hidden text-center bg-void-black">
                    <div className="relative z-10 px-4">
                        <h2 className="text-5xl md:text-9xl font-display font-black text-white italic tracking-tighter uppercase mb-12">
                            READY TO <span className="holographic-text">QRAZY?</span>
                        </h2>
                        <Link to="/clubs" className="btn-primary inline-flex items-center gap-4 text-2xl px-12 py-6 border-b-8 border-r-8">
                            FIND A NIGHT <ArrowRight weight="bold" />
                        </Link>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-neon-slime/10 blur-[150px] -z-0" />
                </section>
            </main>
        </div>
    );
}

export default Home;
