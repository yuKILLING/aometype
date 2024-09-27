/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#111111",
        primaryForeground: "#646669",
        primarySelected: "#f0f0f0"
      },
    },
  },
  plugins: [],
};
