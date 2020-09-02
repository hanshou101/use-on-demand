/**
 * 对外公开
 */
declare namespace BgCoinApi {
  interface Bean<T> {
    errcode: number;
    errmsg: string;
    data: T;
  }

  export type Accounts_Bean = Bean<CoinAccountsNS.Main>
  export type UserInfo_Bean = Bean<UserInfoNS.Main>
  export type OpenContractQuestion_Bean = Bean<OpenContractQuestionNS.Main>
  export type RefreshToken_Bean = Bean<RefreshTokenNS.Main>
  export type HotChatRoom_Bean = Bean<HotChatRoomNS.Main>
  export type ChatRoomToken_Bean = Bean<ChatRoomTokenNS.Main>
  export type EnterRoom_Bean = Bean<EnterRoomNS.Main>
  export type ChatRoom_SetMemberRole_Bean = Bean<any>;


  export type ContractLicense_Bean = Bean<ContractLicenseNS.Main>;


  namespace CoinAccountsNS {
    interface Main {
      amount: number;
      assertList: IAssertList[];
    }


    interface IAssertList {
      id: string;
      userId: string;
      coinId: string;
      balanceAmount: number;
      carryingAmount: number;
      freezeAmount: number;
      rechargeAmount: number;
      withdrawalsAmount: number;
      netValue: number;
      lockMargin: number;
      floatProfit: number;
      totalProfit: number;
      recAddr: string;
      version: number;
      coinType: string;
      coinName: string;
      coinImgUrl: string;
      feeRate: number;
      minFeeNum: number;
      withdrawFlag: number;
      rechargeFlag: number;
      transferFlag: number;
      totalCny: number;
      currentPrice: number;
      paradropAmount: number;
      miningAmount: number;
    }
  }

  namespace UserInfoNS {

    interface Main {
      id: string;
      type: number;
      username: string;
      countryCode: string;
      mobile: string;
      paypassSetting: number;
      email: string;
      authStatus: number;
      gaStatus: number;
      level: number;
      logins: number;
      status: number;
      inviteCode: string;
      inviteRelation: string;
      directInviteid: string;
      isDeductible: number;
      reviewsStatus: number;
      seniorAuthStatus: number;
      lastUpdateTime: string;
      created: string;
      registerType: number;
      isOld: number;
      otcStatus: number;
      enabled: boolean;
      accountNonExpired: boolean;
      accountNonLocked: boolean;
      credentialsNonExpired: boolean;
    }
  }

  namespace OpenContractQuestionNS {
    interface Main {
      title: string;
      list: Questions[];
    }


    interface Questions {
      content: string;
      list: Choice[];
    }

    interface Choice {
      option: string;
      content: string;
      flag: number;
    }

  }

  namespace RefreshTokenNS {
    interface Main {
      'access_token': string;
      expire: string;           // 当前token的寿命时间
      //
      'swap_token': string;
      'swap_app_id': string;
      'swap_api_key': string;
      'swap_expired': string;

      //
      //

      // updateTime: number;       // token出生（生成）的时间（WARN 这个值，并非接口返回的值，而是老代码，手动赋予的值）
    }

    // WARN 只取【Main】的两个字段
    interface ExpireInfo_SpecialMain {
      expire: string;           // 当前token的寿命时间
      updateTime: number;       // token出生（生成）的时间（WARN 这个值，并非接口返回的值，而是老代码，手动赋予的值）
    }
  }

  namespace HotChatRoomNS {
    interface Main {
      total: number;
      size: number;
      current: number;
      records: RoomRecords[];
      pages: number;
    }


    interface RoomRecords {
      id: string;
      roomId: string;
      name: string;
      announcement: string;
      isPwd: number;
      inputPassword: number;
    }
  }

  namespace ChatRoomTokenNS {
    interface Main {
      userId?: string;
      token: string;
      name?: string;
      account?: string;
    }
  }

  namespace EnterRoomNS {

    interface Main {
      id: string;
      userId: string;   // 创建人ID
      roomId: string;
      name: string;
      announcement: string;
      operator: string;         // 创建人的云信ID
      valid: string;                                                  // 聊天室，是否可用
      addr: string[];
      created: string;
      lastUpdateTime: string;
    }
  }

  namespace ContractLicenseNS {
    interface Main {
      id: string;
      type: string;
      title: string;
      content: string;
      status: number;
      created: string;
      lastUpdateTime: string;
    }
  }

}

/**
 * 不对外暴露
 */
// namespace BgCoinApiNS {
//
//
// }
