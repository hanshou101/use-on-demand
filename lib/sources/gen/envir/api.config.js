// import {stCookie as cookie}                                      from '../assets/js/cookie/cookie';
import { ClientApi_AndWs_EnvEnum, Domain_EnvEnum, EnvName_EnvEnum, SsrApi_EnvEnum } from './EnvEnum';
import { EnvUnit } from './EnvUnit';
var MybtsConfig = /** @class */ (function () {
    function MybtsConfig() {
    }
    MybtsConfig.prototype.getConfig = function () {
        return new EnvUnit(EnvName_EnvEnum.local, Domain_EnvEnum.localhost, SsrApi_EnvEnum.huaxue, ClientApi_AndWs_EnvEnum.localhost_proxy).getConfig();
    };
    return MybtsConfig;
}());
// const tigermexConfig = getTigermexConfig();
var mybtsConfig = new MybtsConfig().getConfig();
export default mybtsConfig;
export var headerPrefix = 'EX';
//# sourceMappingURL=api.config.js.map