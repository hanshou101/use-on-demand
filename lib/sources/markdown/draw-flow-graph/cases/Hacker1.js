import { __decorate } from "tslib";
import { DrawUtil } from '../draw-utils/DrawUtil';
import { EleObj } from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements } from '../../../ts/TsType_Helper';
var Start = EleObj.Start, End = EleObj.End, Operation = EleObj.Operation, Subroutine = EleObj.Subroutine, Condition = EleObj.Condition, InputOutput = EleObj.InputOutput, Parallel = EleObj.Parallel;
var IRefCheckUtil = RefCheckUtilsFactory.getV2();
var Hacker1 = /** @class */ (function () {
    function Hacker1() {
    }
    Hacker1.draw = function () {
        var 一次完整渗透的思路流程 = new Start('一次完整渗透的思路流程', 'https://www.bilibili.com/read/cv3915604');
        var 服务器的相关信息 = new Subroutine('服务器的相关信息');
        var 网站指纹识别_DNS记录 = new Subroutine("\u7F51\u7AD9\u6307\u7EB9\u8BC6\u522B\n    _DNS\u8BB0\u5F55");
        var 社工收集_whois_真实站长开发信息 = new Subroutine("\u793E\u5DE5\u6536\u96C6\n    _whois\n    _\u771F\u5B9E\u7AD9\u957F\u5F00\u53D1\u4FE1\u606F");
        var 其它旁站_子域名_C段收集 = new Subroutine("\u5176\u5B83\u65C1\u7AD9\n    _\u5B50\u57DF\u540D\n    _C\u6BB5\u6536\u96C6");
        var GoogleHacking_弱口令扫描 = new Subroutine("GoogleHacking\n    _\u5F31\u53E3\u4EE4\u626B\u63CF");
        var 扫描网站目录结构_爆破后台_测试文件_备份等敏感文件 = new Subroutine("\u626B\u63CF\u7F51\u7AD9\u76EE\u5F55\u7ED3\u6784\n    _\u7206\u7834\u540E\u53F0\n    _\u6D4B\u8BD5\u6587\u4EF6\n    _\u5907\u4EFD\u7B49\u654F\u611F\u6587\u4EF6");
        var 传输协议漏洞_通用漏洞_现成exp案例_Github源码中粗心大意 = new Subroutine("\u4F20\u8F93\u534F\u8BAE\u6F0F\u6D1E\n    _\u901A\u7528\u6F0F\u6D1E\n    _\u73B0\u6210exp\u6848\u4F8B\n    _Github\u6E90\u7801\u4E2D\u7C97\u5FC3\u5927\u610F");
        var 未完待续 = new End('未完待续');
        return {
            title: 'Hacker用例',
            content: DrawUtil.drawFlow(IRefCheckUtil.collectToCheckRef([
                一次完整渗透的思路流程, 服务器的相关信息, 网站指纹识别_DNS记录, 社工收集_whois_真实站长开发信息,
                其它旁站_子域名_C段收集, GoogleHacking_弱口令扫描, 扫描网站目录结构_爆破后台_测试文件_备份等敏感文件, 传输协议漏洞_通用漏洞_现成exp案例_Github源码中粗心大意,
                未完待续,
            ]), [
                一次完整渗透的思路流程.link(服务器的相关信息, 网站指纹识别_DNS记录, 社工收集_whois_真实站长开发信息, 其它旁站_子域名_C段收集, GoogleHacking_弱口令扫描, 扫描网站目录结构_爆破后台_测试文件_备份等敏感文件, 传输协议漏洞_通用漏洞_现成exp案例_Github源码中粗心大意, 未完待续),
            ]),
        };
    };
    Hacker1 = __decorate([
        staticImplements()
    ], Hacker1);
    return Hacker1;
}());
export { Hacker1 };
//# sourceMappingURL=Hacker1.js.map