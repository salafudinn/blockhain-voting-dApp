/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#0a0a0a',
                'dark-card': '#1a1a1a',
                'dark-border': '#2a2a2a',
                'light-fg': '#ffffff',
                'light-secondary': '#a0a0a0',
                'accent-gradient-start': '#ffffff',
                'accent-gradient-end': '#666666',
            },
            backgroundImage: {
                'gradient-elegant': 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                'gradient-card': 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                'gradient-button': 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
                'gradient-button-hover': 'linear-gradient(135deg, #f0f0f0 0%, #b0b0b0 100%)',
            },
            boxShadow: {
                'elegant': '0 8px 32px 0 rgba(255, 255, 255, 0.05)',
                'elegant-hover': '0 12px 48px 0 rgba(255, 255, 255, 0.1)',
            },
        },
    },
    plugins: [],
}
