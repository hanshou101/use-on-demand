import { __assign } from "tslib";
function getVideoJS() {
    return require('video.js').default;
}
var xX_MVideo_Helper = /** @class */ (function () {
    function xX_MVideo_Helper() {
    }
    xX_MVideo_Helper.initLang = function (lang, loadCss) {
        if (loadCss === void 0) { loadCss = true; }
        console.log('初始化  video.js 库');
        var default_video_zhCN = require('video.js/dist/lang/zh-CN.json');
        var default_video_en = require('video.js/dist/lang/en.json');
        var VideoJs = getVideoJS();
        // console.log('VideoJs', VideoJs);
        VideoJs.addLanguage('zh-CN', __assign(__assign({}, default_video_zhCN), lang['zh-CN']));
        VideoJs.addLanguage('en', __assign(__assign({}, default_video_en), lang.en));
        if (loadCss) {
            this.loadCss();
        }
        return VideoJs;
    };
    xX_MVideo_Helper.loadCss = function () {
        if (!this.isCssLoaded) { // 还未加载CSS
            this.isCssLoaded = true; // 记录【已加载CSS】
            // TIP 初始化【CSS样式】
            require('video.js/dist/video-js.css');
            require('./cp/CustomVideoJS.scss');
        }
    };
    xX_MVideo_Helper.isCssLoaded = false;
    return xX_MVideo_Helper;
}());
export { xX_MVideo_Helper };
//# sourceMappingURL=MVideo_Helper.js.map