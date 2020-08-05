// import '@types/webpack-chain';

/*

// TODO 此处，很糟糕。typeof的类型推断，似乎在 js 的类型声明中，失效了。  需要手动补上类型？？？

// TIP 注意，此处，Config本身有类型，但是该类型，其实使用  js的class语法 展示的！！！（没有使用ts、.d.ts、@types，而统统是使用  js的class语法）
// TIP 注意，此处，Config本身有类型，但是该类型，其实使用  js的class语法 展示的！！！（没有使用ts、.d.ts、@types，而统统是使用  js的class语法）
// TIP 注意，此处，Config本身有类型，但是该类型，其实使用  js的class语法 展示的！！！（没有使用ts、.d.ts、@types，而统统是使用  js的class语法）
import * as  Config from 'webpack-chain';

//
const config = new Config();              // TIP 注意，此处，Config本身有类型，但是该类型，其实使用  js的class语法 展示的！！！（没有使用ts、.d.ts、@types，而统统是使用  js的class语法）
config.toConfig();
type WC_Config_Type = typeof config;

*/


// const { Chaine} = import 'webpack-chain';

// 方式一，在_framework中手动添加

// 方式二
// export declare const default: {};

// 方式三
// TIP 此处，有点奇怪？？？  这种方式竟然没有成功？
// declare module 'vue.config' {
//   // export = function (aaa: string): string;
//   export = {
//     st: string;
// }
// }

// 方式四（这种方式，使用的面比较广！  TIP 推荐有时候，可以和  方式六 ，一起使用！）
// declare var module: {
//   // exports: {
//   //   a: string,
//   //   b: string,
//   //   c: string,
//   //   dddddddddddddddddd: string,
//   // },
//   exports: ITypeVueCliConfig;
// };

// 方式五
// const TypedVueCliConfig: { aaaaaaaaaaaaaaaa: string };
//
// function a() {
//
// }
//
// declare module 'vue.config' {
//   export = TypedVueCliConfig;
//   // export = a;
// }

/**
 * 方式六（最终找到的方式）
 *        1.（并且，和方式四  可以很好的配合使用！）
 *        2.TODO 所有的类型，在这里写，就是了！！！666
 *        3.并且，可以配合【@types/webpack-chain】一起使用！！
 */
  // interface ITypeVueCliConfig {
  //   a: string;
  //   b: string;
  //   c: string;
  //   dddddddddddddddddd: string;
  // }


  // TIP ————————————————————————————————————————总结方案————————————————————————————————————

declare var module: {
    exports: VueCliNS.IVueConfig;
  };


declare namespace __InnerUse_VueConfigType {
  namespace WebpackChain {

    type __ChainedMap_Method = <T extends Base.ChainedMap>(/*仅用字符串，表示方法名*/ value: string) => T;
    type __ChainedMap_Value = any;
    type __ChainedMap_CleanResult = any;

    type __ChainedSet_Value = any;


    interface __ChainedMap_Entries {
    }

    type WebpackPlugin_Instance = any;

    type InitedByWC_WebpackPlugin_Instance = WebpackPlugin_Instance & {
      __pluginName: string;
      __pluginArgs: [];
      __pluginConstructorName: string;
      __pluginPath: string;
    };

    // TIP——————————————————————————————————基本数据结构————————————————————————————————
    namespace Base {
      class Chainable<Parent extends Chainable<Chainable> = any> {
        public parent: Parent;

        constructor(parent: Parent) //
        public batch(
          handler: (chainable: this) => void,
        ): this;     //
        // public end<T extends Chainable>(): Combined_Rule ;
        public end(): Parent ;
      }

