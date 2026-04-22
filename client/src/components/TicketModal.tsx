import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Calendar, Fingerprint, Printer, DownloadSimple, Sparkle, CaretLeft, CaretRight, SpinnerGap } from '@phosphor-icons/react';
import { QRCodeCanvas } from 'qrcode.react';
import type { Order } from '../types';
import { useAuth } from '../hooks/useAuth';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    orders: Order[];
    initialIndex: number;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, orders, initialIndex }) => {
    const { session } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [initializing, setInitializing] = useState(false);
    const [tokens, setTokens] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    const order = orders[currentIndex];

    async function handleInitialize() {
        if (!session || initializing || !order || tokens[order.id]) return;

        setInitializing(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/passes/initialize/${order.id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            });
            if (response.ok) {
                const { token } = await response.json();
                setTokens(prev => ({ ...prev, [order.id]: token }));
            }
        } catch (error) {
            console.error('Failed to initialize entry:', error);
        } finally {
            setInitializing(false);
        }
    }

    const nextTicket = () => {
        if (currentIndex < orders.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevTicket = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (!order) return null;

    const entryToken = tokens[order.id];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    { }
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-void-black/95 backdrop-blur-xl cursor-crosshair"
                    />

                    { }
                    {orders.length > 1 && (
                        <button
                            disabled={currentIndex === 0}
                            onClick={prevTicket}
                            className={`hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 p-4 border border-white/10 hover:border-neon-slime hover:text-neon-slime transition-all z-[60] ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <CaretLeft size={32} weight="bold" />
                        </button>
                    )}

                    { }
                    {orders.length > 1 && (
                        <button
                            disabled={currentIndex === orders.length - 1}
                            onClick={nextTicket}
                            className={`hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 p-4 border border-white/10 hover:border-neon-slime hover:text-neon-slime transition-all z-[60] ${currentIndex === orders.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <CaretRight size={32} weight="bold" />
                        </button>
                    )}

                    { }
                    <motion.div
                        layoutId={`ticket-${order.id}`}
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="relative w-full max-w-lg bg-void-black border border-white/10 shadow-2xl overflow-hidden z-[55]"
                    >
                        { }
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2 text-brand-gray/40 hover:text-white transition-colors bg-white/5 border border-white/5"
                        >
                            <X size={20} weight="bold" />
                        </button>

                        { }
                        {orders.length > 1 && (
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {orders.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-neon-slime scale-125' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        )}

                        { }
                        <div className="holographic-card p-[1px]">
                            <div className="bg-void-black p-8 sm:p-12 relative overflow-hidden">
                                { }
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-slime/50 to-transparent" />

                                <div className="flex justify-between items-start mb-12">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-neon-slime flex items-center justify-center text-void-black shadow-slime-glow-soft">
                                            <Ticket size={28} weight="fill" />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-mono text-neon-slime uppercase tracking-[0.3em] font-black">Authorized Entry</div>
                                            <div className="text-[10px] font-mono text-brand-gray/40 uppercase tracking-widest">ID: {order.id.slice(0, 12)}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[9px] font-mono text-brand-gray/40 uppercase tracking-[0.2em] mb-1">Sector</div>
                                        <div className="text-base font-mono text-white font-black uppercase italic tracking-tighter">{order.passType.event?.club?.city}</div>
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <h2 className="text-5xl font-display font-black text-white italic uppercase tracking-[-0.05em] leading-[0.9] mb-4 text-glow-slime">
                                        {order.passType.event?.title}
                                    </h2>
                                    <div className="flex items-center gap-5 text-brand-gray/60 font-mono text-[10px] uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="text-neon-slime" size={14} />
                                            {order.passType.event?.date ? new Date(order.passType.event.date).toLocaleDateString() : 'TBD'}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-hot-pink font-black">
                                            <div className="w-1.5 h-1.5 rounded-full bg-hot-pink animate-ping" />
                                            {order.passType.event?.club?.name}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-white/5 relative">
                                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-6 h-12 bg-void-black rounded-r-full border border-white/10" />
                                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-6 h-12 bg-void-black rounded-l-full border border-white/10" />

                                    <div>
                                        <div className="text-[10px] font-mono text-brand-gray/40 uppercase mb-2 tracking-[0.2em]">Pass Tier</div>
                                        <div className="text-xl font-mono text-neon-slime font-black uppercase italic tracking-tighter">{order.passType.name}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-mono text-brand-gray/40 uppercase mb-2 tracking-[0.2em]">Status</div>
                                        <div className={`px-3 py-1 border font-mono text-[10px] font-black inline-block tracking-widest ${entryToken ? 'bg-neon-slime/10 border-neon-slime text-neon-slime' : 'bg-white/5 border-white/10 text-white'}`}>
                                            {entryToken ? 'ACTIVE_PROTOCOL' : 'READY_TO_BOOT'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-10">
                                    <div className="w-44 h-44 bg-white p-2 shrink-0 relative group shadow-2xl">
                                        {entryToken ? (
                                            <>
                                                <QRCodeCanvas
                                                    value={entryToken}
                                                    size={160}
                                                    level="H"
                                                    bgColor="#FFFFFF"
                                                    fgColor="#000000"
                                                    includeMargin={false}
                                                />
                                                <motion.div
                                                    initial={{ height: '100%' }}
                                                    animate={{ height: 0 }}
                                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                                    className="absolute inset-0 bg-void-black z-10 pointer-events-none"
                                                />
                                            </>
                                        ) : (
                                            <div className="w-full h-full bg-void-black flex flex-col items-center justify-center text-center p-6 border border-white/10">
                                                <Fingerprint size={48} className="text-brand-gray/10 mb-3 animate-pulse" />
                                                <span className="text-[9px] font-mono text-brand-gray/30 uppercase leading-tight tracking-widest">
                                                    INITIALIZE_LOCKED_ASSET
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow space-y-6 w-full">
                                        {!entryToken ? (
                                            <button
                                                onClick={handleInitialize}
                                                disabled={initializing}
                                                className="w-full py-5 bg-neon-slime text-void-black font-mono text-[12px] font-black uppercase tracking-[0.5em] hover:bg-white hover:shadow-slime-glow-soft transition-all relative overflow-hidden group/btn"
                                            >
                                                {initializing ? (
                                                    <div className="flex items-center justify-center gap-3">
                                                        <SpinnerGap className="animate-spin" size={20} />
                                                        BOOTING...
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">INITIALIZE ENTRY</span>
                                                        <motion.div
                                                            className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"
                                                        />
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-white/5 border border-white/10 font-mono text-[10px] leading-relaxed uppercase space-y-2">
                                                    <div className="text-neon-slime font-black tracking-widest"></div>
                                                    <p className="text-brand-gray/60 italic">Present this encrypted QR at the secure perimeter. Access is non-transferable.</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button className="flex-grow py-3 border border-white/10 bg-white/5 hover:border-white hover:text-white transition-all flex items-center justify-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
                                                        <Printer size={16} /> Print
                                                    </button>
                                                    <button className="flex-grow py-3 border border-white/10 bg-white/5 hover:border-hot-pink hover:text-hot-pink transition-all flex items-center justify-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
                                                        <DownloadSimple size={16} /> Save
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                { }
                                <div className="mt-12 pt-8 border-t border-dashed border-white/10 flex justify-between items-center opacity-30">
                                    <div className="flex items-center gap-2">
                                        <Sparkle weight="fill" className="text-electric-cyan animate-pulse" size={10} />
                                        <span className="text-[8px] font-mono tracking-[0.3em] uppercase">Encrypted_Transmission</span>
                                    </div>
                                    <span className="text-[8px] font-mono tracking-[0.3em] uppercase underline decoration-neon-slime/50 decoration-2 underline-offset-4 font-black">Qrazy_Sec_Sys</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
