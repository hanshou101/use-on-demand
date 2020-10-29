declare namespace WebWorker_NS {
	interface MsgBean {
		method: string;
		args: Array<any>;
	}

type 	MsgEvt  = MessageEvent<WebWorker_NS.MsgBean>;

}
