import { EnvFlags } from '../envir/env-flags';
import ApiConfig from '../envir/api.config';
const isProcessDev = process.env.NODE_ENV !== 'production';
console.log('当前运行环境', 'isProcessDev', isProcessDev);
/**
 * 加速开关
 *        1.以下各项，true为开启优化，false为关闭优化。
 */
export class SpeedUpFlags {
}
/**
 * 是否使用【ForkTsCheckerNotifierWebpackPlugin】，进行异步【类型检查】
 *        1.WHY 存疑，nuxt.js的【TS套件】，自身有没有内置【ForkTsCheckerNotifierWebpackPlugin】？？？
 *        2.
 */
SpeedUpFlags.asyncTypeCheck = false;
/**
 * 是否【禁止TS脚本中，出现JS脚本】
 *        1.在【长时间编译】中，可以减少【7秒】左右的编译时间。
 *                1.在有【3个js脚本】的前提下，进行的测试。
 */
SpeedUpFlags.notAllow_JsInTs = true;
export class TypeScript_SpeedUp_Helper {
}
// noinspection RedundantConditionalExpressionJS
/**
 * 【tsconfig.json】
 *        TypeScript加速。
 *                1.其实，这一块的主要工作 是在【ts-loader】 里面做的。
 */
TypeScript_SpeedUp_Helper.tsConfig_JSON = {
    /**
     * 为【fork-ts-checker-webpack-plugin】插件，修复一个issue
     *        0.参考资料：
     *                1.https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#installation
     *        1.场景：
     *                1.当遇到【ts变动，但不会产生js】的场合（如 interface、type 变动），此时 默认情况下 不会触发【本插件的检查】。
     *                        0.参考资料：https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#type-only-modules-watching
     *        2.修复方案：
     *                1.加入该【配置项】。
     */
    _importsNotUsedAsValues: SpeedUpFlags.asyncTypeCheck ? 'preserve' : 'remove',
    /**
     * 见flag注释
     */
    _allowJs: SpeedUpFlags.notAllow_JsInTs ? false : true,
};
// noinspection RedundantConditionalExpressionJS
/**
 * 【nuxt.config.js】
 *        优化TypeScript的编译速度。
 *
 */
TypeScript_SpeedUp_Helper.nuxtConfig_JS = {
    /**
     * 【typeCheck】
     *        1.FIXME 这个值，似乎并不在【loaders选项】里面，而是和【loaders选项】同级？？？
     *
     * 【transpileOnly】
     *        1.缺省默认false。
     *        2.设置为true，可以加速TS的编译速度。
     */
    _buildModules: {
        _typeCheck: SpeedUpFlags.asyncTypeCheck ? false : true,
        _loadersCfg: {
            // typeCheck    : false,                // 这里无用。见注释
            transpileOnly: SpeedUpFlags.asyncTypeCheck ? true : false,
        },
    },
    get_SpeedUp_TypeCheck_Plugins() {
        if (SpeedUpFlags.asyncTypeCheck) {
            /**
             * TypeScript类型检查插件
             *        1.弥补，被【ts-loader】禁用的类型检查
             *                1.【ts-loader】禁用的初衷，是为了加速TS的编译速度
             */
            // FIXME 此处，非常坑！    【5.X版本】，一旦引入，如果不使用，就会报错！！！甚至装在【node_modules】里都会报错！！！
            // const ForkTsCheckerNotifierWebpackPlugin: ForkTsCheckerNotifierWebpackPlugin_Type = require('fork-ts-checker-notifier-webpack-plugin');
            const ForkTsCheckerNotifierWebpackPlugin = {};
            // const ForkTsCheckerWebpackPlugin: ForkTsCheckerWebpackPlugin_Type                 = require('fork-ts-checker-webpack-plugin');
            const ForkTsCheckerWebpackPlugin = {};
            return isProcessDev
                ? [
                    new ForkTsCheckerWebpackPlugin(
                    // {
                    //   // eslint: true,        // WARN 1.x版本写法
                    //   eslint: {               // WARN 5.x版本写法
                    //     enabled: true,
                    //     // files  : './src/**/*',
                    //     files  : '**/*',
                    //   },
                    // },
                    // FIXME 等待继续改造。。。。。。。。。。。。。。。。。。。。
                    ),
                    new ForkTsCheckerNotifierWebpackPlugin({
                        title: 'TypeScript',
                        excludeWarnings: false,
                    }),
                ]
                : [
                    new ForkTsCheckerWebpackPlugin({
                        async: false,
                        // useTypescriptIncrementalApi: true,               // FIXME 5.x版本无法识别？？？？？？？？？？？？？？？？？？？？？？？？？？
                        typescript: {
                            enabled: true,
                            memoryLimit: 4096,
                            // build      : false,     // 注意，此处是指【tsc --build】选项。（在tsconfig.json中也有类似选项。（WARN 和其它指令不大兼容，所以关闭）
                            extensions: {
                                vue: {
                                    enabled: true,
                                },
                            },
                            profile: true,
                        },
                        eslint: undefined,
                    }),
                ];
        }
        else {
            return [];
        }
    },
};
/**
 *
 */
