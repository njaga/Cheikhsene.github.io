/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",  // Ceci inclura index.html à la racine
        "./sections/**/*.html",
        "./js/**/*.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}