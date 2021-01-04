#!/usr/bin/env node
import { __read } from "tslib";
// TIP —————————————————————————系统依赖————————————————————————
import http from 'http';
import https from 'https';
// TIP —————————————————————————个人————————————————————————
import { cfg } from './config/config';
import { Listener_Helper } from './base/listener';
import { ExpressBase_Helper } from './base/express-base';
var expressBase = new ExpressBase_Helper().expressBase;
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.init = function () {
        var _this = this;
        var servers = {
            http: {
                server: http.createServer(expressBase),
                port: cfg.port.http,
            },
            https: {
                server: https.createServer(this.getCert(), expressBase),
                port: cfg.port.https,
            },
        };
        Object.entries(servers).forEach(function (_a) {
            var _b = __read(_a, 2), type = _b[0], option = _b[1];
            _this.bindListener(option.server, type, option.port); // 绑定listener
        });
    };
    // TIP————————————————————————————————————————————————私有方法——————————————————————————————————————————————————————
    /**
     * HTTPS安全凭证
     */
    App.prototype.getCert = function () {
        var credentials = { key: cfg.cert.privateKey, cert: cfg.cert.certificate };
        return credentials;
    };
    /**
     * 绑定监听器
     */
    App.prototype.bindListener = function (server, protocal, port) {
        server.listen(port, function () {
            console.log("\u6302\u8F7D\u7AEF\u53E3 " + port + " ", "\u8C03\u8BD5\u8DEF\u5F84 " + protocal + "://127.0.0.1:" + port);
        });
        // Error回调
        server.on('error', Listener_Helper.get_onError(port));
        // Listening回调
        server.on('listening', Listener_Helper.get_onListening(server));
    };
    return App;
}());
new App().init();
//# sourceMappingURL=app.js.map