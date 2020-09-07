import * as HelloWorldCfg from "./components/hello-world/HelloWorld";
declare const _default: {
    install: (Vue: VueConstructor_Type<HelloWorldCfg.cp>, opts?: {}) => void;
};
/**
 * 导出之后，【其它项目】的使用方法：
 *        1.可以直接【import aaa from 'bbb'】，然后【Vue.use(aaa)】。
 *                1.这会调用【install】方法。而【install】方法，会注册所有组件。
 *        2.也可以【import {AAA} from 'bbb'】，然后【Vue.use(AAA)】。
 *                2.这种情况下，仅仅导入【单个组件】。
 */
export default _default;
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
export declare const HelloWorld: import("vue").VueConstructor<HelloWorldCfg.cp>;
export declare const VideoJS: import("vue").VueConstructor<HelloWorldCfg.cp>;
//# sourceMappingURL=to-build.d.ts.map