export class CDN_Helper {
    // private static readonly d_staticPath = '/';                             // 【d:默认地址】 静态资源，原本统一存放的路径。
    static linkTowSplashPart(left, right) {
        if (!left.endsWith('/')) {
            throw new Error(`${left} -- left字符串，未以/结尾！`);
        }
        if (!right.startsWith('/')) {
            throw new Error(`${right} -- right字符串，未以/开头！`);
        }
        if (right.match(/\.(.{1,5})\/$/)) {
            throw new Error(`${right} -- right字符串，是文件格式，却以【/】结尾！！！`);
        }
        if (right.match(/\/([^.]*)[^/]$/)) {
            throw new Error(`${right} -- right字符串，是文件夹格式，却没有以【/】结尾！！！`);
        }
        const rmHeadS_right = right.replace(/^\//, '');
        return left + rmHeadS_right;
    }
    /**
     * 【static目录】
     *        1.传入path，必须以【"/"】开头。
     */
    static getStaticDir_CDN_Path(localPath, // 必须以【"/"】开头
    canUseCDN = true) {
        if (canUseCDN) {
            const url = CDN_Helper.linkTowSplashPart(CDN_Helper.c_baseUrl, localPath);
            console.log('CDN配置', 'static目录', /* 'isClient', isClient, */ 'EnvFlags.useCDN', EnvFlags.finalCheck_useCDN, 'url', url);
            return url;
        }
        else {
            console.log('该资源', localPath, '无法使用CDN');
            return localPath;
        }
    }
    test____getStaticDir_CDN_Path() {
        console.log('【测试CDN】assets', CDN_Helper._build_publicPath);
        // console.log('【测试CDN】static', CDN_Helper.getStaticDir_CDN_Path('/js/charting_library'));
        console.log('【测试CDN】static', CDN_Helper.getStaticDir_CDN_Path('/js/charting_library/'));
        console.log('【测试CDN】static', CDN_Helper.getStaticDir_CDN_Path('/js/charting_library/', false));
        // console.log('【测试CDN】static', CDN_Helper.getStaticDir_CDN_Path('/js/iconfont.js/'));
        console.log('【测试CDN】static', CDN_Helper.getStaticDir_CDN_Path('/js/iconfont.js'));
    }
}
/**
 * 末尾，要记得保留【"/"】。
 */
CDN_Helper.c_baseUrl = (function () {
    return EnvFlags.finalCheck_useCDN
        ? ApiConfig.cdnPath // 【c:CDN地址】 基本地址。
        : '/';
})();
CDN_Helper.d_publicPath = '/_nuxt/'; // 【d:默认地址】
//
//
//
//
//
/**
 * 【assets目录】
 * 条件：
 *    1.客户端 + 需要CDN环境
 */
CDN_Helper._build_publicPath = (function () {
    const url = CDN_Helper.linkTowSplashPart(CDN_Helper.c_baseUrl, CDN_Helper.d_publicPath);
    console.log('CDN配置', 'assets目录', /* 'isClient', isClient, */ 'EnvFlags.useCDN', EnvFlags.finalCheck_useCDN, 'url', url);
    return url;
})();
new CDN_Helper().test____getStaticDir_CDN_Path();
//# sourceMappingURL=gen-helper.js.map