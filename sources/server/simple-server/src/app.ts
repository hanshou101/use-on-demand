#!/usr/bin/env node

// TIP —————————————————————————系统依赖————————————————————————
import http  from 'http';
import https from 'https';

// TIP —————————————————————————个人————————————————————————
import { cfg }                from './config/config';
import { Listener_Helper }    from './base/listener';
import { ExpressBase_Helper } from './base/express-base';

const { expressBase } = new ExpressBase_Helper();


class App {
	public init() {
		const servers = {
			http : {
				server: http.createServer(expressBase),
				port  : cfg.port.http,
			},
			https: {
				server: https.createServer(this.getCert(), expressBase),
				port  : cfg.port.https,
			},
		};
		Object.entries(servers).forEach(([type, option]) => {
			this.bindListener(option.server, type, option.port);        // 绑定listener
		});
	}

	// TIP————————————————————————————————————————————————私有方法——————————————————————————————————————————————————————

	/**
	 * HTTPS安全凭证
	 */
	private getCert() {
		const credentials = { key: cfg.cert.privateKey, cert: cfg.cert.certificate };
		return credentials;
	}

	/**
	 * 绑定监听器
	 */
	private bindListener(
		server: http.Server | https.Server,
		protocal: string,
		port: number | string,
	) {
		server.listen(port, function() {
			console.log(`挂载端口 ${port} `, `调试路径 ${protocal}://127.0.0.1:${port}`);
		});
		// Error回调
		server.on('error', Listener_Helper.get_onError(port));
		// Listening回调
		server.on('listening', Listener_Helper.get_onListening(server));
	}

}


new App().init();
