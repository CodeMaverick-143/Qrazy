import { SketchLogo, SlackLogo, SpotifyLogo, StripeLogo, TwitchLogo } from '@phosphor-icons/react';

export default function TrustSection() {
    return (
        <section className="py-12 bg-corp-bg border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
                    Powering next-gen nightlife globally
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <SketchLogo size={32} weight="fill" className="text-white hover:text-[#F7B500] transition-colors" />
                    <SlackLogo size={32} weight="fill" className="text-white hover:text-[#4A154B] transition-colors" />
                    <SpotifyLogo size={32} weight="fill" className="text-white hover:text-[#1DB954] transition-colors" />
                    <StripeLogo size={32} weight="fill" className="text-white hover:text-[#635BFF] transition-colors" />
                    <TwitchLogo size={32} weight="fill" className="text-white hover:text-[#9146FF] transition-colors" />
                </div>
            </div>
        </section>
    );
}
