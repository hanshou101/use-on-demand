import FirstWorker from './First.worker.ts';
// import FirstWorker from 'worker-loader!./First.worker.ts';

import { xX_WebWorker_Helper } from '../../util/WebWorker_Helper';

export class FirstClient {
	init() {
		const client = new xX_WebWorker_Helper._Client(FirstWorker as WebWorker_NS.WorkerLoader_Constructor, {
			_onmessage(ev) {
				setTimeout(() => {
					client.postSmallMsg({
						method: 'Ping',
						args  : [
							new Date().valueOf(),
						],
					});
				}, 3000);
			},
			_onmessageerror(ev) {
			},
			_onerror(ev) {
			},
		});

		client.postSmallMsg({
			method: 'Start',
			args  : [
				new Date().valueOf(),
			],
		});
	}
}
