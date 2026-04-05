import { ArrowRight, Ticket, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

export default function Hero() {
    // Deterministic bit-mask for background noise (100% pure & idempotent)
    const heroNoise = Array.from({ length: 64 }).map((_, i) => (i * 13 + 7) % 2 === 0);

    return (
        <div className="relative isolate bg-void-black overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImg}
                    alt="Nightlife Background"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-void-black via-transparent to-void-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/40 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Column: Copy */}
                <div className="text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-none border border-neon-slime/50 bg-neon-slime/10 shadow-[4px_4px_0px_0px_#FF00FF]"
                    >
                        <Sparkle weight="fill" className="text-neon-slime animate-spin-slow" />
                        <span className="text-neon-slime font-mono text-xs font-bold uppercase tracking-widest">The Future of Nightlife Access</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl sm:text-8xl font-display font-black tracking-tighter text-white mb-6 leading-[0.85] italic uppercase"
                    >
                        Don't just <br />
                        <span className="text-neon-slime">party.</span> <br />
                        Owned the <br />
                        <span className="text-hot-pink">Access.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-xl text-brand-gray/80 font-mono max-w-lg leading-relaxed mb-10 border-l-4 border-neon-slime pl-6"
                    >
                        The only marketplace for verified club passes. <span className="text-white font-bold">Secure QR entry.</span> Zero scams. Pure energy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 items-start"
                    >
                        <Link to="/clubs" className="btn-primary group flex items-center gap-3 text-xl">
                            <Ticket size={28} weight="fill" className="group-hover:rotate-12 transition-transform" />
                            GET PASSES
                        </Link>
                        <Link to="/clubs" className="px-8 py-5 font-mono font-bold text-white hover:text-neon-slime transition-colors flex items-center gap-2 group border-2 border-white/10 hover:border-neon-slime/50">
                            EXPLORE CLUBS <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex items-center gap-8 text-brand-gray/40 font-mono text-xs uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-neon-slime" />
                            VERIFIED ONLY
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-hot-pink" />
                            NO SCREENSHOTS
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Visual Preview */}
                <div className="relative hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative z-10"
                    >
                        {/* Mock Pass UI */}
                        <div className="w-80 ml-auto glass-panel p-6 border-neon-slime/30 shadow-slime-glow transform hover:scale-105 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <div className="w-8 h-8 bg-neon-slime flex items-center justify-center text-void-black">
                                    <Sparkle weight="fill" />
                                </div>
                                <span className="font-mono text-[10px] text-brand-gray/60 uppercase">Active Pass #8892</span>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-display font-black text-white italic leading-none mb-1">ULTRA PINK</h3>
                                <p className="font-mono text-xs text-hot-pink uppercase">Ladies Entry • The Vault</p>
                            </div>
                            <div className="aspect-square bg-white p-3 mb-4">
                                <div className="w-full h-full border-2 border-void-black flex flex-wrap opacity-20">
                                    {heroNoise.map((isActive, i) => (
                                        <div key={i} className={`w-[12.5%] h-[12.5%] ${isActive ? 'bg-void-black' : 'bg-transparent'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-center font-mono text-[10px] text-white tracking-[0.2em] font-black italic">SCAN FOR ADMISSION</p>
                        </div>

                        {/* Secondary Card */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-10 -left-10 w-64 glass-panel p-4 border-hot-pink/30 shadow-pink-glow z-20"
                        >
                            <p className="text-[10px] font-mono text-brand-gray/60 uppercase mb-2">Next Event</p>
                            <h4 className="font-display font-black text-white uppercase text-xl mb-1">CYBER DISCO</h4>
                            <p className="text-xs text-neon-slime font-mono">Starts in 04:20:12</p>
                        </motion.div>
                    </motion.div>

                    {/* Gradient Blow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-hot-pink/20 blur-[120px] rounded-full -z-10 animate-pulse" />
                </div>
            </div>
        </div>
    );
}
