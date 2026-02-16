import { useState, useEffect } from 'react';
import { List, X, Lightning } from '@phosphor-icons/react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Drops', href: '#' },
        { name: 'Chaos', href: '#' },
        { name: 'Flex', href: '#' },
    ];

    return (
        <nav className={`fixed w-full z-50 top-0 transition-all duration-300 border-b ${scrolled ? 'bg-void-black/90 backdrop-blur-md border-neon-slime/20 py-4' : 'bg-transparent border-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">

                    {/* Logo (Left) */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group hover:rotate-2 transition-transform">
                        <div className="w-8 h-8 flex items-center justify-center bg-neon-slime border-2 border-void-black shadow-[4px_4px_0px_0px_#FF00FF]">
                            <Lightning weight="fill" className="text-void-black w-5 h-5 animate-pulse" />
                        </div>
                        <span className="font-display font-black text-3xl tracking-tighter text-white group-hover:text-neon-slime transition-colors">
                            QRAZY
                        </span>
                    </div>

                    {/* Desktop Menu (Center) */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-mono font-bold text-gray-400 hover:text-neon-slime hover:underline decoration-wavy underline-offset-4 transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <button className="text-sm font-mono font-bold text-white hover:text-hot-pink transition-colors uppercase tracking-widest">
                            Log in
                        </button>
                        <button className="btn-primary transform hover:rotate-1">
                            Spin Wheel
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-white hover:text-neon-slime focus:outline-none"
                        >
                            <span className="sr-only">Open chaos menu</span>
                            {isOpen ? <X size={32} weight="bold" /> : <List size={32} weight="bold" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-void-black border-b-4 border-neon-slime">
                    <div className="px-4 pt-4 pb-8 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-4 py-4 rounded-none border-2 border-dashed border-white/20 text-2xl font-mono font-bold text-white hover:bg-neon-slime hover:text-void-black hover:border-solid hover:border-void-black transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-6 flex flex-col gap-4 px-2">
                            <button className="w-full py-4 text-white font-mono font-bold hover:text-hot-pink border-2 border-transparent hover:border-hot-pink uppercase tracking-widest">
                                Log in
                            </button>
                            <button className="w-full btn-primary bg-neon-slime text-void-black">
                                Spin the Wheel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
