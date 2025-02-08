/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Scans all React files in the src/ folder
    "./public/index.html",         // Includes index.html if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
