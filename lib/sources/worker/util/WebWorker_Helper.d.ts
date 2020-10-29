/**
 *
 */
export declare namespace WebWorker_Helper {
    class _Client {
        worker: Worker_Type;
        /**
         *
         */
        constructor(workerConstructor: WebWorker_NS.WorkerLoader_Constructor, cfg: WebWorker_NS.ClientCfg);
        /**
         * 普通的小量数据。
         * 				1.直接产生，额外一份【原数据拷贝】。
         */
        postSmallMsg(msg: WebWorker_NS.MsgBean): void;
        /**
         * 体积较大的数据。
         * 				1.会走【Transferable Objects】，不会产生 额外拷贝。
         * 				2.这个方法，【Client】和【Worker】是一模一样的。
         */
        postLargeMsg(msg: Transferable): void;
        closeClient(): void;
        /**
         * 初始化，一些监听。
         */
        private __initListener;
    }
    class _Worker {
        /**
         *
         */
        constructor(cfg: WebWorker_NS.WorkerCfg);
        /**
         * 普通的小量数据。
         * 				1.直接产生，额外一份【原数据拷贝】。
         */
        postSmallMsg(msg: WebWorker_NS.MsgBean): void;
        /**
         * 体积较大的数据。
         * 				1.会走【Transferable Objects】，不会产生 额外拷贝。
         */
        postLargeMsg(msg: Transferable): void;
        closeWorker(): void;
        /**
         * 加载JS脚本
         * 				1.下载顺序是【无序】的，但执行顺序是【固定有顺序，从前往后】的。
         */
        importJS(scripts: Array<string>): void;
        /**
         * 初始化，一些监听。
         */
        private __initListener;
    }
}
//# sourceMappingURL=WebWorker_Helper.d.ts.map