declare namespace CountDownNS {
  interface StepRes {
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
  }                                       //
  type StepCb = (res: StepRes, stopFn: Function) => void;
}

export class xX_SDateTime_Helper {
  /**
   * 根据指定时间的倒计时功能
   */
  public countDownForTime(
    __endTime: string,          // 结束时间
    step_callBack: CountDownNS.StepCb,                  // 倒计时每走一次的回调函数
    finish_Callback: Function,  // 倒计时结束回调函数
  ): void {
    const timeReg = /\d{13,}/;
    if (!timeReg.test(__endTime)) {
      console.error('endTime 必须是一个时间戳！');
      return;
    }
    if (!step_callBack || typeof step_callBack != 'function') {
      console.error('callBack 必须是一个函数！');
      return;
    }
    const endTime: number = Number(__endTime);
    const endDate         = new Date(endTime);
    let ms                = 0;
    const clear           = function () {
      clearInterval(timer);
    };
    const timer           = setInterval(() => {
      ms         = (endDate.getTime() - new Date().getTime());
      let result = {
        day    : '0',
        hours  : '0',
        minutes: '0',
        seconds: '0',
      };
      if (ms < 0) {
        clearInterval(timer);
        if (finish_Callback && typeof finish_Callback == 'function') {
          finish_Callback(result);      // 此时，都为零
        }
        return;
      }
      result = xX_SDateTime_Helper.getTimePartStr(ms);       // 这一条，可能是负数。
      step_callBack(result, clear);
    }, 1000);
  }

  public static getTimePartStr(
    ms: number,       // 毫秒
  ) {
    const s       = ms / 1000;
    const day     = Math.floor(s / 60 / 60 / 24);
    const hours   = Math.floor(s / 60 / 60 % 24);
    const minutes = Math.floor(s / 60 % 60);
    const seconds = Math.floor(s % 60);

    const result = {
      day    : this.completeTimePartZero(day),
      hours  : this.completeTimePartZero(hours),
      minutes: this.completeTimePartZero(minutes),
      seconds: this.completeTimePartZero(seconds),
    };
    console.log(result);
    return result;
  }

  /**
   * 将0-9的数字前面加上0
   *        1.举例："1"，变为"01"。
   */
  public static completeTimePartZero(timePart: string | number) {
    return parseInt(timePart) < 10 ?
      '0' + String(timePart)
      : String(timePart);
  }

}

export class xX_ServerTime_Helper {
  /**
   *  差异时间
   *          1.【服务器】-【客户端】。
   *          2.毫秒为单位。
   */
  public static diffTime = 0;

  /**
   *  保存【时间差值】
   */
  public static saveDiffTime(header: { Date: string }) {
    const HeaderDate = header.Date;
    const serverT    = new Date(HeaderDate).getTime();
    const clientT    = new Date().getTime();
    this.diffTime    = serverT - clientT;
  }

  /**
   *  获取【服务器真实】当下时间，时间戳。
   */
  public static getServer_NowTime_Ts() {
    return new Date().getTime() + this.diffTime;
  }

  /**
   *  获取【服务器真实】目标时间，时间戳。
   */
  public static getServer_TargetTime_Ts(
    targetTimeStr: string,         // 一般由服务器返回，形如【yyyy-MM-dd HH:mm:ss】
  ) {
    const fix_iOSBug_Str = targetTimeStr.replace(/-/g, '/');       // IOS的时间特质，有点奇怪。所以在这里，加上转化判断。
    return new Date(fix_iOSBug_Str).getTime() + this.diffTime;
  }

}
