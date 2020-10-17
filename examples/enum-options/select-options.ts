export enum AuthStatusE {
	WaitAudit = 1,    // 待审核
	Pass      = 2,    // 已认证
	Reject    = 3,    // 未通过
}

export enum IdCardTypeE {
	ShenfFenZheng = 1,
	HuZhao        = 2,
}

const primaryAuthOption = {
	// 0: i18n.t('formatter.Primary_Auth_Option.0'),
	// 1: i18n.t('formatter.Primary_Auth_Option.1'),
	// 2: i18n.t('formatter.Primary_Auth_Option.2'),
	// /* 3: i18n.t('formatter.Primary_Auth_Option.3'),*/         // TIP 取消掉，这种状态的筛选和显示。
	// 4: i18n.t('formatter.Primary_Auth_Option.4'),
};

/**
 * 供所有的Component，所使用的枚举列表。
 * TIP 导出，selectOption
 *
 */
export const selectOption = {
	//
	// // default: {},    // TODO 修正：这里不能加上这句，不然类型检查就失去了意义。  TODO 默认项，用作  【TS接口】 使用。
	// default: {
	//   test: '测试专用', // TODO 这样写，才是正确的用法。
	// },
	//
	// // 类型  人民币、比特币系列、以太坊、以太坊代币
	// type              : {
	//   xnb     : i18n.t('selectOption.type.XNB'),
	//   default : i18n.t('selectOption.type.Default'),
	//   eth     : i18n.t('selectOption.type.ETH'),
	//   ethToken: i18n.t('selectOption.type.ETH_TOKEN'),
	// },
	// // 钱包类型  认购币、钱包币
	// category          : {
	//   // rgb: i18n.t('trade_config.rgb'),
	//   // qbb: i18n.t('trade_config.qbb'),
	//   rgb: '认购币',
	//   qbb: '钱包币',
	//
	// },
	// // TIP 开关状态：开启，关闭。
	// isOpen            : {
	//   0: i18n.t('selectOption.isOpen.0'),
	//   1: i18n.t('selectOption.isOpen.1'),
	// },
	// // TIP 状态    禁用、启用    0-禁用 1-启用
	// status            : {
	//   // '': '全部',
	//   0: i18n.t('form.Disable'),
	//   1: i18n.t('form.Enable'),
	// },
	// // 启用,禁用,停盘
	// marketStatus      : {
	//   0: i18n.t('form.Disable'),
	//   1: i18n.t('form.Enable'),
	//   2: i18n.t('form.Close'),
	// },
	// // 是否自动打币
	// isAuto            : {
	//   0: i18n.t('selectOption.isAuto.0'),
	//   1: i18n.t('selectOption.isAuto.1'),
	// },
	// // 充值状态  关闭、开启
	// rechargeFlag      : {
	//   0: i18n.t('selectOption.isOpen.0'),
	//   1: i18n.t('selectOption.isOpen.1'),
	// },
	// // 提币状态  关闭、开启
	// withdrawFlag      : {
	//   0: i18n.t('selectOption.isOpen.0'),
	//   1: i18n.t('selectOption.isOpen.1'),
	// },
	// // 钱包归集地址状态     归账、打款、手续费、充值
	// adminAddressStatus: {
	//   1: i18n.t('selectOption.wallet_collect_address_status.1'),
	//   2: i18n.t('selectOption.wallet_collect_address_status.2'),
	//   3: i18n.t('selectOption.wallet_collect_address_status.3'),
	//   4: i18n.t('selectOption.wallet_collect_address_status.4'),
	// },
	//

	//
	// // 资金账户列表状态
	// accountAssetsListStatus: {
	//   0: i18n.t('formatter.Account_Asset_Normal_OR_Freeze_Status.0'),
	//   1: i18n.t('formatter.Account_Asset_Normal_OR_Freeze_Status.1'),
	// },
	// // 币币交易列表状态 0未成交 1已成交 2已取消 3部分成交     新添加一个手动计算出的字段：999【部分成交】
	// tradeStatusOption      : {
	//   0: i18n.t('formatter.Entrust_Manager_List_Status.0'),
	//   1: i18n.t('formatter.Entrust_Manager_List_Status.1'),
	//   2: i18n.t('formatter.Entrust_Manager_List_Status.2'),
	//   // 999: i18n.t('table.Partial_Deal_Finished'),                // TIP 之前，本地手写的  【部分成交状态】。现在，移植为服务器给出的字段————>3。
	//   3: i18n.t('formatter.Entrust_Manager_List_Status.3'),     // 部分成交
	// },
	// // 证件类型
	// identityCardType       : {
	//   1: i18n.t('formatter.Identity_Card_Type.1'),
	//   2: i18n.t('formatter.Identity_Card_Type.2'),
	//   3: i18n.t('formatter.Identity_Card_Type.3'),
	//   4: i18n.t('formatter.Identity_Card_Type.4'),
	//   5: i18n.t('formatter.Identity_Card_Type.5'),
	// },
	//
	// // TIP 是否状态：是、或者否。      0-否  1-是
	// yesOrNo: {
	//   0: i18n.t('formatter.Yes_Or_No.0'),
	//   1: i18n.t('formatter.Yes_Or_No.1'),
	// },
	//
	// // TIP 初级认证的可选操作： 1:通过  2：拒绝
	// primary_AuthOperation_options: {
	//   2: i18n.t('formatter.authStatusOption.2'),
	//   // 4: '通过初级认证',    // （等待活体认证）
	//   1: '通过',        // 变成通过
	// },
	// // 钱包类型  认购币、钱包币
	// walletCategory               : {
	//   rgb: '认购币',
	//   qbb: '钱包币',
	// },
	//
	// // 手工充值状态
	// coinManualSupplyOption    : {
	//   0: i18n.t('formatter.Coin_Manual_Supply_Option.0'),
	//   1: i18n.t('formatter.Coin_Manual_Supply_Option.1'),
	//   2: i18n.t('formatter.Coin_Manual_Supply_Option.2'),
	// },
	// // 手工充值-变更类型
	// coinManualChangeTypeOption: {
	//   1: '充值',
	//   2: '扣减',
	// },
	// // 通知模板语言
	// notifyTemplateLang        : {
	//   zh_CN: i18n.t('formatter.Merchant_Notify_Template_Lang.zh_CN'),
	//   en_US: i18n.t('formatter.Merchant_Notify_Template_Lang.en_US'),
	// },
	// //  客服回复状态 1未处理 2已处理
	// processedOption           : {
	//   1: i18n.t('formatter.Customer_Service_Reply_Status.1'),
	//   2: i18n.t('formatter.Customer_Service_Reply_Status.2'),
	// },
	// //  男女
	// sexOption                 : {
	//   0: i18n.t('formatter.Gender_Sex_Option.0'),
	//   1: i18n.t('formatter.Gender_Sex_Option.1'),
	//   2: i18n.t('formatter.Gender_Sex_Option.2'),
	// },
	// // TIP 费率类型
	// feeTypeOption             : {
	//   1: i18n.t(`trade_config.coin_config.Fee_Type.${1}`),
	//   2: i18n.t(`trade_config.coin_config.Fee_Type.${2}`),
	// },
	// // TIP 币币交易列表交易方式类型 1-买入；2-卖出
	// tradeTypeOption           : {
	//   1: i18n.t('formatter.Entrust_Trade_Direction_Type.1'),
	//   2: i18n.t('formatter.Entrust_Trade_Direction_Type.2'),
	// },
	// // TIP C2C交易类型方式。         1-充值  ； 2-提币
	// c2cTrade_Type             : {
	//   1: i18n.t('formatter.c2cTrade_Type.1'),
	//   2: i18n.t('formatter.c2cTrade_Type.2'),
	// },
	// // TIP 虚拟币充值记录状态 0-待入账；1-充值失败；2-到账失败；3-到账成功；4-待确认；
	// coinRechargeStatusOption  : {
	//   // 0: i18n.t('formatter.Coin_Recharge_Record_Status.0'),
	//   // 1: i18n.t('formatter.Coin_Recharge_Record_Status.1'),
	//   // 2: i18n.t('formatter.Coin_Recharge_Record_Status.2'),
	//   // 3: i18n.t('formatter.Coin_Recharge_Record_Status.3'),
	//   // 4: i18n.t('formatter.Coin_Recharge_Record_Status.4'),
	//
	//   0: '待确认',
	//   1: '成功',
	//   2: '失败',
	//
	// },
	// // TIP 虚拟币提币（审核）管理列表 0-审核中；1-成功；2-拒绝；3-撤销；4-审核通过(打币中)；5-打币中；6-钱包异常，审核中(前端:打币中,后端:打币异常(请手工提币))；
	// coinWithdrawStatusOption  : {
	//   0: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.0'),
	//   1: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.1'),
	//   2: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.2'),
	//   3: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.3'),
	//   4: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.4'),
	//   5: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.5'),
	//   6: i18n.t('formatter.Coin_Withdraw_Current_Stage_Type.6'),
	// },
	//
	// // TIP 手机号码，或者邮箱，是否通过验证：是、否
	// bindMobileOrEmail_statusOption: {
	//   0: i18n.t('formatter.Yes_Or_No.0'),
	//   1: i18n.t('formatter.Yes_Or_No.1'),
	// },
	// // TIP Google认证开启状态：是、否
	// googleAuth_openStatusOption   : {
	//   0: i18n.t('formatter.Yes_Or_No.0'),
	//   1: i18n.t('formatter.Yes_Or_No.1'),
	// },
	// // TIP 是否设置交易密码：是、否
	// isSetOption                   : {
	//   0: i18n.t('formatter.Yes_Or_No.0'),
	//   1: i18n.t('formatter.Yes_Or_No.1'),
	// },
	// // TIP 注册类型：手机号注册、邮箱注册
	registerTypeOption: {
		// 1: i18n.t('formatter.registerTypeOption.1'),
		// 0: i18n.t('formatter.registerTypeOption.0'),
		0: '手机注册',
		1: '邮箱注册',
	},
	// // TIP 发布状态（文章、资讯，等等）
	// publishOption                 : {
	//   0: i18n.t('websiteOperation.articleManager.Not_Yet_Publish'),
	//   1: i18n.t('websiteOperation.articleManager.Already_Publish'),
	// },
	// // 资金流水列表收付类型1 入账 2 出账
	// accountFlowDirectionOption    : {
	//   1: i18n.t('formatter.Account_Finance_Flow_Direction.1'),
	//   2: i18n.t('formatter.Account_Finance_Flow_Direction.2'),
	// },
	// // TIP 审核操作：通过、拒绝
	// authStatusOption              : {
	//   1: i18n.t('formatter.authStatusOption.1'),
	//   2: i18n.t('formatter.authStatusOption.2'),
	// },
	// // TIP 手工设置提币状态，审核操作：通过、拒绝
	// manualWithdraw_StatusOption   : {
	//   1: i18n.t('formatter.authStatusOption.1'),
	//   2: i18n.t('formatter.authStatusOption.2'),
	// },
	//
	//
	// // TIP 扣币冻结类型：0-手工充值  1-扣币冻结  2-手工扣减
	// deductFreezeType_option: {
	//   0: i18n.t('formatter.deductFreezeType_option.0'),
	//   1: i18n.t('formatter.deductFreezeType_option.1'),
	//   2: i18n.t('formatter.deductFreezeType_option.2'),
	// },
	//
	// // TIP 0-未完成    1-已完成
	// kyc_Status: {
	//   0: i18n.t('formatter.kycStatus.0'),
	//   1: i18n.t('formatter.kycStatus.1'),
	// },
	// // TIP 性别选项。0-未知    1-男    2-女
	// sexStatus : {
	//   0: i18n.t('formatter.Gender_Sex_Option.0'),
	//   1: i18n.t('formatter.Gender_Sex_Option.1'),
	//   2: i18n.t('formatter.Gender_Sex_Option.2'),
	// },
	//
	// // TIP 虚拟币提币（审核）管理列表 0-审核中；1-成功；2-拒绝；3-撤销；4-审核通过(打币中)；5-打币中；6-钱包异常，审核中(前端:打币中,后端:打币异常(请手工提币))；
	// pendingAgentStatusOption: {
	//   0: i18n.t('formatter.Pending_Agent_Type.0'),
	//   1: i18n.t('formatter.Pending_Agent_Type.1'),
	//   2: i18n.t('formatter.Pending_Agent_Type.2'),
	//   3: i18n.t('formatter.Pending_Agent_Type.3'),
	// },
	//
	// pendingAgentReleaseStatusOption: {
	//   0: i18n.t('formatter.Agent_App_Release.0'),
	//   2: i18n.t('formatter.Agent_App_Release.2'),
	//   3: i18n.t('formatter.Agent_App_Release.3'),
	// },
	//
	// // TIP 手机平台类型。
	// mobilePlatform_option: {
	//   Android: 'Android',
	//   ios    : 'ios',
	// },
	//
	// // 已读、未读状态
	// readStatus_options: {
	//   0: '未读',
	//   1: '已读',
	// },
	//
	// // TIP 用户留言：用户已读未读    0-未读  1-已读
	// userFeedback_userReadStatus_options: {
	//   0: '未读',
	//   1: '已读',
	// },
	//
	// // TIP 用户留言：信息回复状态    0-未回复  1-已回复
	// userFeedback_replyStatus_options: {
	//   0: '未回复',
	//   1: '已回复',
	// },
	//
	// // TIP 用户留言：反馈类型(反馈tags)
	// userFeedback_feedbackTags_options: {
	//   1: '功能建议',
	//   2: '账号疑问',
	//   3: 'API 问题',
	//   4: '账号问题',
	//   5: '其他',
	// },
	//
	// // TIP 五种语言的编码，以及对应的文字。
	// multiLang_typeOption : {
	//   zh_CN: '简体中文',
	//   en_US: 'English',
	//   zh_TW: '繁體中文',
	//   ko_KR: '한국어',
	//   ja_JP: '日本語',
	// },
	// // TIP 五种语言的相关索引。
	// multiLang_indexOption: {
	//   zh_CN: 0,
	//   en_US: 1,
	//   zh_TW: 2,
	//   ko_KR: 3,
	//   ja_JP: 4,
	// },
	// // TIP 五种颜色的对应El-Alert颜色。
	// multiLang_colorOption: {
	//   zh_CN: 'success',
	//   en_US: 'warning',
	//   zh_TW: 'success',
	//   ko_KR: 'info',
	//   ja_JP: 'error',
	// },
	//
	// // 资金流水页：资产类型
	// flowAssetsType_options: {
	//   1: '可用资产',
	//   2: '冻结资产',
	//   3: '锁仓资产',
	//   4: '预约资产',
	//   5: '审核通过资产',
	// },
	//
	// // 资金流水页：业务类型
	// assetsFlow_BusinessType_options: {
	//   'sign_in'                       : '签到',
	//   'continuous_sign_in'            : '连续签到',
	//   //
	//   'recharge'                      : '充值',
	//   'withdraw'                      : '提币',
	//   'buy_hammers'                   : '兑换锤子',
	//   'buyFinancialManagement'        : '购买理财',
	//   'buyFinancial_management_income': '理财收益',
	//   'buyFinancial_management_expire': '理财到期赎回',
	//   'account_transfer'              : '矿场账户到应用钱包',
	//   'behavior_account_transfer'     : '行为账户到应用钱包',
	//   'sports'                        : '兑换娱乐挖矿任务',
	//   'hammer_destruction_return'     : '锤子销毁退还',
	//   'hammer_due_return'             : '锤子到期退还',
	//   'manual_recharge'               : '手工充值',
	//   'manual_deduct'                 : '手工扣减',
	//   'node_pos_allot'                : '节点POS分配',
	//   'contribution_allot'            : 'PC贡献值分配',
	//   'special_allot'                 : '特殊贡献奖励分配',
	//   'rush_red_package'              : '抢红包',
	//   'step_land_mine'                : '踩炸弹',
	//   'send_red_package'              : '发红包',
	//   'land_mine_back'                : '红包炸弹赔付',
	//   'red_package_back'              : '红包退回',
	//   'red_package_account_transfer'  : '红包账户到应用钱包',
	//   'account_transfer_red_package'  : '应用钱包到红包账户',
	//   'robot_rush_red_package'        : '机器人抢红包',
	//   'red_package_pool'              : '红包奖池',
	//   'chat_room_rush_red_package'    : '聊天室抢红包',
	//   'chat_room_send_red_package'    : '聊天室发红包',
	//   'chat_room_red_package_back'    : '聊天室红包退回',
	//   'pledge_release'                : '解除质押',
	//   'RECEIVABLES'                   : '支付收款',
	//   'PAYMENT'                       : '支付付款',
	//   'CASH_WITHDRAWAL'               : '支付提现',
	//   'pledge_recovery'               : '收回质押',
	//   'welfare_hammer_recovery'       : '收回福利锤',
	//   'hammer_subscribe'              : '认购福利锤',
	//   'hammer_by_subscribe'           : '福利锤被认购',
	//   'giving_welfare_hammer'         : '赠送福利锤',
	//   'pledge_for_friends'            : '替好友质押',
	//   'buy_merchant_proxy'            : '购买区域代理',
	//   'merchant_transfer'             : '商圈账户到应用钱包',
	//   'account_to_consumer'           : '应用钱包到G支付钱包',
	//   'consumer_to_account'           : 'G支付钱包到应用钱包',
	// },
	// // TIP 广告位置    禁用、启用    0-禁用 1-启用
	// position                       : {
	//   1: i18n.t('form.top'),
	//   2: i18n.t('form.middle'),
	//   3: i18n.t('form.bottom'),
	// },
	// // 站内信页: 发送平台类型
	// platform_options               : {
	//   1: '系统发送',
	//   2: '平台发送',
	// },
	// // 文章分类
	// noParentCategory               : {
	//   en_US: 'No Top',
	//   zh_CN: '无上级',
	//   zh_TW: '无上级',
	// },
	// // app版本管理
	// isForceUpdate                  : {
	//   0: '否',
	//   1: '是',
	// },
	// /* 哥伦布星球后台管理系统 start */
	// // 消费挖矿状态
	// miningBilStatus                : {
	//   0: '待审核',
	//   1: '审核通过',
	//   2: '审核拒绝',
	// },
	// // 道具类型
	// propType                       : {
	//   1: '小型',
	//   2: '中型',
	//   3: '大型',
	// },
	// // 挖矿资金流水业务类型
	// miningAssetsBusinessType       : {
	//   /*buy_hammers: '购买锤子',
	//   hammer_due_return: '锤子到期退还',
	//   hammer_destruction_return: '锤子销毁退还',
	//   mining_revenue: '疯狂挖矿',
	//   mining_union: '疯狂矿场工会算力奖励',
	//   mining_rebate_first: '第一区块挖矿返佣',
	//   mining_rebate_second: '第二区块挖矿返佣',
	//   mining_rebate_third: '第三区块挖矿返佣',
	//   executive_commission: '高管佣金',
	//   same_level_prize: '平级奖',
	//   shareholder_bonus_award: '分配奖励奖',
	//   completed_step_task: '娱乐挖矿',
	//   completed_step_task_union: '娱乐挖矿工会算力奖励',
	//   accept_task: '接任务',
	//   content_mining: '内容挖矿',
	//   consumption_mining: '消费挖矿',
	//   gm_to_gmpc: 'gm兑换gmpc',
	//   pc_to_gmpc: 'pc兑换gmpc',
	//   synthesis_gmpc: '合成gmpc',
	//   mining_transfer: '挖矿钱包划转',*/
	//   1 : '娱乐挖矿',
	//   2 : '内容挖矿',
	//   3 : '消费挖矿',
	//   4 : '疯狂矿场',
	//   5 : '娱乐挖矿工会奖励',
	//   6 : '疯狂矿场工会奖励',
	//   7 : '小区块奖励用户昵称查询',
	//   8 : '无限区块奖励',
	//   9 : '平级奖励',
	//   10: '球生态奖励',
	//   11: '一区块',
	//   12: '二区块',
	//   13: '三区块',
	//   14: '限区块用户查询',
	// },
	// // 分配奖励用户状态
	// ecoplanetStatus                : {
	//   0: '冻结',
	//   1: '正常',
	// },
	//
	// // 前台用户，所处认证状态      ————对应【authStatus】
	// appUser_authStepStatus    : {
	//   0: '未认证',
	//   1: '初级实名认证',
	//   2: '高级实名认证',
	//   3: '拒绝',
	//   4: '待审核',
	// },
	// // 后台管理系统，认证审核的阶段状态       ————对应【userAuthStatus】
	// admin_authAuditStep_status: {
	//   '-1': '资料未上传',
	//   '0' : '待审核',
	//   '1' : '审核通过',
	//   '2' : '审核拒绝',
	// },
	//
	// exchangeType          : {
	//   // 没拷贝过来？
	// },
	// billType              : {
	//   // 没拷贝过来？
	// },
	// assetsChangeFlowStatus: {
	//   // 没拷贝过来？
	// },
	// userType              : {
	//   // 没拷贝过来？
	// },
	//
	// nodeLevel_options: {
	//   1: '分布式节点',
	//   2: '超级节点',
	//   3: '全球节点',
	//   4: '星耀节点',
	// },
	//
	// // 分享图入口选项  1-娱乐分享  2-矿工分享
	// sharePictureEntry_options: {
	//   1: '娱乐分享',
	//   2: '矿工分享',
	// },
	//
	// // 交易密码，是否被锁定状态 0-正常 1-连续输错5次冻结
	// paymentPassword_LockStatus_Options: {
	//   0: '正常',
	//   1: '连续输错5次冻结',
	// },
	//
	// // 微信绑定状态
	// wechatBindStatus: {
	//   0: '未绑定',
	//   1: '已绑定',
	// },
	//
	// // 是否需要  卸载后重装
	// isDeleteUpdate: {
	//   0: '不需要卸载',
	//   1: '需要卸载后重装',
	// },
	//
	// // 转账路径： 1-内部转账（内部）  0-链上转账（外部）
	// coinTransformChannel_typeOptions: {
	//   1: '内部转账（内部）',
	//   0: '链上转账（外部）',
	// },
	//
	// // PC贡献快照状态
	// pcContribution_snapshotStatus_options: {
	//   0: '统计中',
	//   1: '已完成',
	//   2: '已分配奖励',
	// },
	//
	// // PC贡献分配奖励状态
	// pcContribution_bonusStatus_options: {
	//   0: '正在分配奖励',
	//   1: '已完成',
	// },
	//
	// // 是否热门聊天室
	// isChatRoom_Hot: {
	//   1: '热门',
	//   0: '非热门',
	// },
	//
	//
	// // 聊天室是否被封禁
	// isChatRoom_NotFrozen: {
	//   true : '正常',
	//   false: '封禁',
	// },
	//
	// // 聊天室，用户的身份类型
	// chatRoom_memberType_options: {
	//   '-2' : '受限用户，禁言',
	//   '-1' : '受限用户，黑名单',
	//   '0'  : '创建者',
	//   '1'  : '管理员',
	//   '2'  : '普通固定成员',
	//   '999': '退出聊天室',
	// },
	//
	// // 代为质押订单状态  1-待审核 2-待系统确认 3-已质押 4-已拒绝 5-解除质押 6-收回质押
	// proxyPledge_orderStatus: {
	//   1: '待用户端审核',
	//   2: '待系统确认',
	//   3: '已质押',
	//   4: '已拒绝',
	//   5: '解除质押',
	//   6: '收回质押',
	// },
	//
	// // 收付款商家：审核状态  0-待审核 1-通过 2-拒绝
	// receiveMerchant_auditStatus: {
	//   0: '待审核',
	//   1: '通过',
	//   2: '拒绝',
	// },
	//
	//
	// // 提现记录：  审核状态  0-审核中  1-已通过  2-拒绝
	// bianxian_Record_auditStatus: {
	//   0: '审核中',
	//   1: '已通过',
	//   2: '拒绝',
	// },
	//
	// // 提现方式：  0-普通提现  1-急速提现
	// bianxianType_options: {
	//   0: '普通提现',
	//   1: '急速提现',
	// },
	//
	// // 收付款时，支付方向  1-入账 2-出账
	// paymentAndReceive_directionOptions: {
	//   1: '入账（收款）',
	//   2: '出账（支付）',
	// },
	//
	// // 收付款支付状态： 0-未支付  1-支付中  2-已到账  3-未到账
	// paymentAndReceive_paymentStatus: {
	//   0: '未支付',
	//   1: '支付中',
	//   2: '已到账',
	//   3: '未到账',
	// },
	//
	// // 区域代理转让，审核状态： 0-审核中  1-申请通过
	// regionAgent_transfer_auditStatus: {
	//   0: '审核中',
	//   1: '通过',
	//   2: '拒绝',
	// },
	//
	// // 区域开放状态： 0-未开放  1-已开放
	// regionAgent_openStats: {
	//   0: '未开放',
	//   1: '已开放',
	// },
	//
	// // 挖矿日期类型： 1-行为挖矿  2-有效疯狂矿场  3-疯狂矿场
	// miningDate_miningTypes: {
	//   1: '行为挖矿',
	//   2: '有效疯狂矿场',
	//   3: '疯狂矿场',
	// },
	//
	// // 区域代理奖励金发放，奖励金类型：
	// /**
	//  * merchant_subsidy         运营要求改为  【代理扶持金】
	//  * merchant_platform_subsidy  生态回馈金
	//  * merchant_invite_subsidy  运营要求改为  【市场拓展金】
	//  */
	// // WARN 此处，因为【运营】的愚蠢需求，【市场拓展金】和【代理扶持金】  对应的字段，需要对调（对调？对调他妈？？？？代码改得稀巴烂）
	// // WARN 此处，因为【运营】的愚蠢需求，【市场拓展金】和【代理扶持金】  对应的字段，需要对调（对调？对调他妈？？？？代码改得稀巴烂）
	// // WARN 此处，因为【运营】的愚蠢需求，【市场拓展金】和【代理扶持金】  对应的字段，需要对调（对调？对调他妈？？？？代码改得稀巴烂）
	// regionAgent_rewardType: {
	//   merchant_subsidy         : '代理扶持金',
	//   merchant_invite_subsidy  : '市场拓展金',
	//   merchant_platform_subsidy: '生态回馈金',
	// },
	//
	// welfareHammer_orderStatus: {
	//   3: '可回收/可认购',
	//   6: '已回收',
	//   7: '已认购',
	// },
	//
	//
	// developerFeeType: {
	//   1: '固定值',
	//   2: '比例',
	// },
	//
	// merchantZeroLevelType_Options: {
	//   1: '线下实体',
	//   2: '微商',
	// },
	//
	// // 商家：信息修改，审核状态  0-待审核 1-通过 2-拒绝
	// merchantInfoChange_auditStatus: {
	//   0: '待审核',
	//   1: '通过',
	//   2: '拒绝',
	// },
	//
	// // 商家：活动，审核状态  0-待审核 1-通过 2-拒绝
	// merchantActivity_auditStatus: {
	//   0: '待审核',
	//   1: '通过',
	//   2: '拒绝',
	// },
	//
	// receiveAndPayment_UserType_Options: {
	//   0: '普通用户',
	//   1: '线下实体',
	//   2: '线上微商',
	// },
	//
	// userAccountType_Options: {
	//   1: '普通账户',
	//   2: '员工账户',
	// },
	//
	// // 应用流水，的，业务类型
	// applicationFlow_businessType_Options: {
	//   //type 1
	//   'consumption_mining_reward': '消费挖矿奖励',
	//   'merchant_transfer'        : '商圈账户到应用钱包',
	//   'merchant_subsidy'         : '代理扶持金',
	//   'merchant_dividend'        : '代理分润',
	//   'merchant_platform_subsidy': '生态回馈金',
	//   'merchant_invite_subsidy'  : '市场拓展金',
	//   //type 2
	//   'merchant_cashout'         : '商户提现',
	//   'merchant_cashout_fail'    : '商户提现审核失败',
	//   //type 3
	//   'consumer_to_account'      : 'G支付钱包到应用钱包',
	//   'account_to_consumer'      : '应用钱包到G支付钱包',
	//   'recharge'                 : '充值',
	//   'withdraw'                 : '提币',
	//   //type 2 3
	//   'merchant_in'              : '商户收款',
	// },

	/* 哥伦布星球后台管理系统 end */


	/* FGEX后台管理系统 */

	default: {          // 写法展示
		test: '测试专用',
	},

	// TIP 开关状态：开启，关闭。
	isOpen                            : {
		// 0: i18n.t('selectOption.isOpen.0'),
		// 1: i18n.t('selectOption.isOpen.1'),
	},
	// TIP 状态    禁用、启用    0-禁用 1-启用
	status                            : {
		// '': '全部',
		// 0: i18n.t('form.Disable'),
		// 1: i18n.t('form.Enable'),
		// TIP 新开一组
		0: '禁用',
		1: '启用',
	},
	// TIP 是否设置交易密码：是、否
	isSetOption                       : {
		// 0: i18n.t('formatter.Yes_Or_No.0'),
		// 1: i18n.t('formatter.Yes_Or_No.1'),
	},
	// TIP 缺失
	userType                          : {},
	wechatBindStatus                  : {},
	paymentPassword_LockStatus_Options: {},
	appUser_authStepStatus            : {},

	commonStatus_enableDisable_options: {
		0: '禁用',
		1: '启用',
	},

	// TIP 快照类型 1-币包 2-疯狂小金锤
	snapshotType: {
		// 0: '全部类型',
		1: '币包',
		2: '疯狂小金锤',
		3: '新挖矿活动',
	},

	// TIP 疯狂小金锤的Status状态。
	hammerActivity_status: {
		//  0为未开始 1为进行中 2为活动结束 3为取消
		0: '未开始',
		1: '进行中',
		2: '活动结束',
		3: '取消',
	},

	// TIP 快照，目前的状态值。
	snapshot_status: {
		1: '进行中',
		2: '已完成',
		3: '已分红',
	},

	// TIP 备注类型。
	remarkTypes: {
		bonus_amount                  : '分红',
		recharge                      : '充值',
		system_income                 : '矿池清退',
		alipay_recharge               : '支付宝充值',
		alipay_withdraw               : '支付宝提现',
		buy_copper_hammer             : '兑换铜锤',
		buy_gold_hammer               : '兑换金锤',
		buy_silver_hammer             : '兑换银锤',
		invite_reward                 : '邀请奖励',
		register_reward               : '注册奖励',
		share_reward                  : '分享奖励',
		mine_acitvity_bonus           : '矿池分红收益',
		mine_acitvity_handsel         : '矿池彩金收益',
		mine_acitvity_mining          : '矿池挖矿收益',
		one_conversion_hammer_reward  : '一级兑换锤子分佣',
		two_conversion_hammer_reward  : '二级兑换锤子分佣',
		three_conversion_hammer_reward: '三级兑换锤子分佣',
		share_rate_one_commission     : '资讯分享一级分佣',
		share_rate_three_commission   : '资讯分享三级分佣',
		share_rate_two_commission     : '资讯分享二级分佣',
		withdraw                      : '提现',
		withdraw_fee                  : '提现手续费',
		trade_deal                    : '币币交易撮合成交',
		trade_create                  : '币币交易',
		un_lock_amount                : '锁仓释放',
		virual_init                   : '虚拟币初始化',
		welfare_throw                 : '福利空投',
		transfer                      : '转账',
		transfer_paradrop             : '锁期币转账',
		data_migration_amount         : '数据迁移',

		//  以下，为新增
		subsidy_bonus: '算力补贴',
		game_pay     : '游戏支付',
		game_withdraw: '游戏提现',

		otc_transfer: 'OTC划转',
	},

	// TIP 分红的状态。 1-分红中  2-分红完成
	shareBonusStatus: {
		1: '分红中',
		2: '分红完成',
	},

	// TIP 锤子的种类。 1-铜锤  2-银锤  3-金锤
	hammerType: {
		1: '铜锤子',
		2: '银锤子',
		3: '金锤子',
	},

	// TIP 用户的类型： 1-普通用户
	userTypeOptions: {
		// 1: '普通用户',
		// // 2: '超级用户（2）',
		// 3: '全球节点',
		// 4: '超级节点',
		// 5: '超级社区',
		// 6: '超级用户',

		//
		//
		//

		0: '管理员',
		1: '普通用户',

	},

	// TIP 资金收付类型：  0-全部  1-入账  2-出账  3-入账（不含解冻）  4-出账（不含冻结）
	moneyDirectionOptions: {
		0: '全部',
		1: '入账',
		2: '出账',
		3: '入账（不含解冻）',
		4: '出账（不含冻结）',
	},

	// TIP 第三方充币管理，状态类型：  0-等待审核  1-审核拒绝  2-充币成功
	thirdPartner_coinRecharge_statusOption: {
		0: '等待审核',
		1: '充币成功',
		2: '审核拒绝',
	},

	// TIP 第三方提币管理，状态类型：  0-待支付  1-支付失败  2-支付成功
	thirdPartner_coinWithdraw_statusOption: {
		0: '待支付',
		1: '支付失败',
		2: '支付成功',
	},

	// TIP 创建小金锤活动时，挖矿额度方式： 1-定额方式  2-成交量方式
	miningQuota_amountTypes: {
		1: '定额方式',
		2: '成交量方式',
	},

	// TIP 用户买单卖单记录  的状态：  0-未成交  1-已成交  2-已取消  4-异常单
	user_entrustOrder_status: {
		0: '未成交',
		1: '已成交',
		2: '已取消',
		4: '异常单',
	},

	// TIP 交易市场类型  1-币币交易市场  2-创新交易市场
	marketType_options: {
		1: '币币交易市场',
		2: '创新交易市场',
	},

	// TIP 价格类型  1-市价  2-限价
	marketPriceType_options: {
		1: '市价',
		2: '限价',
	},

	// TIP 币币交易，交易方式  1-买入  2-卖出
	marketTradeType_options: {
		1: '买入',
		2: '卖出',
	},

	// TIP OTC用户列表，状态
	otcUserList_otcStatusOptions: {
		1: '启用',
		// 2: '禁用',
		0: '禁用',
	},

	// TIP OTC商家，广告状态
	otcMerchant_adStatus: {
		0: '禁用',
		1: '启用',
	},

	// TIP OTC用户，违规行为
	otcUser_violationOptions: {
		1: '不良交易过多',
		2: '发布不良信息',
		3: '恶意申诉',
		4: '其它',
	},

	// TIP OTC用户，封号类型
	otcUser_blockType_options: {
		1: '永久',
		2: '临时',
	},

	// // TIP OTC商家审核，审核状态
	// otcMerchant_auditStatus_options: {
	//   1: '通过',
	//   2: '拒绝',
	// },

	// TIP OTC委托类型  1-买  2-卖
	otcTrade_entrustType_options: {
		1: '买',
		2: '卖',
	},

	// TIP OTC市场状态，   0-禁用    1-启用
	otcMarket_statusOptions: {
		// 1: '正常',
		// 2: '冻结',
		0: '禁用',
		1: '启用',
	},

	// TIP OTC数字货币状态， 0-禁用  1-正常
	otcDigitalCoin_statusOptions: {
		0: '禁用',
		1: '正常',
	},

	// TIP OTC法币状态， 0-禁用  1-启用
	otcCurrency_statusOptions: {
		0: '禁用',
		1: '启用',
	},

	// TIP OTC商户审核状态：  0-审核中   1-通过   2-拒绝
	otcMerchant_auditStatus_options: {
		0: '审核中',
		1: '通过',
		2: '拒绝',
	},

	// TIP OTC广告单，状态
	otcAdOrder_statusOptions: {
		// 0: '未成交',
		// 1: '已成交',
		// 2: '已取消',
		0: '上架',
		1: '下架',
		2: '未确定状态',
	},

	// TIP OTC收付款方式  1-银行卡  2-支付宝  3-微信 4-PayPal
	otcPayType_options: {
		1: '银行卡',
		2: '支付宝',
		3: '微信',
		4: 'PayPal',
	},

	// TIP OTC订单状态  0-匹配   1-已支付   2-已放币   3-商家取消   4-用户取消  5-交易成功   6-用户申诉  7-商户申诉   -1-失败
	otcOrder_statusOptions: {
		'0' : '匹配',
		'1' : '已支付',
		'2' : '已放币',
		'3' : '商家取消',
		'4' : '用户取消',
		'5' : '交易成功',
		'6' : '用户申诉',
		'7' : '商户申诉',
		'8' : '订单超时，自动取消',
		'9' : '管理员审核完结订单',
		'-1': '失败',
	},

	// TIP OTC申诉订单状态    6-用户申诉  7-商户申诉
	otcAppealOrder_statusOptions: {
		6: '用户申诉',
		7: '商户申诉',
	},

	// TIP OTC申诉原因
	otcAppeal_reasonType_options: {
		1: '商户原因',
		2: '用户原因',
	},

	// TIP OTC  用户申诉理由
	otcAppeal_userAppealType: {
		1: '未放行',
		2: '未付款',
		0: '其它',
	},

	// TIP OTC 申诉中的用户所属类型（申诉方）  1-买方 2-卖方
	otcAppeal_userBelongType: {
		1: '买方',
		2: '卖方',
	},

	// TIP 资金流水  资产类型   1-可用  2-冻结
	assetsFlow_assetType_options: {
		1: '可用',
		2: '冻结',
	},

	// TIP 商家解除身份，审核状态    0-未处理  1-已处理
	merchant_quitMerchant_statusOptions: {
		0: '未处理',
		1: '已处理',
		2: '驳回',
	},

	// TIP 用户状态  1-启用 0-禁用
	userStatus_Options: {
		1: '启用',
		0: '禁用',
	},

	// TIP 广告类型
	adType_Options: {
		1: '首页',
		2: '快讯',
		3: '资讯',
	},

	// TIP 是，或否
	yes_or_no: {
		1: '是',
		0: '否',
	},

	// TIP 安卓平台、iOS平台
	appPlatform_options: {
		ios    : 'ios',
		android: 'android',
	},

	// TIP 资讯发往的平台：1-APP端；2-PC端
	newspaper_platformOptions: {
		1: 'APP端资讯',
		2: 'PC端资讯',
	},

	// TIP 文章元分类层级
	metaArticleTypeLevel: {
		0: '元层级：分类',
		1: '元层级：子类型',
	},

	// TIP 文章分类，状态
	articleTypeStatus: {
		0: '禁用',
		1: '启用',
		2: '删除',
	},

	// TIP 文章状态的枚举：  1-启用 0-禁用
	articleStatus_Options: {
		0: '禁用',
		1: '启用',
	},

	// TIP 文章分类的所属平台：1-PC端；2-APP端
	articleType_platformOptions: {
		'1,2': '全部',
		'1'  : 'PC端',
		'2'  : 'APP端',
	},

	// 聊天室是否被封禁
	isChatRoom_NotFrozen: {
		true : '正常',
		false: '封禁',
	},

	// 是否热门聊天室
	isChatRoom_Hot             : {
		1: '热门',
		0: '非热门',
	},
	// 聊天室，用户的身份类型
	chatRoom_memberType_options: {
		'-2' : '受限用户，禁言',
		'-1' : '受限用户，黑名单',
		'0'  : '创建者',
		'1'  : '管理员',
		'2'  : '普通固定成员',
		'999': '退出聊天室',
	},

	// newspaper类型
	newspaperCategory_options: {
		'-1': '全部类型',
		'0' : '资讯',
		'1' : '快讯',
	},
	// // newspaper奖励币种
	// newspaperRewardCoin_options: {
	//   bgzx: 'BGZX',
	//   eth : 'ETH',
	//   bggm: 'BGGM',
	// },

	statusFilter_options: {
		0: '禁用',
		1: '启用',
		2: '错误状态',
	},

	resourceType_options: {
		WEB_BANNER: 'Web_Banner图',
		// 'LINK_BANNER': '小banner',
		APP_BANNER: 'APP_Banner图',
	},

	serviceHandleStatus: {
		1: '未处理',
		2: '已处理',
	},

	stationLetter_unreadStatus: {
		1: '未读',
		0: '已读',
	},

	/*
					// 实名认证状态 authStatus: 0 未认证 1初级 2高级
					authStatus_options: {
						/!* // 2020-05-09 注释，新的已经修改
						0: '未认证',
						1: '初级',
						2: '高级',
						3: '高级-银行卡',*!/
						0: '未认证',
						1: '初级实名认证',
						// 2: '高级实名认证', 没有2的状态了
						3: '高级实名认证', // 绑定银行卡
					},
	*/

	/*
					primaryAuth_auditStatus: {
						0: '待审核',
						1: '审核通过',
						2: '审核拒绝',
					},
	*/

	AuthStatusE,
	new_authStatus_options: {
		[AuthStatusE.WaitAudit]: '待审核',
		[AuthStatusE.Pass]     : '已认证',
		[AuthStatusE.Reject]   : '未通过',
	},

	IdCardTypeE,
	new_IdCardType_options: {
		[IdCardTypeE.ShenfFenZheng]: '身份证',
		[IdCardTypeE.HuZhao]       : '护照',
	},

	loginLog_netOptions           : {
		0: '4g',
		1: 'wifi',
	},
	loginLog_mobilePlatformOptions: {
		1: '安卓',
		2: 'ios',
	},

	profitDetailType_options: {
		0: '划转记录',
		1: '经济商分润',
		2: '交易大神分润',
	},

	contractBroker_rewardStatus: {
		0: '未发放',
		1: '发放中',
		2: '发放完成',
	},

	// 法币充值审核 状态 0-待审核；1-审核通过；2-拒绝；3-充值成功；
	cnyRechargeAuditStatus_options: {
		0: '待审核',
		1: '审核通过',
		2: '拒绝',
		3: '充值成功',
	},

	// 法币充值审核 充值来源类型 alipay，支付宝；cai1pay，财易付；bank，银联；
	cnyRechargeSourceType_options: {
		linepay: '在线充值',
		alipay : '支付宝',
		cai1pay: '财易付',
		bank   : '银联',
	},


	// 法币提现审核 状态 0-待审核；1-审核通过；2-拒绝；3-提现成功；
	cnyWithdrawAuditStatus_options: {
		0: '待审核',
		1: '审核通过',
		2: '拒绝',
		3: '提现成功',
	},

	// 虚拟币提现管理列表0-审核中；1-审核通过；2-拒绝；3-提币成功；4：撤销；5-打币中；
	coinWithdrawAuditStatus_options: {
		0: '审核中',
		1: '转出成功',
		2: '审核拒绝',
		3: '撤销',
		4: '审核通过',
		5: '打币中',
		// 6: '钱包异常，审核中',
		6: '提币失败',
	},

	// 提币的打款方式
	coinWithdrawSourceType_options: {
		0: '站内',
		1: '站外自动',
		2: '站外手动',
	},

	commonFenyong_status: {
		1: '统计结束',
		2: '分佣比率设置完毕',
		3: '分佣完毕',
	},


	commonFenyong_type_options: {
		1: '挖矿交易',
		2: '其它',
	},


	bgAlipay_withdrawAudit_status: {
		'-1': '全部状态',
		'1' : '等待审核',
		'2' : '审核通过',
		'3' : '审核失败',
	},

	// 资金账户列表状态
	accountAssets_statusOptions: {
		1: '正常',
		2: '冻结',
	},

	coinRecharge_statusOptions: {
		0: '待确认',
		1: '成功',
		2: '失败',
	},


	// 虚拟币提现管理列表0-审核中；1-审核通过；2-拒绝；3-提币成功；4：撤销；5-打币中；
	coinWithdraw_statusOptions: {
		0: '审核中',
		1: '转出成功',
		2: '审核拒绝',
		3: '撤销',
		4: '审核通过',
		5: '打币中',
		// 6: '钱包异常，审核中',
		6: '提币失败',
	},


	assetsTransfer_statusOptions: {
		1: '成功',
		2: '失败',
	},

	assetsTransfer_businessType_options: {
		transfer         : '转账',
		transfer_paradrop: '锁期转账',
	},
	alipayRechargeWithdrawType_options : {
		1: '买入',
		2: '卖出',
	},

	alipayExchangeStatus_options: {
		0: '等待',
		1: '成功',
		2: '失败',
	},


	// 银行卡充值状态filter
	bankcardRechargeStatus_options: {
		0: '待审核',
		1: '审核通过',
		2: '拒绝',
		3: '充值成功',
	},


	// 银行卡提现状态filter
	bankcardWithdrawStatus_options: {
		0: '待审核',
		1: '审核通过',
		2: '拒绝',
		3: '提现成功',
	},

	// 钱包类型
	wallet_type: {
		rgb: '认购币',
		qbb: '钱包币',
	},


	// 后台起的值比较蠢。
	thirdPartner_stupidStatus: {
		1: '禁用',
		2: '启用',
	},


	communityComment_auditStatus: {
		0: '待审核',
		1: '审核通过',
		2: '审核拒绝',
	},
	communityDongtai_auditStatus: {
		0: '待审核',
		1: '审核通过',
		2: '审核拒绝',
	},


	// TIP 邀请好友审核：  0-审核中   1-通过   2-拒绝
	inviteUser_auditStatus_options: {
		0: '审核中',
		1: '通过',
		2: '拒绝',
	},


	newspaperArticleType: {
		1: '快讯',
		0: '资讯',
	},

	// 一周的星期日期数。
	tradeWeekData: [
		// i18n.t('selectOption.week_days.Monday'),
		// i18n.t('selectOption.week_days.Tuesday'),
		// i18n.t('selectOption.week_days.Wednesday'),
		// i18n.t('selectOption.week_days.Thursday'),
		// i18n.t('selectOption.week_days.Friday'),
		// i18n.t('selectOption.week_days.Saturday'),
		// i18n.t('selectOption.week_days.Sunday'),
	],

	mergeDepthData: ['1', '0.1', '0.01', '0.001', '0.0001', '0.00001', '0.000001', '0.0000001', '0.00000001', '0.000000001'],


	otcUserAssets_FlowDirection_options: {
		1: '入账',
		2: '出账',
	},

	// 社区贡献快照状态
	communityContribution_snapshotStatus_options: {
		0: '统计中',
		1: '已完成',
		2: '已分配奖励',
	},

};

export enum WithdrawTypeEnum {
	Alipay = 1,
	Wechat = 2,
	Bank   = 3,
}

export enum Merchant_Base_TypeE {
	OffLine = 1,
	Online  = 2,
}


export function createMergeDepthData(scale = 0, mergeDepthData: Array<string>) {
	const result = [];
	const all    = parseInt(scale + '') + 1;
	for (let i = 0; i < all; i++) {
		result[i] = mergeDepthData[i];
	}
	return result;
}

export type MySelectOption_AllConfig = typeof selectOption;
// TODO 我可真他娘的是个天才  ！
export type MySelectOption_Single = MySelectOption_AllConfig[keyof MySelectOption_AllConfig];


export type MySelectOption_Single_old = {
	[i in keyof (MySelectOption_AllConfig)]: MySelectOption_AllConfig[i];
	// a: keyof (MySelectOption_AllConfig);
};
