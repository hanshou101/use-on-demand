// 控制日志打印
import { xX_DebugU, xX_LogE } from '../../debug-util/debug-util';

function cL(...msgs: Array<any>) {
	xX_DebugU.l(xX_LogE.wClient_Side, ...msgs);
}

function wL(...msgs: Array<any>) {
	xX_DebugU.l(xX_LogE.wWorker_Side, ...msgs);
}

/**
 *
 */
export namespace WebWorker_Helper {


	export class _Client {
		//
		worker: Worker_Type;

		/**
		 *
		 */
		constructor(
			workerConstructor: WebWorker_NS.WorkerLoader_Constructor,
			cfg: WebWorker_NS.ClientCfg,
		) {
			this.worker = new workerConstructor();
			cL('已创建Client', this.worker);
			// 初始化监听
			this.__initListener(cfg);
		}

		// TIP————————————————————————————————————————————公共方法————————————————————————————————————————

		/**
		 * 普通的小量数据。
		 * 				1.直接产生，额外一份【原数据拷贝】。
		 */
		public postSmallMsg(
			msg: WebWorker_NS.MsgBean,
		) {
			cL('发送小量数据');
			this.worker.postMessage(msg);
		}

		/**
		 * 体积较大的数据。
		 * 				1.会走【Transferable Objects】，不会产生 额外拷贝。
		 * 				2.这个方法，【Client】和【Worker】是一模一样的。
		 */
		public postLargeMsg(
			msg: Transferable,
		) {
			cL('发送体积较大数据');
			// 使用【Transferable Objects】。
			this.worker.postMessage(msg, [msg]);
		}

		public closeClient() {
			this.worker.terminate();
			cL('已停止Client');
		}

		// TIP————————————————————————————————————————————私有方法————————————————————————————————————————

		/**
		 * 初始化，一些监听。
		 */
		private __initListener(
			cfg: WebWorker_NS.ClientCfg,
		) {
			//
			if (cfg._onmessage) {
				// 接收消息
				this.worker.onmessage = function(ev) {
					cL('【Client】', '接收消息', ev.data);
					cfg._onmessage.bind(this)(ev);				// 执行
				};
			}
			// 【序列化错误】处理
			if (cfg._onmessageerror) {
				this.worker.onmessageerror = function(ev) {
					cL('序列化过程中，发生了错误', ev);
					cfg._onmessageerror.bind(this)(ev);	// 执行
				};
			}
			// 【一般错误】处理
			if (cfg._onerror) {
				this.worker.onerror = function(ev) {
					cL(`发生了一般错误: Line ${ev.lineno} in ${ev.filename}: ${ev.message}`);
					cfg._onerror.bind(this)(ev);				// 执行
				};
			}
			//
		}

	}

	export class _Worker {
		/**
		 *
		 */
		constructor(
			cfg: WebWorker_NS.WorkerCfg,
		) {
			wL('已进入Worker', '名称', self.name);
			// 初始化监听
			this.__initListener(cfg);
		}

		// TIP————————————————————————————————————————————公共方法————————————————————————————————————————

		/**
		 * 普通的小量数据。
		 * 				1.直接产生，额外一份【原数据拷贝】。
		 */
		public postSmallMsg(
			msg: WebWorker_NS.MsgBean,
		) {
			wL('发送小量数据');
			self.postMessage(msg);
		}

		/**
		 * 体积较大的数据。
		 * 				1.会走【Transferable Objects】，不会产生 额外拷贝。
		 */
		public postLargeMsg(
			msg: Transferable,
		) {
			wL('发送体积较大数据');
			// 使用【Transferable Objects】。
			self.postMessage(msg, [msg]);
		}

		public closeWorker() {
			self.close();
			wL('已停止Worker');
		}

		/**
		 * 加载JS脚本
		 * 				1.下载顺序是【无序】的，但执行顺序是【固定有顺序，从前往后】的。
		 */
		public importJS(scripts: Array<string>) {
			self.importScripts(...scripts);
		}

		// TIP————————————————————————————————————————————私有方法————————————————————————————————————————

		/**
		 * 初始化，一些监听。
		 */
		private __initListener /* < 此处，竟然无法使用泛型 > */(
			cfg: WebWorker_NS.WorkerCfg,
		) {
			type T = WebWorker_NS.MsgEvt;
			//
			if (cfg._onmessage) {
				// 接收消息
				self.onmessage = function(ev: T) {
					wL('【Worker】', '接收消息', ev.data);
					cfg._onmessage.bind(this)(ev);				// 执行
				};
			}
			// 【序列化错误】处理
			if (cfg._onmessageerror) {
				self.onmessageerror = function(ev: T) {
					wL('序列化过程中，发生了错误', ev);
					cfg._onmessageerror.bind(this)(ev);	// 执行
				};
			}
		}

	}

}
