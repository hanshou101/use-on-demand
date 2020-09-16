/**
 * Sentry枚举
 */

import {xX_DebugU, isClient, xX_LogE} from '../../debug-util/debug-util';

export enum xX_SentryBreadCateE {
  'auth'  = 'auth',
  'axios' = 'axios',
}

/**
 * Sentry辅助类
 */
export class xX_SentryLogHelper {
  /**
   * 记录 面包屑/事件痕迹
   *        1.一般要和【主动发送事件】一起使用。
   *                1.不然，只有等到下一次【汇报异常】，才会上传。
   */
  public static logBreadcrumb(
    category: xX_SentryBreadCateE,
    desc: string,
    message: string,
    level: SentrySeverity_Type_Values = window.Sentry.Severity.Error,
  ) {
    if (isClient) {
      xX_DebugU.l(xX_LogE.sentry, '记录面包屑', ...arguments);
      window.Sentry.addBreadcrumb({
        category,
        message: [category, desc, message, JSON.stringify({
          message,
          // TODO 可以放一些，其它信息
        })].join(` ${xX_DebugU.separator} `),
        level,
      });
    }
  }

  /**
   * 主动发送事件
   */
  public static sendError(
    category: xX_SentryBreadCateE,
    desc: string,
    errMsg: string,
  ) {
    if (isClient) {
      xX_DebugU.l(xX_LogE.sentry, '记录主动发送事件', ...arguments);
      window.Sentry.captureException(new Error(
        [category, desc, errMsg].join(` ${xX_DebugU.separator} `),
      ));
    }
  }
}
