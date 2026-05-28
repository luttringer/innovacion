module.exports = {
  content: ["./*.html","./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "#1997f0",
        "background-light": "#f8fafc",
        "background-dark": "#0f172a",

        // Gris neutro (escala corta pero práctica)
        neutral: {
          50:  "#f8fafb",
          100: "#f1f5f7",
          200: "#e2e8ee",
          300: "#cfd8e1",
          400: "#9aa7b5",
          500: "#6b7785",
          600: "#4b5561",
          700: "#37414b",
          800: "#262d35",
          900: "#1b2127",
        },
        
        anep_cyan: "rgb(0,174,239)",
        anep_cyan_two: "#08c",
        anep_cyan_three: "rgb(0,155,219)",
        anep_yellow: "rgb(255,204,0)",
        anep_blue: "rgb(22,65,148)",
        anep_black: "rgb(35,31,32)",
        anep_blue: "#0d6efd",
        anep_indigo: "#6610f2",
        anep_purple: "#6f42c1",
        anep_pink: "#d63384",
        anep_red: "#dc3545",
        anep_orange: "#fd7e14",
        anep_yellow: "#ffc107",
        anep_green: "#198754",
        anep_teal: "#20c997",
        anep_gray: "#bfbfbf",
        anep_gray: "#bfbfbf",
        nodos_purple: "#99448b",


        // Cremas (fondos cálidos suaves)
        cream: {
          50:  "#fffdf5",
          100: "#fff9e8",
          200: "#fcf3d4",
          300: "#f7eab5",
          DEFAULT: "#fcfac3",
        },

        // Acentos mínimos (podés renombrar/ajustar hex)
        brand:  "#9D2236", // bordó
        accent: "#F8E71D", // dorado/amarillo
        red_terciaria:"#900",
        black_one: "#333",
        gray_one: "#fcfcfc"
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif;"],
        display: ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
};