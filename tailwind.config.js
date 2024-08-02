/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5541d7",
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
