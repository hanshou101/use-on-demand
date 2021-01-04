import { Router, Request, Response, NextFunction } from 'express';
import { LowDB_Helper }                            from '../base/lowdb/LowDB_Helper';

const { write, read } = LowDB_Helper;
const r_db            = Router();

write.db.init_whenEmpty({
	projects: [{
		id      : '213333333333',
		content : '测试内容',
		descTags: '1,2,3,4,5',
		icon    : 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
		name    : '董娜娜',
	}],
});

// 测试
r_db.get('/', function(req: Request, res: Response, next: NextFunction) {
	res.send(read.db.getAll());
});

// 获取项目列表
r_db.get('/project', function(req: Request, res: Response, next: NextFunction) {
	res.send(read.any.getValue('projects'));
});

// 更新项目列表
r_db.put('/project', function(req: Request, res: Response, next: NextFunction) {
	const body: LowDB.Project = req.body;
	write.array.updateSomeItem('projects', {
		id: body.id,
	}, {
		...body,
		updatedAt: new Date().valueOf() + '',
	} as LowDB.Project);
	console.log('获取数据', body);
	res.send(body);
});

// 创建项目列表
r_db.post('/project', function(req: Request, res: Response, next: NextFunction) {
	const body: LowDB.Project = req.body;
	write.array.insertItem_withLodashId('projects', {
		...body,
		createdAt: new Date().valueOf() + '',
		updatedAt: new Date().valueOf() + '',
	} as LowDB.Project);
	console.log('获取数据', body);
	res.send(body);
});

export {
	r_db,
};
