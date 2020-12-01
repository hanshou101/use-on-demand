import { EleObj } from './EleObj';
import os         from 'os';

export interface UsedParams {
	[key: string]: EleObj.Base;
}

// FIXME 似乎TypeScript有点缺陷，无法完成AOP的实现。
// export abstract class IRefCheckUtils_InstanceDeclare {    // 实例方法
//
// }
//
// export interface IRefCheckUtils {                         // 静态方法
//   new(): IRefCheckUtils_InstanceDeclare;                            //
//   collectToCheckRef(eleObjs: EleObj.Base[]): ICheckRefWrapper;
// }
//
// export interface ICheckRefWrapper {
//   new(eleObjs: EleObj.Base[]): this;
// }

interface IRefCheckUtils {                                    // 静态方法
	collectToCheckRef(eleObjs: EleObj.Base[]): CheckRefWrapper;     //
	checkUsedIfOnce(obj: EleObj.Base): void;                        //
	checkRefs(): void;                        //
}

/**
 * 既然【静态接口】用不了，那我就换成【工厂模式】。
 */
export class RefCheckUtilsFactory {
	private static v1?: RefCheckUtils_v1;
	private static v2?: RefCheckUtils_v2;

	public static getV1(): RefCheckUtils_v1 {
		if (!RefCheckUtilsFactory.v1) {
			RefCheckUtilsFactory.v1 = new RefCheckUtils_v1();
		}
		return RefCheckUtilsFactory.v1;
	}

	public static getV2(): RefCheckUtils_v2 {
		if (!RefCheckUtilsFactory.v2) {
			RefCheckUtilsFactory.v2 = new RefCheckUtils_v2();
		}
		return RefCheckUtilsFactory.v2;
	}
}

class RefCheckUtils_v1 implements IRefCheckUtils {

	/**
	 * 将元素收集起来，检查引用
	 *        1.避免，未在md变量中声明，就在md连线中使用  的情况。
	 *        2.该方法，可以用作【drawFlow】方法的外部传参之前，也可以用作【drawFlow】内部。
	 */
	public collectToCheckRef(
		eleObjs: EleObj.Base[],
	) {
		eleObjs.forEach((item) => {
			// 先加后减，和先减后加。效果是一个样！！！
			item.canUseTimes += 9999;          // 初始值时，凡是声明过的，都增为最大。
		});
		return new CheckRefWrapper(eleObjs);
	}

	public checkUsedIfOnce(
		obj: EleObj.Base,
	) {
		obj.canUseTimes--;              // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
	}


	/**
	 * 基本思路  声明/引用 引用次数，计数器。
	 *
	 * 1.方式一.
	 *      1.将所有的声明，包起来，放在一个对象里。然后通过对象调用。
	 *      2.这样的好处是，我们拥有全集的一个对象。
	 * 2.方式二.
	 *      1.方式二，通过【with】关键字。
	 *      2.这是基于方式一，对方式一的一种简化、修正。（但是缺陷在于，TypeScript，以及strict模式，并不支持）
	 * 3.方式三.
	 *      1.正在考虑。在Utils类中维护一个全局。
	 *      2.然后每个调用、被调用方法内，进行处理。
	 */
	public checkRefs(
		usedParams?: UsedParams,
	) {
		if (!usedParams) {
			throw new Error(`v1版本，需要usedParams。${os.EOL}1.请将该参数传入${os.EOL}2.或者，重新写一遍方法的逻辑`);
		}

		// FIXME 此处，似乎只能检查哪些已声明没用过？？？？？  而检查不到，哪些用了但没声明？？？
		// TIP 那么，只能运用【全量表】的思维了。！！！用IDE的提示，来实现。
		for (const key in usedParams) {
			if (usedParams.hasOwnProperty(key)) {
				const item = usedParams[key];
				if (item.canUseTimes < 0) {
					throw new Error(`存在未在md声明，就在连线中使用的情况${os.EOL}1.${item.toString()}`);
				}
			}
		}
	}
}

export class CheckRefWrapper {
	constructor(public eleObjs: EleObj.Base[]) {
	}
}


class RefCheckUtils_v2 implements IRefCheckUtils {
	public static declaredObjs: EleObj.Base[] = [];

	public collectToCheckRef(
		eleObjs: EleObj.Base[],
	) {
		RefCheckUtils_v2.declaredObjs = eleObjs;
		return new CheckRefWrapper(RefCheckUtils_v2.declaredObjs);
	}

	public checkUsedIfOnce(
		obj: EleObj.Base,
	) {
		// 如果元素并非【虚拟衍生元素】，并且没有被声明，则抛出异常
		if (!obj.__isVirtualEleObj()
			&& !RefCheckUtils_v2.declaredObjs.includes(obj)
		) {
			throw new Error(`${obj.toString()}${os.EOL}1.该元素正在被使用${os.EOL}2.该元素没有被声明`);
		}
	}

	public checkRefs(): void {
		// 此处，暂时好像没有什么好检查的。
	}

}
