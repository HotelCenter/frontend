/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
    './node_modules/flowbite/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#570df8",
        
"secondary": "#f000b8",
        
"accent": "#1dcdbc",
        
"neutral": "#2b3440",
        
"base-100": "#ffffff",
        
"info": "#3abff8",
        
"success": "#0FB478",
        
"warning": "#fbbd23",
        
"error": "#f87272",
        },
      },
    ],
  },
  theme: {
  },
  plugins: [
    require("flowbite/plugin"),
    require("daisyui")

  ],
}