      class Orderable {
        public before(name: {}): this;//
        public after(name: {}): this;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      /**
       * 1.泛型，用于不同类的方法，返回不同的泛型类型。（类似方法，在不同类中的复用。）
       */
      class ChainedMap<                                   // 以下，是泛型的加入
        GetValueType extends __ChainedMap_Value = __ChainedMap_Value,
        Parent extends Chainable<Chainable> = any,
        > extends Chainable<Parent> {
        public store: Map<string, any>;
        public shorthands: __ChainedMap_Method[];

        constructor(parent: Chainable);

        /**
         * @description 用法示例
         // 经常用于，将一些常见选项，简化成【速记方法】。
         this.extend([
         'amd',
         'bail',
         'cache',
         'context',
         'devtool',
         'externals',
         'loader',
         'mode',
         'parallelism',
         'profile',
         'recordsInputPath',
         'recordsPath',
         'recordsOutputPath',
         'stats',
         'target',
         'watch',
         'watchOptions',
         ]);
         *
         * @param methods
         */
        public extend(methods: __ChainedMap_Method[]): this;//
        public clear(): this;//
        public delete(key: string): this;//
        public order(): {
          entries: __ChainedMap_Entries, order: [],
        };//
        public entries(): { entries: __ChainedMap_Entries } | undefined; //
        public values(): [];//
        public get(key: string): GetValueType;//
        public getOrCompute(key: string, fn: Function): __ChainedMap_Value;//
        public has(key: string): boolean;//
        public set(key: string, value: __ChainedMap_Value): this;//
        public merge(obj: {}, moit: []): this;//
        public clean(obj: {}): __ChainedMap_CleanResult;//
        public when(condition: boolean, whenTruthy: Function, whenFalsy: Function): this;//
      }

      class ChainedSet extends Chainable {
        public store: Set<__ChainedSet_Value>;

        constructor(parent: Chainable);

        public add(value: __ChainedSet_Value): this;//
        public prepend(value: __ChainedSet_Value): this;//
        public clear(): this;//
        public delete(value: __ChainedSet_Value): this;//
        public values(): __ChainedSet_Value[];//
        public has(value: __ChainedSet_Value): boolean;//
        public merge(arr: __ChainedSet_Value[]): this;//
        public when(condition: boolean, whenTruthy: Function, whenFalsy: Function): this;//
      }

    }

    // TIP——————————————————————速记方法——————————————————————————
    namespace QuickMemory {

      // TIP 此处，是对于原【webpack-chain】库，一些未明确提到的【ForXxx】方法的增强
      namespace Enlarge_ForXxx {

        // type LoaderFn_Return_Options = (value: {}) => Enlarge_ForXxx.Options;                     // 此处，一般  use(xx).loader(yy).options(zz).end()。  所以，我们做出调整.

        interface Loader extends Base.ChainedMap<__ChainedMap_Value, Combined_Rule> {
          // 暂时，可以不放方法。
          // (): void;
          // options: LoaderFn_Return_Options;
          options(value: {}): Enlarge_ForXxx.Options;
        }

        interface Options extends Base.ChainedMap<__ChainedMap_Value, Combined_Rule> {
          // 继承父类的  end() 方法。
        }

      }

      /**
       * 1.在这后面，加上 【T & this】。  天才的想法！！！  ！！！
       *            1.类型推断准确
       *            2.调用过程精简
       *
       * 2.
       *
       */

      interface ForConfig<T> {
        amd(value: any): T & this;//
        bail(value: any): T & this;//
        cache(value: any): T & this;//
        context(value: any): T & this;//
        devtool(value: any): T & this;//
        externals(value: any): T & this;//
        loader(value: any): T & this;//
        mode(value: any): T & this;//
        parallelism(value: any): T & this;//
        profile(value: any): T & this;//
        recordsInputPath(value: any): T & this;//
        recordsPath(value: any): T & this;//
        recordsOutputPath(value: any): T & this;//
        stats(value: any): T & this;//
        target(value: any): T & this;//
        watch(value: any): T & this;//
        watchOptions(value: any): T & this;//
      }

      interface ForResolve<T> {
        cachePredicate(value: any): T & this;//
        cacheWithContext(value: any): T & this;//
        concord(value: any): T & this;//
        enforceExtension(value: any): T & this;//
        enforceModuleExtension(value: any): T & this;//
        symlinks(value: any): T & this;//
        unsafeCache(value: any): T & this;//
      }

      type ForResolveLoader<T> = ForResolve<T>;

