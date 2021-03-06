export enum xX_AWatKeys {
  refreshBgCoinToken = 'refreshBgCoinToken',
  cancelOrders       = 'cancelOrders',          // 取消当前订单
  submitOrder        = 'submitOrder',           // 提交立即执行委托
  submitPlanOrder    = 'submitPlanOrder',       // 提交计划委托
  BG_accountTransfer = 'BG_accountTransfer',          // BG-账户转账
  userPlanOrders     = 'userPlanOrders',        // 计划委托
  userPositions      = 'userPositions',         // 仓位列表，查询
  setGlobalLeverage  = 'setGlobalLeverage',     // 设置全局杠杆
  cancelPlanOrders   = 'cancelPlanOrders',      // 取消计划订单
  commonReg          = 'commonReg',             // 通用注册
  preGee             = 'preGee',                // 极验的前置请求
  sendSms            = 'sendSms',               // 短信验证码
}

declare global {
  type AWatKeys_Type = typeof xX_AWatKeys;
}
