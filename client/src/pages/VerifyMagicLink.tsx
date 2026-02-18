import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyMagicLink() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your magic link...');

    useEffect(() => {
        const verify = async () => {
            const email = searchParams.get('email');
            const token = searchParams.get('token');

            if (!email || !token) {
                setStatus('error');
                setMessage('Invalid link parameters.');
                return;
            }

            try {
                // Assuming backend runs on port 4000
                const response = await fetch('http://localhost:4000/api/auth/magic-link/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, token }),
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage('Successfully verified! Redirecting...');
                    // Store user data if needed, e.g., context or localStorage
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Network error occurred.');
            }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-corp-bg text-white">
            <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">
                    {status === 'loading' && 'Verifying...'}
                    {status === 'success' && 'Success!'}
                    {status === 'error' && 'Error'}
                </h2>
                <p className={`text-lg ${status === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                    {message}
                </p>
                {status === 'error' && (
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 px-4 py-2 bg-brand-primary text-black font-semibold rounded hover:bg-opacity-90 transition"
                    >
                        Go Home
                    </button>
                )}
            </div>
        </div>
    );
}

export default VerifyMagicLink;
