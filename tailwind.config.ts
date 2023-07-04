import { type Config } from "tailwindcss";
const colorList = [
  "amber",
  "cyan",
  "emerald",
  "gray",
  "green",
  "lime",
  "orange",
  "red",
  "rose",
  "slate",
  "yellow",
];

const colorsArray = colorList.flatMap((color) => [
  ...[...Array(10).keys()].flatMap((i) => [`bg-${color}-${i}00`]),
  `bg-${color}-950`,
  `bg-${color}-50`,
]);

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [...colorsArray, "text-black", "text-white"],
  plugins: [],
} satisfies Config;
