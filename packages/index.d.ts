import { VueConstructor } from "vue";

/**
 * 自带的【Install函数】。
 */
const _default: {
  install(Vue: VueConstructor, opts = {}): void;
};
export default _default;

/**
 * WARN 此处，必须要注意：
 *        1.【vuedts】库生成的文件，必须手动改名为【xxx.cp.d.ts】
 *        2.在导出【类型】时，必须要一个组件单独导出一次。
 *                1. export * as 你的组件 from "aaa/bbb.cp"
 *        3.
 */

export * as HelloWorldCp from "packages/components/hello-world/HelloWorld.cp";
export * as VideoJSCp    from "packages/components/video-js/VideoJS.cp";