      interface ForOutput<T> {
        auxiliaryComment(value: any): T & this;//
        chunkCallbackName(value: any): T & this;//
        chunkFilename(value: any): T & this;//
        chunkLoadTimeout(value: any): T & this;//
        crossOriginLoading(value: any): T & this;//
        devtoolFallbackModuleFilenameTemplate(value: any): T & this;//
        devtoolLineToLine(value: any): T & this;//
        devtoolModuleFilenameTemplate(value: any): T & this;//
        devtoolNamespace(value: any): T & this;//
        filename(value: any): T & this;//
        globalObject(value: any): T & this;//
        hashDigest(value: any): T & this;//
        hashDigestLength(value: any): T & this;//
        hashFunction(value: any): T & this;//
        hashSalt(value: any): T & this;//
        hotUpdateChunkFilename(value: any): T & this;//
        hotUpdateFunction(value: any): T & this;//
        hotUpdateMainFilename(value: any): T & this;//
        jsonpFunction(value: any): T & this;//
        library(value: any): T & this;//
        // 参考链接：https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93
        libraryExport(value: 'default'): T & this;//                     TIP 在【--target lib】模式下，对于【.js 或 .ts】，如果你没有任何具名导出并希望直接暴露默认导出，则应该  设置该值为【default】。
        libraryTarget(value: any): T & this;//
        path(value: any): T & this;//
        pathinfo(value: any): T & this;//
        publicPath(value: any): T & this;//
        sourceMapFilename(value: any): T & this;//
        sourcePrefix(value: any): T & this;//
        strictModuleExceptionHandling(value: any): T & this;//
        umdNamedDefine(value: any): T & this;//
        webassemblyModuleFilename(value: any): T & this;//
      }

      interface ForDevServer<T> {
        bonjour(value: any): T & this;//
        clientLogLevel(value: any): T & this;//
        color(value: any): T & this;//
        compress(value: any): T & this;//
        contentBase(value: any): T & this;//
        disableHostCheck(value: any): T & this;//
        filename(value: any): T & this;//
        headers(value: any): T & this;//
        historyApiFallback(value: any): T & this;//
        host(value: any): T & this;//
        hot(value: any): T & this;//
        hotOnly(value: any): T & this;//
        https(value: any): T & this;//
        info(value: any): T & this;//
        inline(value: any): T & this;//
        lazy(value: any): T & this;//
        noInfo(value: any): T & this;//
        open(value: any): T & this;//
        openPage(value: any): T & this;//
        overlay(value: any): T & this;//
        pfx(value: any): T & this;//
        pfxPassphrase(value: any): T & this;//
        port(value: any): T & this;//
        proxy(value: any): T & this;//
        progress(value: any): T & this;//
        public(value: any): T & this;//
        publicPath(value: any): T & this;//
        quiet(value: any): T & this;//
        setup(value: any): T & this;//
        socket(value: any): T & this;//
        staticOptions(value: any): T & this;//
        stats(value: any): T & this;//
        stdin(value: any): T & this;//
        useLocalIp(value: any): T & this;//
        watchContentBase(value: any): T & this;//
        watchOptions(value: any): T & this;//
      }

      interface ForPlugin<T> {
        init(value: any): T & this;
      }

      interface ForModule<T> {
        noParse(value: any): T & this;
      }

      interface ForRule<T> {
        enforce(value: any): T & this;//
        issuer(value: any): T & this;//
        parser(value: any): T & this;//
        resource(value: any): T & this;//
        // 如果你只想在某些 Vue 组件中使用 CSS Modules，你可以使用 oneOf 规则并在 resourceQuery 字符串中检查 module 字符串。
        resourceQuery(value: RegExp): T & this;//                            如  【/module/】 匹配    `<style module>`。
        sideEffects(value: any): T & this;//
        test(value: RegExp): T & this;//
        type(value: any): T & this;//
      }

      interface ForOptimization<T> {
        concatenateModules(value: any): T & this;//
        flagIncludedChunks(value: any): T & this;//
        mergeDuplicateChunks(value: any): T & this;//
        minimize(value: any): T & this;//
        minimizer(value: any): T & this;//
        namedChunks(value: any): T & this;//
        namedModules(value: any): T & this;//
        nodeEnv(value: any): T & this;//
        noEmitOnErrors(value: any): T & this;//
        occurrenceOrder(value: any): T & this;//
        portableRecords(value: any): T & this;//
        providedExports(value: any): T & this;//
        removeAvailableModules(value: any): T & this;//
        removeEmptyChunks(value: any): T & this;//
        runtimeChunk(value: any): T & this;//
        sideEffects(value: any): T & this;//
        splitChunks(value: any): T & this;//
        usedExports(value: any): T & this;//
      }

