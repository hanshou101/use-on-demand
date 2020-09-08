/**
 * 参考资料：
 *          H5 notification浏览器桌面通知 - 掘金 - https://juejin.im/post/5c6df433f265da2de80f5eda
 */
// interface NotificationOption {
//     dir: string | 'auto';           // 文字方向
//     body: string;                   // 通知消息主题
//     requireInteraction: boolean;    // 不自动关闭通知
//     icon: string;                   // 通知的图标，可以用url网址
// }
// TODO ↑，官方已有一个定义。只是未挂载到  window对象上面。
var BrowserNativeNotification_Helper = /** @class */ (function () {
    function BrowserNativeNotification_Helper() {
    }
    Object.defineProperty(BrowserNativeNotification_Helper, "__demoOptions", {
        /**
         * 测试用的选项
         */
        // 每次，都返回最新的。
        get: function () {
            return {
                dir: 'auto',
                // body: '通知：OBKoro1评论了你的朋友圈', // 通知主体
                // TIP 此处，似乎最多四行内容。
                body: "\u73B0\u5728\uFF0C\u5C06\u4F1A\u751F\u6210\u4E00\u5F20\u56FE\u8868\uFF0C\u4F9B\u60A8\u5C55\u793A\u3002\n\u7B2C\u4E00\u884C\n\u7B2C\u4E8C\u884C\n\u7B2C\u4E09\u884C\n\u7B2C\u56DB\u884C\n\u7B2C\u4E94\u884C",
                requireInteraction: true,
                // icon: 'https://upload-images.jianshu.io/upload_images/5245297-818e624b75271127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                icon: 'https://goss4.vcg.com/creative/vcg/800/version23/VCG21gic19273071.jpg',
                silent: true,
            };
        },
        enumerable: false,
        configurable: true
    });
    BrowserNativeNotification_Helper.simpleNotify = function (title, options) {
        var _this = this;
        var notifyWhenPermitted = function () {
            var notification = new Notification(title, options); // 显示通知
            // TODO 插入通知的处理事件。
            _this.bindEvts(notification);
        };
        // 先检查浏览器是否支持
        if (!window.Notification) {
            console.log('浏览器不支持通知');
        }
        else {
            // 检查用户曾经是否同意接受通知
            if (Notification.permission === 'granted') {
                notifyWhenPermitted();
            }
            else if (Notification.permission === 'default') {
                // 用户还未选择，可以询问用户是否同意发送通知
                Notification.requestPermission().then(function (permission) {
                    if (permission === 'granted') {
                        console.log('用户同意授权');
                        notifyWhenPermitted();
                    }
                    else if (permission === 'default') {
                        console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权');
                    }
                    else {
                        // denied
                        console.log('用户拒绝授权 不能显示通知');
                    }
                });
            }
            else {
                // denied 用户拒绝
                console.log('用户曾经拒绝显示通知');
            }
        }
    };
    BrowserNativeNotification_Helper.bindEvts = function (notify) {
        console.log('通知标题（仅可读）:', notify.title);
        console.log('通知内容（仅可读）:', notify.body);
        console.log('通知图标（仅可读）:', notify.icon);
        // 点击通知框本身
        notify.onclick = function (e) {
            console.log('用户点击了通知：', e);
        };
        notify.onerror = function (e) {
            console.error('通知显示异常，如用户之前拒绝了权限:', e);
        };
        //
        // 一显示就触发
        notify.onshow = function (e) {
            console.log('通知显示了：', e);
        };
        // 点击【→】按钮（    注意区别：点击【关闭】按钮，不会触发这个）
        notify.onclose = function (e) {
            console.log('通知关闭了：', e);
        };
    };
    return BrowserNativeNotification_Helper;
}());
export { BrowserNativeNotification_Helper };
// 使用示范：
// simpleNotify('这是通知的标题', options);
//# sourceMappingURL=native-notification.js.map