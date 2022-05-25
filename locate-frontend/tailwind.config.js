module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
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
