// TIP——————————————————————————————————————————系统依赖————————————————————
import fs                     from 'fs';
import path                   from 'path';
import { r_db }               from '../routes/db';
import { r_myStepByStepLife } from '../routes/my_step_by_step_life';

export const cfg = new class implements ServerApp.ExpressServer_Cfg {
	/**
	 * 挂载端口
	 */
	readonly port = {
		http : 20080,
		https: 20443,
	};
	/**
	 * Https证书
	 *        1. 2020.01.19获得
	 */
	readonly cert = {
		privateKey : fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/private.key'), 'utf8'),
		certificate: fs.readFileSync(path.join(__dirname, '../assets/cert/new-20200119/full_chain.pem'), 'utf8'),
	};

	/**
	 * 视图
	 */
	readonly view = {
		// 页面渲染
		viewsPath  : path.join(__dirname, '../../views'),
		viewsEngine: 'jade' as const,
		// 外部public资源
		staticPaths: [
			path.join(__dirname, '../../public'),
			path.join(__dirname, '../../public/guoqiong'),
		],
		// 内部assets资源
		assetsPaths: [
			path.join(__dirname, '../assets'),
		],
	};

	/**
	 * 路由表
	 */
	readonly route = {
		map: [
			{ baseUrl: '/db', router: r_db },
			{ baseUrl: '/dist-MyBestLife-MyBestProject', router: r_myStepByStepLife },
		],
	};
};
