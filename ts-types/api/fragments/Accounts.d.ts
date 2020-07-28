declare namespace AccountsApiNS {

  export interface Recv {
    accounts: IAccount[];
  }


  interface IAccount {
    'account_id': number;
    'company_id': number;
    'coin_code': string;
    'available_vol': string;
    'cash_vol': string;
    'freeze_vol': string;
    'margin_vol': string;
    'realised_vol': string;
    'earnings_vol': string;
    'bonus_vol': string;
    'created_at': string;
    'updated_at': string;
  }

}
