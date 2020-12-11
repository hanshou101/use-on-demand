/// <reference types="node" />
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
export declare class My_ServerOption {
    _http_server: HttpServer;
    _https_server: HttpsServer;
    private constructor();
    static build(http: HttpServer, https: HttpsServer): My_ServerOption;
    /**
     * TIP 处理回调：【错误error】
     */
    onError(error: MyHttps_Error): never;
    /**
     * TIP 处理回调：【监听中listening】
     */
    onListening(): void;
}
//# sourceMappingURL=My_ServerOption.d.ts.map