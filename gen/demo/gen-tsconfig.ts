import {TypeScript_SpeedUp_Helper} from './gen-helper';

/**
 * 使用本文件，动态生成【tsconfig.json】。
 */

/**
 * 【nuxt.js】库，相关的【特殊化处理】。
 */
class NuxtJs_TsConfig_Helper {
  public static readonly _include = [
    // WARN 适配【nuxt.js】，这段include去除 （TIP 后来又发现，不用去除）

    //
    //      "src/**/*.ts",
    //      "src/**/*.tsx",
    //      "src/**/*.vue",
    //      "tests/**/*.ts",
    //      "tests/**/*.tsx"
    //
    'types/**/*.d.ts', // TIP 这一句，读取自定义.d.ts的类型声明
    'types/**/*.ts', // TIP 这一句，读取自定义.d.ts的类型声明
    //
    '**/*.ts',
    '**/*.tsx',
    '**/*.vue',
    //
    //    "config/**/*.ts",
    //    "config/**/*.tsx",
    //    "config/**/*.vue",
    //    "components/**/*.ts",
    //    "components/**/*.tsx",
    //    "components/**/*.vue"
    //
  ];

  public static readonly _compilerOptions = {
    _target           : 'es2018', // WARN 适配【nuxt.js】
    _lib              : [
      'esnext.asynciterable',     // WARN 适配【nuxt.js】
    ],
    _noEmit           : true,     // WARN 适配【nuxt.js】
    _types            : [
      // "webpack-env",           // WARN 适配【nuxt.js】 ———— 此处，进行隐藏！！！
      '@types/node',              // WARN 适配【nuxt.js】
      '@nuxt/types',               // WARN 适配【nuxt.js】
    ],
    _paths            : {
      // WARN 适配【nuxt.js】
      '~/*': [
        './*',
      ],
      // WARN 适配【nuxt.js】
      '@/*': [
        './*',
      ],
    },
    _typeRoots        : [         // WARN 适配【nuxt.js】
      './types',      // FIXME 其实，这个多此一举；因为【includes】选项里面，已经添加该项了。
      // '@types',    // TIP 默认情况下，【@types目录】会被【TS】自动包括。所以我们不需要手动加。
    ],
    _resolveJsonModule: true,     // WARN 适配【nuxt.js】
  };
}

/**
 *
 */
class TsNode_Helper {
  public static readonly _compilerOptions = {
    /**
     * 1.并没有生效
     *        1.建议，改用【手动用 三斜杠】来进行定义。
     *                1.但是，手动用【三斜杠】依然没有生效。
     *                        1.最后，采用【ts-node --files】生效了。
     */
    _typeRoots: [
      './node_modules/@types',
      './types',
    ],
  };
}

/**
 * 控制是否检查【.d.ts】中的类型错误。
 */
class FullTypeCheck_Helper {
  public static readonly checkType_d_ts = false;
}

