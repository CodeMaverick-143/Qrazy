import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react';

export default function CTABand() {
    return (
        <section className="py-20 bg-trust-blue relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                    Ready to modernize your operations?
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                    Join the leading nightlife venues using Qrazy to eliminate fraud and boost revenue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 rounded-lg bg-white text-trust-blue font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center gap-2">
                        Book a Demo <ArrowRight weight="bold" />
                    </button>
                    <button className="px-8 py-4 rounded-lg border-2 border-white/30 hover:bg-white/10 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2">
                        <EnvelopeSimple weight="bold" /> Contact Sales
                    </button>
                </div>
            </div>
        </section>
    );
}
