/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        audimat: ["Audimat"],
        sohne: ["Sohne"],
      },
      colors: {
        aws: '#FF9900',
        ldblue: '#3DD6F5',
        lddblue: '#405BFF',
        ldred: '#FF386B',
        ldpurple: '#A34FDE',
        ldyellow: '#EBFF38',
        ldgray: '#282828',
        ldgraytext: '#BCBEC0',
        ldhl: '#EBFF38',
        ldinput: '#212121',
        ldinputback: '#282828'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}