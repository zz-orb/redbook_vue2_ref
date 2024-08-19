// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
