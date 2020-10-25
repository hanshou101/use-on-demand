function getSoundJs() {
    return import('soundjs');
}
/**
 *  参考资料：
 *          1.  https://github.com/CreateJS/SoundJS
 *          2.
 */
var xX_MSound_Helper = /** @class */ (function () {
    function xX_MSound_Helper() {
    }
    xX_MSound_Helper.playSound = function (url) {
        return new Promise(function (resolve, reject) {
            try {
                // 动态导入，按需加载
                getSoundJs().then(function (createjs) {
                    var id = "sound_" + new Date().valueOf();
                    createjs.Sound.on('fileload', function (event) {
                        console.log('sound event', event);
                        createjs.Sound.play(id); // 回调中，播放声音
                        resolve(id); // TIP 成功
                    });
                    createjs.Sound.alternateExtensions = ['mp3']; // 可选拓展名
                    createjs.Sound.registerSound({ src: url, id: id }); // 加载网络资源
                });
            }
            catch (e) {
                console.error(e);
                reject(e); // TIP 失败
            }
        });
    };
    return xX_MSound_Helper;
}());
export { xX_MSound_Helper };
//# sourceMappingURL=MSound_Helper.js.map