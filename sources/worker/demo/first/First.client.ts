// @ts-ignore
import FirstWorker          from './First.worker';
import { WebWorker_Helper } from '../../util/WebWorker_Helper';
import WorkerLoader_Constructor = WebWorker_NS.WorkerLoader_Constructor;

export class FirstClient {
	init() {
		const client = new WebWorker_Helper._Client(FirstWorker as WorkerLoader_Constructor, {
			_onmessage(ev) {
			},
			_onmessageerror(ev) {
			},
			_onerror(ev) {
			},
		});

		client.postSmallMsg({
			method: '来自Client',
			args  : [0, 0, 0],
		});
	}
}
