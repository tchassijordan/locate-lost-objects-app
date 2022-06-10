module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      font: {
        primary: 'Lato,  sans-serif'
      },
      colors: {
        primary: '#EA580C'
      },
      backgroundImage: {
        'hero-pattern': "url('assets/hero-bg.jpg')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
