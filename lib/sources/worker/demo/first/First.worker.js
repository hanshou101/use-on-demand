import { WebWorker_Helper } from '../../util/WebWorker_Helper';
var worker = new WebWorker_Helper._Worker({
    _onmessage: function (ev) {
    },
    _onmessageerror: function (ev) {
    },
});
worker.postSmallMsg({
    method: '来自Worker',
    args: [1, 2, 3],
});
//# sourceMappingURL=First.worker.js.map