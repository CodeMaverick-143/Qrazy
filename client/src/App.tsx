import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SpinnerGap } from '@phosphor-icons/react/dist/icons/SpinnerGap';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const MagicLinkSent = lazy(() => import('./pages/MagicLinkSent'));
const VerifyMagicLink = lazy(() => import('./pages/VerifyMagicLink'));
const Clubs = lazy(() => import('./pages/Clubs'));
const Events = lazy(() => import('./pages/Events'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const Profile = lazy(() => import('./pages/Profile'));

import { ToastProvider } from './context/ToastContext';
import CyberBackground from './components/CyberBackground';

const PageLoader = () => (
    <div className="flex-grow flex flex-col items-center justify-center bg-void-black relative overflow-hidden">
        <div className="scanline" />
        <div className="relative mb-8">
            <SpinnerGap className="text-neon-slime animate-spin" size={80} />
            <div className="absolute inset-0 blur-2xl bg-neon-slime/20 animate-pulse" />
        </div>
        <div className="space-y-2 text-center">
            <div className="text-neon-slime font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
                System_Initialization_In_Progress
            </div>
            <div className="flex gap-1 justify-center">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-12 h-[2px] bg-white/10 overflow-hidden">
                        <div
                            className="h-full bg-neon-slime animate-[scanline_2s_linear_infinite]"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

function App() {
    return (
        <ToastProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-void-black flex flex-col relative overflow-hidden">
                    <CyberBackground />
                    <div className="scanline" />
                    <Navbar />
                    <main className="flex-grow pt-20 flex flex-col">
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/magic-link-sent" element={<MagicLinkSent />} />
                                <Route path="/verify-magic-link" element={<VerifyMagicLink />} />
                                <Route path="/clubs" element={<Clubs />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/event/:id" element={<EventDetails />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </ToastProvider>
    );
}

export default App;
