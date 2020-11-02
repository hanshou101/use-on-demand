import { xX_FileBlobBase64_Helper } from '../../../platform/file-blob/FileBlobBase64_Helper';
var SW_DemoClient_1 = /** @class */ (function () {
    function SW_DemoClient_1() {
    }
    /**
     * 简单注册
     */
    SW_DemoClient_1.simpleRegister = function () {
        if ('serviceWorker' in navigator) { // 注意，小写
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(function () {
                    console.log('SW注册成功');
                })
                    .catch(function (err) {
                    console.log('SW注册失败');
                });
            });
        }
        else {
            console.error('当前浏览器，不支持【ServiceWorker】');
        }
    };
    /**
     * 请求通知权限
     */
    SW_DemoClient_1.requestNotification = function () {
        var that = this;
        if ('serviceWorker' in navigator) { // 注意，小写
            navigator.serviceWorker.register('/sw.js')
                .then(function (swReg) {
                /**
                   * 尝试获取【已有推送订阅】。
                   * 				1.如果用户之前没有订阅，则申请【订阅权限】。
                   * 				2.
                   */
                swReg.pushManager.getSubscription()
                    .then(function (subscription) {
                    if (subscription) {
                        console.log('已订阅', JSON.stringify(subscription));
                    }
                    else {
                        console.log('没有订阅');
                        that.____subscribeUser(swReg);
                    }
                });
            })
                .catch(function (e) {
                console.log('Error during getSubscription()', e);
            });
        }
    };
    // TIP————————————————————————————————————————————私有方法————————————————————————————————————————
    SW_DemoClient_1.____subscribeUser = function (swReg) {
        var applicationServerKey = xX_FileBlobBase64_Helper.url_base64_To_Uint8Array(this.applicationServerPublicKey);
        /**
         * 开始申请订阅
         */
        swReg.pushManager.subscribe({
            userVisibleOnly: true,
            /**
             * 一个Uint8Array
             * 				1.用于加密服务端的推送信息
             * 				2.防止中间人攻击，防止会话被攻击者篡改
             */
            applicationServerKey: applicationServerKey,
        })
            .then(function (subscription) {
            console.log('订阅成功', JSON.stringify(subscription));
        })
            .catch(function (err) {
            console.log('订阅失败: ', err);
            var state = Notification.permission;
            console.log('当前状态', state);
            switch (state) {
                // 【允许】用户已经明确的授予了显示通知的权限
                case 'granted': {
                    break;
                }
                // 【还未询问】用户还未被询问是否授权
                case 'default':
                // 【拒绝】用户已经明确的拒绝了显示通知的权限
                case 'denied': {
                    break;
                }
            }
        });
    };
    SW_DemoClient_1.applicationServerPublicKey = '';
    return SW_DemoClient_1;
}());
export { SW_DemoClient_1 };
//# sourceMappingURL=Sw.client.js.map