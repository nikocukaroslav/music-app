module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      "max-[900px]": "900px",
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
