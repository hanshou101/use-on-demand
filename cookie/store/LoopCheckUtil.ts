import {DebugU, LogE} from '../../debug-util/debug-util';
import {CkKeys}       from './CEnum';
import {CookieHelper} from '../CookieHelper';


const isClient = process.client;

DebugU.l(LogE.cookieUtil, 'LoopCheckUtil', '文件进入');
DebugU.l(LogE.cookieUtil, 'LoopCheckUtil', '文件进入');
DebugU.l(LogE.cookieUtil, 'LoopCheckUtil', '文件进入');
DebugU.l(LogE.cookieUtil, 'LoopCheckUtil', '文件进入');
DebugU.l(LogE.cookieUtil, 'LoopCheckUtil', '文件进入');

enum TimerModeEnum {
  TimeOut  = 'TimeOut',
  Interval = 'Interval',
}

export class LoopCheckUtil {
  private static preCookie                   = '';
  private static timer: NullableType<number> = null;   // 定时器

  private static updatedFirstT = false;                      // 是否，已更新Cookie完成，（已初始化）

  private static readonly dQuick = 1;
  private static readonly dSlow  = 2 * 1000;

  private static readonly timerMode: TimerModeEnum = TimerModeEnum.Interval;

  private static loopCheck(duration: number) {
    function fn(__d: number) {                                      // 检测一次。
      DebugU.l(LogE.cookieUtil, 'cookieUnit循环', '1', '循环间隔时间', __d, '当前模式', `【${LoopCheckUtil.timerMode}】`);
      const newCookie = document.cookie;
      DebugU.l(LogE.cookieUtil, '老cookie', LoopCheckUtil.preCookie, '新cookie', newCookie);
      if (LoopCheckUtil.preCookie !== newCookie) {                          // 开始更新
        DebugU.l(LogE.cookieUtil, 'Cookie已发生变化');
        if (window.$nuxt && window.$nuxt.$accessor) {
          DebugU.l(LogE.cookieUtil, 'cookieUnit循环', '2', '发生变化', '开始调用mutations', '循环间隔时间', duration);

          /**
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           * WARN 切记，似乎【window.$nuxt.$accessor】的加载，是有一定延迟的！！！
           */
          DebugU.l(LogE.cookieUtil, 'preCookie', LoopCheckUtil.preCookie);
          DebugU.l(LogE.cookieUtil, 'newCookie', newCookie);
          window.$nuxt.$accessor.cookieUnit.mutation_bgCoin_Authorization(CookieHelper.getCookie(CkKeys.Authorization));
          window.$nuxt.$accessor.cookieUnit.mutation_swap_token(CookieHelper.getCookie(CkKeys.token));
          window.$nuxt.$accessor.cookieUnit.mutation_swap_expired_ts(CookieHelper.getCookie(CkKeys.expired_ts));
          window.$nuxt.$accessor.cookieUnit.mutation_swap_access_key(CookieHelper.getCookie(CkKeys.access_key));
          window.$nuxt.$accessor.cookieUnit.mutation_swap_lang(CookieHelper.getCookie(CkKeys.lang));

          LoopCheckUtil.preCookie = newCookie;

          LoopCheckUtil.updatedFirstT = true;    // 标记，已经经过了【第1次初始化】
        } else {
          DebugU.l(LogE.cookieUtil, 'window.$nuxt.$accessor未初始化', window.$nuxt, window.$nuxt?.$accessor);
        }
      }
    }

    /**
     * 此处，使用【TimeOut】比【Interval】，要好很多。
     */
    fn(duration);       // TIP 执行第一次。

    switch (this.timerMode) {
      case TimerModeEnum.TimeOut:
        window.clearTimeout(LoopCheckUtil.timer);
        LoopCheckUtil.timer = null;
        LoopCheckUtil.timer = window.setTimeout(() => {
          if (!LoopCheckUtil.updatedFirstT) {    // 第一次更新，仍未完成
            LoopCheckUtil.loopCheck(LoopCheckUtil.dQuick);
          } else {                              // 已经完成了，第一次更新（之后速度可以放缓）
            LoopCheckUtil.loopCheck(LoopCheckUtil.dSlow);
          }
        }, duration);                  // 每过100ms，检测cookie变动
        break;
      case TimerModeEnum.Interval:
        // TIP 初始值————快速模式
        let intervalModeD   = LoopCheckUtil.dQuick;
        // 先执行【高频率检查】
        LoopCheckUtil.timer = window.setInterval(() => {      // 延迟若干毫秒后，执行
          fn(intervalModeD);
          /**
           * WARN 几种解决方式：
           *        1.先进行检查。因为任务已执行过一次。
           *        2.先执行一次，再判断【下一次定时任务】的【执行类型】。
           */
          if (!LoopCheckUtil.updatedFirstT) {    // 第一次更新，仍未完成
            // 没有要做的了，等待下一次定时任务
          } else {                              // 已经完成了，第一次更新（之后速度可以放缓）
            intervalModeD = LoopCheckUtil.dSlow;
            // 停止【高频】，开始【低频率检查】
            window.clearInterval(LoopCheckUtil.timer);
            LoopCheckUtil.timer = null;
            LoopCheckUtil.timer = window.setInterval(() => {
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
      this.loopCheck(LoopCheckUtil.dQuick);       // 第一次，10秒
    }
  }

}
