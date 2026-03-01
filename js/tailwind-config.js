tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1978e5",
        "background-light": "#f6f7f8",
        "background-dark": "#111821",
        amber: {
          500: "#f59e0b",
          900: "#78350f",
        },
        cyan: {
          500: "#06b6d4",
          900: "#164e63",
        },
        green: {
          500: "#22c55e",
          900: "#14532d",
        },
        emerald: {
          500: "#50C878",
        },
      },
      fontFamily: {
        display: "Inter",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
};
