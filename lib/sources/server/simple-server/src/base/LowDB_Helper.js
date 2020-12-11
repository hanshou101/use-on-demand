// TIP————————————————————————————————————————————系统依赖——————————————————————————————————
import Datastore from 'lowdb'; // 基本库
import FileSync from 'lowdb/adapters/FileSync'; // 文件读取库
var LodashId = require('lodash-id'); // 唯一标识的id字段
// TIP————————————————————————————————————————————业务逻辑——————————————————————————————————
var adapter = new FileSync('db.json'); // 同步读取db.json文件
var db = Datastore(adapter);
db._.mixin(LodashId); // 将id字段设置，混入生效
/**
 * 针对空JSON文件，进行初始化
 * FIXME 此方法，似乎无论如何也会无效？原因，可能是，adapter创建了非空但有一个空白对象的JSON文件？？？
 */
function init() {
    // 官网例子
    db.defaults({
        users: [],
        posts: [],
        global: {},
        visit: 0,
    });
}
/**
 * 新增数据
 */
function create() {
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
                __id: 1,
                value: 111,
            },
            {
                __id: 2,
                value: 222,
            },
            {
                __id: 3,
                value: 333,
            },
            {
                __id: 4,
                value: 444,
            },
            {
                __id: 5,
                value: 555,
            },
        ]).write();
    }
}
/**
 * 读取数据
 */
function read() {
    var shortKey = db
        .get('shortKey')
        .value();
    return shortKey;
}
function read_byId() {
    var item = 
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
function update_obj_override() {
    db.set('uploaded', {
        a: 'aaa',
        b: 'bbb',
    }).write();
    db.set('uploaded.ccc', 'cccccccc111')
        .write();
}
function update_obj_baseOn() {
    db.update('visit', function (n) { return n + 1; })
        .write();
}
function update_array() {
    db.get('posts')
        // FIXME 这里，Lodash官方的文档，存在问题。
        // @ts-ignore
        .insert({
        title: 'xxx',
        content: 'xxxx',
    })
        .write();
}
/**
 * 删除数据
 */
function del_item() {
    db.get('posts')
        // FIXME 这里，Lodash官方的文档，存在问题。
        // @ts-ignore
        .remove({ value: 555 })
        .write();
}
function del_unsetValue() {
    db.unset('picBed.current').write();
}
function del_byLodashId() {
    db.get('posts')
        // FIXME 这里，Lodash官方的文档，存在问题。
        // @ts-ignore
        .removeById('test----id')
        .write();
}
export { db as baseDb, init, create, read, read_byId, update_obj_override, update_obj_baseOn, del_item, del_unsetValue, del_byLodashId, };
//# sourceMappingURL=LowDB_Helper.js.map