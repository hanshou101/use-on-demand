import http  from 'http';
import https from 'https';

const debug = require('debug')('myapp:server');

export class Listener_Helper{

  /**
   * 回调：error错误
   */
  public static get_onError(port : string|number){
    return function(
      error : MyHttps_Error
    ){
      console.log('走了onError，此处可能有个小Bug');
      if(error.syscall !== 'listen'){
        throw error;
      }
      const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // 错误友好提示
      switch(error.code){
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          return process.exit(1);
        case 'EADDRINUSE':{
          console.error(bind + ' is already in use');
          return process.exit(1);
        }
        default:{
          throw error;
        }
      }
    };
  }

  /**
   * 回调：监听中listening
   */
  public static get_onListening(server : http.Server|https.Server){
    return function(
      //
    ){
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
      debug('Listening on ' + bind);
    };
  }

}
