// TIP———————————————————————————————导入依赖——————————————————————————————————
import express, { Router, Request, Response, NextFunction } from 'express';
import createError                                          from 'http-errors';
import path                                                 from 'path';
import cookieParser                                         from 'cookie-parser';
import logger                                               from 'morgan';
import cors                                                 from 'cors';

import { cfg } from '../config/config';


class ExpressBase_Helper {

	constructor(public expressBase = express()) {
		this.initAll();
	}

	initAll() {
		this.$2_redirectHttps();						// WARN 放在【Public】的前面，才能将【public/index.html】重定向到【https】。
		this.$0_initView();
		this.$1_initAssets_andPublic();
		this.$6_handleCORS();								// 跨域，尽量靠前。
		this.$4_initPlugin();
		this.$3_bindRoutes();								// 路由，尽量放在靠后的位置。
		this.$5_bindErrorPage();						// WARN 应该放在最后，会拦截其它页面
	}

	/**
	 * 初始化View层模板引擎
	 */
	$0_initView() {
		this.expressBase.set('views', cfg.view.viewsPath);           // 视图地址
		this.expressBase.set('view engine', cfg.view.viewsEngine);   // 视图引擎
	}

	/**
	 * 初始化 内部Assets、外部public。
	 */
	$1_initAssets_andPublic() {
		// TIP ——————————————————————————————内部assets资源目录——————————————————————————
		cfg.view.assetsPaths.forEach(assetsPath => {
			this.expressBase.set('assets', assetsPath);
		});

		// TIP ——————————————————————————————外部public资源目录——————————————————————————
		cfg.view.staticPaths.forEach(staticPath => {
			this.expressBase.use(express.static(staticPath));
		});

	}

	$2_redirectHttps() {
		console.log('此处，加上【http】全部转发到【https】的代码');
		this.expressBase.all('*', (req, res, next) => {
			// TIP 此处，原作者比较愚蠢，没有添加任何的筛选。我自己加上http头筛选

			// 【HTTPS安全协议】，无须处理。
			if (req.secure) {
				next();
			} else {
				const host     = req.headers.host || '';		// 带端口的主机
				const hostname = req.hostname || '';				// 不带端口的主机
				const url      = req.url || '';							// 子路径
				/*
				host = host.replace(/\:\d+$/, ''); // Remove port number
				res.redirect(307, `https://${host}${req.path}`);
				*/
				res.redirect(307, `https://${hostname}:${cfg.port.https}${url}`);
			}
		});
	}

	/**
	 * 路由批量设置
	 */
	$3_bindRoutes() {
		for (const route of cfg.route.map) {
			this.expressBase.use(route.baseUrl, route.router);
		}
	}

	/**
	 * Express的插件
	 */
	$4_initPlugin() {
		this.expressBase.use(logger('dev'));                              // 日志
		this.expressBase.use(express.json());                                    // JSON处理器
		this.expressBase.use(express.urlencoded({ extended: false }));             // Url-Encode转化
		this.expressBase.use(cookieParser());                                    // Cookie
	}

	/**
	 * 设置错误页面
	 */
	$5_bindErrorPage() {
		// 404界面
		this.expressBase.use(function(req: Request, res: Response, next: NextFunction) {
			next(createError(404));
		});
		// 500界面（内部出错）
		this.expressBase.use(function(err: MyExpress_Error, req: Request, res: Response, next: NextFunction) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error   = req.app.get('env') === 'development' ? err : {};
			// render the error page
			res.status(err.status || 500);
			res.render('error');
		});

	}

	/**
	 * 处理CORS跨域问题
	 */
	$6_handleCORS() {
		const c = () => {
			return cors({ credentials: true, origin: true });
		};							// 解决跨域问题
		this.expressBase.use(c());
		this.expressBase.options('*', c());
	}

}

// TIP———————————————————————————————创建Express应用———————————————————————————
export {
	ExpressBase_Helper,
};
