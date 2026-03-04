import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MagicLinkSent from './pages/MagicLinkSent';
import VerifyMagicLink from './pages/VerifyMagicLink';
import Clubs from './pages/Clubs';
import EventDetails from './pages/EventDetails';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-void-black flex flex-col">
                <Navbar />
                <main className="flex-grow pt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/magic-link-sent" element={<MagicLinkSent />} />
                        <Route path="/verify-magic-link" element={<VerifyMagicLink />} />
                        <Route path="/clubs" element={<Clubs />} />
                        <Route path="/event/:id" element={<EventDetails />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
