/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    colors: {
      green: {
        DEFAULT: "#B89869",
        green: colors.brown,
      },
      red: {
        light: "#FDE9E6",
        DEFAULT: "#E61B00",
        red: colors.red,
      },
      "side-green": "#002604",
      "side-light": "#005309",
      "dash-white": "#F9F9F9",
      "tx-dark": "#111827",
      "tx-light-dark": "#6B7280",
      "outline-gray": "#E5E7EB",
      blue: colors.blue,
      themeGray: "#f5f5f5",
      gray: colors.gray,
      white: colors.white,
      lavender: "#e9e9ea",
      beige: "#e9fae2",
      black: "#000000",
      neutral: "#D1D5DB",
      accentBlue: "#50C8FC",
      darkGreen: "#004B08",
      grayBg: "#F9F9F9",
      secondary: "#005BD4",
      profileBtnBg: "rgba(217, 217, 217, 0.1)",
      profileBtnShadow:
        "inset 22.3px -22.3px 22.3px rgba(165, 165, 165, 0.1), inset -22.3px 22.3px 22.3px rgba(255, 255, 255, 0.1)",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      inset: {
        "-16": "-4rem",
      },
      backgroundImage: {
        auth: 'url("/img/auth/login.png")',
        password: 'url("/img/auth/password.png")',
        profile: 'url("/img/dashboard/profile-bg.png")',
        hero: "linear-gradient(rgba(158, 171, 225, 0.7),rgba(4,9,30,0.7)),url(/img/landing/justice.jpg)",
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: 0.4,
            filter: "none",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-700px 0",
          },
          "100%": {
            backgroundPosition: "700px 0",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-180deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        shimmer: "shimmer 1.3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("preline/plugin"),
  ],
};
