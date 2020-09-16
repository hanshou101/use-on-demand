import {xX_DebugU, xX_LogE} from '../../debug-util/debug-util';
import {xX_CkKeys}          from './CEnum';
import {xX_CookieHelper} from '../CookieHelper';


const isClient = process.client;

xX_DebugU.l(xX_LogE.cookieUtil, 'xX_LoopCheckUtil', '文件进入');
xX_DebugU.l(xX_LogE.cookieUtil, 'xX_LoopCheckUtil', '文件进入');
xX_DebugU.l(xX_LogE.cookieUtil, 'xX_LoopCheckUtil', '文件进入');
xX_DebugU.l(xX_LogE.cookieUtil, 'xX_LoopCheckUtil', '文件进入');
xX_DebugU.l(xX_LogE.cookieUtil, 'xX_LoopCheckUtil', '文件进入');

enum TimerModeEnum {
  TimeOut  = 'TimeOut',
  Interval = 'Interval',
}

export class xX_LoopCheckUtil {
  private static preCookie                   = '';
  private static timer: NullableType<number> = null;   // 定时器

  private static updatedFirstT = false;                      // 是否，已更新Cookie完成，（已初始化）

  private static readonly dQuick = 1;
  private static readonly dSlow  = 2 * 1000;

  private static readonly timerMode: TimerModeEnum = TimerModeEnum.Interval;

  private static loopCheck(duration: number) {
    function fn(__d: number) {                                      // 检测一次。
      xX_DebugU.l(xX_LogE.cookieUtil, 'cookieUnit循环', '1', '循环间隔时间', __d, '当前模式', `【${xX_LoopCheckUtil.timerMode}】`);
      const newCookie = document.cookie;
      xX_DebugU.l(xX_LogE.cookieUtil, '老cookie', xX_LoopCheckUtil.preCookie, '新cookie', newCookie);
      if (xX_LoopCheckUtil.preCookie !== newCookie) {                          // 开始更新
        xX_DebugU.l(xX_LogE.cookieUtil, 'Cookie已发生变化');

        const accessor = (window.$nuxt as any).$accessor;
        if (window.$nuxt && accessor) {
          xX_DebugU.l(xX_LogE.cookieUtil, 'cookieUnit循环', '2', '发生变化', '开始调用mutations', '循环间隔时间', duration);

          /**
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           */
          xX_DebugU.l(xX_LogE.cookieUtil, 'preCookie', xX_LoopCheckUtil.preCookie);
          xX_DebugU.l(xX_LogE.cookieUtil, 'newCookie', newCookie);
          accessor.cookieUnit.mutation_bgCoin_Authorization(xX_CookieHelper.getCookie(xX_CkKeys.Authorization));
          accessor.cookieUnit.mutation_swap_token(xX_CookieHelper.getCookie(xX_CkKeys.token));
          accessor.cookieUnit.mutation_swap_expired_ts(xX_CookieHelper.getCookie(xX_CkKeys.expired_ts));
          accessor.cookieUnit.mutation_swap_access_key(xX_CookieHelper.getCookie(xX_CkKeys.access_key));
          accessor.cookieUnit.mutation_swap_lang(xX_CookieHelper.getCookie(xX_CkKeys.lang));

          xX_LoopCheckUtil.preCookie = newCookie;

          xX_LoopCheckUtil.updatedFirstT = true;    // 标记，已经经过了【第1次初始化】
        } else {
          // xX_DebugU.l(xX_LogE.cookieUtil, 'window.$nuxt.$accessor未初始化', window.$nuxt, window.$nuxt?.$accessor);
          xX_DebugU.l(xX_LogE.cookieUtil, 'window.$nuxt.$accessor未初始化', window.$nuxt, accessor);
        }
      }
    }

    /**
     * 此处，使用【TimeOut】比【Interval】，要好很多。
     */
    fn(duration);       // TIP 执行第一次。

    switch (this.timerMode) {
      case TimerModeEnum.TimeOut:
        window.clearTimeout(xX_LoopCheckUtil.timer);
        xX_LoopCheckUtil.timer = null;
        xX_LoopCheckUtil.timer = window.setTimeout(() => {
          if (!xX_LoopCheckUtil.updatedFirstT) {    // 第一次更新，仍未完成
            xX_LoopCheckUtil.loopCheck(xX_LoopCheckUtil.dQuick);
          } else {                              // 已经完成了，第一次更新（之后速度可以放缓）
            xX_LoopCheckUtil.loopCheck(xX_LoopCheckUtil.dSlow);
          }
        }, duration);                  // 每过100ms，检测cookie变动
        break;
      case TimerModeEnum.Interval:
        // TIP 初始值————快速模式
        let intervalModeD      = xX_LoopCheckUtil.dQuick;
        // 先执行【高频率检查】
        xX_LoopCheckUtil.timer = window.setInterval(() => {      // 延迟若干毫秒后，执行
          fn(intervalModeD);
          /**
           * WARN 几种解决方式：
           *        1.先进行检查。因为任务已执行过一次。
           *        2.先执行一次，再判断【下一次定时任务】的【执行类型】。
           */
          if (!xX_LoopCheckUtil.updatedFirstT) {    // 第一次更新，仍未完成
            // 没有要做的了，等待下一次定时任务
          } else {                              // 已经完成了，第一次更新（之后速度可以放缓）
            intervalModeD = xX_LoopCheckUtil.dSlow;
            // 停止【高频】，开始【低频率检查】
            window.clearInterval(xX_LoopCheckUtil.timer);
            xX_LoopCheckUtil.timer = null;
            xX_LoopCheckUtil.timer = window.setInterval(() => {
              // 开始新的【低频率检查】
              fn(intervalModeD);
            }, intervalModeD);
          }
        }, intervalModeD);
        break;
    }


  }

  public static startCheck() {
    if (isClient) {
      this.loopCheck(xX_LoopCheckUtil.dQuick);       // 第一次，10秒
    }
  }

}
