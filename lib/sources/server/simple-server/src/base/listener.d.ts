/// <reference types="node" />
import http from 'http';
import https from 'https';
export declare class Listener_Helper {
    /**
     * 回调：error错误
     */
    static get_onError(port: string | number): (error: MyHttps_Error) => never;
    /**
     * 回调：监听中listening
     */
    static get_onListening(server: http.Server | https.Server): () => void;
}
//# sourceMappingURL=listener.d.ts.map