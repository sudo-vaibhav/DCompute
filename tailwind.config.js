module.exports = {
  important: true,
  //Purging for Production is configured in PostCSS Config
  purge: {
    content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  },

  theme: {
    fontFamily: {
      display: ['Poppins', 'sans-serif'],
      body: ['Montserrat', 'sans-serif'],
    },
    colors: {
      primary: {
        700: 'hsl(303, 90%, 50%)',
        900: 'hsl(281, 81%, 56%)',
      },
      secondary: {
        700: 'hsl(217, 79%, 49%)',
        900: 'hsl(232, 73%, 50%)',
      },
      dark: {
        500: 'hsl(240, 42%, 20%)',
        700: 'hsl(240, 48%, 13%)',
        900: 'hsl(240, 42%, 8%)',
      },
      light: {
        100: '#ffffff',
        500: '#888888',
      },
      transparent: {
        900: 'rgba(1,1,1,0)',
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [
    function ({ addBase, theme }) {
      // this function essentially adds all the colors mentioned above as css variables in the code
      // which can be very helpful
      // https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574

      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      })
    },
  ],
}
