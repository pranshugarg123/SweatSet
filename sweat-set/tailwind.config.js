/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            transform: ["hover", "focus"],
            skew: {
                "-15": "-15deg",
                15: "15deg",
            },
        },
    },
    plugins: [],
};
