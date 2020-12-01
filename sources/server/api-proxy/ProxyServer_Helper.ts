import express, {
	Response as ExResponse,
	Request as ExRequest,
}              from 'express';
import path    from 'path';
import request from 'request';


const contentTypes = {
	'css'  : 'text/css',
	'gif'  : 'image/gif',
	'html' : 'text/html',
	'ico'  : 'image/x-icon',
	'jpeg' : 'image/jpeg',
	'jpg'  : 'image/jpeg',
	'js'   : 'text/javascript',
	'json' : 'application/json',
	'pdf'  : 'application/pdf',
	'png'  : 'image/png',
	'svg'  : 'image/svg+xml',
	'swf'  : 'application/x-shockwave-flash',
	'tiff' : 'image/tiff',
	'txt'  : 'text/plain',
	'wav'  : 'audio/x-wav',
	'wma'  : 'audio/x-ms-wma',
	'wmv'  : 'video/x-ms-wmv',
	'xml'  : 'text/xml',
	'woff' : 'application/x-woff',
	'woff2': 'application/x-woff2',
	'tff'  : 'application/x-font-truetype',
	'otf'  : 'application/x-font-opentype',
	'eot'  : 'application/vnd.ms-fontobject',
};

const Cfg = {
	// TIP 远程接口地址
	serverUrl       : '请从start方法，传入你的url参数',
	// TIP 本地端口
	localPort       : 12345,
	// TIP 静态文件地址
	staticPath      : express.static(path.join(
		__dirname,
		/* TIP 【projects/WebStorm】目录 	*/'../../..',
		/* TIP 项目名 										*/'APIAuto',
		/* TIP 子目录 										*/'',
	)),
	/**
	 * 是否需要【完全跨域】。
	 * 				1.即，将【*号】，替换为【具体地址】。
	 */
	needCompleteCors: true,
};

/**
 * 参考资料：
 * 				[javascript - How do I get the domain originating the request in express.js? - Stack Overflow](https://stackoverflow.com/a/18498769/6264260)
 */
function logParams(req: ExRequest) {
	console.log('req.url', req.url);
	console.log('host', req.get('host'));
	console.log('origin', req.get('origin'));
	console.log('remoteAddress', req.socket.remoteAddress);
}

function coreCorsHandle(req: ExRequest, res: ExResponse) {
	if (Cfg.needCompleteCors) {
		console.log('采用完全CORS');
		const _origin = req.get('origin');
		res.header(
			'Access-Control-Allow-Origin',
			(
				(!_origin || ['null', 'undefined'].includes(_origin))				// 如果不存在
					// ? 'http://www.baidu.com'
					? '*'
					: _origin
			),
		);
		res.header('Access-Control-Allow-Credentials', 'true');
	} else {
		res.header('Access-Control-Allow-Origin', '*');
	}
}

export class xX_ProxyServer_Helper {
	// TIP——————————————————————————————————————————公共方法——————————————————————————————————————————

	/**
	 * 开始代理
	 */
	public static start(
		serverUrl: string,										// 有外界传入
	) {
		Cfg.serverUrl = serverUrl;

		const app = express();
		app.use(Cfg.staticPath);																												// 配置静态文件服务中间件

		// 处理【options】预请求。
		app.options('*', (req, res) => {
			console.warn(`\n——————————————————————————————【预】——————————————————————————————\n`);
			this.__cors_options(req, res);								// 处理跨域
			res.send(200);
		});

		// 处理其它正式请求。
		app.use('/', (req, res) => {
			console.warn('\n——————————————————————————————【正式请求】——————————————————————————————\n');

			let url = Cfg.serverUrl + req.url;
			console.log('请求的URL：', req.url, '请求的Content-Type：', req.headers);

			this.__cors_otherReqs(req, res);							// 处理跨域

			/* 这里的修复，因为Cocos端，已经解决了一个BUG。所以这里的修复，注释掉了。

							// 此处，临时修复一下Firefox的Bug。
							if (req.headers['content-type'] == 'application/x-www-form-urlencoded, application/json') {
								req.headers['content-type'] = 'application/json'
								console.log('在此处，修改了请求头。')
							}
			*/

			// 通过管道返回
			req.pipe(request(url)).pipe(res);
		});

		// 监听本地端口
		app.listen(Cfg.localPort, function() {
			console.log(`server is running at port ${Cfg.localPort}`);
		});
	}

	/**
	 * 错误的方式
	 */
	public static __wrong_start() {
		const proxyMiddleWare = require('http-proxy-middleware');
		const cfg             = function() {
			const proxyPath = 'http://47.75.112.14:8080';//目标后端服务地址(公司同事电脑地址)
			return {
				proxyPath,
				proxyMidOption: { target: proxyPath, changeOrigin: true },
				staticPath    : express.static('./public'),
				port          : 3000,
			};
		}();
		//
		//
		//
		const app = express();
		app.use(cfg.staticPath);
		app.use('/', proxyMiddleWare(cfg.proxyMidOption));//这里要注意"/discern" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)
		app.listen(cfg.port);
	}

	// TIP——————————————————————————————————————————私有方法——————————————————————————————————————————
	private static __cors_options(req: ExRequest, res: ExResponse) {

		// 日志
		logParams(req);
		// 处理部分关键逻辑
		coreCorsHandle(req, res);

		res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,Content-Type,Date'); // 允许浏览器在返回结果中，读取，特定的自定义Header。  // 对浏览器的【Content-Type】也加以允许。
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); // 允许下列请求方法。
		res.header('X-Powered-By', ' 3.2.1');
		// res.header('Content-Type', 'application/json;charset=utf-8')
		res.header('Access-Control-Request-Headers', 'Authorization,Content-Type,Date'); // 允许浏览器，在请求报文中，添加特定的自定义Header。  // 对浏览器的【Content-Type】也加以允许。

		res.header('Access-Control-Expose-Headers', 'Date'); // 强行向浏览器，暴露以下不安全字段（注意，在W3C标准中：仅仅跨域时，才会有这样限制。唯一在非跨域，同域中，有限制的是：Set-Cookie、Set-Cookie2，这两个字段。其余的仅在跨域时，有限制。）

		console.log('Header结果', res.getHeaders());

	}

	/**
	 *
	 */
	private static __cors_otherReqs(req: ExRequest, res: ExResponse) {

		// 日志
		logParams(req);

		//   res.setHeader('Access-Control-Allow-Origin', '*')
		//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
		//   res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type')
		//   res.setHeader('Access-Control-Max-Age', '86400')

		// 处理部分关键逻辑
		coreCorsHandle(req, res);

		// 为了测试，返回Date，这个Header头时，的具体效果。
		// res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,Content-Type')
		// res.header('Access-Control-Request-Headers', 'Authorization,Content-Type')
		res.header('Access-Control-Expose-Headers', 'Date'); // 强行向浏览器，暴露以下不安全字段（注意，在W3C标准中：仅仅跨域时，才会有这样限制。唯一在非跨域，同域中，有限制的是：Set-Cookie、Set-Cookie2，这两个字段。其余的仅在跨域时，有限制。）

		console.log('Header结果', res.getHeaders());

	}

}