      interface ForPerformance<T> {
        assetFilter(value: any): T & this;//
        hints(value: any): T & this;//
        maxAssetSize(value: any): T & this;//
        maxEntrypointSize(value: any): T & this;//
      }

      interface ForUse<T> {
        /*
        loader(value: string): T & this;
        options(value: any): T & this;
        */
        loader(value: string): Enlarge_ForXxx.Loader;     // TIP 此处，略微作出修改。  不是返回自身类型，而是一个【单独抽取】的  Loader 类型。
        options(value: {}): Enlarge_ForXxx.Options;      // TIP 此处，略微作出修改。  不是返回自身类型，而是一个【单独抽取】的  Options 类型。
      }

    }

    // TIP——————————————————————————标准业务逻辑类——————————————————————
    namespace Original {

      class DevServer extends Base.ChainedMap {
        public allowedHosts: Base.ChainedSet;

        constructor(parent: Base.Chainable)

        public toConfig(): __ChainedMap_CleanResult;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      class Plugin extends Base.ChainedMap {
        public name: string;

        constructor(parent: Base.Chainable, name: string)

        public init(
          fn: (
            Plugin: WebpackPlugin_Instance,
            args: [],
          ) => WebpackPlugin_Instance,
        ): void;//
        public use(plugin: WebpackPlugin_Instance, args: []): this;//
        public tap(f: (
          args: __ChainedMap_Value | []) => any,
        ): this;//


        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
        public toConfig(): InitedByWC_WebpackPlugin_Instance;     // 此处，最终的导出和父类，略有不同！
      }

      class Module extends Base.ChainedMap {
        public rules: Base.ChainedMap;
        public defaultRules: Base.ChainedMap;

        constructor(parent: Base.Chainable)

