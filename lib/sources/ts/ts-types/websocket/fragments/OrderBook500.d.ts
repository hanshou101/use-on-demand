declare namespace WsComm {
  namespace OrderBook500 {
    interface Recv {
      group: string;  // OrderBook500:xx
      action: number;
      data: IData;
    }
    
    interface IData {
      asks: number[][];
      bids: number[][];
    }
  }
}
