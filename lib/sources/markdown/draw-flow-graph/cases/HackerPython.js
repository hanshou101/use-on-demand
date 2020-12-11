import { __decorate } from "tslib";
import { DrawUtil } from '../draw-utils/DrawUtil';
import { EleObj } from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements } from '../../../ts/TsType_Helper';
var Start = EleObj.Start, End = EleObj.End, Operation = EleObj.Operation, Subroutine = EleObj.Subroutine, Condition = EleObj.Condition, InputOutput = EleObj.InputOutput, Parallel = EleObj.Parallel;
var IRefCheckUtil = RefCheckUtilsFactory.getV2();
var HackerPython = /** @class */ (function () {
    function HackerPython() {
    }
    HackerPython.draw = function () {
        var 配置基本环境 = new Start("\u914D\u7F6E\u57FA\u672C\u73AF\u5883");
        var 网络基础_TCP_UDP_SSH = new Subroutine("\u7F51\u7EDC\u57FA\u7840\n    _TCP\n    _UDP\n    _SSH");
        var 网络_原始套接字_流量嗅探 = new Subroutine("\u7F51\u7EDC_\u539F\u59CB\u5957\u63A5\u5B57\n    _\u6D41\u91CF\u55C5\u63A2");
        var Scapy_掌控网络_截取认证_缓存toudu = new Subroutine("Scapy_\u638C\u63A7\u7F51\u7EDC\n    _\u622A\u53D6\u8BA4\u8BC1\n    _\u7F13\u5B58toudu");
        var Web常见攻击 = new Subroutine("Web\u5E38\u89C1\u653B\u51FB");
        var Burp代理拓展插件 = new Subroutine("Burp\u4EE3\u7406\u62D3\u5C55\u63D2\u4EF6");
        var 使用GitHub进行远程模块读取 = new Subroutine("\u4F7F\u7528GitHub\u8FDB\u884C\u8FDC\u7A0B\u6A21\u5757\u8BFB\u53D6");
        var Windows下的木马常用功能 = new Subroutine("Windows\u4E0B\u7684\u6728\u9A6C\u5E38\u7528\u529F\u80FD");
        var 玩转浏览器技术 = new Subroutine("\u73A9\u8F6C\u6D4F\u89C8\u5668\u6280\u672F");
        var Windows系统提权 = new Subroutine("Windows\u7CFB\u7EDF\u63D0\u6743");
        var 自动化攻击取证 = new Subroutine("\u81EA\u52A8\u5316\u653B\u51FB\u53D6\u8BC1");
        var 变为代码 = new End('未完待续');
        return {
            title: 'Hacker的Python用例',
            content: DrawUtil.drawFlow(IRefCheckUtil.collectToCheckRef([
                配置基本环境,
                网络基础_TCP_UDP_SSH,
                网络_原始套接字_流量嗅探,
                Scapy_掌控网络_截取认证_缓存toudu,
                Web常见攻击,
                Burp代理拓展插件,
                使用GitHub进行远程模块读取,
                Windows下的木马常用功能,
                玩转浏览器技术,
                Windows系统提权,
                自动化攻击取证,
                变为代码,
            ]), [
                配置基本环境.link(网络基础_TCP_UDP_SSH, 网络_原始套接字_流量嗅探, Scapy_掌控网络_截取认证_缓存toudu, Web常见攻击, Burp代理拓展插件, 使用GitHub进行远程模块读取, Windows下的木马常用功能, 玩转浏览器技术, Windows系统提权, 自动化攻击取证, 变为代码),
            ]),
        };
    };
    HackerPython = __decorate([
        staticImplements()
    ], HackerPython);
    return HackerPython;
}());
export { HackerPython };
//# sourceMappingURL=HackerPython.js.map