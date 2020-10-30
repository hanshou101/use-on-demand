import { xX_WebWorker_Helper } from '../../util/WebWorker_Helper';

const worker = new xX_WebWorker_Helper._Worker({
	_onmessage(ev) {
		setTimeout(() => {
			worker.postSmallMsg({
				method: 'Pong',
				args  : [
					new Date().valueOf(),
				],
			});
		}, 3000);
	},
	_onmessageerror(ev) {
	},
});

// worker.postSmallMsg({
// 	method: '来自Worker',
// 	args  : [1, 2, 3],
// });
