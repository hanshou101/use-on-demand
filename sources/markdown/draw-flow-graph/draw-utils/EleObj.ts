import os                       from 'os';
import { RefCheckUtilsFactory } from './RefCheckUtils';

const IRefCheckUtil = RefCheckUtilsFactory.getV2();


export namespace EleObj {

	type direction = 'left' | 'right' | 'top' | 'bottom';
	type cond_Option = 'yes' | 'no';
	type path_Option = 'path1' | 'path2' | 'path3';

	// 原生类型
	enum EleObj_Enum {
		Start       = 'start',
		End         = 'end',
		Operation   = 'operation',
		Subroutine  = 'subroutine',
		Condition   = 'condition',
		Inputoutput = 'inputoutput',
		Parallel    = 'parallel',
	}

	// 操作过程中的衍生类型
	enum VirtualEleObj_Enum {
		__Cond      = '__cond',
		__Direction = '__direction',
		__Para      = '__para',
	}

	export class Base<T = any> {

		public linkTimes   = 0;    // 记录，当前元素，连接了几个其它元素
		/**
		 * 先加后减，和先减后加。效果是一个样！！！
		 */
		public canUseTimes = 0;    // 元素，被声明次数 - 被使用次数

		protected constructor(
			protected type: EleObj_Enum | VirtualEleObj_Enum,
			protected content_canBreakLine: string,
			protected urlLink?: string,
			protected paramName?: string,
		) {
			if (!paramName) {
				/**
				 * 此处，增加了对于content中【换行符】的支持。（更加方便排版）
				 *        1.content 允许有换行符
				 *        2.paramName 不允许有换行符
				 */
				this.paramName = content_canBreakLine.replace(os.EOL, '')
																						 .replace(/\s/g, '') + new Date().valueOf();
				console.log(`${this.paramName} /// ${content_canBreakLine}`);
			}
		}

		public toString() {
			if (
				this.urlLink
				&& !(this.urlLink?.startsWith('http://'))
				&& !(this.urlLink?.startsWith('https://'))
			) {
				const newUrl = `http://${this.urlLink}`;
				console.log('替换了urlLink', '新值', newUrl, '原值', this.urlLink);
				this.urlLink = newUrl;
			}

			return `${this.paramName}=>${this.type}: ${this.content_canBreakLine}${
				// this?.urlLink ?? ''                                   // 缺省值为空字符
				this.urlLink ? ':>' + this.urlLink : ''
			}`;
		}

		/**
		 * 检查，自身对象的type，是属于哪一种枚举类型
		 *        1.【虚拟衍生元素】，将不被ref检查；
		 *        2.【实际元素】，将被ref检查；
		 */
		public __isVirtualEleObj() {
			let bool;
			if (Object.values(VirtualEleObj_Enum).includes(this.type as any)) {
				bool = true;
			} else {
				bool = false;
			}
			// const bool = (this.type as any) instanceof VirtualEleObj_Enum;
			return bool;
		}

		public link(
			...objs: Base[]
		): string {
			this.linkTimes++;                   // link次数记录+1
			IRefCheckUtil.checkUsedIfOnce(this);       // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）

			objs.forEach((item, index, arr) => {
				if (index + 1 < arr.length) {           // 如果自身不是最后一个元素（自己的身后，还有其它元素）
					item.linkTimes++;               // link次数记录+1
				}
				IRefCheckUtil.checkUsedIfOnce(item);     // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
			});

			const str = [this, ...objs].map((item) => {
				return item.paramName;
			}).join('->');

			return str;
		}

		public toDirection(
			direc: direction,
		) {
			IRefCheckUtil.checkUsedIfOnce(this);              // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）

			if (this.type === VirtualEleObj_Enum.__Cond) {
				throw new Error(`【Cond】框内，不允许直接使用toDirection方法。${os.EOL}1.请使用cond方法里的额外参数！${os.EOL}2.${this.toString()}`);
			}

			const __newDirect = `${this.paramName}(${direc})`;
			return new Base(VirtualEleObj_Enum.__Direction, __newDirect,
				undefined, __newDirect);
		}

	}

	export class Start extends Base {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.Start, content_canBreakLine, urlLink, paramName);
		}

	}

	export class End extends Base<EleObj_Enum.End> {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.End, content_canBreakLine, urlLink, paramName);
		}
	}

	export class Operation extends Base<EleObj_Enum.Operation> {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.Operation, content_canBreakLine, urlLink, paramName);
		}
	}

	export class Subroutine extends Base<EleObj_Enum.Subroutine> {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.Subroutine, content_canBreakLine, urlLink, paramName);
		}
	}

	export class Condition extends Base<EleObj_Enum.Condition> {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.Condition, content_canBreakLine, urlLink, paramName);
		}

		public cond(
			state: cond_Option,
			direct?: direction,
		) {
			this.linkTimes++;                   // link次数记录+1
			IRefCheckUtil.checkUsedIfOnce(this);              // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）

			if (
				this.paramName
				&& (
					this.paramName.indexOf('(') > 0
					|| this.paramName.indexOf(')') > 0
				)
			) {
				throw new Error(`Condition框存在特殊符号！会影响cond判断。
        解决方案：
        1.不可以用半角括号。
        2.可以考虑用全角括号`);
			}
			const directStr  = direct ? `,${direct}` : '';
			const newContent = `${this.paramName}(${state}${directStr})`;
			return new Base(VirtualEleObj_Enum.__Cond, newContent,
				undefined, newContent);
		}

		// public toDirection(direc: 'left' | 'right' | 'top' | 'bottom'): EleObj.Base<any> {
		//   throw new Error(`【Cond】框内，不允许直接使用toDirection方法。${os.EOL}1.请使用cond方法里的额外参数！`);
		// }
	}

	export class InputOutput extends Base<EleObj_Enum.Inputoutput> {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.Inputoutput, content_canBreakLine, urlLink, paramName);
		}
	}

	export class Parallel extends Base<EleObj_Enum.Parallel> {
		constructor(
			content_canBreakLine: string,
			urlLink?: string,
			paramName?: string,
		) {
			super(EleObj_Enum.Parallel, content_canBreakLine, urlLink, paramName);
		}


		public parallel(
			pathName: path_Option,
			direct: direction,
		) {
			this.linkTimes++;                   // link次数记录+1
			IRefCheckUtil.checkUsedIfOnce(this);              // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）

			const paramName = `${this.paramName}(${pathName},${direct})`;
			return new Base(VirtualEleObj_Enum.__Para, paramName,
				undefined, paramName);
		}

	}

}
