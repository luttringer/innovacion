module.exports = (ctx) => ({
  plugins: {
    'postcss-nested': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(ctx.env === 'production' ? { cssnano: {} } : {})
  },
});