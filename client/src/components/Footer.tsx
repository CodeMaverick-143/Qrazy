import { TwitterLogo, InstagramLogo, FacebookLogo, Sparkle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-void-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6 cursor-pointer group">
                            <div className="w-8 h-8 flex items-center justify-center bg-neon-slime border border-void-black shrink-0">
                                <Sparkle weight="fill" className="text-void-black w-5 h-5" />
                            </div>
                            <span className="font-display font-black text-3xl tracking-tighter text-white uppercase italic">Qrazy</span>
                        </Link>
                        <p className="text-brand-gray/40 font-mono text-sm leading-relaxed mb-8 max-w-sm">
                            The future of nightlife access. Secure, verified, and chaotic. Stop screenshots. Start partying.
                        </p>
                        <div className="flex space-x-6">
                            <SocialIcon icon={<TwitterLogo size={24} weight="fill" />} href="#" />
                            <SocialIcon icon={<InstagramLogo size={24} weight="fill" />} href="#" />
                            <SocialIcon icon={<FacebookLogo size={24} weight="fill" />} href="#" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-display font-black uppercase mb-6 tracking-tight">Marketplace</h4>
                        <ul className="space-y-4 font-mono text-sm text-brand-gray/40">
                            <li><Link to="/clubs" className="hover:text-neon-slime transition-colors">All Clubs</Link></li>
                            <li><Link to="/clubs" className="hover:text-neon-slime transition-colors">Top Events</Link></li>
                            <li><Link to="/profile" className="hover:text-neon-slime transition-colors">My Passes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-display font-black uppercase mb-6 tracking-tight">Support</h4>
                        <ul className="space-y-4 font-mono text-sm text-brand-gray/40">
                            <li><a href="#" className="hover:text-hot-pink transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-hot-pink transition-colors">Club Partner</a></li>
                            <li><a href="#" className="hover:text-hot-pink transition-colors">Terms of Entry</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-brand-gray/20 font-mono text-[10px] uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Qrazy Marketplace. Built for the underground.
                    </p>
                    <div className="flex space-x-12 font-mono text-[10px] text-brand-gray/20 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-neon-slime/5 blur-[100px] rounded-full" />
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a href={href} className="text-brand-gray/40 hover:text-neon-slime transition-all">
            {icon}
        </a>
    );
}
