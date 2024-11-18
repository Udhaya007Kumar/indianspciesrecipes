import daisyui from "daisyui"
// import daisyuiUIThemes, { Customtheme } from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
     ],
    //  daisyui:{
    //   themes: [
    //      "light",
    //     "dark",
    //     "cupcake",
    //     {
    //       Customtheme: {
    //         ...daisyuiUIThemes.black, 
    //         "primary": "#a991f7",
    //         "secondary": "#f6d860",
    //         "accent": "#37cdbe",
    //         "neutral": "#3d4451",
    //         "base-100": "#ffffff",
    //       },
    //     }
    //   ]
    //  }
}

