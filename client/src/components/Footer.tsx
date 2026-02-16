import { TwitterLogo, InstagramLogo, FacebookLogo, LinkedinLogo, Sparkle, PaperPlaneRight } from '@phosphor-icons/react';

export default function Footer() {
    return (
        <footer className="bg-corp-bg border-t border-white/5 pt-20 pb-10 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">

                    {/* Brand Column (Spans 2 on mobile, 2 on lg) */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer group">
                            <div className="w-8 h-8 rounded-lg bg-trust-blue/10 flex items-center justify-center border border-trust-blue/20">
                                <Sparkle weight="fill" className="text-trust-blue w-5 h-5" />
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight text-white">Qrazy</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                            The enterprise standard for nightlife risk management. Securing venues, maximizing revenue, and enhancing guest experiences globally.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<TwitterLogo size={20} weight="fill" />} href="#" />
                            <SocialIcon icon={<LinkedinLogo size={20} weight="fill" />} href="#" />
                            <SocialIcon icon={<InstagramLogo size={20} weight="fill" />} href="#" />
                            <SocialIcon icon={<FacebookLogo size={20} weight="fill" />} href="#" />
                        </div>
                    </div>

                    {/* Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><FooterLink href="#" text="Ticketing" /></li>
                            <li><FooterLink href="#" text="Access Control" /></li>
                            <li><FooterLink href="#" text="Analytics" /></li>
                            <li><FooterLink href="#" text="Promoter Network" /></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><FooterLink href="#" text="About Us" /></li>
                            <li><FooterLink href="#" text="Careers" /></li>
                            <li><FooterLink href="#" text="Press" /></li>
                            <li><FooterLink href="#" text="Contact" /></li>
                        </ul>
                    </div>

                    {/* Newsletter (Spans 2 on mobile, 2 on lg) */}
                    <div className="col-span-2 lg:col-span-2">
                        <h4 className="text-white font-bold mb-6 text-sm">Stay Updated</h4>
                        <p className="text-gray-500 text-sm mb-4">
                            Get the latest insights on nightlife technology and risk management.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-corp-bg-lighter border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-trust-blue w-full"
                            />
                            <button className="bg-trust-blue hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 transition-colors">
                                <PaperPlaneRight size={20} weight="bold" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs">
                        &copy; {new Date().getFullYear()} Qrazy, Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-8 text-xs text-gray-600">
                        <a href="#" className="hover:text-trust-blue transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-trust-blue transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-trust-blue transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a href={href} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            {icon}
        </a>
    );
}

function FooterLink({ text, href }: { text: string, href: string }) {
    return (
        <a href={href} className="hover:text-trust-blue transition-colors">
            {text}
        </a>
    );
}
