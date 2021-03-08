// TIP————————————————————————————————————————————系统依赖——————————————————————————————————
import Datastore from 'lowdb'; // 基本库
import FileSync from 'lowdb/adapters/FileSync'; // 文件读取库
var LodashId = require('lodash-id'); // 唯一标识的id字段
import path from 'path';
// TIP————————————————————————————————————————————业务逻辑——————————————————————————————————
var adapter = new FileSync(path.join(__dirname, '../../assets/data/db.json')); // 同步读取db.json文件
var __baseDB = Datastore(adapter);
__baseDB._.mixin(LodashId); // 将id字段设置，混入生效
var LowDB_Helper;
(function (LowDB_Helper) {
    LowDB_Helper.db = __baseDB;
    /**
     * 写
     */
    var __setValue = function (dotKey, value, type) {
        var hasKey = LowDB_Helper.db.has(dotKey).value();
        switch (type) {
            case 'create': {
                if (hasKey) { // 如果不存在该key
                    throw new Error('已存在该key');
                }
                break;
            }
            case 'update': {
                if (!hasKey) { // 如果存在key
                    throw new Error('key并不存在！');
                }
                break;
            }
            case 'createUpdate': {
                // 不作判断，都可以
                break;
            }
        }
        LowDB_Helper.db.set(dotKey, value).write(); // 进行写入
    };
    LowDB_Helper.write = {
        db: {
            /**
             * 针对空JSON文件，进行初始化
             * 				1.FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
             */
            init_whenEmpty: function (initial) {
                // 官网例子
                LowDB_Helper.db.defaults(initial).write();
            },
            /**
             * 更换整个数据库的数据
             */
            replaceAll: function (allData) {
                LowDB_Helper.db.setState(allData);
            },
        },
        any: {
            /**
             * 写（新增）
             */
            create: function (dotKey, value) {
                __setValue(dotKey, value, 'create');
            },
            /**
             * 写（新增 或 更新）
             */
            createUpdate: function (dotKey, value) {
                __setValue(dotKey, value, 'createUpdate');
            },
            /**
             * 写（更新）
             */
            update: function (dotKey, value) {
                __setValue(dotKey, value, 'update');
            },
            /**
             * 写（更新，根据之前的值 而产生变化）
             */
            update_dependPre: function (dotKey, changeFn) {
                LowDB_Helper.db.update(dotKey, changeFn).write();
            },
        },
        array: {
            /**
             * 写（在数组中插入新值）
             */
            insertItem: function (dotKey, value) {
                LowDB_Helper.db.get(dotKey).push(value).write();
            },
            /**
             * 写（在数组中插入新值，并自动添加 Lodash的ID ）
             */
            insertItem_withLodashId: function (dotKey, value) {
                return LowDB_Helper.db.get(dotKey).insert(value).write();
            },
            /**
             * 写（在数组中删除某值，根据条件对象）
             */
            removeItem_byQuery: function (dotKey, queryObj) {
                LowDB_Helper.db.get(dotKey).remove(queryObj).write();
            },
            /**
             * 写（修改部分数据，根据条件对象）
             */
            updateSomeItem: function (dotKey, queryObj, value) {
                LowDB_Helper.db.get(dotKey).find(queryObj).assign(value).write();
            },
        },
        object: {
            /**
             * 写（在对象中，清除某个属性）
             */
            removeField: function (dotKey) {
                LowDB_Helper.db.unset(dotKey).write();
            },
        },
    };
    LowDB_Helper.read = {
        db: {
            /**
             * 整个数据库的数据
             */
            getAll: function () {
                return LowDB_Helper.db.getState();
            },
        },
        any: {
            /**
             * 读
             */
            getValue: function (dotKey) {
                return LowDB_Helper.db.get(dotKey).value();
            },
            /**
             * 读，根据对象条件
             */
            getValue_byQuery: function (dotKey, queryObj) {
                return LowDB_Helper.db.get(dotKey).find(queryObj).value();
            },
            /**
             * 判断 key 是否存在
             */
            exist: function (dotKey) {
                return LowDB_Helper.db.has(dotKey).value();
            },
        },
        array: {
            /**
             * 读（根据 Lodash的ID ）
             */
            getValue_withLodashId: function (dotKey, lodashId) {
                return LowDB_Helper.db.get(dotKey).getById(lodashId).value();
            },
            /**
             * 读（根据 条件对象）
             */
            getValue_byQuery: function (dotKey, option) {
                var queryObj = option.queryObj, sortKey = option.sortKey, takeNum = option.takeNum;
                var data = LowDB_Helper.db.get(dotKey);
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
            getSize: function (dotKey) {
                return LowDB_Helper.db.get(dotKey).size().value();
            },
        },
    };
})(LowDB_Helper || (LowDB_Helper = {}));
export { LowDB_Helper, };
//# sourceMappingURL=LowDB_Helper.js.map