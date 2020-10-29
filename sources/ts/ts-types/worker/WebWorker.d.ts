declare namespace WebWorker_NS {
	interface MsgBean {
		method: string;
		args: Array<any>;
	}

	type  MsgEvt = MessageEvent<WebWorker_NS.MsgBean>;

	/**
	 *
	 */
	interface ClientCfg<T = WebWorker_NS.MsgEvt> {
		// _onmessage: Worker_Type['onmessage'];
		_onmessage(this: Worker, ev: T): any;													//
		// _onmessageerror: Worker_Type['onmessageerror'];
		_onmessageerror(this: Worker, ev: T): any;										//
		// _onerror: Worker_Type['onerror'];
		_onerror(this: AbstractWorker, ev: ErrorEvent): any;					//
	}

	/**
	 *
	 */
	interface WorkerCfg<T = WebWorker_NS.MsgEvt> {
		_onmessage(this: WindowEventHandlers, ev: T): any;						//
		_onmessageerror(this: WindowEventHandlers, ev: T): any;	//
	}

	interface WorkerLoader_Constructor {
		new(): Worker;
	}
}

declare type Worker_Type = Worker;

interface Window {
	// FIXME 此处，修正【WebWorker】所缺失的类型。（MDN上是有的）。
	postMessage(message: any, transfer?: Transferable[]): void;
}
