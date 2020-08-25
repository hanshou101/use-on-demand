import VideoJs from 'video.js';
export class MVideo_Helper {
    static initLang(lang) {
        console.log('初始化  video.js 库');
        const default_video_zhCN = require('video.js/dist/lang/zh-CN.json');
        const default_video_en = require('video.js/dist/lang/en.json');
        VideoJs.addLanguage('zh-CN', {
            ...default_video_zhCN,
            ...lang['zh-CN'],
        });
        VideoJs.addLanguage('en', {
            ...default_video_en,
            ...lang.en,
        });
        return VideoJs;
    }
    static loadCss() {
        if (!this.isCssLoaded) { // 还未加载CSS
            this.isCssLoaded = true; // 记录【已加载CSS】
            // TIP 初始化【CSS样式】
            require('video.js/dist/video-js.css');
            require('./cp/CustomVideoJS.scss');
        }
    }
}
MVideo_Helper.isCssLoaded = false;
//# sourceMappingURL=MVideo_Helper.js.map