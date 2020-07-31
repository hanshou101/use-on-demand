/**
 * Sentry枚举
 */
import {DebugU, isClient, LogE} from '~/debug-util/debug-util';

export enum SentryBreadCateE {
  'auth'  = 'auth',
  'axios' = 'axios',
}

/**
 * Sentry辅助类
 */
export class SentryLogHelper {
  /**
   * 记录 面包屑/事件痕迹
   *        1.一般要和【主动发送事件】一起使用。
   *                1.不然，只有等到下一次【汇报异常】，才会上传。
   */
  static logBreadcrumb(
    category: SentryBreadCateE,
    desc: string,
    message: string,
    level: SentrySeverity_Type_Values = window.Sentry.Severity.Error,
  ) {
    if (isClient) {
      DebugU.l(LogE.sentry, '记录面包屑', ...arguments);
      window.Sentry.addBreadcrumb({
        category,
        message: [category, desc, message, JSON.stringify({
          message,
          // TODO 可以放一些，其它信息
        })].join(` ${DebugU.separator} `),
        level,
      });
    }
  }

  /**
   * 主动发送事件
   */
  static sendError(
    category: SentryBreadCateE,
    desc: string,
    errMsg: string,
  ) {
    if (isClient) {
      DebugU.l(LogE.sentry, '记录主动发送事件', ...arguments);
      window.Sentry.captureException(new Error(
        [category, desc, errMsg].join(` ${DebugU.separator} `)
      ));
    }
  }
}