        public defaultRule(name: string): __ChainedMap_Value;//
        public rule(name: string): /*__ChainedMap_Value*/Combined_Rule;//
        public toConfig(): __ChainedMap_CleanResult;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      class Rule extends Base.ChainedMap<__ChainedMap_Value, Combined_Module> {
        public name: string;
        public names: string[];
        public uses: Base.ChainedMap<Combined_Use>;
        public include: Base.ChainedSet;
        public exclude: Base.ChainedSet;
        public oneOfs: Base.ChainedMap;

        constructor(parent: Base.Chainable, name: string)

        public use(name: string): Combined_Use;//
        public oneOf(name: string): Combined_Rule;//
        public pre(): __ChainedMap_Value;//
        public post(): __ChainedMap_Value;//
        public toConfig(): __ChainedMap_CleanResult;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      class Use extends Base.ChainedMap<__ChainedMap_Value, Combined_Rule> {
        public name: string;

        constructor(parent: Base.Chainable, name: string)

        public tap<T>(
          f: (options: T) => T,
        ): this;//
        public toConfig(): __ChainedMap_CleanResult;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      class Optimization extends Base.ChainedMap {
        constructor(parent: Base.Chainable)
      }

      class Performance extends Base.ChainedMap {
        constructor(parent: Base.Chainable)
      }

      class Output extends Base.ChainedMap {
        constructor(parent: Base.Chainable)
      }


      class Resolve extends Base.ChainedMap {
        public alias: Base.ChainedMap;
        public aliasFields: Base.ChainedSet;
        public descriptionFiles: Base.ChainedSet;
        public extensions: Base.ChainedSet;
        public mainFields: Base.ChainedSet;    // 确实存在
        public mainFiles: Base.ChainedSet;     // 虽然名字类似，但确实存在
        public modules: Base.ChainedSet;
        public plugins: Base.ChainedMap;

        constructor(parent: Base.Chainable);

        public plugin(name: string): __ChainedMap_Value;//
        public toConfig(): __ChainedMap_CleanResult;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      class ResolveLoader extends Original.Resolve {
        public moduleExtensions: Base.ChainedSet;
        public packageMains: Base.ChainedSet;

        constructor();

        public toConfig(): __ChainedMap_CleanResult;//
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

      // 不带速记方法的原本类
      class Config extends Base.ChainedMap {
        public devServer: Combined_DevServer;
        public entryPoints: Base.ChainedMap;
        public module: Combined_Module;
        public node: Base.ChainedMap;
        public optimization: Combined_Optimization;
        public output: Combined_Output;
        public performance: Combined_Performance;
        // TIP 此处，plugins确实是一个【ChainedMap】！！！
        public plugins: Base.ChainedMap & {
          push(plugin: any | Combined_Plugin): void,
        };
        public resolve: Combined_Resolve;
        public resolveLoader: Combined_ResolveLoader;

        constructor();

        // TIP————————————————具体方法————————

        // 静态方法
        public static toString(config: any,
                               option: {
                                 verbose: boolean,
                                 configPrefix: string,    // 比如 'config'
                               }): string;//
        public entry(name: string): __ChainedMap_Value;   //
        public plugin(name: string): Plugin;  //
        public toConfig(): __ChainedMap_CleanResult;      //
        // 实例方法
        public toString(options: {}): string;             //
        public merge(obj: {}, moit: []): this;            // 重写了【ChainedMap】父类的方法。
      }

    }


    // 带了速记方法的实际使用中的类
    type Combined_Output = Original.Output & QuickMemory.ForOutput<Original.Output>;
    type Combined_Resolve = Original.Resolve & QuickMemory.ForResolve<Original.Resolve>;
    type Combined_ResolveLoader = Original.ResolveLoader & QuickMemory.ForResolveLoader<Original.ResolveLoader>;
    type Combined_Config = Original.Config & QuickMemory.ForConfig<Original.Config>;
    type Combined_DevServer = Original.DevServer & QuickMemory.ForDevServer<Original.DevServer>;
    /**
     * 此处，【Combined_Plugin】
     *        1.  参数传入子类，返回值    是根据父类拓展了功能后的子类。
     *        2.  Orderable( class extends ChainedMap { ... } )。
     */
    type Combined_Plugin = Original.Plugin & QuickMemory.ForPlugin<Original.Plugin> & Base.Orderable;
    type Combined_Module = Original.Module & QuickMemory.ForModule<Original.Module> & Base.Orderable;
    type Combined_Optimization = Original.Optimization & QuickMemory.ForOptimization<Original.Optimization> & Base.Orderable;
    type Combined_Performance = Original.Performance & QuickMemory.ForPerformance<Original.Performance> & Base.Orderable;
    type Combined_Rule = Original.Rule & QuickMemory.ForRule<Original.Rule> & Base.Orderable;
    type Combined_Use = Original.Use & QuickMemory.ForUse<Original.Use> & Base.Orderable;
  }
}

declare namespace VueCli_Private {

  /**
   * 参考资料：https://cli.vuejs.org/zh/config/#vue-config-js
   */
  interface Config {
    // Vue中会多处用到，效率极低的方式。（迫不得已的情况下，只好在这里  优先配置）

    // TIP——————————路径、目录，地址
    publicPath: string;                           // 新版本统一用【publicPath】。之前的【baseUrl】已过时。
    outputDir: string;                            // 生成的生产环境构建文件的目录。默认为 'dist'
    assetsDir?: string;                            // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    indexPath?: string;                            // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。

    // TIP——————————常见设置
    lintOnSave: boolean | 'error';                // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    sourceMap?: boolean;                           // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。

    // TIP——————————hash控制
    filenameHashing?: boolean;                     // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。

    // TIP——————————【PWA插件】的配置
    pwa?: {
      name: string;                       // APP名称
      themeColor: string;                     // 官方没有解释！！！ 颜色值，如 #4DBA87
      msTileColor: string;                    // 官方没有解释！！！ 颜色值，如 #000000
      appleMobileWebAppCapable: 'yes' | 'no';   // 官方解释非常简略，我日
      appleMobileWebAppStatusBarStyle: 'default' | 'black';   // 官方没有解释！！！

      // 配置 workbox 插件
      /*
       'GenerateSW' (默认值)，每次重新构建你的 web app 时都会创建一个新的 service worker 文件。
       'InjectManifest' 允许你以一个现成的 service worker 文件开始，然后创建一份文件拷贝，并把“precache manifest”注入其中。
       怎样选择：这份“该使用哪个插件？”的指南会帮助你在两者之间做出选择。https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use
       */
      workboxPluginMode: 'GenerateSW' | 'InjectManifest';
      workboxOptions?: {
        // InjectManifest 模式下 swSrc 是必填的。
        swSrc: string;
        // ...其它 Workbox 选项...

        // WARN 以下选项，应该有特殊含义
        skipWaiting: boolean;
        clientsClaim: boolean;
      };

      iconPaths: {
        favicon32: string;
        favicon16: string;
        appleTouchIcon: string;
        maskIcon: string;
        msTileImage: string;
      };

    };

    // TIP——————————多页面应用相关
    pages?: __Page;                                // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。


    runtimeCompiler?: boolean;                     // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。

    transpileDependencies?: Array<string | RegExp>;// 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。

    productionSourceMap?: boolean;                 // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

    // TIP——————————<link>、<script>标签的加载属性相关
    crossorigin?: string;                          // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。    需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响。
    integrity?: boolean;                           // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。


    requireModuleExtension?: boolean;              // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    extract?: boolean;                             // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。

    parallel?: boolean;                            // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用。


    css?: {
      loaderOptions: {
        css?: {
          requireModuleExtension?: boolean;          // 当需要【CSS-Modules】时，是否必须要加【.module】后缀。默认true，要添加。
          localIdentName?: string;                   // 自定义生成的【CSS-Modules】模块的类名。    比如 '[name]-[hash]'。
          camelCase?: 'only';                        // 自定义生成的【CSS-Modules】模块的类名，是否需要驼峰命名。
        },
        sass?: __loaderOptions_SASS_and_SCSS;
        scss?: __loaderOptions_SASS_and_SCSS;
        less?: {
          globalVars: {
            [key: string]: string;
          };
        };
        stylus?: {};
      };
    };


    pluginOptions?: {
      [key: string]: {} | undefined;
      quasar?: QuasarCli_Regular.QuasarPluginOptions;
    };
  }

  interface __loaderOptions_SASS_and_SCSS {
    prependData: string;
  }

  interface __Page {
    // 纯字符串，或一个选项对象
    [key: string]: string // 'src/subpage/main.js'
      | {
      // TIP————————————必选
      // page 的入口
      entry: string;      // 'src/index/main.js'
      // TIP————————————其它皆为可选
      // 模板来源
      template?: string;       // 'public/index.html',
      // 在 dist/index.html 的输出
      filename?: string;       // 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title?: string;// 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks?: string[]// ['chunk-vendors', 'chunk-common', 'index'];
    };
  }


  namespace DevServerNS {
    interface IDevServer {
      open: boolean;
      host?: string;
      port: number;
      https: boolean;
      hot: boolean;
      inline: boolean;
      hotOnly: boolean;
      proxy: IProxy;                    //
      before(app: {}): void;
    }

    type IProxy = string | {
      [key: string]: {
        target: string;
        secure: boolean;        // 如果是https接口，需要配置这个参数
        ws: boolean;            // 如果接口下的ws需要代理
        changeOrigin: boolean;  // 如果接口跨域，需要进行这个参数配置
      },
    };
  }

}

declare namespace VueCli_Regular {
  interface Config {
    // 兼容以前的配置。
    chainWebpack(config: __InnerUse_VueConfigType.WebpackChain.Combined_Config): void;                  //
    configureWebpack(config: __InnerUse_VueConfigType.WebpackChain.Combined_Config): void;              //
    devServer: VueCli_Private.DevServerNS.IDevServer;
  }
}

declare namespace QuasarCli_Regular {
  interface QuasarPluginOptions {
    // 必填
    theme: 'mat' | 'ios';   // 采用主题
    importAll: boolean;
    // 可选
    cssAddon?: boolean;         // 如果需要为Quasar-Flex的CSS，添加CSS断点功能
    components?: [];            // 按需引入，Quasar-Vue组件的依赖
    directives?: [];            // 按需引入，Quasar-Vue指令的依赖
    config?: {};                // 对于Quasar之Components、Directives、Plugins的一些单独配置
    iconSet?: 'fontawesome';    // 指定ICON集。（需要提前从【quasar-extras】依赖中，进行引入。）
    i18n?: 'zh-hans';           // 为Quasar指定，Quasar组件所使用的语言包。
  }
}

// 对外统一暴露
declare namespace VueCliNS {
  type  IVueConfig = VueCli_Regular.Config & VueCli_Private.Config;     // 混合 【兼容配置】 和 【Vue独有配置】。
}


