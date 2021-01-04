var debug = require('debug')('myapp:server');
var Listener_Helper = /** @class */ (function () {
    function Listener_Helper() {
    }
    /**
     * 回调：error错误
     */
    Listener_Helper.get_onError = function (port) {
        return function (error) {
            console.log('走了onError，此处可能有个小Bug');
            if (error.syscall !== 'listen') {
                throw error;
            }
            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;
            // 错误友好提示
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
    };
    /**
     * 回调：监听中listening
     */
    Listener_Helper.get_onListening = function (server) {
        return function (
        //
        ) {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
            debug('Listening on ' + bind);
        };
    };
    return Listener_Helper;
}());
export { Listener_Helper };
//# sourceMappingURL=listener.js.map