/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@navikt/ds-tailwind')],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            screens: {
                xs: '370px',
            },
        },
    },
    plugins: [],
}
