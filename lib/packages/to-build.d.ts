import * as VideoJS from "./components/VideoJS";
declare const _default: {
    install: (Vue: VueConstructor_Type, opts?: {}) => void;
    VideoJS: import("vue").VueConstructor<VideoJS.VideoJSCp>;
    HelloWorld: import("vue/types/vue").ExtendedVue<VideoJS.VideoJSCp, unknown, unknown, unknown, {
        msg: string;
    }>;
};
/**
 * 导出之后，【其它项目】的使用方法：
 *        1.可以直接【import aaa from 'bbb'】，然后【Vue.use(aaa)】。
 *                1.这会调用【install】方法。而【install】方法，会注册所有组件。
 *        2.也可以【import {AAA} from 'bbb'】，然后【Vue.use(AAA)】。
 *                2.这种情况下，仅仅导入【单个组件】。
 */
export default _default;
//# sourceMappingURL=to-build.d.ts.map