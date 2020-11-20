import {xX_MyBrowser} from '../ua/MobileUA';

export class xX_CheckAddressNew_Util {
  private readonly aliveDuration = 1 * 1000;    // 一分钟

  constructor(
    private updateTime = new Date().valueOf(),
  ) {
  }

  public async checkOrRefresh(refreshFn: Promise<any>) {
    console.log('进行检验');
    const goTime = new Date().valueOf() - this.updateTime;  // 已流逝的时间
    if (goTime > this.aliveDuration) {                      // 如果已过去1分钟
      const res       = await refreshFn;
      this.updateTime = new Date().valueOf();
      return res;
    } else {    // 如果未超时
      return Promise.resolve('ok');
    }
  }
}

export class xX_DownloadAppUtil {
  //
  //
  //

  /**
   *
   */
  public static autoDownload(option: { androidUrl: string; iosUrl: string }) {

    console.log('手机用户代理', xX_MyBrowser.versions);

    // var text = "";

    if (xX_MyBrowser.superIOSCheck) {
      // alert('您的手机被识别为iphone')
      // text                 = text + "iOS";
      this.downloadIOS(option.iosUrl);
    } else if (xX_MyBrowser.versions.android) {
      // alert('您的手机被识别为Android')
      // text = text + "android";
      this.downloadAndroid(option.androidUrl);

      // if (xX_MyBrowser.versions.weixin) {
      //   $('.tips').css('display', 'block');
      // } else {
      //   window.location.href = androidUrl;
      // }
    } else {
      // alert('您的设备被识别为pc')
      // if (confirm('确定要在PC端进行下载吗？')) {
      // }
      // text = text + "PC";

      // TODO 无法正确识别的特殊机型，都下载  安卓端的APK
      this.downloadAndroid(option.androidUrl);
    }

    // if (browser.versions.weixin) {
    //     text = text + "微信打开";
    // } else {
    //     text = text + "浏览器打开";
    // }

    // alert(text);

  }

  /**
   *
   */
  public static downloadAndroid(androidUrl: string) {
    // TIP 安卓配置
    if (androidUrl) {
      // const androidUrl = 'http://017.im/data/User/wq/home/desktop/install/wp.apk';
      const androidPath    = androidUrl;
      window.location.href = androidPath;
    } else {
      alert('未获取到Android下载地址！');
    }
  }

  /**
   *
   */
  public static downloadIOS(
    iosUrl: string,
    autoJoinProtocol = true,    // 是否自动拼接，【itms-services】协议头。默认为是。
    callback?: Function,
  ) {
    // TIP iOS配置
    if (iosUrl) {
      let jumpPath: string;
      if (iosUrl.includes('testflight')) {  // testflight模式
        jumpPath = iosUrl;  // 直接跳转
      } else {                              // itms协议模式
        const ios_conf = {
          schema: 'itms-services',
          action: 'download-manifest',
          // url: 'https://017.im/data/User/wq/home/desktop/install/ipa.plist',
          url   : iosUrl,
        };
        jumpPath       = iosUrl;
        // 如果，需要自动拼接协议头。
        if (autoJoinProtocol) {
          if (!(/^(itms-services)/.test(iosUrl))) {
            jumpPath = `${ios_conf.schema}://?action=${ios_conf.action}&url=${ios_conf.url}`;
          }
        }
      }
      window.location.href = jumpPath;
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      alert('未获取到iOS下载地址！');
    }
  }

}
