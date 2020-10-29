import { WebWorker_Helper } from '../../util/WebWorker_Helper';

const worker = new WebWorker_Helper._Worker({
	_onmessage(ev) {
	},
	_onmessageerror(ev) {
	},
});

worker.postSmallMsg({
	method: '来自Worker',
	args  : [1, 2, 3],
});
