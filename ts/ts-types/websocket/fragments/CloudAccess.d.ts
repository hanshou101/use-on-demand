import {WsActE} from '~/assets/js/websocket/WsEnum';

declare global {
  namespace WsComm {
    namespace CloudAccess {
      interface Send {
        action: WsActE.Access_Or_CloudAccess;
        args: [
          string,// 用户的Accesskey,必须是字符串
          string,// Dev(FC-Dev) 必须是字符串
          string,// Version(FC-Ver）必须是字符串
          string,// Sign(FC-Sign) 必须是字符串
          string,// Ts(FC-Ts) 单位:微秒,必须是字符串
          string,// 超时时间,只有是合约云接口认证需要
        ];
      }

      type Recv = unknown;
    }
  }
}