class GenTsconfigUtil {
  // noinspection PointlessBooleanExpressionJS
  private readonly tsConfig = {
    // TIP 将以下目录，包括在TypeScript解析之中
    'include'        : [
      ...NuxtJs_TsConfig_Helper._include,
    ],
    // TIP 将以下目录，排除在TypeScript解析之外
    'exclude'        : [
      'node_modules',
    ],
    'compilerOptions': {
      /**
       * TIP 以下的配置，在稳定版的Vue+TypeScript+MyFrameWork之上，于【2019年3月16日20:59:34】又更新了一版。
       * TIP 参考资料：
       * TIP        1.HstarDoc/TypeScript配置文件tsconfig简析.md at master · hstarorg/HstarDoc - https://github.com/hstarorg/HstarDoc/blob/master/%E5%89%8D%E7%AB%AF%E7%9B%B8%E5%85%B3/TypeScript%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6tsconfig%E7%AE%80%E6%9E%90.md
       */
      // "target": "es5",
      // TIP 最终编译成的js版本。
      'target'                          : NuxtJs_TsConfig_Helper._compilerOptions._target,
      // TIP 基础模块。（TIP 此处，需要【>=es5的module】。不然比如【commonjs】会报错：【Uncaught ReferenceError: exports is not defined】）
      'module'                          : 'esnext',
      // TIP 添加的ES语言依赖包
      'lib'                             : [
        'esnext',
        ...NuxtJs_TsConfig_Helper._compilerOptions._lib,
        'dom',
        'dom.iterable',
        'scripthost',
      ],
      'noEmit'                          : NuxtJs_TsConfig_Helper._compilerOptions._noEmit,
      /*这可以对 `this` 上的数据属性进行更严格的推断-1*/
      // TIP 启用 --strict相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict， --strictBindCallApply， --strictNullChecks和 --strictFunctionTypes和--strictPropertyInitialization。
      'strict'                          : true,
      /*这可以对 `this` 上的数据属性进行更严格的推断-2*/
      /* TIP 这里，暂时不对this 进行强制规范。（避开'this' implicitly has type 'any' because it does not have a type annotation.的错误） */
      /* TIP 最新的修改，将this改为super。然后开启this的强制规范。 */
      /* TIP 最最新的修改，将  super的调用，修改为  static的调用 */
      'noImplicitThis'                  : true,
      'jsx'                             : 'preserve',
      'importHelpers'                   : true,
      /* TIP 此处，注意，setTimeout这种api，在不同ts环境中，也会有表现区别（比如，返回类型完全不一致。）。所以，我们在浏览器环境，设置为classic，而非node*/
      /* TIP 此处，默认的vue-cli 3-ts模式，是node。  而且切换为classic后，也不能达到预期效果*/
      'moduleResolution'                : 'node',
      /* 启用 vue-class-component 及 vuex-class 需要开启此选项 */
      'experimentalDecorators'          : true,
      /* 开启TypeScript反射。（实验性API：元数据反射） */
      'emitDecoratorMetadata'           : true,
      /* TIP 启用 vuex-class 需要开启此选项 */
      /* WARN Vue版本的Bug，此选项需要关闭。直到Vue最新更新 */
      /* TIP 最新版的自定义框架，此选项已可以打开 */
      'strictFunctionTypes'             : true,
      'esModuleInterop'                 : true,
      'sourceMap'                       : true,
      'baseUrl'                         : '.',
      /* TIP 开启禁用隐式any的严格（开启后，如果使用any，你必须显式地声明） */
      'noImplicitAny'                   : true,
      /*严格属性初始化：Vue组件类的属性是否需要初始化*/
      /* TIP 仍然强制要求初始化；只是用  ts-ignore  注释 */
      /* TIP 此处，为了  vuex的工具使用，将初始化检查，列为非必要 */
      /* TIP 最终方案：① 为了Vue组件类每个属性值，都得到初始化（若Vue组件类有一个属性未初始化，则可能会无法数据绑定），这个选项检查，是必要的。
              ② 对于有些  @Prop选项、@Getter-vuex属性，不能自己初始化必须留空等待框架初始化的，则用  @MyGetter("username") username!: string; 的【!:】方式，告诉ts编译器：此处必定有值。（相对应的，【?:】表示可能有值也可能为undefined。【:】则是一种居中的表现（指不作具体预先判断，具体表现交给tsconfig去进行复查\。）。）*/
      'strictPropertyInitialization'    : true,
      // TIP 允许使用非ts文件（重要）
      'allowJs'                         : TypeScript_SpeedUp_Helper.tsConfig_JSON._allowJs,
      //
      // TIP 用TypeScript的配置选项，来让【for-of】在ES5版本下也能获得【兼容性处理】。
      // 参考资料：TypeScript 2.3: Downlevel Iteration for ES3/ES5  –  酷辣虫 CoLaBug - https://www.colabug.com/277936.html
      'downlevelIteration'              : true,
      // 显示TS的诊断信息
      'diagnostics'                     : true,
      // TIP 不允许：隐式的返回值声明（或有些代码分支没有返回值）
      'noImplicitReturns'               : true,
      // TIP 校验【switch-case】语法，禁止出现多个case穿透的情况（要求强制写break隔开）。（default可以不加，但绝不能穿透）
      'noFallthroughCasesInSwitch'      : true,
      // TIP 不允许有，【无法访问的代码】：更加严格的检验。
      'allowUnreachableCode'            : false,
      // TIP 用import导入文件时，严格区分【文件名大小写】，不允许文件名大小写混淆。
      'forceConsistentCasingInFileNames': true,
      // TIP 这个宽松开关，将其打开！！！因为有很多js库的  .d.ts 文件编写比较混乱，无法达到通过严格检查的地步  TIP 更加严格的检查：不允许，从【没有默认导出的文件中】，进行【模块默认导入（import x from 'aaa.tx'）】
      'allowSyntheticDefaultImports'    : true,
      // TIP 是否检查，外部引入的第三方库，是否符合类型规范
      'skipLibCheck'                    : !FullTypeCheck_Helper.checkType_d_ts,     // WARN 如果开启，则【所有.d.ts】文件，也会忽略检查
      //
      'types'                           : [
        ...NuxtJs_TsConfig_Helper._compilerOptions._types,
      ],
      'paths'                           : {
        ...NuxtJs_TsConfig_Helper._compilerOptions._paths,
        /*
          "@*//*": [
            "src*//*"
          ],
        */
      },
      'typeRoots'                       : [
        // ...NuxtJs_TsConfig_Helper._compilerOptions._typeRoots,       注释掉，因为全部在【includes】选项里，处理了
        // ...TsNode_Helper._compilerOptions._typeRoots,                好像并没有起到作用？？？
      ],
      'resolveJsonModule'               : NuxtJs_TsConfig_Helper._compilerOptions._resolveJsonModule,
      'importsNotUsedAsValues'          : TypeScript_SpeedUp_Helper.tsConfig_JSON._importsNotUsedAsValues,
    },
  };

  public gen() {
    console.log('开始生成', 'tsconfig.json文件');
    console.log('开始生成', 'tsconfig.json文件');
    console.log('开始生成', 'tsconfig.json文件');
    console.log('开始生成', 'tsconfig.json文件');
    console.log('开始生成', 'tsconfig.json文件');
    console.log('开始生成', 'tsconfig.json文件');
    require('fs').writeFileSync('tsconfig.json', JSON.stringify(this.tsConfig, null, 2));
  }

}

new GenTsconfigUtil().gen();
