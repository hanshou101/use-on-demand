import { ClientApi_AndWs_EnvEnum, Domain_EnvEnum, EnvName_EnvEnum, SsrApi_EnvEnum } from './EnvEnum';
export declare class EnvUnit {
    readonly Env_Name: EnvName_EnvEnum;
    readonly Env_Domain: Domain_EnvEnum;
    readonly Env_SsrApi: SsrApi_EnvEnum;
    readonly Env_ClientApi_AndWs: ClientApi_AndWs_EnvEnum;
    constructor(Env_Name: EnvName_EnvEnum, // 【环境名】标识符
    Env_Domain: Domain_EnvEnum, // 域名
    Env_SsrApi: SsrApi_EnvEnum, // 服务端接口
    Env_ClientApi_AndWs: ClientApi_AndWs_EnvEnum);
    /**
     * 此处【域名】：
     *        1.WARN 【http/https】敏感
     *        2.
     */
    private getDomain;
    /**
     * 此处【SSR-Api】
     *        1.【http/https】，只要协议存在，就可以随意使用
     */
    private getSsrApi;
    /**
     * 此处【Client-Api】
     *        1.【http/https】，受到域名制约
     *                1.非安全域名，可以访问  http/https 接口
     *                2.https安全域名，仅允许访问  https 接口
     *                3.WARN 综上所述，尽量，全部都走   https 协议
     */
    private getClientApi_AndWs;
    getConfig(): EnvNS.CombineEnvType;
}
//# sourceMappingURL=EnvUnit.d.ts.map