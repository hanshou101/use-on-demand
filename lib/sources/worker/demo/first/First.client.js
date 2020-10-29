// @ts-ignore
import FirstWorker from './First.worker';
import { WebWorker_Helper } from '../../util/WebWorker_Helper';
var FirstClient = /** @class */ (function () {
    function FirstClient() {
    }
    FirstClient.prototype.init = function () {
        var client = new WebWorker_Helper._Client(FirstWorker, {
            _onmessage: function (ev) {
            },
            _onmessageerror: function (ev) {
            },
            _onerror: function (ev) {
            },
        });
        client.postSmallMsg({
            method: '来自Client',
            args: [0, 0, 0],
        });
    };
    return FirstClient;
}());
export { FirstClient };
//# sourceMappingURL=First.client.js.map