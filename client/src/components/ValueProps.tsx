import { Scan, ShieldWarning, ChartBar, ArrowsLeftRight } from '@phosphor-icons/react';

export default function ValueProps() {
    const props = [
        {
            icon: <Scan size={32} weight="duotone" className="text-trust-blue" />,
            title: "Real-time Verification",
            desc: "Sub-second scan speeds with offline capability."
        },
        {
            icon: <ShieldWarning size={32} weight="duotone" className="text-error-red" />,
            title: "Fraud Prevention",
            desc: "AI-driven detection of fake passes and screenshots."
        },
        {
            icon: <ChartBar size={32} weight="duotone" className="text-success-green" />,
            title: "Operational Analytics",
            desc: "Live entry data and revenue insights."
        },
        {
            icon: <ArrowsLeftRight size={32} weight="duotone" className="text-brand-dark-blue" />,
            title: "Secure Resale",
            desc: "Controlled marketplace with dynamic QR regeneration."
        }
    ];

    return (
        <section className="bg-corp-bg-lighter border-y border-white/5 py-12 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {props.map((prop, index) => (
                        <div key={index} className="flex flex-col items-start p-4 hover:bg-white/5 rounded-lg transition-colors duration-300">
                            <div className="mb-4 p-3 bg-corp-bg rounded-lg border border-white/5 shadow-sm">
                                {prop.icon}
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{prop.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{prop.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
