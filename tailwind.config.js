/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A3A7D', // azul marino
        secondary: '#FFC62B' // dorado
      }
    }
  },
  plugins: []
};
