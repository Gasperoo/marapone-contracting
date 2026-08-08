/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './*.html',
        './construction/**/*.html',
        './logistics/**/*.html',
        './src/**/*.{js,ts,jsx,tsx,html}',
    ],
    theme: {
        extend: {
            colors: {
                charcoal: '#1a1a1a',
                gunmetal: '#232323',
                steel: '#2e2e2e',
                plate: '#3a3a3a',
                // Muted TEXT. `plate` is a border/fill tone — as text on any of
                // our dark surfaces it lands at 1.53:1, far under the 4.5 WCAG
                // floor and effectively invisible on a phone in daylight, which
                // is where superintendents read this site. Use `ash` for muted
                // copy and keep `plate` for borders and fills.
                ash: '#9a9a9a',
                hiviz: '#f97316',
                hiviz2: '#fb923c',
                chalk: '#e8e8e8',
                fog: '#a0a0a0',
                marine: '#52b788',
                'marine-dark': '#2d6a4f',
                'marine-light': '#74c69d',
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
