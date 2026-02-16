import { Buildings, Sliders, RocketLaunch, ChartLineUp, CaretRight, CheckCircle } from '@phosphor-icons/react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Buildings size={32} weight="duotone" className="text-white" />,
            title: "Onboard Venue",
            desc: "Register your club and verify your business details.",
            step: "01"
        },
        {
            icon: <Sliders size={32} weight="duotone" className="text-white" />,
            title: "Configure Rules",
            desc: "Set ticket types, pricing, and access control policies.",
            step: "02"
        },
        {
            icon: <RocketLaunch size={32} weight="duotone" className="text-white" />,
            title: "Go Live",
            desc: "Publish your events and start selling tickets immediately.",
            step: "03"
        },
        {
            icon: <ChartLineUp size={32} weight="duotone" className="text-white" />,
            title: "Monitor Insights",
            desc: "Track entries, revenue, and guest data in real-time.",
            step: "04"
        }
    ];

    return (
        <section className="py-24 bg-corp-bg-lighter relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-brand-dark-blue uppercase mb-3">Workflow</h2>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                        Seamless integration <span className="text-gray-400">in 4 steps.</span>
                    </h3>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-0.5 bg-white/10 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className="flex flex-col items-center text-center">
                                    {/* Icon Circle */}
                                    <div className="w-24 h-24 rounded-full bg-corp-bg border border-white/10 flex items-center justify-center mb-8 relative z-10 shadow-lg group-hover:border-trust-blue/50 transition-colors duration-300">
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-corp-bg-lighter border border-white/10 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {step.step}
                                        </div>
                                        {step.icon}
                                    </div>

                                    <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>

                                    {/* Mobile Connector */}
                                    {index < steps.length - 1 && (
                                        <div className="lg:hidden mt-8 flex justify-center text-white/10">
                                            <CaretRight size={24} weight="bold" className="rotate-90" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
