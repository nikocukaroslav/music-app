module.exports = {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        screens: {
            "max-[900px]": "900px",
            "max-[1150px]": "1150px",
            "max-[550px]": "550px",
        },
        fontFamily: {
            sans: ["Roboto Mono", "monospace"],
        },
        extend: {
            // Other custom styles if needed
        },
    },
    plugins: [],
};
