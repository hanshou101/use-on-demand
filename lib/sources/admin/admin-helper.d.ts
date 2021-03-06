import xX_Father_CommonMixin from './mixins/Father_CommonMixin';
declare type listQuery_type = xX_Father_CommonMixin<any>['listQuery'];
export declare class xX_AdminHelper {
    static __placeholder_1: string;
    static __placeholder_2: string;
    static __placeholder_3: string;
    /**
     * 将MultiLang，迅速转化为  已有ruleForm的一部分。
     */
    static combine_MultiLangPlus(type: 'upload' | 'fetch', formObj: any, netField: string, localField?: string): void;
    /**
     * 处理时间段选择
     */
    static formDateRange(params: {
        [key: string]: any;
    }, form: {
        [key: string]: any;
    }): void;
    /**
     *  介绍：将一个已有的Object，经过特定筛子（class形式；目前还不能用interface形式），筛选保留出特定数据
     *
     *  功能：
     *          1.目前，经常用于【提交数据】的筛选。
     */
    static filterTargetFields<T>(originObj: IndexedObj<any>, filterObj: object, needTrimEmpty?: boolean): IndexedObj<any>;
    /**
     * 模拟分页
     */
    static mockPage(records: Array<any>, context: {
        listQuery: listQuery_type;
    }): {
        size: number;
        total: number;
        current: number;
        records: any[];
    };
}
export {};
//# sourceMappingURL=admin-helper.d.ts.map