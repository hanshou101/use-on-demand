var xX_CPlugin_Helper = /** @class */ (function () {
    function xX_CPlugin_Helper() {
    }
    /**
     * 初始化【v-viewer】，可拖动、放大的对话框。
     */
    xX_CPlugin_Helper.init_vViewer = function (vue) {
        // 导入CSS
        require('viewerjs/dist/viewer.css');
        var Viewer = require('v-viewer').default; // 标签主体。
        vue.use(Viewer); // 导入到Vue全局。（从此，可以使用<viewer>标签，来包裹<img>标签）
    };
    return xX_CPlugin_Helper;
}());
export { xX_CPlugin_Helper };
//# sourceMappingURL=common-plugin.js.map