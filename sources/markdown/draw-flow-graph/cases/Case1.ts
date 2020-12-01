import { DrawUtil }             from '../draw-utils/DrawUtil';
import { EleObj }               from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements }     from '../../../ts/TsType_Helper';

const { Start, End, Operation, Subroutine, Condition, InputOutput, Parallel } = EleObj;

const IRefCheckUtil = RefCheckUtilsFactory.getV2();

@staticImplements<DrawFlowGraph.DemoCase.Static>()
export class Case1 {
	public static draw() {

		const 开始         = new Start('开始框111', 'www.baidu.com');
		const 开始预处理      = new Operation('开始预处理');
		const 第一个判断      = new Condition('判断框（是或否?）');
		const 第二个判断      = new Condition(`判断框`);
		const 对第二个判断框的说明 = new Operation(`注释（我们用这个框，实现多个分支）`);
		const 第一个子流程     = new Subroutine('子流程（放一个完整的图）');
		const 输入输出框      = new InputOutput('输入输出框');
		const 结束框        = new End('结束框');
		const 平行框        = new Parallel('平行任务们');

// const content = DrawUtil.drawFlow(`
// ${开始}
// ${开始预处理}
// ${第一个判断}
// ${第一个子流程}
// ${输入输出框}
// ${结束框}
// st->op->cond
// cond(yes)->io->e
// cond(no)->sub1(right)->op
// `);

		/*
				// FIXME 不推荐使用with关键字，但这又是【with】很适合的一种场景
				// @ts-ignore
				with (_) {

				}
		*/

		const content = DrawUtil.drawFlow(
			// 元素
			IRefCheckUtil.collectToCheckRef(
				[开始, 开始预处理, 第一个判断, 第二个判断, 对第二个判断框的说明, 第一个子流程, 输入输出框, 结束框, 平行框],
			),
			// 连线
			[开始.link(开始预处理, 第一个判断),
				第一个判断.cond('yes', 'right').link(输入输出框, 结束框),
				第一个判断.cond('no', 'left').link(第二个判断),
				第二个判断.cond('yes').link(
					对第二个判断框的说明, 第一个子流程.toDirection('left'), 第一个判断,
				),
				第二个判断.cond('no').link(平行框),
				// 开始预处理.link(平行框.byDirection('left')),
				平行框.parallel('path1', 'top').link(开始预处理),
				平行框.parallel('path2', 'right').link(输入输出框),
			],
		);

		return {
			content,
			title: '测试案例1',
		};
	}
}
