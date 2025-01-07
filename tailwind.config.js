/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'content-area': 'calc(100vh - 6.25rem)', // Adjust `4rem` as needed
        'form-area': 'calc(100vh - 13rem)', // Adjust `4rem` as needed
        'builder-canvas-area': 'calc(100vh - 8.75rem)', // Adjust `4rem` as needed
      },
      colors:{
        green: '#34A853',
      }
    },
  },
  plugins: [],
}