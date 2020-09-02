// import {WsActE} from '~/assets/js/websocket/WsEnum';
import Vue from 'vue';

declare global {
  /**
   *  WebSocket通讯，简写WsComm
   */
  namespace WsComm {
    // 客户端发送命令，相关
    namespace SimpleCmd {
      interface Send {
        // action: WsActE;
        // args: Array<SendArgType>;
      }

      interface Recv {
        action: string;
        success: boolean;
        group: string;
        request: SimpleCmd.Send;
        error: string;
      }
    }

    namespace Common {
      namespace Recv {
        // 普通数据包，类型
        interface SocketData {
          data: string;
          action: string;
          success: boolean;
          group: string;

          code: string;     // 如 10010
        }

        type SocketData_Or_SocketDataArray = SocketData | Array<SocketData>
      }
    }
  }
}
