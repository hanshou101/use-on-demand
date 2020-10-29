import { __read, __spread } from "tslib";
// 控制日志打印
import { xX_DebugU, xX_LogE } from '../../debug-util/debug-util';
function cL() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    xX_DebugU.l.apply(xX_DebugU, __spread([xX_LogE.wClient_Side], msgs));
}
function wL() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    xX_DebugU.l.apply(xX_DebugU, __spread([xX_LogE.wWorker_Side], msgs));
}
/**
 *
 */
export var WebWorker_Helper;
(function (WebWorker_Helper) {
    var _Client = /** @class */ (function () {
        /**
         *
         */
        function _Client(workerConstructor, cfg) {
            this.worker = new workerConstructor();
            cL('已创建Client', this.worker);
            // 初始化监听
            this.__initListener(cfg);
        }
        // TIP————————————————————————————————————————————公共方法————————————————————————————————————————
        /**
         * 普通的小量数据。
         * 				1.直接产生，额外一份【原数据拷贝】。
         */
        _Client.prototype.postSmallMsg = function (msg) {
            cL('发送小量数据');
            this.worker.postMessage(msg);
        };
        /**
         * 体积较大的数据。
         * 				1.会走【Transferable Objects】，不会产生 额外拷贝。
         * 				2.这个方法，【Client】和【Worker】是一模一样的。
         */
        _Client.prototype.postLargeMsg = function (msg) {
            cL('发送体积较大数据');
            // 使用【Transferable Objects】。
            this.worker.postMessage(msg, [msg]);
        };
        _Client.prototype.closeClient = function () {
            this.worker.terminate();
            cL('已停止Client');
        };
        // TIP————————————————————————————————————————————私有方法————————————————————————————————————————
        /**
         * 初始化，一些监听。
         */
        _Client.prototype.__initListener = function (cfg) {
            //
            if (cfg._onmessage) {
                // 接收消息
                this.worker.onmessage = function (ev) {
                    cL('【Client】', '接收消息', ev.data);
                    cfg._onmessage.bind(this)(ev); // 执行
                };
            }
            // 【序列化错误】处理
            if (cfg._onmessageerror) {
                this.worker.onmessageerror = function (ev) {
                    cL('序列化过程中，发生了错误', ev);
                    cfg._onmessageerror.bind(this)(ev); // 执行
                };
            }
            // 【一般错误】处理
            if (cfg._onerror) {
                this.worker.onerror = function (ev) {
                    cL("\u53D1\u751F\u4E86\u4E00\u822C\u9519\u8BEF: Line " + ev.lineno + " in " + ev.filename + ": " + ev.message);
                    cfg._onerror.bind(this)(ev); // 执行
                };
            }
            //
        };
        return _Client;
    }());
    WebWorker_Helper._Client = _Client;
    var _Worker = /** @class */ (function () {
        /**
         *
         */
        function _Worker(cfg) {
            wL('已进入Worker', '名称', self.name);
            // 初始化监听
            this.__initListener(cfg);
        }
        // TIP————————————————————————————————————————————公共方法————————————————————————————————————————
        /**
         * 普通的小量数据。
         * 				1.直接产生，额外一份【原数据拷贝】。
         */
        _Worker.prototype.postSmallMsg = function (msg) {
            wL('发送小量数据');
            self.postMessage(msg);
        };
        /**
         * 体积较大的数据。
         * 				1.会走【Transferable Objects】，不会产生 额外拷贝。
         */
        _Worker.prototype.postLargeMsg = function (msg) {
            wL('发送体积较大数据');
            // 使用【Transferable Objects】。
            self.postMessage(msg, [msg]);
        };
        _Worker.prototype.closeWorker = function () {
            self.close();
            wL('已停止Worker');
        };
        /**
         * 加载JS脚本
         * 				1.下载顺序是【无序】的，但执行顺序是【固定有顺序，从前往后】的。
         */
        _Worker.prototype.importJS = function (scripts) {
            self.importScripts.apply(self, __spread(scripts));
        };
        // TIP————————————————————————————————————————————私有方法————————————————————————————————————————
        /**
         * 初始化，一些监听。
         */
        _Worker.prototype.__initListener /* < 此处，竟然无法使用泛型 > */ = function (cfg) {
            //
            if (cfg._onmessage) {
                // 接收消息
                self.onmessage = function (ev) {
                    wL('【Worker】', '接收消息', ev.data);
                    cfg._onmessage.bind(this)(ev); // 执行
                };
            }
            // 【序列化错误】处理
            if (cfg._onmessageerror) {
                self.onmessageerror = function (ev) {
                    wL('序列化过程中，发生了错误', ev);
                    cfg._onmessageerror.bind(this)(ev); // 执行
                };
            }
        };
        return _Worker;
    }());
    WebWorker_Helper._Worker = _Worker;
})(WebWorker_Helper || (WebWorker_Helper = {}));
//# sourceMappingURL=WebWorker_Helper.js.map