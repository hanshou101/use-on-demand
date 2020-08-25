declare namespace DepthApiNS {
  export interface Recv {
    asks: Array<AskBid_Item>;
    bids: Array<AskBid_Item>;
  }

  export type AskBid_Item = [number, string, string, number];
}
