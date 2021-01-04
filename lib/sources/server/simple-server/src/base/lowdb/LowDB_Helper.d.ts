import Datastore from 'lowdb';
declare class LowDB_Helper {
    static baseDb: Datastore.LowdbSync<any>;
    /**
     * 针对空JSON文件，进行初始化
     * FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
     */
    static init(): void;
    /**
     * 新增数据
     */
    static create(): void;
    /**
     * 读取数据
     */
    static read(): any;
    static read_byId(): any;
    /**
     * 更新数据
     */
    static update_obj_override(): void;
    static update_obj_baseOn(): void;
    static update_array(): void;
    /**
     * 删除数据
     */
    static del_item(): void;
    static del_unsetValue(): void;
    static del_byLodashId(): void;
}
export { LowDB_Helper, };
//# sourceMappingURL=LowDB_Helper.d.ts.map