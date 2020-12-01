import {Server as HttpServer} from 'http';

type P_Simple_SsrReq = Partial<Simple_SsrReq>
type P_Simple_SsrReq_Keys = keyof P_Simple_SsrReq;
type P_Simple_SsrReq__Type = {
  [K in P_Simple_SsrReq_Keys]: P_Simple_SsrReq[K];   // 增补，另一个interface的属性。
};

declare module 'http' {
  /**
   * 1.将【两个类型】，合并为【一个类型】。
   */
  export interface IncomingMessage extends P_Simple_SsrReq__Type {
  }
}
