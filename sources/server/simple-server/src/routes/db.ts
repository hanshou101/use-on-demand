import {Router, Request, Response, NextFunction} from 'express';
import {LowDB_Helper}                            from '../base/lowdb/LowDB_Helper';

const {write, read} = LowDB_Helper;
const r_db          = Router();

write.db.init_whenEmpty({
  projects    : [{
    id  : 'fc433541-6eb0-4e12-9faa-8b362a48aa74',
    name: '董娜娜',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
    //
    relatedUrls: 'www.baidu.com',
    content    : '测试内容',
    descTags   : '1,2,3,4,5',
  }],
  servers     : [],
  siteMains   : [],
  owners      : [],
  siteRelateds: [],
  googles     : [],
  dirFiles    : [],
  holeSources : [],
});

// 测试
r_db.get('/', function(req : Request, res : Response, next : NextFunction){
  res.send(read.db.getAll());
});

function getTimeString(date : Date){
  return new Date(date.valueOf() + 8 * 60 * 60 * 1000).toISOString().slice(0, 23 - 4).replace('T', ' ');
}

/**
 * 快速生成CRUD。
 */
function crudRoute<BEAN extends {id : string}>(
  r : Router,
  apiDashPath : string,    // 需要以【/】开头
  dbPath : string,
){
  // 获取列表
  r.get(apiDashPath, function(req : Request, res : Response, next : NextFunction){
    res.send(read.any.getValue(dbPath));
  });

  // 更新条目
  r.put(apiDashPath, function(req : Request, res : Response, next : NextFunction){
    const bean : BEAN = req.body;
    write.array.updateSomeItem(dbPath, {
      id: bean.id,
    }, {
      ...bean,
      updatedAt: getTimeString(new Date()),
    } as BEAN);
    console.log('获取数据', bean);
    res.send(bean);
  });

  // 创建条目
  r.post(apiDashPath, function(req : Request, res : Response, next : NextFunction){
    const bean : BEAN = req.body;
    write.array.insertItem_withLodashId(dbPath, {
      ...bean,
      createdAt: getTimeString(new Date()),
      updatedAt: getTimeString(new Date()),
    } as BEAN);
    console.log('获取数据', bean);
    res.send(bean);
  });

  // 删除条目
  r.delete(apiDashPath, function(req : Request, res : Response, next : NextFunction){
    const bean : BEAN = req.body;
    write.array.removeItem_byQuery(dbPath, {
      id: bean.id,
    });
    console.log('获取数据', bean);
    res.send(bean);
  });

}


// 项目 ——————————————————————————————————————————————————————————————————————————————
crudRoute<LowDB.Project>(r_db, '/project', 'projects');

// 服务器 ——————————————————————————————————————————————————————————————————————————————
crudRoute<LowDB.Server>(r_db, '/server', 'servers');

crudRoute<LowDB.Server>(r_db, '/siteMain', 'siteMains');

crudRoute<LowDB.Server>(r_db, '/owner', 'owners');

crudRoute<LowDB.Server>(r_db, '/siteRelated', 'siteRelateds');

crudRoute<LowDB.Server>(r_db, '/google', 'googles');

crudRoute<LowDB.Server>(r_db, '/dirFile', 'dirFiles');

crudRoute<LowDB.Server>(r_db, '/holeSource', 'holeSources');


export {
  r_db,
};
