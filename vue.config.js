// vue.config.js
    
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       'assets': '@/assets',
  //       'components': '@/components',
  //       'views': '@/views',
  //       'img': '@/assets/img',
  //     }
  //   }
  // }
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      // .set('@', resolve('src'))
      .set("@assets", resolve("src/assets"))
      .set("@img", resolve("src/assets/img"))
  }
}
