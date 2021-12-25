module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {},
  publicPath: process.env.NODE_ENV === 'production'
      ? './static/'
      : '/',
  outputDir: 'dist/static'
}
