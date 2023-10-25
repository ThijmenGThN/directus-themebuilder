
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {

        // ----- Recommended -----
        // Use https://realtimecolors.com to pick your palette,
        // then supply https://tailwindshades.com with your colors
        // to generate the objects that are required below.

        primary: {
          DEFAULT: '#11999E',
          50: '#76ECF0',
          100: '#64E9EE',
          200: '#3FE4EA',
          300: '#1ADFE6',
          400: '#15BDC3',
          500: '#11999E',
          600: '#0C686B',
          700: '#063739',
          800: '#010606',
          900: '#000000',
          950: '#000000'
        },
        secondary: {
          DEFAULT: '#119E7F',
          50: '#76F0D5',
          100: '#64EED0',
          200: '#3FEAC5',
          300: '#1AE6B9',
          400: '#15C39D',
          500: '#119E7F',
          600: '#0C6B56',
          700: '#06392E',
          800: '#010605',
          900: '#000000',
          950: '#000000'
        },
        accent: {
          DEFAULT: '#092A2C',
          50: '#28BBC4',
          100: '#25ABB3',
          200: '#1E8B92',
          300: '#176B70',
          400: '#104A4E',
          500: '#092A2C',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        }
      }
    }
  }
}
