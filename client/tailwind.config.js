/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "pitch-black": "#050505",
                "section-dark": "#0a0a0a",
                "qrazy-orange": "#FF5500",
                "neon-pink": "#FF00FF",
                "neon-purple": "#BC13FE",
                "neon-blue": "#00F0FF",
                "dark-bg": "#050505",
                "card-bg": "#0F0F0F",
                "glass": "rgba(255, 255, 255, 0.05)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 12s linear infinite',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, filter: 'brightness(1.2)' },
                    '50%': { opacity: 0.8, filter: 'brightness(1)' },
                }
            },
            boxShadow: {
                'orange-glow': '0 0 20px rgba(255, 85, 0, 0.4)',
                'neon-glow': '0 0 20px rgba(188, 19, 254, 0.4)',
            }
        },
    },
    plugins: [],
}
