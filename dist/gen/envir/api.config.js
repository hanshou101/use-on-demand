// import {stCookie as cookie}                                      from '../assets/js/cookie/cookie';
import { ClientApi_AndWs_EnvEnum, Domain_EnvEnum, EnvName_EnvEnum, SsrApi_EnvEnum } from './EnvEnum';
import { EnvUnit } from './EnvUnit';
class MybtsConfig {
    getConfig() {
        return new EnvUnit(EnvName_EnvEnum.local, Domain_EnvEnum.localhost, SsrApi_EnvEnum.huaxue, ClientApi_AndWs_EnvEnum.localhost_proxy).getConfig();
    }
}
// const tigermexConfig = getTigermexConfig();
const mybtsConfig = new MybtsConfig().getConfig();
export default mybtsConfig;
export const headerPrefix = 'EX';
//# sourceMappingURL=api.config.js.map