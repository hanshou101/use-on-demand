import ApiConfig from './api.config';
import { EnvName_EnvEnum } from './EnvEnum';
var EnvFlags = /** @class */ (function () {
    function EnvFlags() {
    }
    //
    //
    //
    EnvFlags._allowEnvs = function (envs) {
        return envs.includes(ApiConfig.envName);
    };
    /**
     * 本地 Mock Cookie值。
     *        1.便于登录
     */
    EnvFlags.localMockCookie = EnvFlags._allowEnvs([
        EnvName_EnvEnum.local,
    ]);
    /**
     * 使用CDN。
     */
    EnvFlags.firstCheck_useCDN = EnvFlags._allowEnvs([
        EnvName_EnvEnum.pre_prod,
        EnvName_EnvEnum.std_prod,
    ]);
    EnvFlags.finalCheck_useCDN = EnvFlags.firstCheck_useCDN; // 最终检查
    // noinspection PointlessBooleanExpressionJS
    /**
     * K线的 debug模式 。
     */
    EnvFlags.tradingViewDebug = true && EnvFlags._allowEnvs([
        EnvName_EnvEnum.local,
    ]);
    return EnvFlags;
}());
export { EnvFlags };
//# sourceMappingURL=env-flags.js.map