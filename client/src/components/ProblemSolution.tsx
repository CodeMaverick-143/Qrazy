import { motion } from 'framer-motion';
import { Warning, ShieldCheck, XCircle, CheckCircle } from '@phosphor-icons/react';

export default function ProblemSolution() {
    return (
        <section className="py-24 bg-corp-bg relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Why venues need <span className="text-trust-blue">infrastructure</span>, not just apps.
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Traditional ticketing creates operational blind spots. Qrazy provides the visibility and control enterprise venues require.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* PROBLEM SIDE - Operational Risk */}
                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-error-red/5 blur-3xl opacity-20 rounded-3xl"></div>
                        <div className="relative h-full p-8 lg:p-10 border border-white/5 bg-corp-bg-lighter rounded-2xl overflow-hidden hover:border-error-red/30 transition-colors duration-300">

                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-2 bg-error-red/10 rounded-lg border border-error-red/20">
                                    <Warning size={24} weight="fill" className="text-error-red" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    Operational Risks
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Untrackable offline promoter sales",
                                    "Revenue loss from counterfeit passes",
                                    "Bottlenecks at entry during peak hours",
                                    "No data on guest demographics"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start group/item"
                                    >
                                        <XCircle size={20} weight="bold" className="text-error-red mr-3 mt-1 flex-shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity" />
                                        <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* SOLUTION SIDE - Platform Stability */}
                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-trust-blue/5 blur-3xl opacity-30 rounded-3xl"></div>
                        <div className="relative h-full p-8 lg:p-10 border border-trust-blue/20 bg-corp-bg-lighter/50 rounded-2xl overflow-hidden shadow-lg hover:border-trust-blue/40 transition-colors duration-300">

                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-2 bg-trust-blue/10 rounded-lg border border-trust-blue/20">
                                    <ShieldCheck size={24} weight="fill" className="text-trust-blue" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    The Qrazy Platform
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Real-time promoter tracking & attribution",
                                    "Bank-grade QR encryption (dynamic)",
                                    "Sub-second scan speeds (1000+ entries/hr)",
                                    "Rich guest profiles & retention data"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start group/item"
                                    >
                                        <CheckCircle size={20} weight="fill" className="text-trust-blue mr-3 mt-1 flex-shrink-0 shadow-sm" />
                                        <span className="text-gray-200 text-sm font-medium leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
