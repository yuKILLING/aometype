/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#111111",
        primaryForeground: "#da0037",
        primarySelected: "#f0f0f0",
        primaryError: "#374151",
      },
    },
  },
  plugins: [],
};
