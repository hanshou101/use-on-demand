// @ts-nocheck TIP 临时忽略所有报错

function getHelloWorldCfg_import() {
  return import("./components/HelloWorld/HelloWorld");
}

function getVideoJSCfg_import() {
  return import("./components/VideoJS/VideoJS");
}

function getHelloWorldCfg_require() {
  return require("./components/HelloWorld/HelloWorld");
}

function getVideoJSCfg_require() {
  return require("./components/VideoJS/VideoJS");
}

function installByImport(Vue: VueConstructor_Type, opts = {}) {
  // 一份清单
  const components: Array<Promise<{
    cp: VueConstructor_Type,
    name: string,
  }>> = [
    getHelloWorldCfg_import().then(exports => {
      return {
        cp  : exports.cp,
        name: exports.cpName
      };
    }),
    getVideoJSCfg_import().then(exports => {
      return {
        cp  : exports.cp,
        name: exports.cpName
      };
    })
  ];

  // 逐个注册组件
  components.forEach(cpPromise => {
    cpPromise.then(cp => {
      console.log("cp", cp);
      Vue.component(cp.name, cp.cp);
    });
  });
}

function installByRequire(Vue: VueConstructor_Type, opts = {}) {

  // 一份清单
  const components: Array<{
    cp: VueConstructor_Type,
    name: string,
  }> = [
    (function() {
      const cfg = getHelloWorldCfg_require();
      return {
        cp  : cfg.HelloWorldCp,
        name: cfg.cpName
      };
    })(),
    (function() {
      const cfg = getVideoJSCfg_require();
      return {
        cp  : cfg.VideoJSCp,
        name: cfg.cpName
      };
    })()
  ];

  // 逐个注册组件
  components.forEach(cp => {
    console.log("cp", cp);
    Vue.component(cp.name, cp.cp);
  });
}

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  installByRequire(window.Vue);
}

/**
 * 导出之后，【其它项目】的使用方法：
 *        1.可以直接【import aaa from 'bbb'】，然后【Vue.use(aaa)】。
 *                1.这会调用【install】方法。而【install】方法，会注册所有组件。
 *        2.也可以【import {AAA} from 'bbb'】，然后【Vue.use(AAA)】。
 *                2.这种情况下，仅仅导入【单个组件】。
 */
export default {
  install: installByRequire
};


/**
 * WARN 此处，必须要注意：
 *        1.每个组件，必须单独导出一次。
 *                1.如果是【export { }】的形式，则必须【原样导入、原样导出】，不能修改名字。
 *                2.如果要改名字，则必须【export const】
 *        2.为了区分【组件.vue】、【工具.ts】、【统一导出.vue】、【.d.ts中类型】，最好起不同的名字。
 *                1.但是此处【export const】的名字，要和【export * as 】的名字，保持一致！！！
 *                2.此时，又涉及了【Vue.component】所用的名字。变得更复杂了。
 *                3.所以，最后结论是，更倾向于【用户业务项目】使用的简单。
 */
// export function getHelloWorld(Vue: VueConstructor_Type) {   // 自身是函数，将直接作为install函数
//   getHelloWorldCfg_import().then(cp => {
//     Vue.component(cp.cpName, cp.HelloWorldCp);
//   });
// }
//
// export function getVideoJS(Vue: VueConstructor_Type) {      // 自身是函数，将直接作为install函数
//   getVideoJSCfg_import().then(cp => {
//     Vue.component(cp.cpName, cp.VideoJSCp);
//   });
// }

export const HelloWorld = getHelloWorldCfg_require().HelloWorldCp;

export const VideoJS = getVideoJSCfg_require().VideoJSCp;


