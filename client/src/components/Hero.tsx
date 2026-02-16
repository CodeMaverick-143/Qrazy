import { motion } from 'framer-motion';
import { Zap, PartyPopper, Rocket } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                                Join the celebration
                            </span>
                            <h1 className="mt-1 text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                                <span className="block text-slate-900">Elevate Your</span>
                                <span className="block text-gradient">Digital Party</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                Experience the most vibrant and engaging platform built for celebration.
                                Connect, share, and enjoy moments with friends in a dazzling environment.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                                <div className="rounded-md shadow">
                                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105">
                                        Get Started <Rocket className="ml-2 w-5 h-5" />
                                    </a>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-pink-700 bg-pink-100 hover:bg-pink-200 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105">
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                        <motion.div
                            className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="relative block w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-6">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 opacity-50 z-0"></div>
                                <div className="relative z-10 grid grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm card-hover">
                                        <PartyPopper className="w-8 h-8 text-pink-500 mb-2" />
                                        <h3 className="font-bold text-gray-800">Events</h3>
                                        <p className="text-sm text-gray-500">Host amazing parties.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm card-hover">
                                        <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                                        <h3 className="font-bold text-gray-800">Instant</h3>
                                        <p className="text-sm text-gray-500">Connect in real-time.</p>
                                    </div>
                                    <div className="col-span-2 bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white shadow-md transform rotate-1 hover:rotate-0 transition-transform">
                                        <h3 className="text-lg font-bold mb-1">Premium Pass</h3>
                                        <p className="text-purple-100 text-sm">Unlock exclusive features and themes.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
