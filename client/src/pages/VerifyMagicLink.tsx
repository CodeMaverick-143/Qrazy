import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { SpinnerGap, ShieldCheck, WifiHigh } from '@phosphor-icons/react';

const VerifyMagicLink = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already authenticated or session is restored
        if (!loading && user) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [user, loading, navigate]);

    return (
        <div className="min-h-screen bg-void-black flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-neon-slime/10 border-2 border-neon-slime shadow-slime-glow mb-10 transform rotate-45 group">
                    <div className="transform -rotate-45">
                        <ShieldCheck size={48} className="text-neon-slime animate-pulse" />
                    </div>
                </div>

                <h1 className="text-4xl font-display font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
                    Security <span className="text-neon-slime">Handshake</span>
                </h1>

                <div className="space-y-6 max-w-xs mx-auto">
                    <div className="flex flex-col items-center gap-4 py-8 glass-panel border-white/5">
                        <SpinnerGap size={32} className="text-neon-slime animate-spin" />
                        <div className="space-y-2">
                            <p className="font-mono text-[10px] text-white uppercase tracking-[0.3em] font-black">Establishing Secure Link</p>
                            <p className="font-mono text-[9px] text-brand-gray/40 uppercase tracking-widest px-8">Validating cryptographically signed token with central QRAZY protocol...</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-8 opacity-20">
                        <div className="flex flex-col items-center gap-1">
                            <WifiHigh size={16} className="text-neon-slime" />
                            <span className="font-mono text-[8px] uppercase">Proxy 1</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <WifiHigh size={16} className="text-neon-slime" />
                            <span className="font-mono text-[8px] uppercase">Proxy 2</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <WifiHigh size={16} className="text-neon-slime" />
                            <span className="font-mono text-[8px] uppercase">Central</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyMagicLink;
