import {WsActE} from '~/assets/js/websocket/WsEnum';

declare global {
  namespace WsComm {
    // 心跳相关
    namespace HeartBeat {
      interface Send {
        action: WsActE.Ping;
      }

      interface Recv {
        group: 'System';
        data: 'pong';
      }
    }
  }
}
