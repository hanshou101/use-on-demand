import FirstWorker from './First.worker.ts';
// import FirstWorker from 'worker-loader!./First.worker.ts';
import { xX_WebWorker_Helper } from '../../util/WebWorker_Helper';
var FirstClient = /** @class */ (function () {
    function FirstClient() {
    }
    FirstClient.prototype.init = function () {
        var client = new xX_WebWorker_Helper._Client(FirstWorker, {
            _onmessage: function (ev) {
                setTimeout(function () {
                    client.postSmallMsg({
                        method: 'Ping',
                        args: [
                            new Date().valueOf(),
                        ],
                    });
                }, 3000);
            },
            _onmessageerror: function (ev) {
            },
            _onerror: function (ev) {
            },
        });
        client.postSmallMsg({
            method: 'Start',
            args: [
                new Date().valueOf(),
            ],
        });
    };
    return FirstClient;
}());
export { FirstClient };
//# sourceMappingURL=First.client.js.map