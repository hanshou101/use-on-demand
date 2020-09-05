type SuccessType = 1 | 0
type EnableType = boolean | undefined;

interface GeeOption {
  gt: string;
  challenge: string;
  offline: boolean;     // 表示用户后台检测【极验服务器】是否宕机
  new_captcha: true;    // 用于宕机时表示是否【新验证码版本】的宕机
  product?: 'bind' | 'float' | 'popup';   // 产品形式，包括：float，popup
  width?: '100%' | string;
  lang?: 'zh' | 'zh-tw' | 'en';
}

interface Window {
  initGeetest(
    option: GeeOption,
    cb: (captchaObj: GeeCtrl) => void,
  ): void;
}

interface GeePreInfo {
  enable: EnableType,
  gt: string,
  ip: string,
  success: SuccessType,
  //
  sign: string | undefined,
  challenge: string | undefined,
}

declare namespace SdkVerifyFingerResNS {
  type _RawData_SucType = {               // 内部情况一
    geetest_challenge: string;
    geetest_validate: string;
    geetest_seccode: string;
  } //
  // 原始数据
  type RawData = _RawData_SucType         // 情况一
    | {                                   // 情况二
    sign: string;
  } | {                                   // 情况三
    sign?: string;
  }

  // 转化后的头部
  type ParsedHeader = {     // 情况一
    'gt-challenge': string;
    'gt-validate': string;
    'gt-seccode': string;
  } | {                                   // 情况二
    'gt-sign': string;
  } | {                                   // 情况三
    'gt-sign'?: string;
  }
}

type RegistType = 'email' | 'mobile';


interface InnerCb {
  (): void;   // 无参
}                                 //
interface LogicCb {
  (geeCtrl: GeeCtrl): void;// 一个参数
}                                 //
interface __GeeCtrlCbs {
  onReady(cb: InnerCb): void;     //
  onSuccess(cb: InnerCb): void;   //
  onError(cb: InnerCb): void;     //
}

type ToListen_GeeCtrlCbs = {
  // [key in keyof __GeeCtrlCbs]: LogicCb;
  onReadySuc: LogicCb;
  onFingerSuc: LogicCb;
  onReadyFailure: LogicCb;
}

interface GeeCtrl extends __GeeCtrlCbs {
  verify(): void;                            // 按钮模式
  appendTo(domId: string): void;             // 指令模式
  reset(): void;                             // 重置
  //
  getValidate(): SdkVerifyFingerResNS.RawData;           // 获取用户进行成功验证(onSuccess)所得到的结果，该结果用于进行服务端 SDK 进行二次验证。
}
