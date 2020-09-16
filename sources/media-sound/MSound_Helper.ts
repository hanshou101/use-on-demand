function getSoundJs() {
  return import('soundjs');
}

/**
 *  参考资料：
 *          1.  https://github.com/CreateJS/SoundJS
 *          2.
 */
export class xX_MSound_Helper {
  public static playSound(url: string) {
    return new Promise((resolve, reject) => {
      try {
        // 动态导入，按需加载
        getSoundJs().then((createjs) => {
          const id = `sound_${new Date().valueOf()}`;
          createjs.Sound.on('fileload', (event) => {
            console.log('sound event', event);
            createjs.Sound.play(id);                                   // 回调中，播放声音
            resolve(id);                      // TIP 成功
          });
          createjs.Sound.alternateExtensions = ['mp3'];                             // 可选拓展名
          createjs.Sound.registerSound({src: url, id: id});                 // 加载网络资源
        });
      } catch (e) {
        reject(e);                          // TIP 失败
      }
    });
  }
}
