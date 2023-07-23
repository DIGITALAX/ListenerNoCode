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
        ballena: "#FFD85F",
        fria: "#C1D17A",
        costa: "#2b90fd",
        run: "#ed8801",
        comp: "#5fabb9",
        rojo: "#8a021b",
      },
      fontFamily: {
        vcr: "VCR",
        ignite: "Ignite",
        mine: "Minecrafter",
      },
      width: {
        100: "33rem",
      },
      height: {
        100: "24.5rem",
      },
      zIndex: {
        1: 1,
      },
      screens: {
        tablet: "800px",
        max: "1460px",
        renewed: "988px",
        galaxy: "480px"
      },
    },
  },
  plugins: [],
};
