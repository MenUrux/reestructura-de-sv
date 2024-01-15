/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/views/**/*.handlebars",

  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Oswald', 'sans-serif'],
      }
    }
  },
  plugins: [],
}

