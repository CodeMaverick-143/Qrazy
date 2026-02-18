import { Link } from 'react-router-dom';

function MagicLinkSent() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-corp-bg text-white">
            <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Check your email</h2>
                <p className="mb-6 text-gray-300">
                    We've sent a magic link to your email address. Click the link to sign in.
                </p>
                <Link to="/" className="text-brand-primary hover:underline">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default MagicLinkSent;
