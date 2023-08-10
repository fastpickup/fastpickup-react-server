/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('images/main_bg.jpg')"
      },
      boxShadow: {
        'custom': '0 0 10px 3px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}