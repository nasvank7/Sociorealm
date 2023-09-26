/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js,ts,tsx}"],
  theme: {
    
    extend: {
      scrollbarHidden: {
        '&::-webkit-scrollbar': {
          width: '0.5rem', // You can adjust this width if needed
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent', // Hide the thumb
        },
        'scrollbar-width': 'thin', // "thin" or "none" depending on your preference
        'scrollbar-color': 'transparent transparent', // Hide thumb and track
      },
      fontFamily: {
        'sedgwick-ave-display': ['Sedgwick Ave Display', 'cursive'],
        'qwitcher-grypen': ['Qwitcher Grypen', 'cursive'],
      }
    },
  },
  plugins: [],
}

