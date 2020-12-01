import { DrawUtil }             from '../draw-utils/DrawUtil';
import { EleObj }               from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements }     from '../../../ts/TsType_Helper';

const { Start, End, Operation, Subroutine, Condition, InputOutput, Parallel } = EleObj;

const IRefCheckUtil = RefCheckUtilsFactory.getV2();

@staticImplements<DrawFlowGraph.DemoCase.Static>()
export class HackerPython {
	public static draw() {
		const 配置基本环境                  = new Start(`配置基本环境`);
		const 网络基础_TCP_UDP_SSH        = new Subroutine(`网络基础
    _TCP
    _UDP
    _SSH`);
		const 网络_原始套接字_流量嗅探           = new Subroutine(`网络_原始套接字
    _流量嗅探`);
		const Scapy_掌控网络_截取认证_缓存toudu = new Subroutine(`Scapy_掌控网络
    _截取认证
    _缓存toudu`);
		const Web常见攻击                 = new Subroutine(`Web常见攻击`);
		const Burp代理拓展插件              = new Subroutine(`Burp代理拓展插件`);
		const 使用GitHub进行远程模块读取        = new Subroutine(`使用GitHub进行远程模块读取`);
		const Windows下的木马常用功能         = new Subroutine(`Windows下的木马常用功能`);
		const 玩转浏览器技术                 = new Subroutine(`玩转浏览器技术`);
		const Windows系统提权             = new Subroutine(`Windows系统提权`);
		const 自动化攻击取证                 = new Subroutine(`自动化攻击取证`);
		const 变为代码                    = new End('未完待续');
		return {
			title  : 'Hacker的Python用例',
			content: DrawUtil.drawFlow(
				IRefCheckUtil.collectToCheckRef([
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
					配置基本环境.link(
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
						变为代码),
				],
			),
		};
	}
}
