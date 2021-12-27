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
  },
  /* 做成多页省去伪静态 history路由也不好看 */
  pages: {
    index: {
      entry: "src/index.js",
      template: "public/index.html",
    },
    iframe: {
      entry: "src/iframe.js",
      template: "public/iframe.html",
    }
  }
}
