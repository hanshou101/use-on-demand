import { EleObj }                                from './EleObj';
import os                                        from 'os';
import { RefCheckUtilsFactory, CheckRefWrapper } from './RefCheckUtils';

const IRefCheckUtil = RefCheckUtilsFactory.getV2();


export class DrawUtil {
	private static readonly SyntaxSep = '\`\`\`';
	private static readonly GraphType = 'flow';

	/**
	 * 绘制流程图
	 */
	public static drawFlow(
		eleObjsWrapper: CheckRefWrapper,
		operations: string[],
	) {
		const eleObjs = eleObjsWrapper.eleObjs;
		this.checkHasStartEnd(eleObjs);
		this.checkLinks(eleObjs);
		IRefCheckUtil.checkRefs();
		const _content = [...eleObjs, ...operations].map((obj) => {
			return obj.toString();
		}).join(os.EOL);
		const sep      = DrawUtil.SyntaxSep;
		const graph    = DrawUtil.GraphType;
		const final    = `${sep}${graph}${os.EOL}${_content}${os.EOL}${sep}`;
		const _final   = final.trim();
		return _final;
	}

	/**
	 * 检查是否有开始标签、结束标签。
	 */
	private static checkHasStartEnd(
		eleObjs: EleObj.Base[],
	) {
		const startEndCheck = [false, false];
		eleObjs.forEach((item: EleObj.Base<any> | string) => {
			if (item instanceof EleObj.Start) {
				startEndCheck[0] = true;
			}
			if (item instanceof EleObj.End) {
				startEndCheck[1] = true;
			}
		});
		const result = startEndCheck.reduce((previousValue, total) => {                // 是否  全部为true
			return total && previousValue;
		});
		if (!result) {
			throw new Error('并未满足条件：必须要有【Start】标签，必须要有【End】标签');
		}
	}

	/**
	 * 检查连接线。
	 *        1.除【条件】、【平行】之外的框，连接数是否超过1
	 */
	private static checkLinks(
		eleObjs: EleObj.Base[],
	) {
		eleObjs.forEach((item) => {
			let maxTimes;
			// TIP 从网上找到资料，可见这位作者相当聪明！Switch可以反过来用：https://stackoverflow.com/questions/36332665/how-to-use-instanceof-in-a-switch-statement
			switch (true) {
				case item instanceof EleObj.Condition: {
					maxTimes = 3;                   // 【条件】，3次
					break;
				}
				case item instanceof EleObj.Parallel: {
					maxTimes = 2;                   // 【平行】，2次
					break;
				}
				default: {
					maxTimes = 1;
					break;
				}
			}
			if (item.linkTimes > maxTimes) {
				throw new Error(`${item.toString()}的linkTimes - ${item.linkTimes}，已超过最大连接数 - ${maxTimes}`);
			}
		});
	}


}
