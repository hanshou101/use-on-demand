export enum CkKeys {
  Authorization = 'Authorization',
  token         = 'token',
  expired_ts    = 'expired_ts',
  access_key    = 'access_key',
  lang          = 'lang',
}


export enum EntrustBaseType {
  LimitPrice  = 1,
  MarketPrice = 2,
  Plan        = 3,
}

export enum PlanStrategyValueType {
  __LimitPrice = 1,
  __MarketPrice = 2,
}

export enum __CAreaTypeE {
  /**
   * 1 USDT  2 币本位  4 模拟区
   */
  BgGoldBase = 1,
  CoinBase   = 2,
  Unknown    = 3,                     // FIXME 未知这里的 3 ，是什么意思？？？？？？？？？？？？？？？
  Simulation = 4,
}
