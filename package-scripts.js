const npsUtils = require('nps-utils'); // not required, but handy!

const quo  = `\"`;   // 双引号
const tQuo = new Array(3 + 1).join(quo);    // 三个双引号

const tsNode_cmdHead = `    ts-node  --files  --compiler-options=\"{ \\\"module\\\":\\\"commonjs\\\" }\"    `;

const LostErrorSentry_Cfg = {
  srcPath         : `./sources/sentry/init`,
  staticTargetPath: `./sources/sentry/dist/static`,
  TsName          : 'LostErrorSentry.ts',
  JsName          : 'LostErrorSentry.js',
  MinJsName       : 'LostErrorSentry.min.js',

  tsPath() {
    return this.srcPath + '/' + this.TsName;
  },

  jsPath() {
    return this.srcPath + '/' + this.JsName;
  },

  minJsPath() {
    return this.srcPath + '/' + this.MinJsName;
  },

  staticMinJsPath() {
    return this.staticTargetPath + '/' + this.MinJsName;
  },

};

module.exports = {
  scripts: {
    /**
     * Demo展示。
     */
    demo: {
      /**
       * 辅助命令
       */
      'load-tsconfig-by-js'     : `${tsNode_cmdHead}  ./sources/gen/demo/gen-tsconfig.ts`,                                         // 动态js生成 tsconfig.js
      'copy-local-config'       : 'shx cp -f ./config/api.config.local.ts ./config/api.config.ts',              // 复制【环境配置】
      'inject-cdn-2-tradingView': `${tsNode_cmdHead}  ./sources/gen/gen-tradingView.ts`,

      'CalcReturnTest': `${tsNode_cmdHead} ./sources/swap/CalcReturnTest/swap.bgex.com.ts`,

      vue: {
        'serve': 'vue-cli-service serve',
        'build': 'vue-cli-service build',
        'lint' : 'vue-cli-service lint',
      }
    },

    /**
     * Sentry相关
     */
    sentry: {
      'tsc'                 : npsUtils.series(
        // `tsc.cmd --target es3 --module umd ${LostErrorSentry_Cfg.tsPath()}`,       // FIXME 注意，这里如果指定module，则无法直接执行。
        `tsc.cmd --target es3 --module none ${LostErrorSentry_Cfg.tsPath()}`,   // FIXME 如果想直接执行，则需要指定module。
        // `tsc.cmd --target es3 --module umd --types ${LostErrorSentry_TsPath}`,
        // `tsc.cmd ${LostErrorSentry_TsPath} --target es3 --module umd`,
        // `tsc.cmd ${LostErrorSentry_TsPath}`,
      ),
      'uglify'              : npsUtils.series(
        `uglifyjs  ${LostErrorSentry_Cfg.jsPath()}  -m  -o  ${LostErrorSentry_Cfg.minJsPath()}`,
        `shx cp -f ${LostErrorSentry_Cfg.minJsPath()} ${LostErrorSentry_Cfg.staticMinJsPath()}`
      ),
      /**
       * 此处，不能使用【npsUtils.series】，原因是【前一个任务，会报出非0错误码】。
       */
      'combine-tsc-uglifyjs': [
        npsUtils.series.nps('sentry.tsc'),
        npsUtils.series.nps('sentry.uglify')
      ].join(' & '),
    },
    /**
     * 辅助工具
     */
    tool  : {
      'complete-reinstall': npsUtils.series(
        'shx rm -rf .cache/ dist/ package-lock.json  node_modules/',    // 清除目录
        'npm install',                                                        // 重装依赖
      ),
    },
    /**
     * 相关打包命令
     */
    build : {
      'tool-compile': npsUtils.series(
        'tsc',          // 1.先进行编译
        `${tsNode_cmdHead} ./sources/gen/demo/copy-after-tsc.ts`,                   // 2.再进行【复制】
      ),
    },

    /**
     * NPM发布、部署相关。
     */
    npm: {
      'auto-publish': npsUtils.series(
        npsUtils.series.nps('build.tool-compile'),
        'npm version patch',
        'npm publish'
      )
    },
  }
};
