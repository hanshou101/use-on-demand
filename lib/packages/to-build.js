import * as HelloWorld from "./components/HelloWorld";
import * as VideoJS from "./components/VideoJS";
const components = [
    {
        cp: VideoJS.VideoJSCp,
        name: VideoJS.cpName
    },
    {
        cp: HelloWorld.HelloWorldCp,
        name: VideoJS.cpName
    }
];
const install = function (Vue, opts = {}) {
    components.map(cp => {
        Vue.component(cp.name, cp.cp);
    });
};
/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}
/**
 * 导出之后，【其它项目】的使用方法：
 *        1.可以直接【import aaa from 'bbb'】，然后【Vue.use(aaa)】。
 *                1.这会调用【install】方法。而【install】方法，会注册所有组件。
 *        2.也可以【import {AAA} from 'bbb'】，然后【Vue.use(AAA)】。
 *                2.这种情况下，仅仅导入【单个组件】。
 */
export default {
    install,
    VideoJS: VideoJS.VideoJSCp,
    HelloWorld: HelloWorld.HelloWorldCp
};
//# sourceMappingURL=to-build.js.map