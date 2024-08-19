/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        cl_purple: "#32012F",
        cl_purpleShadow: "#471a44",
        cl_greyDark: "#524C42",
        cl_greyLight: "#E2DFD0",
        cl_orange: "#F97300",
      }
    },
    container: {
      center: true
    },
    fontFamily: {
      Nunito: ["Nunito", "sans-serif"]
    }
  },
  plugins: [],
}

