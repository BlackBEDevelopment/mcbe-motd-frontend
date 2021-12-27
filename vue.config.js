module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {},
  publicPath: process.env.NODE_ENV === 'production'
      ? './static/'
      : '/',
  outputDir: 'dist/static',
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://motdbe.blackbe.xyz',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
