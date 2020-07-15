module.exports = {
    purge: [],
    theme: {
      extend: {
        height: {
          "0": "0",
          "1/4": "25%",
          "1/2": "50%",
          "3/4": "75%",
          full: "100%",
        },
        minWidth: {
          "0": "0",
          "1/4": "25%",
          "1/2": "50%",
          "3/4": "75%",
          full: "100%",
        },
        minHeight: {
          "0": "0",
          "1/4": "25%",
          "1/2": "50%",
          "3/4": "75%",
          full: "100%",
        }
      },
    },
    variants: {
      visibility: ['responsive', 'hover', 'focus'],
      display: ['responsive', 'hover', 'focus']
    },
    plugins: [
      require('@tailwindcss/custom-forms'),
    ],
  }
  