import { Ticket, QrCode, ChartBar, ArrowsLeftRight, CaretRight } from '@phosphor-icons/react';

export default function ProductOverview() {
    const features = [
        {
            icon: <Ticket size={32} weight="duotone" className="text-trust-blue" />,
            title: "Ticket Lifecycle Management",
            desc: "Complete control from issuance to validation. Void, refund, or upgrade passes instantly from the dashboard.",
            link: "#"
        },
        {
            icon: <QrCode size={32} weight="duotone" className="text-success-green" />,
            title: "Dynamic QR & Access Control",
            desc: "Rotating QR codes that change every 30 seconds, preventing screenshots and unauthorized sharing.",
            link: "#"
        },
        {
            icon: <ChartBar size={32} weight="duotone" className="text-brand-dark-blue" />,
            title: "Club & Promoter Dashboards",
            desc: "Real-time analytics on attendance, revenue, and promoter performance. Actionable insights at your fingertips.",
            link: "#"
        },
        {
            icon: <ArrowsLeftRight size={32} weight="duotone" className="text-brand-gray" />,
            title: "Secure Secondary Marketplace",
            desc: "Safe resale ecosystem where ownership transfers are verified and new QR codes are generated instantly.",
            link: "#"
        }
    ];

    return (
        <section className="py-24 bg-corp-bg relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-trust-blue uppercase mb-3">Platform Capabilities</h2>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                        Everything you need to run <span className="text-white">smarter</span> events.
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-corp-bg-lighter border border-white/5 hover:border-trust-blue/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="mb-6 p-4 rounded-xl bg-corp-bg border border-white/5 w-fit group-hover:bg-white/5 transition-colors">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                {feature.desc}
                            </p>
                            <a href={feature.link} className="inline-flex items-center text-trust-blue font-semibold text-sm hover:text-blue-400 transition-colors">
                                Learn more <CaretRight weight="bold" className="ml-1" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
