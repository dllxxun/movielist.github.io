const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/movielist.github.io/'
    : '/',
  devServer: {
    port: 8080,
    historyApiFallback: true
  }
})