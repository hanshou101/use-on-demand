import VideoJs from 'video.js';

export class MVideo_Helper {
  private static isCssLoaded = false;

  public static initLang(
    lang: { 'zh-CN': any, 'en': any },
  ) {
    console.log('初始化  video.js 库');
    const default_video_zhCN = require('video.js/dist/lang/zh-CN.json');
    const default_video_en   = require('video.js/dist/lang/en.json');
    VideoJs.addLanguage('zh-CN', {
      ...default_video_zhCN,    // 默认
      ...lang['zh-CN'],
    });
    VideoJs.addLanguage('en', {
      ...default_video_en,      // 默认
      ...lang.en,
    });
    return VideoJs;
  }

  public static loadCss() {
    if (!this.isCssLoaded) {            // 还未加载CSS
      this.isCssLoaded = true;          // 记录【已加载CSS】
      // TIP 初始化【CSS样式】
      require('video.js/dist/video-js.css');
      require('./cp/CustomVideoJS.scss');
    }
  }
}