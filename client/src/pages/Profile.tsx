import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, ClockCounterClockwise, SpinnerGap, Sparkle, SealCheck, MapPin, Calendar, Receipt } from '@phosphor-icons/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import type { Order } from '../types';
import { TicketModal } from '../components/TicketModal';

const AssetCard = ({ order, onClick }: { order: Order; onClick: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="holographic-card border border-white/10 p-[1px] group cursor-pointer"
        >
            <div className="bg-void-black p-8 flex flex-col h-full relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-electric-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-10 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Sparkle weight="fill" className="text-electric-cyan animate-spin-slow" size={14} />
                        <span className="text-[10px] font-mono text-electric-cyan uppercase tracking-[0.3em] font-black">
                            SECURED_ASSET
                        </span>
                    </div>
                    <span className="text-[9px] font-mono text-brand-gray/40 uppercase">
                        ID_{order.id.slice(0, 8)}
                    </span>
                </div>

                <div className="flex-grow mb-10">
                    <div className="text-neon-slime font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-2 px-2 border-l-2 border-neon-slime">
                        {order.passType.event?.club?.name}
                    </div>
                    <h4 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter leading-none mb-1 group-hover:text-neon-slime transition-colors">
                        {order.passType.event?.title}
                    </h4>
                    <p className="text-brand-gray/40 font-mono text-[10px] uppercase mt-2">
                        {order.passType.event?.club?.city} • {order.passType.event?.date ? new Date(order.passType.event.date).toLocaleDateString() : 'TBD'}
                    </p>
                </div>

                <div className="flex items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="text-[9px] font-mono text-brand-gray/40 uppercase tracking-[0.2em]">Protocol Entry</div>
                        <div className="px-4 py-1.5 bg-neon-slime/10 border border-neon-slime/40 text-neon-slime font-mono text-[11px] uppercase font-black">
                            {order.passType.name}
                        </div>
                    </div>
                    <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:bg-neon-slime group-hover:border-neon-slime transition-all">
                        <Ticket size={24} className="text-brand-gray/40 group-hover:text-void-black transition-colors" weight="fill" />
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-slime scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
        </motion.div>
    );
};

