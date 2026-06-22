// PostCSS pipeline used by Vite to process Tailwind's CSS directives
// and add vendor prefixes for older browsers.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
