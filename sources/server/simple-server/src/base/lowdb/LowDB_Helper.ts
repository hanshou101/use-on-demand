// TIP————————————————————————————————————————————系统依赖——————————————————————————————————
import Datastore from 'lowdb';                                // 基本库
import FileSync  from 'lowdb/adapters/FileSync';         // 文件读取库
const LodashId: any = require('lodash-id');             // 唯一标识的id字段
import path      from 'path';

// TIP————————————————————————————————————————————业务逻辑——————————————————————————————————
const adapter = new FileSync(path.join(__dirname, '../../assets/data/db.json'));        // 同步读取db.json文件
const db      = Datastore(adapter);
db._.mixin(LodashId);                                   // 将id字段设置，混入生效


class LowDB_Helper {

	static baseDb = db;

	/**
	 * 针对空JSON文件，进行初始化
	 * FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
	 */
	static init() {
		// 官网例子
		db.defaults({
			users: [],              // 用户列表
			posts: [],              // 帖子列表

			global: {},
			visit : 0,
		});
	}


	/**
	 * 新增数据
	 */
	static create() {
		// 有效
		if (!db.has('uploaded').value()) {
			db.set('uploaded', []).write();
		}

		// 有效
		if (!db.has('picBed').value()) {
			db.set('picBed', {
				current: 'weibo',
			}).write();
		}

		// 有效
		if (!db.has('shortKey').value()) {
			db.set('shortKey', {
				upload: 'CommandOrControl+Shift+P',
			}).write();
		}

		if (!db.has('visit')) {
			db.set('visit', 0);
		}

		if (!db.has('posts').value()) {
			db.set('posts', [
				{
					__id : 1,
					value: 111,
				},
				{
					__id : 2,
					value: 222,
				},
				{
					__id : 3,
					value: 333,
				},
				{
					__id : 4,
					value: 444,
				},
				{
					__id : 5,
					value: 555,
				},
			]).write();
		}

	}

	/**
	 * 读取数据
	 */
	static read() {
		const shortKey =
						db
							.get('shortKey')
							.value();
		return shortKey;
	}

	static read_byId() {
		const item =
						// FIXME 这里，Lodash官方的文档，存在问题。
						// @ts-ignore
						db.get('posts').find({
							id: 1,
						})
							.value();
		return item;
	}

	/**
	 * 更新数据
	 */
	static update_obj_override() {
		db.set('uploaded', {
			a: 'aaa',
			b: 'bbb',
		}).write();

		db.set('uploaded.ccc', 'cccccccc111')
			.write();
	}

	static update_obj_baseOn() {
		db.update('visit', (n) => n + 1)
			.write();
	}

	static update_array() {
		db.get('posts')
			// FIXME 这里，Lodash官方的文档，存在问题。
			// @ts-ignore
			.insert({
				title  : 'xxx',
				content: 'xxxx',
			})
			.write();
	}

	/**
	 * 删除数据
	 */
	static del_item() {
		db.get('posts')
			// FIXME 这里，Lodash官方的文档，存在问题。
			// @ts-ignore
			.remove({ value: 555 })
			.write();
	}

	static del_unsetValue() {
		db.unset('picBed.current').write();
	}

	static del_byLodashId() {
		db.get('posts')
			// FIXME 这里，Lodash官方的文档，存在问题。
			// @ts-ignore
			.removeById('test----id')
			.write();
	}


}

export {
	LowDB_Helper,
};
