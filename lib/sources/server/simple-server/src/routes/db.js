import { Router } from 'express';
import { LowDB_Helper } from '../base/lowdb/LowDB_Helper';
var r_db = Router();
r_db.get('/', function (req, res, next) {
    // 读取表，然后插入数据
    // baseDb.get('users')
    //     .push({
    //         id: 1,
    //         username: '测试用户1',
    //     })
    //     .write();
    // baseDb.set('global.version', '1.2.3')
    //     .write();
    //
    // baseDb.update('visit', n => n + 1)
    //     .write();
    LowDB_Helper.create();
    LowDB_Helper.update_obj_override();
    LowDB_Helper.update_obj_baseOn();
    res.send({
        meta: "\u6B63\u5728\u8C03\u8BD5lowdb\u6846\u67B6",
        date: "" + new Date(),
        readVal: LowDB_Helper.read(),
        readById: LowDB_Helper.read_byId(),
        uploaded: LowDB_Helper.baseDb.get('uploaded'),
        visit: LowDB_Helper.baseDb.get('visit'),
    });
    // res.send(`${baseDb.get('users').find({id: 1}).value()}`);
});
export { r_db, };
//# sourceMappingURL=db.js.map