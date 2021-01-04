// TIP————————————————————————————————————————————系统依赖——————————————————————————————————
import Datastore from 'lowdb';                                // 基本库
import lodash    from 'lowdb/node_modules/@types/lodash';
import FileSync  from 'lowdb/adapters/FileSync';         // 文件读取库
const LodashId: any = require('lodash-id');             // 唯一标识的id字段
import path      from 'path';

// TIP————————————————————————————————————————————业务逻辑——————————————————————————————————
const adapter  = new FileSync(path.join(__dirname, '../../assets/data/db.json'));        // 同步读取db.json文件
const __baseDB = Datastore(adapter);
__baseDB._.mixin(LodashId);                                   // 将id字段设置，混入生效

namespace LowDB_Helper {

	export const db = __baseDB;

	/**
	 * 写
	 */
	const __setValue = (dotKey: string, value: any, type: 'create' | 'update' | 'createUpdate') => {
		const hasKey = db.has(dotKey).value();

		switch (type) {
			case 'create': {
				if (hasKey) {										// 如果不存在该key
					throw new Error('已存在该key');
				}
				break;
			}
			case 'update': {
				if (!hasKey) {									// 如果存在key
					throw new Error('key并不存在！');
				}
				break;
			}
			case 'createUpdate': {
				// 不作判断，都可以
				break;
			}
		}
		db.set(dotKey, value).write();		// 进行写入
	};

	export const write = {
		db    : {
			/**
			 * 针对空JSON文件，进行初始化
			 * 				1.FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
			 */
			init_whenEmpty(initial: LowDB.DB) {
				// 官网例子
				db.defaults(initial).write();
			},
			/**
			 * 更换整个数据库的数据
			 */
			replaceAll(allData: LowDB.DB) {
				db.setState(allData);
			},
		},
		any   : {
			/**
			 * 写（新增）
			 */
			create(dotKey: string, value: any) {
				__setValue(dotKey, value, 'create');
			},
			/**
			 * 写（新增 或 更新）
			 */
			createUpdate(dotKey: string, value: any) {
				__setValue(dotKey, value, 'createUpdate');
			},
			/**
			 * 写（更新）
			 */
			update(dotKey: string, value: any) {
				__setValue(dotKey, value, 'update');
			},
			/**
			 * 写（更新，根据之前的值 而产生变化）
			 */
			update_dependPre(dotKey: string, changeFn: <T>(pre: T) => T) {
				db.update(dotKey, changeFn).write();
			},
		},
		array : {
			/**
			 * 写（在数组中插入新值）
			 */
			insertItem(dotKey: string, value: any) {
				(db.get(dotKey) as any).push(value).write();
			},
			/**
			 * 写（在数组中插入新值，并自动添加 Lodash的ID ）
			 */
			insertItem_withLodashId<T>(
				dotKey: string,
				value: T,
			): (T & { id: string; })		// 返回值，Lodash已添加了ID。
			{
				return (db.get(dotKey) as any).insert(value).write();
			},
			/**
			 * 写（在数组中删除某值，根据条件对象）
			 */
			removeItem_byQuery(dotKey: string, queryObj: IndexedObj) {
				(db.get(dotKey) as any).remove(queryObj).write();
			},
			/**
			 * 写（修改部分数据，根据条件对象）
			 */
			updateSomeItem(dotKey: string, queryObj: IndexedObj, value: any) {
				(db.get(dotKey) as any).find(queryObj).assign(value).write();
			},
		},
		object: {
			/**
			 * 写（在对象中，清除某个属性）
			 */
			removeField(dotKey: string) {
				db.unset(dotKey).write();
			},
		},
	};

	export const read = {
		db   : {
			/**
			 * 整个数据库的数据
			 */
			getAll() {
				return db.getState();
			},
		},
		any  : {
			/**
			 * 读
			 */
			getValue(dotKey: string) {
				return db.get(dotKey).value();
			},
			/**
			 * 读，根据对象条件
			 */
			getValue_byQuery(dotKey: string, queryObj: IndexedObj) {
				return (db.get(dotKey) as any).find(queryObj).value();
			},
			/**
			 * 判断 key 是否存在
			 */
			exist(dotKey: string) {
				return db.has(dotKey).value();
			},
		},
		array: {
			/**
			 * 读（根据 Lodash的ID ）
			 */
			getValue_withLodashId(dotKey: string, lodashId: string) {
				return (db.get(dotKey) as any).getById(lodashId).value();
			},
			/**
			 * 读（根据 条件对象）
			 */
			getValue_byQuery(dotKey: string, option: {
				queryObj?: IndexedObj;
				sortKey?: string;
				takeNum?: number;
			}) {
				const { queryObj, sortKey, takeNum } = option;
				let data: any                        = db.get(dotKey);
				// 搜索条件
				if (queryObj) {
					data = data.filter(queryObj);
				}
				// 排序
				if (sortKey) {
					data = data.sortBy(sortKey);
				}
				// 取的数量
				if (takeNum) {
					data = data.take(takeNum);
				}
				return data.value();
			},
			/**
			 * 读（数据数量）
			 */
			getSize(dotKey: string) {
				return db.get(dotKey).size().value();
			},
		},
	};

}

export {
	LowDB_Helper,
};
