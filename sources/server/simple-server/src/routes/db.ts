import {Router, Request, Response, NextFunction} from 'express';
import {LowDB_Helper}                            from '../base/lowdb/LowDB_Helper';

const r_db = Router();
r_db.get('/', function(req : Request, res : Response, next : NextFunction){

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
    meta    : `正在调试lowdb框架`,
    date    : `${new Date()}`,
    readVal : LowDB_Helper.read(),
    readById: LowDB_Helper.read_byId(),
    uploaded: LowDB_Helper.baseDb.get('uploaded'),
    visit   : LowDB_Helper.baseDb.get('visit'),
  });

  // res.send(`${baseDb.get('users').find({id: 1}).value()}`);

});

export {
  r_db,
};
