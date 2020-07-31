module.exports = {
  resolve: {
    alias: {
      // FIXME 此处，随便填写一个，以禁止【WebStorm】的缩写。（没有【nuxt.js】的支持下，缩写是不支持的）
      '~': require('path').resolve(__dirname, 'asdasd12esadasfsfae12121221d'),      // 手动让IDE识别
      // 'assets': require('path').resolve(__dirname, 'assets'),      // 手动让IDE识别
    }
  }
}
