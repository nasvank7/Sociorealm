/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js,ts,tsx}"],
  darkMode: 'class',
  theme: {
    
    extend: {
      colors: {
        // Define your dark mode colors
        dark: {
          DEFAULT: '#333333', // Example dark mode background color
        },
      },
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
      },
      scrollbar: {
        'hidden': {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      },
    },

  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode variants for background colors
      textColor: ['dark'], // Enable dark mode variants for text colors
    },
  },
   plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          '::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      }, ['responsive']);
    },
  ],
}

