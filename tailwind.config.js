/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        offBlack: "#031402",
        ligeroAzul: "#23FEFC",
        oscuraAzul: "#341CFE",
        ama: "#F6D39B",
        moda: "#E3E1EE",
        sol: "#EDFF95",
        aBlack: "#010101",
        rio: "#8EADB5",
        verde: "#2CC5AF",
      },
      fontFamily: {
        vcr: "VCR",
        ignite: "Ignite",
      },
      width: {
        100: "33rem",
      },
      zIndex: {
        1: 1,
      },
    },
  },
  plugins: [],
};
