module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./source/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#11999e",
        "primary-active": "#0c7275",

        "dark": '#262626',
        "dark-active": '#404040'
      }
    }
  }
}