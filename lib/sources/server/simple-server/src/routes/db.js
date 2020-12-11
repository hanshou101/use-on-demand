import e from 'express';
import { baseDb, create, read, read_byId, update_obj_baseOn, update_obj_override } from '../base/LowDB_Helper';
// import low from 'lowdb';
// const low = require('lowdb');
var router = e.Router();
router.get('/', function (req, res, next) {
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
    create();
    update_obj_override();
    update_obj_baseOn();
    res.send({
        meta: "\u6B63\u5728\u8C03\u8BD5lowdb\u6846\u67B6",
        date: "" + new Date(),
        readVal: read(),
        readById: read_byId(),
        uploaded: baseDb.get('uploaded'),
        visit: baseDb.get('visit'),
    });
    // res.send(`${baseDb.get('users').find({id: 1}).value()}`);
});
export { router as dbRouter, };
//# sourceMappingURL=db.js.map