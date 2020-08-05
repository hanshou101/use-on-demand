export class SDateTime_Helper {
  /**
   * 根据指定时间的倒计时功能
   // * @param startTime 开始时间
   * @param __endTime 结束时间
   * @param step_callBack 倒计时每走一次的回调函数
   * @param finish_Callback 倒计时结束回调函数
   */
  countDownForTime(__endTime: string, step_callBack: Function, finish_Callback: Function): void {
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
    let distance          = 0;
    const result          = {
      day    : '0',
      hours  : '0',
      minutes: '0',
      seconds: '0',
    };
    const clear           = function () {
      clearInterval(timer);
    };
    const timer           = setInterval(() => {
      distance = (endDate.getTime() - new Date().getTime()) / 1000;
      if (distance < 0) {
        clearInterval(timer);
        if (finish_Callback && typeof finish_Callback == 'function') {
          finish_Callback(result);
        }
        return;
      }
      const day      = Math.floor(distance / 60 / 60 / 24);
      const hours    = Math.floor(distance / 60 / 60 % 24);
      const minutes  = Math.floor(distance / 60 % 60);
      const seconds  = Math.floor(distance % 60);
      result.day     = day >= 10 ? day + '' : ('0' + day);
      result.hours   = hours >= 10 ? hours + '' : ('0' + hours);
      result.minutes = minutes >= 10 ? minutes + '' : ('0' + minutes);
      result.seconds = seconds >= 10 ? seconds + '' : ('0' + seconds);
      console.log(result);

      step_callBack(result, clear);
    }, 1000);
  }

}
