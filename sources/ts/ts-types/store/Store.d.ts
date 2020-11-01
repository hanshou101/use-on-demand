import {Mutation, MutationTree, Store} from 'vuex';
// import {StateType}                     from 'typed-vuex/lib/index';

declare global {
  type StoreType<T> = Store<T>;
  type MutationType<T> = Mutation<T>;
  type MutationTreeType<T> = MutationTree<T>;
  // type StateType_Type<S> = StateType<S>;

  // Accessor冗余垫片
  type VuexRedundancyPolyfill = any;

  // TIP——————————————————————————————业务逻辑——————————————————————————————

  // 杠杆
  interface LeverageOption {
    name: string;
    value: number;
  }

  // UI更新通知
  type UpdateUI_EventMap_Keys = keyof UpdateUI_EventMap;    //
  interface UpdateUI_EventMap_Item {
    ts?: number;                         // 时间戳
  }                                                         //
  interface UpdateUI_EventMap {
    // 计划委托，下单
    planEntrust_placeOrder?: UpdateUI_EventMap_Item;
    //
  }

  //
  type OrderBook_Type = {
    [key: string]: DepthApiNS.Recv | Array<any>
  };

}

