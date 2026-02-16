import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="glass-nav w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <Sparkles className="h-8 w-8 text-pink-500" />
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600">
                                PartyLand
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#" className="hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                            <a href="#" className="hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                            <a href="#" className="hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
                            <a href="#" className="hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                            <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-md hover:shadow-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-purple-100 inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
                        <a href="#" className="hover:bg-purple-100 hover:text-purple-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
                        <a href="#" className="hover:bg-purple-100 hover:text-purple-700 block px-3 py-2 rounded-md text-base font-medium">Features</a>
                        <a href="#" className="hover:bg-purple-100 hover:text-purple-700 block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
                        <a href="#" className="hover:bg-purple-100 hover:text-purple-700 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
                        <button className="w-full text-left bg-pink-500 hover:bg-pink-600 text-white block px-3 py-2 rounded-md text-base font-medium mt-4">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
