import Datastore from 'lowdb';
declare namespace LowDB_Helper {
    const db: Datastore.LowdbSync<any>;
    const write: {
        db: {
            /**
             * 针对空JSON文件，进行初始化
             * 				1.FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
             */
            init_whenEmpty(initial: LowDB.DB): void;
            /**
             * 更换整个数据库的数据
             */
            replaceAll(allData: LowDB.DB): void;
        };
        any: {
            /**
             * 写（新增）
             */
            create(dotKey: string, value: any): void;
            /**
             * 写（新增 或 更新）
             */
            createUpdate(dotKey: string, value: any): void;
            /**
             * 写（更新）
             */
            update(dotKey: string, value: any): void;
            /**
             * 写（更新，根据之前的值 而产生变化）
             */
            update_dependPre(dotKey: string, changeFn: <T>(pre: T) => T): void;
        };
        array: {
            /**
             * 写（在数组中插入新值）
             */
            insertItem(dotKey: string, value: any): void;
            /**
             * 写（在数组中插入新值，并自动添加 Lodash的ID ）
             */
            insertItem_withLodashId<T_1>(dotKey: string, value: T_1): T_1 & {
                id: string;
            };
            /**
             * 写（在数组中删除某值，根据条件对象）
             */
            removeItem_byQuery(dotKey: string, queryObj: IndexedObj): void;
            /**
             * 写（修改部分数据，根据条件对象）
             */
            updateSomeItem(dotKey: string, queryObj: IndexedObj, value: any): void;
        };
        object: {
            /**
             * 写（在对象中，清除某个属性）
             */
            removeField(dotKey: string): void;
        };
    };
    const read: {
        db: {
            /**
             * 整个数据库的数据
             */
            getAll(): any;
        };
        any: {
            /**
             * 读
             */
            getValue(dotKey: string): any;
            /**
             * 读，根据对象条件
             */
            getValue_byQuery(dotKey: string, queryObj: IndexedObj): any;
            /**
             * 判断 key 是否存在
             */
            exist(dotKey: string): boolean;
        };
        array: {
            /**
             * 读（根据 Lodash的ID ）
             */
            getValue_withLodashId(dotKey: string, lodashId: string): any;
            /**
             * 读（根据 条件对象）
             */
            getValue_byQuery(dotKey: string, option: {
                queryObj?: IndexedObj<any> | undefined;
                sortKey?: string | undefined;
                takeNum?: number | undefined;
            }): any;
            /**
             * 读（数据数量）
             */
            getSize(dotKey: string): number;
        };
    };
}
export { LowDB_Helper, };
//# sourceMappingURL=LowDB_Helper.d.ts.map