export declare class xX_SArray_Helper {
    /**
     * 获取数组中符合条件的元素的索引
     * @param arr 数组
     * @param fn 一个函数，如果函数返回true，则返回该项的下标，如果没有找到则返回-1
     */
    static getIndex_fromRule(arr: Array<any>, fn: (item: any, index: number, originArr: Array<any>) => boolean): number;
    /**
     * 数组去重
     * @param arr 需要去重的数组
     * @param _isObjectValue 数组的值是否是引用类型
     */
    getNewArray_NoRepeat(arr: Array<any>, _isObjectValue?: boolean): any[];
    /**
     * 转换数组中的对象，如：
     * convertObjectInArr(
     *      [{id: 1,name: "张三"},{id: 2,name: "李四"}],
     *      {id: "value", name: "text"},
     *      true,
     * )
     *  => [{value: 1,text: "张三"},{value: 2,text: "李四"}]
     * @param arr {Array} 需要转换的数组
     * @param keyConvertPair {Object} 一个对象
     * @param delOriginAttrValue {Boolean} 是否删除原来的属性
     * @return arr {Array} 返回转换后的数组
     */
    convertObjectKey_InOriginArr(arr: Array<any>, keyConvertPair: IndexedObj<any>, delOriginAttrValue?: boolean): void;
    /**
     * TODO ∑，累加求和公式。（应用场景，深度图 求和 ）
     *
     * 算法：原始 arr
     *      // 返回新数组，存储：每一个都是∑1 ∑2 ∑3 的计算结果。
     *      return [arr[0], arr[0]+arr[0], arr[0]+arr[1]+arr[2], ...];
     * @param seriesArr
     */
    get_NewArray_Accumulate_SigmaSummary(seriesArr: Array<number>): Array<number>;
    /**
     * 随机打乱数组。（洗牌）
     *        1.参考资料：[javascript - How can I shuffle an array? - Stack Overflow](https://stackoverflow.com/a/6274381/6264260)
     */
    shuffle_rtnNew(rawArr: Array<any>): any[];
    /**
     * 数组去重。
     */
    noRepeat_rtnNew(rawArr: Array<any>): any[];
}
//# sourceMappingURL=SArray_Helper.d.ts.map