module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      font: {
        'primary': 'Lato,  sans-serif'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
