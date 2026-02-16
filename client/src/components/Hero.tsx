import { ArrowRight, DiceFive } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative isolate pt-14 bg-void-black overflow-hidden min-h-screen flex items-center">
            {/* Chaotic Background */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-neon-slime to-hot-pink opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Copy */}
                <div className="text-left relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-none border border-neon-slime/50 bg-neon-slime/10 shadow-[4px_4px_0px_0px_#9D00FF]">
                        <span className="w-2 h-2 rounded-full bg-neon-slime animate-pulse"></span>
                        <span className="text-neon-slime font-mono text-xs font-bold uppercase tracking-widest">Internet Chaos Management</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tighter text-white mb-6 leading-[0.9]">
                        The plug for buying <br />
                        <span className="holographic-text">unreasonably fun</span> <br />
                        websites.
                    </h1>

                    <p className="mt-6 text-xl text-gray-400 font-mono max-w-lg leading-relaxed mb-10 border-l-2 border-hot-pink pl-6">
                        Stop buying boring .coms for your startup that doesn't exist yet. Grab a site that slaps, ship it, and <span className="text-white bg-hot-pink/20 px-1">refuse to elaborate.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                        <button className="btn-primary group flex items-center gap-3">
                            <DiceFive size={24} weight="fill" className="group-hover:rotate-180 transition-transform duration-500" />
                            Spin the Wheel
                        </button>
                        <button className="px-8 py-4 font-mono font-bold text-white hover:text-electric-cyan transition-colors flex items-center gap-2 group underline decoration-hot-pink decoration-2 underline-offset-4">
                            See the Chaos <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-void-black bg-gray-800 flex items-center justify-center text-xs overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-mono text-gray-500">
                            <span className="text-white font-bold">420+</span> sites dropped today. <br />
                            <span className="text-neon-slime">Abused lovingly by builders.</span>
                        </p>
                    </div>
                </div>

                {/* Right Column: Visuals */}
                <div className="relative hidden lg:block h-full min-h-[500px]">
                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-10 z-20"
                    >
                        <div className="w-80 bg-white rounded-lg shadow-[8px_8px_0px_0px_#9D00FF] border-2 border-void-black overflow-hidden transform rotate-3 hover:rotate-0 transition-transform">
                            <div className="bg-gray-100 border-b-2 border-void-black px-3 py-2 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
                                </div>
                                <div className="flex-1 bg-white border border-gray-300 h-5 rounded-sm"></div>
                            </div>
                            <div className="p-4 bg-void-black text-center min-h-[300px] flex flex-col items-center justify-center relative">
                                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26brv0ThflsUCq5wI/giphy.gif')] opacity-20 bg-cover bg-center"></div>
                                <div className="relative z-10 bg-void-black/80 p-4 border border-neon-slime backdrop-blur-sm">
                                    <h3 className="font-display text-3xl text-white mb-2">GOLDEN TICKET</h3>
                                    <p className="font-mono text-neon-slime text-sm">ACCESS GRANTED</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-20 left-10 z-10"
                    >
                        <div className="w-64 bg-hot-pink rounded-lg shadow-[8px_8px_0px_0px_#CCFF00] border-2 border-void-black p-4 transform -rotate-6">
                            <h4 className="font-display font-black text-void-black text-2xl uppercase">bruhfolio.com</h4>
                            <div className="mt-2 flex justify-between items-end font-mono font-bold">
                                <span>$69.00</span>
                                <span className="bg-black text-white px-2 py-1 text-xs">SOLD</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Glow behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-neon-slime to-hot-pink blur-[100px] opacity-30 -z-10 rounded-full animate-pulse-slow"></div>
                </div>
            </div>
        </div>
    );
}
