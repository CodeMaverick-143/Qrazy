import { Twitter, Instagram, Facebook, Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white/80 backdrop-blur-sm mt-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2">
                    <a href="#" className="text-gray-400 hover:text-pink-500">
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-500">
                        <span className="sr-only">Instagram</span>
                        <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-500">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-6 w-6" />
                    </a>
                </div>
                <div className="mt-8 md:mt-0 md:order-1 flex flex-col md:flex-row items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0 mr-4">
                        <Sparkles className="h-5 w-5 text-pink-500" />
                        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600">
                            PartyLand
                        </span>
                    </div>
                    <p className="text-center text-base text-gray-400">
                        &copy; {new Date().getFullYear()} PartyLand, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
