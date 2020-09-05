declare namespace NpsUtils_NS {
  interface BaseNps {
    (...cmds: Array<string>): string;           // 直接执行shell命令
    nps(...cmds: Array<string>): string;        // 带nps前缀的命令（常用于，调用已有的npm-script）
  }

  /**
   * 并发执行
   *        1.场景：
   *                1.lint + test + build
   */
  interface Concurrent extends BaseNps {

  }

  /**
   * 顺序执行
   *        1.自动以【&&】连接
   */
  interface Series extends BaseNps {

  }
}

/**
 * 为【nps-utils】库，手动添加文档。
 */
declare module 'nps-utils' {
  let concurrent: NpsUtils_NS.Concurrent;
  let series: NpsUtils_NS.Series;
}
