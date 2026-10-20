/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        care: {
          50: "#fff9e8", 100: "#f9edc8", 200: "#f0d98e",
          500: "#c89a20", 600: "#ad8014", 700: "#8c6611",
          800: "#63490f", 900: "#29251b"
        }
      },
      boxShadow: {
        soft: "0 24px 70px rgba(16, 70, 61, 0.12)"
      }
    }
  },
  plugins: []
};