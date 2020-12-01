import { DrawUtil }             from '../draw-utils/DrawUtil';
import { EleObj }               from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements }     from '../../../ts/TsType_Helper';

const { Start, End, Operation, Subroutine, Condition, InputOutput, Parallel } = EleObj;

const IRefCheckUtil = RefCheckUtilsFactory.getV2();

@staticImplements<DrawFlowGraph.DemoCase.Static>()
export class Case2 {
	public static draw() {
		const 基本流程表              = new Start('基本流程，从',
			'https://shimo.im/sheets/v3gPWwhtKdyPw3dg/MODOC');
		const 数据逻辑梳理             = new Operation('数据逻辑梳理');
		const 单表结构设计_创建          = new Operation('表结构设计_创建');
		const 表与表之间联系_梳理         = new Operation('表与表之间联系_梳理');
		const 各个子难点_单独列举_早期只伪造接口 = new Operation(`各个子难点_单独列举_
    早期只伪造接口`);
		const 界面简单绘制_增删改查        = new Operation(`界面简单绘制_
    增删改查`);
		const 结束                 = new End('未完待续');
		return {
			title  : '测试案例2',
			content: DrawUtil.drawFlow(
				IRefCheckUtil.collectToCheckRef([
					基本流程表, 数据逻辑梳理, 单表结构设计_创建, 表与表之间联系_梳理,
					各个子难点_单独列举_早期只伪造接口, 界面简单绘制_增删改查,
					结束,
				]), [
					基本流程表.link(数据逻辑梳理, 单表结构设计_创建, 表与表之间联系_梳理,
						各个子难点_单独列举_早期只伪造接口, 界面简单绘制_增删改查,
						结束),
				],
			),
		};
	}
}
