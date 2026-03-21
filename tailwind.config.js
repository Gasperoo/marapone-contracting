/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './*.html',
        './src/**/*.{js,ts,jsx,tsx,html}',
    ],
    theme: {
        extend: {
            colors: {
                charcoal: '#1a1a1a',
                gunmetal: '#232323',
                steel: '#2e2e2e',
                plate: '#3a3a3a',
                hiviz: '#f97316',
                hiviz2: '#fb923c',
                chalk: '#e8e8e8',
                fog: '#a0a0a0',
            },
            fontFamily: {
                display: ['Bebas Neue', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
                mono: ['DM Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
