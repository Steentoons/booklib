/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bl_primary': '#2B1E3E',
                'bl_secondary': '#1C1428',
                'bl_tertiary': '#D91D1D',
                'bl_yellow': '#F2B705',
                'bl_lightRed': '#F63F3F',
                'bl_lightPurple': '#231B2E'
            },
            padding: {
                DEFAULT: '1.25rem'
            },
            spacing: {
                sm: '0.625rem',
                md: '1.25rem',
                lg: '1.875rem',
                xl: '3.125rem'
            },
            screens: {
                xs: '478px',
                sm: '767px',
                md: '991px',
                lg: '1280px',
                xl: '1440px'
            },
            fontFamily: {
                segoe_UI: ["'Segoe UI'", 'sans-serif']
            }
        },
    },
    plugins: [],
}