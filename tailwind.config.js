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
        moda: "#E3E1EE"
      },
      fontFamily: {
        vcr: "VCR",
        ignite: "Ignite"
      },
    },
  },
  plugins: [],
};
