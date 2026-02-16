/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "void-black": "#050505", // Deepest black
                "neon-slime": "#CCFF00", // As requested
                "hot-pink": "#FF00FF",
                "electric-cyan": "#00FFFF",
                "chaos-purple": "#9D00FF",
                "glitch-red": "#FF004C",
                "warning-yellow": "#FFFF00",
                "glass-void": "rgba(5, 5, 5, 0.8)",
                "glass-slime": "rgba(204, 255, 0, 0.1)",
                // Legacy mappings to prevent crash during refactor
                "corp-bg": "#050505",
                "corp-bg-lighter": "#111",
                "trust-blue": "#00FFFF",
                "success-green": "#CCFF00",
                "error-red": "#FF004C",
                "brand-gray": "#dcdcdc",
                "brand-dark-blue": "#9D00FF",
            },
            fontFamily: {
                sans: ['Space Grotesk', 'Inter', 'sans-serif'], // Fun font
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Syne', 'Outfit', 'sans-serif'],
            },
            animation: {
                'glitch': 'glitch 1s linear infinite',
                'float-chaos': 'float-chaos 3s ease-in-out infinite',
                'spin-fast': 'spin 1s linear infinite',
                'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                'float-chaos': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotate(2deg)' },
                },
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                }
            },
            boxShadow: {
                'slime-glow': '0 0 15px rgba(204, 255, 0, 0.6)',
                'pink-glow': '0 0 15px rgba(255, 0, 255, 0.6)',
                'cyan-glow': '0 0 15px rgba(0, 255, 255, 0.6)',
            }
        },
    },
    plugins: [],
}
