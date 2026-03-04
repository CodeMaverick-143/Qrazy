import { Ticket, ClockCounterClockwise, ArrowSquareOut, IdentificationCard } from '@phosphor-icons/react';

const MOCK_PASSES = [
    {
        id: 'pass_123',
        event: 'MIDNIGHT MAYHEM',
        club: 'The Vault, Mumbai',
        date: 'Oct 24, 2024',
        type: 'VIP Lounge',
        status: 'Active',
        qrValue: 'QRAZY-PASS-778899'
    }
];

export default function Profile() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: User Info */}
                <div className="lg:w-1/3">
                    <div className="glass-panel p-8 mb-8 border-neon-slime/20">
                        <div className="w-24 h-24 bg-neon-slime flex items-center justify-center text-void-black mb-6 shadow-slime-glow mx-auto">
                            <IdentificationCard size={48} weight="fill" />
                        </div>
                        <h2 className="text-3xl font-display font-black text-white text-center uppercase tracking-tighter mb-2">
                            YAANNKO
                        </h2>
                        <p className="text-brand-gray/60 text-center font-mono text-xs uppercase mb-8">
                            NIGHTLIFE ENTHUSIAST • MEMBER SINCE OCT '24
                        </p>

                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-4 bg-white/5 font-mono font-bold text-sm text-neon-slime hover:bg-neon-slime/10 transition-all border-l-4 border-neon-slime">
                                <span>ACTIVE PASSES</span>
                                <Ticket weight="fill" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-transparent font-mono font-bold text-sm text-brand-gray/60 hover:text-white transition-all">
                                <span>ORDER HISTORY</span>
                                <ClockCounterClockwise weight="bold" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: Passes Display */}
                <div className="lg:w-2/3">
                    <h3 className="text-2xl font-display font-black text-white uppercase mb-8 tracking-tight">Active Passes</h3>

                    <div className="space-y-6">
                        {MOCK_PASSES.map((pass) => (
                            <div key={pass.id} className="relative overflow-hidden flex flex-col md:flex-row glass-panel border-hot-pink/20 hover:border-hot-pink transition-all group">
                                {/* Left Section: Card Info */}
                                <div className="p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-[10px] font-mono font-black text-hot-pink uppercase tracking-[0.2em]">Live Pass</span>
                                            <h4 className="text-3xl font-display font-black text-white tracking-tighter italic">
                                                {pass.event}
                                            </h4>
                                        </div>
                                        <div className="px-2 py-1 bg-neon-slime/10 border border-neon-slime/30 text-neon-slime font-mono text-[10px] font-black uppercase">
                                            {pass.status}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <p className="text-[10px] font-mono uppercase text-brand-gray/40 mb-1">Club</p>
                                            <p className="font-mono font-bold text-white text-sm uppercase">{pass.club}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono uppercase text-brand-gray/40 mb-1">Date</p>
                                            <p className="font-mono font-bold text-white text-sm uppercase">{pass.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono uppercase text-brand-gray/40 mb-1">Pass Type</p>
                                            <p className="font-mono font-bold text-hot-pink text-sm uppercase">{pass.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono uppercase text-brand-gray/40 mb-1">Pass ID</p>
                                            <p className="font-mono font-bold text-white text-sm uppercase">#{pass.id.split('_')[1]}</p>
                                        </div>
                                    </div>

                                    <button className="flex items-center gap-2 text-xs font-mono font-black text-brand-gray/40 hover:text-white transition-colors uppercase">
                                        Resell Pass <ArrowSquareOut />
                                    </button>
                                </div>

                                {/* Right Section: QR (Simulation) */}
                                <div className="w-full md:w-64 bg-white/5 border-l border-white/5 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                                    {/* Party Theme QR Mockup */}
                                    <div className="relative w-48 h-48 bg-white p-3 shadow-[0_0_30px_rgba(204,255,0,0.2)] group-hover:shadow-[0_0_40px_rgba(255,0,255,0.3)] transition-all duration-500">
                                        <div className="w-full h-full border-2 border-void-black flex flex-wrap opacity-90">
                                            {[
                                                1, 1, 0, 0, 0, 1, 1, 1,
                                                1, 0, 0, 0, 1, 0, 1, 0,
                                                1, 0, 1, 0, 0, 0, 0, 0,
                                                1, 0, 0, 1, 0, 1, 1, 0,
                                                1, 0, 1, 1, 0, 1, 0, 1,
                                                0, 0, 0, 1, 0, 0, 0, 0,
                                                1, 0, 1, 1, 0, 0, 0, 0,
                                                0, 0, 1, 1, 0, 0, 1, 0
                                            ].map((val, i) => (
                                                <div key={i} className={`w-[12.5%] h-[12.5%] ${val ? 'bg-void-black' : 'bg-transparent'}`} />
                                            ))}
                                        </div>

                                        {/* Neon Overlays for 'Party' feel */}
                                        <div className="absolute inset-0 border-2 border-neon-slime/20 pointer-events-none" />
                                        <div className="absolute -inset-1 border border-hot-pink/10 pointer-events-none animate-pulse" />
                                    </div>
                                    <p className="text-[10px] font-mono font-black text-neon-slime mt-6 tracking-[0.3em] text-glow-slime">VERIFIED ENTRY ONLY</p>

                                    {/* Scan Animation Overlay */}
                                    <div className="absolute left-0 top-0 w-full h-1 bg-neon-slime/50 shadow-slime-glow animate-[bounce_3s_infinite]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
