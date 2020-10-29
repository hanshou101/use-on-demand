// @ts-ignore
import FirstWorker            from './First.worker';
import { xX_DebugU, xX_LogE } from '../../../debug-util/debug-util';

// 控制日志打印
function l(...msgs: Array<any>) {
	xX_DebugU.l(xX_LogE.wClientSide, ...msgs);
}

l('client', '引入的Worker', FirstWorker);

function doSomething(worker: Worker) {
	// 执行任务
	worker.postMessage('Work done!');
}

export class FirstClient {
	init() {
		l('创建');
		const firstWorker = new FirstWorker() as Worker;
		l('发送');

		// TIP————————————————————————————————————————————————————监听————————————————————————————————————————————————————
		/**
		 * 接收消息
		 */
		firstWorker.onmessage = function(
			event: WebWorker_NS.MsgEvt,
		) {
			l('【client】', '接收消息', event.data);
			// doSomething(firstWorker);
		};

		/**
		 * 处理错误
		 */
		firstWorker.onerror = function(event: ErrorEvent) {
			l([
				'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message,
			].join(''));
		};
		/**
		 * 处理消息错误
		 */
		firstWorker.onmessageerror = function(event: MessageEvent) {
			l('序列化过程中，发生了错误', event);
		};

		// TIP————————————————————————————————————————————————————主动API————————————————————————————————————————————————————

		/**
		 * 发送消息
		 */
		firstWorker.postMessage({
			method: 'echo',
			args  : ['Work'],
		} as WebWorker_NS.MsgBean);

		/**
		 * 大对象模式。Transferable Objects 格式。
		 */
		// var ab = new ArrayBuffer(1);
		// firstWorker.postMessage(ab, [ab]);

		/**
		 * 关闭client
		 */
		// firstWorker.terminate();
		// console.log('已关闭');

	}
}
