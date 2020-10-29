import { xX_DebugU, xX_LogE } from '../../../debug-util/debug-util';

// 控制日志打印
function l(...msgs: Array<any>) {
	xX_DebugU.l(xX_LogE.wWorkerSide, ...msgs);
}

// 打印名称
l('worker', '名称', self.name);

// TIP————————————————————————————————————————————————————监听————————————————————————————————————————————————————

/**
 * 接收消息
 */
self.addEventListener('message', function(e: WebWorker_NS.MsgEvt) {
	l('【worker】', '已收到消息', e);
	/**
	 *
	 */
	self.postMessage({
		method: 'b',
		args  : [`【worker】  发送消息  ${e.data}`],
	} as WebWorker_NS.MsgBean);
}, false);

/**
 * 处理消息错误
 */
self.onmessageerror = function(e: MessageEvent) {
	l('【worker】', '发生了错误', e);
};

// TIP————————————————————————————————————————————————————主动API————————————————————————————————————————————————————


/**
 * 关闭worker
 */
// self.close();

/**
 * 加载JS脚本
 */
// self.importScripts('a.js', 'b.js');

/**
 * 发送消息
 */
// self.postMessage({
// 	method: 'a',
// 	args  : [1, 2, 3],
// } as WebWorker_NS.MsgBean);
