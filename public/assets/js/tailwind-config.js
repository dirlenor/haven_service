
tailwind.config = {
    theme: {
        extend: {
            colors: {
                "primary": "#d32f2f",
                "background-light": "#f8f7f6",
                "background-dark": "#221810",
                "industrial-black": "#1a1a1a",
                "industrial-white": "#FFFFFF",
                "industrial-gray": "#F9F9F9",
                "border-gray": "#E5E5E5",
            },
            fontFamily: {
                "display": ["Anuphan", "sans-serif"],
                "thai": ["Anuphan", "sans-serif"],
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.btn': {
                    '@apply inline-flex items-center justify-center rounded-lg font-bold transition-all active:scale-95 cursor-pointer': {},
                },
                '.btn-primary': {
                    '@apply bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90': {},
                },
                '.btn-outline': {
                    '@apply border-2 border-primary text-primary hover:bg-primary/5': {},
                },
                '.card': {
                    '@apply bg-white  rounded-2xl overflow-hidden shadow-sm border border-gray-100 ': {},
                },
                '.card-hover': {
                    '@apply hover:shadow-xl transition-all duration-300': {},
                }
            })
        }
    ]
}
