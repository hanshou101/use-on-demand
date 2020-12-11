import Datastore from 'lowdb';
declare const db: Datastore.LowdbSync<any>;
/**
 * 针对空JSON文件，进行初始化
 * FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
 */
declare function init(): void;
/**
 * 新增数据
 */
declare function create(): void;
/**
 * 读取数据
 */
declare function read(): any;
declare function read_byId(): any;
/**
 * 更新数据
 */
declare function update_obj_override(): void;
declare function update_obj_baseOn(): void;
/**
 * 删除数据
 */
declare function del_item(): void;
declare function del_unsetValue(): void;
declare function del_byLodashId(): void;
export { db as baseDb, init, create, read, read_byId, update_obj_override, update_obj_baseOn, del_item, del_unsetValue, del_byLodashId, };
//# sourceMappingURL=LowDB_Helper.d.ts.map