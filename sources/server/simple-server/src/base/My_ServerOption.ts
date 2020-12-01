import { Server as HttpServer }  from 'http';
import { Server as HttpsServer } from 'https';
import { mani }                  from '../config/new_manifest';

const debug = require('debug')('myapp:server');

export class My_ServerOption {

	public _http_server: HttpServer;
	public _https_server: HttpsServer;

	private constructor(http: HttpServer, https: HttpsServer) {
		this._http_server  = http;
		this._https_server = https;

		this.onListening = this.onListening.bind(this);
	}

	public static build(http: HttpServer, https: HttpsServer) {
		return new this(http, https);   // 返回一个构造函数。
	}

	/**
	 * TIP 处理回调：【错误error】
	 */
	public onError(error: MyHttps_Error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		// var bind = typeof port === 'string'
		//     ? 'Pipe ' + port
		//     : 'Port ' + port

		// FIXME 此处，可能会有一个小Bug。
		console.log('走了onError，此处可能有个小Bug');
		const bind = typeof mani._HTTP_PORT === 'string'
			? 'Pipe ' + mani._HTTP_PORT       // 按道理说，port应该是一个全局变量，或this.变量
			: 'Port ' + mani._HTTP_PORT;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				return process.exit(1);
			case 'EADDRINUSE': {
				console.error(bind + ' is already in use');
				return process.exit(1);
			}
			default: {
				throw error;
			}
		}
	}

	/**
	 * TIP 处理回调：【监听中listening】
	 */
	public onListening() {
		const addr = this._http_server.address();
		const bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr?.port;
		debug('Listening on ' + bind);
	}

}
