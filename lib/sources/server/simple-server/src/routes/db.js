import { __assign } from "tslib";
import { Router } from 'express';
import { LowDB_Helper } from '../base/lowdb/LowDB_Helper';
var write = LowDB_Helper.write, read = LowDB_Helper.read;
var r_db = Router();
write.db.init_whenEmpty({
    projects: [{
            id: 'fc433541-6eb0-4e12-9faa-8b362a48aa74',
            name: '董娜娜',
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
            //
            relatedUrls: 'www.baidu.com',
            content: '测试内容',
            descTags: '1,2,3,4,5',
        }],
    servers: [],
    siteMains: [],
    owners: [],
    siteRelateds: [],
    googles: [],
    dirFiles: [],
    holeSources: [],
});
// 测试
r_db.get('/', function (req, res, next) {
    res.send(read.db.getAll());
});
function getTimeString(date) {
    return new Date(date.valueOf() + 8 * 60 * 60 * 1000).toISOString().slice(0, 23 - 4).replace('T', ' ');
}
/**
 * 快速生成CRUD。
 */
function crudRoute(r, apiDashPath, // 需要以【/】开头
dbPath) {
    // 获取列表
    r.get(apiDashPath, function (req, res, next) {
        res.send(read.any.getValue(dbPath));
    });
    // 更新条目
    r.put(apiDashPath, function (req, res, next) {
        var bean = req.body;
        write.array.updateSomeItem(dbPath, {
            id: bean.id,
        }, __assign(__assign({}, bean), { updatedAt: getTimeString(new Date()) }));
        console.log('获取数据', bean);
        res.send(bean);
    });
    // 创建条目
    r.post(apiDashPath, function (req, res, next) {
        var bean = req.body;
        write.array.insertItem_withLodashId(dbPath, __assign(__assign({}, bean), { createdAt: getTimeString(new Date()), updatedAt: getTimeString(new Date()) }));
        console.log('获取数据', bean);
        res.send(bean);
    });
    // 删除条目
    r.delete(apiDashPath, function (req, res, next) {
        var bean = req.body;
        write.array.removeItem_byQuery(dbPath, {
            id: bean.id,
        });
        console.log('获取数据', bean);
        res.send(bean);
    });
}
// 项目 ——————————————————————————————————————————————————————————————————————————————
crudRoute(r_db, '/project', 'projects');
// 服务器 ——————————————————————————————————————————————————————————————————————————————
crudRoute(r_db, '/server', 'servers');
crudRoute(r_db, '/siteMain', 'siteMains');
crudRoute(r_db, '/owner', 'owners');
crudRoute(r_db, '/siteRelated', 'siteRelateds');
crudRoute(r_db, '/google', 'googles');
crudRoute(r_db, '/dirFile', 'dirFiles');
crudRoute(r_db, '/holeSource', 'holeSources');
export { r_db, };
//# sourceMappingURL=db.js.map