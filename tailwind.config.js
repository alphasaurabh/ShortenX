module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        orange: { 400: "#ff8a4c", 500: "#ff6b1a", 600: "#e65a00" },
        slate: { 900: "#071226", 800: "#0f1724", 700: "#0b1220" }
      },
      borderRadius: { "3xl": "1.25rem" },
      boxShadow: { "soft-2xl": "0 16px 40px rgba(2,6,23,0.7)" }
    },
  },
  plugins: [],
};
