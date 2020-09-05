export class SArray_Helper {
    /**
     * 获取数组中符合条件的元素的索引
     * @param arr 数组
     * @param fn 一个函数，如果函数返回true，则返回该项的下标，如果没有找到则返回-1
     */
    static getIndex_fromRule(arr, fn) {
        if (!arr || arr.length == 0 || !fn || (typeof fn != 'function')) {
            return -1;
        }
        if (arr.findIndex) {
            return arr.findIndex(fn);
        }
        const len = arr.length;
        let i = 0;
        let index = -1;
        for (; i < len; i++) {
            const item = arr[i];
            if (fn(item, index, arr) === true) {
                index = i;
                break;
            }
        }
        return index;
    }
    /**
     * 数组去重
     * @param arr 需要去重的数组
     * @param _isObjectValue 数组的值是否是引用类型
     */
    getNewArray_NoRepeat(arr, _isObjectValue) {
        if (!arr || arr.length === 0) {
            return arr;
        }
        // noinspection PointlessBooleanExpressionJS
        const isObjectValue = typeof _isObjectValue === 'undefined' ? false : !!_isObjectValue;
        const arrLen = arr.length;
        const newArr = [];
        // 值类型的数组，使用对象属性唯一的特性来去重
        if (!isObjectValue) {
            const obj = {};
            for (let i = 0; i < arrLen; i++) {
                obj[arr[i]] = 1;
            }
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    newArr.push(attr);
                }
            }
            return newArr;
        }
        newArr.push(arr[0]);
        for (let i = 1; i < arrLen; i++) {
            const item = arr[i];
            let repeat = false;
            for (let j = 0; j < newArr.length; j++) {
                if (item === arr[j]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                newArr.push(item);
            }
        }
        return newArr;
    }
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
    convertObjectKey_InOriginArr(arr, keyConvertPair, delOriginAttrValue) {
        if (!arr || arr.length == 0) {
            return;
            // return arr;
        }
        arr.forEach((item) => {
            // eslint-disable-next-line
            for (const attr in item) {
                if (item.hasOwnProperty(attr)) {
                    for (const origin in keyConvertPair) {
                        if (keyConvertPair.hasOwnProperty(origin)) {
                            if (origin in item) {
                                item[keyConvertPair[origin]] = item[origin];
                                // eslint-disable-next-line
                                if (!!delOriginAttrValue) {
                                    delete item[origin];
                                }
                            }
                        }
                    }
                }
            }
        });
        return;
        // return arr;
    }
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    /**
     * TODO ∑，累加求和公式。（应用场景，深度图 求和 ）
     *
     * 算法：原始 arr
     *      // 返回新数组，存储：每一个都是∑1 ∑2 ∑3 的计算结果。
     *      return [arr[0], arr[0]+arr[0], arr[0]+arr[1]+arr[2], ...];
     * @param seriesArr
     */
    get_NewArray_Accumulate_SigmaSummary(seriesArr) {
        if (({}).toString.call(seriesArr) != '[object Array]') {
            return JSON.parse(JSON.stringify(seriesArr)); // 拷贝一下，防止干扰到原数组。
        }
        if (seriesArr.length == 1) {
            return JSON.parse(JSON.stringify(seriesArr)); // 拷贝一下，防止干扰到原数组。
        }
        // 用于存储每一步计算的结果
        let cache = [];
        const resultArr = [];
        seriesArr.forEach((item, index) => {
            if (cache) {
                if (index == 0) {
                    resultArr.push(item);
                    cache[index] = item;
                }
                else {
                    let sum = 0;
                    // 如果前一个索引的值在缓存中，则从缓存中取
                    if (((index - 1) + '') in cache) {
                        sum = cache[index - 1] + item;
                    }
                    else {
                        // 如果前一个索引不在缓存中，则直接循环计算
                        for (let i = 0; i <= index; i++) {
                            sum += seriesArr[i];
                        }
                    }
                    resultArr.push(sum);
                    // 将当前索引及值添加到缓存中，以备后续使用
                    cache[index] = sum;
                }
            }
        });
        cache = null;
        return resultArr;
    }
    /**
     * 随机打乱数组。（洗牌）
     *        1.参考资料：[javascript - How can I shuffle an array? - Stack Overflow](https://stackoverflow.com/a/6274381/6264260)
     */
    shuffle_rtnNew(rawArr) {
        let j;
        let x;
        let i;
        const newArr = [...rawArr];
        for (i = newArr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = newArr[i];
            newArr[i] = newArr[j];
            newArr[j] = x;
        }
        return newArr;
    }
    /**
     * 数组去重。
     */
    noRepeat_rtnNew(rawArr) {
        return [...new Set(rawArr)]; // 快速去重
    }
}
//# sourceMappingURL=SArray_Helper.js.map