type CustomMerge_Fn_Rtn = (((valueA: any, valueB: any) => any) | undefined);

declare module 'deepmerge' {

	interface ArrayMergeOptions {
		/**
		 *
		 */
		isMergeableObject(value: any): boolean;

		/**
		 *
		 */
		cloneUnlessOtherwiseSpecified(
			value: any,
			options: unknown,						// 这个选项是干嘛的？？？？？？
		): any;
	}

	interface Options {

		/**
		 * 指定【两个数组合并】的自定义规则。
		 */
		arrayMerge?(
			oldTargetArray: Array<any>,
			newSourceArray: Array<any>,
			options: ArrayMergeOptions,
		): Array<any>;

		/**
		 * 略为复杂：
		 * 				1.暂时不用管这个吧？？？？？？
		 */
		isMergeableObject?(target: any): boolean;

		/**
		 * 控制合并的过程。
		 * 				1.对于每个key，可以采用特定的函数，来进行合并值处理。
		 * 								1.如果返回undefined	，则使用【默认合并行为】。
		 */
		customMerge?(key: string): CustomMerge_Fn_Rtn;

		/**
		 * 不推荐使用。默认为true。
		 */
		clone?: boolean;
	}

	interface Deepmerge {
		/**
		 * 将【x对象】和【y对象】，进行合并。
		 */
		(
			x: object, b: object,
			options: Options,
		): object;

		/**
		 * 将【数组中所有对象】，进行合并。
		 */
		all(
			arrayOfObjects: Array<object>,
			options: Options,
		): object;
	}

	const deepmerge: Deepmerge;
	export default deepmerge;
}
