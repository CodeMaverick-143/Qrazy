import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, X, Lightning, Ticket, House, Martini, User as UserIcon, SignOut } from '@phosphor-icons/react';
import { useAuth } from './AuthProvider';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, dbUser, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/', icon: <House size={20} /> },
        { name: 'Clubs', href: '/clubs', icon: <Martini size={20} /> },
        ...(user ? [{ name: 'My Passes', href: '/profile', icon: <Ticket size={20} /> }] : []),
    ];

    return (
        <nav className={`fixed w-full z-50 top-0 transition-all duration-300 border-b ${scrolled ? 'bg-void-black/95 backdrop-blur-md border-neon-slime/20 py-4' : 'bg-transparent border-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">

                    {/* Logo (Left) */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group hover:rotate-1 transition-transform">
                        <div className="w-10 h-10 flex items-center justify-center bg-neon-slime border-2 border-void-black shadow-[4px_4px_0px_0px_#FF00FF]">
                            <Lightning weight="fill" className="text-void-black w-6 h-6 animate-pulse" />
                        </div>
                        <span className="font-display font-black text-3xl tracking-tighter text-white group-hover:text-neon-slime transition-colors italic glitch" data-text="QRAZY">
                            QRAZY
                        </span>
                    </Link>

                    {/* Desktop Menu (Center) */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-lg font-mono font-bold text-brand-gray/80 hover:text-neon-slime hover:underline decoration-wavy underline-offset-8 transition-all flex items-center gap-2"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <Link to="/profile" className="flex items-center gap-2 text-sm font-mono font-bold text-white hover:text-neon-slime transition-colors uppercase tracking-widest group">
                                    <div className="w-8 h-8 bg-neon-slime/10 border border-neon-slime/20 flex items-center justify-center group-hover:bg-neon-slime group-hover:text-void-black transition-all">
                                        <UserIcon weight="bold" />
                                    </div>
                                    <span>{dbUser?.name || user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="text-brand-gray/40 hover:text-hot-pink transition-colors font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"
                                >
                                    <SignOut weight="bold" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-mono font-bold text-white hover:text-hot-pink transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-hot-pink">
                                    Log in
                                </Link>
                                <Link to="/clubs" className="btn-primary transform hover:scale-105 transition-transform px-6 py-2">
                                    Get Passes
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-white hover:text-neon-slime focus:outline-none"
                        >
                            <span className="sr-only">Open menu</span>
                            {isOpen ? <X size={32} weight="bold" /> : <List size={32} weight="bold" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-void-black border-b-4 border-neon-slime shadow-slime-glow">
                    <div className="px-4 pt-4 pb-8 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 px-4 py-4 rounded-none border-2 border-dashed border-white/20 text-2xl font-mono font-bold text-white hover:bg-neon-slime hover:text-void-black hover:border-solid hover:border-void-black transition-all"
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-6 flex flex-col gap-4 px-2">
                            {user ? (
                                <>
                                    <Link to="/profile" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-between py-4 px-4 bg-white/5 border border-white/10 text-white font-mono font-bold uppercase tracking-widest">
                                        <span>{dbUser?.name || user.email?.split('@')[0]}</span>
                                        <UserIcon weight="bold" />
                                    </Link>
                                    <button
                                        onClick={() => { signOut(); setIsOpen(false); }}
                                        className="w-full py-4 text-center text-hot-pink font-mono font-bold border-2 border-dashed border-hot-pink/20 uppercase tracking-widest"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-4 text-center text-white font-mono font-bold hover:text-hot-pink border-2 border-transparent hover:border-hot-pink uppercase tracking-widest">
                                        Log in
                                    </Link>
                                    <Link to="/clubs" onClick={() => setIsOpen(false)} className="w-full btn-primary bg-neon-slime text-void-black text-center py-4">
                                        Get Passes
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
