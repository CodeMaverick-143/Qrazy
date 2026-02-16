import { ShieldCheck, LockKey, FileText, UsersThree, CaretRight } from '@phosphor-icons/react';

export default function SecuritySection() {
    return (
        <section className="py-24 bg-corp-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    {/* Left Column: Text */}
                    <div className="mb-12 lg:mb-0">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-dark-blue/10 border border-brand-dark-blue/20 text-brand-dark-blue text-xs font-semibold mb-6 uppercase tracking-wider">
                            Enterprise Grade
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                            Security built for <span className="text-trust-blue">scale</span>.
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            We adhere to the strictest compliance standards to ensure your data—and your revenue—are protected at all times.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-start">
                                <CheckItem text="SOC2 Type II Compliant" />
                            </div>
                            <div className="flex items-start">
                                <CheckItem text="End-to-end 256-bit encryption" />
                            </div>
                            <div className="flex items-start">
                                <CheckItem text="Real-time fraud detection AI" />
                            </div>
                        </div>

                        <div className="mt-10">
                            <a href="#" className="inline-flex items-center text-white font-semibold hover:text-trust-blue transition-colors group">
                                Read our Security Whitepaper <CaretRight weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <SecurityCard
                            icon={<LockKey size={32} weight="duotone" className="text-trust-blue" />}
                            title="Access Control"
                            desc="Granular role-based permissions for staff, promoters, and third-party vendors."
                        />
                        <SecurityCard
                            icon={<FileText size={32} weight="duotone" className="text-success-green" />}
                            title="Audit Logs"
                            desc="Immutable records of every transaction, scan, and system action for full accountability."
                        />
                        <SecurityCard
                            icon={<ShieldCheck size={32} weight="duotone" className="text-brand-dark-blue" />}
                            title="Data Privacy"
                            desc="GDPR and CCPA compliant data handling to protect your guest's personal information."
                        />
                        <SecurityCard
                            icon={<UsersThree size={32} weight="duotone" className="text-brand-gray" />}
                            title="Vendor Management"
                            desc="Securely onboard and manage third-party promoters without exposing sensitive data."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-success-green/20 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
            </div>
            <span className="text-gray-300">{text}</span>
        </div>
    );
}

function SecurityCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-6 rounded-xl bg-corp-bg-lighter border border-white/5 hover:border-trust-blue/30 transition-all duration-300 group">
            <div className="mb-4 p-3 bg-corp-bg rounded-lg border border-white/5 group-hover:bg-white/5 transition-colors w-fit">
                {icon}
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </div>
    );
}
