export default {
  theme: {
    container: {
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        lg: "8rem",
        xl: "10rem",
        "2xl": "12rem",
      },
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        display: ["Helvetica", "sans-serif"],
        body: ["Graphik", "sans-serif"],
        mono: ["Inconsolata", "monospace"],
        fantasy: ["Trattatello", "fantasy"],
      },
      borderWidth: {
        default: "1px",
        0: "0",
        2: "2px",
        4: "4px",
      },
      spacing: {
        96: "24rem",
        128: "32rem",
      },
      colors: {
        cyan: "#9cdbff",
        background: "#0f1c1e", // terafox bg
        foreground: "#cbd9d8", // terafox fg
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        "bounce-slow": "bounce 3s",
      },
      scale: {
        '102': '1.02'
      },
      typography: {
        // Disable styling for code blocks as handled by @nuxt/content Shikiji integration:
        //  - https://content.nuxt.com/usage/markdown#code-highlighting
        //  - https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-666683597
        default: {
          css: {
	    pre: false,
	    code: false,
	    'pre code': false,
            'code::before': false,
	    'code::after': false,
	    'code::before': false,
	    'code::after': false,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
