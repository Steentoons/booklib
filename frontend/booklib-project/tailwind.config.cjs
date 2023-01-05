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
            }
        },
    },
    plugins: [],
}