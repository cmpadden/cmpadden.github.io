import defaultTheme from "tailwindcss/defaultTheme";

export default {
    theme: {
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
                grayish: "#0D2439",
                blackish: "#5E81AC",
                cyan: "#9cdbff",
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                }
            },
            animation: {
                wiggle: "wiggle 2s ease-in-out infinite",
                'bounce-slow': "bounce 3s"
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
