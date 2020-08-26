// 此处，真正的指向是【declare module @types/node/http】
import {IncomingMessage} from 'http';
import {Context}         from '@nuxt/types';


// TS类型工具
import {Arg1} from 'tsargs';
import Koa    from 'koa';

type KoaType = InstanceType<typeof Koa>
type KoaUseType = KoaType['use']

// declare module 'http' {
//   export interface IncomingMessage {
//     // [key: string]: any;
//
//     instrument_id: string;
//     news: Array<any>;
//     token?: string;
//     locale?: string;
//   }
// }

declare global {
  // 为了给【/store/index.ts】的【nuxtServerInit】使用。
  type IncomingMessageType = IncomingMessage;

  // 抽取【app.use的ctx类型】
  type KoaAppUse_CtxType = Arg1<Arg1<KoaUseType>> ;

  type NuxtContextType = Context;
}
