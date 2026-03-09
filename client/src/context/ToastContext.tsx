import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Warning, CheckCircle, Info, X } from '@phosphor-icons/react';

type ToastType = 'chaos' | 'success' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[10000] space-y-4 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ x: 100, opacity: 0, skewX: -20 }}
                            animate={{ x: 0, opacity: 1, skewX: 0 }}
                            exit={{ x: 100, opacity: 0, skewX: 20 }}
                            className="pointer-events-auto"
                        >
                            <div className={`
                                min-w-[320px] p-4 border-l-4 font-mono relative overflow-hidden
                                ${toast.type === 'chaos' ? 'bg-glitch-red/10 border-glitch-red' : ''}
                                ${toast.type === 'success' ? 'bg-neon-slime/10 border-neon-slime' : ''}
                                ${toast.type === 'info' ? 'bg-electric-cyan/10 border-electric-cyan' : ''}
                                backdrop-blur-xl border border-white/5
                            `}>
                                {/* Glitch background decoration */}
                                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-12" />

                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`shrink-0 mt-1 ${toast.type === 'chaos' ? 'text-glitch-red' :
                                            toast.type === 'success' ? 'text-neon-slime' :
                                                'text-electric-cyan'
                                        }`}>
                                        {toast.type === 'chaos' && <Warning size={20} weight="fill" className="animate-pulse" />}
                                        {toast.type === 'success' && <CheckCircle size={20} weight="fill" />}
                                        {toast.type === 'info' && <Info size={20} weight="fill" />}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40 mb-1">
                                            {toast.type === 'chaos' ? 'SYSTEM_BREACH_DETECTED' : 'SYSTEM_TRANSMISSION'}
                                        </div>
                                        <p className="text-xs text-white uppercase font-bold leading-tight tracking-wider">
                                            {toast.message}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeToast(toast.id)}
                                        className="text-white/20 hover:text-white transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Animated progress bar */}
                                <motion.div
                                    initial={{ scaleX: 1 }}
                                    animate={{ scaleX: 0 }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${toast.type === 'chaos' ? 'bg-glitch-red' :
                                            toast.type === 'success' ? 'bg-neon-slime' :
                                                'bg-electric-cyan'
                                        }`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useChaos = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useChaos must be used within a ToastProvider');
    }
    return context;
};
