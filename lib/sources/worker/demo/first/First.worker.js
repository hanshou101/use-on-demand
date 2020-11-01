import { xX_WebWorker_Helper } from '../../util/WebWorker_Helper';
var worker = new xX_WebWorker_Helper._Worker({
    _onmessage: function (ev) {
        setTimeout(function () {
            worker.postSmallMsg({
                method: 'Pong',
                args: [
                    new Date().valueOf(),
                ],
            });
        }, 3000);
    },
    _onmessageerror: function (ev) {
    },
});
// worker.postSmallMsg({
// 	method: '来自Worker',
// 	args  : [1, 2, 3],
// });
//# sourceMappingURL=First.worker.js.map