/** @type {import('tailwindcss').Config} */

const range = (start: number, end: number, increment = 1) => {
  const count = Math.floor((end - start + 1) / increment);
  return Array(count)
    .fill(0)
    .map((_, idx) => start + idx * increment);
};

const minSpacingPixel = 0;
const maxSpacingPixel = 2000;
const spacingPixelIncrement = 1;

const minFontSize = 4;
const maxFontSize = 140;

module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.tsx"],
  theme: {
    spacing: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce(
        (merged, f) => ({ ...merged, [f]: `${f}px` }),
        {}
      ),
    },
    fontFamily: {
      sora: "Sora",
      inter: "Inter",
    },
    extend: {
      fontSize: {
        ...range(minFontSize, maxFontSize).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {}),
      },
      gap: (theme: any) => theme("spacing"),
      height: (theme: any) => ({
        ...theme("spacing"),
      }),
      width: (theme: any) => ({
        ...theme("spacing"),
      }),
      inset: (theme: any, { negative }: any) => ({
        ...theme("spacing"),
        ...negative(theme("spacing")),
      }),
      borderRadius: (theme: any) => ({
        ...theme("spacing"),
      }),
    },
  },
  plugins: [],
};
