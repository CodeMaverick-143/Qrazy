import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MagicLinkSent from './pages/MagicLinkSent';
import VerifyMagicLink from './pages/VerifyMagicLink';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/magic-link-sent" element={<MagicLinkSent />} />
                <Route path="/verify-magic-link" element={<VerifyMagicLink />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