export default function Profile() {
    const { user, dbUser, loading: authLoading, session, signOut } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTicketViewOpen, setIsTicketViewOpen] = useState(false);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            if (!session) return;
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/passes/my-orders`, {
                    headers: { 'Authorization': `Bearer ${session.access_token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session) fetchOrders();
    }, [user, authLoading, navigate, session]);

    if (authLoading || !user) return null;

    const joinDate = dbUser?.createdAt
        ? new Date(dbUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }).toUpperCase()
        : '---';

   
    const activeOrders = orders.filter(o => !o.qrPass?.used);
    const pastOrders = orders.filter(o => o.qrPass?.used);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                {}
                <div className="lg:w-72 shrink-0">
                    <div className="sticky top-32">
                        <div className="mb-12 relative">
                            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-neon-slime/30" />

                            <div className="w-20 h-20 bg-neon-slime flex items-center justify-center text-void-black font-display font-black text-3xl italic mb-6 shadow-slime-glow hover:scale-105 transition-transform cursor-crosshair">
                                {user?.email?.[0].toUpperCase()}
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-xl font-mono font-black text-white italic tracking-tighter uppercase leading-none break-all">
                                    {dbUser?.name || user?.email?.split('@')[0]}
                                </h2>
                                <div className="flex items-center gap-2 text-neon-slime font-mono text-[9px] uppercase tracking-[0.2em] font-black opacity-80">
                                    <SealCheck weight="fill" className="animate-pulse" /> Sector: Verified Infiltrator
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 border-t border-white/5 pt-10">
                            <div className="relative group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] font-mono text-brand-gray/40 uppercase tracking-[0.2em]">Deployment</span>
                                    <span className="text-white font-mono font-bold text-xs">{joinDate}</span>
                                </div>
                                <div className="h-1 bg-white/5 overflow-hidden">
                                    <div className="h-full bg-neon-slime/40 w-full animate-pulse" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center group">
                                <span className="text-[10px] font-mono text-brand-gray/40 uppercase tracking-[0.2em]">Assets Secured</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-neon-slime font-mono font-black text-sm">{orders.length}</span>
                                    <div className="w-2 h-2 rounded-full bg-neon-slime animate-ping" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center group">
                                <span className="text-[10px] font-mono text-brand-gray/40 uppercase tracking-[0.2em]">Chaos Rating</span>
                                <span className="text-hot-pink font-mono font-black text-sm tracking-widest pl-2 bg-hot-pink/10 border-l-2 border-hot-pink">A+</span>
                            </div>
                        </div>

                        <button
                            onClick={signOut}
                            className="w-full mt-16 py-3 bg-white/5 border border-white/10 text-brand-gray/40 font-mono text-[9px] uppercase font-black hover:bg-glitch-red/10 hover:border-glitch-red hover:text-glitch-red transition-all tracking-[0.3em] group"
                        >
                            <span className="group-hover:animate-pulse">TERMINATE SESSION</span>
                        </button>
                    </div>
                </div>

                {}
                <div className="flex-grow">
                    <div className="mb-16">
                        <div className="flex items-center gap-6 mb-12">
                            <div className="p-3 bg-neon-slime/10 border border-neon-slime/20 shrink-0">
                                <Ticket size={24} className="text-neon-slime animate-pulse" />
                            </div>
                            <h3 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">Active <span className="text-neon-slime">Assets</span></h3>
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-neon-slime/30 to-transparent self-center mt-2" />
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <SpinnerGap className="text-neon-slime animate-spin" size={48} />
                            </div>
                        ) : activeOrders.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {activeOrders.map((order) => (
                                    <AssetCard 
                                        key={order.id} 
                                        order={order} 
                                        onClick={() => {
                                            const originalIndex = orders.findIndex(o => o.id === order.id);
                                            setSelectedOrderIndex(originalIndex);
                                            setIsTicketViewOpen(true);
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 border border-dashed border-white/10 bg-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-neon-slime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-brand-gray/40 font-mono uppercase tracking-[0.4em] text-sm mb-10 relative z-10">No active assets detected in this sector.</p>
                                <button
                                    onClick={() => navigate('/clubs')}
                                    className="px-10 py-4 bg-neon-slime text-void-black font-display font-black uppercase tracking-tighter italic hover:bg-white transition-all shadow-slime-glow relative z-10"
                                >
                                    INFILTRATE NETWORK
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-6 mb-10 px-4 py-3 bg-white/5 border-l-4 border-white/20">
                            <ClockCounterClockwise size={20} className="text-brand-gray/60" />
                            <h3 className="text-xl font-display font-black text-brand-gray/60 uppercase italic tracking-tighter leading-none">Past Transmissions</h3>
                            <div className="h-[1px] flex-grow bg-white/5 self-center mt-1" />
                        </div>

                        {pastOrders.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                                {pastOrders.map((order) => (
                                    <div key={order.id} className="border border-white/10 p-8 font-mono relative group bg-white/5">
                                        <div className="absolute top-2 right-2 w-1 h-1 bg-neon-slime/30" />
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[10px] text-brand-gray/40 mb-1 tracking-[0.2em] uppercase">Sector: {order.passType.event?.club?.city}</p>
                                                <h4 className="text-lg text-white uppercase font-black italic tracking-tighter leading-tight">
                                                    {order.passType.event?.title}
                                                </h4>
                                            </div>
                                            <Receipt size={20} className="text-brand-gray/20" />
                                        </div>
                                        <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-[10px] text-brand-gray/60 uppercase">
                                                <Calendar size={12} className="text-neon-slime/40" />
                                                {order.passType.event?.date ? new Date(order.passType.event.date).toLocaleDateString() : 'TBD'}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-neon-slime/60 font-black uppercase">
                                                <MapPin size={12} />
                                                {order.passType.event?.club?.name}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-brand-gray/40">
                                            <span>Tier: {order.passType.name}</span>
                                            <span className="px-2 py-0.5 bg-white/5 border border-white/10">Scanned_OK</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border border-dashed border-white/5 opacity-40">
                                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gray/40">No historical transmissions found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <TicketModal 
                isOpen={isTicketViewOpen}
                onClose={() => setIsTicketViewOpen(false)}
                orders={orders}
                initialIndex={selectedOrderIndex}
            />
        </div>
    );
}
