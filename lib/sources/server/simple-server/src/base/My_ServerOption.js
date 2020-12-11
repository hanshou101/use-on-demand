import { mani } from '../config/new_manifest';
var debug = require('debug')('myapp:server');
var My_ServerOption = /** @class */ (function () {
    function My_ServerOption(http, https) {
        this._http_server = http;
        this._https_server = https;
        this.onListening = this.onListening.bind(this);
    }
    My_ServerOption.build = function (http, https) {
        return new this(http, https); // 返回一个构造函数。
    };
    /**
     * TIP 处理回调：【错误error】
     */
    My_ServerOption.prototype.onError = function (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        // var bind = typeof port === 'string'
        //     ? 'Pipe ' + port
        //     : 'Port ' + port
        // FIXME 此处，可能会有一个小Bug。
        console.log('走了onError，此处可能有个小Bug');
        var bind = typeof mani._HTTP_PORT === 'string'
            ? 'Pipe ' + mani._HTTP_PORT // 按道理说，port应该是一个全局变量，或this.变量
            : 'Port ' + mani._HTTP_PORT;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                return process.exit(1);
            case 'EADDRINUSE': {
                console.error(bind + ' is already in use');
                return process.exit(1);
            }
            default: {
                throw error;
            }
        }
    };
    /**
     * TIP 处理回调：【监听中listening】
     */
    My_ServerOption.prototype.onListening = function () {
        var addr = this._http_server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
        debug('Listening on ' + bind);
    };
    return My_ServerOption;
}());
export { My_ServerOption };
//# sourceMappingURL=My_ServerOption.js.map