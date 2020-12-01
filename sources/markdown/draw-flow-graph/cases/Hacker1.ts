import { DrawUtil }             from '../draw-utils/DrawUtil';
import { EleObj }               from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements }     from '../../../ts/TsType_Helper';

const { Start, End, Operation, Subroutine, Condition, InputOutput, Parallel } = EleObj;

const IRefCheckUtil = RefCheckUtilsFactory.getV2();

@staticImplements<DrawFlowGraph.DemoCase.Static>()
export class Hacker1 {
	public static draw() {
		const 一次完整渗透的思路流程                       = new Start('一次完整渗透的思路流程', 'https://www.bilibili.com/read/cv3915604');
		const 服务器的相关信息                          = new Subroutine('服务器的相关信息');
		const 网站指纹识别_DNS记录                      = new Subroutine(`网站指纹识别
    _DNS记录`);
		const 社工收集_whois_真实站长开发信息               = new Subroutine(`社工收集
    _whois
    _真实站长开发信息`);
		const 其它旁站_子域名_C段收集                     = new Subroutine(`其它旁站
    _子域名
    _C段收集`);
		const GoogleHacking_弱口令扫描               = new Subroutine(`GoogleHacking
    _弱口令扫描`);
		const 扫描网站目录结构_爆破后台_测试文件_备份等敏感文件        = new Subroutine(`扫描网站目录结构
    _爆破后台
    _测试文件
    _备份等敏感文件`);
		const 传输协议漏洞_通用漏洞_现成exp案例_Github源码中粗心大意 = new Subroutine(`传输协议漏洞
    _通用漏洞
    _现成exp案例
    _Github源码中粗心大意`);
		const 未完待续                              = new End('未完待续');
		return {
			title  : 'Hacker用例',
			content: DrawUtil.drawFlow(
				IRefCheckUtil.collectToCheckRef([
					一次完整渗透的思路流程, 服务器的相关信息, 网站指纹识别_DNS记录, 社工收集_whois_真实站长开发信息,
					其它旁站_子域名_C段收集, GoogleHacking_弱口令扫描, 扫描网站目录结构_爆破后台_测试文件_备份等敏感文件, 传输协议漏洞_通用漏洞_现成exp案例_Github源码中粗心大意,
					未完待续,
				]), [
					一次完整渗透的思路流程.link(服务器的相关信息, 网站指纹识别_DNS记录, 社工收集_whois_真实站长开发信息,
						其它旁站_子域名_C段收集, GoogleHacking_弱口令扫描, 扫描网站目录结构_爆破后台_测试文件_备份等敏感文件, 传输协议漏洞_通用漏洞_现成exp案例_Github源码中粗心大意,
						未完待续),
				],
			),
		};
	}
}
